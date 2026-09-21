import { useState } from 'react';

export default function ColorPalette() {
  const [copiedColor, setCopiedColor] = useState('');

  const PALETTES = [
    { name: 'Midnight Developer', colors: ['#0f172a', '#1e293b', '#38bdf8', '#f8fafc'] },
    { name: 'Neon Cyberpunk', colors: ['#0d0221', '#023e8a', '#00b4d8', '#ff007f'] },
    { name: 'Modern Dark', colors: ['#18181b', '#27272a', '#a1a1aa', '#6366f1'] },
    { name: 'Clean Light', colors: ['#ffffff', '#f1f5f9', '#0284c7', '#0f172a'] },
  ];

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      {/* Tool Container */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h1 className="text-xl font-bold mb-1">🎨 Developer Color Palettes</h1>
        <p className="text-slate-400 text-sm mb-6">Click any color box or hex code to copy it to your clipboard.</p>

        {copiedColor && (
          <div className="fixed bottom-5 right-5 bg-emerald-600 text-white py-2 px-5 rounded-xl font-bold shadow-lg z-50 animate-bounce text-sm">
            Copied {copiedColor} to clipboard!
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {PALETTES.map((palette, idx) => (
            <div key={idx} className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-md">
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
                <h3 className="m-0 mb-2.5 text-base font-bold text-white">{palette.name}</h3>
                <div className="flex justify-between">
                  {palette.colors.map((color, i) => (
                    <span
                      key={i}
                      onClick={() => copyToClipboard(color)}
                      className="text-[11px] text-slate-400 cursor-pointer font-mono font-bold hover:text-blue-400 transition-colors"
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

      {/* Publisher Content Section for AdSense Approval */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">About Developer Color Palettes</h2>
          <p>
            Choosing harmonious color schemes is essential for user interface design. This curated collection provides balanced hex code combinations optimized for modern dark and light user interface themes.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">How to Use the Palette Tool</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>Browse the available curated color combinations for your UI project.</li>
            <li>Click directly on any color swatch or hex label to copy the hex code.</li>
            <li>Paste the copied color values into your CSS, Tailwind, or design tool.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">What color format is copied?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                The tool copies standard 6-digit hex codes (e.g. #0f172a) ready for CSS stylesheets.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Can I use these palettes in commercial projects?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Yes, all hex code combinations are open for royalty-free personal and commercial use.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}