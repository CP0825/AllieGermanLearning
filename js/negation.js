// js/negation.js  (#negation)
// Pick kein (with the right ending) or nicht. See js/drill.js + the data file.
import { NEGATION } from './data/negation.js';
import { choiceDrill } from './drill.js';

export function renderNegation(container) {
  return choiceDrill(container, {
    section: 'negation',
    title: 'Negation (kein / nicht)',
    emoji: '🚫',
    instruction: 'Choose the right way to say “no”.',
    items: NEGATION,
    xp: 12,
    hint: 'kein negates a noun with ein / no article (and takes ein-endings); nicht negates a verb, an adjective, or a noun that already has der/die/das or mein.',
  });
}
