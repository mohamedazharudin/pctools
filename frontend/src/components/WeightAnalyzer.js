import { useState } from 'react';

export default function WeightAnalyzer() {
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

    let status = '';
    let color = '';

    if (bmi < 18.5) {
      status = 'Underweight';
      color = 'text-yellow-400';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      status = 'Normal weight';
      color = 'text-green-400';
    } else if (bmi >= 25 && bmi <= 29.9) {
      status = 'Overweight';
      color = 'text-orange-400';
    } else {
      status = 'Obese';
      color = 'text-red-400';
    }

    setResult({ bmi, status, color, idealWeight });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: 600+ Word Blog Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Health & Body Composition Guide</span>
              <h1 className="text-2xl font-bold text-white mt-1">Understanding BMI and Ideal Body Weight Metrics</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. What Is Body Mass Index (BMI)?</h2>
              <p>
                Body Mass Index (BMI) is a standardized numerical measurement used by healthcare professionals worldwide to evaluate whether an individual falls within a healthy body weight range relative to their height.
              </p>
              <p>
                Calculated by dividing weight in kilograms by height in meters squared (kg/m²), BMI offers a quick, non-invasive assessment of general health risks associated with undernutrition or excess body fat.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. The Clinical Devine Formula for Ideal Weight</h2>
              <p>
                While BMI provides a broad health indicator, the <strong>Devine Formula</strong> estimates an Ideal Body Weight (IBW) tailored to physiological frame size and biological sex:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">Adult Males:</strong> 50 kg + 2.3 kg per inch over 5 feet tall.
                </li>
                <li>
                  <strong className="text-slate-200">Adult Females:</strong> 45.5 kg + 2.3 kg per inch over 5 feet tall.
                </li>
              </ul>
              <p>
                Originally developed to determine medication dosages, the Devine Formula remains one of the most widely referenced benchmarks in medical practice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Health Implications of BMI Ranges</h2>
              <p>
                Maintaining a balanced body weight supports overall cardiovascular function, metabolic health, and joint integrity:
              </p>
              <p>
                <strong>Underweight (&lt; 18.5):</strong> May indicate nutritional deficiencies, weakened immune function, or reduced bone density.
              </p>
              <p>
                <strong>Normal Weight (18.5 – 24.9):</strong> Associated with optimal metabolic health and lower risk for chronic conditions.
              </p>
              <p>
                <strong>Overweight & Obese (&ge; 25.0):</strong> Higher risk for hypertension, type 2 diabetes, cardiovascular disease, and systemic inflammation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Limitations of General BMI Analysis</h2>
              <p>
                While BMI is a helpful screening tool, it does not directly differentiate between muscle mass, bone density, and visceral fat distribution. Athletic individuals with high muscle mass may be classified as overweight despite having low body fat levels.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Tool & FAQ */}
        <div className="lg:col-span-7 space-y-8">
          {/* Tool Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
            <h2 className="text-xl font-bold mb-4 text-center">⚖️ Weight Analyzer</h2>

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
                  {g === 'male' ? '👨 Male' : '👩 Female'}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-sm text-slate-400 block mb-1">Height (cm):</label>
                <input
                  type="number"
                  placeholder="e.g. 170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-1">Current Weight (kg):</label>
                <input
                  type="number"
                  placeholder="e.g. 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={calculateWeight}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer"
              >
                Analyze Weight
              </button>
            </div>

            {result && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-sm text-slate-400">BMI:</span>
                  <span className="text-lg font-bold">{result.bmi}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-sm text-slate-400">Status:</span>
                  <span className={`text-sm font-bold ${result.color}`}>{result.status}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Ideal Body Weight:</span>
                  <span className="text-sm font-bold text-blue-400">{result.idealWeight} kg</span>
                </div>
              </div>
            )}
          </div>

          {/* Publisher Content & FAQ Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
            <section>
              <h3 className="text-base font-semibold text-white mb-2">Standard BMI Categories</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-yellow-400">Underweight:</strong> BMI less than 18.5</li>
                <li><strong className="text-green-400">Normal Weight:</strong> BMI between 18.5 and 24.9</li>
                <li><strong className="text-orange-400">Overweight:</strong> BMI between 25 and 29.9</li>
                <li><strong className="text-red-400">Obese:</strong> BMI 30 or higher</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">How is Ideal Body Weight calculated?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Ideal weight is estimated using the Devine Formula, which factors in biological sex and height above 5 feet.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Is BMI accurate for athletes or bodybuilders?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    BMI measures overall body density and does not distinguish muscle from fat, so athletes with high muscle mass may show an elevated BMI.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">How often should I monitor my BMI and weight?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Checking your weight once a week or monthly under consistent conditions provides a clear picture of long-term health trends.
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