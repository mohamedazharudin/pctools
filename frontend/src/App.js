import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Import all tool components
import ImageFormatter from './components/ImageFormatter';
import ImageCompressor from './components/ImageCompressor';
import ColorPalette from './components/ColorPalette';
import HtmlEntities from './components/HtmlEntities';
import ResumeBuilder from './components/ResumeBuilder';
import PdfWriter from './components/PdfWriter';
import IpFinder from './components/IpFinder';
import SpeedTest from './components/SpeedTest';
import Calculator from './components/Calculator';
import AgeCalculator from './components/AgeCalculator';
import DateDifference from './components/DateDifference';
import WeightAnalyzer from './components/WeightAnalyzer';
import Humanizer from './components/Humanizer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import TermsAndConditions from './components/TermsAndConditions';
import VideoToAudio from './components/VideoToAudio';
import DeviceHealth from './components/DeviceHealth';
import WaterRemover from './components/WaterRemover';
import PasswordGenerator from './components/PasswordGenerator';
import AptitudeQuestions from './components/AptitudeQuestions';
import MernTutorial from './components/MernTutorial';
import TypingTest from './components/TypingTest';

import DonateModal from './components/DonateModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';

// Desktop Welcome Screen
function DesktopHome({ onOpenStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6 text-white">
      <div className="w-20 h-20 bg-white/10 rounded-3xl border border-white/20 flex items-center justify-center text-4xl shadow-2xl mb-4 backdrop-blur-md">
        💻
      </div>
      <h1 className="text-2xl font-bold mb-2">Welcome to PcTools Workspace</h1>
      <p className="text-sm text-slate-300 max-w-md mb-6">
        Click the Start menu button on the taskbar or use desktop shortcuts on the left to launch tools.
      </p>
      <button
        onClick={onOpenStart}
        className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg transition active:scale-95 cursor-pointer"
      >
        Open Start Menu 🚀
      </button>
    </div>
  );
}

