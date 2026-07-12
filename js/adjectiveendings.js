// js/adjectiveendings.js  (#adjective-endings)
// Pick the correctly-declined adjective ending. See js/drill.js + the data file.
import { ADJECTIVE_ENDINGS } from './data/adjectiveEndings.js';
import { choiceDrill } from './drill.js';

export function renderAdjectiveEndings(container) {
  return choiceDrill(container, {
    section: 'adjective-endings',
    title: 'Adjective endings',
    emoji: '🎯',
    instruction: 'Choose the adjective with the right ending.',
    items: ADJECTIVE_ENDINGS,
    xp: 12,
    hint: 'After der/die/das it is mostly -e (singular) or -en; after ein/kein/mein the adjective shows the gender (-er / -e / -es).',
  });
}
