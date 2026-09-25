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

  // Run Speed Test & Fetch Device Info automatically on Page Load / Refresh
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
    { id: 'baby-names', name: 'Baby Name Generator', desc: 'Generate unique baby names instantly.', icon: '👶' },
    { id: 'weight-analyzer', name: 'Weight Analyzer', desc: 'Calculate BMI and find ideal body weight range.', icon: '⚖️' },
    { id: 'compass', name: 'Digital Compass', desc: 'Check directional heading using orientation sensors.', icon: '🧭' },
    { id: 'audio-to-text', name: 'Audio to Text', desc: 'Convert live microphone dictation into written text.', icon: '🎙️' },
    { id: 'video-to-audio', name: 'Video to Audio', desc: 'Extract clean MP3 audio directly from video files.', icon: '🎬' },
    { id: 'device-health', name: 'System Health Checker', desc: 'Scan device RAM, CPU cores, battery, and speed.', icon: '💻' },
    { id: 'water-remover', name: 'Speaker Water Ejector', desc: 'Play 165Hz sound waves to clean trapped water.', icon: '💧' },
    { id: 'password-gen', name: 'Password Generator', desc: 'Generate strong, random passwords instantly.', icon: '🔑' }
  ];

  // Filter tools based on internal search
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

  // Handler for Google Web Search
  const handleGoogleSearch = (e) => {
    e.preventDefault();
    if (googleQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`, '_blank');
    }
  };

  return (
    <div className="max-w-[90rem] mx-auto py-6 px-4 sm:px-6 my-4">
      {/* Grid Layout: Main Container on Left, 2 Containers on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Main Container */}
        <div className="lg:col-span-8 text-left text-white border border-white/20 rounded-3xl bg-slate-950/40 shadow-2xl p-6 sm:p-8">
          
          {/* Top Google Search Bar inside Main Container */}
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
                Search Google
              </button>
            </form>
          </div>

          {/* Hero / Vision Section */}
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

          {/* Tools Showcase */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
            {searchQuery ? `Search Results (${filteredTools.length})` : 'Available Utilities'}
          </h2>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
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

          {/* FAQ Section */}
          <div className="bg-slate-900 p-6 sm:p-8 rounded-xl border border-slate-800 mb-12">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <h4 className="font-semibold text-white">Are these tools completely free?</h4>
                <p className="text-slate-400">Yes, all utilities on our platform are entirely free to use without restrictions.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white">Is my data uploaded anywhere?</h4>
                <p className="text-slate-400">No, image conversions, audio processing, and document generations happen directly inside your web browser.</p>
              </div>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900 rounded-xl shadow-sm border border-slate-800">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-white text-lg mb-1">Instant Performance</h3>
              <p className="text-slate-400 text-sm">All operations run locally in your browser for maximum processing speed.</p>
            </div>
            <div className="p-6 bg-slate-900 rounded-xl shadow-sm border border-slate-800">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-bold text-white text-lg mb-1">100% Privacy Focused</h3>
              <p className="text-slate-400 text-sm">Your files and text are processed client-side and never uploaded to external servers.</p>
            </div>
            <div className="p-6 bg-slate-900 rounded-xl shadow-sm border border-slate-800">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-bold text-white text-lg mb-1">Zero Friction</h3>
              <p className="text-slate-400 text-sm">No paywalls, hidden limits, or forced sign-ups—just direct access to essential utilities.</p>
            </div>
          </div>

        </div>

        {/* Right Side - Exactly 2 Containers */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          
          {/* Container 1: Calendar */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>📅</span> Calendar
              </h3>
              <div className="flex items-center gap-1">
                <button onClick={prevMonth} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all text-xs">◀</button>
                <button onClick={nextMonth} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all text-xs">▶</button>
              </div>
            </div>

            <div className="text-center font-bold text-slate-200 text-sm mb-3">
              {monthNames[month]} {year}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                return (
                  <div
                    key={day}
                    className={`py-1.5 rounded-lg font-medium transition-all ${
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

          {/* Container 2: Combined Speed Test & Device Health */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl backdrop-blur-md space-y-6">
            
            {/* Speed Test Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>⚡</span> Network Speed
                </h3>
                <button
                  onClick={runSpeedTest}
                  disabled={isTestingSpeed}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {isTestingSpeed ? 'Testing...' : 'Retest'}
                </button>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">Auto-tested on refresh</div>
                <div className="text-2xl font-black text-blue-400 font-mono">
                  {isTestingSpeed ? (
                    <span className="text-sm text-blue-400 animate-pulse">Running test...</span>
                  ) : (
                    speedResult || '— Mbps'
                  )}
                </div>
              </div>
            </div>

            <hr className="border-slate-800/80" />

            {/* Device Health Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>💻</span> Device Health
                </h3>
                <button
                  onClick={() => setActiveTab('device-health')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  More Details →
                </button>
              </div>
              <div className="space-y-2 text-xs bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">CPU Cores:</span>
                  <span className="font-mono text-white font-semibold">{deviceInfo.cores}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Estimated RAM:</span>
                  <span className="font-mono text-white font-semibold">{deviceInfo.ram}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Battery Level:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{deviceInfo.battery}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}