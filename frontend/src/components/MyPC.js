import { useState } from 'react';
import { BLOGS_LIST } from '../blogs';

export default function MyPC() {
  const [currentView, setCurrentView] = useState('root');
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="flex flex-col h-full text-white select-none">
      <div className="flex items-center gap-2 p-2 bg-black/40 border border-white/10 text-xs mb-4 rounded-xl">
        <span className="text-slate-400">Path:</span>
        <span className="bg-white/10 px-2.5 py-0.5 rounded font-mono text-cyan-300">
          {selectedBlog ? `C:\\blogs\\${selectedBlog.filename}` : currentView === 'root' ? 'C:\\' : 'C:\\blogs'}
        </span>

        {selectedBlog ? (
          <button onClick={() => setSelectedBlog(null)} className="ml-auto px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-[11px] text-cyan-300 transition cursor-pointer">
            ← Back to Folder
          </button>
        ) : currentView === 'blogs' ? (
          <button onClick={() => setCurrentView('root')} className="ml-auto px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-[11px] text-cyan-300 transition cursor-pointer">
            ← Back to C:
          </button>
        ) : null}
      </div>

      {currentView === 'root' && !selectedBlog && (
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Devices and Drives</h3>
          <div onClick={() => setCurrentView('blogs')} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 rounded-xl cursor-pointer transition w-full sm:w-72 active:scale-98 group">
            <span className="text-4xl group-hover:scale-105 transition-transform">🗂️</span>
            <div>
              <h4 className="text-xs font-semibold text-white group-hover:text-cyan-300">Local Disk (C:)</h4>
              <p className="text-[10px] text-slate-400">Folder: /blogs ({BLOGS_LIST.length} files)</p>
            </div>
          </div>
        </div>
      )}

      {currentView === 'blogs' && !selectedBlog && (
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Directory: C:\blogs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {BLOGS_LIST.map((blog) => (
              <div key={blog.id} onClick={() => setSelectedBlog(blog)} className="flex flex-col items-center p-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 rounded-xl cursor-pointer transition text-center group active:scale-95">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📄</div>
                <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 truncate w-full">{blog.filename}</span>
                <span className="text-[10px] text-slate-400 mt-1">{blog.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedBlog && (
        <div className="flex-1 flex flex-col bg-[#111111] border border-white/15 rounded-xl overflow-hidden shadow-2xl min-h-[300px]">
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#1c1c1c] border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 overflow-hidden pr-2">
              <span>📝</span>
              <span className="font-semibold text-slate-200 truncate">{selectedBlog.filename} — Notepad</span>
            </div>
            <button onClick={() => setSelectedBlog(null)} className="px-2.5 py-0.5 bg-red-600/80 hover:bg-red-600 text-white rounded text-[11px] transition cursor-pointer shrink-0">
              ✕ Close File
            </button>
          </div>
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto text-xs sm:text-sm text-slate-200 leading-relaxed space-y-4 select-text bg-[#0d0d0d]">
            <div className="pb-3 border-b border-white/10 text-slate-400 text-[11px] flex flex-col sm:flex-row justify-between gap-1 font-mono">
              <span className="text-cyan-300 font-semibold">{selectedBlog.title}</span>
              <span>Date: {selectedBlog.date} | Author: {selectedBlog.author}</span>
            </div>
            <div className="pt-2">
              <selectedBlog.Component />
            </div>
          </div>
          <div className="px-4 py-1.5 bg-[#181818] border-t border-white/10 text-[10px] text-slate-400 flex justify-between font-mono">
            <span>Encoding: UTF-8</span>
            <span>Type: React Component</span>
          </div>
        </div>
      )}
    </div>
  );
}