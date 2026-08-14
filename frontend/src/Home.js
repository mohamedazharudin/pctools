import { useTranslation } from 'react-i18next';

export default function Home({ setActiveTab }) {
  const { t } = useTranslation();

  const tools = [
    { id: 'formatter', name: t('toolFormatterName', 'Image Formatter'), desc: t('toolFormatterDesc', 'Convert images to PNG, JPEG, or WEBP instantly.'), icon: '🖼️' },
    { id: 'compressor', name: t('toolCompressorName', 'Image Compressor'), desc: t('toolCompressorDesc', 'Reduce image file size with adjustable quality controls.'), icon: '⚡' },
    { id: 'pdf-writer', name: t('toolPdfWriterName', 'PDF Writer'), desc: t('toolPdfWriterDesc', 'Write paragraphs and export clean PDF documents easily.'), icon: '📝' },
    { id: 'palette', name: t('toolPaletteName', 'Color Palettes'), desc: t('toolPaletteDesc', 'Explore developer palettes and copy hex codes with one click.'), icon: '🎨' },
    { id: 'entities', name: t('toolEntitiesName', 'HTML Entities'), desc: t('toolEntitiesDesc', 'Find and copy named or numerical HTML symbols.'), icon: '🔣' },
    { id: 'resume', name: t('toolResumeName', 'Resume Builder'), desc: t('toolResumeDesc', 'Generate and print a professional resume instantly.'), icon: '📄' },
    { id: 'baby-names', name: t('toolBabyNamesName', 'Baby Name Generator'), desc: t('toolBabyNamesDesc', 'Generate unique baby names instantly.'), icon: '👶' },
    { id: 'weight-analyzer', name: t('toolWeightName', 'Weight Analyzer'), desc: t('toolWeightDesc', 'Calculate BMI and find ideal body weight range.'), icon: '⚖️' },
    { id: 'humanizer', name: t('toolHumanizerName', 'AI Text Humanizer'), desc: t('toolHumanizerDesc', 'Convert AI text into realistic human writing style.'), icon: '✍️' },
    { id: 'ai-detector', name: t('toolAiDetectorName', 'AI Content Detector'), desc: t('toolAiDetectorDesc', 'Check text for AI patterns and probability scores.'), icon: '🤖' },
    { id: 'compass', name: t('toolCompassName', 'Digital Compass'), desc: t('toolCompassDesc', 'Check directional heading using orientation sensors.'), icon: '🧭' },
    { id: 'audio-to-text', name: t('toolAudioTextName', 'Audio to Text'), desc: t('toolAudioTextDesc', 'Convert live microphone dictation into written text.'), icon: '🎙️' },
    { id: 'video-to-audio', name: t('toolVideoAudioName', 'Video to Audio'), desc: t('toolVideoAudioDesc', 'Extract clean MP3 audio directly from video files.'), icon: '🎬' },
    { id: 'device-health', name: t('toolDeviceHealthName', 'System Health Checker'), desc: t('toolDeviceHealthDesc', 'Scan device RAM, CPU cores, battery, and speed.'), icon: '💻' },
    { id: 'water-remover', name: t('toolWaterRemoverName', 'Speaker Water Ejector'), desc: t('toolWaterRemoverDesc', 'Play 165Hz sound waves to clean trapped water.'), icon: '💧' },
  ];

  return (
    <div className="max-w-5xl mx-auto text-left py-4 text-white">
      {/* Hero / Vision Section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-10 rounded-2xl shadow-xl border border-slate-800 mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          {t('heroTitle', 'Empowering Creators with Fast, Free Web Tools')}
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-6">
          {t('heroDesc', 'Our vision is to simplify daily developer and user workflows by building privacy-focused, browser-based utilities that require no installation or registration.')}
        </p>
        <button
          onClick={() => setActiveTab('formatter')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
        >
          {t('exploreBtn', 'Explore Tools →')}
        </button>
      </div>

      {/* Our Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-slate-900 rounded-xl shadow-sm border border-slate-800">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-bold text-white text-lg mb-1">{t('feature1Title', 'Instant Performance')}</h3>
          <p className="text-slate-400 text-sm">{t('feature1Desc', 'All operations run locally in your browser for maximum processing speed.')}</p>
        </div>
        <div className="p-6 bg-slate-900 rounded-xl shadow-sm border border-slate-800">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-bold text-white text-lg mb-1">{t('feature2Title', '100% Privacy Focused')}</h3>
          <p className="text-slate-400 text-sm">{t('feature2Desc', 'Your files and text are processed client-side and never uploaded to external servers.')}</p>
        </div>
        <div className="p-6 bg-slate-900 rounded-xl shadow-sm border border-slate-800">
          <div className="text-3xl mb-2">💡</div>
          <h3 className="font-bold text-white text-lg mb-1">{t('feature3Title', 'Zero Friction')}</h3>
          <p className="text-slate-400 text-sm">{t('feature3Desc', 'No paywalls, hidden limits, or forced sign-ups—just direct access to essential utilities.')}</p>
        </div>
      </div>

      {/* Tools Showcase */}
      <h2 className="text-2xl font-bold text-white mb-6">{t('availableTools', 'Available Utilities')}</h2>
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
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
        <h2 className="text-xl font-bold text-white mb-4">{t('faqTitle', 'Frequently Asked Questions')}</h2>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <h4 className="font-semibold text-white">{t('homeFaq1Q', 'Are these tools completely free?')}</h4>
            <p className="text-slate-400">{t('homeFaq1A', 'Yes, all utilities on our platform are entirely free to use without restrictions.')}</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">{t('homeFaq2Q', 'Is my data uploaded anywhere?')}</h4>
            <p className="text-slate-400">{t('homeFaq2A', 'No, image conversions, audio processing, and document generations happen directly inside your web browser.')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}