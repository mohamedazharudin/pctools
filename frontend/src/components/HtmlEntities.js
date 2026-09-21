import { useState } from 'react';

export default function HtmlEntities() {
  const [search, setSearch] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const ENTITIES = [
    { key: 'copyright', name: 'Copyright', entity: '&copy;', code: '&#169;', symbol: '©' },
    { key: 'registered', name: 'Registered Trademark', entity: '&reg;', code: '&#174;', symbol: '®' },
    { key: 'trademark', name: 'Trademark', entity: '&trade;', code: '&#8482;', symbol: '™' },
    { key: 'euro', name: 'Euro', entity: '&euro;', code: '&#8364;', symbol: '€' },
    { key: 'pound', name: 'Pound', entity: '&pound;', code: '&#163;', symbol: '£' },
    { key: 'yen', name: 'Yen', entity: '&yen;', code: '&#165;', symbol: '¥' },
    { key: 'cent', name: 'Cent', entity: '&cent;', code: '&#162;', symbol: '¢' },
    { key: 'ampersand', name: 'Ampersand', entity: '&amp;', code: '&#38;', symbol: '&' },
    { key: 'lessThan', name: 'Less Than', entity: '&lt;', code: '&#60;', symbol: '<' },
    { key: 'greaterThan', name: 'Greater Than', entity: '&gt;', code: '&#62;', symbol: '>' },
    { key: 'doubleQuote', name: 'Double Quote', entity: '&quot;', code: '&#34;', symbol: '"' },
    { key: 'singleQuote', name: 'Single Quote (Apos)', entity: '&apos;', code: '&#39;', symbol: "'" },
    { key: 'nbsp', name: 'Non-Breaking Space', entity: '&nbsp;', code: '&#160;', symbol: '␣' },
    { key: 'degree', name: 'Degree', entity: '&deg;', code: '&#176;', symbol: '°' },
    { key: 'plusMinus', name: 'Plus-Minus', entity: '&plusmn;', code: '&#177;', symbol: '±' },
    { key: 'division', name: 'Division', entity: '&divide;', code: '&#247;', symbol: '÷' },
    { key: 'multiplication', name: 'Multiplication', entity: '&times;', code: '&#215;', symbol: '×' },
    { key: 'infinity', name: 'Infinity', entity: '&infin;', code: '&#8734;', symbol: '∞' },
    { key: 'leftArrow', name: 'Left Arrow', entity: '&larr;', code: '&#8592;', symbol: '←' },
    { key: 'upArrow', name: 'Up Arrow', entity: '&uarr;', code: '&#8593;', symbol: '↑' },
    { key: 'rightArrow', name: 'Right Arrow', entity: '&rarr;', code: '&#8594;', symbol: '→' },
    { key: 'downArrow', name: 'Down Arrow', entity: '&darr;', code: '&#8595;', symbol: '↓' },
    { key: 'spades', name: 'Spades', entity: '&spades;', code: '&#9824;', symbol: '♠' },
    { key: 'clubs', name: 'Clubs', entity: '&clubs;', code: '&#9827;', symbol: '♣' },
    { key: 'hearts', name: 'Hearts', entity: '&hearts;', code: '&#9829;', symbol: '♥' },
    { key: 'diams', name: 'Diams', entity: '&diams;', code: '&#9830;', symbol: '♦' },
  ];

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
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      {/* Tool Container */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h2 className="text-xl font-bold mb-1">🔣 HTML Entities & Symbols</h2>
        <p className="text-slate-400 text-sm mb-5">
          Search and click any entity code to copy it directly to your clipboard.
        </p>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, symbol, or entity (e.g. copyright, &copy;)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 bg-slate-950 text-sm text-white rounded-xl border border-slate-800 mb-6 focus:outline-none focus:border-blue-500 shadow-sm"
        />

        {copiedText && (
          <div className="fixed bottom-5 right-5 bg-emerald-600 text-white py-2 px-5 rounded-xl font-bold shadow-lg z-50 animate-bounce text-sm">
            Copied "{copiedText}"!
          </div>
        )}

        {/* Entities Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {filteredEntities.map((item, idx) => (
            <div key={idx} className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-center hover:border-slate-700 transition-all">
              <div className="text-4xl mb-2 text-white font-serif">
                {item.symbol}
              </div>
              <div className="font-bold text-xs text-slate-300 mb-3 truncate">
                {item.name}
              </div>
              
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => copyToClipboard(item.entity)}
                  className="p-1.5 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg cursor-pointer font-mono text-slate-300 hover:text-white transition-colors"
                >
                  Named: <b className="text-blue-400">{item.entity}</b>
                </button>
                
                <button
                  onClick={() => copyToClipboard(item.code)}
                  className="p-1.5 text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg cursor-pointer font-mono text-slate-300 hover:text-white transition-colors"
                >
                  Number: <b className="text-emerald-400">{item.code}</b>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">About HTML Entities & Symbols Reference</h3>
          <p>
            HTML entities are sets of characters used to represent reserved HTML characters or non-standard symbols that are difficult to type on standard keyboards. Using entity codes ensures characters display reliably across all browsers.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Named vs. Numeric Entities</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li>
              <strong className="text-slate-200">Named Entities:</strong>{' '}
              Human-readable aliases beginning with an ampersand and ending with a semicolon (e.g., &amp;copy;).
            </li>
            <li>
              <strong className="text-slate-200">Numeric Entities:</strong>{' '}
              Decimal numerical character references corresponding to Unicode positions (e.g., &amp;#169;).
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Why should reserved characters like &lt; and &gt; be escaped?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Browsers mistake raw angle brackets for HTML tags, causing parsing errors or hidden content.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Are HTML entity names case-sensitive?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Yes, entity names are case-sensitive and must be written in lowercase or exact specified casing.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}