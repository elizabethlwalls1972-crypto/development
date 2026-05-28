/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ADVERSIQ — LOCAL AGENT BRIDGE (KEYLESS)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Enables full OpenAI-style agent patterns WITHOUT any API key.
 * Routes calls to local inference engines (Ollama, LM Studio) that expose
 * the OpenAI Chat Completions-compatible API.
 *
 * Supported local backends (auto-detected):
 *   1. Ollama         → http://localhost:11434  (primary)
 *   2. LM Studio      → http://localhost:1234   (secondary)
 *   3. Jan.ai         → http://localhost:1337   (tertiary)
 *   4. llamafile      → http://localhost:8080   (quaternary)
 *
 * Agent patterns supported (all keyless):
 *   - Single Agent:   One specialist role → structured output
 *   - Multi-Agent:    Multiple specialists running in parallel, results merged
 *   - Pipeline Agent: Sequential chain where each agent feeds the next
 *   - Debate Agent:   Two opposing agents + arbiter → consensus decision
 *   - Refine Agent:   Generator → Critic → Refiner loop (N passes)
 *
 * Usage:
 *   import { localAgentBridge } from './LocalAgentBridge';
 *   const result = await localAgentBridge.runAgent({ role: 'analyst', task: '...' });
 * ═══════════════════════════════════════════════════════════════════════════════
 */

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AgentCallOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  timeoutMs?: number;
}

export interface AgentResult {
  text: string;
  backend: string;
  model: string;
  latencyMs: number;
  tokensUsed?: number;
}

export interface SingleAgentOptions extends AgentCallOptions {
  /** The agent's specialist role/persona */
  role: string;
  /** The task or question to resolve */
  task: string;
  /** Optional structured context injected as system context */
  context?: string;
}

export interface MultiAgentOptions extends AgentCallOptions {
  /** Array of specialist agents to run in parallel */
  agents: Array<{ role: string; task: string; context?: string }>;
  /** How to merge results: 'concat' | 'vote' | 'synthesize' */
  mergeStrategy?: 'concat' | 'vote' | 'synthesize';
}

export interface PipelineAgentOptions extends AgentCallOptions {
  /** Ordered chain of agents — output of each feeds the next */
  stages: Array<{ role: string; instruction: string }>;
  /** Initial input to feed into stage 0 */
  initialInput: string;
}

export interface DebateAgentOptions extends AgentCallOptions {
  /** The proposition to debate */
  proposition: string;
  /** Optional domain context */
  context?: string;
  /** Number of debate rounds (default: 1) */
  rounds?: number;
}

export interface RefineAgentOptions extends AgentCallOptions {
  /** The initial task for the generator */
  task: string;
  /** Number of generate→critique→refine cycles (default: 2) */
  passes?: number;
}

// ─── Backend Discovery ────────────────────────────────────────────────────────

interface LocalBackend {
  name: string;
  baseUrl: string;
  chatEndpoint: string;
  tagsEndpoint: string;
  defaultModel: string;
  available: boolean;
}

const CANDIDATE_BACKENDS: Omit<LocalBackend, 'available'>[] = [
  {
    name: 'ollama',
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    chatEndpoint: '/api/chat',
    tagsEndpoint: '/api/tags',
    defaultModel: process.env.OLLAMA_MODEL || 'llama3.2:3b',
  },
  {
    name: 'lm-studio',
    baseUrl: process.env.LM_STUDIO_BASE_URL || 'http://localhost:1234',
    chatEndpoint: '/v1/chat/completions',
    tagsEndpoint: '/v1/models',
    defaultModel: process.env.LM_STUDIO_MODEL || 'local-model',
  },
  {
    name: 'jan',
    baseUrl: process.env.JAN_BASE_URL || 'http://localhost:1337',
    chatEndpoint: '/v1/chat/completions',
    tagsEndpoint: '/v1/models',
    defaultModel: process.env.JAN_MODEL || 'local-model',
  },
  {
    name: 'llamafile',
    baseUrl: process.env.LLAMAFILE_BASE_URL || 'http://localhost:8080',
    chatEndpoint: '/v1/chat/completions',
    tagsEndpoint: '/v1/models',
    defaultModel: process.env.LLAMAFILE_MODEL || 'LLaMA_CPP',
  },
];

