import React from 'react';
import { T } from '../theme';
import { Btn } from '../components/Btn';
import { Screen } from '../components/Screen';
import { Card } from '../components/Card';
import { useGame } from '../context/GameContext';

export function Voting() {
  const { gameState, myPlayerId, submitVote, nextCategory, nextRound } = useGame();

  if (!gameState || !gameState.answers) return null;

  const cats = gameState.settings.categories;
  const idx = gameState.votingCategoryIndex;
  const cat = cats[idx];
  const me = gameState.players.find(p => p.id === myPlayerId);
  const isAdmin = me?.isAdmin ?? false;
  const isLastCat = idx >= cats.length - 1;

  const catVotes = gameState.votes[cat?.id] ?? {};

  const handleVote = (targetPlayerId: string, accepted: boolean) => {
    if (!cat) return;
    submitVote(targetPlayerId, cat.id, accepted);
  };

  if (!cat) return null;

  return (
    <Screen>
      <div style={{ fontFamily: T.head, fontWeight: 800, fontSize: 13, letterSpacing: 1.5, color: T.muted, textTransform: 'uppercase', marginBottom: 8 }}>
        Abstimmung {idx + 1} / {cats.length}
      </div>
      <div style={{ fontFamily: T.head, fontWeight: 900, fontSize: 28, marginBottom: 4, letterSpacing: -0.5 }}>
        {cat.icon} {cat.label}
      </div>
      <div style={{ color: T.primary, fontFamily: T.head, fontSize: 18, fontWeight: 700, marginBottom: 24 }}>
        Buchstabe: {gameState.letter}
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {cats.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 99,
            background: i <= idx ? T.primary : T.border,
            transition: 'background 0.3s',
          }} />
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        {gameState.answers.map(pa => {
          const answer = pa.answers[cat.id] || '';
          const v = catVotes[pa.playerId];
          const isMe = pa.playerId === myPlayerId;
          const borderColor = v === true ? `${T.green}55` : v === false ? `${T.red}55` : T.border;
          const bgColor = v === true ? `${T.green}0a` : v === false ? `${T.red}0a` : T.surface;

          return (
            <Card key={pa.playerId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, border: `1.5px solid ${borderColor}`, background: bgColor }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: T.muted, fontWeight: 600, marginBottom: 2 }}>
                  {pa.playerEmoji} {pa.playerName}{isMe ? ' (Du)' : ''}
                </div>
                <div style={{ fontFamily: T.head, fontWeight: 700, fontSize: 20, color: answer ? T.text : T.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {answer || '(leer)'}
                </div>
              </div>
              {!isMe && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => handleVote(pa.playerId, false)} style={{
                    width: 42, height: 42, borderRadius: 12,
                    border: `1.5px solid ${v === false ? T.red : T.border}`,
                    background: v === false ? `${T.red}22` : T.surfaceHigh,
                    fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                  }}>✗</button>
                  <button onClick={() => handleVote(pa.playerId, true)} style={{
                    width: 42, height: 42, borderRadius: 12,
                    border: `1.5px solid ${v === true ? T.green : T.border}`,
                    background: v === true ? `${T.green}22` : T.surfaceHigh,
                    fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                  }}>✓</button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {isAdmin && (
        <div style={{ paddingTop: 20 }}>
          {!isLastCat ? (
            <Btn onClick={nextCategory} size="lg" full>Nächste Kategorie →</Btn>
          ) : (
            <Btn onClick={nextRound} size="lg" full>🏆 Ergebnis anzeigen</Btn>
          )}
        </div>
      )}
      {!isAdmin && (
        <div style={{ paddingTop: 20, textAlign: 'center', color: T.muted, fontSize: 14 }}>
          Warte auf den Admin…
        </div>
      )}
    </Screen>
  );
}
