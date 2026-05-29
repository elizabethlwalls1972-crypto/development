import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { requestLogger } from './middleware/logger.js';
import { requestIdMiddleware, globalErrorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { aiUserLimiter, reportUserLimiter, authUserLimiter } from './middleware/rateLimiter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables - check multiple possible locations
// Priority: production env values first, then local overrides in development.
const envPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '..', '.env'),
  path.resolve(__dirname, '..', '..', '.env'),
  path.resolve(process.cwd(), '.env.local'),
  path.resolve(__dirname, '.env.local'),
];

// Preserve critical env vars set by the shell/infra before dotenv runs
const shellNodeEnv = process.env.NODE_ENV;
const shellPort = process.env.PORT;
const preservedKeys: Record<string, string | undefined> = {};
const aiKeyNames = [
  'GROQ_API_KEY',
  'GEMINI_API_KEY',
  'GOOGLE_AI_API_KEY',
  'OPENAI_API_KEY',
  'TOGETHER_API_KEY',
  'ANTHROPIC_API_KEY',
  'OPENROUTER_API_KEY',
  'MISTRAL_API_KEY',
];

for (const key of aiKeyNames) {
  const val = process.env[key];
  if (val && !/your[-_ ]?|placeholder|key[-_ ]?here|changeme|replace[-_ ]?me|example/i.test(val)) {
    preservedKeys[key] = val;
  }
}

const fallbackOverride = shellNodeEnv !== 'production';
for (const envPath of envPaths) {
  // .env.local should always override .env (it contains real secrets)
  const isLocal = envPath.endsWith('.env.local');
  const result = dotenv.config({ path: envPath, override: isLocal || fallbackOverride });
  if (!result.error) {
    console.log('Loaded env vars from:', envPath);
  }
}

// Restore shell-set values — dotenv must never overwrite infra/CLI env vars
for (const [key, val] of Object.entries(preservedKeys)) {
  if (val) {
    process.env[key] = val;
  }
}
if (shellNodeEnv) process.env.NODE_ENV = shellNodeEnv;
if (shellPort) process.env.PORT = shellPort;

// Debug: Check which AI providers are configured
console.log('[Server] Env loaded');
if (process.env.NODE_ENV !== 'production') {
  console.log('[Server] AI providers configured:', [
    process.env.OLLAMA_BASE_URL || process.env.OLLAMA_MODEL ? 'Ollama' : null,
    process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY ? 'Google AI' : null,
    process.env.OPENAI_API_KEY ? 'OpenAI' : null,
    process.env.GROQ_API_KEY ? 'Groq' : null,
    process.env.TOGETHER_API_KEY ? 'Together' : null,
    process.env.ANTHROPIC_API_KEY ? 'Anthropic' : null,
  ].filter(Boolean).join(', ') || 'NONE');
}

// Import routes
import aiRoutes from './routes/ai.js';
import reportsRoutes from './routes/reports.js';
import searchRoutes from './routes/search.js';
import autonomousRoutes from './routes/autonomous.js';
import governanceRoutes from './routes/governance.js';
import authRoutes from './routes/auth.js';
import learningRoutes from './routes/learning.js';
import { optionalAuth } from './middleware/auth.js';
import { sanitizeBody, promptInjectionGuard } from './middleware/validate.js';
// bedrock placeholder route removed — inference handled by /api/ai routes
import proxyRoutes from './routes/proxy.js';
import memoryRoutes from './routes/memory.js';
import ollamaRoutes from './routes/ollama.js';
import agentsRoutes from './routes/agents.js';

const app = express();
const PORT = parseInt(String(process.env.PORT || 3000), 10);
const isProduction = process.env.NODE_ENV === 'production';

// Trust reverse proxy so that X-Forwarded-For is used for client IP
// resolution. This must be set before any rate-limiting or IP-dependent
// middleware to avoid express-rate-limit ValidationErrors on proxied requests.
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // unsafe-eval removed: Vite dev HMR does not need eval in production builds
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://cdn.tailwindcss.com", "https://api.worldbank.org", "https://restcountries.com", "https://nominatim.openstreetmap.org", "https://en.wikipedia.org", "https://www.wikidata.org", "https://api.duckduckgo.com", "https://r.jina.ai", "https://hn.algolia.com", "https://google.serper.dev", "https://api.perplexity.ai", "https://generativelanguage.googleapis.com", "https://*.amazonaws.com", "https://api.together.xyz", "https://api.groq.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      workerSrc: ["'self'", "blob:"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

