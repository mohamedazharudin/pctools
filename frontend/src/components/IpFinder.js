import { useState, useEffect } from 'react';

export default function IpFinder() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        setIpData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-slate-400">Fetching IP info...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl text-white">
      <h2 className="text-xl font-bold mb-4">🌐 My IP Details</h2>
      <div className="space-y-2 text-sm text-slate-300">
        <p><strong className="text-white">IP Address:</strong> {ipData.ip}</p>
        <p><strong className="text-white">Location:</strong> {ipData.city}, {ipData.region}, {ipData.country_name}</p>
        <p><strong className="text-white">ISP:</strong> {ipData.org}</p>
      </div>
    </div>
  );
}