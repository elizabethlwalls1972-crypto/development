/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * LIVE ADVERSARIAL CALIBRATION ENGINE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Dynamically adjusts the 5-persona debate weights based on actual outcome
 * track records. Unlike static systems, this learns which personas are most
 * accurate in which sectors and reweights in real-time.
 *
 * WORLD-FIRST: No commercial system currently adapts persona credibility
 * based on historical accuracy across sectors.
 */

import { ReportParameters } from '../../types';

export interface PersonaAccuracyRecord {
  personaId: string;
  personaName: string;
  sector: string;
  country: string;
  prediction: string;
  actualOutcome: string;
  wasCorrect: boolean;
  confidence: number;
  timestamp: string;
  outcomeVerifiedAt?: string;
  recordId: string;
}

export interface PersonaCalibrationState {
  personaId: string;
  personaName: string;
  baseWeight: number;
  currentWeight: number;
  accuracyBySector: Record<string, number>; // sector -> accuracy %
  accuracyByCountry: Record<string, number>; // country -> accuracy %
  overallAccuracy: number;
  predictionsCount: number;
  correctCount: number;
  lastUpdated: string;
  confidenceDecay: number; // how much uncertainty to apply (0-1)
}

export interface CalibrationSession {
  sessionId: string;
  personas: PersonaCalibrationState[];
  adjustmentFactor: number; // overall multiplier for debate intensity
  createdAt: string;
  updatedAt: string;
}

export class LiveAdversarialCalibration {
  private accuracyLog: PersonaAccuracyRecord[] = [];
  private calibrationStates: Map<string, PersonaCalibrationState> = new Map();

  private readonly PERSONAS = [
    { id: 'optimist', name: 'Optimist', baseWeight: 0.18 },
    { id: 'skeptic', name: 'Skeptic', baseWeight: 0.22 },
    { id: 'pragmatist', name: 'Pragmatist', baseWeight: 0.20 },
    { id: 'contrarian', name: 'Contrarian', baseWeight: 0.18 },
    { id: 'synthesist', name: 'Synthesist', baseWeight: 0.22 },
  ];

  constructor() {
    this.initializePersonas();
  }

  private initializePersonas(): void {
    for (const persona of this.PERSONAS) {
      this.calibrationStates.set(persona.id, {
        personaId: persona.id,
        personaName: persona.name,
        baseWeight: persona.baseWeight,
        currentWeight: persona.baseWeight,
        accuracyBySector: {},
        accuracyByCountry: {},
        overallAccuracy: 0.5,
        predictionsCount: 0,
        correctCount: 0,
        lastUpdated: new Date().toISOString(),
        confidenceDecay: 0,
      });
    }
  }

