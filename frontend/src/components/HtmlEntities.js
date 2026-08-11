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
    <div className="max-w-4xl mx-auto text-left">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">🔣 HTML Entities & Symbols</h1>
      <p className="text-slate-500 text-sm mb-5">Search and click any entity code to copy it directly.</p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, symbol, or entity (e.g. copyright, &copy;)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 text-base rounded-lg border border-slate-300 mb-5 focus:outline-blue-500 shadow-sm"
      />

      {copiedText && (
        <div className="fixed bottom-5 right-5 bg-emerald-500 text-white py-2 px-5 rounded-md font-bold shadow-lg z-50 animate-bounce">
          Copied "{copiedText}"!
        </div>
      )}

      {/* Entities Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {filteredEntities.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="text-4xl mb-2 text-slate-900 font-serif">
              {item.symbol}
            </div>
            <div className="font-bold text-xs text-slate-700 mb-3 truncate">
              {item.name}
            </div>
            
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => copyToClipboard(item.entity)}
                className="p-1.5 text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded cursor-pointer font-mono text-slate-700 transition-colors"
              >
                Named: <b>{item.entity}</b>
              </button>
              
              <button
                onClick={() => copyToClipboard(item.code)}
                className="p-1.5 text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded cursor-pointer font-mono text-slate-700 transition-colors"
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