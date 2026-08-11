import { useState } from 'react';

const PALETTES = [
  { name: 'Midnight Developer', colors: ['#0f172a', '#1e293b', '#38bdf8', '#f8fafc'] },
  { name: 'Neon Cyberpunk', colors: ['#0d0221', '#023e8a', '#00b4d8', '#ff007f'] },
  { name: 'Modern Dark', colors: ['#18181b', '#27272a', '#a1a1aa', '#6366f1'] },
  { name: 'Clean Light', colors: ['#ffffff', '#f1f5f9', '#0284c7', '#0f172a'] },
];

export default function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState('');

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto text-left">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">🎨 Developer Color Palettes</h1>
      <p className="text-slate-500 text-sm mb-6">Click any color box or hex code to copy it to your clipboard.</p>

      {copiedColor && (
        <div className="fixed bottom-5 right-5 bg-emerald-500 text-white py-2 px-5 rounded-md font-bold shadow-lg z-50 animate-bounce">
          Copied {copiedColor} to clipboard!
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5 mt-6">
        {PALETTES.map((palette, idx) => (
          <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100">
            {/* Color Swatches */}
            <div className="flex h-24">
              {palette.colors.map((color, i) => (
                <div
                  key={i}
                  onClick={() => copyToClipboard(color)}
                  className="flex-1 cursor-pointer transition-opacity hover:opacity-90"
                  style={{ backgroundColor: color }}
                  title={`Click to copy ${color}`}
                />
              ))}
            </div>

            {/* Info & Hex Codes */}
            <div className="p-4">
              <h3 className="m-0 mb-2.5 text-base font-bold text-slate-800">{palette.name}</h3>
              <div className="flex justify-between">
                {palette.colors.map((color, i) => (
                  <span
                    key={i}
                    onClick={() => copyToClipboard(color)}
                    className="text-[11px] text-slate-500 cursor-pointer font-mono font-bold hover:text-blue-600 transition-colors"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}