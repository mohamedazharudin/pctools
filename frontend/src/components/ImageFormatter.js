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
    <div className="tool-section">
      <h1>Image Formatter</h1>
      <div className="upload-box">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {image && (
        <div className="controls">
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WEBP</option>
          </select>
          <button className="btn" onClick={convertImage}>Convert Image</button>
        </div>
      )}

      <div className="preview-container">
        {image && (
          <div className="card">
            <h3>Original</h3>
            <img src={image} alt="Original" />
          </div>
        )}
        {formattedUrl && (
          <div className="card">
            <h3>Converted</h3>
            <img src={formattedUrl} alt="Converted" />
            <a href={formattedUrl} download={`converted.${format.split('/')[1]}`} className="btn download-btn">
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}