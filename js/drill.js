// js/drill.js
// ---------------------------------------------------------------------------
// Shared renderer for the small multiple-choice grammar drills (adjective
// endings, negation, possessives, Präteritum/Konjunktiv II). Each is a themed
// list of items { text (one {blank}), answer, options:[4], translation, hint? };
// this wires that into the shared runner exactly like word-choice, with the
// English shown as a cue up front and the rule shown as feedback. Reuses the
// least-recently-seen rotator so every round is fresh.
// ---------------------------------------------------------------------------

import { createRotator, runner, escapeHtml } from './engine.js';
import { renderBlank } from './fillblank.js';

// spec = { section, title, emoji, instruction, items, xp?, hint? }
export function choiceDrill(container, spec) {
  const rot = createRotator(spec.section);

  return runner(container, {
    section: spec.section,
    title: spec.title,
    emoji: spec.emoji,
    instruction: spec.instruction,
    xp: spec.xp || 10,
    nextRound() {
      const item = rot.pick(spec.items, (x) => x.text);
      const full = item.text.replace('{blank}', item.answer);
      return {
        type: 'choice',
        prompt: `
          ${item.translation ? `<div class="dr-cue muted">${escapeHtml(item.translation)}</div>` : ''}
          <div class="wc-sentence">${renderBlank(item.text)}</div>`,
        options: item.options.map((o) => ({ label: o, value: o, correct: o === item.answer })),
        answer: item.answer,
        reveal: item.answer,
        speak: full, // read the completed sentence aloud after answering
        hint: item.hint || spec.hint || null,
        label: item.answer,
      };
    },
  });
}
