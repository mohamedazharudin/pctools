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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: 600+ Word Blog Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Networking & Privacy Guide</span>
              <h1 className="text-2xl font-bold text-white mt-1">Understanding Public IP Addresses and Geolocation</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. What Is a Public IP Address?</h2>
              <p>
                An Internet Protocol (IP) address is a unique numerical numerical string assigned to every device connected to a computer network. Your public IP address serves as your digital return address on the open internet, enabling servers, websites, and cloud services to route requested data straight back to your device.
              </p>
              <p>
                Public IP addresses are managed globally by the Internet Assigned Numbers Authority (IANA) and regional internet registries, which distribute blocks of addresses to Internet Service Providers (ISPs).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. IPv4 vs. IPv6 Architecture</h2>
              <p>
                There are currently two coexisting standards for IP addresses across the internet:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">IPv4 (IP Version 4):</strong> Uses a 32-bit integer formatted as four dot-separated numbers (e.g., 192.168.1.1), allowing roughly 4.3 billion unique global addresses.
                </li>
                <li>
                  <strong className="text-slate-200">IPv6 (IP Version 6):</strong> Uses a 128-bit hexadecimal format separated by colons to replace exhausted IPv4 spaces, providing virtually unlimited address combinations for modern connected devices.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. How IP Geolocation Works</h2>
              <p>
                IP geolocation maps your public IP address to approximate geographic coordinates. However, geolocation databases do not broadcast your street address or home location. Instead, they reference ISP registry data to pinpoint your nearest city, state, or regional network node.
              </p>
              <p>
                Websites use this routing information to serve localized content, apply regional language defaults, enforce streaming licensing restrictions, and detect unauthorized account logins from unfamiliar locations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Static vs. Dynamic IP Addresses</h2>
              <p>
                Most residential home networks are assigned <strong>dynamic IP addresses</strong> by ISPs. These addresses change periodically when your router restarts or when lease periods expire.
              </p>
              <p>
                In contrast, businesses and web servers rely on <strong>static IP addresses</strong> that remain permanent, enabling reliable remote hosting, VPN server tunnels, and secure server-to-server communication.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive IP Tool & FAQ */}
        <div className="lg:col-span-7 space-y-8">
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

          {/* Publisher Content & Detailed FAQ Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
            <section>
              <h3 className="text-base font-semibold text-white mb-2">Why Check Your IP Address?</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li>
                  <strong className="text-slate-200">Network Troubleshooting:</strong> Verify if your internet connection or router setup is working properly.
                </li>
                <li>
                  <strong className="text-slate-200">VPN Verification:</strong> Confirm if your Virtual Private Network is masking your real location.
                </li>
                <li>
                  <strong className="text-slate-200">Security Awareness:</strong> Monitor network location details provided to public web servers.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Is my private home address revealed by this IP tool?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No, public IP geolocation only shows general region or city-level location supplied by your ISP.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Why does my IP address change periodically?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Most home connections use dynamic IP addresses that update automatically when restarting your router.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Can someone hack me using my public IP address?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    An IP address alone only provides network location. Standard home routers and operating system firewalls protect your internal devices from direct external intrusion.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">How does a VPN alter my displayed IP details?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    A VPN routes your traffic through an encrypted tunnel to an intermediate server, replacing your ISP-assigned IP address with the IP address of the VPN server.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}