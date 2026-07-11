// js/data/sentences.js
// ---------------------------------------------------------------------------
// A1–A2 fill-the-blank templates. 85+ items.
// Each: { id, text (contains "{blank}"), answer, translation, level, tags,
//         distractors? (optional — plausible wrong single-word answers) }.
// The answer is a single word; matching is case-insensitive and typo-tolerant.
// These are also reused by the Word-order exercise (blank filled in, then
// scrambled), so keep them natural, correct sentences.
// ---------------------------------------------------------------------------

export const SENTENCES = [
  // ---- Present-tense verbs ----
  { id: 's01', text: 'Ich {blank} einen Kaffee.', answer: 'trinke', translation: 'I drink a coffee.', level: 'A1', tags: ['verb'], distractors: ['trinkst', 'trinkt', 'esse'] },
  { id: 's02', text: 'Du {blank} sehr gut Deutsch.', answer: 'sprichst', translation: 'You speak German very well.', level: 'A1', tags: ['verb'], distractors: ['spreche', 'spricht', 'sprechen'] },
  { id: 's03', text: 'Er {blank} in Berlin.', answer: 'wohnt', translation: 'He lives in Berlin.', level: 'A1', tags: ['verb'], distractors: ['wohne', 'wohnst', 'wohnen'] },
  { id: 's04', text: 'Wir {blank} nach Hause.', answer: 'gehen', translation: 'We go home.', level: 'A1', tags: ['verb'], distractors: ['gehe', 'geht', 'gehst'] },
  { id: 's05', text: 'Ihr {blank} Pizza gern.', answer: 'esst', translation: 'You (pl.) like eating pizza.', level: 'A1', tags: ['verb'], distractors: ['esse', 'isst', 'essen'] },
  { id: 's06', text: 'Sie {blank} ein neues Auto.', answer: 'kaufen', translation: 'They buy a new car.', level: 'A1', tags: ['verb'], distractors: ['kauft', 'kaufe', 'kaufst'] },
  { id: 's07', text: 'Ich {blank} müde.', answer: 'bin', translation: 'I am tired.', level: 'A1', tags: ['sein'], distractors: ['ist', 'bist', 'sind'] },
  { id: 's08', text: 'Du {blank} recht.', answer: 'hast', translation: 'You are right.', level: 'A1', tags: ['haben'], distractors: ['habe', 'hat', 'haben'] },
  { id: 's09', text: 'Das Kind {blank} im Bett.', answer: 'schläft', translation: 'The child sleeps in bed.', level: 'A1', tags: ['verb'], distractors: ['schlafe', 'schläfst', 'schlafen'] },
  { id: 's10', text: 'Wir {blank} einen Film.', answer: 'sehen', translation: 'We watch a film.', level: 'A1', tags: ['verb'], distractors: ['sehe', 'siehst', 'sieht'] },
  { id: 's11', text: 'Ich {blank} meiner Mutter.', answer: 'helfe', translation: 'I help my mother.', level: 'A2', tags: ['verb', 'dativ'], distractors: ['hilft', 'hilfst', 'helfen'] },
  { id: 's12', text: 'Er {blank} ein Buch.', answer: 'liest', translation: 'He reads a book.', level: 'A1', tags: ['verb'], distractors: ['lese', 'lest', 'lesen'] },
  { id: 's13', text: 'Sie {blank} sehr schnell.', answer: 'läuft', translation: 'She runs very fast.', level: 'A1', tags: ['verb'], distractors: ['laufe', 'läufst', 'laufen'] },
  { id: 's14', text: 'Wir {blank} unsere Freunde.', answer: 'treffen', translation: 'We meet our friends.', level: 'A2', tags: ['verb'], distractors: ['treffe', 'triffst', 'trifft'] },
  { id: 's15', text: 'Ich {blank} einen Brief.', answer: 'schreibe', translation: 'I write a letter.', level: 'A1', tags: ['verb'], distractors: ['schreibst', 'schreibt', 'schreiben'] },

  // ---- Modal verbs ----
  { id: 's16', text: 'Ich {blank} gut kochen.', answer: 'kann', translation: 'I can cook well.', level: 'A1', tags: ['modal'], distractors: ['kannst', 'können', 'muss'] },
  { id: 's17', text: 'Du {blank} mehr lernen.', answer: 'musst', translation: 'You must study more.', level: 'A1', tags: ['modal'], distractors: ['muss', 'müssen', 'kannst'] },
  { id: 's18', text: 'Wir {blank} ins Kino gehen.', answer: 'wollen', translation: 'We want to go to the cinema.', level: 'A1', tags: ['modal'], distractors: ['will', 'willst', 'wollt'] },
  { id: 's19', text: 'Hier {blank} man nicht rauchen.', answer: 'darf', translation: 'One may not smoke here.', level: 'A2', tags: ['modal'], distractors: ['darfst', 'dürfen', 'muss'] },
  { id: 's20', text: 'Ich {blank} Schokolade sehr.', answer: 'mag', translation: 'I like chocolate a lot.', level: 'A1', tags: ['modal'], distractors: ['magst', 'mögen', 'mögt'] },

  // ---- Articles (nominative) ----
  { id: 's21', text: '{blank} Hund ist groß.', answer: 'Der', translation: 'The dog is big.', level: 'A1', tags: ['article', 'nom'], distractors: ['Die', 'Das', 'Den'] },
  { id: 's22', text: '{blank} Katze schläft.', answer: 'Die', translation: 'The cat is sleeping.', level: 'A1', tags: ['article', 'nom'], distractors: ['Der', 'Das', 'Den'] },
  { id: 's23', text: '{blank} Kind spielt.', answer: 'Das', translation: 'The child is playing.', level: 'A1', tags: ['article', 'nom'], distractors: ['Der', 'Die', 'Dem'] },
  { id: 's24', text: 'Ich habe {blank} Apfel.', answer: 'einen', translation: 'I have an apple.', level: 'A1', tags: ['article', 'akk'], distractors: ['ein', 'eine', 'einem'] },
  { id: 's25', text: 'Sie hat {blank} Tasche.', answer: 'eine', translation: 'She has a bag.', level: 'A1', tags: ['article', 'akk'], distractors: ['ein', 'einen', 'einem'] },
  { id: 's26', text: 'Wir haben {blank} Haus.', answer: 'ein', translation: 'We have a house.', level: 'A1', tags: ['article', 'akk'], distractors: ['eine', 'einen', 'einem'] },

  // ---- Negation ----
  { id: 's27', text: 'Ich habe {blank} Zeit.', answer: 'keine', translation: 'I have no time.', level: 'A1', tags: ['negation'], distractors: ['kein', 'keinen', 'nicht'] },
  { id: 's28', text: 'Das ist {blank} gut.', answer: 'nicht', translation: 'That is not good.', level: 'A1', tags: ['negation'], distractors: ['kein', 'keine', 'nichts'] },
  { id: 's29', text: 'Er hat {blank} Auto.', answer: 'kein', translation: 'He has no car.', level: 'A1', tags: ['negation'], distractors: ['keine', 'keinen', 'nicht'] },

  // ---- Possessives ----
  { id: 's30', text: 'Das ist {blank} Mutter.', answer: 'meine', translation: 'That is my mother.', level: 'A1', tags: ['possessive'], distractors: ['mein', 'meinen', 'meiner'] },
  { id: 's31', text: 'Wo ist {blank} Bruder?', answer: 'dein', translation: 'Where is your brother?', level: 'A1', tags: ['possessive'], distractors: ['deine', 'deinen', 'deinem'] },
  { id: 's32', text: 'Ich mag {blank} Hund.', answer: 'seinen', translation: 'I like his dog.', level: 'A2', tags: ['possessive', 'akk'], distractors: ['sein', 'seine', 'seinem'] },

  // ---- Question words ----
  { id: 's33', text: '{blank} heißt du?', answer: 'Wie', translation: 'What is your name?', level: 'A1', tags: ['question'], distractors: ['Was', 'Wo', 'Wer'] },
  { id: 's34', text: '{blank} wohnst du?', answer: 'Wo', translation: 'Where do you live?', level: 'A1', tags: ['question'], distractors: ['Wie', 'Wer', 'Wann'] },
  { id: 's35', text: '{blank} ist das?', answer: 'Wer', translation: 'Who is that?', level: 'A1', tags: ['question'], distractors: ['Was', 'Wie', 'Wo'] },
  { id: 's36', text: '{blank} kostet das Brot?', answer: 'Was', translation: 'What does the bread cost?', level: 'A1', tags: ['question'], distractors: ['Wer', 'Wie', 'Wann'] },
  { id: 's37', text: '{blank} beginnt der Film?', answer: 'Wann', translation: 'When does the film start?', level: 'A1', tags: ['question'], distractors: ['Wo', 'Was', 'Wer'] },
  { id: 's38', text: '{blank} bist du traurig?', answer: 'Warum', translation: 'Why are you sad?', level: 'A2', tags: ['question'], distractors: ['Wann', 'Wie', 'Wo'] },

  // ---- Prepositions ----
  { id: 's39', text: 'Ich fahre {blank} Berlin.', answer: 'nach', translation: 'I travel to Berlin.', level: 'A2', tags: ['preposition'], distractors: ['zu', 'in', 'auf'] },
  { id: 's40', text: 'Das Buch liegt {blank} dem Tisch.', answer: 'auf', translation: 'The book lies on the table.', level: 'A2', tags: ['preposition', 'dativ'], distractors: ['in', 'an', 'unter'] },
  { id: 's41', text: 'Wir gehen {blank} Kino.', answer: 'ins', translation: 'We go to the cinema.', level: 'A2', tags: ['preposition'], distractors: ['im', 'in', 'zum'] },
  { id: 's42', text: 'Ich komme {blank} Deutschland.', answer: 'aus', translation: 'I come from Germany.', level: 'A1', tags: ['preposition'], distractors: ['von', 'nach', 'zu'] },
  { id: 's43', text: 'Sie wohnt {blank} ihrer Schwester.', answer: 'bei', translation: 'She lives with her sister.', level: 'A2', tags: ['preposition', 'dativ'], distractors: ['mit', 'zu', 'von'] },
  { id: 's44', text: 'Ich fahre {blank} dem Bus.', answer: 'mit', translation: 'I go by bus.', level: 'A2', tags: ['preposition', 'dativ'], distractors: ['bei', 'zu', 'von'] },

  // ---- Everyday phrases ----
  { id: 's45', text: 'Wie {blank} es dir?', answer: 'geht', translation: 'How are you?', level: 'A1', tags: ['phrase'], distractors: ['gehst', 'gehe', 'gehen'] },
  { id: 's46', text: 'Ich {blank} aus England.', answer: 'komme', translation: 'I come from England.', level: 'A1', tags: ['phrase'], distractors: ['kommst', 'kommt', 'kommen'] },
  { id: 's47', text: 'Guten {blank}!', answer: 'Morgen', translation: 'Good morning!', level: 'A1', tags: ['phrase'], distractors: ['Abend', 'Nacht', 'Tag'] },
  { id: 's48', text: 'Vielen {blank}!', answer: 'Dank', translation: 'Thank you very much!', level: 'A1', tags: ['phrase'], distractors: ['Tag', 'Bitte', 'Gruß'] },
  { id: 's49', text: 'Ich {blank} dich.', answer: 'liebe', translation: 'I love you.', level: 'A1', tags: ['phrase'], distractors: ['liebst', 'liebt', 'lieben'] },
  { id: 's50', text: 'Wie {blank} ist das?', answer: 'viel', translation: 'How much is that?', level: 'A1', tags: ['phrase'], distractors: ['viele', 'gut', 'alt'] },

  // ---- Time expressions ----
  { id: 's51', text: 'Ich stehe {blank} sieben Uhr auf.', answer: 'um', translation: 'I get up at seven.', level: 'A2', tags: ['time'], distractors: ['am', 'im', 'an'] },
  { id: 's52', text: 'Wir treffen uns {blank} Montag.', answer: 'am', translation: 'We meet on Monday.', level: 'A2', tags: ['time'], distractors: ['um', 'im', 'an'] },
  { id: 's53', text: '{blank} Sommer ist es warm.', answer: 'Im', translation: 'In summer it is warm.', level: 'A2', tags: ['time'], distractors: ['Am', 'Um', 'An'] },
  { id: 's54', text: 'Heute ist {blank} schön.', answer: 'es', translation: 'Today it is nice.', level: 'A1', tags: ['time'], distractors: ['er', 'das', 'sie'] },
  { id: 's55', text: 'Der Zug kommt {blank} zehn Minuten.', answer: 'in', translation: 'The train comes in ten minutes.', level: 'A2', tags: ['time'], distractors: ['um', 'an', 'auf'] },

  // ---- More verbs & vocabulary ----
  { id: 's56', text: 'Meine Schwester {blank} Klavier.', answer: 'spielt', translation: 'My sister plays piano.', level: 'A1', tags: ['verb'], distractors: ['spiele', 'spielst', 'spielen'] },
  { id: 's57', text: 'Die Sonne {blank} heute.', answer: 'scheint', translation: 'The sun is shining today.', level: 'A1', tags: ['verb', 'weather'], distractors: ['scheine', 'scheinst', 'scheinen'] },
  { id: 's58', text: 'Es {blank} draußen.', answer: 'regnet', translation: 'It is raining outside.', level: 'A1', tags: ['weather'], distractors: ['regne', 'regnest', 'regnen'] },
  { id: 's59', text: 'Ich {blank} um acht Uhr auf.', answer: 'stehe', translation: 'I get up at eight.', level: 'A2', tags: ['separable'], distractors: ['steht', 'stehst', 'stehen'] },
  { id: 's60', text: 'Er {blank} seine Oma an.', answer: 'ruft', translation: 'He calls his grandma.', level: 'A2', tags: ['separable'], distractors: ['rufe', 'rufst', 'rufen'] },
  { id: 's61', text: 'Wir {blank} im Supermarkt ein.', answer: 'kaufen', translation: 'We shop at the supermarket.', level: 'A2', tags: ['separable'], distractors: ['kaufe', 'kaufst', 'kauft'] },
  { id: 's62', text: 'Das Wetter ist heute sehr {blank}.', answer: 'schön', translation: 'The weather is very nice today.', level: 'A1', tags: ['adjective'], distractors: ['schlecht', 'kalt', 'warm'] },
  { id: 's63', text: 'Der Kaffee ist zu {blank}.', answer: 'heiß', translation: 'The coffee is too hot.', level: 'A1', tags: ['adjective'], distractors: ['kalt', 'groß', 'klein'] },
  { id: 's64', text: 'Mein Auto ist sehr {blank}.', answer: 'alt', translation: 'My car is very old.', level: 'A1', tags: ['adjective'], distractors: ['neu', 'jung', 'groß'] },
  { id: 's65', text: 'Ich trinke gern {blank}.', answer: 'Tee', translation: 'I like drinking tea.', level: 'A1', tags: ['noun'], distractors: ['Brot', 'Suppe', 'Milch'] },

  // ---- Dative & accusative practice ----
  { id: 's66', text: 'Ich gebe {blank} Kind einen Apfel.', answer: 'dem', translation: 'I give the child an apple.', level: 'A2', tags: ['dativ'], distractors: ['den', 'der', 'das'] },
  { id: 's67', text: 'Er hilft {blank} Frau.', answer: 'der', translation: 'He helps the woman.', level: 'A2', tags: ['dativ'], distractors: ['die', 'den', 'dem'] },
  { id: 's68', text: 'Wir sehen {blank} Film.', answer: 'den', translation: 'We watch the film.', level: 'A2', tags: ['akk'], distractors: ['der', 'dem', 'des'] },
  { id: 's69', text: 'Sie liebt {blank} Mann.', answer: 'den', translation: 'She loves the man.', level: 'A2', tags: ['akk'], distractors: ['der', 'dem', 'das'] },
  { id: 's70', text: 'Das Geschenk ist {blank} dich.', answer: 'für', translation: 'The gift is for you.', level: 'A2', tags: ['akk', 'preposition'], distractors: ['um', 'mit', 'zu'] },

  // ---- Numbers & shopping ----
  { id: 's71', text: 'Das kostet {blank} Euro.', answer: 'zehn', translation: 'That costs ten euros.', level: 'A1', tags: ['numbers'], distractors: ['zehnt', 'zehen', 'zwei'] },
  { id: 's72', text: 'Ich hätte gern {blank} Brötchen.', answer: 'drei', translation: 'I would like three rolls.', level: 'A2', tags: ['numbers'], distractors: ['drai', 'dreißig', 'vier'] },
  { id: 's73', text: 'Wir haben {blank} Kinder.', answer: 'zwei', translation: 'We have two children.', level: 'A1', tags: ['numbers'], distractors: ['zwo', 'zwölf', 'zwanzig'] },

  // ---- Home & daily life ----
  { id: 's74', text: 'Die Küche ist sehr {blank}.', answer: 'sauber', translation: 'The kitchen is very clean.', level: 'A2', tags: ['adjective'], distractors: ['schmutzig', 'groß', 'klein'] },
  { id: 's75', text: 'Ich wasche {blank} Hände.', answer: 'meine', translation: 'I wash my hands.', level: 'A2', tags: ['possessive'], distractors: ['mein', 'meinen', 'meiner'] },
  { id: 's76', text: 'Das Bett steht {blank} Schlafzimmer.', answer: 'im', translation: 'The bed is in the bedroom.', level: 'A2', tags: ['preposition'], distractors: ['in', 'am', 'auf'] },
  { id: 's77', text: 'Wo {blank} die Toilette?', answer: 'ist', translation: 'Where is the toilet?', level: 'A1', tags: ['sein'], distractors: ['bin', 'bist', 'sind'] },
  { id: 's78', text: 'Die Schuhe sind {blank} der Tür.', answer: 'an', translation: 'The shoes are at the door.', level: 'A2', tags: ['preposition'], distractors: ['in', 'auf', 'um'] },

  // ---- Feelings & people ----
  { id: 's79', text: 'Ich bin heute sehr {blank}.', answer: 'glücklich', translation: 'I am very happy today.', level: 'A1', tags: ['feelings'], distractors: ['traurig', 'müde', 'krank'] },
  { id: 's80', text: 'Warum bist du so {blank}?', answer: 'traurig', translation: 'Why are you so sad?', level: 'A1', tags: ['feelings'], distractors: ['froh', 'müde', 'nett'] },
  { id: 's81', text: 'Meine Freundin ist sehr {blank}.', answer: 'nett', translation: 'My friend is very nice.', level: 'A1', tags: ['adjective'], distractors: ['böse', 'alt', 'klein'] },
  { id: 's82', text: 'Der Film war {blank}.', answer: 'langweilig', translation: 'The film was boring.', level: 'A2', tags: ['adjective'], distractors: ['spannend', 'gut', 'kurz'] },

  // ---- Perfekt (past) ----
  { id: 's83', text: 'Ich habe einen Kuchen {blank}.', answer: 'gebacken', translation: 'I baked a cake.', level: 'A2', tags: ['perfekt'], distractors: ['backen', 'backe', 'gebackt'] },
  { id: 's84', text: 'Wir {blank} nach Italien gefahren.', answer: 'sind', translation: 'We travelled to Italy.', level: 'A2', tags: ['perfekt'], distractors: ['haben', 'sein', 'ist'] },
  { id: 's85', text: 'Sie hat viel {blank}.', answer: 'gelernt', translation: 'She studied a lot.', level: 'A2', tags: ['perfekt'], distractors: ['lernen', 'lernt', 'gelernen'] },
  { id: 's86', text: 'Er ist müde, weil er nicht {blank} hat.', answer: 'geschlafen', translation: 'He is tired because he did not sleep.', level: 'A2', tags: ['perfekt'], distractors: ['schlafen', 'schläft', 'geschlaft'] },
  { id: 's87', text: 'Hast du das Buch {blank}?', answer: 'gelesen', translation: 'Have you read the book?', level: 'A2', tags: ['perfekt'], distractors: ['lesen', 'liest', 'gelest'] },
  { id: 's88', text: 'Gestern habe ich Fußball {blank}.', answer: 'gespielt', translation: 'Yesterday I played football.', level: 'A2', tags: ['perfekt'], distractors: ['spielen', 'spielt', 'gespielen'] },
];
