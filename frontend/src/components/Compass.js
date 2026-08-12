import { useState, useEffect } from 'react';

export default function Compass() {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const handleOrientation = (e) => {
      const dir = e.webkitCompassHeading || (360 - e.alpha);
      if (dir) setHeading(Math.round(dir));
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white text-center">
      <h2 className="text-xl font-bold mb-6">🧭 Compass</h2>
      <div className="relative w-48 h-48 mx-auto border-4 border-slate-700 rounded-full flex items-center justify-center">
        <div 
          className="text-4xl transition-transform duration-200"
          style={{ transform: `rotate(${-heading}deg)` }}
        >
          ⬆️
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold text-blue-400">{heading}°</p>
    </div>
  );
}