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
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Interactive Compass Tool */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
        <h1 className="text-xl font-bold mb-6">🧭 Online Digital Compass</h1>
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

      {/* SEO Publisher Article Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">About the Online Digital Compass</h2>
          <p>
            This free online compass helps you find cardinal directions directly from your web browser. It uses your device hardware sensors to display real-time magnetic heading readings in degrees.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">How to Use the Compass</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>Open this webpage on a mobile device or tablet equipped with orientation sensors.</li>
            <li>Allow location or orientation permission requests if prompted by your browser.</li>
            <li>Hold your device flat and level relative to the ground to ensure accurate direction readings.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Why does the compass not work on my desktop computer?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Most standard desktop computers lack built-in magnetometer and gyroscope hardware needed for orientation tracking.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Is my location data saved?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No, direction calculations run locally inside your browser and no orientation data is collected or saved.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}