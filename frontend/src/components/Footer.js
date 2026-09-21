export default function Footer({ setActiveTab, onOpenPrivacy }) {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">PcTools</h3>
          <p className="text-xs text-slate-400">All useful web tools for free.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <button 
            onClick={() => setActiveTab('home')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('about')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button 
            onClick={onOpenPrivacy} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <a 
            href="mailto:aljadidazhar@gmail.com" 
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} PcTools. All rights reserved.
        </p>
      </div>
    </footer>
  );
}