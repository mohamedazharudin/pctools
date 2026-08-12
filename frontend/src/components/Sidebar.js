export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'home', label: '🏠 Home' },
    { id: 'formatter', label: '🖼️ Image Formatter' },
    { id: 'compressor', label: '⚡ Image Compressor' },
    { id: 'palette', label: '🎨 Color Palettes' },
    { id: 'entities', label: '🔣 HTML Entities' },
    { id: 'resume', label: '📄 Resume Builder' },
    { id: 'pdf-writer', label: '📝 PDF Writer' },
    { id: 'ip-finder', label: '🌐 IP Finder' },
    { id: 'speed-test', label: '🚀 Speed Test' },
  ];

  return (
    <>
      {/* Dark overlay backdrop for all screens */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Floating Glassy Sidebar */}
      <aside className={`fixed top-4 left-4 h-[calc(100vh-2rem)] w-64 bg-slate-900/80 backdrop-blur-md text-white p-5 rounded-2xl border border-slate-700/50 shadow-2xl z-50 transition-all duration-300 ease-in-out hover:bg-slate-900/60 flex flex-col gap-4 ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-[115%] opacity-0 pointer-events-none'
      }`}>
        <div className="flex justify-between items-center pb-2 border-b border-slate-700/50">
          <a href="/" className="block">
            <img src="PcToolLogo.png" alt="PcTools Logo" className="h-9 w-auto object-contain" />
          </a>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-1.5 rounded-xl hover:bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase px-2 pt-2">
          🛠️ Tools
        </h2>

        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600/90 text-white shadow-lg backdrop-blur-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}