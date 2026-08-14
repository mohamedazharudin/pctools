import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ImageFormatter() {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [format, setFormat] = useState('image/png');
  const [formattedUrl, setFormattedUrl] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormattedUrl('');
    }
  };

  const convertImage = () => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      setFormattedUrl(canvas.toDataURL(format));
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Container */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-left">
        <h2 className="text-xl font-bold text-center mb-6">🖼️ {t('title', 'Image Format Converter')}</h2>
        
        <div className="mb-6">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
          />
        </div>

        {image && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch sm:items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
            <select 
              value={format} 
              onChange={(e) => setFormat(e.target.value)}
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="image/png">{t('toPng', 'Convert to PNG')}</option>
              <option value="image/jpeg">{t('toJpeg', 'Convert to JPEG')}</option>
              <option value="image/webp">{t('toWebp', 'Convert to WEBP')}</option>
            </select>
            <button 
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer" 
              onClick={convertImage}
            >
              {t('convertBtn', 'Convert Image')}
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
          {formattedUrl && (
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-950 flex flex-col items-center">
              <h3 className="font-semibold text-slate-300 mb-2">{t('convertedTitle', 'Converted Image')}</h3>
              <img src={formattedUrl} alt="Converted" className="max-h-64 object-contain rounded-lg mb-4" />
              <a 
                href={formattedUrl} 
                download={`converted.${format.split('/')[1]}`} 
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                {t('downloadBtn', 'Download Image')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Publisher Content */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About Online Image Format Converter')}</h3>
          <p>
            {t('aboutText', 'Different platforms require distinct image formats for optimization and compatibility. This browser tool allows you to easily convert image files between PNG, JPEG, and WebP formats instantly without downloading external software.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('formatsTitle', 'Supported Formats Explained')}</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li><strong className="text-slate-200">PNG:</strong> {t('pngDesc', 'Best for graphics, icons, and images requiring transparent backgrounds.')}</li>
            <li><strong className="text-slate-200">JPEG:</strong> {t('jpegDesc', 'Ideal for complex photos and pictures with small file size requirements.')}</li>
            <li><strong className="text-slate-200">WEBP:</strong> {t('webpDesc', 'Modern web format providing superior compression and image quality for faster web loading.')}</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Is my image uploaded to external servers?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'No, conversion takes place entirely within your browser engine, keeping your files private and secure.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Does converting formats reduce image quality?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'PNG preserves original quality, while JPEG and WebP apply light compression optimized for web performance.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}