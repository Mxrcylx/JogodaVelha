import React from 'react';
import { useNavigate } from 'react-router-dom';

function DifficultySelection() {
  const navigate = useNavigate();

  const handleDifficultySelect = (difficulty) => {
    navigate(`/player-vs-bot/${difficulty}`);
  };

  return (
    <div>
      <h1>Escolha a Dificuldade</h1>
      <button onClick={() => handleDifficultySelect('easy')}>Fácil</button>
      <button onClick={() => handleDifficultySelect('medium')}>Médio</button>
      <button onClick={() => handleDifficultySelect('hard')}>Difícil</button>
    </div>
  );
}

export default DifficultySelection;
