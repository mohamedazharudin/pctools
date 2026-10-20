export default function DesktopHome({ onOpenStart }) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] sm:min-h-[400px] text-center p-4 sm:p-6 text-white">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl sm:rounded-3xl border border-white/20 flex items-center justify-center text-3xl sm:text-4xl shadow-2xl mb-4 backdrop-blur-md">
          💻
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome to PcTools Workspace</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6">
          Open "My PC" from the desktop or click the Start menu button on the taskbar to launch tools.
        </p>
        <button
          onClick={onOpenStart}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold shadow-lg transition active:scale-95 cursor-pointer"
        >
          Open Start Menu 🚀
        </button>
      </div>
    );
  }