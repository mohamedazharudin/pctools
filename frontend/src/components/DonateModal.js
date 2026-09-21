import { useState } from 'react';

export default function DonateModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const upiId = "aljadidazhar-1@okicici";
  const payeeName = "Mohamed Azharudin";

  if (!isOpen) return null;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    `upi://pay?pa=${upiId}&pn=${payeeName}&cu=INR`
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full text-white text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-2">❤️ Support PcTools</h3>
        <p className="text-xs text-slate-400 mb-4">
          Scan the QR code or use the UPI ID below to help support server costs.
        </p>

        {/* Dynamic QR Code */}
        <div className="bg-white p-3 rounded-xl inline-block mb-4 shadow-md">
          <img src={qrCodeUrl} alt="UPI QR Code" className="w-40 h-40 mx-auto" />
        </div>

        {/* UPI ID Copy Field */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between mb-3 text-left">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-mono">UPI ID</span>
            <span className="text-xs font-mono font-bold text-slate-200">{upiId}</span>
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg transition-colors cursor-pointer text-blue-400 font-semibold"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Mobile Pay Button */}
        <a
          href={`upi://pay?pa=${upiId}&pn=${payeeName}&cu=INR`}
          className="block w-full py-2.5 bg-green-600 hover:bg-green-500 rounded-xl font-semibold text-xs transition-all text-white"
        >
          📲 Open UPI App Directly
        </a>
      </div>
    </div>
  );
}