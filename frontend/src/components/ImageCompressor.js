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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow border border-slate-100 text-left">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Image Compressor</h1>
      
      <div className="mb-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      {image && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
          <label className="text-sm font-semibold text-slate-700 min-w-[110px]">
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
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors" 
            onClick={compressImage}
          >
            Compress Image
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {image && (
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col items-center">
            <h3 className="font-semibold text-slate-700 mb-2">Original</h3>
            <img src={image} alt="Original" className="max-h-64 object-contain rounded" />
          </div>
        )}
        {compressedUrl && (
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col items-center">
            <h3 className="font-semibold text-slate-700 mb-2">Compressed</h3>
            <img src={compressedUrl} alt="Compressed" className="max-h-64 object-contain rounded mb-3" />
            <a 
              href={compressedUrl} 
              download="compressed.jpg" 
              className="px-4 py-2 bg-emerald-600 text-white rounded text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}