// ─── Server-Side Security Hardening ─────────────────────────────────────────

// Block requests with suspicious headers
app.use((req: Request, res: Response, next: NextFunction) => {
  // Reject requests with extremely long URLs (potential buffer overflow / scanning)
  if (req.url.length > 4096) {
    return res.status(414).json({ error: 'URI too long' });
  }

  // Block null byte injection in URLs
  if (req.url.includes('\0') || req.url.includes('%00')) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  // Block path traversal in URLs
  if (req.url.includes('..') || req.url.includes('%2e%2e')) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  // Strip X-Powered-By (helmet does this too, belt-and-suspenders)
  res.removeHeader('X-Powered-By');

  // Add additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  next();
});

// Health check (registered BEFORE rate-limiting and body parsing to ensure zero rate limit/CORS blocks)
app.get('/api/health', (req, res) => {
  const hasOllamaConfig = Boolean(String(process.env.OLLAMA_BASE_URL || process.env.OLLAMA_MODEL || '').trim());
  const hasOpenAI = Boolean(String(process.env.OPENAI_API_KEY || '').trim());
  const hasGroq = Boolean(String(process.env.GROQ_API_KEY || '').trim());
  const hasTogether = Boolean(String(process.env.TOGETHER_API_KEY || '').trim());
  const hasGemma = Boolean(String(process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || '').trim());
  const aiConfigured = hasOllamaConfig || hasOpenAI || hasGroq || hasTogether || hasGemma;
  const frontendUrlOrApi = process.env.FRONTEND_URL || process.env.VITE_API_BASE_URL || 'not configured';
  const PORT = parseInt(String(process.env.PORT || 3000), 10);

  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    backend: {
      port: PORT,
      nodeEnv: process.env.NODE_ENV || 'development',
      serverUrl: `http://localhost:${PORT}`,
      configuredApiBaseUrl: process.env.VITE_API_BASE_URL || '/api',
      frontendUrl: frontendUrlOrApi,
    },
    ai: {
      configured: aiConfigured,
      available: aiConfigured,
      readinessEndpoint: '/api/ai/readiness',
      provider: hasOllamaConfig ? 'ollama' : hasGemma ? 'gemma' : hasOpenAI ? 'openai' : hasGroq ? 'groq' : hasTogether ? 'together' : null,
      message: aiConfigured
        ? 'AI/local provider env vars detected - call /api/ai/readiness for live status'
        : 'Local intelligence fallback is available. For model synthesis, run Ollama locally or add GOOGLE_AI_API_KEY/GEMINI_API_KEY, GROQ_API_KEY, TOGETHER_API_KEY, OPENROUTER_API_KEY, MISTRAL_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY.'
    }
  });
});

// Rate limiting — prevent abuse
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', apiLimiter);

// Stricter limit for AI endpoints (expensive calls — lower than general API limit)
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,  // 20 AI calls per minute per IP (GPT/Gemma calls are expensive)
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'AI request rate limit exceeded. Please wait before trying again.' },
});
app.use('/api/ai/', aiLimiter);
app.use('/api/search/location-intelligence', aiLimiter);

// CORS - allow frontend origin (flexible for local deployment)
const frontEndUrl = process.env.FRONTEND_URL || process.env.VITE_API_BASE_URL || '';
const allowedOrigins = [
  frontEndUrl,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:4000',
  'http://localhost:5173',
].filter(Boolean);

const isAllowedOrigin = (origin: string | undefined): boolean => {
  if (!origin) return true; // same-origin or non-browser clients
  return allowedOrigins.some(allowed => allowed && (allowed.endsWith('*') ? origin.startsWith(allowed.slice(0, -1)) : origin === allowed));
};

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) return callback(null, true);
    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Body parsing (with size limits to prevent abuse)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Validate and sanitize request bodies for AI endpoints
