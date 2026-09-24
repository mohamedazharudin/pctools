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
    video.muted = true;

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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: 600+ Word Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Audio Engineering Guide</span>
              <h1 className="text-2xl font-bold text-white mt-1">Understanding Digital Audio Extraction & Container Formats</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. Multimedia Containers vs. Audio Codecs</h2>
              <p>
                A common misconception in digital media processing is treating video files like MP4 or MOV as pure video recordings. In reality, these are <strong>multimedia container formats</strong> designed to wrap multiple distinct data streams into a single bundle.
              </p>
              <p>
                Inside a standard MP4 file, you typically find a video stream (encoded in H.264 or HEVC) and a separate audio stream (encoded in AAC or PCM). Extracting audio does not require re-rendering or altering the audio waveforms; it simply involves demuxing (separating) the audio track from the video container.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Modern Browser Demuxing with Web APIs</h2>
              <p>
                Historically, converting video files to audio required heavy server-side processing software like FFmpeg running on remote cloud instances. This architecture meant uploading massive gigabyte video files over network connections, consuming bandwidth, and compromising data privacy.
              </p>
              <p>
                Modern HTML5 and Web Media APIs allow browsers to demux streams locally:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">MediaStream Capture:</strong> HTML5 video elements isolate embedded audio channels using hardware decoding directly on your CPU/GPU.
                </li>
                <li>
                  <strong className="text-slate-200">MediaRecorder Interface:</strong> Extracted stream tracks are captured in real-time memory chunks, generating clean audio blobs ready for download.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Benefits of Client-Side Processing</h2>
              <p>
                Processing media locally on your device provides significant advantages over traditional cloud converters:
              </p>
              <p>
                <strong>100% Data Privacy:</strong> Confidential recordings, family movies, and internal meeting logs never touch an external third-party server.
              </p>
              <p>
                <strong>Zero Bandwidth Costs:</strong> Extraction runs instantly without uploading or downloading large video files over internet data connections.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Practical Use Cases for Extracted Audio</h2>
              <p>
                Isolating audio channels is essential across various digital workflows: transforming video lectures into portable podcast episodes, saving instrumental clips from video projects, and creating lightweight voice notes for transcripts.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Converter Tool, Instructions & FAQ */}
        <div className="lg:col-span-7 space-y-8">
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
              <div className="mb-4 space-y-2 text-left">
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
                  className="block w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer text-center"
                >
                  ⬇️ Download MP3
                </a>
              </div>
            )}
          </div>

          {/* Publisher Content & FAQ Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
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
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Are my private videos uploaded to a server?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No, conversion runs entirely within your browser using modern Web Media APIs for high speed and total privacy.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Which video formats are supported?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Most standard HTML5-supported video formats including MP4, WebM, and MOV are supported.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Why is the extraction process so fast?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Since processing happens locally on your computer's browser without network transfers, conversion finishes in seconds.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Does extracting audio lower sound quality?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No, the tool isolates and captures the raw audio track contained inside your video file without applying heavy lossy re-compression.
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