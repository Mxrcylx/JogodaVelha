// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import PlayerVsPlayer from './PlayerVsPlayer';
import PlayerVsBot from './PlayerVsBot';
import DifficultySelection from './DifficultySelection';
import AudioPlayer from './components/MusicControl';
import './App.css'; // Verifique o caminho para o arquivo CSS



function App() {
  return (
    <Router>
      <div>
        <AudioPlayer />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/player-vs-player" element={<PlayerVsPlayer />} />
          <Route path="/difficulty-selection" element={<DifficultySelection />} />
          <Route path="/player-vs-bot/:difficulty" element={<PlayerVsBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
