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
    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
      <h1 style={{ fontSize: '28px', color: '#1e293b' }}>🎨 Developer Color Palettes</h1>
      <p style={{ color: '#64748b' }}>Click any color box or hex code to copy it to your clipboard.</p>

      {copiedColor && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          fontWeight: 'bold',
          zIndex: 1000
        }}>
          Copied {copiedColor} to clipboard!
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginTop: '25px'
      }}>
        {PALETTES.map((palette, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
          }}>
            {/* Color Swatches */}
            <div style={{ display: 'flex', height: '100px' }}>
              {palette.colors.map((color, i) => (
                <div
                  key={i}
                  onClick={() => copyToClipboard(color)}
                  style={{
                    flex: 1,
                    backgroundColor: color,
                    cursor: 'pointer'
                  }}
                  title={`Click to copy ${color}`}
                />
              ))}
            </div>

            {/* Info & Hex Codes */}
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#1e293b' }}>{palette.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {palette.colors.map((color, i) => (
                  <span
                    key={i}
                    onClick={() => copyToClipboard(color)}
                    style={{
                      fontSize: '11px',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontWeight: 'bold'
                    }}
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