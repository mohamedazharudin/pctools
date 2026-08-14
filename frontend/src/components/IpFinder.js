import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function IpFinder() {
  const { t } = useTranslation();
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
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h2 className="text-xl font-bold mb-4 text-center">🌐 {t('title', 'My IP Details')}</h2>

        {loading ? (
          <div className="p-6 text-center text-slate-400 animate-pulse">
            {t('loading', 'Fetching IP info...')}
          </div>
        ) : ipData ? (
          <div className="space-y-3 text-sm text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">{t('ipAddressLabel', 'IP Address:')}</span>
              <span className="font-mono text-blue-400 font-semibold">{ipData.ip}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">{t('locationLabel', 'Location:')}</span>
              <span className="text-white">
                {ipData.city}, {ipData.region}, {ipData.country_name}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">{t('ispLabel', 'ISP / Network:')}</span>
              <span className="text-white">{ipData.org}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">{t('timezoneLabel', 'Timezone:')}</span>
              <span className="text-white">{ipData.timezone}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-400 text-sm">{t('errorMessage', 'Failed to load IP details.')}</p>
        )}
      </div>

      {/* Publisher Content for AdSense Approval */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About What Is My IP Address Tool')}</h3>
          <p>
            {t('aboutText', 'An IP (Internet Protocol) address acts as a unique digital identifier assigned to your device whenever you connect to the internet. This online tool displays your public IP address along with estimated geographical location and internet service provider details.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('whyCheckTitle', 'Why Check Your IP Address?')}</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li>
              <strong className="text-slate-200">{t('reason1Label', 'Network Troubleshooting:')}</strong>{' '}
              {t('reason1Desc', 'Verify if your internet connection or router setup is working properly.')}
            </li>
            <li>
              <strong className="text-slate-200">{t('reason2Label', 'VPN Verification:')}</strong>{' '}
              {t('reason2Desc', 'Confirm if your Virtual Private Network is masking your real location.')}
            </li>
            <li>
              <strong className="text-slate-200">{t('reason3Label', 'Security Awareness:')}</strong>{' '}
              {t('reason3Desc', 'Monitor network location details provided to public web servers.')}
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Is my private home address revealed by this IP tool?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'No, public IP geolocation only shows general region or city-level location supplied by your ISP.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Why does my IP address change periodically?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'Most home connections use dynamic IP addresses that update automatically when restarting your router.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}