// Authentic Windows 11 Start Menu
function Windows11StartMenu({ setActiveTab, searchQuery, setSearchQuery, allTools }) {
  const [showAllApps, setShowAllApps] = useState(false);

  const filteredTools = allTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[600px] mx-auto p-6 bg-[#202020]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl text-white flex flex-col max-h-[80vh] overflow-y-auto font-sans select-none">
      
      {/* Search Bar */}
      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for apps, settings, and documents..."
          className="w-full pl-11 pr-4 py-2 bg-[#1c1c1c]/90 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 shadow-inner"
        />
      </div>

      {showAllApps ? (
        // All Apps View
        <div className="flex-col flex mb-4">
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-xs font-semibold text-slate-200 tracking-wide">All Apps</span>
            <button 
              onClick={() => setShowAllApps(false)} 
              className="text-[11px] text-cyan-400 cursor-pointer hover:underline bg-white/5 px-2.5 py-1 rounded border border-white/10"
            >
              ‹ Back
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[50vh]">
            {allTools.map((tool) => (
              <div
                key={`all-${tool.id}`}
                onClick={() => setActiveTab(tool.id)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-white/10"
              >
                <span className="text-2xl p-2 rounded-xl bg-slate-800/50 border border-white/5">{tool.icon}</span>
                <div className="overflow-hidden text-left">
                  <h4 className="text-xs font-semibold text-white truncate">{tool.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Pinned & Recommended Default View
        <>
          <div className="mb-5">
            <div className="flex justify-between items-center mb-3 px-1">
              <span className="text-xs font-semibold text-slate-200 tracking-wide">Pinned</span>
              <button 
                onClick={() => setShowAllApps(true)} 
                className="text-[11px] text-cyan-400 cursor-pointer hover:underline bg-white/5 px-2 py-0.5 rounded border border-white/10"
              >
                All apps ›
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 text-center">
              {allTools.slice(0, 12).map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setActiveTab(tool.id)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-all active:scale-95 group"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800/60 border border-white/10 shadow group-hover:scale-105 transition-transform text-lg">
                    {tool.icon}
                  </div>
                  <span className="text-[11px] font-medium text-slate-200 truncate w-full">{tool.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs font-semibold text-slate-200 tracking-wide">Recommended</span>
              <span className="text-[11px] text-slate-400 cursor-pointer hover:underline">More ›</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredTools.slice(0, 4).map((tool) => (
                <div
                  key={`rec-${tool.id}`}
                  onClick={() => setActiveTab(tool.id)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-white/10 active:scale-98"
                >
                  <span className="text-xl p-2 rounded-xl bg-slate-800/50 border border-white/5">{tool.icon}</span>
                  <div className="overflow-hidden text-left">
                    <h4 className="text-xs font-semibold text-white truncate">{tool.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Profile Bar */}
      <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-white/10 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow">
            P
          </div>
          <span className="font-medium text-slate-200">PcTools User</span>
        </div>
        <button 
          onClick={() => setActiveTab('home')} 
          className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
          title="Power / Home"
        >
          ⏻
        </button>
      </div>

    </div>
  );
}

// App Container
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Window position & dragging state
  const [position, setPosition] = useState({ x: 120, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const [isMounted, setIsMounted] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Dragging event handlers
  const handleMouseDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || isMaximized) return;
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.current.y))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const formattedTime = isMounted && time ? time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }) : '--:--';

  const formattedDate = isMounted && time ? time.toLocaleDateString([], {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  }) : '';

  const handleTabChange = (tabId) => {
    const path = tabId === 'home' ? '/' : `/${tabId}`;
    navigate(path);
    setIsWindowOpen(true);
    setIsStartOpen(false);
  };

  const currentPath = location.pathname.substring(1) || 'home';

  // Desktop Shortcuts List
  const desktopShortcuts = [
    { id: 'video-to-audio', name: 'Video to Audio', icon: '🎵', desc: 'Extract audio from videos.' },
    { id: 'device-health', name: 'Device Health', icon: '💻', desc: 'Scan RAM, CPU cores, battery.' },
    { id: 'water-remover', name: 'Speaker Cleaner', icon: '💧', desc: 'Play sound to eject water.' },
    { id: 'password-gen', name: 'Password Gen', icon: '🔑', desc: 'Generate strong passwords.' },
    { id: 'aptitude', name: 'Aptitude Test', icon: '🧠', desc: 'Practice aptitude questions.' },
    { id: 'mern-tutorial', name: 'MERN Guide', icon: '📚', desc: 'Complete MERN tutorial.' },
    { id: 'typing-test', name: 'Typing Speed', icon: '⌨️', desc: 'Test WPM and accuracy.' },
    { id: 'formatter', name: 'Image Formatter', icon: '🖼️', desc: 'Convert images to PNG, JPEG, WEBP.' },
    { id: 'compressor', name: 'Compressor', icon: '⚡', desc: 'Reduce image size easily.' },
    { id: 'palette', name: 'Color Palettes', icon: '🎨', desc: 'Explore developer color hex codes.' },
    { id: 'entities', name: 'HTML Entities', icon: '🔣', desc: 'Find named or numerical symbols.' },
    { id: 'resume', name: 'Resume Builder', icon: '📄', desc: 'Generate professional resumes.' },
    { id: 'pdf-writer', name: 'PDF Writer', icon: '📝', desc: 'Create clean PDF documents.' },
    { id: 'ip-finder', name: 'IP Finder', icon: '🌐', desc: 'Check network IP and details.' },
    { id: 'speed-test', name: 'Speed Test', icon: '🚀', desc: 'Measure internet speed.' },
    { id: 'calculator', name: 'Calculator', icon: '🧮', desc: 'Standard numerical calculations.' },
    { id: 'age-calculator', name: 'Age Calculator', icon: '📅', desc: 'Calculate exact age & date.' },
    { id: 'date-diff', name: 'Date Difference', icon: '⏳', desc: 'Find difference between dates.' },
    { id: 'weight-analyzer', name: 'Weight Analyzer', icon: '⚖️', desc: 'Calculate BMI and weight ranges.' },
    { id: 'humanizer', name: 'Text Humanizer', icon: '🤖', desc: 'Refine text tone.' }
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center font-sans">
      
      {/* Left Side Desktop Shortcuts Grid */}
      <div className="absolute top-4 left-4 bottom-14 z-10 flex flex-col flex-wrap gap-2 overflow-x-auto max-h-[calc(100vh-80px)] p-1">
        {desktopShortcuts.map((shortcut) => (
          <div
            key={shortcut.id}
            onClick={() => handleTabChange(shortcut.id)}
            className="flex flex-col items-center w-20 p-2 rounded-xl hover:bg-white/10 hover:border hover:border-white/20 cursor-pointer group transition-all text-center"
          >
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900/50 backdrop-blur-md border border-white/20 shadow-lg text-xl group-hover:scale-105 transition-transform">
              {shortcut.icon}
            </div>
            <span className="text-[11px] font-medium text-white drop-shadow mt-1 leading-tight line-clamp-2 w-full">
              {shortcut.name}
            </span>
          </div>
        ))}
      </div>

      {/* Workspace App Window */}
      {isWindowOpen && (
        <div
          style={
            isMaximized
              ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)', maxWidth: '100vw', maxHeight: '100vh' }
              : { top: `${position.y}px`, left: `${position.x}px`, width: 'calc(100vw - 320px)', height: 'calc(100vh - 120px)', maxWidth: '1152px', maxHeight: '90vh' }
          }
          className={`fixed z-30 flex flex-col bg-[#1c1c1c]/95 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden transition-all duration-200 ${
            isMaximized ? 'rounded-none border-none' : 'rounded-xl'
          }`}
        >
          {/* Draggable Title Bar */}
          <div
            onMouseDown={handleMouseDown}
            className={`h-10 bg-[#181818]/90 border-b border-white/10 px-4 flex items-center justify-between shrink-0 ${
              isMaximized ? 'cursor-default' : 'cursor-move'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs">💻</span>
              <span className="text-xs font-semibold text-slate-200 tracking-wide pointer-events-none">
                PcTools Workspace — {currentPath.toUpperCase()}
              </span>
            </div>

            {/* Title Bar Controls */}
            <div className="flex items-center gap-1" onMouseDown={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setIsWindowOpen(false)} 
                className="px-3 py-1 text-slate-400 hover:bg-white/10 rounded text-xs transition cursor-pointer"
                title="Minimize"
              >
                🗕
              </button>
              <button 
                onClick={() => setIsMaximized(!isMaximized)} 
                className="px-3 py-1 text-slate-400 hover:bg-white/10 rounded text-xs transition cursor-pointer"
                title={isMaximized ? "Restore Down" : "Maximize"}
              >
                {isMaximized ? '🗗' : '🗖'}
              </button>
              <button 
                onClick={() => setIsWindowOpen(false)} 
                className="px-3 py-1 text-slate-400 hover:bg-red-600 hover:text-white rounded text-xs transition cursor-pointer"
                title="Close Window"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Active Tool Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-slate-100">
            <Routes>
              <Route path="/" element={<DesktopHome onOpenStart={() => setIsStartOpen(true)} />} />
              <Route path="/video-to-audio" element={<VideoToAudio />} />
              <Route path="/device-health" element={<DeviceHealth />} />
              <Route path="/water-remover" element={<WaterRemover />} />
              <Route path="/password-gen" element={<PasswordGenerator />} />
              <Route path="/aptitude" element={<AptitudeQuestions />} />
              <Route path="/mern-tutorial" element={<MernTutorial />} />
              <Route path="/typing-test" element={<TypingTest />} />
              <Route path="/formatter" element={<ImageFormatter />} />
              <Route path="/compressor" element={<ImageCompressor />} />
              <Route path="/palette" element={<ColorPalette />} />
              <Route path="/entities" element={<HtmlEntities />} />
              <Route path="/resume" element={<ResumeBuilder />} />
              <Route path="/pdf-writer" element={<PdfWriter />} />
              <Route path="/ip-finder" element={<IpFinder />} />
              <Route path="/speed-test" element={<SpeedTest />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/age-calculator" element={<AgeCalculator />} />
              <Route path="/date-diff" element={<DateDifference />} />
              <Route path="/weight-analyzer" element={<WeightAnalyzer />} />
              <Route path="/humanizer" element={<Humanizer />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/terms" element={<TermsAndConditions />} />
            </Routes>
          </div>
        </div>
      )}

      {/* Start Menu Overlay */}
      {isStartOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsStartOpen(false)}>
          <div 
            className="absolute bottom-14 left-1/2 -translate-x-1/2 w-full px-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Windows11StartMenu 
              setActiveTab={handleTabChange} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              allTools={desktopShortcuts} 
            />
          </div>
        </div>
      )}

      {/* Windows 11 Taskbar */}
      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-[#181818]/90 backdrop-blur-2xl border-t border-white/10 px-4 flex items-center justify-between z-50">
        <div className="w-32 hidden sm:block"></div>

        {/* Centered Taskbar Buttons */}
        <div className="flex items-center gap-1.5 mx-auto bg-white/5 border border-white/10 px-3 py-1 rounded-full shadow-lg">
          <button
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={`p-2 rounded-xl transition-all hover:bg-white/15 active:scale-95 cursor-pointer ${isStartOpen ? 'bg-white/20' : ''}`}
            title="Start"
          >
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <span className="bg-cyan-400 rounded-sm"></span>
              <span className="bg-cyan-400 rounded-sm"></span>
              <span className="bg-cyan-400 rounded-sm"></span>
              <span className="bg-cyan-400 rounded-sm"></span>
            </div>
          </button>

          <button 
            onClick={() => {
              navigate('/');
              setIsWindowOpen(true);
            }}
            className={`p-2 rounded-xl transition-all hover:bg-white/15 active:scale-95 cursor-pointer ${isWindowOpen && currentPath === 'home' ? 'bg-white/20 border-b-2 border-cyan-400' : ''}`}
            title="Desktop Home"
          >
            🏠
          </button>

          <button 
            onClick={() => setIsDonateOpen(true)}
            className="p-2 rounded-xl transition-all hover:bg-white/15 text-rose-400 active:scale-95 cursor-pointer"
            title="Support / Donate"
          >
            ❤️
          </button>
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <button 
            onClick={() => setIsPrivacyOpen(true)} 
            className="hidden sm:inline-block hover:underline text-[11px] text-slate-400 cursor-pointer"
          >
            Privacy
          </button>
          
          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            <span>🌐</span>
            <span>🔊</span>
            <span>🔋</span>
          </div>

          <div className="flex flex-col items-end leading-tight font-mono text-[11px]">
            <span>{formattedTime}</span>
            <span className="text-[10px] text-slate-400">{formattedDate}</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}