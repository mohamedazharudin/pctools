import { useState } from 'react';

const ENTITIES = [
  { name: 'Copyright', entity: '&copy;', code: '&#169;', symbol: '©' },
  { name: 'Registered Trademark', entity: '&reg;', code: '&#174;', symbol: '®' },
  { name: 'Trademark', entity: '&trade;', code: '&#8482;', symbol: '™' },
  { name: 'Euro', entity: '&euro;', code: '&#8364;', symbol: '€' },
  { name: 'Pound', entity: '&pound;', code: '&#163;', symbol: '£' },
  { name: 'Yen', entity: '&yen;', code: '&#165;', symbol: '¥' },
  { name: 'Cent', entity: '&cent;', code: '&#162;', symbol: '¢' },
  { name: 'Ampersand', entity: '&amp;', code: '&#38;', symbol: '&' },
  { name: 'Less Than', entity: '&lt;', code: '&#60;', symbol: '<' },
  { name: 'Greater Than', entity: '&gt;', code: '&#62;', symbol: '>' },
  { name: 'Double Quote', entity: '&quot;', code: '&#34;', symbol: '"' },
  { name: 'Single Quote (Apos)', entity: '&apos;', code: '&#39;', symbol: "'" },
  { name: 'Non-Breaking Space', entity: '&nbsp;', code: '&#160;', symbol: '␣' },
  { name: 'Degree', entity: '&deg;', code: '&#176;', symbol: '°' },
  { name: 'Plus-Minus', entity: '&plusmn;', code: '&#177;', symbol: '±' },
  { name: 'Division', entity: '&divide;', code: '&#247;', symbol: '÷' },
  { name: 'Multiplication', entity: '&times;', code: '&#215;', symbol: '×' },
  { name: 'Infinity', entity: '&infin;', code: '&#8734;', symbol: '∞' },
  { name: 'Left Arrow', entity: '&larr;', code: '&#8592;', symbol: '←' },
  { name: 'Up Arrow', entity: '&uarr;', code: '&#8593;', symbol: '↑' },
  { name: 'Right Arrow', entity: '&rarr;', code: '&#8594;', symbol: '→' },
  { name: 'Down Arrow', entity: '&darr;', code: '&#8595;', symbol: '↓' },
  { name: 'Spades', entity: '&spades;', code: '&#9824;', symbol: '♠' },
  { name: 'Clubs', entity: '&clubs;', code: '&#9827;', symbol: '♣' },
  { name: 'Hearts', entity: '&hearts;', code: '&#9829;', symbol: '♥' },
  { name: 'Diams', entity: '&diams;', code: '&#9830;', symbol: '♦' },
];

export default function HtmlEntities() {
  const [search, setSearch] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const filteredEntities = ENTITIES.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.entity.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.includes(search)
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
      <h1 style={{ fontSize: '28px', color: '#1e293b' }}>🔣 HTML Entities & Symbols</h1>
      <p style={{ color: '#64748b' }}>Search and click any entity code to copy it directly.</p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, symbol, or entity (e.g. copyright, &copy;)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          marginBottom: '20px',
          boxSizing: 'border-box'
        }}
      />

      {copiedText && (
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
          Copied "{copiedText}"!
        </div>
      )}

      {/* Entities Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px'
      }}>
        {filteredEntities.map((item, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '36px', marginBottom: '8px', color: '#0f172a' }}>
              {item.symbol}
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#334155', marginBottom: '8px' }}>
              {item.name}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <button
                onClick={() => copyToClipboard(item.entity)}
                style={{
                  padding: '6px',
                  fontSize: '12px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'monospace'
                }}
              >
                Named: <b>{item.entity}</b>
              </button>
              
              <button
                onClick={() => copyToClipboard(item.code)}
                style={{
                  padding: '6px',
                  fontSize: '12px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: 'monospace'
                }}
              >
                Number: <b>{item.code}</b>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}