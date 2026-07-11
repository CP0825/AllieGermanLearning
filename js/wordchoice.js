// js/wordchoice.js  (#word-choice)
// ---------------------------------------------------------------------------
// Multiple-choice: pick the word that best fits the sentence. Four options per
// item come straight from the data file; the translation is shown afterwards.
// ---------------------------------------------------------------------------

import { WORD_CHOICE } from './data/adjectives.js';
import { createRotator, runner } from './engine.js';
import { renderBlank } from './fillblank.js';

export function renderWordChoice(container) {
  const rot = createRotator('word-choice');

  return runner(container, {
    section: 'word-choice',
    title: 'Word choice',
    emoji: '🎨',
    instruction: 'Choose the word that fits best.',
    xp: 10,
    nextRound() {
      const item = rot.pick(WORD_CHOICE, (x) => x.text);
      return {
        type: 'choice',
        prompt: `<div class="wc-sentence">${renderBlank(item.text)}</div>`,
        options: item.options.map((o) => ({ label: o, value: o, correct: o === item.answer })),
        answer: item.answer,
        reveal: item.answer,
        speak: item.text.replace('{blank}', item.answer),
        label: item.answer,
        translation: item.translation,
      };
    },
  });
}
