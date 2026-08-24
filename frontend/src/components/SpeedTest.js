import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SpeedTest() {
   const { t } = useTranslation('speedTest');
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
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Speed Test Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
        <h2 className="text-xl font-bold mb-4">⚡ {t('title', 'Internet Speed Test')}</h2>
        
        {speed && (
          <div className="my-6">
            <span className="text-5xl font-extrabold text-blue-500">{speed}</span>
            <span className="text-slate-400 text-lg ml-2">{t('unit', 'Mbps')}</span>
          </div>
        )}

        <button
          onClick={runSpeedTest}
          disabled={testing}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-xl text-sm font-semibold transition-all cursor-pointer"
        >
          {testing ? t('testingBtn', 'Testing Speed...') : t('startBtn', 'Start Speed Test')}
        </button>
      </div>

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About Online Speed Test')}</h3>
          <p>
            {t('aboutText', 'This tool measures your real-time download bandwidth by fetching a sample data file from a fast content delivery network. Checking your internet speed helps you confirm if you are getting the bandwidth promised by your internet service provider.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToTitle', 'How to Get Accurate Results')}</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li>{t('tip1', 'Close active downloads, streaming apps, or online video calls before starting.')}</li>
            <li>{t('tip2', 'Connect directly using a LAN cable or sit closer to your Wi-Fi router.')}</li>
            <li>{t('tip3', 'Run the test a few times to get an accurate average connection speed.')}</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'What does Mbps stand for?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'Mbps stands for Megabits per second, which is the standard unit used to measure network download speed.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Is this test completely free to use?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'Yes, this online speed test runs entirely inside your web browser without requiring any software installation.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}