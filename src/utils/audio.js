// Kerala Audio Synthesizer & Speech Engine using Web Audio API + SpeechSynthesis
// + Voice-clip player (playVoice) for recorded Malayalam comedic audios,
//   with chained playback (onEnded), verdict scoring and sting rotation.
import { VOICE_LINES, VOICE_TEXT } from '../data/voiceLines';

let audioCtx = null;
let soundEnabled = true;
// Bumped on every stopVoice() so stale TTS callbacks can tell they were
// superseded (Chrome fires `onend` even for cancelled utterances).
let speechToken = 0;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  if (!enabled) {
    stopVoice();
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

// ---------- Voice clip system (recorded Malayalam audios) ----------

const voiceCache = {};
let currentVoiceAudio = null;

function baseUrl() {
  try {
    return import.meta.env.BASE_URL || '/';
  } catch (e) {
    return '/';
  }
}

export function stopVoice() {
  // Invalidate any in-flight TTS callback first: Chrome fires `onend` on
  // cancelled speech, which would otherwise leak chained audio (like a
  // verdict sting) onto the next screen after a fast click-through.
  speechToken += 1;
  try {
    if (currentVoiceAudio) {
      currentVoiceAudio.onended = null;
      currentVoiceAudio.onerror = null;
      currentVoiceAudio.pause();
      try {
        currentVoiceAudio.currentTime = 0;
      } catch (e) {
        /* ignore */
      }
      currentVoiceAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch (e) {
    console.warn('stopVoice error:', e);
  }
}

function fallbackSpeak(key, overrideText, onEnded) {
  const text = overrideText || VOICE_TEXT[key];
  if (text) {
    speakMalayalam(text, onEnded);
  } else if (typeof onEnded === 'function') {
    // No file and no fallback text: skip silently but keep the chain alive.
    try {
      onEnded();
    } catch (e) {
      /* ignore */
    }
  }
}

// Play a recorded voice clip by slot key, then call onEnded.
// Falls back to Malayalam TTS (overrideText > VOICE_TEXT) when the mp3 is
// missing or empty. Slots with no fallback text stay silent (by design).
export function playVoice(key, overrideText, onEnded) {
  if (!soundEnabled) return;
  stopVoice();

  let settled = false;
  const done = () => {
    if (settled) return;
    settled = true;
    if (typeof onEnded === 'function') {
      try {
        onEnded();
      } catch (e) {
        console.warn('onEnded error:', e);
      }
    }
  };

  const file = VOICE_LINES[key];
  if (!file) {
    fallbackSpeak(key, overrideText, done);
    return;
  }
  try {
    const src = `${baseUrl()}voice/${file}`;
    let audio = voiceCache[key];
    if (!audio) {
      audio = new Audio(src);
      voiceCache[key] = audio;
    } else {
      try {
        audio.currentTime = 0;
      } catch (e) {
        /* ignore */
      }
    }
    audio.onended = () => {
      if (currentVoiceAudio === audio) {
        currentVoiceAudio = null;
      }
      done();
    };
    audio.onerror = () => {
      console.warn(`[voice] failed to load "${src}" (slot: ${key}) — using TTS fallback`);
      if (voiceCache[key] === audio) {
        delete voiceCache[key];
      }
      if (currentVoiceAudio === audio) {
        currentVoiceAudio = null;
      }
      audio.onended = null;
      fallbackSpeak(key, overrideText, done);
    };
    currentVoiceAudio = audio;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        if (currentVoiceAudio === audio) {
          currentVoiceAudio = null;
        }
        audio.onended = null;
        fallbackSpeak(key, overrideText, done);
      });
    }
  } catch (e) {
    console.warn('playVoice error:', e);
    fallbackSpeak(key, overrideText, done);
  }
}

// Day-scoped helpers (index = currentDayIndex)
export function playBriefing(dayIndex, fallbackText, onEnded) {
  playVoice(`day${dayIndex}_brief`, fallbackText, onEnded);
}

export function playReaction(dayIndex, optionId, isTimeout, fallbackText, onEnded) {
  if (isTimeout) {
    playVoice(`day${dayIndex}_timeout`, fallbackText, onEnded);
  } else {
    playVoice(`day${dayIndex}_${optionId}`, fallbackText, onEnded);
  }
}

export function playEndingVoice(endingCode, fallbackText, onEnded) {
  playVoice(`ending_${endingCode}`, fallbackText, onEnded);
}

// ---------- Verdict system (good / bad / chaotic choices) ----------

// Scores a choice outcome: support gained, opposition avoided, treasury kept.
export function getVerdict(changes) {
  const d = changes || {};
  const score = (d.support || 0) - (d.opposition || 0) + (d.treasury || 0) * 0.5;
  if (score >= 15) return 'good';
  if (score <= -5) return 'bad';
  return 'chaotic';
}

// Rotating "wrong answer" stingers for bad choices.
let wrongStingIndex = 0;
const WRONG_STING_KEYS = ['wrong_1', 'wrong_2', 'wrong_3'];

export function playWrongSting() {
  if (!soundEnabled) return;
  const key = WRONG_STING_KEYS[wrongStingIndex % WRONG_STING_KEYS.length];
  wrongStingIndex += 1;
  playVoice(key); // silent if the file is missing
}

// Rotating "correct answer" stingers for good choices.
let correctStingIndex = 0;
const CORRECT_STING_KEYS = ['correct_1', 'correct_2', 'correct_3'];

export function playCorrectSting() {
  if (!soundEnabled) return;
  const key = CORRECT_STING_KEYS[correctStingIndex % CORRECT_STING_KEYS.length];
  correctStingIndex += 1;
  playVoice(key); // silent if the file is missing
}

