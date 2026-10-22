import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

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

function AppContent() {
  const navigate = useNavigate();
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toolsList = [
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
    <div className="min-h-screen bg-[#0e1017] text-white flex flex-col font-sans">
      
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-50 bg-[#12151e]/90 backdrop-blur-md border-b border-white/5 px-6 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
          <span className="text-[#ff5c5c] text-3xl font-black">▶</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">Pctools</h1>
        </div>

        <div className="flex items-center gap-8 text-base sm:text-lg text-slate-200 font-semibold">
          <button onClick={() => handleNav('home')} className="hover:text-white transition">Tools</button>
          <button onClick={() => handleNav('about')} className="hover:text-white transition">About Us</button>
          <button onClick={() => handleNav('contact')} className="hover:text-white transition">Contact</button>
          <button onClick={() => setIsDonateOpen(true)} className="text-[#ff5c5c] hover:underline font-bold">Donate</button>
        </div>
      </header>

      {/* 2. Hero Mission Section */}
      <section className="py-24 px-6 text-center flex flex-col items-center justify-center bg-gradient-to-b from-[#12151e]/40 to-transparent">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-300 leading-tight">
          Paid Apps Made Fully Free
        </h1>
        <p className="text-slate-300 text-lg sm:text-2xl max-w-3xl mb-10 leading-relaxed font-normal">
          We build premium-grade web utilities, developer toolkits, and productivity software accessible to everyone without paywalls or subscriptions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button onClick={() => handleNav('home')} className="bg-[#ff5c5c] hover:bg-[#e25353] text-white font-bold text-lg px-8 py-4 rounded-2xl transition shadow-xl shadow-rose-500/20">
            Explore All Tools
          </button>
          <button onClick={() => setIsDonateOpen(true)} className="border-2 border-white/20 hover:bg-white/5 text-white font-bold text-lg px-8 py-4 rounded-2xl transition">
            Support Our Mission
          </button>
        </div>
      </section>

      {/* 3. Main Tool Directory */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-12">
        
        {/* Search Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#12151e] border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff5c5c]"></span>
              Browse Utilities
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mt-2">Select from 20+ fully responsive client-side web applications.</p>
          </div>
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-96 bg-[#0e1017] border border-white/10 px-5 py-3.5 rounded-2xl text-base sm:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#ff5c5c] transition"
          />
        </div>

        {/* Dynamic Route & Grid Content */}
        <div className="bg-[#12151e]/50 border border-white/5 rounded-3xl p-8 min-h-[450px]">
          <Routes>
            <Route path="/" element={
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleNav(tool.id)}
                    className="flex flex-col items-center justify-center p-6 bg-[#12151e] border border-white/10 hover:border-[#ff5c5c]/60 rounded-2xl cursor-pointer group transition-all hover:-translate-y-1 text-center shadow-lg"
                  >
                    <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{tool.icon}</span>
                    <span className="text-base sm:text-lg font-bold text-slate-100">{tool.name}</span>
                    <span className="text-xs sm:text-sm text-[#ff5c5c] mt-2 font-mono uppercase font-bold tracking-wider">{tool.category}</span>
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

        {/* Key Metrics Banner */}
        <div className="bg-[#12151e] border border-white/10 rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-2xl">
          <div>
            <h3 className="text-4xl sm:text-5xl font-black text-[#ff5c5c]">100%</h3>
            <p className="text-sm sm:text-base text-slate-300 mt-2 uppercase tracking-wider font-semibold">Free Access</p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-5xl font-black text-[#ff5c5c]">20+</h3>
            <p className="text-sm sm:text-base text-slate-300 mt-2 uppercase tracking-wider font-semibold">Web Utilities</p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-5xl font-black text-[#ff5c5c]">0</h3>
            <p className="text-sm sm:text-base text-slate-300 mt-2 uppercase tracking-wider font-semibold">Data Tracking</p>
          </div>
          <div>
            <h3 className="text-4xl sm:text-5xl font-black text-[#ff5c5c]">24/7</h3>
            <p className="text-sm sm:text-base text-slate-300 mt-2 uppercase tracking-wider font-semibold">Availability</p>
          </div>
        </div>

      </main>

      {/* 4. Categorized Footer */}
      <footer className="bg-[#12151e] border-t border-white/10 py-16 px-8 mt-auto z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10 text-base">
          <div>
            <h4 className="font-extrabold text-[#ff5c5c] mb-4 text-sm sm:text-base uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3 text-slate-300 text-sm sm:text-base font-medium">
              <li><button onClick={() => handleNav('about')} className="hover:text-white transition">Features</button></li>
              <li><button onClick={() => handleNav('home')} className="hover:text-white transition">Tools</button></li>
              <li><button onClick={() => handleNav('mypc')} className="hover:text-white transition">My PC Explorer</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-[#ff5c5c] mb-4 text-sm sm:text-base uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3 text-slate-300 text-sm sm:text-base font-medium">
              <li><button onClick={() => handleNav('home')} className="hover:text-white transition">Media Tools</button></li>
              <li><button onClick={() => handleNav('home')} className="hover:text-white transition">Productivity</button></li>
              <li><button onClick={() => handleNav('home')} className="hover:text-white transition">Developer Kits</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-[#ff5c5c] mb-4 text-sm sm:text-base uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 text-slate-300 text-sm sm:text-base font-medium">
              <li><button onClick={() => handleNav('contact')} className="hover:text-white transition">Help Center</button></li>
              <li><button onClick={() => handleNav('contact')} className="hover:text-white transition">Contact Us</button></li>
              <li><button onClick={() => setIsDonateOpen(true)} className="hover:text-white transition">Donate</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold text-[#ff5c5c] mb-4 text-sm sm:text-base uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-slate-300 text-sm sm:text-base font-medium">
              <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition">Privacy Policy</button></li>
              <li><button onClick={() => handleNav('terms')} className="hover:text-white transition">Terms & Conditions</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm sm:text-base text-slate-400">
          <p>© 2026 Pctools Hub. All rights reserved.</p>
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