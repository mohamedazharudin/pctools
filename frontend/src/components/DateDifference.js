import { useState } from 'react';

export default function DateDifference() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [diff, setDiff] = useState(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    // Use UTC dates to prevent timezone offsets and Daylight Saving errors
    const [sYear, sMonth, sDay] = startDate.split('-').map(Number);
    const [eYear, eMonth, eDay] = endDate.split('-').map(Number);

    const start = Date.UTC(sYear, sMonth - 1, sDay);
    const end = Date.UTC(eYear, eMonth - 1, eDay);

    const timeDiff = Math.abs(end - start);
    const totalDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));

    setDiff(totalDays);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h1 className="text-xl font-bold mb-4 text-center">📅 Days Between Dates Calculator</h1>

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
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer"
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

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">About Date Difference Calculator</h2>
          <p>
            Easily measure the exact duration in days between any two calendar dates. This utility helps plan event timelines, calculate project deadlines, or track duration milestones accurately.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">How to Use</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>Select your starting calendar date from the <strong className="text-slate-200">Start Date field</strong>.</li>
            <li>Select your target ending date from the <strong className="text-slate-200">End Date field</strong>.</li>
            <li>Click <strong className="text-slate-200">Calculate Difference</strong> to display the total elapsed days.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Does date order matter?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No, the tool automatically calculates absolute days so you receive a positive day count regardless of date entry order.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Does it account for leap years?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Yes, UTC date calculations handle leap years and differing month lengths accurately.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}