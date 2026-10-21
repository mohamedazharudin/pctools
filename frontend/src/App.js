import { useState, useEffect } from 'react';
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
import MyPC from './components/MyPC';
import DesktopHome from './components/DesktopHome';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toolsList = [
    { id: 'mypc', name: 'My PC & Blogs', icon: '🖥️', category: 'System' },
    { id: 'video-to-audio', name: 'Video to Audio', icon: '🎵', category: 'Media' },
    { id: 'device-health', name: 'Device Health', icon: '💻', category: 'System' },
    { id: 'water-remover', name: 'Speaker Cleaner', icon: '💧', category: 'Utilities' },
    { id: 'password-gen', name: 'Password Gen', icon: '🔑', category: 'Security' },
    { id: 'aptitude', name: 'Aptitude Test', icon: '🧠', category: 'Education' },
    { id: 'mern-tutorial', name: 'MERN Guide', icon: '📚', category: 'Education' },
    { id: 'typing-test', name: 'Typing Speed', icon: '⌨️', category: 'Education' },
    { id: 'formatter', name: 'Image Formatter', icon: '🖼️', category: 'Media' },
    { id: 'compressor', name: 'Image Compressor', icon: '⚡', category: 'Media' },
    { id: 'palette', name: 'Color Palettes', icon: '🎨', category: 'Design' },
    { id: 'entities', name: 'HTML Entities', icon: '🔣', category: 'Design' },
    { id: 'resume', name: 'Resume Builder', icon: '📄', category: 'Productivity' },
    { id: 'pdf-writer', name: 'PDF Writer', icon: '📝', category: 'Productivity' },
    { id: 'ip-finder', name: 'IP Finder', icon: '🌐', category: 'Utilities' },
    { id: 'speed-test', name: 'Speed Test', icon: '🚀', category: 'Utilities' },
    { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'Utilities' },
    { id: 'age-calculator', name: 'Age Calculator', icon: '📅', category: 'Utilities' },
    { id: 'date-diff', name: 'Date Difference', icon: '⏳', category: 'Utilities' },
    { id: 'weight-analyzer', name: 'Weight Analyzer', icon: '⚖️', category: 'Health' },
    { id: 'humanizer', name: 'Text Humanizer', icon: '🤖', category: 'Productivity' },
    { id: 'browser', name: 'Web Browser', icon: '🌐', category: 'Utilities' },
  ];

  const filteredTools = toolsList.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNav = (id) => {
    navigate(id === 'home' ? '/' : `/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-green-500 selection:text-white">
      {/* Background Multi-color Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-green-500/20 px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
          <span className="text-2xl">⚡</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-green-400 to-blue-400 bg-clip-text text-transparent">
            Pctools Hub
          </h1>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-medium">
          <button onClick={() => handleNav('home')} className="hover:text-green-400 transition">Home</button>
          <button onClick={() => handleNav('about')} className="hover:text-green-400 transition">About</button>
          <button onClick={() => handleNav('contact')} className="hover:text-green-400 transition">Contact</button>
          <button onClick={() => setIsDonateOpen(true)} className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition shadow-sm">
            ❤️ Donate
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col gap-6 z-10">
        
        {/* Search Bar Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-blue-500/30 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
              Free Online Developer & Utility Tools
            </h2>
            <p className="text-xs text-slate-300 mt-1">Search through 20+ fully responsive web applications.</p>
          </div>
          <input
            type="text"
            placeholder="Search tools (e.g., PDF, Compressor)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 bg-slate-950 border border-green-500/30 px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition shadow-inner"
          />
        </div>

        {/* Dynamic Route View / Tool Grid */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 min-h-[500px] shadow-2xl backdrop-blur-md">
          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleNav(tool.id)}
                    className="flex flex-col items-center p-4 bg-slate-900/90 border border-white/10 hover:border-green-400/60 rounded-xl cursor-pointer group transition-all hover:-translate-y-1 text-center shadow-md hover:shadow-green-500/10"
                  >
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{tool.icon}</span>
                    <span className="text-xs font-semibold text-slate-100">{tool.name}</span>
                    <span className="text-[10px] text-blue-400 mt-1 uppercase tracking-wider font-mono">{tool.category}</span>
                  </div>
                ))}
              </div>
            } />
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
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/90 border-t border-green-500/20 py-6 px-6 mt-auto z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <p>© 2026 Pctools Hub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('about')} className="hover:text-green-400 transition">About Us</button>
            <button onClick={() => handleNav('contact')} className="hover:text-green-400 transition">Contact Us</button>
            <button onClick={() => handleNav('terms')} className="hover:text-green-400 transition">Terms & Conditions</button>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-green-400 transition">Privacy Policy</button>
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