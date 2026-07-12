// js/translate.js  (#translate)
// ---------------------------------------------------------------------------
// English → German sentence translation — the app's first real PRODUCTION
// exercise (build the whole sentence, not fill one blank or pick an option).
// Type-checked leniently on capitalisation, punctuation and ä/ö/ü/ß spelling,
// but the words + grammar have to be right. The model answer is always shown
// afterwards, so it teaches even when marked wrong. Uses the shared runner.
// ---------------------------------------------------------------------------

import { TRANSLATIONS } from './data/translations.js';
import { createRotator, runner, escapeHtml, normalize } from './engine.js';

// Normalise + fold umlauts so "muede" == "müde", "weiss" == "weiß".
function fold(s) {
  return normalize(s)
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');
}

export function renderTranslate(container) {
  const rot = createRotator('translate');

  return runner(container, {
    section: 'translate',
    title: 'Translate',
    emoji: '📝',
    instruction: 'Translate the English sentence into German.',
    xp: 14,
    nextRound() {
      const t = rot.pick(TRANSLATIONS, (x) => x.en);
      const answers = [t.de, ...(t.accept || [])].map(fold);
      return {
        type: 'input',
        prompt: `
          <div class="tr-en">${escapeHtml(t.en)}</div>
          <div class="tr-cue muted">Write it in German ↓</div>`,
        answer: t.de,
        accept: (val) => answers.includes(fold(val)),
        reveal: t.de,
        speak: t.de,
        hint: t.hint || null,
        label: t.de,
      };
    },
  });
}
