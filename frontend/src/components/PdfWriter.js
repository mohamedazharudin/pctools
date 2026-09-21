import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';

export default function PdfWriter() {
  const [activeMode, setActiveMode] = useState('writer');

  // PDF Writer States
  const [title, setTitle] = useState('My Document');
  const [content, setContent] = useState('Write your text here...');

  // PDF Converter States
  const [activeTool, setActiveTool] = useState('jpg-to-pdf');
  const [file, setFile] = useState(null);
  const [outputUrl, setOutputUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const converterTools = [
    { id: 'jpg-to-pdf', name: 'JPG to PDF', locked: false },
    { id: 'word-to-pdf', name: 'WORD to PDF', locked: true },
    { id: 'powerpoint-to-pdf', name: 'POWERPOINT to PDF', locked: true },
    { id: 'excel-to-pdf', name: 'EXCEL to PDF', locked: true },
    { id: 'html-to-pdf', name: 'HTML to PDF', locked: true },
    { id: 'pdf-to-jpg', name: 'PDF to JPG', locked: true },
    { id: 'pdf-to-word', name: 'PDF to WORD', locked: true },
    { id: 'pdf-to-powerpoint', name: 'PDF to POWERPOINT', locked: true },
    { id: 'pdf-to-excel', name: 'PDF to EXCEL', locked: true },
    { id: 'pdf-to-pdfa', name: 'PDF to PDF/A', locked: true },
  ];

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(title, 20, 20);
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(content, 170);
    doc.text(splitText, 20, 35);
    doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    try {
      if (activeTool === 'jpg-to-pdf') {
        const pdfDoc = await PDFDocument.create();
        const imageBytes = await file.arrayBuffer();
        const image = file.type === 'image/png' ? await pdfDoc.embedPng(imageBytes) : await pdfDoc.embedJpg(imageBytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setOutputUrl(URL.createObjectURL(blob));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
        <button
          onClick={() => setActiveMode('writer')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
            activeMode === 'writer' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          📝 PDF Writer & Generator
        </button>
        <button
          onClick={() => setActiveMode('converter')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
            activeMode === 'converter' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          🔄 PDF Converter Suite
        </button>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        {activeMode === 'writer' ? (
          <>
            <h2 className="text-xl font-bold mb-2">📝 PDF Writer & Generator</h2>
            <p className="text-slate-400 text-sm mb-6">
              Write your title and content below to convert it into a downloadable PDF document.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                  Document Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter PDF Title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                  Document Content
                </label>
                <textarea
                  rows="10"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
                  placeholder="Type your paragraphs here..."
                />
              </div>
            </div>

            <button
              onClick={exportToPdf}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              📄 Download PDF
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-6 text-center">PDF Converter Suite</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
              {converterTools.map((tool) => (
                <button
                  key={tool.id}
                  disabled={tool.locked}
                  onClick={() => {
                    if (!tool.locked) {
                      setActiveTool(tool.id);
                      setFile(null);
                      setOutputUrl('');
                    }
                  }}
                  className={`p-2.5 text-xs font-semibold rounded-lg border flex items-center justify-between transition-all ${
                    tool.locked
                      ? 'bg-slate-950/60 border-slate-800/80 text-slate-500 cursor-not-allowed opacity-60'
                      : activeTool === tool.id
                      ? 'bg-blue-600 border-blue-500 text-white shadow cursor-pointer'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 cursor-pointer'
                  }`}
                >
                  <span>{tool.name}</span>
                  {tool.locked && <span className="text-xs">🔒</span>}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={(e) => setFile(e.target.files[0])}
                className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-slate-800 file:text-white cursor-pointer"
              />

              <button
                onClick={handleConvert}
                disabled={!file || loading}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-all cursor-pointer"
              >
                {loading ? 'Converting...' : 'Convert JPG to PDF'}
              </button>

              {outputUrl && (
                <a
                  href={outputUrl}
                  download="converted.pdf"
                  className="mt-2 text-blue-400 underline text-sm"
                >
                  Download Converted File
                </a>
              )}
            </div>
          </>
        )}
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">About Online PDF Tools</h3>
          <p>
            Quickly create, convert, and format PDF documents entirely in your browser without uploading data to external servers.
          </p>
        </section>
      </div>
    </div>
  );
}