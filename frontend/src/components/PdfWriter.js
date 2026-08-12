import { useState } from 'react';
import { jsPDF } from 'jspdf';

export default function PdfWriter() {
  const [title, setTitle] = useState('My Document');
  const [content, setContent] = useState('Write your text here...');

  const exportToPdf = () => {
    const doc = new jsPDF();
    
    // Add Document Title
    doc.setFontSize(20);
    doc.text(title, 20, 20);

    // Add Paragraph Content with text wrapping
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(content, 170); // Wraps text within page width
    doc.text(splitText, 20, 35);

    // Save File
    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      {/* Tool Container */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h2 className="text-xl font-bold mb-2">📝 PDF Writer & Generator</h2>
        <p className="text-slate-400 text-sm mb-6">Write your title and content below to convert it into a downloadable PDF document.</p>

        {/* Input Fields */}
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">Document Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter PDF Title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">Document Content</label>
            <textarea
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
              placeholder="Type your paragraphs here..."
            />
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={exportToPdf}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
        >
          📄 Download PDF
        </button>
      </div>

      {/* Publisher Content Section for AdSense Approval */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">About Online PDF Writer</h3>
          <p>
            Quickly turn text notes into clean, formatted PDF documents without needing word processing software. 
            This utility uses client-side rendering to generate PDF files directly inside your web browser.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">How to Create PDF Documents</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>Enter your document heading into the <strong className="text-slate-200">Document Title</strong> field.</li>
            <li>Write or paste your text body into the <strong className="text-slate-200">Document Content</strong> text area.</li>
            <li>Click <strong className="text-slate-200">Download PDF</strong> to generate and save your file locally.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Is my document text saved on any server?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No, your text stays completely local and private inside your browser session during generation.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Does long text wrap automatically?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Yes, paragraphs wrap automatically to fit standard page widths when exporting to PDF format.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}