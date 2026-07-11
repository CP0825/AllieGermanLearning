// js/conjugate.js  (#conjugate)
// ---------------------------------------------------------------------------
// Given a verb + pronoun, pick the correct present-tense form. Distractors are
// other (wrong-person) forms of the SAME verb, topped up from other verbs when
// a verb doesn't have enough distinct forms.
// ---------------------------------------------------------------------------

import { VERBS, PRONOUNS } from './data/verbs.js';
import { createRotator, runner, escapeHtml, shuffle, sample } from './engine.js';
import { speakerButton } from './audio.js';

// All verb × pronoun pairs, built once so the rotator can vary both.
const PAIRS = [];
for (const verb of VERBS) {
  for (const pron of PRONOUNS) {
    PAIRS.push({ verb, pron });
  }
}

function typeHint(type) {
  switch (type) {
    case 'strong': return 'Strong verb — watch for a stem-vowel change (e→i/ie, a→ä) in du and er.';
    case 'separable': return 'Separable verb — the prefix jumps to the end of the clause.';
    case 'irregular': return 'Irregular verb — best learned by heart.';
    case 'modal': return 'Modal verb — the ich and er/sie/es forms are identical.';
    default: return 'Regular verb — stem + ending (-e, -st, -t, -en, -t, -en).';
  }
}

function buildOptions(verb, correct) {
  // Distinct wrong forms of the same verb.
  const own = [...new Set(Object.values(verb.present))].filter((f) => f !== correct);
  let distractors = shuffle(own).slice(0, 3);
  // Top up from other verbs if needed (deduped so options never repeat).
  if (distractors.length < 3) {
    const pool = new Set();
    for (const v of VERBS) {
      for (const f of Object.values(v.present)) {
        if (f !== correct && !distractors.includes(f)) pool.add(f);
      }
    }
    distractors = distractors.concat(sample([...pool], 3 - distractors.length));
  }
  return shuffle([correct, ...distractors]).map((f) => ({ label: f, value: f, correct: f === correct }));
}

export function renderConjugate(container) {
  const rot = createRotator('conjugate');

  return runner(container, {
    section: 'conjugate',
    title: 'Conjugate',
    emoji: '🔤',
    instruction: 'Pick the correct present-tense form.',
    xp: 10,
    nextRound() {
      const { verb, pron } = rot.pick(PAIRS, (p) => p.verb.german + ':' + p.pron.key);
      const correct = verb.present[pron.key];
      return {
        type: 'choice',
        prompt: `
          <div class="cj-verb"><span class="cj-emoji">${verb.emoji || '🔤'}</span><span class="cj-inf">${escapeHtml(verb.german)}</span>${speakerButton(verb.german)}</div>
          <div class="cj-cue"><span class="cj-pronoun">${escapeHtml(pron.label)}</span> · <span class="cj-eng">${escapeHtml(verb.english)}</span></div>
          <div class="cj-q">Which form?</div>`,
        options: buildOptions(verb, correct),
        answer: correct,
        reveal: `${pron.label.split(' / ')[0]} ${correct}`,
        speak: `${pron.label.split(' / ')[0]} ${correct}`,
        label: `${verb.german} (${pron.key})`,
        translation: `${verb.german} → ${verb.english}`,
        hint: typeHint(verb.type),
      };
    },
  });
}
