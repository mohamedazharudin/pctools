import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
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
import BabyNameSuggester from './components/BabyNameSuggester';
import WeightAnalyzer from './components/WeightAnalyzer';
import Humanizer from './components/Humanizer';
import AiDetector from './components/AiDetector';
import Compass from './components/Compass';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import TermsAndConditions from './components/TermsAndConditions';
import Footer from './components/Footer';
import AudioToText from './components/AudioToText';
import VideoToAudio from './components/VideoToAudio';
import DeviceHealth from './components/DeviceHealth';
import WaterRemover from './components/WaterRemover';
import DonateModal from './components/DonateModal';
import PasswordGenerator from './components/PasswordGenerator';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import Home from './Home';
import AptitudeQuestions from './components/AptitudeQuestions';
import MernTutorial from './components/MernTutorial';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  // State for live clock and search input
  const [time, setTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  // Clock timer setup
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const handleTabChange = (tabId) => {
    const path = tabId === 'home' ? '/' : `/${tabId}`;
    navigate(path);
  };

  const navCategories = [
    {
      name: 'Media Tools',
      tools: [
        { id: 'formatter', label: 'Image Formatter' },
        { id: 'compressor', label: 'Image Compressor' },
        { id: 'video-to-audio', label: 'Video to Audio' },
        { id: 'water-remover', label: 'Speaker Water Ejector' },
      ]
    },
    {
      name: 'Developer & Docs',
      tools: [
        { id: 'pdf-writer', label: 'PDF Writer' },
        { id: 'palette', label: 'Color Palette' },
        { id: 'entities', label: 'HTML Entities' },
        { id: 'aptitude', label: 'Aptitude Test' },
        { id: 'mern-tutorial', label: 'MERN Stack Guide' },
        { id: 'resumebuilder', label: 'Resume Builder' },
        { id: 'password-gen', label: 'Password Generator' },
      ]
    },
    {
      name: 'Calculators & Utilities',
      tools: [
        { id: 'calculator', label: 'Standard Calculator' },
        { id: 'age-calculator', label: 'Age Calculator' },
        { id: 'date-diff', label: 'Date Difference' },
        { id: 'weight-analyzer', label: 'Weight Analyzer' },
      ]
    },
    {
      name: 'AI & System',
      tools: [
        { id: 'ip-finder', label: 'IP Finder' },
        { id: 'speed-test', label: 'Speed Test' },
        { id: 'device-health', label: 'Device Health' },
      ]
    }
  ];

  // Flat list of all tools for quick search navigation
  const allTools = navCategories.flatMap(cat => cat.tools);
  const filteredTools = searchQuery.trim() 
    ? allTools.filter(tool => tool.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const currentPath = location.pathname.substring(1) || 'home';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/60 shadow-md">
        <div className="h-16 flex items-center justify-between px-3 sm:px-6 gap-2">
          
          {/* Left: Menu & Brand */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="px-2.5 sm:px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl text-sm sm:text-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>☰</span>
              <span className="hidden xs:inline text-xs font-semibold uppercase tracking-wider text-slate-300">
                Menu
              </span>
            </button>
            <span 
              onClick={() => handleTabChange('home')}
              className="font-bold text-base sm:text-lg text-slate-100 cursor-pointer truncate"
            >
              PcTools
            </span>
          </div>

          {/* Center: Search Bar with Dropdown Results */}
          <div className="relative flex-1 max-w-xs sm:max-w-md mx-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search tools..."
              className="w-full px-3 sm:px-4 py-1.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-inner transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}

            {/* Live Search Dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 max-h-60 overflow-y-auto">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        handleTabChange(tool.id);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-2 text-xs sm:text-sm text-slate-200 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                    >
                      {tool.label}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-slate-400">No matching tools found</div>
                )}
              </div>
            )}
          </div>

          {/* Right: Live Clock & Donate Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Time Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
              <span>🕒</span>
              <span className="font-semibold">{formattedTime}</span>
            </div>

            <button
              onClick={() => setIsDonateOpen(true)}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap"
            >
              <span>❤️</span>
              <span className="hidden xs:inline">Donate</span>
            </button>
          </div>
        </div>

        {/* Categories Navbar */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 overflow-visible border-t border-slate-800/40 text-xs font-medium relative z-40">
          <button
            onClick={() => handleTabChange('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentPath === 'home'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>

          {navCategories.map((cat, index) => (
            <div key={index} className="relative group">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 whitespace-nowrap cursor-pointer transition-all">
                <span>{cat.name}</span>
                <span className="text-[20px] opacity-70 group-hover:rotate-180 transition-transform">▼</span>
              </button>

              <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 min-w-[200px] z-50 mt-1">
                {cat.tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleTabChange(tool.id)}
                    className={`text-left px-3 py-2 text-xs rounded-lg transition-all cursor-pointer ${
                      currentPath === tool.id
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => handleTabChange('about')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentPath === 'about'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            About Us
          </button>
          
    
        </div>
      </header>

      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={currentPath} 
        setActiveTab={handleTabChange} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
      />

      {/* Routes View Area */}
      <main className="flex-1 p-4 sm:p-6 pt-20 md:pt-32 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home setActiveTab={handleTabChange} />} />
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
          <Route path="/baby-names" element={<BabyNameSuggester />} />
          <Route path="/weight-analyzer" element={<WeightAnalyzer />} />
          <Route path="/humanizer" element={<Humanizer />} />
          <Route path="/ai-detector" element={<AiDetector />} />
          <Route path="/compass" element={<Compass />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/audio-to-text" element={<AudioToText />} />
          <Route path="/video-to-audio" element={<VideoToAudio />} />
          <Route path="/device-health" element={<DeviceHealth />} />
          <Route path="/water-remover" element={<WaterRemover />} />
          <Route path="/password-gen" element={<PasswordGenerator />} />
          <Route path="/aptitude" element={<AptitudeQuestions />} />
          <Route path="/mern-tutorial" element={<MernTutorial />} />
        </Routes>
      </main>

      {/* Footer & Modals */}
      <Footer setActiveTab={handleTabChange} onOpenPrivacy={() => setIsPrivacyOpen(true)} />
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