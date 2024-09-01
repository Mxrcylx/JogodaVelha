import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function calculateWinner(squares) {
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningCombination: [a, b, c] };
    }
  }
  return null;
}

function PlayerVsPlayer() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
      setWinningSquares(result.winningCombination);
    } else if (!squares.includes(null)) {
      setWinner('Empate');
    }
  }, [squares]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningSquares([]);
  };

  const goToMenu = () => {
    navigate('/');
  };

  const renderSquare = (index) => (
    <button 
      className={`square ${winningSquares.includes(index) ? 'animate' : ''}`} 
      onClick={() => handleClick(index)}
    >
      {squares[index]}
    </button>
  );

  const status = winner
    ? winner === 'Empate'
      ? 'Empate!'
      : `${winner === 'X' ? 'Jogador 1' : 'Jogador 2'} ganhou!`
    : `Vez de: ${xIsNext ? 'Jogador 1' : 'Jogador 2'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winner && <button onClick={resetGame}>Reiniciar Jogo</button>}
      <button onClick={goToMenu}>Voltar ao Menu</button>
    </div>
  );
}

export default PlayerVsPlayer;
