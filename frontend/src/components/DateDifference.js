import { useState } from 'react';

export default function DateDifference() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [diff, setDiff] = useState(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    setDiff(totalDays);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4 text-center">📅 Days Between Dates</h2>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="text-sm text-slate-400 block mb-1">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400 block mb-1">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={calculateDifference}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all"
        >
          Calculate Difference
        </button>
      </div>

      {diff !== null && (
        <div className="text-center bg-slate-950 p-4 rounded-xl border border-slate-800">
          <span className="text-3xl font-extrabold text-blue-400">{diff}</span>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Total Days</p>
        </div>
      )}
    </div>
  );
}