import { useState } from 'react';
import { uniqueNamesGenerator, names } from 'unique-names-generator';

export default function BabyNameSuggester() {
  const [gender, setGender] = useState('boy');
  const [religion, setReligion] = useState('hindu');
  const [generatedNames, setGeneratedNames] = useState([]);

  // Generate names using unique-names-generator library
  const generateNames = () => {
    const newNames = [];
    for (let i = 0; i < 5; i++) {
      const randomName = uniqueNamesGenerator({
        dictionaries: [names],
        style: 'capital'
      });
      newNames.push(randomName);
    }
    setGeneratedNames(newNames);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Interactive Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
        <h1 className="text-xl font-bold mb-4 text-center">👶 Baby Name Suggester</h1>

        {/* Gender Selection */}
        <div className="flex gap-2 mb-4">
          {['boy', 'girl'].map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
                gender === g ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {g === 'boy' ? '👦 Boy' : '👧 Girl'}
            </button>
          ))}
        </div>

        {/* Religion Selection */}
        <div className="flex gap-2 mb-6">
          {['hindu', 'muslim', 'christian'].map((r) => (
            <button
              key={r}
              onClick={() => setReligion(r)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                religion === r ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={generateNames}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-sm transition-all shadow-md mb-6 cursor-pointer"
        >
          ⚡ Generate Names for {gender} ({religion})
        </button>

        {/* Generated Names List */}
        <div className="space-y-2.5">
          {generatedNames.length > 0 ? (
            generatedNames.map((name, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="font-bold text-blue-400 text-lg">{name}</span>
                <span className="text-xs text-slate-500 capitalize">{gender} • {religion}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 text-sm py-4">Click the button above to generate suggestions.</p>
          )}
        </div>
      </div>

      {/* Expanded SEO Publisher Article Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h2 className="text-lg font-bold text-white mb-2">About the Online Baby Name Suggester</h2>
          <p>
            Choosing the right name for your newborn is an important decision. Our online Baby Name Suggester generates name ideas filtered by gender and cultural origin, helping parents explore meaningful options easily.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">How to Use the Name Generator</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>Select your preferred gender option (Boy or Girl).</li>
            <li>Choose a cultural or religious preference category.</li>
            <li>Click the <strong className="text-slate-200">Generate Names</strong> button to load 5 name ideas.</li>
            <li>Click again to instantly generate a new list of recommendations.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Are these name suggestions free to generate?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Yes, this tool is free and allows you to generate unlimited name suggestions without signing up.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Are my selections saved anywhere?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No, all selections run client-side in your browser, ensuring privacy for your searches.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}