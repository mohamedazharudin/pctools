import { useState } from 'react';

export default function AgeCalculator() {
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
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4 text-center">🎂 Age Calculator</h2>

      <div className="flex flex-col gap-4 mb-6">
        <label className="text-sm text-slate-400">Select Date of Birth:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={calculateAge}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all"
        >
          Calculate Age
        </button>
      </div>

      {age && (
        <div className="grid grid-cols-3 gap-3 text-center bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="p-2 bg-slate-900 rounded-lg">
            <span className="text-2xl font-bold text-blue-400">{age.years}</span>
            <p className="text-xs text-slate-400 mt-1">Years</p>
          </div>
          <div className="p-2 bg-slate-900 rounded-lg">
            <span className="text-2xl font-bold text-blue-400">{age.months}</span>
            <p className="text-xs text-slate-400 mt-1">Months</p>
          </div>
          <div className="p-2 bg-slate-900 rounded-lg">
            <span className="text-2xl font-bold text-blue-400">{age.days}</span>
            <p className="text-xs text-slate-400 mt-1">Days</p>
          </div>
        </div>
      )}
    </div>
  );
}