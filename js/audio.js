// js/audio.js
// ---------------------------------------------------------------------------
// Free text-to-speech via the browser SpeechSynthesis API (no API key).
//   • Speaks German words/sentences with a de-DE voice.
//   • Respects profile.sound_enabled (toggles a `sound-off` root class).
//   • Hides all 🔊 buttons if no German voice exists (`no-tts` root class).
//   • A single delegated click handler drives every [data-speak] button, so
//     sections can drop speaker buttons into any HTML string.
// ---------------------------------------------------------------------------

import { getProfile, onChange } from './db.js';

let germanVoice = null;

function attrEscape(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

// A speaker button you can embed anywhere. `text` is the German to pronounce.
export function speakerButton(text, extraClass = '') {
  return `<button class="speak ${extraClass}" type="button" data-speak="${attrEscape(text)}" aria-label="Play pronunciation" title="Hören">🔊</button>`;
}

function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const voices = speechSynthesis.getVoices() || [];
  germanVoice =
    voices.find((v) => /^de(-|_|$)/i.test(v.lang)) ||
    voices.find((v) => (v.lang || '').toLowerCase().startsWith('de')) ||
    voices.find((v) => /deutsch|german/i.test(v.name)) ||
    null;
  document.documentElement.classList.toggle('no-tts', !germanVoice);
}

export function speak(text) {
  if (!germanVoice || !text) return;
  if (document.documentElement.classList.contains('sound-off')) return;
  try {
    speechSynthesis.cancel(); // stop any overlapping utterance
    const u = new SpeechSynthesisUtterance(String(text));
    u.voice = germanVoice;
    u.lang = germanVoice.lang || 'de-DE';
    u.rate = 0.95;
    u.pitch = 1;
    speechSynthesis.speak(u);
  } catch (e) {
    console.warn('[audio] speak failed:', e.message);
  }
}

// Reflect the profile's sound_enabled flag onto the root element.
function syncSoundFlag() {
  getProfile().then((p) => {
    document.documentElement.classList.toggle('sound-off', p.sound_enabled === false);
  });
}

export function initAudio() {
  if (!('speechSynthesis' in window)) {
    document.documentElement.classList.add('no-tts');
    return;
  }
  pickVoice();
  // Voice list often loads asynchronously.
  speechSynthesis.onvoiceschanged = pickVoice;

  // One delegated handler for every speaker button, now and in the future.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-speak]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation(); // don't trigger e.g. a flashcard flip
    speak(btn.getAttribute('data-speak'));
  });

  syncSoundFlag();
  onChange((e) => {
    if (e.detail && e.detail.key === 'profile') syncSoundFlag();
  });
}
