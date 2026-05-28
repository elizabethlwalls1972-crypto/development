/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ADVERSIQ — /api/agents  (Keyless Multi-Agent REST Endpoint)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Exposes the LocalAgentBridge as a structured REST API.
 * All endpoints work WITHOUT any API key — powered by local Ollama / LM Studio.
 *
 * Endpoints:
 *   GET  /api/agents/status           → Bridge health & discovered backend
 *   POST /api/agents/single           → Run a single specialist agent
 *   POST /api/agents/multi            → Run multiple agents in parallel
 *   POST /api/agents/pipeline         → Run a sequential agent pipeline
 *   POST /api/agents/debate           → Run a structured debate
 *   POST /api/agents/refine           → Run a generate→critique→refine loop
 *   POST /api/agents/openai-compat    → Drop-in OpenAI-compatible chat completions
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Router, Request, Response } from 'express';
import { localAgentBridge } from '../../services/LocalAgentBridge.js';

const router = Router();

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ok = (res: Response, data: unknown) => res.json({ ok: true, ...data as object });
const fail = (res: Response, status: number, message: string) =>
  res.status(status).json({ ok: false, error: message });

const safeStr = (v: unknown, max = 8000): string | null => {
  if (typeof v !== 'string' || !v.trim()) return null;
  return v.trim().slice(0, max);
};

// ─── GET /status ──────────────────────────────────────────────────────────────

router.get('/status', async (_req: Request, res: Response) => {
  try {
    const status = await localAgentBridge.getStatus();
    ok(res, { status });
  } catch (err) {
    fail(res, 500, err instanceof Error ? err.message : 'Status check failed');
  }
});

// ─── POST /single ─────────────────────────────────────────────────────────────

/**
 * Run a single specialist agent.
 *
 * Body:
 *   { role: string, task: string, context?: string,
 *     model?: string, maxTokens?: number, temperature?: number }
 */
router.post('/single', async (req: Request, res: Response) => {
  const role = safeStr(req.body?.role, 500);
  const task = safeStr(req.body?.task, 6000);

  if (!role) return fail(res, 400, '`role` is required');
  if (!task) return fail(res, 400, '`task` is required');

  try {
    const result = await localAgentBridge.runAgent({
      role,
      task,
      context: safeStr(req.body?.context, 4000) || undefined,
      model: safeStr(req.body?.model, 200) || undefined,
      maxTokens: typeof req.body?.maxTokens === 'number' ? req.body.maxTokens : undefined,
      temperature: typeof req.body?.temperature === 'number' ? req.body.temperature : undefined,
    });
    ok(res, { result });
  } catch (err) {
    fail(res, 503, err instanceof Error ? err.message : 'Agent call failed');
  }
});

// ─── POST /multi ──────────────────────────────────────────────────────────────

/**
 * Run multiple specialist agents in parallel and merge results.
 *
 * Body:
 *   { agents: [{ role, task, context? }], mergeStrategy?: 'concat'|'vote'|'synthesize',
 *     model?: string, maxTokens?: number, temperature?: number }
 */
router.post('/multi', async (req: Request, res: Response) => {
  const agents = req.body?.agents;
  if (!Array.isArray(agents) || agents.length === 0) {
    return fail(res, 400, '`agents` must be a non-empty array');
  }
  if (agents.length > 8) {
    return fail(res, 400, 'Maximum 8 agents per multi-agent call');
  }

  const validAgents = agents.filter(a => typeof a.role === 'string' && typeof a.task === 'string');
  if (validAgents.length === 0) {
    return fail(res, 400, 'Each agent must have `role` and `task` strings');
  }

  const strategy = req.body?.mergeStrategy;
  const mergeStrategy = ['concat', 'vote', 'synthesize'].includes(strategy) ? strategy : 'synthesize';

  try {
    const output = await localAgentBridge.runMultiAgent({
      agents: validAgents.map(a => ({
        role: String(a.role).slice(0, 500),
        task: String(a.task).slice(0, 6000),
        context: typeof a.context === 'string' ? a.context.slice(0, 4000) : undefined,
      })),
      mergeStrategy,
      model: safeStr(req.body?.model, 200) || undefined,
      maxTokens: typeof req.body?.maxTokens === 'number' ? req.body.maxTokens : undefined,
      temperature: typeof req.body?.temperature === 'number' ? req.body.temperature : undefined,
    });
    ok(res, { agentCount: output.results.length, merged: output.merged, agents: output.results.map(r => ({ role: r.role, latencyMs: r.result.latencyMs })) });
  } catch (err) {
    fail(res, 503, err instanceof Error ? err.message : 'Multi-agent call failed');
  }
});

// ─── POST /pipeline ───────────────────────────────────────────────────────────

/**
 * Run a sequential pipeline where each stage feeds the next.
 *
 * Body:
 *   { stages: [{ role, instruction }], initialInput: string,
 *     model?: string, maxTokens?: number, temperature?: number }
 */
