import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Humanizer() {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const humanizeText = () => {
    if (!inputText.trim()) return;

    let text = inputText;

    // 1. Shuffle/Exchange adjacent paragraphs occasionally
    let paragraphs = text.split('\n\n').filter((p) => p.trim());
    if (paragraphs.length > 2 && Math.random() > 0.5) {
      const temp = paragraphs[0];
      paragraphs[0] = paragraphs[1];
      paragraphs[1] = temp;
    }
    text = paragraphs.join('\n\n');

    // 2. Introduce word replacements (human casual terms)
    const casualReplacements = {
      'furthermore,': 'also,',
      'moreover,': 'plus,',
      'however,': 'but then,',
      'utilize': 'use',
      'additionally,': 'and another thing,',
      'in conclusion,': 'all in all,',
      'therefore,': 'so basically,',
    };

    Object.keys(casualReplacements).forEach((key) => {
      const regex = new RegExp(key, 'gi');
      text = text.replace(regex, casualReplacements[key]);
    });

    // 3. Process word-by-word for typos, extra commas, and spaces
    let words = text.split(' ');
    let result = words.map((word) => {
      const rand = Math.random();

      // Add extra comma randomly (3% chance)
      if (rand < 0.03 && !word.includes(',')) {
        word += ',';
      }

      // Add extra whitespace after word (4% chance)
      if (rand > 0.03 && rand < 0.07) {
        word += ' ';
      }

      // Swap adjacent letters inside long words (2% chance)
      if (rand > 0.07 && rand < 0.09 && word.length > 5) {
        const arr = word.split('');
        const idx = Math.floor(Math.random() * (arr.length - 2)) + 1;
        const temp = arr[idx];
        arr[idx] = arr[idx + 1];
        arr[idx + 1] = temp;
        word = arr.join('');
      }

      // Duplicate a character randomly like "sooon" (2% chance)
      if (rand > 0.09 && rand < 0.11 && word.length > 3) {
        const idx = Math.floor(word.length / 2);
        word = word.slice(0, idx) + word[idx] + word.slice(idx);
      }

      return word;
    });

    setOutputText(result.join(' '));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h2 className="text-xl font-bold mb-4 text-center">✍️ {t('humanizerTitle', 'AI Text Humanizer')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Input Textarea */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2">{t('inputLabel', 'Paste AI Content:')}</label>
            <textarea
              rows="10"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('inputPlaceholder', 'Paste your AI generated blog post here...')}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Output Textarea */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-2">{t('outputLabel', 'Humanized Output:')}</label>
            <textarea
              rows="10"
              readOnly
              value={outputText}
              placeholder={t('outputPlaceholder', 'Humanized version will appear here...')}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none resize-none"
            />
          </div>
        </div>

        <button
          onClick={humanizeText}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer"
        >
          ⚡ {t('humanizeBtn', 'Humanize Text')}
        </button>
      </div>

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutHumanizerTitle', 'About the AI Text Humanizer')}</h3>
          <p>
            {t('aboutHumanizerText', 'AI-generated content often sounds repetitive, overly formal, or structured. This text humanizer tool adjusts formal academic phrasing into natural, conversational language by replacing stiff transition words and adding natural sentence variation.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToUseTitle', 'How to Use the Humanizer Tool')}</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>{t('step1', 'Paste your AI-generated text or draft into the left input box.')}</li>
            <li>{t('step2', 'Click the Humanize Text button.')}</li>
            <li>{t('step3', 'Review the rephrased conversational output in the right box.')}</li>
            <li>{t('step4', 'Copy the converted text directly for your writing projects.')}</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'How does text humanization work?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'It converts robotic vocabulary like "furthermore" or "utilize" into natural human terms like "also" and "use" while relaxing strict formal structure.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Is my text stored on any server?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'No, all text transformations are performed locally inside your web browser for complete privacy.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}