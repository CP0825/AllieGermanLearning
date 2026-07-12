// js/praeteritum.js  (#praeteritum)
// Pick the right Präteritum (simple past) or Konjunktiv II (polite) form.
// See js/drill.js + the data file.
import { PRAETERITUM } from './data/praeteritum.js';
import { choiceDrill } from './drill.js';

export function renderPraeteritum(container) {
  return choiceDrill(container, {
    section: 'praeteritum',
    title: 'Präteritum & polite forms',
    emoji: '📜',
    instruction: 'Choose the correct past or polite form.',
    items: PRAETERITUM,
    xp: 12,
    hint: 'Präteritum is the simple past you use for sein/haben/modals (war, hatte, konnte…). Konjunktiv II is the polite “would/could” (möchte, könnte, hätte, wäre, würde).',
  });
}
