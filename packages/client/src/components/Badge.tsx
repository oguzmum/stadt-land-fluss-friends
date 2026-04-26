import React from 'react';
import { T } from '../theme';

interface BadgeProps {
  emoji: string;
  name: string;
  score?: number;
  big?: boolean;
}

export function Badge({ emoji, name, score, big = false }: BadgeProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: big ? 48 : 36,
        height: big ? 48 : 36,
        borderRadius: '50%',
        background: T.surfaceHigh,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: big ? 24 : 18,
        border: `1px solid ${T.border}`,
        flexShrink: 0,
      }}>
        {emoji}
      </div>
      <div>
        <div style={{ fontWeight: 600, fontSize: big ? 17 : 15 }}>{name}</div>
        {score !== undefined && (
          <div style={{ fontSize: 13, color: T.muted }}>{score} Punkte</div>
        )}
      </div>
    </div>
  );
}
