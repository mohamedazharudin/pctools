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
      status = 'Normal Weight';
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
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4 text-center">⚖️ Weight Analyzer</h2>

      {/* Gender Selection */}
      <div className="flex gap-2 mb-4">
        {['male', 'female'].map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
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
            <span className="text-sm text-slate-400">Ideal Weight Range:</span>
            <span className="text-sm font-bold text-blue-400">{result.idealWeight} kg</span>
          </div>
        </div>
      )}
    </div>
  );
}