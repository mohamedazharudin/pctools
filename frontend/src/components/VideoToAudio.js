import { useState } from 'react';

export default function VideoToAudio() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const convertVideoToAudio = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsConverting(true);
    setAudioUrl(null);

    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      const stream = video.captureStream ? video.captureStream() : video.mozCaptureStream();
      const audioTrack = stream.getAudioTracks()[0];

      if (!audioTrack) {
        alert('No audio track found in this video!');
        setIsConverting(false);
        return;
      }

      const audioStream = new MediaStream([audioTrack]);
      const mediaRecorder = new MediaRecorder(audioStream);
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        setAudioUrl(URL.createObjectURL(blob));
        setIsConverting(false);
      };

      mediaRecorder.start();
      video.play();

      video.onended = () => {
        mediaRecorder.stop();
      };
    };
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
      <h2 className="text-xl font-bold mb-4">🎬 Video to Audio Converter</h2>

      <input
        type="file"
        accept="video/*"
        onChange={convertVideoToAudio}
        className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer mb-4"
      />

      {isConverting && <p className="text-blue-400 text-sm animate-pulse mb-4">Converting video to audio...</p>}

      {audioUrl && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <audio controls src={audioUrl} className="w-full" />
          <a
            href={audioUrl}
            download="extracted-audio.mp3"
            className="block w-full py-2 bg-green-600 hover:bg-green-500 rounded-xl font-semibold text-sm transition-all"
          >
            ⬇️ Download MP3
          </a>
        </div>
      )}
    </div>
  );
}