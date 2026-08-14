import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function WeightAnalyzer() {
  const { t } = useTranslation();
  const [height, setHeight] = useState(''); // in cm
  const [weight, setWeight] = useState(''); // in kg
  const [gender, setGender] = useState('male');
  const [result, setResult] = useState(null);

  const calculateWeight = () => {
    if (!height || !weight || height <= 0 || weight <= 0) return;

    const hInMeters = height / 100;
    const bmi = (weight / (hInMeters * hInMeters)).toFixed(1);

    // Ideal Body Weight calculation (Devine Formula)
    const heightInInches = height / 2.54;
    const inchesOver5Feet = Math.max(0, heightInInches - 60);
    
    let idealWeight = gender === 'male' 
      ? 50 + (2.3 * inchesOver5Feet)
      : 45.5 + (2.3 * inchesOver5Feet);
    
    idealWeight = idealWeight.toFixed(1);

    let statusKey = '';
    let color = '';

    if (bmi < 18.5) {
      statusKey = 'statusUnderweight';
      color = 'text-yellow-400';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      statusKey = 'statusNormal';
      color = 'text-green-400';
    } else if (bmi >= 25 && bmi <= 29.9) {
      statusKey = 'statusOverweight';
      color = 'text-orange-400';
    } else {
      statusKey = 'statusObese';
      color = 'text-red-400';
    }

    setResult({ bmi, statusKey, color, idealWeight });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h2 className="text-xl font-bold mb-4 text-center">⚖️ {t('title', 'Weight Analyzer')}</h2>

        {/* Gender Selection */}
        <div className="flex gap-2 mb-4">
          {['male', 'female'].map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
                gender === g ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {g === 'male' ? `👨 ${t('male', 'Male')}` : `👩 ${t('female', 'Female')}`}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="text-sm text-slate-400 block mb-1">{t('heightLabel', 'Height (cm):')}</label>
            <input
              type="number"
              placeholder={t('heightPlaceholder', 'e.g. 170')}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 block mb-1">{t('weightLabel', 'Current Weight (kg):')}</label>
            <input
              type="number"
              placeholder={t('weightPlaceholder', 'e.g. 70')}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={calculateWeight}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer"
          >
            {t('calcBtn', 'Analyze Weight')}
          </button>
        </div>

        {result && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-sm text-slate-400">{t('bmiLabel', 'BMI:')}</span>
              <span className="text-lg font-bold">{result.bmi}</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-sm text-slate-400">{t('statusLabel', 'Status:')}</span>
              <span className={`text-sm font-bold ${result.color}`}>{t(result.statusKey)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">{t('idealWeightLabel', 'Ideal Body Weight:')}</span>
              <span className="text-sm font-bold text-blue-400">{result.idealWeight} {t('kgUnit', 'kg')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About Body Weight & BMI Analyzer')}</h3>
          <p>
            {t('aboutText', 'Understanding your Body Mass Index (BMI) and Ideal Body Weight (IBW) helps monitor general physical health. This tool evaluates your physical metrics using standard clinical calculations, including the widely used Devine Formula for ideal weight estimation.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('categoriesTitle', 'Standard BMI Categories')}</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li><strong className="text-yellow-400">{t('catUnderweightLabel', 'Underweight:')}</strong> {t('catUnderweightDesc', 'BMI less than 18.5')}</li>
            <li><strong className="text-green-400">{t('catNormalLabel', 'Normal Weight:')}</strong> {t('catNormalDesc', 'BMI between 18.5 and 24.9')}</li>
            <li><strong className="text-orange-400">{t('catOverweightLabel', 'Overweight:')}</strong> {t('catOverweightDesc', 'BMI between 25 and 29.9')}</li>
            <li><strong className="text-red-400">{t('catObeseLabel', 'Obese:')}</strong> {t('catObeseDesc', 'BMI 30 or higher')}</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'How is Ideal Body Weight calculated?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'Ideal weight is calculated using the Devine Formula, which factors in sex and height above 5 feet.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Is BMI accurate for athletes or muscular builds?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'BMI measures overall density and does not distinguish muscle from fat, so muscular individuals may show a higher status.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}