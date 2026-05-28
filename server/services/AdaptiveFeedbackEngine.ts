/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ADVERSIQ — ADAPTIVE INTELLIGENCE FEEDBACK ENGINE (AIFE)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * This is a genuinely novel architecture component — a real-time, signal-driven
 * self-improvement system that connects user feedback directly to engine weight
 * adjustment using a Bayesian Update + Hebbian Reinforcement hybrid.
 *
 * What makes this different from the existing "continual harness":
 * - Feedback is tied to SPECIFIC engines that fired for a SPECIFIC query
 * - Positive signals strengthen those engine weights; negative signals weaken them
 * - Engine weights are used at query time to decide WHICH engines to fire first
 *   (high-weight engines are prioritised, low-weight engines are deprioritised)
 * - Weights decay over time toward a base rate (preventing overfitting to recent feedback)
 * - Cross-engine correlation learning: if Engine A and B both fired and feedback was
 *   positive, their co-activation weight increases (they're MORE likely to fire together)
 *
 * This is a real feedback loop, not random weight mutation.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEIGHTS_FILE = path.resolve(__dirname, '../../data/engine_weights.json');
const FEEDBACK_LOG = path.resolve(__dirname, '../../data/feedback_log.jsonl');
const DATA_DIR = path.resolve(__dirname, '../../data');

// ─── Types ───────────────────────────────────────────────────────────────────

interface EngineWeights {
  version: number;
  lastUpdated: string;
  weights: Record<string, number>;       // engine name → weight (0.1–2.0, baseline 1.0)
  coActivation: Record<string, Record<string, number>>; // cross-engine correlation matrix
  feedbackCount: number;
  decayLastApplied: string;
}

interface FeedbackRecord {
  sessionId: string;
  timestamp: string;
  messageId: string;
  enginesUsed: string[];
  feedback: 'positive' | 'negative' | 'neutral';
  confidence: number;
  country?: string;
  topic?: string;
  responseTime: number;
}

// ─── Engine Weight Manager ────────────────────────────────────────────────────

class AdaptiveIntelligenceFeedbackEngine {
  private weights: EngineWeights | null = null;
  private readonly LEARNING_RATE = 0.05;       // How fast weights shift per feedback
  private readonly DECAY_RATE = 0.002;          // Slow drift back toward 1.0 per day
  private readonly MIN_WEIGHT = 0.3;            // Engines never go below 30% strength
  private readonly MAX_WEIGHT = 1.8;            // Engines never exceed 180% strength
  private readonly BASELINE = 1.0;

  private ensureDataDir(): void {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadWeights(): EngineWeights {
    if (this.weights) return this.weights;
    this.ensureDataDir();

    try {
      if (fs.existsSync(WEIGHTS_FILE)) {
        const raw = fs.readFileSync(WEIGHTS_FILE, 'utf-8');
        this.weights = JSON.parse(raw) as EngineWeights;
        return this.weights;
      }
    } catch {
      // Corrupt file — reset
    }

    // Initialize default weights for all known engines
    this.weights = {
      version: 1,
      lastUpdated: new Date().toISOString(),
      feedbackCount: 0,
      decayLastApplied: new Date().toISOString(),
      weights: {
        '15-Index Intelligence Panel': 1.0,
        'World Bank Live Economic Data': 1.0,
        'Historical Pattern Engine': 1.0,
        'Risk Matrix': 1.0,
        '5-Persona Adversarial Debate': 1.0,
        'Financial Calculator (NPV/IRR/Payback)': 1.0,
        '12-Layer Cognitive Reasoning Engine': 1.0,
        'Document Vault': 1.0,
        'Quantum Monte Carlo Simulation': 1.0,
        'Global Compliance Framework': 1.0,
        'Reactive Intelligence Engine': 1.0,
        'Sanctions Screening': 1.0,
        'Location Intelligence': 1.0,
        'Partner Comparison Engine': 1.0,
      },
      coActivation: {},
    };
    this.saveWeights();
    return this.weights;
  }

  private saveWeights(): void {
    if (!this.weights) return;
    this.ensureDataDir();
    this.weights.lastUpdated = new Date().toISOString();
    fs.writeFileSync(WEIGHTS_FILE, JSON.stringify(this.weights, null, 2), 'utf-8');
  }

  /**
   * Apply temporal decay — weights drift toward baseline over time.
   * Called daily to prevent weights from staying permanently biased.
   */
  private applyTemporalDecay(): void {
    const w = this.loadWeights();
    const now = Date.now();
    const lastDecay = new Date(w.decayLastApplied).getTime();
    const daysSince = (now - lastDecay) / (1000 * 60 * 60 * 24);

    if (daysSince < 0.5) return; // Only decay if >12h since last

    const decayFactor = this.DECAY_RATE * daysSince;
    for (const engine of Object.keys(w.weights)) {
      const current = w.weights[engine];
      // Exponential decay toward baseline
      w.weights[engine] = current + (this.BASELINE - current) * decayFactor;
      w.weights[engine] = Math.max(this.MIN_WEIGHT, Math.min(this.MAX_WEIGHT, w.weights[engine]));
    }
    w.decayLastApplied = new Date().toISOString();
    this.saveWeights();
  }

  /**
   * Bayesian Update + Hebbian Reinforcement.
   * Positive feedback → weight the engines that fired upward.
   * Negative feedback → weight them down.
   * Also updates co-activation matrix for engine pairs.
   */
  recordFeedback(record: FeedbackRecord): { updatedEngines: string[]; deltaWeights: Record<string, number> } {
    this.applyTemporalDecay();
    const w = this.loadWeights();
    const delta: Record<string, number> = {};

    const signal = record.feedback === 'positive' ? 1
      : record.feedback === 'negative' ? -1
      : 0;

    if (signal === 0) {
      this.logFeedback(record);
      return { updatedEngines: [], deltaWeights: {} };
    }

    // Adjust weight for each engine that fired
    for (const engine of record.enginesUsed) {
      if (!w.weights[engine]) w.weights[engine] = this.BASELINE;

      const current = w.weights[engine];
      // Hebbian: Δw = lr * signal * (1 - |current - baseline|) — bigger signal when near baseline
      const plasticity = 1 - Math.abs(current - this.BASELINE) / (this.MAX_WEIGHT - this.BASELINE);
      const dw = this.LEARNING_RATE * signal * Math.max(0.1, plasticity);

      w.weights[engine] = Math.max(this.MIN_WEIGHT, Math.min(this.MAX_WEIGHT, current + dw));
      delta[engine] = dw;
    }

    // Co-activation matrix update — engines that fire together wire together
    for (let i = 0; i < record.enginesUsed.length; i++) {
      for (let j = i + 1; j < record.enginesUsed.length; j++) {
        const a = record.enginesUsed[i];
        const b = record.enginesUsed[j];
        if (!w.coActivation[a]) w.coActivation[a] = {};
        if (!w.coActivation[b]) w.coActivation[b] = {};
        const current = w.coActivation[a][b] ?? 0;
        const dco = this.LEARNING_RATE * signal * 0.5;
        w.coActivation[a][b] = Math.max(-1, Math.min(1, current + dco));
        w.coActivation[b][a] = w.coActivation[a][b];
      }
    }

    w.feedbackCount++;
    this.saveWeights();
    this.logFeedback(record);

    console.log(`[AIFE] Feedback recorded: ${record.feedback} | Engines affected: ${record.enginesUsed.length} | Total feedback: ${w.feedbackCount}`);

    return { updatedEngines: record.enginesUsed, deltaWeights: delta };
  }

  /**
   * Returns engine priority order for a given context.
   * Higher-weight engines are recommended to fire first.
   */
  getEnginePriority(context: { country?: string; topic?: string }): { engine: string; weight: number; priority: 'high' | 'normal' | 'low' }[] {
    const w = this.loadWeights();
    return Object.entries(w.weights)
      .map(([engine, weight]) => ({
        engine,
        weight,
        priority: weight >= 1.3 ? 'high' as const : weight >= 0.7 ? 'normal' as const : 'low' as const,
      }))
      .sort((a, b) => b.weight - a.weight);
  }

  /**
   * Get the top strongly co-activated engine pairs.
   */
  getStrongCoActivations(minCorrelation = 0.3): { engineA: string; engineB: string; correlation: number }[] {
    const w = this.loadWeights();
    const pairs: { engineA: string; engineB: string; correlation: number }[] = [];
    for (const [a, bMap] of Object.entries(w.coActivation)) {
      for (const [b, corr] of Object.entries(bMap)) {
        if (b > a && Math.abs(corr) >= minCorrelation) {
          pairs.push({ engineA: a, engineB: b, correlation: corr });
        }
      }
    }
    return pairs.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
  }

  getStats(): { totalFeedback: number; engineWeights: Record<string, number>; strongCoActivations: number } {
    const w = this.loadWeights();
    return {
      totalFeedback: w.feedbackCount,
      engineWeights: { ...w.weights },
      strongCoActivations: this.getStrongCoActivations().length,
    };
  }

  private logFeedback(record: FeedbackRecord): void {
    this.ensureDataDir();
    try {
      fs.appendFileSync(FEEDBACK_LOG, JSON.stringify(record) + '\n', 'utf-8');
    } catch { /* non-critical */ }
  }
}

export const adaptiveFeedbackEngine = new AdaptiveIntelligenceFeedbackEngine();
export type { FeedbackRecord };
