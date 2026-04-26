import React, { useEffect, useState } from 'react';
import { T } from '../theme';
import { Screen } from '../components/Screen';
import { useGame } from '../context/GameContext';

export function Reveal() {
  const { gameState, goTo } = useGame();
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [count, setCount] = useState(3);
  const letter = gameState?.letter ?? '?';

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 2) return;
    if (count === 0) { goTo('game'); return; }
    const t = setTimeout(() => setCount(c => c - 1), 800);
    return () => clearTimeout(t);
  }, [phase, count]);

  const phaseLabel = phase === 0
    ? '⏳ Buchstabe wird gewählt…'
    : phase === 1
    ? '🎲 Der Buchstabe ist…'
    : '🏃 Los geht\'s in…';

  const display = phase === 0 ? '?' : phase === 1 ? letter : count === 0 ? '🔥' : String(count);

  return (
    <Screen style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 24 }}>
      <div style={{ color: T.muted, fontSize: 18, fontFamily: T.head, fontWeight: 600 }}>
        {phaseLabel}
      </div>
      <div style={{
        fontFamily: T.head,
        fontWeight: 900,
        fontSize: phase === 1 ? 140 : phase === 2 ? 100 : 0,
        color: T.primary,
        lineHeight: 1,
        transition: 'all 0.5s cubic-bezier(.34,1.56,.64,1)',
        textShadow: `0 0 60px ${T.primary}88`,
        letterSpacing: -4,
      }}>
        {display}
      </div>
      <div style={{ color: T.muted, fontSize: 15 }}>
        {phase === 2 && count > 0 ? 'Macht euch bereit!' : phase === 2 ? 'LOS!' : ''}
      </div>
    </Screen>
  );
}
