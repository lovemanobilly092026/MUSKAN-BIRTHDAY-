// Synthesized audio engine using Web Audio API
class AudioManager {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private currentTrackTimeout: number | null = null;
  private currentNoteIndex = 0;
  private isMuted = false;
  private volume = 0.35;
  private onStateChange: ((isPlaying: boolean) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public registerStateListener(cb: (isPlaying: boolean) => void) {
    this.onStateChange = cb;
  }

  // Sweet chime / celesta bell note
  private playBellNote(frequency: number, duration = 0.6, delay = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Pleasant bell overtone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency * 2.01, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(this.volume * 0.45, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  // Happy Birthday Melody in F Major / C Major (Music Box style)
  // Frequency mapping:
  // C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25
  private birthdayNotes = [
    { freq: 261.63, dur: 0.35, wait: 400 },
    { freq: 261.63, dur: 0.35, wait: 400 },
    { freq: 293.66, dur: 0.6, wait: 700 },
    { freq: 261.63, dur: 0.6, wait: 700 },
    { freq: 349.23, dur: 0.6, wait: 700 },
    { freq: 329.63, dur: 1.0, wait: 1200 },

    { freq: 261.63, dur: 0.35, wait: 400 },
    { freq: 261.63, dur: 0.35, wait: 400 },
    { freq: 293.66, dur: 0.6, wait: 700 },
    { freq: 261.63, dur: 0.6, wait: 700 },
    { freq: 392.00, dur: 0.6, wait: 700 },
    { freq: 349.23, dur: 1.0, wait: 1200 },

    { freq: 261.63, dur: 0.35, wait: 400 },
    { freq: 261.63, dur: 0.35, wait: 400 },
    { freq: 523.25, dur: 0.6, wait: 700 },
    { freq: 440.00, dur: 0.6, wait: 700 },
    { freq: 349.23, dur: 0.6, wait: 700 },
    { freq: 329.63, dur: 0.6, wait: 700 },
    { freq: 293.66, dur: 0.8, wait: 1000 },

    { freq: 466.16, dur: 0.35, wait: 400 },
    { freq: 466.16, dur: 0.35, wait: 400 },
    { freq: 440.00, dur: 0.6, wait: 700 },
    { freq: 349.23, dur: 0.6, wait: 700 },
    { freq: 392.00, dur: 0.6, wait: 700 },
    { freq: 349.23, dur: 1.2, wait: 1600 },
  ];

  public toggleMusic(): boolean {
    if (this.isPlayingMusic) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    this.initContext();
    this.isPlayingMusic = true;
    this.currentNoteIndex = 0;
    this.scheduleNextNote();
    if (this.onStateChange) this.onStateChange(true);
  }

  public pauseMusic() {
    this.isPlayingMusic = false;
    if (this.currentTrackTimeout !== null) {
      window.clearTimeout(this.currentTrackTimeout);
      this.currentTrackTimeout = null;
    }
    if (this.onStateChange) this.onStateChange(false);
  }

  private scheduleNextNote() {
    if (!this.isPlayingMusic) return;

    const note = this.birthdayNotes[this.currentNoteIndex];
    this.playBellNote(note.freq, note.dur);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.birthdayNotes.length;

    this.currentTrackTimeout = window.setTimeout(() => {
      this.scheduleNextNote();
    }, note.wait);
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  // Sound Effect: Sparkle / Twinkle
  public playSparkle() {
    this.initContext();
    const sparkles = [587.33, 783.99, 880.00, 1046.50, 1174.66];
    sparkles.forEach((freq, idx) => {
      this.playBellNote(freq, 0.4, idx * 0.07);
    });
  }

  // Sound Effect: Candle blow whoosh
  public playBlowOut() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(150, now + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.6);
  }

  // Sound Effect: Gift celebration fanfare
  public playFanfare() {
    this.initContext();
    const fanfareNotes = [392.00, 523.25, 659.25, 783.99, 1046.50];
    fanfareNotes.forEach((freq, i) => {
      this.playBellNote(freq, 0.6, i * 0.1);
    });
  }

  // Sound Effect: Balloon Pop
  public playPop() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }
}

export const audioManager = new AudioManager();
