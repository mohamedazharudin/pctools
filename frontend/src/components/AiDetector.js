import { useState } from 'react';

export default function AiDetector() {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const detectAiContent = () => {
    if (!inputText.trim()) return;

    const text = inputText.trim();
    const words = text.split(/\s+/).filter(Boolean);
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    if (words.length < 10) {
      alert('Please enter at least 10 words for accurate analysis.');
      return;
    }

    // Common AI transition & formal vocabulary patterns
    const aiPatterns = [
      'furthermore', 'moreover', 'in conclusion', 'testament', 'delve',
      'tapestry', 'additionally', 'vital role', 'it is important to note',
      'underscores', 'paramount', 'pivotal', 'seamlessly', 'fostering'
    ];

    let aiPatternCount = 0;
    aiPatterns.forEach((pattern) => {
      const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
      const matches = text.match(regex);
      if (matches) aiPatternCount += matches.length;
    });

    // Burstiness calculation (variance in sentence length)
    const sentenceLengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
    const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / (sentenceLengths.length || 1);
    
    const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avgLength, 2), 0) / (sentenceLengths.length || 1);
    const burstiness = Math.sqrt(variance); // Higher burstiness = more human-like

    // Calculating probability score
    let aiScore = 20; // Base score

    // AI words penalty
    aiScore += (aiPatternCount / words.length) * 300;

    // Low burstiness penalty (AI writes very uniform sentences)
    if (burstiness < 3) aiScore += 35;
    else if (burstiness < 6) aiScore += 15;
    else aiScore -= 15;

    // Clamp score between 0 and 99
    const finalAiScore = Math.min(Math.max(Math.round(aiScore), 5), 98);
    const humanScore = 100 - finalAiScore;

    setAnalysis({
      aiScore: finalAiScore,
      humanScore,
      wordCount: words.length,
      sentenceCount: sentences.length,
      aiWordsFound: aiPatternCount,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4 text-center">🤖 AI Content Detector</h2>

      <textarea
        rows="8"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste article or text here to check if it's written by AI..."
        className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none mb-4"
      />

      <button
        onClick={detectAiContent}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer mb-6"
      >
        🔍 Analyze Text
      </button>

      {analysis && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-sm text-slate-400">AI Score:</span>
            <span className={`text-xl font-extrabold ${analysis.aiScore > 50 ? 'text-red-400' : 'text-green-400'}`}>
              {analysis.aiScore}%
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="text-sm text-slate-400">Human Score:</span>
            <span className="text-xl font-extrabold text-blue-400">{analysis.humanScore}%</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs text-slate-400">
            <div className="p-2 bg-slate-900 rounded-lg">
              <p className="text-white font-bold text-sm">{analysis.wordCount}</p>
              <p>Words</p>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <p className="text-white font-bold text-sm">{analysis.sentenceCount}</p>
              <p>Sentences</p>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <p className="text-white font-bold text-sm">{analysis.aiWordsFound}</p>
              <p>AI Words</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}