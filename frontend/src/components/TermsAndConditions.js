export default function TermsAndConditions() {
    return (
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        {/* Hero Card */}
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
          <div className="text-4xl mb-3">📜</div>
          <h1 className="text-3xl font-extrabold mb-2 text-slate-100">Terms & Conditions</h1>
          <p className="text-slate-400 text-sm">Last updated: September 2026</p>
        </div>
  
        {/* Terms Content */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing and using <strong>PcTools</strong> (pctools.online), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue use of our site and services.
            </p>
          </section>
  
          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Use of Services</h2>
            <p>
              PcTools provides free, client-side web utility tools for personal and professional use. You agree to use the services only for lawful purposes and in a manner that does not infringe on the rights of others or restrict their use of the platform.
            </p>
          </section>
  
          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Intellectual Property</h2>
            <p>
              All content, user interfaces, source code, logos, and branding on PcTools are the property of PcTools unless otherwise noted. You may not copy, reproduce, or redistribute site materials without explicit permission.
            </p>
          </section>
  
          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Disclaimer of Warranties</h2>
            <p>
              PcTools and its tools are provided on an "as is" and "as available" basis without warranties of any kind. While all file processing happens locally in your browser to maintain privacy and performance, we do not guarantee uninterrupted, error-free operation.
            </p>
          </section>
  
          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Limitation of Liability</h2>
            <p>
              In no event shall PcTools or its owners be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our tools, including data loss or system interruption.
            </p>
          </section>
  
          <section>
            <h2 className="text-lg font-bold text-white mb-2">6. Contact Information</h2>
            <p>
              If you have any questions regarding these Terms and Conditions, please contact us at{' '}
              <a href="mailto:aljadidazhar@gmail.com" className="text-blue-400 underline">
                aljadidazhar@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    );
  }