import { useState } from 'react';

export default function DateDifference() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const [sYear, sMonth, sDay] = startDate.split('-').map(Number);
    const [eYear, eMonth, eDay] = endDate.split('-').map(Number);

    let start = new Date(Date.UTC(sYear, sMonth - 1, sDay));
    let end = new Date(Date.UTC(eYear, eMonth - 1, eDay));

    // Swap if start date is after end date
    if (start > end) {
      [start, end] = [end, start];
    }

    // Calculate Total Days and Hours
    const timeDiff = Math.abs(end - start);
    const totalDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;

    // Calculate Exact Years, Months, and Days
    let years = end.getUTCFullYear() - start.getUTCFullYear();
    let months = end.getUTCMonth() - start.getUTCMonth();
    let days = end.getUTCDate() - start.getUTCDate();

    if (days < 0) {
      months -= 1;
      // Get the number of days in the previous month
      const prevMonth = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0));
      days += prevMonth.getUTCDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setResult({
      years,
      months,
      days,
      totalDays,
      totalHours
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: Detailed Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Temporal Mathematics & Logic</span>
              <h1 className="text-2xl font-bold text-white mt-1">Understanding Date Difference Calculations and Gregorian Calendar Logic</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. The Complexity of Calendar Calculations</h2>
              <p>
                Calculating elapsed time between two calendar dates involves more than simple arithmetic subtraction. Variations in month lengths, leap year rules, and time zone offsets make manual date tracking prone to precision errors.
              </p>
              <p>
                Using standardized UTC dates isolates calculation logic from local daylight saving shifts, guaranteeing exact day and hour conversions across global regions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Key Variables in Temporal Metrics</h2>
              <p>
                Accurate duration tracking requires breaking time down into discrete operational metrics:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">Calendar Breakdown:</strong> Expresses total duration in human-readable years, months, and days based on varying calendar month lengths.
                </li>
                <li>
                  <strong className="text-slate-200">Absolute Day Count:</strong> Measures continuous 24-hour periods elapsed between two dates, essential for contract milestones and billing cycles.
                </li>
                <li>
                  <strong className="text-slate-200">Cumulative Hours:</strong> Converts day counts directly into total working or operational hours for project management schedules.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Leap Year and UTC Handling</h2>
              <p>
                Leap years insert an intercalary day on February 29 every four years, except for years divisible by 100 unless also divisible by 400. Native JavaScript <code>Date.UTC()</code> operations account for these anomalies dynamically during computation.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Tool & FAQ */}
        <div className="lg:col-span-7 space-y-8">
          {/* Tool Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
            <h1 className="text-xl font-bold mb-4 text-center">📅 Date Difference Calculator</h1>

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

            {/* Breakdown Output Section */}
            {result !== null && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                {/* Years, Months & Days */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col justify-center">
                  <span className="text-xl font-extrabold text-blue-400">
                    {`${result.years}y ${result.months}m ${result.days}d`}
                  </span>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Years, Months & Days</p>
                </div>

                {/* Total Days */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col justify-center">
                  <span className="text-xl font-extrabold text-blue-400">{result.totalDays.toLocaleString()}</span>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Total Days</p>
                </div>

                {/* Total Hours */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col justify-center">
                  <span className="text-xl font-extrabold text-blue-400">{result.totalHours.toLocaleString()}</span>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Total Hours</p>
                </div>
              </div>
            )}
          </div>

          {/* Publisher Content Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
            <section>
              <h2 className="text-lg font-bold text-white mb-2">About Date Difference Calculator</h2>
              <p>
                Easily measure the exact duration between any two calendar dates. This utility breaks down time into exact years, months, and days, as well as overall total days and total hours to help plan project deadlines and track time milestones accurately.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-2">How to Use</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                <li>Select your starting calendar date from the <strong className="text-slate-200">Start Date field</strong>.</li>
                <li>Select your target ending date from the <strong className="text-slate-200">End Date field</strong>.</li>
                <li>Click <strong className="text-slate-200">Calculate Difference</strong> to view the detailed time breakdown.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-slate-200">Does date order matter?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    No, the tool automatically calculates absolute difference so you receive a positive count regardless of date entry order.
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

      </div>
    </div>
  );
}