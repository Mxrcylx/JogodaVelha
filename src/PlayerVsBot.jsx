import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

function getBotMove(squares, difficulty) {
  const emptySquares = squares.map((value, index) => value === null ? index : -1).filter(index => index !== -1);

  if (difficulty === 'easy') {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  if (difficulty === 'medium') {
    // Tenta bloquear o movimento vencedor do jogador
    for (let i = 0; i < emptySquares.length; i++) {
      const index = emptySquares[i];
      const squaresCopy = squares.slice();
      squaresCopy[index] = 'O';
      if (calculateWinner(squaresCopy)) {
        return index;
      }
    }

    // Tenta ganhar
    for (let i = 0; i < emptySquares.length; i++) {
      const index = emptySquares[i];
      const squaresCopy = squares.slice();
      squaresCopy[index] = 'X';
      if (calculateWinner(squaresCopy)) {
        return index;
      }
    }

    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  if (difficulty === 'hard') {
    return minimax(squares, 'O').index;
  }

  return emptySquares[0]; // Fallback para o primeiro quadrado vazio
}

function minimax(squares, player) {
  const emptySquares = squares.map((value, index) => value === null ? index : -1).filter(index => index !== -1);

  const winner = calculateWinner(squares);
  if (winner && winner.winner === 'X') return { score: -10 };
  if (winner && winner.winner === 'O') return { score: 10 };
  if (emptySquares.length === 0) return { score: 0 };

  const moves = [];

  for (let i = 0; i < emptySquares.length; i++) {
    const index = emptySquares[i];
    const move = {};
    move.index = index;
    const squaresCopy = squares.slice();
    squaresCopy[index] = player;

    const result = minimax(squaresCopy, player === 'O' ? 'X' : 'O');
    move.score = result.score;

    moves.push(move);
  }

  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function PlayerVsBot() {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      setWinner(result.winner);
      setWinningSquares(result.winningCombination);
    } else if (!squares.includes(null)) {
      setWinner('Empate');
    }
  }, [squares]);

  useEffect(() => {
    if (!xIsNext && !winner) {
      const botMove = getBotMove(squares, difficulty);
      if (botMove !== null) {
        setTimeout(() => {
          const newSquares = squares.slice();
          newSquares[botMove] = 'O';
          setSquares(newSquares);
          setXIsNext(true);
        }, 500);
      }
    }
  }, [xIsNext, squares, winner, difficulty]);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = 'X';
    setSquares(newSquares);
    setXIsNext(false);
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

  const goToDifficultySelection = () => {
    navigate('/difficulty-selection');
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
      : `${winner === 'X' ? 'Jogador' : 'Computador'} ganhou!`
    : `Vez de: ${xIsNext ? 'Jogador' : 'Computador'}`;

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
      <button onClick={goToDifficultySelection}>Voltar à Seleção de Dificuldade</button>
    </div>
  );
}

export default PlayerVsBot;