router.post('/pipeline', async (req: Request, res: Response) => {
  const stages = req.body?.stages;
  const initialInput = safeStr(req.body?.initialInput, 8000);

  if (!Array.isArray(stages) || stages.length === 0) {
    return fail(res, 400, '`stages` must be a non-empty array');
  }
  if (!initialInput) {
    return fail(res, 400, '`initialInput` is required');
  }
  if (stages.length > 6) {
    return fail(res, 400, 'Maximum 6 pipeline stages');
  }

  const validStages = stages.filter(s => typeof s.role === 'string' && typeof s.instruction === 'string');
  if (validStages.length === 0) {
    return fail(res, 400, 'Each stage must have `role` and `instruction` strings');
  }

  try {
    const output = await localAgentBridge.runPipelineAgent({
      stages: validStages.map(s => ({
        role: String(s.role).slice(0, 500),
        instruction: String(s.instruction).slice(0, 4000),
      })),
      initialInput,
      model: safeStr(req.body?.model, 200) || undefined,
      maxTokens: typeof req.body?.maxTokens === 'number' ? req.body.maxTokens : undefined,
      temperature: typeof req.body?.temperature === 'number' ? req.body.temperature : undefined,
    });
    ok(res, {
      stageCount: output.stages.length,
      finalOutput: output.finalOutput,
      stages: output.stages.map(s => ({ role: s.role, latencyMs: s.output.latencyMs })),
    });
  } catch (err) {
    fail(res, 503, err instanceof Error ? err.message : 'Pipeline agent call failed');
  }
});

// ─── POST /debate ─────────────────────────────────────────────────────────────

/**
 * Run a structured debate: pro agent vs con agent → arbiter verdict.
 *
 * Body:
 *   { proposition: string, context?: string, rounds?: number,
 *     model?: string, maxTokens?: number, temperature?: number }
 */
router.post('/debate', async (req: Request, res: Response) => {
  const proposition = safeStr(req.body?.proposition, 2000);
  if (!proposition) return fail(res, 400, '`proposition` is required');

  const rounds = typeof req.body?.rounds === 'number'
    ? Math.min(Math.max(req.body.rounds, 1), 3)
    : 1;

  try {
    const output = await localAgentBridge.runDebateAgent({
      proposition,
      context: safeStr(req.body?.context, 4000) || undefined,
      rounds,
      model: safeStr(req.body?.model, 200) || undefined,
      maxTokens: typeof req.body?.maxTokens === 'number' ? req.body.maxTokens : undefined,
      temperature: typeof req.body?.temperature === 'number' ? req.body.temperature : undefined,
    });
    ok(res, {
      proposition,
      rounds,
      proArgument: output.proArgument,
      conArgument: output.conArgument,
      verdict: output.verdict,
    });
  } catch (err) {
    fail(res, 503, err instanceof Error ? err.message : 'Debate agent call failed');
  }
});

// ─── POST /refine ─────────────────────────────────────────────────────────────

/**
 * Run an iterative generate→critique→refine loop.
 *
 * Body:
 *   { task: string, passes?: number,
 *     model?: string, maxTokens?: number, temperature?: number }
 */
router.post('/refine', async (req: Request, res: Response) => {
  const task = safeStr(req.body?.task, 6000);
  if (!task) return fail(res, 400, '`task` is required');

  const passes = typeof req.body?.passes === 'number'
    ? Math.min(Math.max(req.body.passes, 1), 4)
    : 2;

  try {
    const output = await localAgentBridge.runRefineAgent({
      task,
      passes,
      model: safeStr(req.body?.model, 200) || undefined,
      maxTokens: typeof req.body?.maxTokens === 'number' ? req.body.maxTokens : undefined,
      temperature: typeof req.body?.temperature === 'number' ? req.body.temperature : undefined,
    });
    ok(res, {
      passes: output.passes.length,
      finalOutput: output.finalOutput,
      passLog: output.passes.map((p, i) => ({ pass: i + 1, critique: p.critique.slice(0, 500) })),
    });
  } catch (err) {
    fail(res, 503, err instanceof Error ? err.message : 'Refine agent call failed');
  }
});

// ─── POST /openai-compat ──────────────────────────────────────────────────────

/**
 * Drop-in OpenAI-compatible chat completions endpoint.
 * Accepts the same body format as OpenAI's /v1/chat/completions
 * but routes to the local backend (no API key needed).
 *
 * Body:
 *   { model?: string, messages: [{role, content}],
 *     max_tokens?: number, temperature?: number }
 *
 * Response follows OpenAI format for compatibility with existing code.
 */
router.post('/openai-compat', async (req: Request, res: Response) => {
  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return fail(res, 400, '`messages` must be a non-empty array');
  }

  const validMessages = messages.filter(
    m => ['system', 'user', 'assistant'].includes(m?.role) && typeof m?.content === 'string'
  );

  if (!validMessages.length) {
    return fail(res, 400, 'No valid messages (each must have role and content)');
  }

  try {
    const result = await localAgentBridge.callRaw(
      validMessages,
      {
        model: safeStr(req.body?.model, 200) || undefined,
        maxTokens: typeof req.body?.max_tokens === 'number' ? req.body.max_tokens : undefined,
        temperature: typeof req.body?.temperature === 'number' ? req.body.temperature : undefined,
      }
    );

    // Return in OpenAI response format for drop-in compatibility
    res.json({
      id: `local-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: result.model,
      choices: [
        {
          index: 0,
          message: { role: 'assistant', content: result.text },
          finish_reason: 'stop',
        },
      ],
      usage: {
        prompt_tokens: result.tokensUsed ? Math.floor(result.tokensUsed * 0.6) : 0,
        completion_tokens: result.tokensUsed ? Math.floor(result.tokensUsed * 0.4) : 0,
        total_tokens: result.tokensUsed || 0,
      },
      _adversiq: {
        backend: result.backend,
        latencyMs: result.latencyMs,
        keyless: true,
      },
    });
  } catch (err) {
    fail(res, 503, err instanceof Error ? err.message : 'OpenAI-compat call failed');
  }
});

export default router;
