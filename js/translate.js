// js/translate.js  (#translate)
// ---------------------------------------------------------------------------
// English → German sentence translation — the app's main PRODUCTION exercise
// (build the whole sentence, not fill one blank or pick an option). Type-checked
// leniently on capitalisation, punctuation and ä/ö/ü/ß spelling, but the words +
// grammar have to be right. The model answer is always shown afterwards, so it
// teaches even when marked wrong.
//
// The item pool is the small set of hand-authored TRANSLATIONS (with accept[]
// variants + grammar hints) PLUS every A1–A2 sentence reconstructed into a full
// production item (SENTENCE_TRANSLATIONS) — ~350 sentences in all. Items are
// scheduled with spaced repetition (js/srs.js, the same SM-2 the flashcards use):
// a sentence Allie gets wrong resurfaces soon, one she nails slides further out.
// ---------------------------------------------------------------------------

import { TRANSLATIONS } from './data/translations.js';
import { SENTENCE_TRANSLATIONS } from './data/sentenceTranslations.js';
import { runner, escapeHtml, normalize } from './engine.js';
import { makeScheduler } from './srs.js';

// One combined pool with a stable id per item (SRS keys on it). The curated
// items come first (they carry accept[] variants + hints); the generated
// sentence items follow. Deduping against the curated set already happened in
// scripts/gen-translations.mjs.
const POOL = [
  ...TRANSLATIONS.map((t, i) => ({ ...t, id: t.id || 'c-' + i })),
  ...SENTENCE_TRANSLATIONS,
];

// Normalise + fold umlauts so "muede" == "müde", "weiss" == "weiß".
function fold(s) {
  return normalize(s)
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');
}

export function renderTranslate(container) {
  const sched = makeScheduler('translate');

  return runner(container, {
    section: 'translate',
    title: 'Translate',
    emoji: '📝',
    instruction: 'Translate the English sentence into German.',
    xp: 14,
    nextRound() {
      const t = sched.pick(POOL, (x) => x.id);
      const answers = [t.de, ...(t.accept || [])].map(fold);
      return {
        type: 'input',
        prompt: `
          <div class="tr-en">${escapeHtml(t.en)}</div>
          <div class="tr-cue muted">Write it in German ↓</div>`,
        answer: t.de,
        // Grade the typed answer AND feed the result back into the spaced-
        // repetition schedule for this item (correct → longer gap, wrong → soon).
        accept: (val) => {
          const ok = answers.includes(fold(val));
          sched.record(t.id, ok);
          return ok;
        },
        reveal: t.de,
        speak: t.de,
        hint: t.hint || null,
        label: t.de,
      };
    },
  });
}