let _cachedBackend: LocalBackend | null = null;
let _lastDiscovery = 0;
const DISCOVERY_TTL_MS = 30_000; // Re-check every 30 seconds

/**
 * Probe all candidate backends and return the first responsive one.
 * Result is cached for 30 seconds to avoid constant probing.
 */
async function discoverBackend(): Promise<LocalBackend | null> {
  const now = Date.now();
  if (_cachedBackend?.available && now - _lastDiscovery < DISCOVERY_TTL_MS) {
    return _cachedBackend;
  }

  for (const candidate of CANDIDATE_BACKENDS) {
    try {
      const res = await fetch(`${candidate.baseUrl}${candidate.tagsEndpoint}`, {
        signal: AbortSignal.timeout(1500),
      });
      if (res.ok) {
        _cachedBackend = { ...candidate, available: true };
        _lastDiscovery = now;
        console.log(`[LocalAgentBridge] Backend discovered: ${candidate.name} @ ${candidate.baseUrl}`);
        return _cachedBackend;
      }
    } catch {
      // Not available — try next
    }
  }

  _cachedBackend = null;
  return null;
}

// ─── Raw Inference Call ───────────────────────────────────────────────────────

/**
 * Send a chat completion request to the discovered local backend.
 * Handles both Ollama native format and OpenAI-compatible format.
 */
async function callLocalBackend(
  messages: AgentMessage[],
  options: AgentCallOptions = {}
): Promise<AgentResult> {
  const backend = await discoverBackend();
  if (!backend) {
    throw new Error(
      '[LocalAgentBridge] No local AI backend found. ' +
      'Start Ollama (ollama serve) or LM Studio to use keyless agents.'
    );
  }

  const model = options.model || backend.defaultModel;
  const maxTokens = options.maxTokens || 4096;
  const temperature = options.temperature ?? 0.4;
  const timeoutMs = options.timeoutMs || 60_000;

  const start = Date.now();

  if (backend.name === 'ollama') {
    // Ollama native /api/chat format
    const body = {
      model,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      stream: false,
      options: { temperature, num_predict: maxTokens },
    };

    const res = await fetch(`${backend.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Ollama ${res.status}: ${errText.slice(0, 200)}`);
    }

    const data = await res.json();
    const text = (data.message?.content || '').trim();
    const tokensUsed = (data.eval_count || 0) + (data.prompt_eval_count || 0);

    return { text, backend: backend.name, model, latencyMs: Date.now() - start, tokensUsed };
  }

  // OpenAI-compatible format (LM Studio, Jan, llamafile)
  const body = {
    model,
    messages,
    max_tokens: maxTokens,
    temperature,
  };

  const res = await fetch(`${backend.baseUrl}${backend.chatEndpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`${backend.name} ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = (data.choices?.[0]?.message?.content || '').trim();
  const tokensUsed = data.usage?.total_tokens || 0;

  return { text, backend: backend.name, model, latencyMs: Date.now() - start, tokensUsed };
}

// ─── Agent Patterns ───────────────────────────────────────────────────────────

/**
 * SINGLE AGENT
 * Run one specialist agent and return its output.
 */
async function runAgent(opts: SingleAgentOptions): Promise<AgentResult> {
  const messages: AgentMessage[] = [
    {
      role: 'system',
      content: `You are a specialist AI agent. Your role: ${opts.role}.\n` +
        (opts.context ? `Context:\n${opts.context}\n\n` : '') +
        'Respond with clear, structured, actionable output. Be thorough but concise.',
    },
    { role: 'user', content: opts.task },
  ];

  return callLocalBackend(messages, opts);
}

/**
 * MULTI-AGENT (parallel)
 * Run multiple specialist agents simultaneously and merge their outputs.
 */
