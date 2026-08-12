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
    <div className="max-w-lg mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4 text-center">👶 Baby Name Suggester</h2>

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
  );
}