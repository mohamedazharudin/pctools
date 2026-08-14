import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import Home from './Home';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language || 'en';
    const nextLang = currentLang.startsWith('ta') ? 'en' : 'ta';
    i18n.changeLanguage(nextLang);
  };

  const isTamil = i18n.language && i18n.language.startsWith('ta');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar with Menu, Language Switcher & Donate Button */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-between px-6 z-30 border-b border-slate-800/60">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl text-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <span>☰</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">{t('menu', 'Menu')}</span>
          </button>
          <span className="font-bold text-lg text-slate-100">PcTools</span>
        </div>

        {/* Right Actions: Language Toggle & Donate Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl text-xs font-bold text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>🌐</span> {isTamil ? 'English' : 'தமிழ்'}
          </button>

          <button
            onClick={() => setIsDonateOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>❤️</span> {t('donate', 'Donate')}
          </button>
        </div>
      </div>

      {/* Floating Glassy Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
      />

      {/* Main View Area */}
      <main className="flex-1 p-6 pt-24 max-w-7xl mx-auto w-full">
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
      </main>

      {/* Footer & Donate Popup */}
      <Footer setActiveTab={setActiveTab} />
      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </div>
  );
}