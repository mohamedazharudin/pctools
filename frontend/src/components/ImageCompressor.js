import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ImageCompressor() {
  const { t } = useTranslation('imageCompressor');
  const [image, setImage] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [compressedUrl, setCompressedUrl] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setCompressedUrl('');
    }
  };

  const compressImage = () => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      setCompressedUrl(canvas.toDataURL('image/jpeg', parseFloat(quality)));
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Container */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-left">
        <h2 className="text-xl font-bold text-center mb-6">⚡ {t('title', 'Image Compressor')}</h2>
        
        <div className="mb-6">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
          />
        </div>

        {image && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
            <label className="text-sm font-semibold text-slate-300 min-w-[110px]">
              {t('qualityLabel', 'Quality')}: {Math.round(quality * 100)}%
            </label>
            <input 
              type="range" 
              min="0.1" 
              max="1.0" 
              step="0.1" 
              value={quality} 
              onChange={(e) => setQuality(e.target.value)} 
              className="w-full sm:w-48 accent-blue-600 cursor-pointer"
            />
            <button 
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer" 
              onClick={compressImage}
            >
              {t('compressBtn', 'Compress Image')}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {image && (
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-950 flex flex-col items-center">
              <h3 className="font-semibold text-slate-300 mb-2">{t('originalTitle', 'Original Image')}</h3>
              <img src={image} alt="Original" className="max-h-64 object-contain rounded-lg" />
            </div>
          )}
          {compressedUrl && (
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-950 flex flex-col items-center">
              <h3 className="font-semibold text-slate-300 mb-2">{t('compressedTitle', 'Compressed Result')}</h3>
              <img src={compressedUrl} alt="Compressed" className="max-h-64 object-contain rounded-lg mb-4" />
              <a 
                href={compressedUrl} 
                download="compressed.jpg" 
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                {t('downloadBtn', 'Download Compressed Image')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Publisher Content for AdSense Approval */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About Online Image Compressor')}</h3>
          <p>
            {t('aboutText', 'Large image files can slow down website loading speeds and use up storage. This client-side Image Compressor reduces file size by tweaking JPG/JPEG quality settings using HTML5 Canvas—all directly inside your web browser.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToTitle', 'How to Compress Images')}</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>{t('step1Prefix', 'Click')} <strong className="text-slate-200">{t('chooseFile', 'Choose File')}</strong> {t('step1Suffix', 'to upload your image from your device.')}</li>
            <li>{t('step2Prefix', 'Adjust the')} <strong className="text-slate-200">{t('qualitySlider', 'Quality slider')}</strong> {t('step2Suffix', '(10% to 100%) to select your compression level.')}</li>
            <li>{t('step3Prefix', 'Click')} <strong className="text-slate-200">{t('compressBtnInline', 'Compress Image')}</strong> {t('step3Suffix', 'to process the file instantly.')}</li>
            <li>{t('step4Prefix', 'Preview the output and click')} <strong className="text-slate-200">{t('downloadBtnInline', 'Download Compressed Image')}</strong> {t('step4Suffix', 'to save it.')}</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Are my images uploaded to external servers?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'No, all compression happens locally on your computer or phone using browser rendering APIs.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'What output format is used for compression?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'Images are converted to JPEG format to achieve maximum file size reduction while preserving clarity.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}