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
import Home from './Home';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar with Menu Button - Visible on Desktop & Mobile */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-between px-6 z-30 border-b border-slate-800/60">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl text-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <span>☰</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Menu</span>
          </button>
          <span className="font-bold text-lg text-slate-100">PcTools</span>
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
      </main>
    </div>
  );
}