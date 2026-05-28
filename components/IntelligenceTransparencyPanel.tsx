/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ADVERSIQ — INTELLIGENCE TRANSPARENCY PANEL
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Shows users EXACTLY which intelligence engines fired for their question,
 * what data was used, what confidence level was achieved, and allows
 * thumbs-up/thumbs-down feedback that feeds the adaptive learning system.
 *
 * This makes Susan's intelligence visible and trustworthy.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from 'react';

interface IntelligenceData {
  enginesUsed: string[];
  brainFired: boolean;
  engineCount: number;
}

interface Props {
  intelligence?: IntelligenceData;
  confidence: number;
  messageId: string;
  responseTime?: number;
  country?: string;
  topic?: string;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

export const IntelligenceTransparencyPanel: React.FC<Props> = ({
  intelligence,
  confidence,
  messageId,
  responseTime,
  country,
  topic,
  onFeedback,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'positive' | 'negative' | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  if (!intelligence?.brainFired && confidence < 85) {
    return null; // Don't show panel for trivial responses
  }

  const handleFeedback = async (type: 'positive' | 'negative') => {
    if (feedbackSent) return;
    setFeedbackGiven(type);
    setFeedbackSent(true);
    onFeedback?.(type);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          enginesUsed: intelligence?.enginesUsed ?? [],
          feedback: type,
          confidence,
          country,
          topic,
          responseTime: responseTime ?? 0,
        }),
      });
    } catch {
      // Non-critical — feedback is best-effort
    }
  };

  const confidenceColor = confidence >= 90 ? '#22c55e' : confidence >= 75 ? '#f59e0b' : '#ef4444';
  const confidenceLabel = confidence >= 90 ? 'HIGH' : confidence >= 75 ? 'MODERATE' : 'LOW';

  return (
    <div style={{
      marginTop: '12px',
      padding: '10px 14px',
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid rgba(99, 102, 241, 0.25)',
      borderRadius: '8px',
      fontSize: '11px',
      fontFamily: 'JetBrains Mono, Fira Code, monospace',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {intelligence?.brainFired && (
          <span style={{ color: '#818cf8', letterSpacing: '0.05em' }}>
            ⚡ {intelligence.engineCount} ENGINE{intelligence.engineCount !== 1 ? 'S' : ''} FIRED
          </span>
        )}
        <span style={{ color: confidenceColor }}>
          ◈ CONFIDENCE: {confidenceLabel} ({confidence}%)
        </span>
        {responseTime && (
          <span style={{ color: '#64748b' }}>
            ⏱ {(responseTime / 1000).toFixed(1)}s
          </span>
        )}
        {intelligence?.brainFired && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6366f1',
              cursor: 'pointer',
              fontSize: '11px',
              padding: '0',
              marginLeft: 'auto',
            }}
          >
            {expanded ? '▲ hide detail' : '▼ show engines'}
          </button>
        )}

        {/* Feedback buttons */}
        <div style={{ display: 'flex', gap: '8px', marginLeft: intelligence?.brainFired ? '0' : 'auto' }}>
          <button
            onClick={() => handleFeedback('positive')}
            disabled={feedbackSent}
            title="This response was helpful"
            style={{
              background: feedbackGiven === 'positive' ? 'rgba(34, 197, 94, 0.2)' : 'none',
              border: `1px solid ${feedbackGiven === 'positive' ? '#22c55e' : 'rgba(100,116,139,0.3)'}`,
              color: feedbackGiven === 'positive' ? '#22c55e' : '#64748b',
              borderRadius: '4px',
              padding: '2px 8px',
              cursor: feedbackSent ? 'default' : 'pointer',
              fontSize: '12px',
              transition: 'all 0.15s',
            }}
          >
            👍
          </button>
          <button
            onClick={() => handleFeedback('negative')}
            disabled={feedbackSent}
            title="This response could be improved"
            style={{
              background: feedbackGiven === 'negative' ? 'rgba(239, 68, 68, 0.2)' : 'none',
              border: `1px solid ${feedbackGiven === 'negative' ? '#ef4444' : 'rgba(100,116,139,0.3)'}`,
              color: feedbackGiven === 'negative' ? '#ef4444' : '#64748b',
              borderRadius: '4px',
              padding: '2px 8px',
              cursor: feedbackSent ? 'default' : 'pointer',
              fontSize: '12px',
              transition: 'all 0.15s',
            }}
          >
            👎
          </button>
        </div>
      </div>

      {/* Expanded engine list */}
      {expanded && intelligence?.enginesUsed && intelligence.enginesUsed.length > 0 && (
        <div style={{ marginTop: '10px', borderTop: '1px solid rgba(99,102,241,0.15)', paddingTop: '8px' }}>
          <div style={{ color: '#475569', marginBottom: '6px' }}>Intelligence sources used:</div>
          {intelligence.enginesUsed.map((engine, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ color: '#6366f1' }}>▸</span>
              <span style={{ color: '#94a3b8' }}>{engine}</span>
            </div>
          ))}
          {feedbackSent && (
            <div style={{ marginTop: '8px', color: feedbackGiven === 'positive' ? '#22c55e' : '#f59e0b', fontSize: '10px' }}>
              {feedbackGiven === 'positive'
                ? '✓ Feedback recorded — these engines will be strengthened for similar queries'
                : '✓ Feedback recorded — system will adjust engine weights to improve accuracy'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IntelligenceTransparencyPanel;
