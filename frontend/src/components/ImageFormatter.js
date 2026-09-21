import { useState } from 'react';
import heic2any from 'heic2any';

export default function ImageFormatter() {
  const [image, setImage] = useState(null);
  const [currentMime, setCurrentMime] = useState('');
  const [targetFormat, setTargetFormat] = useState('image/png');
  const [formattedUrl, setFormattedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const allFormats = [
    { label: 'Convert to PNG', mime: 'image/png', ext: 'png' },
    { label: 'Convert to JPEG', mime: 'image/jpeg', ext: 'jpg' },
    { label: 'Convert to WEBP', mime: 'image/webp', ext: 'webp' },
    { label: 'Convert to BMP', mime: 'image/bmp', ext: 'bmp' },
    { label: 'Convert to HEIC', mime: 'image/heic', ext: 'heic' }
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormattedUrl('');
    setLoading(true);

    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic';

    if (isHeic) {
      setCurrentMime('image/heic');
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/png'
        });
        const blobUrl = URL.createObjectURL(Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob);
        setImage(blobUrl);
      } catch (error) {
        console.error('Error reading HEIC file:', error);
      }
    } else {
      setCurrentMime(file.type);
      setImage(URL.createObjectURL(file));
    }

    const defaultTarget = isHeic ? 'image/png' : allFormats.find((f) => f.mime !== file.type)?.mime || 'image/png';
    setTargetFormat(defaultTarget);
    setLoading(false);
  };

  const convertImage = async () => {
    if (!image) return;

    if (targetFormat === 'image/heic') {
      setLoading(true);
      try {
        const response = await fetch(image);
        const inputBlob = await response.blob();
        const heicBlob = await heic2any({
          blob: inputBlob,
          toType: 'image/heic'
        });
        const url = URL.createObjectURL(Array.isArray(heicBlob) ? heicBlob[0] : heicBlob);
        setFormattedUrl(url);
      } catch (error) {
        console.error('Error converting to HEIC:', error);
      }
      setLoading(false);
      return;
    }

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (targetFormat === 'image/jpeg' || targetFormat === 'image/bmp') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      setFormattedUrl(canvas.toDataURL(targetFormat, 0.92));
    };
  };

  const availableTargetFormats = allFormats.filter((fmt) => fmt.mime !== currentMime);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Tool Container */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-left">
        <h2 className="text-xl font-bold text-center mb-6">🖼️ Image Format Converter</h2>

        <div className="mb-6">
          <input
            type="file"
            accept="image/*,.heic"
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
          />
        </div>

        {loading && (
          <div className="p-4 mb-6 text-center text-sm font-semibold text-blue-400 bg-slate-950 rounded-xl border border-slate-800">
            Processing image format...
          </div>
        )}

        {image && !loading && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch sm:items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {availableTargetFormats.map((fmt) => (
                <option key={fmt.mime} value={fmt.mime}>
                  {fmt.label}
                </option>
              ))}
            </select>
            <button
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
              onClick={convertImage}
            >
              Convert Image
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {image && (
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-950 flex flex-col items-center">
              <h3 className="font-semibold text-slate-300 mb-2">Original Image</h3>
              <img src={image} alt="Original" className="max-h-64 object-contain rounded-lg" />
            </div>
          )}
          {formattedUrl && (
            <div className="p-4 border border-slate-800 rounded-xl bg-slate-950 flex flex-col items-center">
              <h3 className="font-semibold text-slate-300 mb-2">Converted Image</h3>
              <img src={formattedUrl} alt="Converted" className="max-h-64 object-contain rounded-lg mb-4" />
              <a
                href={formattedUrl}
                download={`converted.${allFormats.find((f) => f.mime === targetFormat)?.ext || 'png'}`}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Publisher Content */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">About Online Image Format Converter</h3>
          <p>
            Convert image files between PNG, JPEG, WebP, BMP, and HEIC formats instantly in your browser without uploading data to external servers.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Supported Formats Explained</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li><strong className="text-slate-200">PNG:</strong> Best for graphics, icons, and transparent backgrounds.</li>
            <li><strong className="text-slate-200">JPEG:</strong> Ideal for photos with small file size requirements.</li>
            <li><strong className="text-slate-200">WEBP:</strong> Modern web format for fast page loading.</li>
            <li><strong className="text-slate-200">BMP:</strong> Uncompressed bitmap image format.</li>
            <li><strong className="text-slate-200">HEIC:</strong> High-efficiency image format commonly used on iOS devices.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Is my image uploaded to external servers?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No, conversion takes place entirely within your browser engine, keeping your files private and secure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}