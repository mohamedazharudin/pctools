import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Component Imports
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
import BrowserApp from './components/BrowserApp';

// Newly Separated Components
import MyPC from './components/MyPC';
import DesktopHome from './components/DesktopHome';
import Windows11StartMenu from './components/Windows11StartMenu';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isWindowOpen, setIsWindowOpen] = useState(true);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [showDonateTip, setShowDonateTip] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [position, setPosition] = useState({ x: 20, y: 20 });
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

  const handleMouseDown = (e) => {
    if (isMaximized || window.innerWidth < 640) return;
    setIsDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || isMaximized || window.innerWidth < 640) return;
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 300, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragOffset.current.y))
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  const formattedTime = isMounted && time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : '';
  const formattedDate = isMounted && time ? time.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' }) : '';

  const handleTabChange = (tabId) => {
    navigate(tabId === 'home' ? '/' : `/${tabId}`);
    setIsWindowOpen(true);
    setIsStartOpen(false);
    setShowDonateTip(false);
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
    setShowDonateTip(true);
  };

  const currentPath = location.pathname.substring(1) || 'home';

  const desktopShortcuts = [
    { id: 'mypc', name: 'My PC', icon: '🖥️', desc: 'Local Disk C: & Blogs Directory' },
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
    { id: 'humanizer', name: 'Text Humanizer', icon: '🤖', desc: 'Refine text tone.' },
    { id: 'browser', name: 'Browser', icon: '🌐', desc: 'Browse Pctutorials.com' },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center font-sans">
      
      {/* Desktop Grid Shortcuts */}
      {(!isWindowOpen || window.innerWidth >= 640) && (
        <div className="absolute top-2 left-2 right-2 sm:right-auto sm:top-4 sm:left-4 bottom-14 z-10 grid grid-cols-4 sm:flex sm:flex-col sm:flex-wrap gap-1 sm:gap-2 overflow-y-auto sm:overflow-x-auto max-h-[calc(100vh-70px)] p-1">
          {desktopShortcuts.map((shortcut) => (
            <div
              key={shortcut.id}
              onClick={() => handleTabChange(shortcut.id)}
              className="flex flex-col items-center w-full sm:w-20 p-1.5 sm:p-2 rounded-xl hover:bg-white/10 hover:border hover:border-white/20 cursor-pointer group transition-all text-center"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-slate-900/50 backdrop-blur-md border border-white/20 shadow-lg text-lg sm:text-xl group-hover:scale-105 transition-transform">
                {shortcut.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-white drop-shadow mt-1 leading-tight line-clamp-2 w-full">
                {shortcut.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Right Side Mission Banner */}
      <div className="hidden lg:flex flex-col items-end text-right absolute top-6 right-6 z-0 max-w-sm p-6 bg-gradient-to-br from-black/70 to-slate-900/60 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl shadow-2xl space-y-3 pointer-events-none">
        <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wide">
          Pctools Hub
        </h1>
        <h2 className="text-sm font-bold text-white tracking-tight">
          Premium & Paid Apps, Fully Free
        </h2>
        <h3 className="text-xs text-slate-300 leading-relaxed font-normal">
          We believe top-tier developer software and utilities should be accessible to everyone without paywalls.
        </h3>
        <h4 className="text-[11px] text-cyan-300 font-mono pt-1 border-t border-white/10 w-full text-right">
          Support our open mission! ❤️
        </h4>
      </div>

      {/* Workspace App Window */}
      {isWindowOpen && (
        <div
          style={
            window.innerWidth < 640
              ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)' }
              : isMaximized
              ? { top: 0, left: 0, width: '100vw', height: 'calc(100vh - 48px)', maxWidth: '100vw', maxHeight: '100vh' }
              : { top: `${position.y}px`, left: `${position.x}px`, width: 'calc(100vw - 220px)', height: 'calc(100vh - 120px)', maxWidth: '1152px', maxHeight: '90vh' }
          }
          className={`fixed z-30 flex flex-col bg-[#1c1c1c]/95 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden transition-all duration-200 ${
            isMaximized || window.innerWidth < 640 ? 'rounded-none border-none' : 'rounded-xl'
          }`}
        >
          <div
            onMouseDown={handleMouseDown}
            className={`h-10 bg-[#181818]/90 border-b border-white/10 px-3 sm:px-4 flex items-center justify-between shrink-0 ${
              isMaximized || window.innerWidth < 640 ? 'cursor-default' : 'cursor-move'
            }`}
          >
            <div className="flex items-center gap-2 overflow-hidden pr-2">
              <span className="text-xs shrink-0">💻</span>
              <span className="text-xs font-semibold text-slate-200 tracking-wide truncate pointer-events-none">
                PcTools — {currentPath.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
              <button onClick={handleCloseWindow} className="px-2.5 sm:px-3 py-1 text-slate-400 hover:bg-white/10 rounded text-xs transition cursor-pointer" title="Minimize">🗕</button>
              <button onClick={() => setIsMaximized(!isMaximized)} className="hidden sm:inline-block px-3 py-1 text-slate-400 hover:bg-white/10 rounded text-xs transition cursor-pointer" title={isMaximized ? "Restore Down" : "Maximize"}>{isMaximized ? '🗗' : '🗖'}</button>
              <button onClick={handleCloseWindow} className="px-2.5 sm:px-3 py-1 text-slate-400 hover:bg-red-600 hover:text-white rounded text-xs transition cursor-pointer" title="Close Window">✕</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-6 text-slate-100">
            <Routes>
              <Route path="/" element={<DesktopHome onOpenStart={() => setIsStartOpen(true)} />} />
              <Route path="/mypc" element={<MyPC />} />
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
              <Route path="/browser" element={<BrowserApp />} />
            </Routes>
          </div>
        </div>
      )}

      {/* Start Menu Overlay */}
      {isStartOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsStartOpen(false)}>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-full px-2 sm:px-4 z-50" onClick={(e) => e.stopPropagation()}>
            <Windows11StartMenu setActiveTab={handleTabChange} searchQuery={searchQuery} setSearchQuery={setSearchQuery} allTools={desktopShortcuts} />
          </div>
        </div>
      )}

      {/* Taskbar Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-[#181818]/90 backdrop-blur-2xl border-t border-white/10 px-2 sm:px-4 flex items-center justify-between z-50 text-xs text-slate-300">
        <div className="hidden sm:flex items-center justify-between w-full h-full">
          <div className="w-16"></div>
          <div className="flex items-center gap-1.5 mx-auto bg-white/5 border border-white/10 px-2.5 py-1 rounded-full shadow-lg relative">
            {showDonateTip && (
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs px-3.5 py-2 rounded-xl shadow-2xl flex flex-col items-center animate-bounce z-50 whitespace-nowrap">
                <span className="font-semibold">Please donate if you like! ❤️</span>
                <div className="w-3 h-3 bg-cyan-600 rotate-45 absolute -bottom-1.5"></div>
              </div>
            )}
            <button onClick={() => setIsStartOpen(!isStartOpen)} className={`p-2 rounded-xl transition-all hover:bg-white/15 active:scale-95 cursor-pointer ${isStartOpen ? 'bg-white/20' : ''}`} title="Start">
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <span className="bg-cyan-400 rounded-sm"></span><span className="bg-cyan-400 rounded-sm"></span>
                <span className="bg-cyan-400 rounded-sm"></span><span className="bg-cyan-400 rounded-sm"></span>
              </div>
            </button>
            <button onClick={() => { navigate('/'); setIsWindowOpen(true); setShowDonateTip(false); }} className={`p-2 rounded-xl transition-all hover:bg-white/15 active:scale-95 cursor-pointer ${isWindowOpen && currentPath === 'home' ? 'bg-white/20 border-b-2 border-cyan-400' : ''}`} title="Desktop Home">
              🏠
            </button>
            <button onClick={() => { setIsDonateOpen(true); setShowDonateTip(false); }} className="p-2 rounded-xl transition-all hover:bg-white/15 text-rose-400 active:scale-95 cursor-pointer" title="Support / Donate">
              ❤️
            </button>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <button onClick={() => handleTabChange('about')} className="hover:underline hover:text-white cursor-pointer">About</button>
              <span>•</span>
              <button onClick={() => handleTabChange('contact')} className="hover:underline hover:text-white cursor-pointer">Contact</button>
              <span>•</span>
              <button onClick={() => handleTabChange('terms')} className="hover:underline hover:text-white cursor-pointer">Terms</button>
              <span>•</span>
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:underline hover:text-white cursor-pointer">Privacy</button>
            </div>
            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10 text-[11px]">
              <span>🌐</span><span>🔊</span><span>🔋</span>
            </div>
            <div className="flex flex-col items-end leading-tight font-mono text-[11px]">
              <span>{formattedTime}</span>
              <span className="text-[10px] text-slate-400">{formattedDate}</span>
            </div>
          </div>
        </div>
      </footer>

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