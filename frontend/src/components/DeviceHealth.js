import { useState } from 'react';

export default function DeviceHealth() {
  const [healthData, setHealthData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const runHealthCheck = async () => {
    setIsScanning(true);
    setHealthData(null);

    // 1. CPU Cores & Memory (RAM)
    const cpuCores = navigator.hardwareConcurrency || 'N/A';
    const ram = navigator.deviceMemory ? `~${navigator.deviceMemory} GB` : 'N/A';

    // 2. Battery Status
    let batteryLevel = 'N/A';
    let isCharging = 'N/A';
    if ('getBattery' in navigator) {
      try {
        const battery = await navigator.getBattery();
        batteryLevel = `${Math.round(battery.level * 100)}%`;
        isCharging = battery.charging ? 'Yes ⚡' : 'No 🔋';
      } catch (e) {
        console.error(e);
      }
    }

    // 3. Connection Speed
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const networkType = conn ? conn.effectiveType.toUpperCase() : 'N/A';
    const downlink = conn ? `${conn.downlink} Mbps` : 'N/A';

    // 4. Available Storage
    let storageQuota = 'N/A';
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      const freeGB = ((estimate.quota - estimate.usage) / (1024 * 1024 * 1024)).toFixed(1);
      storageQuota = `~${freeGB} GB Available`;
    }

    // Overall Health Score logic
    let score = 100;
    if (conn && conn.effectiveType.includes('2g')) score -= 20;
    if (navigator.deviceMemory && navigator.deviceMemory < 4) score -= 20;

    setTimeout(() => {
      setHealthData({
        cpuCores,
        ram,
        batteryLevel,
        isCharging,
        networkType,
        downlink,
        storageQuota,
        score,
        platform: navigator.platform,
      });
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4 text-center">💻 System Health Checker</h2>

      <button
        onClick={runHealthCheck}
        disabled={isScanning}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 rounded-xl font-semibold transition-all cursor-pointer mb-6"
      >
        {isScanning ? '⚡ Scanning System...' : '🔍 Check System Health'}
      </button>

      {healthData && (
        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm">
          <div className="text-center pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400 block mb-1">Health Score</span>
            <span className={`text-3xl font-black ${healthData.score >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
              {healthData.score}/100
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-800/60 pb-2">
            <span className="text-slate-400">CPU Cores:</span>
            <span className="font-bold">{healthData.cpuCores}</span>
          </div>

          <div className="flex justify-between border-b border-slate-800/60 pb-2">
            <span className="text-slate-400">Device RAM:</span>
            <span className="font-bold">{healthData.ram}</span>
          </div>

          <div className="flex justify-between border-b border-slate-800/60 pb-2">
            <span className="text-slate-400">Battery Level:</span>
            <span className="font-bold">{healthData.batteryLevel} ({healthData.isCharging})</span>
          </div>

          <div className="flex justify-between border-b border-slate-800/60 pb-2">
            <span className="text-slate-400">Network Speed:</span>
            <span className="font-bold">{healthData.networkType} ({healthData.downlink})</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">Browser Storage:</span>
            <span className="font-bold text-blue-400">{healthData.storageQuota}</span>
          </div>
        </div>
      )}
    </div>
  );
}