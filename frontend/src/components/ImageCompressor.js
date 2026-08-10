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
    <div className="tool-section">
      <h1>Image Compressor</h1>
      <div className="upload-box">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {image && (
        <div className="controls">
          <label>Quality: {Math.round(quality * 100)}%</label>
          <input 
            type="range" 
            min="0.1" 
            max="1.0" 
            step="0.1" 
            value={quality} 
            onChange={(e) => setQuality(e.target.value)} 
          />
          <button className="btn" onClick={compressImage}>Compress Image</button>
        </div>
      )}

      <div className="preview-container">
        {image && (
          <div className="card">
            <h3>Original</h3>
            <img src={image} alt="Original" />
          </div>
        )}
        {compressedUrl && (
          <div className="card">
            <h3>Compressed</h3>
            <img src={compressedUrl} alt="Compressed" />
            <a href={compressedUrl} download="compressed.jpg" className="btn download-btn">
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}