export default function AboutUs() {
  return (
    <div className="max-w-xl mx-auto p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
      <div className="text-4xl mb-3">👋</div>
      <h2 className="text-2xl font-bold mb-4">About PcTools</h2>
      
      <p className="text-slate-300 leading-relaxed mb-6">
        I am trying to give all useful tools free. If you need any tool to suggest to add, just mail me at:
      </p>

      <a 
        href="mailto:aljadidazhar@gmail.com" 
        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-white transition-all shadow-md"
      >
        📧 aljadidazhar@gmail.com
      </a>
    </div>
  );
}