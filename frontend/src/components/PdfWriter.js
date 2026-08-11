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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow border border-slate-100 text-left">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">📝 PDF Writer</h1>
      <p className="text-slate-500 text-sm mb-6">Write your title and content below to convert it into a downloadable PDF.</p>

      {/* Input Fields */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Document Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded text-sm focus:outline-blue-500"
            placeholder="Enter PDF Title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Document Content</label>
          <textarea
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded text-sm focus:outline-blue-500 leading-relaxed"
            placeholder="Type your paragraphs here..."
          />
        </div>
      </div>

      {/* Convert / Download Button */}
      <button
        onClick={exportToPdf}
        className="px-5 py-2.5 bg-emerald-600 text-white rounded text-sm font-medium hover:bg-emerald-700 transition-colors shadow"
      >
        📄 Download PDF
      </button>
    </div>
  );
}