async function runMultiAgent(opts: MultiAgentOptions): Promise<{
  results: Array<{ role: string; result: AgentResult }>;
  merged: string;
}> {
  const mergeStrategy = opts.mergeStrategy || 'synthesize';

  // Run all agents in parallel
  const settled = await Promise.allSettled(
    opts.agents.map(agent => runAgent({ ...opts, ...agent }))
  );

  const results: Array<{ role: string; result: AgentResult }> = [];
  for (let i = 0; i < settled.items?.length ?? settled.length; i++) {
    const s = (settled as PromiseSettledResult<AgentResult>[])[i];
    if (s.status === 'fulfilled') {
      results.push({ role: opts.agents[i].role, result: s.value });
    }
  }

  if (!results.length) {
    throw new Error('[LocalAgentBridge] All parallel agents failed');
  }

  let merged: string;

  if (mergeStrategy === 'concat') {
    merged = results.map(r => `## ${r.role}\n${r.result.text}`).join('\n\n---\n\n');
  } else if (mergeStrategy === 'vote') {
    // Count word-level overlap as a proxy for consensus
    const allWords = results.flatMap(r => r.result.text.toLowerCase().split(/\s+/));
    const freq = new Map<string, number>();
    for (const w of allWords) { freq.set(w, (freq.get(w) || 0) + 1); }
    const consensusWords = [...freq.entries()].filter(([, c]) => c >= results.length).map(([w]) => w);
    merged = results.map(r => `## ${r.role}\n${r.result.text}`).join('\n\n---\n\n') +
      `\n\n## Consensus Keywords\n${consensusWords.slice(0, 30).join(', ')}`;
  } else {
    // synthesize: ask a synthesis agent to merge all outputs
    const synthInput = results.map(r => `[${r.role}]\n${r.result.text}`).join('\n\n');
    const synthResult = await callLocalBackend([
      {
        role: 'system',
        content: 'You are a synthesis agent. You receive outputs from multiple specialist agents and produce a single, unified, high-quality response that captures the best insights from all agents. Remove redundancy, resolve conflicts intelligently, and present a clear final answer.',
      },
      { role: 'user', content: `Synthesize the following specialist outputs:\n\n${synthInput}` },
    ], opts);
    merged = synthResult.text;
  }

  return { results, merged };
}

/**
 * PIPELINE AGENT (sequential chain)
 * Each stage's output becomes the next stage's input.
 */
async function runPipelineAgent(opts: PipelineAgentOptions): Promise<{
  stages: Array<{ role: string; output: AgentResult }>;
  finalOutput: string;
}> {
  let currentInput = opts.initialInput;
  const stages: Array<{ role: string; output: AgentResult }> = [];

  for (const stage of opts.stages) {
    const result = await callLocalBackend([
      {
        role: 'system',
        content: `You are a specialist agent. Your role: ${stage.role}.\n${stage.instruction}`,
      },
      { role: 'user', content: currentInput },
    ], opts);

    stages.push({ role: stage.role, output: result });
    currentInput = result.text; // feed output into next stage
  }

  return {
    stages,
    finalOutput: stages[stages.length - 1]?.output.text || '',
  };
}

/**
 * DEBATE AGENT
 * Two agents argue opposing sides, then an arbiter produces a balanced verdict.
 */
async function runDebateAgent(opts: DebateAgentOptions): Promise<{
  proArgument: string;
  conArgument: string;
  verdict: string;
}> {
  const rounds = opts.rounds || 1;
  const contextBlock = opts.context ? `\nContext: ${opts.context}` : '';

  let proHistory: AgentMessage[] = [
    {
      role: 'system',
      content: `You are a rigorous advocate agent. Your job is to construct the strongest possible SUPPORTING argument for the following proposition.${contextBlock}\nBe specific, evidence-based, and persuasive. Avoid generic statements.`,
    },
    { role: 'user', content: `Proposition: ${opts.proposition}\n\nProvide your strongest supporting argument.` },
  ];

  let conHistory: AgentMessage[] = [
    {
      role: 'system',
      content: `You are a rigorous critic agent. Your job is to construct the strongest possible OPPOSING argument against the following proposition.${contextBlock}\nBe specific, evidence-based, and persuasive. Identify real risks, weaknesses, and counter-evidence.`,
    },
    { role: 'user', content: `Proposition: ${opts.proposition}\n\nProvide your strongest opposing argument.` },
  ];

  let proText = '';
  let conText = '';

  for (let round = 0; round < rounds; round++) {
    const [proResult, conResult] = await Promise.all([
      callLocalBackend(proHistory, opts),
      callLocalBackend(conHistory, opts),
    ]);

    proText = proResult.text;
    conText = conResult.text;

    if (round < rounds - 1) {
      // Add rebuttals for next round
      proHistory.push({ role: 'assistant', content: proText });
      proHistory.push({ role: 'user', content: `The opposing agent said:\n${conText}\n\nProvide a rebuttal and strengthen your position.` });
      conHistory.push({ role: 'assistant', content: conText });
      conHistory.push({ role: 'user', content: `The supporting agent said:\n${proText}\n\nProvide a rebuttal and strengthen your opposition.` });
    }
  }

  // Arbiter produces a balanced verdict
  const verdictResult = await callLocalBackend([
    {
      role: 'system',
      content: 'You are an expert arbiter. You have received arguments from two sides of a debate. Your job is to produce a balanced, evidence-weighted verdict. Identify which arguments are strongest, where each side is weak, and provide a final decision with confidence level.',
    },
    {
      role: 'user',
      content: `Proposition: ${opts.proposition}\n\nSupporting argument:\n${proText}\n\nOpposing argument:\n${conText}\n\nProvide your balanced verdict.`,
    },
  ], opts);

  return { proArgument: proText, conArgument: conText, verdict: verdictResult.text };
}

