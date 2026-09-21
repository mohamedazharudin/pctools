export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      {/* Main Hero Card */}
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
        <div className="text-4xl mb-3">👋</div>
        <h1 className="text-3xl font-extrabold mb-4 text-slate-100">About PcTools</h1>
        
        <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
          Welcome to PcTools, your free online utility suite designed to make daily digital tasks simple, secure, and instant. All processing happens entirely inside your browser for maximum privacy and performance.
        </p>

        <a 
          href="mailto:aljadidazhar@gmail.com" 
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-white transition-all shadow-md shadow-blue-600/20"
        >
          📧 Contact: aljadidazhar@gmail.com
        </a>
      </div>

      {/* SEO Publisher Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Our Mission</h2>
          <p>
            PcTools was built to provide high-speed, free online tools without mandatory account registrations, heavy downloads, or hidden fees. Whether you need to edit PDFs, compress images, generate secure passwords, or run network utilities, our software delivers fast results directly in your web browser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Why Choose PcTools?</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-400">
            <li><strong className="text-slate-200">100% Privacy Focused:</strong> Your files and data remain local on your device during processing.</li>
            <li><strong className="text-slate-200">No Installation Required:</strong> Run tools instantly on mobile, tablet, or desktop devices.</li>
            <li><strong className="text-slate-200">Free Access:</strong> Enjoy reliable online web applications completely free of charge.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white mb-2">Suggest a Tool</h2>
          <p>
            Have an idea for a tool that would simplify your workflow? Reach out anytime via email at <a href="mailto:aljadidazhar@gmail.com" className="text-blue-400 underline">aljadidazhar@gmail.com</a> with your feedback or feature requests.
          </p>
        </section>
      </div>
    </div>
  );
}