/**
 * Server Build Script for BWGA Intelligence AI
 * 
 * Uses esbuild to bundle the server for production deployment.
 * This avoids TypeScript configuration issues with ESM modules.
 */

/* eslint-disable no-undef */
import * as esbuild from 'esbuild';
import { existsSync, mkdirSync } from 'fs';

async function build() {
  console.log('🔨 Building server for production...');
  console.log(`📍 Working directory: ${process.cwd()}`);
  
  // Ensure output directory exists
  const outDir = 'dist-server';
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  try {
    console.log('⚙️  Starting esbuild...');
    console.log('📄 Entry point: server/index.ts');
    
    await esbuild.build({
      entryPoints: ['server/index.ts'],
      bundle: true,
      platform: 'node',
      target: 'node18',
      format: 'esm',
      outdir: 'dist-server/server',
      external: [
        // Node built-ins
        'fs', 'path', 'url', 'http', 'https', 'crypto', 'stream', 
        'zlib', 'util', 'os', 'events', 'buffer', 'querystring',
        'child_process', 'cluster', 'dgram', 'dns', 'net', 'readline',
        'tls', 'tty', 'v8', 'vm', 'worker_threads', 'fs/promises',
        // Dependencies that should not be bundled (available in node_modules at runtime)
        'express', 'cors', 'helmet', 'compression', 'dotenv', 'pg',
        'express-rate-limit', 'multer', 'pdf-parse',
        '@google/generative-ai', 'jsonwebtoken', 'axios',
        '@aws-sdk/client-bedrock-runtime', 'serverless-http',
        'uuid',
      ],
      sourcemap: true,
      minify: false, // Keep readable for debugging
      logLevel: 'info',
    });

    console.log('✅ Server build complete!');
    console.log('📦 Output: dist-server/server/index.js');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ BUILD FAILED ❌');
    console.error('\nError Details:');
    if (error.message) console.error('Message:', error.message);
    if (error.errors) console.error('Errors:', error.errors);
    if (error.warnings) console.error('Warnings:', error.warnings);
    console.error('\nFull Error:', error);
    process.exit(1);
  }
}

build();
