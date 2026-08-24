import { useTranslation } from 'react-i18next';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
 const { t } = useTranslation('aboutUs');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 text-slate-200 w-full max-w-2xl rounded-2xl shadow-2xl p-6 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🛡️</span> {t('privacyTitle', 'Privacy Policy')}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 space-y-4 text-xs sm:text-sm leading-relaxed pr-2 text-slate-300">
          <p>
            At <strong>PcTools</strong> (pctools.online), accessible from https://pctools.online, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by PcTools and how we use it.
          </p>

          <h3 className="font-semibold text-white text-sm sm:text-base pt-2">1. Client-Side Data Processing</h3>
          <p>
            All tools hosted on PcTools—including image converters, PDF tools, audio processors, and resume builders—execute <strong>100% locally in your web browser</strong>. Your files, text inputs, images, and audio samples are never uploaded, transmitted, or stored on external servers or databases.
          </p>

          <h3 className="font-semibold text-white text-sm sm:text-base pt-2">2. Google AdSense & Third-Party Cookies</h3>
          <p>
            PcTools uses Google AdSense to serve advertisements. Google is a third-party vendor that uses cookies (such as the DART cookie) to serve ads to our site visitors based upon their visit to pctools.online and other sites on the internet.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
            <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">Google Ads Settings</a>.</li>
            <li>Third-party ad servers or ad networks use technology in their respective advertisements and links that appear on PcTools.</li>
          </ul>

          <h3 className="font-semibold text-white text-sm sm:text-base pt-2">3. Log Files</h3>
          <p>
            PcTools follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, and referring pages. These are not linked to any information that is personally identifiable.
          </p>

          <h3 className="font-semibold text-white text-sm sm:text-base pt-2">4. Consent</h3>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
          >
            {t('closeBtn', 'I Understand')}
          </button>
        </div>

      </div>
    </div>
  );
}