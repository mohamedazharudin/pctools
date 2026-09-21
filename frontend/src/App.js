import { useState } from 'react';
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
import Footer from './components/Footer';
import AudioToText from './components/AudioToText';
import VideoToAudio from './components/VideoToAudio';
import DeviceHealth from './components/DeviceHealth';
import WaterRemover from './components/WaterRemover';
import DonateModal from './components/DonateModal';
import PasswordGenerator from './components/PasswordGenerator';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import Home from './Home';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const isTamil = language === 'ta';

  // Categorized tool menus with sub-tools
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
        { id: 'resume', label: 'Resume Builder' },
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
        { id: 'ai-detector', label: 'AI Detector' },
        { id: 'ip-finder', label: 'IP Finder' },
        { id: 'speed-test', label: 'Speed Test' },
        { id: 'device-health', label: 'Device Health' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/60 shadow-md">
        {/* Upper Main Bar */}
        <div className="h-16 flex items-center justify-between px-3 sm:px-6">
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
              onClick={() => setActiveTab('home')}
              className="font-bold text-base sm:text-lg text-slate-100 cursor-pointer truncate"
            >
              PcTools
            </span>
          </div>

          {/* Right Actions: Language Toggle & Donate Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={toggleLanguage}
              className="px-2.5 sm:px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl text-xs font-bold text-slate-200 transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap"
            >
              <span>🌐</span> {isTamil ? 'English' : 'தமிழ்'}
            </button>

            <button
              onClick={() => setIsDonateOpen(true)}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap"
            >
              <span>❤️</span>
              <span className="hidden xs:inline">Donate</span>
            </button>
          </div>
        </div>

        {/* Categories Navbar - Hidden on mobile, visible on medium+ screens */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 overflow-visible border-t border-slate-800/40 text-xs font-medium relative z-40">
          {/* Home Direct Link */}
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>

          {/* Dropdown Categories */}
          {navCategories.map((cat, index) => (
            <div key={index} className="relative group">
              {/* Category Header Button */}
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 whitespace-nowrap cursor-pointer transition-all">
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70 group-hover:rotate-180 transition-transform">▼</span>
              </button>

              {/* Hover Menu Dropdown */}
              <div className="absolute left-0 top-full hidden group-hover:flex flex-col bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 min-w-[200px] z-50 mt-1">
                {cat.tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTab(tool.id)}
                    className={`text-left px-3 py-2 text-xs rounded-lg transition-all cursor-pointer ${
                      activeTab === tool.id
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

          {/* About Us Direct Link */}
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            About Us
          </button>
        </div>
      </header>

      {/* Floating Glassy Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
      />

      {/* Main View Area with Responsive Top Padding */}
      <main className="flex-1 p-4 sm:p-6 pt-20 md:pt-32 max-w-7xl mx-auto w-full">
        {activeTab === 'home' && <Home setActiveTab={setActiveTab} />}
        {activeTab === 'formatter' && <ImageFormatter />}
        {activeTab === 'compressor' && <ImageCompressor />}
        {activeTab === 'palette' && <ColorPalette />}
        {activeTab === 'entities' && <HtmlEntities />}
        {activeTab === 'resume' && <ResumeBuilder />}
        {activeTab === 'pdf-writer' && <PdfWriter />}
        {activeTab === 'ip-finder' && <IpFinder />}
        {activeTab === 'speed-test' && <SpeedTest />}
        {activeTab === 'calculator' && <Calculator />}
        {activeTab === 'age-calculator' && <AgeCalculator />}
        {activeTab === 'date-diff' && <DateDifference />}
        {activeTab === 'baby-names' && <BabyNameSuggester />}
        {activeTab === 'weight-analyzer' && <WeightAnalyzer />}
        {activeTab === 'humanizer' && <Humanizer />}
        {activeTab === 'ai-detector' && <AiDetector />}
        {activeTab === 'compass' && <Compass />}
        {activeTab === 'about' && <AboutUs />}
        {activeTab === 'audio-to-text' && <AudioToText />}
        {activeTab === 'video-to-audio' && <VideoToAudio />}
        {activeTab === 'device-health' && <DeviceHealth />}
        {activeTab === 'water-remover' && <WaterRemover />}
        {activeTab === 'password-gen' && <PasswordGenerator />}
      </main>

      {/* Footer & Modals */}
      <Footer setActiveTab={setActiveTab} onOpenPrivacy={() => setIsPrivacyOpen(true)} />
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </div>
  );
}