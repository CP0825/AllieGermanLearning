// js/data/starterCards.js
// ---------------------------------------------------------------------------
// ~30 starter flashcards. Used to seed Supabase (and the local cache) the very
// first time the Flashcards screen loads with an empty cards table.
// Each: { german (bare word), english, article (null if not a noun), emoji,
//         category, example }.
// These map straight onto db.addCard().
// ---------------------------------------------------------------------------

export const STARTER_CARDS = [
  { german: 'Haus',    english: 'house',     article: 'das', emoji: '🏠', category: 'home',     example: 'Das Haus ist groß.' },
  { german: 'Frau',    english: 'woman / wife', article: 'die', emoji: '👩', category: 'family', example: 'Die Frau liest ein Buch.' },
  { german: 'Mann',    english: 'man / husband', article: 'der', emoji: '👨', category: 'family', example: 'Der Mann trinkt Kaffee.' },
  { german: 'Kind',    english: 'child',     article: 'das', emoji: '🧒', category: 'family',   example: 'Das Kind spielt im Garten.' },
  { german: 'Brot',    english: 'bread',     article: 'das', emoji: '🍞', category: 'food',     example: 'Ich kaufe ein Brot.' },
  { german: 'Apfel',   english: 'apple',     article: 'der', emoji: '🍎', category: 'food',     example: 'Der Apfel ist rot.' },
  { german: 'Wasser',  english: 'water',     article: 'das', emoji: '💧', category: 'food',     example: 'Ich trinke Wasser.' },
  { german: 'Kaffee',  english: 'coffee',    article: 'der', emoji: '☕', category: 'food',     example: 'Der Kaffee ist heiß.' },
  { german: 'Hund',    english: 'dog',       article: 'der', emoji: '🐶', category: 'animals',  example: 'Der Hund ist mein Freund.' },
  { german: 'Katze',   english: 'cat',       article: 'die', emoji: '🐱', category: 'animals',  example: 'Die Katze schläft.' },
  { german: 'Auto',    english: 'car',       article: 'das', emoji: '🚗', category: 'travel',   example: 'Das Auto ist neu.' },
  { german: 'Zug',     english: 'train',     article: 'der', emoji: '🚆', category: 'travel',   example: 'Der Zug kommt um acht.' },
  { german: 'Stadt',   english: 'city',      article: 'die', emoji: '🏙️', category: 'travel',  example: 'Die Stadt ist schön.' },
  { german: 'Zeit',    english: 'time',      article: 'die', emoji: '⏰', category: 'time',     example: 'Ich habe keine Zeit.' },
  { german: 'Tag',     english: 'day',       article: 'der', emoji: '📆', category: 'time',     example: 'Der Tag ist lang.' },
  { german: 'Jahr',    english: 'year',      article: 'das', emoji: '🎆', category: 'time',     example: 'Das Jahr hat zwölf Monate.' },
  { german: 'Buch',    english: 'book',      article: 'das', emoji: '📖', category: 'work',     example: 'Das Buch ist interessant.' },
  { german: 'Arbeit',  english: 'work',      article: 'die', emoji: '💼', category: 'work',     example: 'Die Arbeit macht Spaß.' },
  { german: 'Geld',    english: 'money',     article: 'das', emoji: '💰', category: 'work',     example: 'Ich habe kein Geld.' },
  { german: 'Sonne',   english: 'sun',       article: 'die', emoji: '☀️', category: 'weather',  example: 'Die Sonne scheint.' },
  { german: 'Regen',   english: 'rain',      article: 'der', emoji: '🌧️', category: 'weather', example: 'Der Regen ist kalt.' },
  { german: 'Hand',    english: 'hand',      article: 'die', emoji: '✋', category: 'body',      example: 'Meine Hand ist warm.' },
  { german: 'Auge',    english: 'eye',       article: 'das', emoji: '👁️', category: 'body',    example: 'Das Auge ist blau.' },
  { german: 'Schuh',   english: 'shoe',      article: 'der', emoji: '👟', category: 'clothing', example: 'Der Schuh ist zu klein.' },
  { german: 'Jacke',   english: 'jacket',    article: 'die', emoji: '🧥', category: 'clothing', example: 'Die Jacke ist warm.' },
  { german: 'essen',   english: 'to eat',    article: null,  emoji: '🍽️', category: 'verbs',   example: 'Wir essen zusammen.' },
  { german: 'trinken', english: 'to drink',  article: null,  emoji: '🥤', category: 'verbs',    example: 'Sie trinken Tee.' },
  { german: 'gehen',   english: 'to go',     article: null,  emoji: '🚶', category: 'verbs',    example: 'Ich gehe nach Hause.' },
  { german: 'lieben',  english: 'to love',   article: null,  emoji: '❤️', category: 'verbs',    example: 'Ich liebe dich.' },
  { german: 'schön',   english: 'beautiful', article: null,  emoji: '✨', category: 'adjectives', example: 'Das ist ein schöner Tag.' },
  { german: 'gut',     english: 'good',      article: null,  emoji: '👍', category: 'adjectives', example: 'Das Essen ist gut.' },
];
