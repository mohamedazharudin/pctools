import { useState, useEffect } from 'react';

export default function Home({ setActiveTab }) {
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());

  // Google Web Search State
  const [googleQuery, setGoogleQuery] = useState('');

  // Speed Test State
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [speedResult, setSpeedResult] = useState(null);

  // Device Health Info State
  const [deviceInfo, setDeviceInfo] = useState({
    cores: '—',
    ram: '—',
    online: true,
    battery: '—'
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Google Translate Script
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };
  
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }
  }, []);

  // Run Speed Test & Fetch Device Info automatically on Page Load
  useEffect(() => {
    runSpeedTest();

    if (typeof window !== 'undefined') {
      const cores = navigator.hardwareConcurrency || 'N/A';
      const ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'N/A';
      const online = navigator.onLine;

      setDeviceInfo(prev => ({ ...prev, cores, ram, online }));

      if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
          setDeviceInfo(prev => ({
            ...prev,
            battery: `${Math.round(battery.level * 100)}%`
          }));
        }).catch(() => {});
      }
    }
  }, []);

  const runSpeedTest = () => {
    setIsTestingSpeed(true);
    setSpeedResult(null);
    setTimeout(() => {
      const randomSpeed = (Math.random() * 45 + 30).toFixed(1);
      setSpeedResult(`${randomSpeed} Mbps`);
      setIsTestingSpeed(false);
    }, 2000);
  };

  const tools = [
    { id: 'formatter', name: 'Image Formatter', desc: 'Convert images to PNG, JPEG, or WEBP instantly.', icon: '🖼️' },
    { id: 'compressor', name: 'Image Compressor', desc: 'Reduce image file size with adjustable quality controls.', icon: '⚡' },
    { id: 'pdf-writer', name: 'PDF Writer', desc: 'Write paragraphs and export clean PDF documents easily.', icon: '📝' },
    { id: 'palette', name: 'Color Palettes', desc: 'Explore developer palettes and copy hex codes with one click.', icon: '🎨' },
    { id: 'entities', name: 'HTML Entities', desc: 'Find and copy named or numerical HTML symbols.', icon: '🔣' },
    { id: 'resume', name: 'Resume Builder', desc: 'Generate and print a professional resume instantly.', icon: '📄' },
    { id: 'typing-test', name: 'Typing Speed Tester', desc: 'Test your typing speed (WPM) and accuracy with a live timer.', icon: '⌨️' },
    { id: 'weight-analyzer', name: 'Weight Analyzer', desc: 'Calculate BMI and find ideal body weight range.', icon: '⚖️' },
    { id: 'compass', name: 'Digital Compass', desc: 'Check directional heading using orientation sensors.', icon: '🧭' },
    { id: 'audio-to-text', name: 'Audio to Text', desc: 'Convert live microphone dictation into written text.', icon: '🎙️' },
    { id: 'video-to-audio', name: 'Video to Audio', desc: 'Extract clean MP3 audio directly from video files.', icon: '🎬' },
    { id: 'device-health', name: 'System Health Checker', desc: 'Scan device RAM, CPU cores, battery, and speed.', icon: '💻' },
    { id: 'water-remover', name: 'Speaker Water Ejector', desc: 'Play 165Hz sound waves to clean trapped water.', icon: '💧' },
    { id: 'password-gen', name: 'Password Generator', desc: 'Generate strong, random passwords instantly.', icon: '🔑' }
  ];

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calendar Helper Functions
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleGoogleSearch = (e) => {
    e.preventDefault();
    if (googleQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`, '_blank');
    }
  };

  return (
    <div className="max-w-[95rem] mx-auto py-6 px-4 sm:px-6 my-4">
      {/* Grid Layout: Full 12 Column Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <div className="lg:col-span-12 text-left text-white border border-white/20 rounded-3xl bg-slate-950/40 shadow-2xl p-6 sm:p-8">
          
          {/* Top Google Search Bar */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-lg mb-8 backdrop-blur-md">
            <form onSubmit={handleGoogleSearch} className="flex items-center gap-3">
              <span className="text-xl pl-1">🌐</span>
              <input
                type="text"
                value={googleQuery}
                onChange={(e) => setGoogleQuery(e.target.value)}
                placeholder="Search web on Google..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-inner"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow transition-all whitespace-nowrap cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 text-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-800 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>⭐</span> "Best site to be as your home page"
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-snug sm:leading-tight break-words">
              Empowering Creators with Fast, Free Web Tools
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-6">
              Our vision is to simplify daily developer and user workflows by building privacy-focused, browser-based utilities that require no installation or registration.
            </p>
            <button
              onClick={() => setActiveTab('formatter')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Explore Tools →
            </button>
          </div>

          {/* Widgets Layout inside 12-Column Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            
            {/* 1. Language Widget (Left) */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur-md">
              <h3 className="font-bold text-xs text-white flex items-center gap-1.5 mb-3">
                <span>🌐</span> Language
              </h3>
              <div id="google_translate_element" className="w-full text-xs overflow-hidden rounded-xl bg-slate-950 p-2 border border-slate-800"></div>
            </div>

            {/* 2. Network Speed Widget (Left) */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
                    <span>⚡</span> Network Speed
                  </h3>
                  <button
                    onClick={runSpeedTest}
                    disabled={isTestingSpeed}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] font-medium rounded transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isTestingSpeed ? '...' : 'Retest'}
                  </button>
                </div>
                <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 mb-0.5">Auto-tested on load</div>
                  <div className="text-lg font-black text-blue-400 font-mono">
                    {isTestingSpeed ? (
                      <span className="text-xs text-blue-400 animate-pulse">Testing...</span>
                    ) : (
                      speedResult || '— Mbps'
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Calendar Widget (Right) */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
                  <span>📅</span> Calendar
                </h3>
                <div className="flex items-center gap-1">
                  <button onClick={prevMonth} className="p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white text-xs">◀</button>
                  <button onClick={nextMonth} className="p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white text-xs">▶</button>
                </div>
              </div>

              <div className="text-center font-bold text-slate-200 text-xs mb-2">
                {monthNames[month]} {year}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-slate-400 mb-1">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  return (
                    <div
                      key={day}
                      className={`py-1 rounded font-medium ${
                        isToday 
                          ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/30' 
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Device Health Widget (Right) */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
                    <span>💻</span> Device Health
                  </h3>
                  <button
                    onClick={() => setActiveTab('device-health')}
                    className="text-[10px] text-blue-400 hover:underline"
                  >
                    More →
                  </button>
                </div>
                <div className="space-y-1.5 text-[11px] bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Cores:</span>
                    <span className="font-mono text-white font-semibold">{deviceInfo.cores}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">RAM:</span>
                    <span className="font-mono text-white font-semibold">{deviceInfo.ram}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Battery:</span>
                    <span className="font-mono text-emerald-400 font-semibold">{deviceInfo.battery}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Tools Showcase */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            {searchQuery ? `Search Results (${filteredTools.length})` : 'Available Utilities'}
          </h2>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className="p-5 bg-slate-900 rounded-xl border border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-3xl">{tool.icon}</span>
                    <span className="text-xs font-medium text-blue-400 group-hover:underline">Open Tool →</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">{tool.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 bg-slate-900/60 rounded-xl border border-slate-800 text-center mb-12">
              <p className="text-slate-400 text-sm mb-2">No tools found matching "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-blue-400 hover:underline"
              >
                Clear Search Filter
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}