import React, { useState, useRef, useEffect } from 'react';
import ativadoIcon from '../assets/ativado.png'; // Ícone de música ativada
import desativadoIcon from '../assets/desativado.png'; // Ícone de música desativada

const AudioPlayer = () => {
  const [isMusicOn, setIsMusicOn] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      isMusicOn ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isMusicOn]);

  const toggleMusic = () => {
    setIsMusicOn(!isMusicOn);
  };

  return (
    <div style={{ position: 'fixed', bottom: 10, right: 10 }}>
      <audio ref={audioRef} src="/dance-mood.mp3" loop />
      <button onClick={toggleMusic} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        <img
          src={isMusicOn ? ativadoIcon : desativadoIcon}
          alt={isMusicOn ? 'Música Ativada' : 'Música Desativada'}
          style={{ width: 50, height: 50 }}
        />
      </button>
    </div>
  );
};

export default AudioPlayer;
