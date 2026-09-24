import { useState } from 'react';

export default function VideoToAudio() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const convertVideoToAudio = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsConverting(true);
    setProgress(0);
    setAudioUrl(null);

    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.muted = true; // Mute video during extraction

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
        setProgress(100);
      };

      // Track progress as the video plays silently in the background
      video.ontimeupdate = () => {
        if (video.duration) {
          const currentProgress = Math.round((video.currentTime / video.duration) * 100);
          setProgress(currentProgress);
        }
      };

      mediaRecorder.start();
      video.play();

      video.onended = () => {
        mediaRecorder.stop();
      };
    };
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
        <h2 className="text-xl font-bold mb-4">🎬 Video to Audio Converter</h2>

        <input
          type="file"
          accept="video/*"
          onChange={convertVideoToAudio}
          className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer mb-4"
        />

        {isConverting && (
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-xs text-blue-400 font-semibold px-1">
              <span>Converting video to audio...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {audioUrl && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <audio controls src={audioUrl} className="w-full" />
            <a
              href={audioUrl}
              download="extracted-audio.mp3"
              className="block w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
            >
              ⬇️ Download MP3
            </a>
          </div>
        )}
      </div>

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">About Online Video to Audio Converter</h3>
          <p>
            Extracting audio tracks from video files allows you to turn music clips, recorded talks, or video lectures into audio files. This converter processes video streams directly inside your browser to extract the sound channel instantly.
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">How to Convert Video to Audio</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>Click <strong className="text-slate-200">Choose File</strong> to select a video clip from your local storage.</li>
            <li>Wait briefly while the browser captures and extracts the embedded audio stream.</li>
            <li>Listen to the extracted audio track using the preview player.</li>
            <li>Click <strong className="text-slate-200">Download MP3</strong> to save the audio file to your device.</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">Are my private videos uploaded to a server?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No, conversion runs entirely within your browser using modern Web Media APIs for high speed and total privacy.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">Which video formats are supported?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Most standard HTML5-supported video formats including MP4, WebM, and MOV are supported.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}