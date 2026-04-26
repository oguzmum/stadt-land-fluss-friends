import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { Join } from './pages/Join';
import { Lobby } from './pages/Lobby';
import { Reveal } from './pages/Reveal';
import { Round } from './pages/Round';
import { Voting } from './pages/Voting';
import { Scoreboard } from './pages/Scoreboard';

function GameRouter() {
  const { screen, error, clearError } = useGame();

  const PAGE_MAP = {
    home:       <Home />,
    create:     <Create />,
    join:       <Join />,
    lobby:      <Lobby />,
    reveal:     <Reveal />,
    game:       <Round />,
    voting:     <Voting />,
    scoreboard: <Scoreboard />,
  };

  return (
    <>
      {PAGE_MAP[screen] ?? <Home />}
      {error && <Toast message={error} onClose={clearError} />}
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
