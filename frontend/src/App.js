import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ImageFormatter from './components/ImageFormatter';
import ImageCompressor from './components/ImageCompressor';
import ColorPalette from './components/ColorPalette';
import HtmlEntities from './components/HtmlEntities';
import ResumeBuilder from './components/ResumeBuilder';
import PdfWriter from './components/PdfWriter';
// Inside the main render:
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('formatter');

  return (
    <div className="layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="content">
        {activeTab === 'formatter' && <ImageFormatter />}
        {activeTab === 'compressor' && <ImageCompressor />}
        {activeTab === 'palette' && <ColorPalette />}
{activeTab === 'entities' && <HtmlEntities />}
{activeTab === 'resume' && <ResumeBuilder />}
{activeTab === 'pdf-writer' && <PdfWriter />}
      </main>
    </div>
  );
}