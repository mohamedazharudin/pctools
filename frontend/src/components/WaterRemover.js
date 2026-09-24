import { useState, useRef } from 'react';

export default function WaterRemover() {
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: Detailed Blog Article Container */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Acoustic Physics & Mobile Hardware</span>
              <h1 className="text-2xl font-bold text-white mt-1">How Sound Waves Clear Water From Speaker Grills</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. The Mechanics of Moisture Trapping</h2>
              <p>
                When a smartphone, smartwatch, or portable speaker is exposed to water, liquid droplets become trapped within the microscopic openings of the speaker mesh. Surface tension binds these water molecules to the mesh fibers, forming a seal over the acoustic output port.
              </p>
              <p>
                This physical blockage prevents sound waves from escaping cleanly into open air, resulting in muffled audio playback, distorted frequencies, and reduced volume output.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Acoustic Displacements and Resonance</h2>
              <p>
                Clearing liquid without opening device housing relies on kinetic sound energy. Speakers convert electrical signals into rapid physical movements via an internal diaphragm or cone:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">Optimal Frequencies:</strong> Low-frequency audio signals (typically between 150 Hz and 170 Hz) produce high physical excursion of the speaker diaphragm without causing mechanical strain.
                </li>
                <li>
                  <strong className="text-slate-200">Sawtooth & Square Waves:</strong> Unlike smooth sine waves, sawtooth waveforms feature rapid voltage transitions that exert sudden directional pressure forces against trapped droplets.
                </li>
                <li>
                  <strong className="text-slate-200">Overcoming Surface Tension:</strong> The repeated kinetic pulses vibrate the mesh grill rapidly enough to break the surface tension holding liquid droplets in place.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Native Web Audio Implementation</h2>
              <p>
                Browser-based ejector tools utilize the standard HTML5 Web Audio API. By initializing an <code>AudioContext</code> and routing a tuned <code>OscillatorNode</code> directly to the hardware output, target frequencies can be synthesized in real-time without downloading large external media files.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Safe Practices for Water Removal</h2>
              <p>
                Avoid using high-temperature hair dryers, compressed air cans, or inserting physical cotton swabs into speaker mesh openings, as these methods can melt protective seals or push liquid deeper into internal circuitry. Gravity and low-frequency resonance remain the safest non-invasive solution.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Tool & Guides */}
        <div className="lg:col-span-7 space-y-8">
          {/* Tool Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-white text-center">
            <h2 className="text-xl font-bold mb-2">💧 Speaker Water Ejector</h2>
            <p className="text-xs text-slate-400 mb-6">
              Turn your volume to 100% and face your device speakers downward.
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
                ⚡ Eject Water (Play Tone)
              </button>
            ) : (
              <button
                onClick={stopWaterRemoval}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 rounded-xl font-semibold transition-all cursor-pointer animate-pulse"
              >
                🛑 Stop Sound
              </button>
            )}
          </div>

          {/* Publisher Content Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 text-left">
            <section>
              <h3 className="text-base font-semibold text-white mb-2">How to Clear Water from Speakers</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                <li>Increase your device sound volume to <strong className="text-slate-200">100% max volume</strong>.</li>
                <li>Hold or position your phone/device so the speaker mesh points downward toward the floor.</li>
                <li>Press <strong className="text-slate-200">Eject Water</strong> to activate the low-frequency acoustic vibrations.</li>
                <li>Allow the sound to play for 30–60 seconds until tiny water droplets shake free.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-3">Frequently Asked Questions (FAQ)</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-200">Why does a 165Hz sound frequency work best?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Low-frequency sound waves cause maximum physical displacement of the speaker membrane, generating enough physical force to push water out.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">Will playing this sound damage my speaker?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    No, standard audio tones synthesized through the Web Audio API operate safely within default hardware speaker limitations.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-200">How long should I run the tone?</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Running the audio pulse for 30 to 60 seconds is usually sufficient to clear droplets from standard phone speaker grills.
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