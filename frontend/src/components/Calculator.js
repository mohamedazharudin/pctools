import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Calculator() {
  const { t } = useTranslation();
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
      // Evaluate safety check: allow only digits and basic arithmetic operators
      if (/^[0-9+\-*/.]*$/.test(display)) {
        const result = Function(`'use strict'; return (${display})`)();
        setDisplay(String(result));
      }
    } catch {
      setDisplay(t('error', 'Error'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Calculator Tool */}
      <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h2 className="text-xl font-bold mb-4 text-center">🧮 {t('title', 'Calculator')}</h2>
        
        {/* Display Screen */}
        <div className="bg-slate-950 p-4 rounded-xl text-right text-3xl font-mono mb-4 text-blue-400 overflow-x-auto">
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

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About the Online Web Calculator')}</h3>
          <p>
            {t('aboutText', 'Whether you need to perform quick daily calculations, manage budgets, or solve arithmetic equations, this browser-based calculator provides a clean, responsive layout for fast mathematical evaluations.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('opsTitle', 'Supported Arithmetic Operations')}</h3>
          <ul className="list-disc list-inside space-y-1.5 text-slate-400">
            <li><strong className="text-slate-200">{t('addLabel', 'Addition (+):')}</strong> {t('addDesc', 'Sum up numbers and values quickly.')}</li>
            <li><strong className="text-slate-200">{t('subLabel', 'Subtraction (-):')}</strong> {t('subDesc', 'Calculate differences between amounts.')}</li>
            <li><strong className="text-slate-200">{t('mulLabel', 'Multiplication (×):')}</strong> {t('mulDesc', 'Multiply integer and decimal values.')}</li>
            <li><strong className="text-slate-200">{t('divLabel', 'Division (÷):')}</strong> {t('divDesc', 'Divide numbers instantly with precise results.')}</li>
            <li><strong className="text-slate-200">{t('clearLabel', 'Clear (C):')}</strong> {t('clearDesc', 'Reset the calculation screen to start fresh.')}</li>
          </ul>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Does this calculator support decimal calculations?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'Yes, you can input floating-point decimal numbers using the period (.) key for high-precision math.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Is my calculation history saved online?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'No, calculations run locally in your web browser, ensuring complete privacy and speed.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}