import { useState, useCallback } from 'react';

export default function PasswordGenerator() {
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
    if (!password) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUpper && includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
    if (score <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/4' };
    if (score === 5) return { label: 'Strong', color: 'bg-emerald-500', width: 'w-3/4' };
    return { label: 'Very Strong', color: 'bg-blue-500', width: 'w-full' };
  };

  const strength = getStrength();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: 600+ Word Blog Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Cybersecurity & Authentication Guide</span>
              <h1 className="text-2xl font-bold text-white mt-1">Understanding Password Entropy and Account Security</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. The Mechanics of Password Entropy</h2>
              <p>
                Password security is measured using a mathematical concept known as <strong>entropy</strong>, which quantifies the randomness and unpredictability of a secret string. Higher entropy exponentially increases the time and computational power required for an attacker to crack a password.
              </p>
              <p>
                When you increase the length of a password or expand the character set (mixing numbers, uppercase letters, and special symbols), the total number of possible combinations grows exponentially rather than linearly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Common Password Attacks</h2>
              <p>
                Cybercriminals utilize automated software to exploit weak credentials. Understanding these attack vectors highlights the necessity of complex passwords:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">Brute-Force Attacks:</strong> Automated bots systematically guess every possible combination of characters until finding a match.
                </li>
                <li>
                  <strong className="text-slate-200">Dictionary Attacks:</strong> Scripts iterate through lists of common words, phrases, and predictable substitutions (such as "P@ssword1").
                </li>
                <li>
                  <strong className="text-slate-200">Credential Stuffing:</strong> Attackers use leaked passwords from past data breaches to gain access to accounts on unrelated platforms.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Cryptographic Randomness</h2>
              <p>
                Standard pseudo-random number generators in programming languages are predictable if the seed value is known. Modern password generators use browser-native Web Crypto APIs, such as <code>window.crypto.getRandomValues()</code>, to source cryptographically secure entropy directly from underlying operating system events.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Best Practices for Credential Safety</h2>
              <p>
                To maximize your online account security, adopt these fundamental principles:
              </p>
              <p>
                <strong>Never Reuse Passwords:</strong> Ensure every online service uses a unique credential to prevent a single leak from compromising multiple accounts.
              </p>
              <p>
                <strong>Use a Password Manager:</strong> Store complex, auto-generated passwords inside encrypted password managers rather than relying on memory or unencrypted text files.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Tool & FAQ */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Tool Card */}
          <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-800 text-white">
            <h2 className="text-white text-lg sm:text-xl font-bold mt-0 flex items-center gap-2">
              <span>🔑</span> Password Generator
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mb-4">
              Generate secure, random passwords directly in your browser.
            </p>

            {/* Display Box */}
            <div className="relative mb-6">
              <input
                type="text"
                readOnly
                value={password}
                placeholder="Click Generate below"
                className="w-full p-3.5 pr-24 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-sm sm:text-base focus:outline-none tracking-wider"
              />
              <button
                onClick={copyToClipboard}
                disabled={!password}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Strength Indicator */}
            {password && (
              <div className="mb-6 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Strength:</span>
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
                  <label>Password Length:</label>
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
                  <span className="text-xs sm:text-sm">Uppercase (A-Z)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeLower}
                    onChange={(e) => setIncludeLower(e.target.checked)}
                    className="accent-blue-600 rounded"
                  />
                  <span className="text-xs sm:text-sm">Lowercase (a-z)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="accent-blue-600 rounded"
                  />
                  <span className="text-xs sm:text-sm">Numbers (0-9)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="accent-blue-600 rounded"
                  />
                  <span className="text-xs sm:text-sm">Symbols (!@#$)</span>
                </label>
              </div>
            </div>

            <button
              onClick={generatePassword}
              className="w-full mt-6 p-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm sm:text-base"
            >
              ⚡ Generate Password
            </button>
          </div>

          {/* Description and FAQ Sections */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
            <section>
              <h3 className="text-base font-semibold text-white mb-2">How to Use</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                <li>Adjust the length slider to set your desired password length.</li>
                <li>Check or uncheck character options like symbols, numbers, and capital letters.</li>
                <li>Click Generate Password and copy your output directly.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Are generated passwords saved anywhere?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No. Passwords are generated completely client-side inside your browser and are never sent to any external server.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">What makes a password strong?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    A strong password is at least 16 characters long and combines uppercase letters, lowercase letters, numbers, and special symbols.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Is Web Crypto API secure for password generation?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Yes, the browser's native Crypto API provides cryptographically secure pseudo-random values suitable for generating sensitive keys and secrets.
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