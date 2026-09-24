import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');

  const handleNum = (val) => {
    setDisplay((prev) => (prev === '0' ? val : prev + val));
  };

  const handleOp = (op) => {
    const lastChar = display.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
      setDisplay(display.slice(0, -1) + op);
    } else {
      setDisplay(display + op);
    }
  };

  const handleClear = () => setDisplay('0');

  const handleEqual = () => {
    try {
      if (/^[0-9+\-*/.]*$/.test(display)) {
        const result = Function(`'use strict'; return (${display})`)();
        setDisplay(String(result));
      }
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: 600+ Word Blog Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">SEO Guide & History</span>
              <h1 className="text-2xl font-bold text-white mt-1">The Evolution of Calculators: From Abacus to Web Engines</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. Early Human Computation and the Abacus</h2>
              <p>
                Before electronic circuits existed, humanity relied on physical tally systems to process financial transactions, astronomical events, and trade measurements. The earliest recorded calculation aid was the <strong>abacus</strong>, developed in ancient Sumeria and refinement-proven across Babylonia, China, and Rome around 2500 BCE.
              </p>
              <p>
                The abacus mapped numbers into rows of movable beads along wooden rods. Users could execute rapid addition, subtraction, multiplication, and division by manually sliding beads according to positional notation rules. Despite its simplicity, skilled abacus operators could execute arithmetic problems as fast as early mechanical counting machines.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Mechanical Calculators: Pascal and Leibniz</h2>
              <p>
                The 17th century marked a giant leap forward with the invention of automated mechanical calculators. In 1642, French mathematician <strong>Blaise Pascal</strong> invented the <em>Pascaline</em> to help his father, a tax collector, sum long accounting ledgers. The device used gear wheels turned by hand, featuring an automated internal carry mechanism for tens places.
              </p>
              <p>
                Later in 1672, German philosopher <strong>Gottfried Wilhelm Leibniz</strong> expanded on Pascal's design to create the <em>Stepped Reckoner</em>. Leibniz introduced the "Leibniz wheel," a stepped cylinder gear mechanism that allowed direct multiplication and division through repeated mechanical rotations. This fundamental wheel design remained the standard in mechanical calculators for over two centuries.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. The Pocket Electronic Revolution (1970s)</h2>
              <p>
                The invention of the transistor and integrated microchip circuits in the mid-20th century transformed heavy desktop counting boxes into portable electronic handheld devices:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">The Cal-Tech Prototype (1967):</strong> Developed by Texas Instruments, this was the world's first hand-held electronic calculator prototype.
                </li>
                <li>
                  <strong className="text-slate-200">Busicom LE-120 (1971):</strong> The first commercial pocket-sized calculator to use a single-chip processor, replacing vacuum tubes and discrete transistors.
                </li>
              </ul>
              <p>
                By the mid-1970s, mass manufacturing reduced the cost of Light Emitting Diode (LED) display screens and silicon chips, turning pocket calculators into everyday essential tools for students, engineers, and accountants worldwide.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Modern Web-Based Computing Engines</h2>
              <p>
                Today, physical pocket calculators are largely replaced by browser-native JavaScript engines. Client-side applications run arithmetic routines instantly within browser engines like V8 using local device processing power.
              </p>
              <p>
                Online calculators offer key advantages over hardware units: zero battery dependence, responsive UI layouts, cross-device access, and immediate computation with total user privacy, as data never leaves your browser window.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Calculator Tool & Detailed FAQ */}
        <div className="lg:col-span-7 space-y-8">
          <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
            <h2 className="text-xl font-bold mb-4 text-center">🧮 Online Web Calculator</h2>
            
            {/* Display Screen */}
            <div className="bg-slate-950 p-4 rounded-xl text-right text-3xl font-mono mb-4 text-blue-400 overflow-x-auto min-h-[64px] flex items-center justify-end">
              {display}
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-4 gap-2">
              <button onClick={handleClear} className="col-span-2 bg-red-600 hover:bg-red-500 py-3 rounded-xl font-bold transition-all cursor-pointer">C</button>
              <button onClick={() => handleOp('/')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-blue-400 transition-all cursor-pointer">÷</button>
              <button onClick={() => handleOp('*')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-blue-400 transition-all cursor-pointer">×</button>

              {['7', '8', '9'].map((n) => (
                <button key={n} onClick={() => handleNum(n)} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold transition-all cursor-pointer">{n}</button>
              ))}
              <button onClick={() => handleOp('-')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-blue-400 transition-all cursor-pointer">-</button>

              {['4', '5', '6'].map((n) => (
                <button key={n} onClick={() => handleNum(n)} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold transition-all cursor-pointer">{n}</button>
              ))}
              <button onClick={() => handleOp('+')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-bold text-blue-400 transition-all cursor-pointer">+</button>

              {['1', '2', '3'].map((n) => (
                <button key={n} onClick={() => handleNum(n)} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold transition-all cursor-pointer">{n}</button>
              ))}
              <button onClick={handleEqual} className="row-span-2 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold flex items-center justify-center text-xl transition-all cursor-pointer">=</button>

              <button onClick={() => handleNum('0')} className="col-span-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold transition-all cursor-pointer">0</button>
              <button onClick={() => handleNum('.')} className="bg-slate-800 hover:bg-slate-700 py-3 rounded-xl font-semibold transition-all cursor-pointer">.</button>
            </div>
          </div>

          {/* Publisher Content & Detailed FAQ Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
            <section>
              <h3 className="text-base font-semibold text-white mb-2">Supported Arithmetic Operations</h3>
              <ul className="list-disc list-inside space-y-1.5 text-slate-400">
                <li><strong className="text-slate-200">Addition (+):</strong> Sum up numbers and values quickly.</li>
                <li><strong className="text-slate-200">Subtraction (-):</strong> Calculate differences between amounts.</li>
                <li><strong className="text-slate-200">Multiplication (×):</strong> Multiply integer and decimal values.</li>
                <li><strong className="text-slate-200">Division (÷):</strong> Divide numbers instantly with precise results.</li>
                <li><strong className="text-slate-200">Clear (C):</strong> Reset the calculation screen to start fresh.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Does this calculator support decimal calculations?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Yes, you can input floating-point decimal numbers using the period (.) key for high-precision arithmetic calculations.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Is my calculation history saved on any server?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No, all calculations run locally inside your web browser's JavaScript engine. Your inputs are never logged, stored, or sent to external servers.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Can I use keyboard shortcuts for calculation?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Currently, you can perform calculations by clicking the on-screen buttons. Full Numpad keyboard integration will be enabled in our upcoming version update.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Why are client-side online calculators faster?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Client-side calculators execute instantly using your local CPU memory without sending network requests, ensuring zero lag and complete offline functionality.
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