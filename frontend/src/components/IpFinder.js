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
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-left">
        <h2 className="text-xl font-bold mb-4 text-center">🌐 My IP Details</h2>

        {loading ? (
          <div className="p-6 text-center text-slate-400 animate-pulse">
            Fetching IP info...
          </div>
        ) : ipData ? (
          <div className="space-y-3 text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">IP Address:</span>
              <span className="font-mono text-blue-400 font-semibold">{ipData.ip}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Location:</span>
              <span className="text-white">
                {ipData.city}, {ipData.region}, {ipData.country_name}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">ISP / Network:</span>
              <span className="text-white">{ipData.org}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Timezone:</span>
              <span className="text-white">{ipData.timezone}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-400 text-sm">Failed to load IP details.</p>
        )}
      </div>

      {/* Publisher Content for AdSense Approval */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">About What Is My IP Address Tool</h3>
          <p>
            An IP (Internet Protocol) address acts as a unique digital identifier assigned to your device whenever you connect to the internet. This online tool displays your public IP address along with estimated geographical location and internet service provider details.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Why Check Your IP Address?</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li>
              <strong className="text-slate-200">Network Troubleshooting:</strong>{' '}
              Verify if your internet connection or router setup is working properly.
            </li>
            <li>
              <strong className="text-slate-200">VPN Verification:</strong>{' '}
              Confirm if your Virtual Private Network is masking your real location.
            </li>
            <li>
              <strong className="text-slate-200">Security Awareness:</strong>{' '}
              Monitor network location details provided to public web servers.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Is my private home address revealed by this IP tool?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No, public IP geolocation only shows general region or city-level location supplied by your ISP.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Why does my IP address change periodically?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Most home connections use dynamic IP addresses that update automatically when restarting your router.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}