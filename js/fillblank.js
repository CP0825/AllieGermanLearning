// js/fillblank.js  (#fill-blank)
// ---------------------------------------------------------------------------
// Type the missing word to complete a sentence. Case-insensitive and
// typo-tolerant (see fuzzyEqual). The translation is revealed after answering.
// ---------------------------------------------------------------------------

import { SENTENCES } from './data/sentences.js';
import { createRotator, runner, escapeHtml, fuzzyEqual } from './engine.js';

// Render a "{blank}" template into safe HTML with a styled gap.
export function renderBlank(text, gap = '_____') {
  return text
    .split('{blank}')
    .map(escapeHtml)
    .join(`<span class="blank">${gap}</span>`);
}

export function renderFillBlank(container) {
  const rot = createRotator('fill-blank');

  return runner(container, {
    section: 'fill-blank',
    title: 'Fill the blank',
    emoji: '✍️',
    instruction: 'Type the missing German word.',
    xp: 10,
    nextRound() {
      const s = rot.pick(SENTENCES, (x) => x.id);
      const full = s.text.replace('{blank}', s.answer);
      return {
        type: 'input',
        prompt: `
          <div class="fb-cue">${escapeHtml(s.translation)}</div>
          <div class="fb-sentence">${renderBlank(s.text)}</div>`,
        answer: s.answer,
        accept: (val) => fuzzyEqual(val, s.answer),
        reveal: s.answer,
        speak: full, // read the completed sentence after answering
        label: s.answer,
      };
    },
  });
}
