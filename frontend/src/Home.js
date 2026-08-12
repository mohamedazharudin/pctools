export default function Home({ setActiveTab }) {
  const tools = [
    { id: 'formatter', name: 'Image Formatter', desc: 'Convert images to PNG, JPEG, or WEBP instantly.', icon: '🖼️' },
    { id: 'compressor', name: 'Image Compressor', desc: 'Reduce image file size with adjustable quality controls.', icon: '⚡' },
    { id: 'pdf-writer', name: 'PDF Writer', desc: 'Write paragraphs and export clean PDF documents easily.', icon: '📝' },
    { id: 'palette', name: 'Color Palettes', desc: 'Explore developer palettes and copy hex codes with one click.', icon: '🎨' },
    { id: 'entities', name: 'HTML Entities', desc: 'Find and copy named or numerical HTML symbols.', icon: '🔣' },
    { id: 'resume', name: 'Resume Builder', desc: 'Generate and print a professional resume instantly.', icon: '📄' },
  ];

  return (
    <div className="max-w-5xl mx-auto text-left py-4">
      {/* Hero / Vision Section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-10 rounded-2xl shadow-xl mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Empowering Creators with Fast, Free Web Tools
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl leading-relaxed mb-6">
          Our vision is to simplify daily developer and designer workflows by building privacy-focused, browser-based utilities that require no installation or registration.
        </p>
        <button
          onClick={() => setActiveTab('formatter')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-colors"
        >
          Explore Tools →
        </button>
      </div>

      {/* Our Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-bold text-slate-800 text-lg mb-1">Instant Performance</h3>
          <p className="text-slate-500 text-sm">All operations run locally in your browser for maximum processing speed.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-bold text-slate-800 text-lg mb-1">100% Privacy Focused</h3>
          <p className="text-slate-500 text-sm">Your files and text are processed client-side and never uploaded to external servers.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="text-3xl mb-2">💡</div>
          <h3 className="font-bold text-slate-800 text-lg mb-1">Zero Friction</h3>
          <p className="text-slate-500 text-sm">No paywalls, hidden limits, or forced sign-ups—just direct access to essential utilities.</p>
        </div>
      </div>

      {/* Tools Showcase */}
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Available Utilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 cursor-pointer transition-all"
          >
            <div className="text-3xl mb-2">{tool.icon}</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">{tool.name}</h3>
            <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 p-8 rounded-xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4 text-sm text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-800">Are these tools completely free?</h4>
            <p>Yes, all utilities on our platform are entirely free to use without restrictions.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Is my data uploaded anywhere?</h4>
            <p>No, image conversions and document generations happen directly inside your web browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
}