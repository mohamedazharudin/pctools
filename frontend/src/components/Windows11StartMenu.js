import { useState } from 'react';

export default function Windows11StartMenu({ setActiveTab, searchQuery, setSearchQuery, allTools }) {
  const [showAllApps, setShowAllApps] = useState(false);

  const filteredTools = allTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[600px] mx-auto p-4 sm:p-6 bg-[#202020]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl text-white flex flex-col max-h-[80vh] overflow-y-auto font-sans select-none">
      <div className="relative mb-4 sm:mb-5">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm">🔍</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search apps, settings, and documents..."
          className="w-full pl-9 sm:pl-11 pr-4 py-2 bg-[#1c1c1c]/90 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 shadow-inner"
        />
      </div>

      {showAllApps ? (
        <div className="flex-col flex mb-4">
          <div className="flex justify-between items-center mb-3 px-1">
            <span className="text-xs font-semibold text-slate-200 tracking-wide">All Apps</span>
            <button onClick={() => setShowAllApps(false)} className="text-[11px] text-cyan-400 cursor-pointer hover:underline bg-white/5 px-2.5 py-1 rounded border border-white/10">
              ‹ Back
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[50vh]">
            {allTools.map((tool) => (
              <div key={`all-${tool.id}`} onClick={() => setActiveTab(tool.id)} className="flex items-center gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-white/10">
                <span className="text-xl sm:text-2xl p-2 rounded-xl bg-slate-800/50 border border-white/5">{tool.icon}</span>
                <div className="overflow-hidden text-left">
                  <h4 className="text-xs font-semibold text-white truncate">{tool.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 sm:mb-5">
            <div className="flex justify-between items-center mb-3 px-1">
              <span className="text-xs font-semibold text-slate-200 tracking-wide">Pinned</span>
              <button onClick={() => setShowAllApps(true)} className="text-[11px] text-cyan-400 cursor-pointer hover:underline bg-white/5 px-2 py-0.5 rounded border border-white/10">
                All apps ›
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5 text-center">
              {allTools.slice(0, 12).map((tool) => (
                <div key={tool.id} onClick={() => setActiveTab(tool.id)} className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-all active:scale-95 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-slate-800/60 border border-white/10 shadow group-hover:scale-105 transition-transform text-base sm:text-lg">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-200 truncate w-full">{tool.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs font-semibold text-slate-200 tracking-wide">Recommended</span>
              <span className="text-[11px] text-slate-400 cursor-pointer hover:underline">More ›</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredTools.slice(0, 4).map((tool) => (
                <div key={`rec-${tool.id}`} onClick={() => setActiveTab(tool.id)} className="flex items-center gap-2.5 p-1.5 sm:p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-white/10 active:scale-98">
                  <span className="text-lg sm:text-xl p-1.5 sm:p-2 rounded-xl bg-slate-800/50 border border-white/5">{tool.icon}</span>
                  <div className="overflow-hidden text-left">
                    <h4 className="text-xs font-semibold text-white truncate">{tool.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs px-1">
        <div className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-white/10 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow">
            P
          </div>
          <span className="font-medium text-slate-200">PcTools User</span>
        </div>
        <button onClick={() => setActiveTab('home')} className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer" title="Power / Home">
          ⏻
        </button>
      </div>
    </div>
  );
}