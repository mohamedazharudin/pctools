import { useState, useEffect, useRef } from 'react';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do.",
  "Web development involves building and maintaining websites. It ranges from making simple plain text pages to complex web applications.",
  "Consistency is key when learning a new skill. Practice a little bit every day and you will see massive improvements over time.",
  "React is a popular JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code."
];

export default function TypingTest() {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  
  // Stats
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [charStats, setCharStats] = useState({ correct: 0, incorrect: 0, extra: 0 });

  const inputRef = useRef(null);

  // Initialize a random text
  const startNewTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
    setUserInput('');
    setStartTime(null);
    setTimeLeft(30);
    setIsTestRunning(false);
    setIsTestFinished(false);
    setWpm(0);
    setAccuracy(100);
    setCharStats({ correct: 0, incorrect: 0, extra: 0 });
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    startNewTest();
  }, []);

  // Timer countdown hook
  useEffect(() => {
    let timer;
    if (isTestRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTestRunning) {
      finishTest();
    }
    return () => clearInterval(timer);
  }, [isTestRunning, timeLeft]);

  const handleInputChange = (e) => {
    const val = e.target.value;

    if (!isTestRunning && !isTestFinished) {
      setIsTestRunning(true);
      setStartTime(Date.now());
    }

    setUserInput(val);

    // Calculate live stats
    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < val.length; i++) {
      if (i < currentText.length) {
        if (val[i] === currentText[i]) correct++;
        else incorrect++;
      }
    }

    setCharStats({ correct, incorrect, extra: Math.max(0, val.length - currentText.length) });

    // Calculate Accuracy
    const totalTyped = val.length;
    const calcAccuracy = totalTyped > 0 ? Math.max(0, Math.round((correct / totalTyped) * 100)) : 100;
    setAccuracy(calcAccuracy);

    // Calculate WPM on the fly
    if (startTime) {
      const minutesElapsed = (Date.now() - startTime) / 60000;
      if (minutesElapsed > 0) {
        const wordsTyped = correct / 5; // standard: 5 chars = 1 word
        setWpm(Math.round(wordsTyped / minutesElapsed));
      }
    }

    // Check if user completed the full text
    if (val.length >= currentText.length) {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsTestRunning(false);
    setIsTestFinished(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: Detailed Blog Article (~350 words) */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Keyboard Performance & Ergonomics</span>
              <h1 className="text-2xl font-bold text-white mt-1">Mastering Touch Typing: Speed, Accuracy, and Ergonomics</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. How WPM (Words Per Minute) is Calculated</h2>
              <p>
                In standardized typing evaluations, Words Per Minute (WPM) does not simply count spaced words. Instead, it normalizes speed by defining one "word" as exactly 5 characters—including letters, numbers, spaces, and punctuation. Your Gross WPM counts total characters typed divided by five, whereas Net WPM subtracts uncorrected errors to give an accurate reflection of productive typing speed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Developing Muscle Memory via Home Row Positioning</h2>
              <p>
                True touch typing relies on muscle memory rather than visual sight. By anchoring your index fingers on the home row keys—<strong>F</strong> and <strong>J</strong> (which feature raised tactile bumps on standard keyboards)—your remaining fingers naturally rest across <strong>A-S-D-F</strong> and <strong>J-K-L-;</strong>. Returning to this resting posture after every keystroke drastically lowers fatigue and prevents repetitive strain injury (RSI).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Accuracy First, Speed Second</h2>
              <p>
                Prioritizing keystroke accuracy over raw velocity yields faster long-term gains. Every backspace required to correct a typo breaks rhythm and costs double the effort. Focusing on 95%+ precision allows your subconscious mind to automate key reaches, naturally building continuous, rapid typing speeds over time.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Typing Tester */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold flex items-center gap-2"><span>⌨️</span> Typing Speed Test</h1>
              <div className="flex items-center gap-4 text-sm font-mono">
                <span className="px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 text-blue-400">Time: {timeLeft}s</span>
                <button
                  onClick={startNewTest}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-xs font-semibold cursor-pointer transition-all"
                >
                  Reset 🔄
                </button>
              </div>
            </div>

            {/* Test Stats Bar */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Speed</span>
                <span className="text-2xl font-black text-blue-400 font-mono">{wpm} WPM</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Accuracy</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{accuracy}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Characters</span>
                <span className="text-2xl font-black text-purple-400 font-mono">{charStats.correct}/{charStats.incorrect}</span>
              </div>
            </div>

            {/* Typing Display Box */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-base sm:text-lg font-mono leading-relaxed mb-6 cursor-text tracking-wide select-none min-h-[130px] flex items-center flex-wrap"
            >
              {currentText.split('').map((char, index) => {
                let color = 'text-slate-500';
                if (index < userInput.length) {
                  color = userInput[index] === char ? 'text-emerald-400 bg-emerald-950/30' : 'text-red-400 bg-red-950/30 underline';
                }
                return (
                  <span key={index} className={`${color} transition-colors duration-75`}>
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Active Input Field */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={timeLeft === 0 || isTestFinished}
              placeholder={isTestFinished ? "Test completed! Click reset to try again." : "Start typing here..."}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 shadow-inner"
            />

            {isTestFinished && (
              <div className="mt-6 p-4 bg-blue-950/40 border border-blue-500/30 rounded-xl text-center space-y-2">
                <h3 className="font-bold text-blue-400 text-base">🎉 Test Finished!</h3>
                <p className="text-xs text-slate-300">
                  You typed at a speed of <strong className="text-white">{wpm} WPM</strong> with <strong className="text-emerald-400">{accuracy}% accuracy</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* FAQ Section at the bottom (~250 words) */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
        <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Frequently Asked Questions (FAQ)</h3>

        <div className="space-y-4">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
            <h4 className="font-semibold text-slate-200 mb-1">What is considered a good typing speed for professionals?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The average adult typing speed is around 40 WPM. Professional roles such as software developers, writers, and administrative staff typically target 60 to 80 WPM, while specialized transcriptionists often exceed 90+ WPM with 98% accuracy.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
            <h4 className="font-semibold text-slate-200 mb-1">How long does it take to improve typing speed?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              With 10 to 15 minutes of focused daily practice using correct touch-typing techniques, most individuals notice significant speed increases (10-15 WPM boost) within 2 to 3 weeks.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80">
            <h4 className="font-semibold text-slate-200 mb-1">Why is touch typing better than hunt-and-peck typing?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hunt-and-peck requires continually shifting your vision between the screen and the keyboard, causing neck strain and high error rates. Touch typing keeps your eyes entirely focused on the screen, improving productivity and reading flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}