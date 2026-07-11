// js/conversation.js  (#conversation)
// ---------------------------------------------------------------------------
// Everyday conversation drill. Same fill-the-blank mechanic as #fill-blank,
// but the phrases are grouped by real-life situation (café, shopping, phone…)
// and the situation is shown as a tag so Allie learns phrases in context.
// Reuses the tested engine runner and the {blank} template contract.
// ---------------------------------------------------------------------------

import { CONVERSATION } from './data/conversation.js';
import { createRotator, runner, escapeHtml, fuzzyEqual } from './engine.js';
import { renderBlank } from './fillblank.js';

export function renderConversation(container) {
  const rot = createRotator('conversation');

  return runner(container, {
    section: 'conversation',
    title: 'Everyday conversation',
    emoji: '💬',
    instruction: 'Complete the everyday phrase — type the missing word.',
    xp: 10,
    nextRound() {
      const s = rot.pick(CONVERSATION, (x) => x.id);
      const full = s.text.replace('{blank}', s.answer);
      return {
        type: 'input',
        prompt: `
          <div class="cv-situation">${escapeHtml(s.situation)}</div>
          <div class="fb-cue">${escapeHtml(s.translation)}</div>
          <div class="fb-sentence">${renderBlank(s.text)}</div>`,
        answer: s.answer,
        accept: (val) => fuzzyEqual(val, s.answer),
        reveal: s.answer,
        speak: full, // read the completed phrase aloud after answering
        label: s.answer,
      };
    },
  });
}
