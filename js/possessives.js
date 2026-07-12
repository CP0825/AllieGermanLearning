// js/possessives.js  (#possessives)
// Pick the correct possessive form. See js/drill.js + the data file.
import { POSSESSIVES } from './data/possessives.js';
import { choiceDrill } from './drill.js';

export function renderPossessives(container) {
  return choiceDrill(container, {
    section: 'possessives',
    title: 'Possessives (mein / dein…)',
    emoji: '👪',
    instruction: 'Choose the correct possessive form.',
    items: POSSESSIVES,
    xp: 12,
    hint: 'A possessive agrees with the thing owned, not the owner. It declines like ein/kein: -Ø / -e / -en / -em / -er by gender + case.',
  });
}
