import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';

export default function PdfWriter() {
  const { t } = useTranslation();
  const [title, setTitle] = useState(t('defaultTitle', 'My Document'));
  const [content, setContent] = useState(t('defaultContent', 'Write your text here...'));

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
        <h2 className="text-xl font-bold mb-2">📝 {t('title', 'PDF Writer & Generator')}</h2>
        <p className="text-slate-400 text-sm mb-6">
          {t('subtitle', 'Write your title and content below to convert it into a downloadable PDF document.')}
        </p>

        {/* Input Fields */}
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              {t('docTitleLabel', 'Document Title')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500"
              placeholder={t('docTitlePlaceholder', 'Enter PDF Title')}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1.5">
              {t('docContentLabel', 'Document Content')}
            </label>
            <textarea
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
              placeholder={t('docContentPlaceholder', 'Type your paragraphs here...')}
            />
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={exportToPdf}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
        >
          📄 {t('downloadBtn', 'Download PDF')}
        </button>
      </div>

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About Online PDF Writer')}</h3>
          <p>
            {t('aboutText', 'Quickly turn text notes into clean, formatted PDF documents without needing word processing software. This utility uses client-side rendering to generate PDF files directly inside your web browser.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToTitle', 'How to Create PDF Documents')}</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>
              {t('step1Prefix', 'Enter your document heading into the')} <strong className="text-slate-200">{t('docTitleLabel', 'Document Title')}</strong> {t('step1Suffix', 'field.')}
            </li>
            <li>
              {t('step2Prefix', 'Write or paste your text body into the')} <strong className="text-slate-200">{t('docContentLabel', 'Document Content')}</strong> {t('step2Suffix', 'text area.')}
            </li>
            <li>
              {t('step3Prefix', 'Click')} <strong className="text-slate-200">{t('downloadBtn', 'Download PDF')}</strong> {t('step3Suffix', 'to generate and save your file locally.')}
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Is my document text saved on any server?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'No, your text stays completely local and private inside your browser session during generation.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Does long text wrap automatically?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'Yes, paragraphs wrap automatically to fit standard page widths when exporting to PDF format.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}