/**
 * REFINE AGENT (generate → critique → refine loop)
 * Iteratively improves output quality through self-critique cycles.
 */
async function runRefineAgent(opts: RefineAgentOptions): Promise<{
  passes: Array<{ draft: string; critique: string }>;
  finalOutput: string;
}> {
  const maxPasses = opts.passes || 2;
  const passLog: Array<{ draft: string; critique: string }> = [];

  // Initial generation
  let draft = (await callLocalBackend([
    {
      role: 'system',
      content: 'You are an expert agent tasked with producing a high-quality, comprehensive response. Be thorough, structured, and specific.',
    },
    { role: 'user', content: opts.task },
  ], opts)).text;

  for (let pass = 0; pass < maxPasses; pass++) {
    // Critique
    const critique = (await callLocalBackend([
      {
        role: 'system',
        content: 'You are a rigorous critic. Analyze the following draft for: accuracy, completeness, clarity, logical consistency, and actionability. List specific improvements needed.',
      },
      { role: 'user', content: `Draft:\n${draft}\n\nProvide a specific critique.` },
    ], opts)).text;

    passLog.push({ draft, critique });

    if (pass < maxPasses - 1) {
      // Refine based on critique
      draft = (await callLocalBackend([
        {
          role: 'system',
          content: 'You are a refinement agent. You receive a draft and a critique. Produce an improved version that addresses all critique points while preserving what works.',
        },
        {
          role: 'user',
          content: `Original task: ${opts.task}\n\nCurrent draft:\n${draft}\n\nCritique:\n${critique}\n\nProduce the improved version.`,
        },
      ], opts)).text;
    }
  }

  return { passes: passLog, finalOutput: draft };
}

// ─── Status & Health ──────────────────────────────────────────────────────────

export interface LocalAgentBridgeStatus {
  available: boolean;
  backend: string | null;
  baseUrl: string | null;
  model: string | null;
  message: string;
}

async function getStatus(): Promise<LocalAgentBridgeStatus> {
  const backend = await discoverBackend();
  if (!backend) {
    return {
      available: false,
      backend: null,
      baseUrl: null,
      model: null,
      message: 'No local AI backend found. Start Ollama (ollama serve) or LM Studio to enable keyless agents.',
    };
  }

  return {
    available: true,
    backend: backend.name,
    baseUrl: backend.baseUrl,
    model: backend.defaultModel,
    message: `Keyless agent bridge active via ${backend.name} @ ${backend.baseUrl}`,
  };
}

// ─── Exported Bridge Object ───────────────────────────────────────────────────

export const localAgentBridge = {
  /** Check whether a local backend is available (no API key needed). */
  getStatus,
  /** Discover and return the active backend, or null if none found. */
  discoverBackend,
  /** Run a single specialist agent. */
  runAgent,
  /** Run multiple agents in parallel and merge their outputs. */
  runMultiAgent,
  /** Run a sequential pipeline where each stage feeds the next. */
  runPipelineAgent,
  /** Run a structured debate between opposing agents + an arbiter. */
  runDebateAgent,
  /** Run an iterative generate→critique→refine loop for maximum quality. */
  runRefineAgent,
  /** Raw access: call the local backend directly with custom messages. */
  callRaw: callLocalBackend,
};

export default localAgentBridge;
