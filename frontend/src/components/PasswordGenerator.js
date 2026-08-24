import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function PasswordGenerator() {
  const { t } = useTranslation('passwordGenerator');

  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) {
      setPassword('');
      return;
    }

    let generated = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }

    setPassword(generated);
    setCopied(false);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (!password) return { label: t('weak', 'Weak'), color: 'bg-red-500', width: 'w-1/4' };
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUpper && includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { label: t('weak', 'Weak'), color: 'bg-red-500', width: 'w-1/4' };
    if (score <= 4) return { label: t('medium', 'Medium'), color: 'bg-yellow-500', width: 'w-2/4' };
    if (score === 5) return { label: t('strong', 'Strong'), color: 'bg-emerald-500', width: 'w-3/4' };
    return { label: t('veryStrong', 'Very Strong'), color: 'bg-blue-500', width: 'w-full' };
  };

  const strength = getStrength();

  return (
    <div className="max-w-4xl mx-auto text-left space-y-6 sm:space-y-8 overflow-hidden px-1 sm:px-0">
      {/* Main Tool Card */}
      <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-800 text-white">
        <h2 className="text-white text-lg sm:text-xl font-bold mt-0 flex items-center gap-2">
          <span>🔑</span> {t('passGenTitle', 'Password Generator')}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mb-4">
          {t('passGenSubtitle', 'Generate secure, random passwords directly in your browser.')}
        </p>

        {/* Display Box */}
        <div className="relative mb-6">
          <input
            type="text"
            readOnly
            value={password}
            placeholder={t('passGenPlaceholder', 'Click Generate below')}
            className="w-full p-3.5 pr-24 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm sm:text-base focus:outline-none tracking-wider"
          />
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
          >
            {copied ? t('copied', 'Copied!') : t('copy', 'Copy')}
          </button>
        </div>

        {/* Strength Indicator */}
        {password && (
          <div className="mb-6 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>{t('strength', 'Strength')}:</span>
              <span>{strength.label}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="space-y-4 text-sm text-slate-200">
          <div>
            <div className="flex justify-between mb-1.5 text-xs sm:text-sm font-medium">
              <label>{t('length', 'Password Length')}:</label>
              <span className="font-mono text-blue-400 font-bold">{length}</span>
            </div>
            <input
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-blue-600 bg-slate-800 rounded-lg cursor-pointer h-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="accent-blue-600 rounded"
              />
              <span className="text-xs sm:text-sm">{t('uppercase', 'Uppercase (A-Z)')}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="accent-blue-600 rounded"
              />
              <span className="text-xs sm:text-sm">{t('lowercase', 'Lowercase (a-z)')}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="accent-blue-600 rounded"
              />
              <span className="text-xs sm:text-sm">{t('numbers', 'Numbers (0-9)')}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="accent-blue-600 rounded"
              />
              <span className="text-xs sm:text-sm">{t('symbols', 'Symbols (!@#$)')}</span>
            </label>
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="w-full mt-6 p-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm sm:text-base"
        >
          ⚡ {t('generateBtn', 'Generate Password')}
        </button>
      </div>

      {/* Description and FAQ Sections */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About Strong Password Generator')}</h3>
          <p>
            {t('aboutText', 'Create cryptographically secure, random passwords instantly to protect your online accounts against unauthorized access and brute-force attacks.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToTitle', 'How to Use')}</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>{t('step1', 'Adjust the length slider to set your desired password length.')}</li>
            <li>{t('step2', 'Check or uncheck character options like symbols, numbers, and capital letters.')}</li>
            <li>{t('step3', 'Click Generate Password and copy your output directly.')}</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Are generated passwords saved anywhere?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'No. Passwords are generated completely client-side inside your browser and are never sent to any server.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'What makes a password strong?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'A strong password is at least 16 characters long and combines uppercase letters, lowercase letters, numbers, and symbols.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}