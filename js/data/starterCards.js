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

  // ---- More nouns ----
  { german: 'Schule',  english: 'school',    article: 'die', emoji: '🏫', category: 'school',   example: 'Die Schule beginnt um acht.' },
  { german: 'Buch',    english: 'book',      article: 'das', emoji: '📚', category: 'school',   example: 'Ich lese ein gutes Buch.' },
  { german: 'Lehrer',  english: 'teacher',   article: 'der', emoji: '👨‍🏫', category: 'school',  example: 'Der Lehrer erklärt die Aufgabe.' },
  { german: 'Stadt',   english: 'city',      article: 'die', emoji: '🏙️', category: 'city',     example: 'Berlin ist eine große Stadt.' },
  { german: 'Straße',  english: 'street',    article: 'die', emoji: '🛣️', category: 'city',     example: 'Die Straße ist sehr lang.' },
  { german: 'Bahnhof', english: 'train station', article: 'der', emoji: '🚉', category: 'city', example: 'Der Zug fährt vom Bahnhof ab.' },
  { german: 'Baum',    english: 'tree',      article: 'der', emoji: '🌳', category: 'nature',   example: 'Der Baum ist sehr alt.' },
  { german: 'Blume',   english: 'flower',    article: 'die', emoji: '🌸', category: 'nature',   example: 'Die Blume riecht gut.' },
  { german: 'Meer',    english: 'sea',       article: 'das', emoji: '🌊', category: 'nature',   example: 'Das Meer ist blau.' },
  { german: 'Sonne',   english: 'sun',       article: 'die', emoji: '☀️', category: 'weather',  example: 'Die Sonne scheint heute.' },
  { german: 'Regen',   english: 'rain',      article: 'der', emoji: '🌧️', category: 'weather',  example: 'Der Regen hört nicht auf.' },
  { german: 'Käse',    english: 'cheese',    article: 'der', emoji: '🧀', category: 'food',     example: 'Der Käse schmeckt gut.' },
  { german: 'Ei',      english: 'egg',       article: 'das', emoji: '🥚', category: 'food',     example: 'Ich esse ein Ei zum Frühstück.' },
  { german: 'Milch',   english: 'milk',      article: 'die', emoji: '🥛', category: 'food',     example: 'Die Milch ist im Kühlschrank.' },
  { german: 'Fisch',   english: 'fish',      article: 'der', emoji: '🐟', category: 'food',     example: 'Der Fisch ist frisch.' },
  { german: 'Tasse',   english: 'cup',       article: 'die', emoji: '☕', category: 'kitchen',  example: 'Die Tasse ist voll Tee.' },
  { german: 'Teller',  english: 'plate',     article: 'der', emoji: '🍽️', category: 'kitchen',  example: 'Der Teller ist leer.' },
  { german: 'Messer',  english: 'knife',     article: 'das', emoji: '🔪', category: 'kitchen',  example: 'Das Messer ist scharf.' },
  { german: 'Arzt',    english: 'doctor',    article: 'der', emoji: '🧑‍⚕️', category: 'health', example: 'Der Arzt hilft dem Kind.' },
  { german: 'Ball',    english: 'ball',      article: 'der', emoji: '⚽', category: 'sport',    example: 'Der Ball ist rund.' },
  { german: 'Spiel',   english: 'game',      article: 'das', emoji: '🎮', category: 'sport',    example: 'Das Spiel war spannend.' },

  // ---- More verbs ----
  { german: 'kochen',  english: 'to cook',   article: null,  emoji: '🍳', category: 'verbs',    example: 'Ich koche eine Suppe.' },
  { german: 'lesen',   english: 'to read',   article: null,  emoji: '📖', category: 'verbs',    example: 'Sie liest jeden Abend.' },
  { german: 'schreiben', english: 'to write', article: null, emoji: '✍️', category: 'verbs',    example: 'Er schreibt einen Brief.' },
  { german: 'helfen',  english: 'to help',   article: null,  emoji: '🤝', category: 'verbs',    example: 'Kannst du mir helfen?' },
  { german: 'kaufen',  english: 'to buy',    article: null,  emoji: '🛒', category: 'verbs',    example: 'Ich kaufe frisches Brot.' },
  { german: 'schlafen', english: 'to sleep', article: null,  emoji: '😴', category: 'verbs',    example: 'Das Baby schläft schon.' },
  { german: 'verstehen', english: 'to understand', article: null, emoji: '🧠', category: 'verbs', example: 'Ich verstehe die Frage nicht.' },

  // ---- More adjectives ----
  { german: 'glücklich', english: 'happy',   article: null,  emoji: '😊', category: 'adjectives', example: 'Sie ist heute sehr glücklich.' },
  { german: 'müde',    english: 'tired',     article: null,  emoji: '😪', category: 'adjectives', example: 'Am Abend bin ich müde.' },
  { german: 'schnell', english: 'fast',      article: null,  emoji: '⚡', category: 'adjectives', example: 'Das Auto ist sehr schnell.' },
  { german: 'kalt',    english: 'cold',      article: null,  emoji: '❄️', category: 'adjectives', example: 'Im Winter ist es kalt.' },
  { german: 'wichtig', english: 'important', article: null,  emoji: '❗', category: 'adjectives', example: 'Das ist eine wichtige Frage.' },
  { german: 'einfach', english: 'easy / simple', article: null, emoji: '✅', category: 'adjectives', example: 'Die Aufgabe ist einfach.' },
];
