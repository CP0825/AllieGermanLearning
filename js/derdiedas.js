// js/derdiedas.js  (#der-die-das)
// ---------------------------------------------------------------------------
// Rapid gender drilling over the vocabulary nouns. Three big buttons
// der / die / das. A rule hint is shown after answering when one applies.
// ---------------------------------------------------------------------------

import { NOUNS } from './data/vocab.js';
import { createRotator, runner, escapeHtml } from './engine.js';
import { speakerButton } from './audio.js';

// Gender rules of thumb — returned as an after-answer hint when they match.
function genderHint(word, article) {
  const w = word.toLowerCase();
  if (/(ung|heit|keit|ion|tät|schaft|ei)$/.test(w))
    return 'Nouns ending in -ung, -heit, -keit, -ion, -tät, -schaft are usually die.';
  if (/(chen|lein)$/.test(w)) return 'Nouns ending in -chen or -lein are always das.';
  if (/(ismus|ling|ig|or)$/.test(w)) return 'Nouns ending in -ling, -or, -ismus are usually der.';
  if (article === 'der' && /er$/.test(w)) return 'Nouns ending in -er are often der.';
  if (article === 'die' && /e$/.test(w)) return 'Many nouns ending in -e are die.';
  return 'German genders are mostly memorised — keep drilling! 💪';
}

export function renderDerDieDas(container) {
  const rot = createRotator('der-die-das');

  return runner(container, {
    section: 'der-die-das',
    title: 'der / die / das',
    emoji: '🇩🇪',
    instruction: 'Choose the correct article. Speed drill!',
    xp: 8,
    nextRound() {
      const noun = rot.pick(NOUNS, (n) => n.german);
      return {
        type: 'choice',
        shuffle: false,
        optionClass: (v) => 'opt-' + v,
        prompt: `
          <div class="ddd-word">
            <span class="ddd-emoji">${noun.emoji || '📦'}</span>
            <span class="ddd-noun">${escapeHtml(noun.german)}</span>
            ${speakerButton(noun.german)}
          </div>
          <div class="ddd-q">der, die oder das?</div>`,
        label: `${noun.article} ${noun.german}`,
        options: [
          { label: 'der', value: 'der' },
          { label: 'die', value: 'die' },
          { label: 'das', value: 'das' },
        ],
        answer: noun.article,
        reveal: `${noun.article} ${noun.german}`,
        translation: `${noun.article} ${noun.german} — ${noun.english}`,
        hint: genderHint(noun.german, noun.article),
      };
    },
  });
}
