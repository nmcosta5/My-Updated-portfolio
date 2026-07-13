// Next-Gen Web Audio API Sound Synthesizer
// Generates immersive cybernetic and gaming sound effects natively in the browser without loading files

class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private muted: boolean = true;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (m) {
      this.stopAmbient();
    } else {
      this.init();
      this.startAmbient();
    }
  }

  // Play a quick high-tech hover/click tick
  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.05);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // Play a heavy tactical selection sweep
  playSelect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.15);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    // Apply simple bandpass filter for cinematic texture
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(3.0, t);
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.exponentialRampToValueAtTime(1200, t + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Play a beautiful success melody
  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      gain.gain.setValueAtTime(0.0, t + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.06, t + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.35);
    });
  }

  // Play an action cancellation blip
  playBack() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  // Start continuous engine ambient hum for true gaming atmosphere
  private startAmbient() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      this.stopAmbient();

      const t = this.ctx.currentTime;
      this.ambientOsc = this.ctx.createOscillator();
      this.ambientGain = this.ctx.createGain();

      // Deep cybernetic warm low hum
      this.ambientOsc.type = "sine";
      this.ambientOsc.frequency.setValueAtTime(55, t); // Low A

      // Slight LFO pitch modulation for cyber pulse texture
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.25, t); // Very slow pulse
      lfoGain.gain.setValueAtTime(1.5, t); // Subtle depth

      lfo.connect(lfoGain);
      lfoGain.connect(this.ambientOsc.frequency);

      this.ambientGain.gain.setValueAtTime(0.0, t);
      this.ambientGain.gain.linearRampToValueAtTime(0.04, t + 1.5); // Fade in

      this.ambientOsc.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      lfo.start(t);
      this.ambientOsc.start(t);
    } catch (e) {
      console.warn("Failed to start ambient hum:", e);
    }
  }

  private stopAmbient() {
    if (this.ambientOsc) {
      try {
        this.ambientOsc.stop();
      } catch (e) {}
      this.ambientOsc = null;
    }
    if (this.ambientGain) {
      this.ambientGain = null;
    }
  }
}

export const sfx = new AudioEngine();
export default sfx;
