import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AgeCalculator() {
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Interactive Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h2 className="text-xl font-bold mb-4 text-center">🎂 {t('title', 'Age Calculator')}</h2>

        <div className="flex flex-col gap-4 mb-6 max-w-md mx-auto">
          <label className="text-sm text-slate-400">{t('selectDobLabel', 'Select Date of Birth:')}</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={calculateAge}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer"
          >
            {t('calcBtn', 'Calculate Age')}
          </button>
        </div>

        {age && (
          <div className="grid grid-cols-3 gap-3 text-center bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto">
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-2xl font-bold text-blue-400">{age.years}</span>
              <p className="text-xs text-slate-400 mt-1">{t('years', 'Years')}</p>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-2xl font-bold text-blue-400">{age.months}</span>
              <p className="text-xs text-slate-400 mt-1">{t('months', 'Months')}</p>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="text-2xl font-bold text-blue-400">{age.days}</span>
              <p className="text-xs text-slate-400 mt-1">{t('days', 'Days')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Article & Instructions Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About the Online Age Calculator')}</h3>
          <p>
            {t('aboutText', 'Determining exact age manually can be tricky due to varying month lengths and leap years. This free online Age Calculator computes your exact age in years, months, and days based on your date of birth and the current system date.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToTitle', 'How to Use This Tool')}</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>{t('step1', 'Click on the date picker input above.')}</li>
            <li>{t('step2', 'Select your year, month, and day of birth from the calendar.')}</li>
            <li>{t('step3Part1', 'Click the ')}<strong className="text-slate-200">{t('step3Btn', 'Calculate Age')}</strong>{t('step3Part2', ' button.')}</li>
            <li>{t('step4', 'View your exact chronological age broken down into years, months, and days instantly.')}</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Does this tool account for leap years?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'Yes, the calculation automatically considers varying days in February during leap years to provide accurate results.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Is my date of birth saved or tracked?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'No, all processing happens locally inside your web browser. No personal data is recorded or sent to remote servers.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}