// 1. Dramatic Conch Sound (ശംഖ് ധ്വനി)
export function playConch() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const duration = 2.8;

    // Dual oscillator for rich natural brass resonance
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    // Conch horn pitch sweep
    osc1.frequency.setValueAtTime(210, now);
    osc1.frequency.exponentialRampToValueAtTime(270, now + 0.5);
    osc1.frequency.exponentialRampToValueAtTime(285, now + 1.8);
    osc1.frequency.exponentialRampToValueAtTime(220, now + duration);

    osc2.frequency.setValueAtTime(212, now);
    osc2.frequency.exponentialRampToValueAtTime(273, now + 0.5);
    osc2.frequency.exponentialRampToValueAtTime(288, now + 1.8);
    osc2.frequency.exponentialRampToValueAtTime(222, now + duration);

    // Warm low-pass filter to sound like an organic conch shell
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.linearRampToValueAtTime(1400, now + 0.6);
    filter.frequency.linearRampToValueAtTime(700, now + duration);

    // Gain envelope (gentle blow in, resonant hold, fade out)
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.4);
    gainNode.gain.setValueAtTime(0.35, now + 1.8);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    console.warn("Audio error:", e);
  }
}

// 2. Kerala Chenda / Temple Drum Beat (ചെണ്ട മുട്ട്)
export function playChenda() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Drum strike oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);

    // Add wooden click snap
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(800, now);
    clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
    clickGain.gain.setValueAtTime(0.3, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.05);
  } catch (e) {
    console.warn("Audio error:", e);
  }
}

// 3. Government Official Stamp Sound (മുദ്ര കുത്തൽ)
export function playStamp() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch (e) {
    console.warn("Audio error:", e);
  }
}

// 4. Morning Raga 5-second Jingle (പ്രഭാത ഗാനം - മോഹനം രാഗം)
export function playMorningJingle() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Pentatonic Mohanam raga frequencies (Sa, Ri, Ga, Pa, Dha, Sa)
    // C, D, E, G, A, C5 -> ~261.63, 293.66, 329.63, 392.00, 440.00, 523.25
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 392.00, 523.25];
    const noteTimes = [0.0, 0.4, 0.8, 1.2, 1.7, 2.2, 2.7];
    const durations = [0.35, 0.35, 0.35, 0.45, 0.45, 0.45, 0.9];

    notes.forEach((freq, i) => {
      const noteStart = now + noteTimes[i];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0.001, noteStart);
      gain.gain.linearRampToValueAtTime(0.2, noteStart + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + durations[i]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + durations[i]);
    });
  } catch (e) {
    console.warn("Audio error:", e);
  }
}

// 5. Tension Clock Tick / Pulse
export function playTick(isUrgent = false) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isUrgent ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(isUrgent ? 880 : 440, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.04);

    gain.gain.setValueAtTime(isUrgent ? 0.25 : 0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.warn("Audio error:", e);
  }
}

// 6. Game Over / Sad Horn (യോഗ്യനല്ല)
export function playFailureHorn() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const freqs = [350, 330, 310, 260];
    const delays = [0, 0.35, 0.7, 1.05];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + delays[idx];

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);
      if (idx === freqs.length - 1) {
        osc.frequency.linearRampToValueAtTime(freq - 40, startTime + 0.8);
      }

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + (idx === 3 ? 1.0 : 0.3));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + (idx === 3 ? 1.1 : 0.32));
    });
  } catch (e) {
    console.warn("Audio error:", e);
  }
}

// 6b. Sad Trombone slide (extra comedic defeat: wah-wah-wah-waaaaah)
export function playSadTrombone() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Classic descending sad trombone: G - F# - F - E(bent down)
    const slides = [
      { from: 392.0, to: 392.0, t: 0.0, d: 0.28 },
      { from: 369.99, to: 369.99, t: 0.32, d: 0.28 },
      { from: 349.23, to: 349.23, t: 0.64, d: 0.28 },
      { from: 329.63, to: 246.94, t: 0.96, d: 0.9 },
    ];

    slides.forEach(({ from, to, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + t;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(from, startTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), startTime + d);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.22, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + d + 0.05);
    });
  } catch (e) {
    console.warn("Audio error:", e);
  }
}

// 7. Victory Fanfare (ജനനായകൻ / കമ്മീഷൻ രാജാവ്)
export function playVictoryFanfare() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const chordNotes = [
      { f: 261.63, t: 0, d: 0.2 },
      { f: 329.63, t: 0.2, d: 0.2 },
      { f: 392.00, t: 0.4, d: 0.2 },
      { f: 523.25, t: 0.6, d: 0.8 }
    ];

    chordNotes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);

      gain.gain.setValueAtTime(0.3, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + d + 0.05);
    });
  } catch (e) {
    console.warn("Audio error:", e);
  }
}

// 8. Malayalam Speech Synthesis for Kuttappan's Voice
export function speakMalayalam(text, onEnded) {
  if (!soundEnabled) return;
  if (!('speechSynthesis' in window)) {
    if (typeof onEnded === 'function') {
      try {
        onEnded();
      } catch (e) {
        /* ignore */
      }
    }
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Check available voices for Malayalam or Indian English
    const voices = window.speechSynthesis.getVoices();
    const mlVoice = voices.find(v => v.lang === 'ml-IN' || v.lang.startsWith('ml')) ||
                    voices.find(v => v.lang === 'en-IN');
    if (mlVoice) {
      utterance.voice = mlVoice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Slightly comedic tone for Kuttappan
    const token = speechToken;
    if (typeof onEnded === 'function') {
      utterance.onend = () => {
        // Ignore phantom `end` events from utterances cancelled by stopVoice()
        if (token !== speechToken) return;
        try {
          onEnded();
        } catch (e) {
          /* ignore */
        }
      };
    }
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn("Speech synthesis error:", e);
  }
}
