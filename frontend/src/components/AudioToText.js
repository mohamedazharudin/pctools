import { useState, useRef } from 'react';

export default function AudioToText() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);

  // Live Microphone Transcription
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition. Try Google Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript + ' ';
      }
      setText(currentTranscript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Audio File Upload & Transcription
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition. Try Google Chrome.');
      return;
    }

    setIsProcessing(true);
    const audioURL = URL.createObjectURL(file);
    const audio = new Audio(audioURL);
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let resultText = '';
      for (let i = 0; i < event.results.length; i++) {
        resultText += event.results[i][0].transcript + ' ';
      }
      setText(resultText);
    };

    recognition.onend = () => {
      setIsProcessing(false);
    };

    audio.onplay = () => {
      recognition.start();
    };

    audio.onended = () => {
      recognition.stop();
      setIsProcessing(false);
    };

    audio.play();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white">
      <h2 className="text-xl font-bold mb-4 text-center">🎙️ Audio to Text Converter</h2>

      {/* Mic Controls */}
      <div className="flex gap-3 mb-4">
        {!isListening ? (
          <button
            onClick={startListening}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            🎤 Start Dictating
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 animate-pulse"
          >
            🛑 Stop Recording
          </button>
        )}

        <button
          onClick={() => setText('')}
          className="px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold text-slate-300 transition-all cursor-pointer"
        >
          Clear
        </button>
      </div>

      {/* File Upload Section */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-slate-400 mb-2">Or Upload Audio File (MP3, WAV):</label>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
        />
        {isProcessing && <p className="text-xs text-blue-400 mt-2 animate-pulse">Transcribing uploaded file...</p>}
      </div>

      {/* Output Display */}
      <textarea
        rows="8"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Transcribed text will appear here..."
        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
      />
    </div>
  );
}