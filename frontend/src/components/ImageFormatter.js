import { useState } from 'react';

export default function ImageFormatter() {
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow border border-slate-100 text-left">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Image Formatter</h1>
      
      <div className="mb-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      {image && (
        <div className="flex gap-3 mb-6 items-center">
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value)}
            className="p-2 border border-gray-300 rounded text-sm focus:outline-blue-500"
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WEBP</option>
          </select>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors" 
            onClick={convertImage}
          >
            Convert Image
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
        {formattedUrl && (
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col items-center">
            <h3 className="font-semibold text-slate-700 mb-2">Converted</h3>
            <img src={formattedUrl} alt="Converted" className="max-h-64 object-contain rounded mb-3" />
            <a 
              href={formattedUrl} 
              download={`converted.${format.split('/')[1]}`} 
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