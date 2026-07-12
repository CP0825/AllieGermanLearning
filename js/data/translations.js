// js/data/translations.js
// ---------------------------------------------------------------------------
// English → German sentence translation (production practice). Each item:
//   { en, de, accept?, hint? }
//     • en      the English prompt
//     • de      the model German answer (shown after answering, read aloud)
//     • accept  extra full-sentence answers to count as correct (word-order or
//               article variants). Matching is case/punctuation-insensitive and
//               tolerant of ä/ö/ü/ß vs ae/oe/ue/ss (see translate.js).
//     • hint    a short grammar nudge shown after answering
// Kept short and A1–A2 so there's little ambiguity in what counts as "right".
// ---------------------------------------------------------------------------

export const TRANSLATIONS = [
  {
    en: 'I am tired.',
    de: 'Ich bin müde.',
    hint: '„sein" (to be): ich bin, du bist, er ist.',
  },
  {
    en: 'The man drinks coffee.',
    de: 'Der Mann trinkt Kaffee.',
    accept: ['Der Mann trinkt einen Kaffee.'],
    hint: 'Subject → Nominativ: der Mann.',
  },
  {
    en: 'I have a dog.',
    de: 'Ich habe einen Hund.',
    hint: 'Direct object → Akkusativ: der Hund → einen Hund.',
  },
  {
    en: 'We are going home.',
    de: 'Wir gehen nach Hause.',
    hint: '„nach Hause" = homewards (movement).',
  },
  {
    en: 'She is reading a book.',
    de: 'Sie liest ein Buch.',
    hint: 'German present covers "reads" and "is reading". das Buch → ein Buch (neuter, unchanged in Akkusativ).',
  },
  {
    en: 'The children are playing in the garden.',
    de: 'Die Kinder spielen im Garten.',
    hint: 'Location (wo?) → Dativ: in dem Garten → im Garten.',
  },
  {
    en: 'I would like a coffee, please.',
    de: 'Ich möchte einen Kaffee, bitte.',
    accept: ['Ich hätte gern einen Kaffee, bitte.', 'Ich möchte bitte einen Kaffee.'],
    hint: '„ich möchte" = I would like — the polite way to order.',
  },
  {
    en: 'Where is the train station?',
    de: 'Wo ist der Bahnhof?',
    hint: 'W-question: question word + verb. der Bahnhof.',
  },
  {
    en: 'My mother cooks dinner.',
    de: 'Meine Mutter kocht das Abendessen.',
    accept: ['Meine Mutter kocht Abendessen.'],
    hint: 'Possessive agrees with the noun: die Mutter → meine Mutter.',
  },
  {
    en: 'It is cold today.',
    de: 'Es ist heute kalt.',
    accept: ['Heute ist es kalt.'],
    hint: 'Verb stays second (V2): put „heute" first and the subject moves after the verb.',
  },
];
