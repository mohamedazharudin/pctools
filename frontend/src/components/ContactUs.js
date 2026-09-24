export default function ContactUs() {
    return (
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        {/* Hero Card */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
          <div className="text-4xl mb-3">📬</div>
          <h1 className="text-3xl font-extrabold mb-4 text-slate-100">Contact Us</h1>
          <p className="text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            Have questions, suggestions, or need help with PcTools? We’d love to hear from you! Reach out directly via email and we'll reply as soon as possible.
          </p>
  
          <a 
            href="mailto:aljadidazhar@gmail.com" 
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-white transition-all shadow-md shadow-blue-600/20"
          >
            📧 Email: aljadidazhar@gmail.com
          </a>
        </div>
  
        {/* Info Card */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">Get in Touch</h2>
            <p>
              Whether you noticed a bug, want to suggest a new tool feature, or have a business inquiry, feel free to drop us a message. Your feedback helps us continuously improve PcTools for everyone.
            </p>
          </section>
  
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Support & Feedback</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><strong className="text-slate-200">General Queries:</strong> Send your questions regarding any of our browser tools.</li>
              <li><strong className="text-slate-200">Feature Requests:</strong> Tell us what utility tools you'd like to see next.</li>
              <li><strong className="text-slate-200">Bug Reports:</strong> Let us know if something isn't working as expected.</li>
            </ul>
          </section>
        </div>
      </div>
    );
  }