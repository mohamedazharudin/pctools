import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');

  const handleNum = (val) => {
    setDisplay((prev) => (prev === '0' ? val : prev + val));
  };

  const handleOp = (op) => {
    const lastChar = display.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      setDisplay(display.slice(0, -1) + op);
    } else {
      setDisplay(display + op);
    }
  };

  const handleClear = () => setDisplay('0');

  const handleEqual = () => {
    try {
      // Evaluate safety check: allow only digits and basic arithmetic operators
      if (/^[0-9+\-*/.]*$/.test(display)) {
        const result = Function(`'use strict'; return (${display})`)();
        setDisplay(String(result));
      }
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4 text-center">🧮 Calculator</h2>
      
      {/* Display Screen */}
      <div className="bg-slate-950 p-4 rounded-xl text-right text-3xl font-mono mb-4 text-blue-400 overflow-x-auto">
        {display}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="col-span-2 bg-red-600 hover:bg-red-500 py-3 rounded-xl font-bold">C</button>
        <button onClick={() => handleOp('/')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-blue-400">÷</button>
        <button onClick={() => handleOp('*')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-blue-400">×</button>

        {['7', '8', '9'].map((n) => (
          <button key={n} onClick={() => handleNum(n)} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold">{n}</button>
        ))}
        <button onClick={() => handleOp('-')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-blue-400">-</button>

        {['4', '5', '6'].map((n) => (
          <button key={n} onClick={() => handleNum(n)} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold">{n}</button>
        ))}
        <button onClick={() => handleOp('+')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-blue-400">+</button>

        {['1', '2', '3'].map((n) => (
          <button key={n} onClick={() => handleNum(n)} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold">{n}</button>
        ))}
        <button onClick={handleEqual} className="row-span-2 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold flex items-center justify-center text-xl">=</button>

        <button onClick={() => handleNum('0')} className="col-span-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold">0</button>
        <button onClick={() => handleNum('.')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold">.</button>
      </div>
    </div>
  );
}