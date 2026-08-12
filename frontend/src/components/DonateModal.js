import { useState } from 'react';

export default function DonateModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const upiId = "aljadidazhar@upi"; // Replace with your actual UPI ID
  const payeeName = "PcTools";

  if (!isOpen) return null;

  // Auto-generate UPI QR code
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
          Scan the QR code or use the bank details below to support server costs.
        </p>

        {/* Dynamic QR Code */}
        <div className="bg-white p-3 rounded-xl inline-block mb-4 shadow-md">
          <img src={qrCodeUrl} alt="UPI QR Code" className="w-40 h-40 mx-auto" />
        </div>

        {/* UPI ID Section */}
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 mb-3 flex justify-between items-center text-xs">
          <span className="font-mono text-slate-300">{upiId}</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition-all"
          >
            {copied ? 'Copied!' : 'Copy UPI'}
          </button>
        </div>

        {/* Bank Account Details */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left text-xs space-y-1.5 text-slate-400 mb-4">
          <p className="font-bold text-slate-200 border-b border-slate-800 pb-1">🏦 Bank Transfer Info</p>
          <div className="flex justify-between"><span className="text-slate-500">Name:</span> <span className="text-slate-200 font-medium">PcTools</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Account No:</span> <span className="text-slate-200 font-mono">1234567890</span></div>
          <div className="flex justify-between"><span className="text-slate-500">IFSC Code:</span> <span className="text-slate-200 font-mono">ABCD0123456</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Bank:</span> <span className="text-slate-200 font-medium">State Bank of India</span></div>
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