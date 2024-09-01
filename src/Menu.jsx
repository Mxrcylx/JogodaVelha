import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  const goToGame = (gameType) => {
    if (gameType === 'player-vs-bot') {
      navigate('/difficulty-selection');
    } else {
      navigate(`/${gameType}`);
    }
  };

  return (
    <div>
      <h1>Escolha o tipo de jogo!!!</h1>
      <button onClick={() => goToGame('player-vs-player')}>Player vs Player</button>
      <button onClick={() => goToGame('player-vs-bot')}>Player vs Bot</button>
    </div>
  );
}

export default Menu;
