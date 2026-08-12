import { useState } from 'react';

export default function SpeedTest() {
  const [speed, setSpeed] = useState(null);
  const [testing, setTesting] = useState(false);

  const runSpeedTest = async () => {
    setTesting(true);
    setSpeed(null);

    // Sample 5MB image file from Unsplash for testing
    const testFileUrl = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=4000';
    const startTime = performance.now();

    try {
      const response = await fetch(`${testFileUrl}&cacheBust=${Date.now()}`);
      const blob = await response.blob();
      const endTime = performance.now();

      const durationInSeconds = (endTime - startTime) / 1000;
      const fileSizeInBits = blob.size * 8;
      const speedMbps = (fileSizeInBits / durationInSeconds / 1000000).toFixed(2);

      setSpeed(speedMbps);
    } catch (error) {
      console.error("Speed test failed:", error);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white text-center">
      <h2 className="text-xl font-bold mb-4">⚡ Internet Speed Test</h2>
      
      {speed && (
        <div className="my-6">
          <span className="text-5xl font-extrabold text-blue-500">{speed}</span>
          <span className="text-slate-400 text-lg ml-2">Mbps</span>
        </div>
      )}

      <button
        onClick={runSpeedTest}
        disabled={testing}
        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-xl text-sm font-semibold transition-all"
      >
        {testing ? 'Testing...' : 'Start Speed Test'}
      </button>
    </div>
  );
}