// MUST be registered AFTER body parser so req.body is populated
app.use('/api/ai', (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'POST' && req.method !== 'PUT') return next();
  if (!req.body) return next();

  const body = req.body;

  // Check for oversized message payloads
  if (body.message && typeof body.message === 'string' && body.message.length > 15000) {
    return res.status(413).json({ error: 'Message too long. Maximum 15,000 characters.' });
  }

  // Strip null bytes from all string fields
  for (const key of Object.keys(body)) {
    if (typeof body[key] === 'string') {
      body[key] = body[key].replace(/\0/g, '');
    }
  }

  // Block prompt injection patterns in server-side requests
  if (body.message && typeof body.message === 'string') {
    const msg = body.message;
    const dangerousPatterns = [
      /\[system\]|\[INST\]|<\|system\|>|<\|im_start\|>/i,
      /ignore\s+(?:all\s+)?(?:previous|prior)\s+instructions/i,
      /<script[\s>]/i,
      /javascript\s*:/i,
    ];
    for (const pattern of dangerousPatterns) {
      if (pattern.test(msg)) {
        console.warn(`[SECURITY] Blocked dangerous input pattern: ${pattern.source} from ${req.ip}`);
        return res.status(400).json({ error: 'Input contains disallowed content.' });
      }
    }
  }

  next();
});

// Global sanitization and optional auth in request pipeline
app.use(sanitizeBody);
app.use(optionalAuth);

// Compression
app.use(compression());

// Request ID and structured logging middleware
app.use(requestIdMiddleware);
app.use(requestLogger);

// API Routes
app.use('/api/auth', authUserLimiter, authRoutes);
app.use('/api/ai', aiUserLimiter, promptInjectionGuard, aiRoutes);
app.use('/api/reports', reportUserLimiter, reportsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/autonomous', autonomousRoutes);
app.use('/api/governance', governanceRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/ai/proxy', proxyRoutes);
app.use('/api/memory', memoryRoutes);
app.use('/api/ollama', ollamaRoutes);
app.use('/api/agents', agentsRoutes);
import feedbackRoutes from './routes/feedback.js';
app.use('/api/feedback', feedbackRoutes);

// ── Previously orphaned routes — now connected ────────────────────────────────
// agentic.ts is a proper Express router — mount it directly
import agenticRoutes from './routes/agentic.js';
app.use('/api/agentic', agenticRoutes);

// ── Utility modules (consultantCapabilities, overlookedFirstEngine, etc.) ─────
// These are intelligence utility modules with named exports, not Express routers.
// They are already imported and used by server/routes/ai.ts internally.
// Re-exporting their intelligence via the /api/consultant/capabilities endpoint:
import { Router as _CapRouter } from 'express';
import {
  detectConsultantCapabilityMode,
  extractConsultantCaseSignals,
  deriveConsultantCapabilityProfile,
} from './routes/consultantCapabilities.js';
import { buildOverlookedIntelligenceSnapshot } from './routes/overlookedFirstEngine.js';
import { runStrategicIntelligencePipeline } from './routes/strategicIntelligencePipeline.js';

const capRouter = _CapRouter();
capRouter.post('/mode', (req, res) => {
  try {
    const mode = detectConsultantCapabilityMode(req.body?.message || '');
    const signals = extractConsultantCaseSignals(req.body?.message || '', req.body?.context);
    const profile = deriveConsultantCapabilityProfile(req.body?.message || '', req.body?.context);
    res.json({ mode, signals, profile });
  } catch (e) { res.status(500).json({ error: 'Capability detection failed' }); }
});
capRouter.post('/overlooked', (req, res) => {
  try {
    const snapshot = buildOverlookedIntelligenceSnapshot(req.body?.message || '', req.body?.context);
    res.json(snapshot);
  } catch (e) { res.status(500).json({ error: 'Overlooked intelligence failed' }); }
});
capRouter.post('/pipeline', (req, res) => {
  try {
    const output = runStrategicIntelligencePipeline(req.body?.message || '', req.body?.context);
    res.json(output);
  } catch (e) { res.status(500).json({ error: 'Strategic pipeline failed' }); }
});
app.use('/api/consultant', capRouter);


// ── Document Upload Route — PDF/Word/Text → extracted text → Susan ────────────
// This is the missing link: uploaded documents now get parsed and their text
// is returned to the frontend which passes it as `uploadedDocumentText` in chat.
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

app.post('/api/documents/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { originalname, mimetype, buffer } = req.file;
    let text = '';

    if (mimetype === 'text/plain' || originalname.endsWith('.txt') || originalname.endsWith('.md')) {
      text = buffer.toString('utf-8');
    } else if (mimetype === 'application/pdf' || originalname.endsWith('.pdf')) {
      try {
        const { createRequire } = await import('module');
        const require = createRequire(import.meta.url);
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(buffer);
        text = data.text;
      } catch {
        text = buffer.toString('latin1').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
      }
    } else if (originalname.endsWith('.csv')) {
      text = buffer.toString('utf-8');
    } else {
      // For Word docs and others — extract readable text
      text = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
    }

    const preview = text.slice(0, 500);
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    console.log(`[DocumentUpload] Parsed: ${originalname} | ${wordCount} words | type: ${mimetype}`);

    res.json({
      success: true,
      filename: originalname,
      wordCount,
      preview,
      text: text.slice(0, 50000), // cap at 50k chars for context injection
      characterCount: text.length,
    });
  } catch (error) {
    console.error('[DocumentUpload] Error:', error);
    res.status(500).json({ error: 'Failed to parse document', details: error instanceof Error ? error.message : 'Unknown error' });
  }
});


// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  // Try multiple possible dist paths
  const possibleDistPaths = [
    path.join(__dirname, '..', '..', 'dist'),  // From dist-server/server/
    path.join(__dirname, '..', 'dist'),         // From dist-server/
    path.join(process.cwd(), 'dist'),           // From project root
  ];
  
  console.log('[Static] __dirname:', __dirname);
  console.log('[Static] cwd:', process.cwd());
  console.log('[Static] Searching for dist/index.html in:', possibleDistPaths.map(p => p + '/index.html'));
  
  let distPath: string | null = null;
  for (const p of possibleDistPaths) {
    const indexPath = path.join(p, 'index.html');
    const exists = fs.existsSync(indexPath);
    console.log(`[Static]   ${indexPath} -> ${exists ? 'FOUND' : 'missing'}`);
    if (exists && !distPath) {
      distPath = p;
    }
  }
  
  if (distPath) {
    console.log('[Static] Serving static files from:', distPath);
    
    app.use(express.static(distPath));
    
    // SPA fallback - serve index.html for all non-API routes
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath!, 'index.html'));
    });
  } else {
    console.error('[Static] WARNING: dist/index.html not found in any expected location!');
    console.error('[Static] The frontend will not be served. Run "npm run build:client" to create it.');
    // List what IS in the expected directories for debugging
    for (const p of possibleDistPaths) {
      try {
        const parent = path.dirname(p);
        if (fs.existsSync(parent)) {
          console.error(`[Static] Contents of ${parent}:`, fs.readdirSync(parent));
        }
      } catch { /* ignore */ }
    }
  }
}

// Not found handler for unmatched routes
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  ADVERSIQ Intelligence AI Backend Server                                ║
║  ──────────────────────────────────────────────────────────║
║  Status:    ONLINE                                         ║
║  Port:      ${PORT}                                            ║
║  Mode:      ${process.env.NODE_ENV || 'development'}                                 ║
║  API:       http://localhost:${PORT}/api                       ║
║  Health:    http://localhost:${PORT}/api/health                ║
╚════════════════════════════════════════════════════════════╝
  `);
  console.log('[DEBUG] Server started, event loop should be active...');
});

console.log('[DEBUG] After app.listen call');

// Keep server running
server.on('listening', () => {
  console.log('[DEBUG] Server listening event fired');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

// Ensure the event loop stays active
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`${signal} received, shutting down gracefully`);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  // Attempt to drain DB pools
  try {
    const { getPool } = await import('./db.js');
    const pool = getPool();
    if (pool) pool.end().catch(() => {});
  } catch { /* db module may not be loaded */ }
  // Force exit after 10s if graceful shutdown hangs
  setTimeout(() => {
    console.error('Graceful shutdown timed out, forcing exit');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
