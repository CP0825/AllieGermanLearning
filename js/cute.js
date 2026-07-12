// js/cute.js
// ---------------------------------------------------------------------------
// The "cuteness" layer — a gift touch for Allie. A soft floating-hearts
// background, plus little German love notes on the dashboard. All optional and
// controlled from Settings; preferences live in localStorage (no DB columns).
//
//   • initHearts()   — (re)builds the fixed hearts layer to match the prefs.
//   • cutePrefs()    — { hearts, notes, amount } read from localStorage.
//   • randomLoveNote() / heroGreeting() — sweet copy for the dashboard.
// ---------------------------------------------------------------------------

const GLYPHS = ['💕', '💗', '🩷', '💞', '🌸', '✨', '💓', '🌷'];
const AMOUNT = { subtle: 8, sweet: 15, lots: 26 };

export function cutePrefs() {
  return {
    hearts: localStorage.getItem('ag:cuteHearts') !== '0', // default on
    notes: localStorage.getItem('ag:cuteNotes') !== '0',   // default on
    amount: localStorage.getItem('ag:cuteAmount') || 'sweet',
  };
}

export function setCutePref(key, value) {
  const map = { hearts: 'ag:cuteHearts', notes: 'ag:cuteNotes', amount: 'ag:cuteAmount' };
  if (!map[key]) return;
  const v = typeof value === 'boolean' ? (value ? '1' : '0') : String(value);
  try { localStorage.setItem(map[key], v); } catch { /* ignore quota */ }
}

// Build (or clear) the fixed, non-interactive hearts layer behind the app.
export function initHearts() {
  document.getElementById('hearts-layer')?.remove();
  const p = cutePrefs();
  if (!p.hearts) return;
  const n = AMOUNT[p.amount] ?? AMOUNT.sweet;
  const layer = document.createElement('div');
  layer.id = 'hearts-layer';
  layer.className = 'hearts-layer';
  layer.setAttribute('aria-hidden', 'true');
  let html = '';
  for (let i = 0; i < n; i++) {
    const left = (i * 37 + 11) % 100;
    const size = 12 + ((i * 7) % 22);
    const dur = 9 + ((i * 13) % 11);
    const delay = -((i * 17) % 22);
    const opacity = 0.22 + ((i % 5) * 0.08);
    html += `<span class="heart" style="left:${left}%;font-size:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;--o:${opacity}">${GLYPHS[i % GLYPHS.length]}</span>`;
  }
  layer.innerHTML = html;
  document.body.appendChild(layer);
}

// Pinned love notes (German with a soft English echo). One is picked per visit.
export const LOVE_NOTES = [
  { de: 'Ich liebe dich, Schatz 💕', en: "I love you — you've got this today 🌷" },
  { de: 'Du schaffst das, meine Liebste ✨', en: 'You can do this, my love' },
  { de: 'Ein bisschen Deutsch für die klügste Frau 💗', en: 'A little German for the smartest woman I know' },
  { de: 'Ich bin so stolz auf dich 🌸', en: 'I am so proud of you' },
  { de: 'Jede Karte bringt dich näher — ich glaub an dich 💞', en: 'Every card gets you closer — I believe in you' },
  { de: 'Mach eine Pause, wenn du müde bist, mein Schatz ☕', en: 'Take a break if you get tired, sweetheart' },
  { de: 'Immer für dich da, Liebling 💓', en: 'Always here for you, darling' },
];

export function randomLoveNote() {
  return LOVE_NOTES[Math.floor(Math.random() * LOVE_NOTES.length)];
}

// Sweet German hero subtitles (pet names for Allie).
export const HERO_SUBS = [
  'Schön, dass du wieder da bist, mein Schatz! 🌸',
  'Bereit für ein bisschen Deutsch, Liebling? 💕',
  'Kleine Schritte, große Fortschritte, meine Liebe. ✨',
  'Jede Karte zählt — ich bin so stolz auf dich! 💪',
  'Hallo meine Hübsche, Zeit zum Lernen! 🌷',
];

export function heroGreeting() {
  return HERO_SUBS[Math.floor(Math.random() * HERO_SUBS.length)];
}
