export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'formatter', label: 'Image Formatter' },
    { id: 'compressor', label: 'Image Compressor' },
    { id: 'palette', label: 'Color Palettes' },
    { id: 'entities', label: 'HTML Entities' },
    { id: 'resume', label: '📄 Resume Builder' },
    { id: 'pdf-writer', label: '📝 PDF Writer' },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-4 flex flex-col gap-4 border-r border-slate-800">
      <div className="flex justify-center p-2">
        <a href="/" className="block">
          <img src="PcToolLogo.png" alt="PcTools Logo" className="h-10 w-auto object-contain" />
        </a>
      </div>

      <h2 className="text-xl font-bold text-slate-300 px-3 flex items-center gap-2">
        🛠️ Tools
      </h2>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}