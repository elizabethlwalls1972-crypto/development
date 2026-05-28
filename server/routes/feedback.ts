/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ADVERSIQ — FEEDBACK API ROUTE
 * ═══════════════════════════════════════════════════════════════════════════════
 * Receives thumbs-up/thumbs-down from the Susan chat UI.
 * Triggers real Bayesian weight updates in AdaptiveFeedbackEngine.
 * This is what makes the system actually self-improve based on real usage.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { Router, Request, Response } from 'express';
import { adaptiveFeedbackEngine } from '../services/AdaptiveFeedbackEngine.js';

const router = Router();

// POST /api/feedback — record user feedback for a response
router.post('/', async (req: Request, res: Response) => {
  try {
    const { sessionId, messageId, enginesUsed, feedback, confidence, country, topic, responseTime } = req.body;

    if (!feedback || !['positive', 'negative', 'neutral'].includes(feedback)) {
      return res.status(400).json({ error: 'feedback must be positive, negative, or neutral' });
    }

    const record = {
      sessionId: String(sessionId || 'anonymous'),
      timestamp: new Date().toISOString(),
      messageId: String(messageId || Date.now()),
      enginesUsed: Array.isArray(enginesUsed) ? enginesUsed : [],
      feedback: feedback as 'positive' | 'negative' | 'neutral',
      confidence: typeof confidence === 'number' ? confidence : 0,
      country: country || undefined,
      topic: topic || undefined,
      responseTime: typeof responseTime === 'number' ? responseTime : 0,
    };

    const result = adaptiveFeedbackEngine.recordFeedback(record);

    res.json({
      success: true,
      message: feedback === 'positive' 
        ? `Intelligence engines strengthened: ${result.updatedEngines.slice(0, 3).join(', ')}` 
        : feedback === 'negative'
        ? `Engine weights adjusted to improve future accuracy`
        : 'Feedback recorded',
      updatedEngines: result.updatedEngines,
      deltaWeights: result.deltaWeights,
    });
  } catch (error) {
    console.error('[Feedback] Error:', error);
    res.status(500).json({ error: 'Failed to record feedback' });
  }
});

// GET /api/feedback/stats — system learning stats
router.get('/stats', (_req: Request, res: Response) => {
  try {
    const stats = adaptiveFeedbackEngine.getStats();
    const priorities = adaptiveFeedbackEngine.getEnginePriority({});
    const coActivations = adaptiveFeedbackEngine.getStrongCoActivations(0.2);

    res.json({
      totalFeedbackReceived: stats.totalFeedback,
      engineWeights: stats.engineWeights,
      topEngines: priorities.slice(0, 5).map(p => ({ engine: p.engine, weight: p.weight.toFixed(3), priority: p.priority })),
      underperformingEngines: priorities.slice(-3).map(p => ({ engine: p.engine, weight: p.weight.toFixed(3) })),
      strongEngineCorrelations: coActivations.slice(0, 5),
      systemStatus: stats.totalFeedback === 0 
        ? 'Awaiting first feedback — weights at baseline'
        : `Active learning — ${stats.totalFeedback} feedback signals processed`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get feedback stats' });
  }
});

// GET /api/feedback/engine-priorities — used by BrainIntegrationService to prioritise engines
router.get('/engine-priorities', (req: Request, res: Response) => {
  try {
    const { country, topic } = req.query;
    const priorities = adaptiveFeedbackEngine.getEnginePriority({
      country: country as string | undefined,
      topic: topic as string | undefined,
    });
    res.json({ priorities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get engine priorities' });
  }
});

export default router;
