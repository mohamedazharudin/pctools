import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function WaterRemover() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);

  const startWaterRemoval = () => {
    // Create Audio Context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // Create Oscillator for 165Hz tone (ideal for displacing water)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sawtooth'; // Sawtooth wave generates strong physical vibration
    osc.frequency.setValueAtTime(165, ctx.currentTime);

    // Pulse volume up and down for maximum ejecting effect
    gainNode.gain.setValueAtTime(0.8, ctx.currentTime);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    oscillatorRef.current = osc;
    setIsPlaying(true);
  };

  const stopWaterRemoval = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
    }
    setIsPlaying(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      {/* Tool Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
        <h2 className="text-xl font-bold mb-2">💧 {t('title', 'Speaker Water Ejector')}</h2>
        <p className="text-xs text-slate-400 mb-6">
          {t('subtitle', 'Turn your volume to 100% and face your device speakers downward.')}
        </p>

        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center bg-slate-950 border border-slate-800 rounded-full">
          <span className={`text-6xl ${isPlaying ? 'animate-bounce' : ''}`}>
            {isPlaying ? '🔊' : '💧'}
          </span>
        </div>

        {!isPlaying ? (
          <button
            onClick={startWaterRemoval}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all cursor-pointer shadow-lg shadow-blue-600/20"
          >
            {t('ejectBtn', '⚡ Eject Water (Play Tone)')}
          </button>
        ) : (
          <button
            onClick={stopWaterRemoval}
            className="w-full py-3.5 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition-all cursor-pointer animate-pulse"
          >
            {t('stopBtn', '🛑 Stop Sound')}
          </button>
        )}
      </div>

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About Speaker Water Ejector')}</h3>
          <p>
            {t('aboutText', 'When liquid gets trapped inside phone or laptop speaker grills, it creates muffled sound output. This utility plays a low-frequency sound wave (165Hz sawtooth wave) that vibrates the speaker driver, pushing trapped moisture out through kinetic sound energy.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToTitle', 'How to Clear Water from Speakers')}</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>{t('step1Prefix', 'Increase your device sound volume to ')}<strong className="text-slate-200">{t('step1Bold', '100% max volume')}</strong>.</li>
            <li>{t('step2', 'Hold or position your phone/device so the speaker mesh points downward toward the floor.')}</li>
            <li>{t('step3Prefix', 'Press ')}<strong className="text-slate-200">{t('step3Bold', 'Eject Water')}</strong>{t('step3Suffix', ' to activate the low-frequency acoustic vibrations.')}</li>
            <li>{t('step4', 'Allow the sound to play for 30–60 seconds until tiny water droplets shake free.')}</li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Why does a 165Hz sound frequency work?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'Low-frequency sound waves cause maximum physical displacement of the speaker membrane, generating enough pressure to push water out.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'Will playing this sound damage my speaker?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'No, standard audio tones emitted through the Web Audio API operate safely within default hardware limits.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}