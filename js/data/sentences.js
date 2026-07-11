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

  // ---- Present tense (more verbs) ----
  { id: 's89', text: 'Ich {blank} jeden Tag Deutsch.', answer: 'lerne', translation: 'I learn German every day.', level: 'A1', tags: ['verb'], distractors: ['lernst', 'lernt', 'lernen'] },
  { id: 's90', text: 'Er {blank} gern Musik.', answer: 'hört', translation: 'He likes listening to music.', level: 'A1', tags: ['verb'], distractors: ['höre', 'hörst', 'hören'] },
  { id: 's91', text: 'Wir {blank} einen Film.', answer: 'sehen', translation: 'We watch a film.', level: 'A1', tags: ['verb'], distractors: ['sehe', 'siehst', 'sieht'] },
  { id: 's92', text: 'Das Kind {blank} sehr schnell.', answer: 'läuft', translation: 'The child runs very fast.', level: 'A1', tags: ['verb'], distractors: ['laufe', 'läufst', 'laufen'] },
  { id: 's93', text: 'Sie {blank} ein schönes Lied.', answer: 'singt', translation: 'She sings a beautiful song.', level: 'A1', tags: ['verb'], distractors: ['singe', 'singst', 'singen'] },
  { id: 's94', text: 'Ihr {blank} zu viel Kaffee.', answer: 'trinkt', translation: 'You (pl.) drink too much coffee.', level: 'A1', tags: ['verb'], distractors: ['trinke', 'trinkst', 'trinken'] },
  { id: 's95', text: 'Ich {blank} meine Oma.', answer: 'besuche', translation: 'I visit my grandma.', level: 'A1', tags: ['verb'], distractors: ['besuchst', 'besucht', 'besuchen'] },
  { id: 's96', text: 'Der Lehrer {blank} eine Frage.', answer: 'stellt', translation: 'The teacher asks a question.', level: 'A1', tags: ['verb'], distractors: ['stelle', 'stellst', 'stellen'] },
  { id: 's97', text: 'Wir {blank} im Park.', answer: 'spielen', translation: 'We play in the park.', level: 'A1', tags: ['verb'], distractors: ['spiele', 'spielst', 'spielt'] },
  { id: 's98', text: 'Du {blank} zu schnell.', answer: 'fährst', translation: 'You drive too fast.', level: 'A1', tags: ['verb'], distractors: ['fahre', 'fährt', 'fahren'] },

  // ---- Articles & nouns ----
  { id: 's99', text: 'Ich sehe {blank} Hund im Garten.', answer: 'einen', translation: 'I see a dog in the garden.', level: 'A1', tags: ['akkusativ'], distractors: ['ein', 'eine', 'einem'] },
  { id: 's100', text: '{blank} Sonne scheint heute.', answer: 'Die', translation: 'The sun is shining today.', level: 'A1', tags: ['nominativ'], distractors: ['Der', 'Das', 'Den'] },
  { id: 's101', text: '{blank} Auto ist sehr teuer.', answer: 'Das', translation: 'The car is very expensive.', level: 'A1', tags: ['nominativ'], distractors: ['Der', 'Die', 'Den'] },
  { id: 's102', text: 'Ich gebe {blank} Kind einen Apfel.', answer: 'dem', translation: 'I give the child an apple.', level: 'A2', tags: ['dativ'], distractors: ['das', 'der', 'den'] },
  { id: 's103', text: 'Wir fahren mit {blank} Bus.', answer: 'dem', translation: 'We travel by bus.', level: 'A2', tags: ['dativ'], distractors: ['der', 'den', 'das'] },
  { id: 's104', text: 'Das ist das Haus {blank} Frau.', answer: 'der', translation: "That is the woman's house.", level: 'A2', tags: ['genitiv'], distractors: ['die', 'den', 'dem'] },

  // ---- Prepositions ----
  { id: 's105', text: 'Das Buch liegt {blank} dem Tisch.', answer: 'auf', translation: 'The book is on the table.', level: 'A1', tags: ['präposition'], distractors: ['in', 'an', 'unter'] },
  { id: 's106', text: 'Die Katze ist {blank} dem Stuhl.', answer: 'unter', translation: 'The cat is under the chair.', level: 'A1', tags: ['präposition'], distractors: ['auf', 'über', 'neben'] },
  { id: 's107', text: 'Wir gehen {blank} die Schule.', answer: 'in', translation: 'We go into the school.', level: 'A1', tags: ['präposition'], distractors: ['auf', 'an', 'zu'] },
  { id: 's108', text: 'Ich warte {blank} den Bus.', answer: 'auf', translation: 'I am waiting for the bus.', level: 'A2', tags: ['präposition'], distractors: ['für', 'an', 'um'] },
  { id: 's109', text: 'Das Bild hängt {blank} der Wand.', answer: 'an', translation: 'The picture hangs on the wall.', level: 'A1', tags: ['präposition'], distractors: ['auf', 'in', 'unter'] },
  { id: 's110', text: 'Sie kommt {blank} Deutschland.', answer: 'aus', translation: 'She comes from Germany.', level: 'A1', tags: ['präposition'], distractors: ['von', 'nach', 'zu'] },
  { id: 's111', text: 'Wir fahren {blank} Berlin.', answer: 'nach', translation: 'We are going to Berlin.', level: 'A1', tags: ['präposition'], distractors: ['zu', 'in', 'auf'] },
  { id: 's112', text: 'Ich gehe {blank} Arzt.', answer: 'zum', translation: 'I am going to the doctor.', level: 'A2', tags: ['präposition'], distractors: ['zur', 'nach', 'in'] },

  // ---- Modal verbs ----
  { id: 's113', text: 'Ich {blank} nach Hause gehen.', answer: 'muss', translation: 'I have to go home.', level: 'A1', tags: ['modal'], distractors: ['musst', 'müssen', 'muß'] },
  { id: 's114', text: 'Wir {blank} gut schwimmen.', answer: 'können', translation: 'We can swim well.', level: 'A1', tags: ['modal'], distractors: ['kann', 'kannst', 'könnt'] },
  { id: 's115', text: 'Du {blank} mehr lernen.', answer: 'sollst', translation: 'You should study more.', level: 'A1', tags: ['modal'], distractors: ['soll', 'sollt', 'sollen'] },
  { id: 's116', text: 'Er {blank} ein Eis essen.', answer: 'will', translation: 'He wants to eat an ice cream.', level: 'A1', tags: ['modal'], distractors: ['willst', 'wollen', 'wollt'] },
  { id: 's117', text: 'Ich {blank} Deutsch sprechen.', answer: 'möchte', translation: 'I would like to speak German.', level: 'A1', tags: ['modal'], distractors: ['möchtest', 'möchten', 'mag'] },
  { id: 's118', text: '{blank} ich das Fenster öffnen?', answer: 'Darf', translation: 'May I open the window?', level: 'A2', tags: ['modal'], distractors: ['Darfst', 'Dürfen', 'Dürft'] },

  // ---- Questions ----
  { id: 's119', text: '{blank} heißt du?', answer: 'Wie', translation: 'What is your name?', level: 'A1', tags: ['frage'], distractors: ['Wer', 'Was', 'Wo'] },
  { id: 's120', text: '{blank} wohnst du?', answer: 'Wo', translation: 'Where do you live?', level: 'A1', tags: ['frage'], distractors: ['Wie', 'Wann', 'Wer'] },
  { id: 's121', text: '{blank} kommt der Zug?', answer: 'Wann', translation: 'When does the train come?', level: 'A1', tags: ['frage'], distractors: ['Wo', 'Wie', 'Was'] },
  { id: 's122', text: '{blank} ist dein Bruder?', answer: 'Wer', translation: 'Who is your brother?', level: 'A1', tags: ['frage'], distractors: ['Wie', 'Was', 'Wo'] },
  { id: 's123', text: '{blank} kostet das Brot?', answer: 'Was', translation: 'What does the bread cost?', level: 'A1', tags: ['frage'], distractors: ['Wie', 'Wer', 'Wo'] },
  { id: 's124', text: '{blank} viele Bücher hast du?', answer: 'Wie', translation: 'How many books do you have?', level: 'A2', tags: ['frage'], distractors: ['Was', 'Wo', 'Wer'] },
  { id: 's125', text: '{blank} bist du traurig?', answer: 'Warum', translation: 'Why are you sad?', level: 'A2', tags: ['frage'], distractors: ['Wann', 'Wie', 'Wo'] },

  // ---- Adjectives & everyday ----
  { id: 's126', text: 'Der Kaffee ist zu {blank}.', answer: 'heiß', translation: 'The coffee is too hot.', level: 'A1', tags: ['adjektiv'], distractors: ['kalt', 'süß', 'laut'] },
  { id: 's127', text: 'Meine Wohnung ist sehr {blank}.', answer: 'klein', translation: 'My flat is very small.', level: 'A1', tags: ['adjektiv'], distractors: ['groß', 'schnell', 'müde'] },
  { id: 's128', text: 'Das Wetter ist heute {blank}.', answer: 'schön', translation: 'The weather is nice today.', level: 'A1', tags: ['adjektiv'], distractors: ['schlecht', 'laut', 'teuer'] },
  { id: 's129', text: 'Der Film war sehr {blank}.', answer: 'langweilig', translation: 'The film was very boring.', level: 'A2', tags: ['adjektiv'], distractors: ['spannend', 'schnell', 'kalt'] },
  { id: 's130', text: 'Meine Schwester ist sehr {blank}.', answer: 'nett', translation: 'My sister is very nice.', level: 'A1', tags: ['adjektiv'], distractors: ['böse', 'kalt', 'nass'] },

  // ---- Time & daily routine ----
  { id: 's131', text: 'Ich stehe um sieben Uhr {blank}.', answer: 'auf', translation: 'I get up at seven o’clock.', level: 'A2', tags: ['trennbar'], distractors: ['an', 'ab', 'aus'] },
  { id: 's132', text: 'Am Morgen {blank} ich Kaffee.', answer: 'trinke', translation: 'In the morning I drink coffee.', level: 'A1', tags: ['verb'], distractors: ['trinkst', 'trinkt', 'trinken'] },
  { id: 's133', text: 'Heute ist {blank}.', answer: 'Montag', translation: 'Today is Monday.', level: 'A1', tags: ['zeit'], distractors: ['Januar', 'Sommer', 'Uhr'] },
  { id: 's134', text: 'Im {blank} ist es kalt.', answer: 'Winter', translation: 'In winter it is cold.', level: 'A1', tags: ['zeit'], distractors: ['Sommer', 'Montag', 'Morgen'] },
  { id: 's135', text: 'Wir treffen uns am {blank}.', answer: 'Wochenende', translation: 'We meet at the weekend.', level: 'A2', tags: ['zeit'], distractors: ['Winter', 'Uhr', 'Jahr'] },

  // ---- Perfekt (past) ----
  { id: 's136', text: 'Ich habe einen Brief {blank}.', answer: 'geschrieben', translation: 'I wrote a letter.', level: 'A2', tags: ['perfekt'], distractors: ['schreiben', 'schreibt', 'geschreibt'] },
  { id: 's137', text: 'Wir haben Pizza {blank}.', answer: 'gegessen', translation: 'We ate pizza.', level: 'A2', tags: ['perfekt'], distractors: ['essen', 'isst', 'geesst'] },
  { id: 's138', text: 'Sie ist nach Hause {blank}.', answer: 'gegangen', translation: 'She went home.', level: 'A2', tags: ['perfekt'], distractors: ['gehen', 'geht', 'gegeht'] },
  { id: 's139', text: 'Er hat den ganzen Tag {blank}.', answer: 'gearbeitet', translation: 'He worked all day.', level: 'A2', tags: ['perfekt'], distractors: ['arbeiten', 'arbeitet', 'gearbeit'] },
  { id: 's140', text: 'Ich habe dich {blank}.', answer: 'gesehen', translation: 'I saw you.', level: 'A2', tags: ['perfekt'], distractors: ['sehen', 'sieht', 'geseht'] },

  // ---- sein / haben ----
  { id: 's141', text: 'Wir {blank} sehr glücklich.', answer: 'sind', translation: 'We are very happy.', level: 'A1', tags: ['sein'], distractors: ['bin', 'bist', 'ist'] },
  { id: 's142', text: 'Ihr {blank} zu spät.', answer: 'seid', translation: 'You (pl.) are too late.', level: 'A1', tags: ['sein'], distractors: ['sind', 'seit', 'bist'] },
  { id: 's143', text: 'Sie {blank} einen großen Hund.', answer: 'haben', translation: 'They have a big dog.', level: 'A1', tags: ['haben'], distractors: ['habt', 'hat', 'habe'] },
  { id: 's144', text: 'Ich {blank} zwei Schwestern.', answer: 'habe', translation: 'I have two sisters.', level: 'A1', tags: ['haben'], distractors: ['hast', 'hat', 'haben'] },
  { id: 's145', text: 'Er {blank} heute Geburtstag.', answer: 'hat', translation: 'It is his birthday today.', level: 'A1', tags: ['haben'], distractors: ['habe', 'hast', 'haben'] },

  // ---- Dative verbs & pronouns ----
  { id: 's146', text: 'Das Buch gehört {blank}.', answer: 'mir', translation: 'The book belongs to me.', level: 'A2', tags: ['dativ'], distractors: ['mich', 'ich', 'mein'] },
  { id: 's147', text: 'Kannst du {blank} helfen?', answer: 'mir', translation: 'Can you help me?', level: 'A2', tags: ['dativ'], distractors: ['mich', 'ich', 'meiner'] },
  { id: 's148', text: 'Ich danke {blank} für das Geschenk.', answer: 'dir', translation: 'I thank you for the present.', level: 'A2', tags: ['dativ'], distractors: ['dich', 'du', 'deiner'] },

  // ---- Negation ----
  { id: 's149', text: 'Ich habe {blank} Zeit.', answer: 'keine', translation: 'I have no time.', level: 'A1', tags: ['negation'], distractors: ['kein', 'keinen', 'nicht'] },
  { id: 's150', text: 'Das ist {blank} gut.', answer: 'nicht', translation: 'That is not good.', level: 'A1', tags: ['negation'], distractors: ['kein', 'keine', 'nichts'] },
  { id: 's151', text: 'Er hat {blank} Auto.', answer: 'kein', translation: 'He has no car.', level: 'A1', tags: ['negation'], distractors: ['keine', 'keinen', 'nicht'] },

  // ---- Comparatives ----
  { id: 's152', text: 'Mein Bruder ist {blank} als ich.', answer: 'größer', translation: 'My brother is taller than me.', level: 'A2', tags: ['komparativ'], distractors: ['groß', 'am größten', 'große'] },
  { id: 's153', text: 'Der Zug ist {blank} als das Auto.', answer: 'schneller', translation: 'The train is faster than the car.', level: 'A2', tags: ['komparativ'], distractors: ['schnell', 'schnelle', 'am schnellsten'] },
  { id: 's154', text: 'Heute ist es {blank} als gestern.', answer: 'wärmer', translation: 'Today it is warmer than yesterday.', level: 'A2', tags: ['komparativ'], distractors: ['warm', 'warme', 'am wärmsten'] },

  // ---- Possessives ----
  { id: 's155', text: 'Das ist {blank} Mutter.', answer: 'meine', translation: 'That is my mother.', level: 'A1', tags: ['possessiv'], distractors: ['mein', 'meinen', 'meiner'] },
  { id: 's156', text: 'Wo ist {blank} Vater?', answer: 'dein', translation: 'Where is your father?', level: 'A1', tags: ['possessiv'], distractors: ['deine', 'deinen', 'deiner'] },
  { id: 's157', text: 'Ich mag {blank} Haus.', answer: 'euer', translation: 'I like your (pl.) house.', level: 'A2', tags: ['possessiv'], distractors: ['eure', 'euren', 'eurem'] },

  // ---- Everyday sentences ----
  { id: 's158', text: 'Ich kaufe Brot im {blank}.', answer: 'Supermarkt', translation: 'I buy bread at the supermarket.', level: 'A1', tags: ['nomen'], distractors: ['Bahnhof', 'Garten', 'Fenster'] },
  { id: 's159', text: 'Der Zug fährt vom {blank} ab.', answer: 'Bahnhof', translation: 'The train departs from the station.', level: 'A2', tags: ['nomen'], distractors: ['Markt', 'Park', 'Haus'] },
  { id: 's160', text: 'Wir essen im {blank}.', answer: 'Restaurant', translation: 'We are eating at the restaurant.', level: 'A1', tags: ['nomen'], distractors: ['Schule', 'Auto', 'Buch'] },
  { id: 's161', text: 'Die Kinder gehen in die {blank}.', answer: 'Schule', translation: 'The children go to school.', level: 'A1', tags: ['nomen'], distractors: ['Stadt', 'Küche', 'Post'] },
  { id: 's162', text: 'Ich lese ein {blank}.', answer: 'Buch', translation: 'I am reading a book.', level: 'A1', tags: ['nomen'], distractors: ['Auto', 'Haus', 'Wasser'] },
  { id: 's163', text: 'Die {blank} scheint am Himmel.', answer: 'Sonne', translation: 'The sun shines in the sky.', level: 'A1', tags: ['nomen'], distractors: ['Wolke', 'Blume', 'Stadt'] },
  { id: 's164', text: 'Der {blank} bellt laut.', answer: 'Hund', translation: 'The dog barks loudly.', level: 'A1', tags: ['nomen'], distractors: ['Katze', 'Vogel', 'Fisch'] },
  { id: 's165', text: 'Ich trinke ein Glas {blank}.', answer: 'Wasser', translation: 'I drink a glass of water.', level: 'A1', tags: ['nomen'], distractors: ['Brot', 'Käse', 'Apfel'] },
  { id: 's166', text: 'Am Abend sehe ich {blank}.', answer: 'fern', translation: 'In the evening I watch TV.', level: 'A2', tags: ['trennbar'], distractors: ['auf', 'an', 'aus'] },
  { id: 's167', text: 'Ich rufe meine Freundin {blank}.', answer: 'an', translation: 'I call my friend.', level: 'A2', tags: ['trennbar'], distractors: ['auf', 'aus', 'ab'] },
  { id: 's168', text: 'Bitte mach das Fenster {blank}.', answer: 'zu', translation: 'Please close the window.', level: 'A2', tags: ['trennbar'], distractors: ['auf', 'an', 'ab'] },
];
