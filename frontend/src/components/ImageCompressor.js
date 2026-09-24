import { useState } from 'react';

export default function ImageCompressor() {
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: Detailed Blog Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Web Performance & Optimization</span>
              <h1 className="text-2xl font-bold text-white mt-1">Understanding Image Compression and Canvas Rendering</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. Why Image Compression Matters</h2>
              <p>
                Uncompressed media files consume significant bandwidth and slow down web page loading times. Heavy images impact Core Web Vitals, leading to poor user experience and lower search engine rankings.
              </p>
              <p>
                Compressing images reduces network overhead and speeds up rendering across desktop and mobile devices without noticeably sacrificing visual quality.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. How Quality Factor Affects JPEG Encoding</h2>
              <p>
                JPEG compression uses lossy discrete cosine transform algorithms to eliminate redundant color data. Modifying quality settings balances file size and sharpness:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">High Quality (80%-90%):</strong> Preserves fine visual details with minor file size reduction. Ideal for portfolio photography and hero banners.
                </li>
                <li>
                  <strong className="text-slate-200">Balanced (60%-70%):</strong> Yields dramatic file size reductions while maintaining clear visual quality for standard web content.
                </li>
                <li>
                  <strong className="text-slate-200">Maximum Compression (10%-30%):</strong> Significantly reduces file size but introduces noticeable compression artifacts and blurriness.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. HTML5 Canvas Client-Side Processing</h2>
              <p>
                Instead of sending files to external servers, modern web applications leverage HTML5 Canvas rendering. By drawing image data onto a virtual 2D canvas context, the browser can re-encode pixels locally using <code>toDataURL()</code> for instant results and maximum privacy.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Tool & FAQ */}
        <div className="lg:col-span-7 space-y-8">
          {/* Tool Container */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-left">
            <h2 className="text-xl font-bold text-center mb-6">⚡ Image Compressor</h2>
            
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
                  Quality: {Math.round(quality * 100)}%
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
                  Compress Image
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
              {compressedUrl && (
                <div className="p-4 border border-slate-800 rounded-xl bg-slate-950 flex flex-col items-center">
                  <h3 className="font-semibold text-slate-300 mb-2">Compressed Result</h3>
                  <img src={compressedUrl} alt="Compressed" className="max-h-64 object-contain rounded-lg mb-4" />
                  <a 
                    href={compressedUrl} 
                    download="compressed.jpg" 
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
                  >
                    Download Compressed Image
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Publisher Content Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
            <section>
              <h3 className="text-base font-semibold text-white mb-2">How to Compress Images</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                <li>Click <strong className="text-slate-200">Choose File</strong> to upload your image from your device.</li>
                <li>Adjust the <strong className="text-slate-200">Quality slider</strong> (10% to 100%) to select your compression level.</li>
                <li>Click <strong className="text-slate-200">Compress Image</strong> to process the file instantly.</li>
                <li>Preview the output and click <strong className="text-slate-200">Download Compressed Image</strong> to save it.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Are my images uploaded to external servers?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No, all compression happens locally on your computer or phone using native browser rendering APIs.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">What output format is used for compression?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Images are converted to JPEG format to achieve maximum file size reduction while preserving clarity.
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