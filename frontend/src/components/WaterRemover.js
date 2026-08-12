import { useState, useRef } from 'react';

export default function WaterRemover() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);

  const startWaterRemoval = () => {
    // Create Audio Context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Create Oscillator for 165Hz tone (ideal for displacing water)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sawtooth'; // Sawtooth wave generates strong physical vibration
    osc.frequency.setValueAtTime(165, ctx.currentTime);

    // Pulse volume up and down for maximum ejecting effect
    gainNode.gain.setValueAtTime(0.8, ctx.currentTime);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    oscillatorRef.current = osc;
    setIsPlaying(true);
  };

  const stopWaterRemoval = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
    setIsPlaying(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
      <h2 className="text-xl font-bold mb-2">💧 Speaker Water Ejector</h2>
      <p className="text-xs text-slate-400 mb-6">
        Turn your volume to 100% and face your device speakers downward.
      </p>

      <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center bg-slate-950 border border-slate-800 rounded-full">
        <span className={`text-6xl ${isPlaying ? 'animate-bounce' : ''}`}>
          {isPlaying ? '🔊' : '💧'}
        </span>
      </div>

      {!isPlaying ? (
        <button
          onClick={startWaterRemoval}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20"
        >
          ⚡ Eject Water (Play Tone)
        </button>
      ) : (
        <button
          onClick={stopWaterRemoval}
          className="w-full py-3.5 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition-all cursor-pointer animate-pulse"
        >
          🛑 Stop Sound
        </button>
      )}
    </div>
  );
}