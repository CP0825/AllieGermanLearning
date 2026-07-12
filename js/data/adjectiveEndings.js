// js/data/adjectiveEndings.js
// ---------------------------------------------------------------------------
// Adjective-ending drill items. Pick the correctly-declined adjective for the
// gap. Each: { text (one {blank}), answer, options:[4], translation }.
// The four options are the same adjective with the four possible endings
// (-e / -en / -er / -es), so the choice is purely about the ending. `answer`
// always appears in `options`. Covers definite (der/die/das → weak), indefinite
// (ein/kein/mein → mixed) and article-less (strong) endings across cases.
// ---------------------------------------------------------------------------

export const ADJECTIVE_ENDINGS = [
  // ---- Definite article (weak endings) ----
  { text: 'der {blank} Mann', answer: 'große', options: ['große', 'großen', 'großer', 'großes'], translation: 'the big man (subject)' },
  { text: 'die {blank} Frau', answer: 'schöne', options: ['schöne', 'schönen', 'schöner', 'schönes'], translation: 'the beautiful woman (subject)' },
  { text: 'das {blank} Kind', answer: 'kleine', options: ['kleine', 'kleinen', 'kleiner', 'kleines'], translation: 'the small child (subject)' },
  { text: 'Ich sehe den {blank} Hund.', answer: 'großen', options: ['großen', 'große', 'großer', 'großes'], translation: 'I see the big dog. (masc. accusative)' },
  { text: 'Ich helfe dem {blank} Mann.', answer: 'alten', options: ['alten', 'alte', 'alter', 'altes'], translation: 'I help the old man. (dative)' },
  { text: 'die {blank} Autos', answer: 'schnellen', options: ['schnellen', 'schnelle', 'schneller', 'schnelles'], translation: 'the fast cars (plural, definite)' },
  { text: 'Der {blank} Kaffee schmeckt gut.', answer: 'heiße', options: ['heiße', 'heißen', 'heißer', 'heißes'], translation: 'The hot coffee tastes good. (subject)' },
  { text: 'Die {blank} Kinder spielen.', answer: 'kleinen', options: ['kleinen', 'kleine', 'kleiner', 'kleines'], translation: 'The small children are playing. (plural, definite)' },
  // ---- Indefinite ein / kein / mein (mixed endings) ----
  { text: 'Ein {blank} Mann kommt.', answer: 'großer', options: ['großer', 'große', 'großen', 'großes'], translation: 'A big man is coming. (masc. subject)' },
  { text: 'Das ist eine {blank} Idee.', answer: 'gute', options: ['gute', 'guter', 'guten', 'gutes'], translation: 'That is a good idea. (fem. subject)' },
  { text: 'Ich habe ein {blank} Auto.', answer: 'neues', options: ['neues', 'neue', 'neuer', 'neuen'], translation: 'I have a new car. (neut. accusative)' },
  { text: 'Er trägt einen {blank} Mantel.', answer: 'warmen', options: ['warmen', 'warme', 'warmer', 'warmes'], translation: 'He wears a warm coat. (masc. accusative)' },
  { text: 'Mein {blank} Bruder wohnt hier.', answer: 'kleiner', options: ['kleiner', 'kleine', 'kleinen', 'kleines'], translation: 'My little brother lives here. (masc. subject)' },
  { text: 'Ich liebe meine {blank} Schwester.', answer: 'große', options: ['große', 'großen', 'großer', 'großes'], translation: 'I love my big sister. (fem. accusative)' },
  { text: 'Das ist mein {blank} Haus.', answer: 'neues', options: ['neues', 'neue', 'neuer', 'neuen'], translation: 'That is my new house. (neut. subject)' },
  { text: 'Wir haben keine {blank} Zeit.', answer: 'freie', options: ['freie', 'freien', 'freier', 'freies'], translation: 'We have no free time. (fem. accusative)' },
  { text: 'Ich wohne in einem {blank} Haus.', answer: 'großen', options: ['großen', 'große', 'großer', 'großes'], translation: 'I live in a big house. (neut. dative)' },
  // ---- No article (strong endings) ----
  { text: 'Ich trinke {blank} Wasser.', answer: 'kaltes', options: ['kaltes', 'kalte', 'kalter', 'kalten'], translation: 'I drink cold water. (neut., no article)' },
  { text: 'Sie trinkt {blank} Kaffee.', answer: 'starken', options: ['starken', 'starke', 'starker', 'starkes'], translation: 'She drinks strong coffee. (masc. accusative, no article)' },
  { text: '{blank} Milch ist gesund.', answer: 'Frische', options: ['Frische', 'Frischen', 'Frischer', 'Frisches'], translation: 'Fresh milk is healthy. (fem., no article)' },
];
