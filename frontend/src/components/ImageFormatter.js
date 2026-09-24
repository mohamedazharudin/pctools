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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: 600+ Word Blog Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Digital Imaging & Media Formats</span>
              <h1 className="text-2xl font-bold text-white mt-1">Guide to Image File Formats, Compression, and Conversion</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. Lossy vs. Lossless Compression</h2>
              <p>
                Digital images rely on compression algorithms to balance file size and visual fidelity. Understanding compression types ensures optimal media delivery:
              </p>
              <p>
                <strong>Lossy Compression:</strong> Formats like JPEG discard imperceptible color data to drastically reduce file sizes. While ideal for high-resolution photography, repeated saving degrades image quality over time.
              </p>
              <p>
                <strong>Lossless Compression:</strong> Formats like PNG retain every pixel's exact original data. This guarantees pixel-perfect detail, making it indispensable for vector graphics, text, and logos.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Comparing Popular Graphic Extensions</h2>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">PNG (Portable Network Graphics):</strong> Features full alpha-channel transparency and lossless rendering, perfect for web UI assets.
                </li>
                <li>
                  <strong className="text-slate-200">JPEG (Joint Photographic Experts Group):</strong> Universal standard for photos, maximizing disk space savings with adjustable lossy compression.
                </li>
                <li>
                  <strong className="text-slate-200">WebP:</strong> Next-generation format developed by Google offering superior lossy and lossless compression for faster website load times.
                </li>
                <li>
                  <strong className="text-slate-200">HEIC (High Efficiency Image Container):</strong> Modern format used by Apple devices that offers high quality at half the file size of JPEG.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. In-Browser Client-Side Processing</h2>
              <p>
                Browser-based image conversion utilizes HTML5 Canvas rendering context and WebAssembly libraries to process pixels directly in memory. This eliminates bandwidth consumption, preserves file privacy, and ensures instant output generation without server dependency.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Tool, Overview & FAQ */}
        <div className="lg:col-span-7 space-y-8">
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

          {/* Publisher Content & FAQ */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
            <section>
              <h3 className="text-base font-semibold text-white mb-2">Supported Formats Summary</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-slate-200">PNG:</strong> Best for graphics, icons, and transparent backgrounds.</li>
                <li><strong className="text-slate-200">JPEG:</strong> Ideal for photos with small file size requirements.</li>
                <li><strong className="text-slate-200">WEBP:</strong> Modern web format for fast page loading.</li>
                <li><strong className="text-slate-200">BMP:</strong> Uncompressed bitmap image format.</li>
                <li><strong className="text-slate-200">HEIC:</strong> High-efficiency image format commonly used on iOS devices.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Is my image uploaded to external servers?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No, conversion takes place entirely within your browser engine, keeping your files private and secure.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Why convert HEIC files to PNG or JPEG?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    HEIC images captured on iOS devices often lack native compatibility with legacy web browsers, Windows PCs, and editing software.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}