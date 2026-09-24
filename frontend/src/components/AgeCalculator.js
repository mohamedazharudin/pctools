
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
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: 600-Word Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-4 shadow-xl">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Understanding Chronological Age: Beyond Just a Number
          </h1>

          <p className="text-slate-400">
            Age is one of the most fundamental metrics of human life, serving as a primary marker for biological development, legal milestones, and social identity. While we celebrate birthdays annually, determining our exact chronological age down to the precise day requires navigating the intricate mechanics of our calendar system.
          </p>

          <h2 className="text-lg font-semibold text-white pt-2">
            What is Chronological Age?
          </h2>
          <p>
            Chronological age is the exact amount of time that has elapsed from an individual's birth to a given date. Unlike biological age, which measures physiological health and cellular wear, chronological age is purely time-based and strictly linear. It provides a standardized baseline used universally in medicine, legal frameworks, and demographic statistics.
          </p>

          <h2 className="text-lg font-semibold text-white pt-2">
            The Mathematical Complexity of Age Calculation
          </h2>
          <p>
            Calculating age seems simple until you account for calendar irregularities. The Gregorian calendar is not uniform; months alternate between 28, 30, and 31 days, while leap years add an extra day every four years. Because of these fluctuations, a simple subtraction of years often yields inaccuracies when verifying eligibility for official documents or medical records.
          </p>

          <h2 className="text-lg font-semibold text-white pt-2">
            Key Practical Applications
          </h2>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li><strong className="text-slate-200">Legal Eligibility:</strong> Verifying voting rights, retirement age, or driver's licenses.</li>
            <li><strong className="text-slate-200">Healthcare & Medicine:</strong> Administering precise pediatric dosages and age-specific screenings.</li>
            <li><strong className="text-slate-200">Education & Sports:</strong> Categorizing students and athletes into accurate age brackets.</li>
            <li><strong className="text-slate-200">Administrative Forms:</strong> Filling out visa applications, insurance policies, and employment documents.</li>
          </ul>

          <h2 className="text-lg font-semibold text-white pt-2">
            Cultural Differences in Age Tracking
          </h2>
          <p>
            While Western countries count age from zero at birth, some East Asian traditions historically used systems like East Asian age reckoning, where a person is considered one year old at birth and gains a year on New Year's Day. Today, international standardizations rely heavily on exact chronological age, making digital tools essential for global accuracy.
          </p>
        </div>

        {/* Right Side: Interactive Age Calculator Tool & Publishing Content */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Interactive Tool Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
            <h2 className="text-xl font-bold mb-4 text-center">🎂 Online Age Calculator</h2>

            <div className="flex flex-col gap-4 mb-6 max-w-md mx-auto">
              <label className="text-sm text-slate-400">Select Date of Birth:</label>
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
                Calculate Age
              </button>
            </div>

            {age && (
              <div className="grid grid-cols-3 gap-3 text-center bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto">
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

          {/* Expanded SEO Publisher Article Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
            <section>
              <h2 className="text-lg font-bold text-white mb-2">About the Online Age Calculator</h2>
              <p>
                Determining exact chronological age manually can be tricky due to varying month lengths and leap years. This free online Age Calculator computes your exact age in years, months, and days based on your date of birth and the current system date instantly.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-2">How to Use This Tool</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                <li>Click on the date picker input above.</li>
                <li>Select your year, month, and day of birth from the calendar overlay.</li>
                <li>Click the <strong className="text-slate-200">Calculate Age</strong> button.</li>
                <li>View your exact chronological age broken down into years, months, and days instantly.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-2">Why Calculate Exact Age?</h3>
              <p>
                Knowing your precise age in years, months, and days is often necessary for official documentation, school admissions, job applications, insurance forms, and eligibility verifications. Using a digital chronological age tool ensures accuracy without manual counting errors.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-slate-200">Does this tool account for leap years?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Yes, the calculation automatically considers varying days in February during leap years to provide accurate results.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">Is my date of birth saved or tracked?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    No, all processing happens locally inside your web browser. No personal data is recorded or sent to remote servers.
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