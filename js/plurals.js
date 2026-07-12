// js/plurals.js  (#plurals)
// ---------------------------------------------------------------------------
// Singular → plural drill. Multiple choice so we never have to invent a plural:
// the correct answer is the vetted `plural` from vocab.js, and every distractor
// is a real plural taken from another noun. Reuses the shared runner.
// ---------------------------------------------------------------------------

import { VOCAB } from './data/vocab.js';
import { createRotator, runner, escapeHtml, shuffle, sample } from './engine.js';

const NOUNS = VOCAB.filter((v) => v.article && v.plural);
const ALL_PLURALS = [...new Set(NOUNS.map((n) => n.plural))];

export function renderPlurals(container) {
  const rot = createRotator('plurals');

  return runner(container, {
    section: 'plurals',
    title: 'Plurals',
    emoji: '👥',
    instruction: 'Choose the correct plural form.',
    xp: 10,
    nextRound() {
      const n = rot.pick(NOUNS, (x) => x.german);
      const correct = n.plural;
      const distractors = sample(ALL_PLURALS.filter((p) => p !== correct), 3);
      const options = shuffle([correct, ...distractors]).map((p) => ({
        label: 'die ' + p,
        value: p,
        correct: p === correct,
      }));
      return {
        type: 'choice',
        prompt: `
          <div class="pl-cue">${n.emoji || ''} <b>${escapeHtml(n.article + ' ' + n.german)}</b>
            <span class="muted">— ${escapeHtml(n.english)}</span></div>
          <div class="pl-q">What is the plural?</div>`,
        options,
        answer: correct,
        reveal: 'die ' + correct,
        speak: 'die ' + correct,
        hint: 'The plural article is always „die".',
        label: 'die ' + correct,
      };
    },
  });
}
