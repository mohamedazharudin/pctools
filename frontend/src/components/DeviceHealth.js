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
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h1 className="text-xl font-bold mb-4 text-center">💻 System Health Checker</h1>

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

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">About System Health Checker</h2>
          <p>
            This tool inspects your device hardware status directly through browser APIs. It evaluates critical performance indicators such as available processor cores, system memory, battery levels, network speeds, and local storage limits.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Metrics Examined</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li><strong className="text-slate-200">CPU Cores:</strong> Number of logical processing threads available for parallel tasks.</li>
            <li><strong className="text-slate-200">Device RAM:</strong> Approximate system memory allocated to the web browser interface.</li>
            <li><strong className="text-slate-200">Battery Status:</strong> Real-time charge level and external power connection status.</li>
            <li><strong className="text-slate-200">Network Connection:</strong> Estimated network type (e.g. 4G/5G) and downlink throughput speed.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Why are some fields listed as N/A?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Certain browser privacy settings or operating systems restrict access to hardware APIs like battery level or RAM details.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Does this check install any software on my computer?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No installations are needed; all measurements run via standard JavaScript Web APIs directly in your current browser tab.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}