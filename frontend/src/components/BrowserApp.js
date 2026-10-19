import { useState } from 'react';

export default function BrowserApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentUrl, setCurrentUrl] = useState(''); // Empty string = New Tab Home page
  const [inputUrl, setInputUrl] = useState('');
  const [history, setHistory] = useState([]);

  // Default Shortcuts with real browseable web URLs
  const shortcuts = [
    { name: 'wikipedia', url: 'https://www.wikipedia.org', icon: 'W', bgColor: 'bg-slate-700' },
    { name: 'w3schools', url: 'https://www.w3schools.com', icon: 'W', bgColor: 'bg-emerald-600' },
    { name: 'codechef', url: 'https://www.codechef.com', icon: 'CC', bgColor: 'bg-stone-700' },
  ];

  const handleNavigate = (targetUrl) => {
    let formattedUrl = targetUrl.trim();
    if (!formattedUrl) return;

    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setHistory((prev) => [...prev, currentUrl]);
    setCurrentUrl(formattedUrl);
    setInputUrl(formattedUrl);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleNavigate(inputUrl);
  };

  const goHome = () => {
    setCurrentUrl('');
    setInputUrl('');
  };

  const goBack = () => {
    if (history.length > 0) {
      const prevUrl = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentUrl(prevUrl);
      setInputUrl(prevUrl);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#35363a] text-slate-200 font-sans rounded-xl overflow-hidden shadow-2xl border border-white/10 select-none">
      
      {/* 1. Top Chrome Tab Strip */}
      <div className="flex items-center bg-[#202124] px-2 pt-2 gap-1 border-b border-[#202124]">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
          <div
            onClick={goHome}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-t-lg transition cursor-pointer max-w-[200px] shrink-0 ${
              !currentUrl
                ? 'bg-[#35363a] text-white font-medium border-t border-x border-white/10'
                : 'bg-[#202124] text-slate-400 hover:bg-[#2d2e31]'
            }`}
          >
            <span>🌐</span>
            <span className="truncate">{currentUrl || 'Pctutorials - New Tab'}</span>
          </div>
        </div>

        <button onClick={goHome} className="p-1.5 text-slate-400 hover:bg-white/10 hover:text-white rounded-full text-xs cursor-pointer mr-2" title="New Tab">
          ＋
        </button>
      </div>

      {/* 2. Omnibox / Address Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#35363a] border-b border-[#202124]">
        <div className="flex items-center gap-1 text-slate-400">
          <button onClick={goBack} disabled={history.length === 0} className={`p-1 rounded-full ${history.length > 0 ? 'hover:bg-white/10 cursor-pointer' : 'opacity-30'}`}>
            ←
          </button>
          <button onClick={goHome} className="p-1 hover:bg-white/10 rounded-full cursor-pointer" title="Home Page">
            🏠
          </button>
        </div>

        {/* Address Input Form */}
        <form onSubmit={handleFormSubmit} className="flex-1 flex items-center bg-[#202124] border border-transparent focus-within:border-cyan-400/50 rounded-full px-4 py-1.5 text-xs">
          <span className="text-slate-400 mr-2">🔒</span>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Type URL (e.g. wikipedia.org) or search..."
            className="w-full bg-transparent text-slate-200 focus:outline-none"
          />
        </form>
      </div>

      {/* 3. Main Viewport Area */}
      {currentUrl ? (
        // Real Live Web Page Viewport via iframe
        <div className="flex-1 w-full h-full bg-white relative">
          <iframe
            src={currentUrl}
            title="Live Web View"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      ) : (
        // Pctutorials New Tab Start Page
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#2d2e31] overflow-y-auto relative">
          
          {/* Logo Branding */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-xl">
              P
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Pctutorials
            </h1>
          </div>

          {/* Search Box */}
          <form onSubmit={handleFormSubmit} className="w-full max-w-xl mb-6">
            <div className="flex items-center bg-[#202124] border border-white/10 hover:border-white/20 focus-within:border-cyan-400 rounded-full px-4 py-3 shadow-xl transition-all">
              <span className="text-slate-400 mr-3 text-sm">🔍</span>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter web address to navigate live..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </form>

          {/* Live Shortcuts Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 max-w-lg mb-10">
            {shortcuts.map((s, idx) => (
              <div
                key={idx}
                onClick={() => handleNavigate(s.url)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full ${s.bgColor} flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-105 transition-transform border border-white/10`}>
                  {s.icon}
                </div>
                <span className="text-[11px] text-slate-300 truncate w-20 text-center">
                  {s.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}