import { useState, useEffect } from 'react';

export default function Home({ setActiveTab }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time as "11:21 AM"
  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const tools = [
    { id: 'formatter', name: 'Image Formatter', desc: 'Convert images to PNG, JPEG, or WEBP instantly.', icon: '🖼️' },
    { id: 'compressor', name: 'Image Compressor', desc: 'Reduce image file size with adjustable quality controls.', icon: '⚡' },
    { id: 'pdf-writer', name: 'PDF Writer', desc: 'Write paragraphs and export clean PDF documents easily.', icon: '📝' },
    { id: 'palette', name: 'Color Palettes', desc: 'Explore developer palettes and copy hex codes with one click.', icon: '🎨' },
    { id: 'entities', name: 'HTML Entities', desc: 'Find and copy named or numerical HTML symbols.', icon: '🔣' },
    { id: 'resume', name: 'Resume Builder', desc: 'Generate and print a professional resume instantly.', icon: '📄' },
    { id: 'baby-names', name: 'Baby Name Generator', desc: 'Generate unique baby names instantly.', icon: '👶' },
    { id: 'weight-analyzer', name: 'Weight Analyzer', desc: 'Calculate BMI and find ideal body weight range.', icon: '⚖️' },
   // { id: 'humanizer', name: 'AI Text Humanizer', desc: 'Convert AI text into realistic human writing style.', icon: '✍️' },
   // { id: 'ai-detector', name: 'AI Content Detector', desc: 'Check text for AI patterns and probability scores.', icon: '🤖' },
    { id: 'compass', name: 'Digital Compass', desc: 'Check directional heading using orientation sensors.', icon: '🧭' },
    { id: 'audio-to-text', name: 'Audio to Text', desc: 'Convert live microphone dictation into written text.', icon: '🎙️' },
    { id: 'video-to-audio', name: 'Video to Audio', desc: 'Extract clean MP3 audio directly from video files.', icon: '🎬' },
    { id: 'device-health', name: 'System Health Checker', desc: 'Scan device RAM, CPU cores, battery, and speed.', icon: '💻' },
    { id: 'water-remover', name: 'Speaker Water Ejector', desc: 'Play 165Hz sound waves to clean trapped water.', icon: '💧' },
    { id: 'password-gen', name: 'Password Generator', desc: 'Generate strong, random passwords instantly.', icon: '🔑' }
  ];

  return (
    /* Outer container with white border margins */
    <div className="max-w-5xl mx-auto text-left py-6 text-white px-4 sm:px-6 my-4 border border-white/20 rounded-3xl bg-slate-950/40 shadow-2xl">
      {/* Hero / Vision Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-800 mb-10">
        
        {/* Digital Clock Badge - Top Right */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/60 shadow-lg">
          <span className="text-sm">🕒</span>
          <span className="text-xs sm:text-sm font-bold text-slate-200 font-mono tracking-wider">
            {formattedTime}
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-snug sm:leading-tight break-words pr-28 sm:pr-36">
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

      {/* Our Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

      {/* Tools Showcase */}
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Available Utilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            className="p-5 bg-slate-900 rounded-xl border border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500 cursor-pointer transition-all"
          >
            <div className="text-3xl mb-2">{tool.icon}</div>
            <h3 className="font-bold text-white text-base mb-1">{tool.name}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-xl border border-slate-800">
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
    </div>
  );
}