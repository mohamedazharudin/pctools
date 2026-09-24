import { useState } from 'react';

export default function SpeedTest() {
  const [speed, setSpeed] = useState(null);
  const [testing, setTesting] = useState(false);

  const runSpeedTest = async () => {
    setTesting(true);
    setSpeed(null);

    // Sample image file for download testing
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: 600+ Word Blog Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Network & Bandwidth Guide</span>
              <h1 className="text-2xl font-bold text-white mt-1">Understanding Internet Speeds, Bandwidth, and Latency</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. Megabits vs. Megabytes: Demystifying Mbps</h2>
              <p>
                One of the most frequent points of confusion for internet users is the distinction between <strong>Mbps (Megabits per second)</strong> and <strong>MBps (Megabytes per second)</strong>. Internet Service Providers (ISPs) advertise connection speeds in bits, whereas computer file sizes and browser downloads are measured in bytes.
              </p>
              <p>
                Since eight bits make up one byte (1 Byte = 8 bits), a 100 Mbps broadband connection delivers a maximum real-world file download transfer rate of approximately 12.5 MB per second.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Key Network Performance Metrics</h2>
              <p>
                Evaluating internet quality involves checking several key network characteristics:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">Download Speed:</strong> The rate at which incoming data, such as web pages, video streams, and software updates, travels from remote servers to your device.
                </li>
                <li>
                  <strong className="text-slate-200">Upload Speed:</strong> The rate at which outgoing data, including video calls, file uploads, and cloud backups, transfers from your device to external destinations.
                </li>
                <li>
                  <strong className="text-slate-200">Latency (Ping):</strong> The time in milliseconds (ms) it takes for a data packet to travel to a server and return. Low ping is essential for real-time applications like online gaming and VoIP calls.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Factors Influencing Wi-Fi Performance</h2>
              <p>
                Even if your ISP provides a high-speed fiber connection, local environmental variables can limit your effective bandwidth:
              </p>
              <p>
                <strong>Router Distance & Frequency Bands:</strong> 2.4 GHz Wi-Fi offers longer range through walls but lower speeds, whereas 5 GHz and 6 GHz bands deliver vastly superior bandwidth over shorter ranges.
              </p>
              <p>
                <strong>Network Congestion:</strong> Multiple household devices streaming 4K video or downloading large patches simultaneously divide the available channel bandwidth.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Client-Side Download Speed Testing</h2>
              <p>
                Client-side speed tests measure bandwidth by requesting a known data payload from a Content Delivery Network (CDN) and dividing the total bits received by the elapsed download duration. This gives an accurate, real-time snapshot of your active connection.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Tool, Optimization Steps & FAQ */}
        <div className="lg:col-span-7 space-y-8">
          {/* Speed Test Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
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
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              {testing ? 'Testing Speed...' : 'Start Speed Test'}
            </button>
          </div>

          {/* Publisher Content & Detailed FAQ Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
            <section>
              <h3 className="text-base font-semibold text-white mb-2">How to Get Accurate Results</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li>Close active downloads, streaming apps, or online video calls before starting.</li>
                <li>Connect directly using a LAN cable or sit closer to your Wi-Fi router.</li>
                <li>Run the test a few times to get an accurate average connection speed.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">What does Mbps stand for?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Mbps stands for Megabits per second, which is the standard unit used to measure network download and upload bandwidth.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Is this test completely free to use?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Yes, this online speed test runs entirely inside your web browser without requiring any software installation or sign-ups.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Why does my speed test result differ from my ISP package?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    ISP speeds represent theoretical maximums. Real-world speeds vary due to Wi-Fi interference, hardware limitations, router distance, and network congestion.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">What internet speed do I need for 4K streaming?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Most major streaming services recommend a stable download speed of at least 25 Mbps per concurrent 4K Ultra HD stream.
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