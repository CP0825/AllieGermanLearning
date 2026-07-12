// js/data/praeteritum.js
// ---------------------------------------------------------------------------
// Präteritum (simple past) & Konjunktiv II (polite / hypothetical) drill. Each:
//   { text (one {blank}), answer, options:[4], translation }.
// The Präteritum is the past you actually see for sein / haben / the modals
// (war, hatte, konnte…) and in writing; Konjunktiv II is the polite "would /
// could / would like" (möchte, könnte, hätte, wäre, würde). Four real verb
// forms per item; `answer` always appears in `options`.
// ---------------------------------------------------------------------------

export const PRAETERITUM = [
  // ---- Präteritum: sein / haben ----
  { text: 'Gestern {blank} ich in Berlin.', answer: 'war', options: ['war', 'bin', 'bist', 'wäre'], translation: 'Yesterday I was in Berlin.' },
  { text: 'Wir {blank} gestern im Kino.', answer: 'waren', options: ['waren', 'sind', 'war', 'wären'], translation: 'We were at the cinema yesterday.' },
  { text: 'Das Wetter {blank} schön.', answer: 'war', options: ['war', 'ist', 'waren', 'wäre'], translation: 'The weather was nice.' },
  { text: 'Ich {blank} gestern krank.', answer: 'war', options: ['war', 'bin', 'wäre', 'waren'], translation: 'I was sick yesterday.' },
  { text: 'Ich {blank} als Kind einen Hund.', answer: 'hatte', options: ['hatte', 'habe', 'hatten', 'hätte'], translation: 'As a child I had a dog.' },
  { text: '{blank} du gestern Zeit?', answer: 'Hattest', options: ['Hattest', 'Hast', 'Hatte', 'Hättest'], translation: 'Did you have time yesterday?' },
  // ---- Präteritum: modal verbs ----
  { text: 'Er {blank} nicht kommen.', answer: 'konnte', options: ['konnte', 'kann', 'könnte', 'konnten'], translation: "He couldn't come." },
  { text: 'Ich {blank} gestern viel arbeiten.', answer: 'musste', options: ['musste', 'muss', 'müsste', 'mussten'], translation: 'I had to work a lot yesterday.' },
  { text: 'Als Kind {blank} ich Fußball spielen.', answer: 'wollte', options: ['wollte', 'will', 'wollten', 'möchte'], translation: 'As a child I wanted to play football.' },
  // ---- Präteritum: common strong verbs ----
  { text: 'Wir {blank} gestern nach Hause.', answer: 'gingen', options: ['gingen', 'gehen', 'ging', 'gehe'], translation: 'We went home yesterday.' },
  { text: 'Er {blank} um acht Uhr.', answer: 'kam', options: ['kam', 'kommt', 'kamen', 'kommen'], translation: 'He came at eight.' },
  { text: 'Sie {blank} mir ein Buch.', answer: 'gab', options: ['gab', 'gibt', 'gaben', 'geben'], translation: 'She gave me a book.' },
  { text: 'Ich {blank} den Film gestern.', answer: 'sah', options: ['sah', 'sehe', 'sahen', 'sieht'], translation: 'I saw the film yesterday.' },
  { text: 'Wir {blank} nach Italien.', answer: 'fuhren', options: ['fuhren', 'fahren', 'fuhr', 'fährt'], translation: 'We traveled to Italy.' },
  // ---- Konjunktiv II: polite / hypothetical ----
  { text: '{blank} ich bitte einen Kaffee?', answer: 'Könnte', options: ['Könnte', 'Kann', 'Konnte', 'Kannst'], translation: 'Could I have a coffee, please?' },
  { text: 'Ich {blank} gern ein Wasser.', answer: 'hätte', options: ['hätte', 'habe', 'hatte', 'haben'], translation: "I'd like a water." },
  { text: 'Ich {blank} einen Tee, bitte.', answer: 'möchte', options: ['möchte', 'mag', 'mochte', 'muss'], translation: 'I would like a tea, please.' },
  { text: 'Das {blank} schön!', answer: 'wäre', options: ['wäre', 'ist', 'war', 'sind'], translation: 'That would be nice!' },
  { text: '{blank} du mir bitte helfen?', answer: 'Würdest', options: ['Würdest', 'Wirst', 'Wurdest', 'Bist'], translation: 'Would you help me, please?' },
  { text: 'Ich {blank} gern nach Hause gehen.', answer: 'würde', options: ['würde', 'werde', 'wurde', 'will'], translation: 'I would like to go home.' },
];
