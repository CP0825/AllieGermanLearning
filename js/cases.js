// js/cases.js  (#cases)
// ---------------------------------------------------------------------------
// Pick the correct article / case form. The case name and an explanatory hint
// are revealed after answering.
// ---------------------------------------------------------------------------

import { CASES } from './data/cases.js';
import { createRotator, runner } from './engine.js';
import { renderBlank } from './fillblank.js';

export function renderCases(container) {
  const rot = createRotator('cases');

  return runner(container, {
    section: 'cases',
    title: 'Cases',
    emoji: '📦',
    instruction: 'Pick the correct case form.',
    xp: 12,
    nextRound() {
      const item = rot.pick(CASES, (x) => x.text);
      return {
        type: 'choice',
        prompt: `
          <div class="cs-case">${item.case}</div>
          <div class="cs-sentence">${renderBlank(item.text)}</div>`,
        options: item.options.map((o) => ({ label: o, value: o, correct: o === item.answer })),
        answer: item.answer,
        reveal: item.answer,
        speak: item.text.replace('{blank}', item.answer),
        label: `${item.case}: ${item.answer}`,
        translation: `${item.case}: ${item.answer}`,
        hint: item.hint,
      };
    },
  });
}