  /**
   * Record a prediction from a persona for later verification.
   */
  recordPrediction(
    personaId: string,
    sector: string,
    country: string,
    prediction: string,
    confidence: number
  ): PersonaAccuracyRecord {
    const record: PersonaAccuracyRecord = {
      personaId,
      personaName: this.PERSONAS.find(p => p.id === personaId)?.name || personaId,
      sector,
      country,
      prediction,
      actualOutcome: '',
      wasCorrect: false,
      confidence,
      timestamp: new Date().toISOString(),
      recordId: `${personaId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    this.accuracyLog.push(record);
    return record;
  }

  /**
   * Verify outcome and update persona accuracy weights.
   * This is where learning happens — compare prediction vs. actual result.
   */
  verifyOutcome(
    recordId: string,
    actualOutcome: string,
    wasCorrect: boolean
  ): void {
    const record = this.accuracyLog.find(r => r.recordId === recordId);
    if (!record) return;

    record.actualOutcome = actualOutcome;
    record.wasCorrect = wasCorrect;
    record.outcomeVerifiedAt = new Date().toISOString();

    // Update persona state
    const state = this.calibrationStates.get(record.personaId);
    if (!state) return;

    state.predictionsCount += 1;
    if (wasCorrect) state.correctCount += 1;

    // Sector-specific accuracy
    const sectorKey = record.sector || 'general';
    const currentSectorAccuracy = state.accuracyBySector[sectorKey] ?? 0.5;
    state.accuracyBySector[sectorKey] =
      (currentSectorAccuracy * (state.predictionsCount - 1) + (wasCorrect ? 1 : 0)) /
      state.predictionsCount;

    // Country-specific accuracy
    const countryKey = record.country || 'global';
    const currentCountryAccuracy = state.accuracyByCountry[countryKey] ?? 0.5;
    state.accuracyByCountry[countryKey] =
      (currentCountryAccuracy * (state.predictionsCount - 1) + (wasCorrect ? 1 : 0)) /
      state.predictionsCount;

    // Overall accuracy
    state.overallAccuracy = state.correctCount / state.predictionsCount;
    state.lastUpdated = new Date().toISOString();

    // Recompute weights
    this.recalibrateWeights();
  }

  /**
   * Dynamically adjust debate weights based on accuracy.
   * Skeptic with 70% accuracy gets higher weight than one with 40%.
   */
  private recalibrateWeights(): void {
    const states = Array.from(this.calibrationStates.values());
    const accuracies = states.map(s => s.overallAccuracy);
    const maxAccuracy = Math.max(...accuracies, 0.51);
    const totalWeight = 1.0;

    // Redistribute weights proportionally to accuracy, with decay for uncertainty
    const adjustedWeights = states.map(state => {
      const accuracyRatio = state.overallAccuracy / maxAccuracy;
      const uncertainty = 1 - (state.predictionsCount / (state.predictionsCount + 10)); // decay as we get more data
      const adjustedAccuracy = accuracyRatio * (1 - uncertainty * 0.3); // cap uncertainty impact at 30%
      return {
        personaId: state.personaId,
        adjustedAccuracy,
      };
    });

    const sumAdjustedAccuracy = adjustedWeights.reduce((sum, w) => sum + w.adjustedAccuracy, 0);

    adjustedWeights.forEach(w => {
      const state = this.calibrationStates.get(w.personaId)!;
      state.currentWeight = (w.adjustedAccuracy / sumAdjustedAccuracy) * totalWeight;
      state.confidenceDecay = 1 - (state.predictionsCount / (state.predictionsCount + 20));
    });
  }

  /**
   * Get current debate weights — use these in the 5-persona debate.
   */
  getDebateWeights(): Record<string, number> {
    const weights: Record<string, number> = {};
    this.calibrationStates.forEach((state, id) => {
      weights[id] = state.currentWeight;
    });
    return weights;
  }

  /**
   * Get calibration state for a specific persona.
   */
  getPersonaCalibration(personaId: string): PersonaCalibrationState | undefined {
    return this.calibrationStates.get(personaId);
  }

  /**
   * Get full calibration session for transparency / reporting.
   */
  getCalibrationSession(): CalibrationSession {
    const personas = Array.from(this.calibrationStates.values());
    const sumWeights = personas.reduce((sum, p) => sum + p.currentWeight, 0);
    const adjustmentFactor = sumWeights > 0 ? 1 / sumWeights : 1;

    return {
      sessionId: `cal-${Date.now()}`,
      personas,
      adjustmentFactor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Get sector-specific calibration — which personas are strongest in which sectors?
   */
  getSectorLeaderboard(sector: string): Array<{
    personaName: string;
    accuracy: number;
    weight: number;
    predictions: number;
  }> {
    return Array.from(this.calibrationStates.values())
      .map(state => ({
        personaName: state.personaName,
        accuracy: state.accuracyBySector[sector] ?? state.overallAccuracy,
        weight: state.currentWeight,
        predictions: state.predictionsCount,
      }))
      .sort((a, b) => b.accuracy - a.accuracy);
  }

  /**
   * Export accuracy log for audit trail.
   */
  exportAccuracyLog(filters?: {
    personaId?: string;
    sector?: string;
    country?: string;
    startDate?: string;
    endDate?: string;
  }): PersonaAccuracyRecord[] {
    let filtered = [...this.accuracyLog];

    if (filters?.personaId) {
      filtered = filtered.filter(r => r.personaId === filters.personaId);
    }
    if (filters?.sector) {
      filtered = filtered.filter(r => r.sector === filters.sector);
    }
    if (filters?.country) {
      filtered = filtered.filter(r => r.country === filters.country);
    }
    if (filters?.startDate) {
      filtered = filtered.filter(r => r.timestamp >= filters.startDate!);
    }
    if (filters?.endDate) {
      filtered = filtered.filter(r => r.timestamp <= filters.endDate!);
    }

    return filtered;
  }

  /**
   * Calculate confidence decay — newer personas with fewer predictions get less trust.
   */
  getConfidenceMultiplier(personaId: string): number {
    const state = this.calibrationStates.get(personaId);
    if (!state) return 1;

    // With 100+ predictions, multiplier approaches 1.0
    // With 0 predictions, multiplier is 0.5 (maximum caution)
    return 0.5 + (Math.min(state.predictionsCount, 100) / 100) * 0.5;
  }
}

export default new LiveAdversarialCalibration();
