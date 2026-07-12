// js/pasttense.js  (#past-tense)
// ---------------------------------------------------------------------------
// Perfekt (everyday past tense) drill. The correct answer is the vetted 3rd-person
// `perfekt` from verbs.js (e.g. "hat gemacht" / "ist gegangen"). Distractors are
// real Perfekt forms of other verbs, plus a haben/sein swap of the correct one —
// which trains the auxiliary choice without inventing a participle. Uses runner.
// ---------------------------------------------------------------------------

import { VERBS } from './data/verbs.js';
import { createRotator, runner, escapeHtml, shuffle, sample } from './engine.js';

const PERF = VERBS.filter((v) => v.perfekt);
const ALL_PERF = [...new Set(PERF.map((v) => v.perfekt))];

// "hat gemacht" <-> "ist gemacht": same real participle, opposite auxiliary.
function swapAux(p) {
  if (p.startsWith('hat ')) return 'ist ' + p.slice(4);
  if (p.startsWith('ist ')) return 'hat ' + p.slice(4);
  return null;
}

function typeNote(type) {
  switch (type) {
    case 'strong':
    case 'irregular': return 'Strong/irregular: ge- + …-en, often with a vowel change.';
    case 'separable': return 'Separable: ge- goes inside (aufstehen → aufgestanden).';
    case 'modal': return 'Modal verbs are usually used in the simple past (konnte, wollte…).';
    default: return 'Regular: ge- + stem + -t.';
  }
}

export function renderPastTense(container) {
  const rot = createRotator('past-tense');

  return runner(container, {
    section: 'past-tense',
    title: 'Past tense (Perfekt)',
    emoji: '⏪',
    instruction: 'Pick the correct Perfekt (past) form.',
    xp: 10,
    nextRound() {
      const v = rot.pick(PERF, (x) => x.german);
      const correct = v.perfekt;
      const distractors = new Set();
      const swapped = swapAux(correct);
      if (swapped) distractors.add(swapped);
      for (const p of sample(ALL_PERF.filter((p) => p !== correct), 4)) {
        if (distractors.size >= 3) break;
        distractors.add(p);
      }
      const options = shuffle([correct, ...[...distractors].slice(0, 3)]).map((p) => ({
        label: p,
        value: p,
        correct: p === correct,
      }));
      return {
        type: 'choice',
        prompt: `
          <div class="pl-cue">${v.emoji || ''} <b>${escapeHtml(v.german)}</b>
            <span class="muted">— ${escapeHtml(v.english)}</span></div>
          <div class="pl-q">Say it in the past <span class="muted">(er / sie / es)</span>:</div>`,
        options,
        answer: correct,
        reveal: 'er ' + correct,
        speak: 'er ' + correct,
        hint: typeNote(v.type),
        label: correct,
      };
    },
  });
}
