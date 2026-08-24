import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function VideoToAudio() {
  const { t } = useTranslation('videoToAudio');
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
        alert(t('noAudioTrackAlert', 'No audio track found in this video!'));
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
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
        <h2 className="text-xl font-bold mb-4">🎬 {t('title', 'Video to Audio Converter')}</h2>

        <input
          type="file"
          accept="video/*"
          onChange={convertVideoToAudio}
          className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer mb-4"
        />

        {isConverting && <p className="text-blue-400 text-sm animate-pulse mb-4">{t('convertingText', 'Converting video to audio...')}</p>}

        {audioUrl && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <audio controls src={audioUrl} className="w-full" />
            <a
              href={audioUrl}
              download="extracted-audio.mp3"
              className="block w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
            >
              ⬇️ {t('downloadBtn', 'Download MP3')}
            </a>
          </div>
        )}
      </div>

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About Online Video to Audio Converter')}</h3>
          <p>
            {t('aboutText', 'Extracting audio tracks from video files allows you to turn music clips, recorded talks, or video lectures into audio files. This converter processes video streams directly inside your browser to extract the sound channel instantly.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToTitle', 'How to Convert Video to Audio')}</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>{t('step1Prefix', 'Click')} <strong className="text-slate-200">{t('step1Btn', 'Choose File')}</strong> {t('step1Suffix', 'to select a video clip from your local storage.')}</li>
            <li>{t('step2', 'Wait briefly while the browser captures and extracts the embedded audio stream.')}</li>
            <li>{t('step3', 'Listen to the extracted audio track using the preview player.')}</li>
            <li>{t('step4Prefix', 'Click')} <strong className="text-slate-200">{t('step4Btn', 'Download MP3')}</strong> {t('step4Suffix', 'to save the audio file to your device.')}</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Are my private videos uploaded to a server?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'No, conversion runs entirely within your browser using modern Web Media APIs for high speed and total privacy.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Which video formats are supported?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'Most standard HTML5-supported video formats including MP4, WebM, and MOV are supported.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}