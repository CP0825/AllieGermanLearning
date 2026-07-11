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

  // ---- Café & food ----
  { id: 's169', text: 'Können wir bitte die {blank} haben?', answer: 'Rechnung', translation: 'Can we have the bill please?', level: 'A2', tags: ['noun', 'everyday'], distractors: ['Speisekarte', 'Gabel', 'Serviette'] },
  { id: 's170', text: 'Ich hätte gern ein Stück {blank}.', answer: 'Kuchen', translation: 'I would like a piece of cake.', level: 'A1', tags: ['noun', 'everyday'], distractors: ['Brot', 'Käse', 'Suppe'] },
  { id: 's171', text: 'Die Suppe schmeckt sehr {blank}.', answer: 'gut', translation: 'The soup tastes very good.', level: 'A1', tags: ['adjective'], distractors: ['schlecht', 'kalt', 'laut'] },
  { id: 's172', text: 'Ich nehme einen {blank} Salat.', answer: 'kleinen', translation: "I'll have a small salad.", level: 'A2', tags: ['adjective'], distractors: ['klein', 'kleine', 'kleiner'] },
  { id: 's173', text: 'Können Sie mir die {blank} bringen?', answer: 'Speisekarte', translation: 'Can you bring me the menu?', level: 'A2', tags: ['noun', 'everyday'], distractors: ['Rechnung', 'Gabel', 'Tasse'] },
  { id: 's174', text: 'Ich bin {blank}, lass uns essen.', answer: 'hungrig', translation: "I'm hungry, let's eat.", level: 'A1', tags: ['feelings'], distractors: ['durstig', 'müde', 'krank'] },
  { id: 's175', text: 'Hast du {blank}? Ich brauche ein Glas Wasser.', answer: 'Durst', translation: 'Are you thirsty? I need a glass of water.', level: 'A2', tags: ['noun', 'everyday'], distractors: ['Hunger', 'Angst', 'Zeit'] },
  { id: 's176', text: 'Die Kellnerin {blank} uns einen Tisch.', answer: 'zeigt', translation: 'The waitress shows us a table.', level: 'A2', tags: ['verb'], distractors: ['zeige', 'zeigst', 'zeigen'] },
  { id: 's177', text: 'Wir {blank} draußen auf der Terrasse.', answer: 'sitzen', translation: 'We sit outside on the terrace.', level: 'A2', tags: ['verb'], distractors: ['sitze', 'sitzt', 'sitzst'] },
  { id: 's178', text: 'Ich {blank} kein Fleisch, ich bin Vegetarierin.', answer: 'esse', translation: "I don't eat meat, I'm a vegetarian.", level: 'A1', tags: ['verb'], distractors: ['isst', 'esst', 'essen'] },
  { id: 's179', text: 'Bitte geben Sie mir {blank} Zucker.', answer: 'etwas', translation: 'Please give me some sugar.', level: 'A2', tags: ['everyday'], distractors: ['viele', 'wenig', 'einige'] },
  { id: 's180', text: 'Schmeckt dir das {blank}?', answer: 'Essen', translation: 'Do you like the food?', level: 'A1', tags: ['noun'], distractors: ['Trinken', 'Kochen', 'Backen'] },
  { id: 's181', text: 'Der Ober bringt uns die {blank}.', answer: 'Getränke', translation: 'The waiter brings us the drinks.', level: 'A2', tags: ['noun'], distractors: ['Teller', 'Messer', 'Löffel'] },
  { id: 's182', text: 'Ich {blank} das Fleisch mit Gemüse.', answer: 'bestelle', translation: 'I order the meat with vegetables.', level: 'A2', tags: ['verb'], distractors: ['bestellst', 'bestellt', 'bestellen'] },
  { id: 's183', text: 'Wir gehen heute Abend {blank}.', answer: 'essen', translation: "We're going out to eat tonight.", level: 'A1', tags: ['everyday'], distractors: ['trinken', 'kochen', 'backen'] },
  { id: 's184', text: 'Die Milch ist im {blank}.', answer: 'Kühlschrank', translation: 'The milk is in the fridge.', level: 'A1', tags: ['noun'], distractors: ['Ofen', 'Schrank', 'Regal'] },
  { id: 's185', text: 'Ich {blank} das Gemüse für das Abendessen.', answer: 'schneide', translation: 'I cut the vegetables for dinner.', level: 'A2', tags: ['verb'], distractors: ['schneidest', 'schneidet', 'schneiden'] },
  { id: 's186', text: 'Kannst du mir bitte das {blank} reichen?', answer: 'Salz', translation: 'Can you pass me the salt please?', level: 'A2', tags: ['noun', 'everyday'], distractors: ['Pfeffer', 'Zucker', 'Öl'] },
  { id: 's187', text: 'Das Brot ist noch {blank}.', answer: 'frisch', translation: 'The bread is still fresh.', level: 'A1', tags: ['adjective'], distractors: ['alt', 'hart', 'trocken'] },
  { id: 's188', text: 'Ich {blank} den Tisch für das Abendessen.', answer: 'decke', translation: 'I set the table for dinner.', level: 'A2', tags: ['verb'], distractors: ['deckst', 'deckt', 'decken'] },
  { id: 's189', text: 'Möchtest du noch {blank} Kaffee?', answer: 'mehr', translation: 'Would you like more coffee?', level: 'A1', tags: ['everyday'], distractors: ['viel', 'wenig', 'etwas'] },
  { id: 's190', text: 'Ich {blank} lieber Tee als Kaffee.', answer: 'mag', translation: 'I like tea more than coffee.', level: 'A1', tags: ['modal'], distractors: ['magst', 'mögen', 'mögt'] },
  { id: 's191', text: 'Die Pizza ist noch im {blank}.', answer: 'Ofen', translation: 'The pizza is still in the oven.', level: 'A1', tags: ['noun'], distractors: ['Kühlschrank', 'Topf', 'Schrank'] },
  { id: 's192', text: 'Wir kochen heute {blank}.', answer: 'zusammen', translation: "We're cooking together today.", level: 'A1', tags: ['everyday'], distractors: ['allein', 'schnell', 'spät'] },
  { id: 's193', text: 'Ich habe {blank} Hunger.', answer: 'großen', translation: 'I am very hungry.', level: 'A2', tags: ['adjective'], distractors: ['groß', 'große', 'großer'] },

  // ---- Shopping ----
  { id: 's194', text: 'Ich suche eine {blank} Jacke.', answer: 'neue', translation: "I'm looking for a new jacket.", level: 'A2', tags: ['adjective'], distractors: ['neuen', 'neuer', 'neues'] },
  { id: 's195', text: 'Wie viel {blank} dieser Rock?', answer: 'kostet', translation: 'How much does this skirt cost?', level: 'A1', tags: ['verb'], distractors: ['kosten', 'koste', 'kostest'] },
  { id: 's196', text: 'Haben Sie diese Größe in {blank}?', answer: 'Rot', translation: 'Do you have this size in red?', level: 'A1', tags: ['noun'], distractors: ['Blau', 'Grün', 'Gelb'] },
  { id: 's197', text: 'Kann ich das {blank}?', answer: 'anprobieren', translation: 'Can I try it on?', level: 'A2', tags: ['verb'], distractors: ['kaufen', 'probieren', 'anziehen'] },
  { id: 's198', text: 'Der Rock ist mir zu {blank}.', answer: 'eng', translation: 'The skirt is too tight for me.', level: 'A2', tags: ['adjective'], distractors: ['weit', 'kurz', 'lang'] },
  { id: 's199', text: 'Ich zahle mit {blank}.', answer: 'Karte', translation: "I'll pay by card.", level: 'A1', tags: ['noun', 'everyday'], distractors: ['Bargeld', 'Scheck', 'Münze'] },
  { id: 's200', text: 'Wo ist die {blank}?', answer: 'Kasse', translation: 'Where is the checkout?', level: 'A1', tags: ['noun'], distractors: ['Umkleide', 'Eingang', 'Ausgang'] },
  { id: 's201', text: 'Diese Hose ist im {blank}.', answer: 'Angebot', translation: 'These trousers are on sale.', level: 'A2', tags: ['noun'], distractors: ['Preis', 'Rabatt', 'Verkauf'] },
  { id: 's202', text: 'Ich brauche neue {blank}.', answer: 'Schuhe', translation: 'I need new shoes.', level: 'A1', tags: ['noun'], distractors: ['Hosen', 'Hemden', 'Socken'] },
  { id: 's203', text: 'Der Laden {blank} um zehn Uhr.', answer: 'öffnet', translation: 'The shop opens at ten o’clock.', level: 'A2', tags: ['verb'], distractors: ['schließt', 'öffne', 'öffnest'] },
  { id: 's204', text: 'Ich habe meine {blank} vergessen.', answer: 'Geldbörse', translation: 'I forgot my wallet.', level: 'A2', tags: ['noun'], distractors: ['Tasche', 'Karte', 'Brille'] },
  { id: 's205', text: 'Das ist mir zu {blank}.', answer: 'teuer', translation: "That's too expensive for me.", level: 'A1', tags: ['adjective'], distractors: ['billig', 'klein', 'groß'] },
  { id: 's206', text: 'Gibt es einen {blank} auf diesen Pullover?', answer: 'Rabatt', translation: 'Is there a discount on this sweater?', level: 'A2', tags: ['noun'], distractors: ['Preis', 'Verkauf', 'Kauf'] },
  { id: 's207', text: 'Ich möchte das Kleid {blank}.', answer: 'umtauschen', translation: 'I would like to exchange the dress.', level: 'A2', tags: ['verb'], distractors: ['kaufen', 'zeigen', 'tragen'] },
  { id: 's208', text: 'Die Verkäuferin {blank} mir sehr freundlich.', answer: 'hilft', translation: 'The saleswoman helps me very kindly.', level: 'A2', tags: ['verb', 'dativ'], distractors: ['helfe', 'hilfst', 'helfen'] },
  { id: 's209', text: 'Ich probiere die {blank} Jacke an.', answer: 'blaue', translation: 'I try on the blue jacket.', level: 'A2', tags: ['adjective'], distractors: ['blauen', 'blauer', 'blaues'] },
  { id: 's210', text: 'Dieses Geschäft {blank} sonntags geschlossen.', answer: 'ist', translation: 'This shop is closed on Sundays.', level: 'A1', tags: ['sein'], distractors: ['sind', 'bin', 'bist'] },
  { id: 's211', text: 'Ich kaufe ein Geschenk für {blank} Bruder.', answer: 'meinen', translation: "I'm buying a gift for my brother.", level: 'A2', tags: ['possessive', 'akk'], distractors: ['mein', 'meine', 'meiner'] },
  { id: 's212', text: 'Wo finde ich die {blank}?', answer: 'Umkleidekabine', translation: 'Where can I find the fitting room?', level: 'A2', tags: ['noun'], distractors: ['Kasse', 'Treppe', 'Toilette'] },
  { id: 's213', text: 'Ich nehme {blank} Paar Schuhe.', answer: 'dieses', translation: "I'll take this pair of shoes.", level: 'A2', tags: ['everyday'], distractors: ['diese', 'dieser', 'diesen'] },

  // ---- Directions & travel ----
  { id: 's214', text: 'Entschuldigung, wo ist der {blank}?', answer: 'Bahnhof', translation: 'Excuse me, where is the train station?', level: 'A1', tags: ['noun', 'question'], distractors: ['Flughafen', 'Markt', 'Park'] },
  { id: 's215', text: 'Gehen Sie {blank} bis zur Ampel.', answer: 'geradeaus', translation: 'Go straight ahead to the traffic light.', level: 'A2', tags: ['everyday'], distractors: ['links', 'rechts', 'zurück'] },
  { id: 's216', text: 'Biegen Sie an der Ecke {blank} ab.', answer: 'links', translation: 'Turn left at the corner.', level: 'A2', tags: ['everyday'], distractors: ['rechts', 'geradeaus', 'zurück'] },
  { id: 's217', text: 'Wie weit ist es bis {blank} Zentrum?', answer: 'zum', translation: 'How far is it to the center?', level: 'A2', tags: ['preposition'], distractors: ['zur', 'zu', 'ins'] },
  { id: 's218', text: 'Der Flug {blank} um neun Uhr.', answer: 'startet', translation: 'The flight departs at nine o’clock.', level: 'A2', tags: ['verb'], distractors: ['landet', 'fliegt', 'fährt'] },
  { id: 's219', text: 'Wir müssen am {blank} umsteigen.', answer: 'Bahnhof', translation: 'We have to change trains at the station.', level: 'A2', tags: ['noun'], distractors: ['Flughafen', 'Hafen', 'Platz'] },
  { id: 's220', text: 'Die nächste {blank} ist Hauptbahnhof.', answer: 'Haltestelle', translation: 'The next stop is the main station.', level: 'A2', tags: ['noun'], distractors: ['Straße', 'Kreuzung', 'Brücke'] },
  { id: 's221', text: 'Ich habe mein {blank} verloren.', answer: 'Ticket', translation: 'I lost my ticket.', level: 'A1', tags: ['noun'], distractors: ['Gepäck', 'Pass', 'Handy'] },
  { id: 's222', text: 'Wo kann ich ein Taxi {blank}?', answer: 'nehmen', translation: 'Where can I take a taxi?', level: 'A2', tags: ['verb'], distractors: ['fahren', 'gehen', 'laufen'] },
  { id: 's223', text: 'Der Zug {blank} zehn Minuten Verspätung.', answer: 'hat', translation: 'The train is ten minutes late.', level: 'A2', tags: ['haben'], distractors: ['ist', 'sind', 'habe'] },
  { id: 's224', text: 'Können Sie mir den Weg {blank}?', answer: 'zeigen', translation: 'Can you show me the way?', level: 'A2', tags: ['verb'], distractors: ['sagen', 'geben', 'bringen'] },
  { id: 's225', text: 'Ich {blank} mich in dieser Stadt nicht aus.', answer: 'kenne', translation: "I don't know my way around this city.", level: 'A2', tags: ['verb'], distractors: ['kennst', 'kennt', 'kennen'] },
  { id: 's226', text: 'Wir sind mit dem {blank} nach München gefahren.', answer: 'Zug', translation: 'We travelled to Munich by train.', level: 'A2', tags: ['noun'], distractors: ['Bus', 'Auto', 'Flugzeug'] },
  { id: 's227', text: 'Der Koffer ist sehr {blank}.', answer: 'schwer', translation: 'The suitcase is very heavy.', level: 'A1', tags: ['adjective'], distractors: ['leicht', 'klein', 'groß'] },
  { id: 's228', text: 'Ich muss meinen {blank} zeigen.', answer: 'Pass', translation: 'I have to show my passport.', level: 'A2', tags: ['noun'], distractors: ['Koffer', 'Schlüssel', 'Ticket'] },
  { id: 's229', text: 'Wann {blank} das Flugzeug?', answer: 'landet', translation: 'When does the plane land?', level: 'A2', tags: ['verb', 'question'], distractors: ['fliegt', 'startet', 'fährt'] },
  { id: 's230', text: 'Die Straße ist heute sehr {blank}.', answer: 'voll', translation: 'The street is very busy today.', level: 'A1', tags: ['adjective'], distractors: ['leer', 'ruhig', 'eng'] },
  { id: 's231', text: 'Wir haben ein Hotelzimmer {blank}.', answer: 'reserviert', translation: 'We reserved a hotel room.', level: 'A2', tags: ['perfekt'], distractors: ['buchen', 'bucht', 'reservieren'] },
  { id: 's232', text: 'Ich {blank} eine Landkarte, um den Weg zu finden.', answer: 'brauche', translation: 'I need a map to find the way.', level: 'A2', tags: ['verb'], distractors: ['brauchst', 'braucht', 'brauchen'] },
  { id: 's233', text: 'Entschuldigung, {blank} Sie mir bitte helfen?', answer: 'können', translation: 'Excuse me, could you please help me?', level: 'A2', tags: ['modal'], distractors: ['kann', 'kannst', 'könnt'] },

  // ---- Small talk & greetings ----
  { id: 's234', text: 'Schön, dich {blank} zu sehen!', answer: 'wieder', translation: 'Nice to see you again!', level: 'A2', tags: ['phrase'], distractors: ['schon', 'noch', 'auch'] },
  { id: 's235', text: 'Wie war dein {blank}?', answer: 'Wochenende', translation: 'How was your weekend?', level: 'A1', tags: ['noun'], distractors: ['Tag', 'Urlaub', 'Abend'] },
  { id: 's236', text: 'Es {blank} mich, dich zu treffen.', answer: 'freut', translation: 'It’s nice to meet you.', level: 'A2', tags: ['verb'], distractors: ['freue', 'freust', 'freuen'] },
  { id: 's237', text: 'Bis {blank}!', answer: 'später', translation: 'See you later!', level: 'A1', tags: ['phrase'], distractors: ['morgen', 'bald', 'gleich'] },
  { id: 's238', text: 'Wir {blank} uns lange nicht gesehen.', answer: 'haben', translation: "We haven't seen each other in a long time.", level: 'A2', tags: ['perfekt'], distractors: ['sind', 'sein', 'hat'] },
  { id: 's239', text: 'Das {blank} mir wirklich leid.', answer: 'tut', translation: "I'm really sorry about that.", level: 'A2', tags: ['phrase'], distractors: ['macht', 'geht', 'ist'] },
  { id: 's240', text: 'Alles {blank} zum Geburtstag!', answer: 'Gute', translation: 'Happy birthday!', level: 'A1', tags: ['phrase'], distractors: ['Beste', 'Schöne', 'Liebe'] },
  { id: 's241', text: 'Wie geht es {blank} Familie?', answer: 'deiner', translation: 'How is your family doing?', level: 'A2', tags: ['possessive', 'dativ'], distractors: ['dein', 'deine', 'deinen'] },
  { id: 's242', text: 'Ich hoffe, es {blank} dir gut.', answer: 'geht', translation: 'I hope you are doing well.', level: 'A1', tags: ['phrase'], distractors: ['gehst', 'gehen', 'ist'] },
  { id: 's243', text: 'Grüß dich, wie {blank} es?', answer: 'geht', translation: "Hi, how's it going?", level: 'A1', tags: ['phrase'], distractors: ['gehst', 'gehen', 'ist'] },
  { id: 's244', text: 'Entschuldigung, {blank} spät ich bin.', answer: 'dass', translation: "Sorry that I'm late.", level: 'A2', tags: ['everyday'], distractors: ['weil', 'wenn', 'ob'] },
  { id: 's245', text: 'Das ist wirklich {blank} von dir.', answer: 'nett', translation: "That's really nice of you.", level: 'A1', tags: ['adjective'], distractors: ['gut', 'schön', 'lieb'] },
  { id: 's246', text: 'Ich freue mich {blank} das Wochenende.', answer: 'auf', translation: "I'm looking forward to the weekend.", level: 'A2', tags: ['preposition'], distractors: ['für', 'über', 'an'] },
  { id: 's247', text: 'Herzlichen {blank}!', answer: 'Glückwunsch', translation: 'Congratulations!', level: 'A1', tags: ['phrase'], distractors: ['Dank', 'Gruß', 'Willkommen'] },
  { id: 's248', text: 'Mach\'s {blank}!', answer: 'gut', translation: 'Take care!', level: 'A1', tags: ['phrase'], distractors: ['schön', 'bald', 'schnell'] },

  // ---- Home & daily routine ----
  { id: 's249', text: 'Ich {blank} jeden Morgen die Zähne.', answer: 'putze', translation: 'I brush my teeth every morning.', level: 'A1', tags: ['verb'], distractors: ['putzt', 'putzst', 'putzen'] },
  { id: 's250', text: 'Nach der Arbeit {blank} ich mich aus.', answer: 'ruhe', translation: 'After work I rest.', level: 'A2', tags: ['verb'], distractors: ['ruhst', 'ruht', 'ruhen'] },
  { id: 's251', text: 'Ich {blank} die Wohnung jeden Samstag auf.', answer: 'räume', translation: 'I tidy up the flat every Saturday.', level: 'A2', tags: ['separable'], distractors: ['räumst', 'räumt', 'räumen'] },
  { id: 's252', text: 'Ich {blank} das Geschirr nach dem Essen.', answer: 'spüle', translation: 'I wash the dishes after eating.', level: 'A2', tags: ['verb'], distractors: ['spülst', 'spült', 'spülen'] },
  { id: 's253', text: 'Er {blank} den Müll raus.', answer: 'bringt', translation: 'He takes out the trash.', level: 'A2', tags: ['separable'], distractors: ['bringst', 'bringe', 'bringen'] },
  { id: 's254', text: 'Wir {blank} das Bett jeden Morgen.', answer: 'machen', translation: 'We make the bed every morning.', level: 'A1', tags: ['verb'], distractors: ['macht', 'machst', 'mache'] },
  { id: 's255', text: 'Ich {blank} die Wäsche in die Maschine.', answer: 'lege', translation: 'I put the laundry in the machine.', level: 'A2', tags: ['verb'], distractors: ['legst', 'legt', 'legen'] },
  { id: 's256', text: 'Das Sofa steht {blank} Wohnzimmer.', answer: 'im', translation: 'The sofa is in the living room.', level: 'A1', tags: ['preposition'], distractors: ['in', 'am', 'auf'] },
  { id: 's257', text: 'Ich {blank} die Pflanzen jeden Tag.', answer: 'gieße', translation: 'I water the plants every day.', level: 'A2', tags: ['verb'], distractors: ['gießt', 'gießst', 'gießen'] },
  { id: 's258', text: 'Die Fenster sind sehr {blank}.', answer: 'schmutzig', translation: 'The windows are very dirty.', level: 'A1', tags: ['adjective'], distractors: ['sauber', 'klar', 'neu'] },
  { id: 's259', text: 'Ich {blank} um sechs Uhr nach Hause.', answer: 'komme', translation: 'I come home at six o’clock.', level: 'A1', tags: ['verb'], distractors: ['kommst', 'kommt', 'kommen'] },
  { id: 's260', text: 'Wir {blank} das Abendessen zusammen vor.', answer: 'bereiten', translation: 'We prepare dinner together.', level: 'A2', tags: ['separable'], distractors: ['bereitest', 'bereitet', 'bereite'] },
  { id: 's261', text: 'Der Schlüssel liegt auf dem {blank}.', answer: 'Tisch', translation: 'The key is lying on the table.', level: 'A1', tags: ['noun'], distractors: ['Stuhl', 'Regal', 'Boden'] },
  { id: 's262', text: 'Ich {blank} das Licht aus, bevor ich schlafe.', answer: 'mache', translation: 'I turn off the light before I sleep.', level: 'A2', tags: ['separable'], distractors: ['machst', 'macht', 'machen'] },
  { id: 's263', text: 'Meine Nachbarn sind sehr {blank}.', answer: 'laut', translation: 'My neighbors are very loud.', level: 'A1', tags: ['adjective'], distractors: ['leise', 'ruhig', 'nett'] },
  { id: 's264', text: 'Ich dusche jeden {blank}.', answer: 'Morgen', translation: 'I shower every morning.', level: 'A1', tags: ['noun'], distractors: ['Abend', 'Tag', 'Nacht'] },
  { id: 's265', text: 'Die Heizung {blank} im Winter.', answer: 'läuft', translation: 'The heating runs in winter.', level: 'A2', tags: ['verb'], distractors: ['läufst', 'laufe', 'laufen'] },
  { id: 's266', text: 'Ich {blank} meine Kleidung in den Schrank.', answer: 'hänge', translation: 'I hang my clothes in the closet.', level: 'A2', tags: ['verb'], distractors: ['hängst', 'hängt', 'hängen'] },
  { id: 's267', text: 'Wir {blank} am Wochenende im Garten.', answer: 'arbeiten', translation: 'We work in the garden on weekends.', level: 'A1', tags: ['verb'], distractors: ['arbeitet', 'arbeitest', 'arbeite'] },
  { id: 's268', text: 'Das Badezimmer ist neben der {blank}.', answer: 'Küche', translation: 'The bathroom is next to the kitchen.', level: 'A1', tags: ['noun'], distractors: ['Schlafzimmer', 'Wohnzimmer', 'Diele'] },

  // ---- Work ----
  { id: 's269', text: 'Ich {blank} von neun bis fünf Uhr.', answer: 'arbeite', translation: 'I work from nine to five.', level: 'A1', tags: ['verb'], distractors: ['arbeitest', 'arbeitet', 'arbeiten'] },
  { id: 's270', text: 'Mein Chef ist sehr {blank}.', answer: 'streng', translation: 'My boss is very strict.', level: 'A2', tags: ['adjective'], distractors: ['nett', 'freundlich', 'locker'] },
  { id: 's271', text: 'Ich habe heute ein wichtiges {blank}.', answer: 'Meeting', translation: 'I have an important meeting today.', level: 'A2', tags: ['noun'], distractors: ['Projekt', 'Gespräch', 'Treffen'] },
  { id: 's272', text: 'Wir {blank} ein neues Projekt.', answer: 'starten', translation: 'We are starting a new project.', level: 'A2', tags: ['verb'], distractors: ['beenden', 'planen', 'stoppen'] },
  { id: 's273', text: 'Ich muss diese E-Mail noch {blank}.', answer: 'senden', translation: 'I still need to send this email.', level: 'A2', tags: ['verb'], distractors: ['schreiben', 'lesen', 'löschen'] },
  { id: 's274', text: 'Der Kollege {blank} mir bei der Arbeit.', answer: 'hilft', translation: 'The colleague helps me with the work.', level: 'A2', tags: ['verb', 'dativ'], distractors: ['helfe', 'hilfst', 'helfen'] },
  { id: 's275', text: 'Ich habe {blank} viel zu tun.', answer: 'heute', translation: 'I have a lot to do today.', level: 'A1', tags: ['everyday'], distractors: ['gestern', 'morgen', 'bald'] },
  { id: 's276', text: 'Die Besprechung {blank} um zehn Uhr.', answer: 'beginnt', translation: 'The meeting starts at ten o’clock.', level: 'A2', tags: ['verb'], distractors: ['beginne', 'beginnst', 'beginnen'] },
  { id: 's277', text: 'Ich brauche einen {blank} Tag frei.', answer: 'freien', translation: 'I need a day off.', level: 'A2', tags: ['adjective'], distractors: ['frei', 'freie', 'freier'] },
  { id: 's278', text: 'Wir {blank} das Ziel bis Freitag erreichen.', answer: 'müssen', translation: 'We must reach the goal by Friday.', level: 'A2', tags: ['modal'], distractors: ['muss', 'musst', 'müsst'] },
  { id: 's279', text: 'Ich bin mit meiner {blank} sehr zufrieden.', answer: 'Arbeit', translation: 'I am very satisfied with my work.', level: 'A2', tags: ['noun'], distractors: ['Chef', 'Kollege', 'Projekt'] },
  { id: 's280', text: 'Der Bericht ist noch nicht {blank}.', answer: 'fertig', translation: 'The report is not finished yet.', level: 'A2', tags: ['adjective'], distractors: ['neu', 'lang', 'kurz'] },
  { id: 's281', text: 'Ich habe eine neue {blank} bekommen.', answer: 'Stelle', translation: 'I got a new job.', level: 'A2', tags: ['noun'], distractors: ['Firma', 'Arbeit', 'Aufgabe'] },
  { id: 's282', text: 'Wir arbeiten heute im {blank}.', answer: 'Büro', translation: 'We are working in the office today.', level: 'A1', tags: ['noun'], distractors: ['Zuhause', 'Haus', 'Garten'] },
  { id: 's283', text: 'Ich {blank} eine Pause um zwölf Uhr.', answer: 'mache', translation: 'I take a break at twelve o’clock.', level: 'A1', tags: ['verb'], distractors: ['machst', 'macht', 'machen'] },

  // ---- Feelings ----
  { id: 's284', text: 'Ich habe {blank} vor der Prüfung.', answer: 'Angst', translation: 'I am afraid of the exam.', level: 'A2', tags: ['noun', 'feelings'], distractors: ['Freude', 'Wut', 'Hunger'] },
  { id: 's285', text: 'Ich bin sehr {blank} auf die Reise.', answer: 'gespannt', translation: 'I am very excited about the trip.', level: 'A2', tags: ['feelings'], distractors: ['müde', 'traurig', 'böse'] },
  { id: 's286', text: 'Er ist {blank}, weil er die Prüfung bestanden hat.', answer: 'stolz', translation: 'He is proud because he passed the exam.', level: 'A2', tags: ['feelings'], distractors: ['traurig', 'müde', 'wütend'] },
  { id: 's287', text: 'Ich fühle mich heute nicht {blank}.', answer: 'gut', translation: "I don't feel well today.", level: 'A1', tags: ['feelings'], distractors: ['schlecht', 'krank', 'müde'] },
  { id: 's288', text: 'Sie ist {blank}, weil sie ihre Tasche verloren hat.', answer: 'wütend', translation: 'She is angry because she lost her bag.', level: 'A2', tags: ['feelings'], distractors: ['froh', 'ruhig', 'müde'] },
  { id: 's289', text: 'Ich bin ein bisschen {blank}, weil ich nicht geschlafen habe.', answer: 'müde', translation: "I am a bit tired because I didn't sleep.", level: 'A1', tags: ['feelings'], distractors: ['glücklich', 'wach', 'nervös'] },
  { id: 's290', text: 'Wir sind alle {blank} über die gute Nachricht.', answer: 'froh', translation: 'We are all happy about the good news.', level: 'A2', tags: ['feelings'], distractors: ['traurig', 'böse', 'müde'] },
  { id: 's291', text: 'Ich mache mir {blank} um dich.', answer: 'Sorgen', translation: 'I am worried about you.', level: 'A2', tags: ['noun', 'feelings'], distractors: ['Angst', 'Freude', 'Zeit'] },
  { id: 's292', text: 'Sie {blank} sich sehr über das Geschenk.', answer: 'freut', translation: 'She is very happy about the gift.', level: 'A2', tags: ['verb', 'feelings'], distractors: ['freue', 'freust', 'freuen'] },
  { id: 's293', text: 'Ich bin {blank} nervös vor dem Interview.', answer: 'sehr', translation: 'I am very nervous before the interview.', level: 'A2', tags: ['everyday'], distractors: ['wenig', 'kaum', 'etwas'] },
  { id: 's294', text: 'Das macht mich {blank}.', answer: 'traurig', translation: 'That makes me sad.', level: 'A1', tags: ['feelings'], distractors: ['glücklich', 'müde', 'wach'] },
  { id: 's295', text: 'Ich {blank} mich auf dich verlassen.', answer: 'kann', translation: 'I can rely on you.', level: 'A2', tags: ['modal'], distractors: ['muss', 'soll', 'will'] },
  { id: 's296', text: 'Er ist manchmal sehr {blank}.', answer: 'schüchtern', translation: 'He is sometimes very shy.', level: 'A2', tags: ['adjective'], distractors: ['mutig', 'laut', 'frech'] },
  { id: 's297', text: 'Ich vermisse meine {blank} sehr.', answer: 'Familie', translation: 'I miss my family a lot.', level: 'A1', tags: ['noun'], distractors: ['Freunde', 'Heimat', 'Schwester'] },
  { id: 's298', text: 'Es tut mir {blank}, dass ich zu spät bin.', answer: 'leid', translation: "I'm sorry that I'm late.", level: 'A2', tags: ['phrase'], distractors: ['weh', 'gut', 'schlecht'] },

  // ---- Phone & communication ----
  { id: 's299', text: 'Kannst du mich später {blank}?', answer: 'anrufen', translation: 'Can you call me later?', level: 'A2', tags: ['separable'], distractors: ['besuchen', 'treffen', 'sehen'] },
  { id: 's300', text: 'Mein Handy hat keinen {blank} mehr.', answer: 'Akku', translation: 'My phone has no more battery.', level: 'A2', tags: ['noun'], distractors: ['Strom', 'Ton', 'Speicher'] },
  { id: 's301', text: 'Ich {blank} dir eine Nachricht.', answer: 'schicke', translation: "I'll send you a message.", level: 'A1', tags: ['verb'], distractors: ['schickst', 'schickt', 'schicken'] },
  { id: 's302', text: 'Die Verbindung ist sehr {blank}.', answer: 'schlecht', translation: 'The connection is very bad.', level: 'A2', tags: ['adjective'], distractors: ['gut', 'schnell', 'stark'] },
  { id: 's303', text: 'Ich habe deine {blank} nicht gesehen.', answer: 'Nachricht', translation: "I didn't see your message.", level: 'A1', tags: ['noun'], distractors: ['Anruf', 'E-Mail', 'Post'] },
  { id: 's304', text: 'Kannst du bitte {blank} sprechen?', answer: 'lauter', translation: 'Can you please speak louder?', level: 'A2', tags: ['adjective'], distractors: ['leiser', 'schneller', 'langsamer'] },
  { id: 's305', text: 'Ich {blank} dich morgen zurück.', answer: 'rufe', translation: "I'll call you back tomorrow.", level: 'A2', tags: ['separable'], distractors: ['rufst', 'ruft', 'rufen'] },
  { id: 's306', text: 'Wir {blank} über WhatsApp.', answer: 'schreiben', translation: 'We write on WhatsApp.', level: 'A1', tags: ['verb'], distractors: ['schreibst', 'schreibt', 'schreibe'] },
  { id: 's307', text: 'Mein Handy ist kaputt {blank}.', answer: 'gegangen', translation: 'My phone broke.', level: 'A2', tags: ['perfekt'], distractors: ['gehen', 'geht', 'gegeht'] },
  { id: 's308', text: 'Ich habe {blank} Empfang hier.', answer: 'keinen', translation: 'I have no signal here.', level: 'A2', tags: ['negation'], distractors: ['kein', 'keine', 'nicht'] },
  { id: 's309', text: 'Bitte {blank} mir eine E-Mail.', answer: 'schreib', translation: 'Please write me an email.', level: 'A1', tags: ['everyday'], distractors: ['schreibst', 'schreibe', 'schreiben'] },
  { id: 's310', text: 'Ich warte auf deinen {blank}.', answer: 'Anruf', translation: "I'm waiting for your call.", level: 'A2', tags: ['noun'], distractors: ['Brief', 'Besuch', 'Nachricht'] },
  { id: 's311', text: 'Wir {blank} morgen früh telefonieren.', answer: 'können', translation: 'We can talk on the phone tomorrow morning.', level: 'A2', tags: ['modal'], distractors: ['kann', 'kannst', 'könnt'] },
  { id: 's312', text: 'Ich habe meine {blank} vergessen aufzuladen.', answer: 'Powerbank', translation: 'I forgot to charge my power bank.', level: 'A2', tags: ['noun'], distractors: ['Kopfhörer', 'Tasche', 'Uhr'] },
  { id: 's313', text: 'Er {blank} nie ans Telefon.', answer: 'geht', translation: 'He never answers the phone.', level: 'A2', tags: ['verb'], distractors: ['gehst', 'gehen', 'gehe'] },

  // ---- Plans & weekend ----
  { id: 's314', text: 'Was {blank} du am Wochenende?', answer: 'machst', translation: 'What are you doing this weekend?', level: 'A1', tags: ['verb', 'question'], distractors: ['macht', 'mache', 'machen'] },
  { id: 's315', text: 'Wir {blank} am Samstag ins Kino.', answer: 'gehen', translation: "We're going to the cinema on Saturday.", level: 'A1', tags: ['verb'], distractors: ['gehst', 'geht', 'gehe'] },
  { id: 's316', text: 'Ich habe {blank} keine Pläne für heute Abend.', answer: 'noch', translation: "I don't have any plans for tonight yet.", level: 'A2', tags: ['everyday'], distractors: ['schon', 'auch', 'nur'] },
  { id: 's317', text: 'Nächste Woche {blank} ich in Urlaub.', answer: 'fahre', translation: "Next week I'm going on vacation.", level: 'A1', tags: ['verb'], distractors: ['fährst', 'fährt', 'fahren'] },
  { id: 's318', text: 'Hast du {blank} für morgen etwas vor?', answer: 'schon', translation: 'Do you already have plans for tomorrow?', level: 'A2', tags: ['everyday'], distractors: ['noch', 'auch', 'nur'] },
  { id: 's319', text: 'Wir {blank} vielleicht später ins Restaurant.', answer: 'gehen', translation: 'We might go to the restaurant later.', level: 'A1', tags: ['verb'], distractors: ['geht', 'gehst', 'gehe'] },
  { id: 's320', text: 'Ich {blank} am Wochenende meine Eltern besuchen.', answer: 'möchte', translation: 'I would like to visit my parents this weekend.', level: 'A1', tags: ['modal'], distractors: ['möchtest', 'möchten', 'mag'] },
  { id: 's321', text: 'Lass uns {blank} zusammen kochen!', answer: 'heute', translation: "Let's cook together today!", level: 'A1', tags: ['everyday'], distractors: ['morgen', 'gestern', 'bald'] },
  { id: 's322', text: 'Wir planen eine Reise nach {blank}.', answer: 'Spanien', translation: 'We are planning a trip to Spain.', level: 'A1', tags: ['noun'], distractors: ['Frankreich', 'Italien', 'Portugal'] },
  { id: 's323', text: 'Am Sonntag {blank} wir lange aus.', answer: 'schlafen', translation: 'On Sunday we sleep in.', level: 'A2', tags: ['verb'], distractors: ['schläfst', 'schläft', 'schlafe'] },
  { id: 's324', text: 'Ich habe keine {blank}, was ich heute tun soll.', answer: 'Ahnung', translation: 'I have no idea what to do today.', level: 'A2', tags: ['noun'], distractors: ['Zeit', 'Lust', 'Idee'] },
  { id: 's325', text: 'Ich habe {blank} Lust auf ein Picknick.', answer: 'große', translation: 'I really feel like having a picnic.', level: 'A2', tags: ['adjective'], distractors: ['groß', 'großen', 'großer'] },
  { id: 's326', text: 'Triffst du dich heute mit {blank} Freunden?', answer: 'deinen', translation: 'Are you meeting with your friends today?', level: 'A2', tags: ['possessive'], distractors: ['dein', 'deine', 'deiner'] },
  { id: 's327', text: 'Wir {blank} das Wochenende am See.', answer: 'verbringen', translation: "We're spending the weekend at the lake.", level: 'A2', tags: ['verb'], distractors: ['verbringst', 'verbringt', 'verbrachten'] },
  { id: 's328', text: 'Ich freue mich schon {blank} den Urlaub.', answer: 'auf', translation: "I'm already looking forward to the vacation.", level: 'A2', tags: ['preposition'], distractors: ['für', 'über', 'an'] },

  // ---- Weather ----
  { id: 's329', text: 'Heute {blank} es sehr stark.', answer: 'regnet', translation: "Today it's raining heavily.", level: 'A1', tags: ['weather'], distractors: ['schneit', 'regnest', 'regnen'] },
  { id: 's330', text: 'Im {blank} schneit es oft.', answer: 'Winter', translation: 'In winter it often snows.', level: 'A1', tags: ['noun'], distractors: ['Sommer', 'Herbst', 'Frühling'] },
  { id: 's331', text: 'Es ist heute sehr {blank} draußen.', answer: 'windig', translation: 'It is very windy outside today.', level: 'A2', tags: ['adjective'], distractors: ['sonnig', 'wolkig', 'neblig'] },
  { id: 's332', text: 'Der Himmel ist heute ganz {blank}.', answer: 'bewölkt', translation: 'The sky is very cloudy today.', level: 'A2', tags: ['adjective'], distractors: ['klar', 'blau', 'sonnig'] },
  { id: 's333', text: 'Nimm einen Regenschirm, es {blank} bald.', answer: 'regnet', translation: 'Take an umbrella, it will rain soon.', level: 'A1', tags: ['weather'], distractors: ['schneit', 'friert', 'stürmt'] },
  { id: 's334', text: 'Im Sommer ist es meistens {blank}.', answer: 'warm', translation: 'In summer it is usually warm.', level: 'A1', tags: ['adjective'], distractors: ['kalt', 'kühl', 'nass'] },
  { id: 's335', text: 'Es {blank} draußen sehr kalt.', answer: 'ist', translation: 'It is very cold outside.', level: 'A1', tags: ['sein'], distractors: ['sind', 'bin', 'bist'] },
  { id: 's336', text: 'Die Temperatur {blank} heute auf zehn Grad.', answer: 'fällt', translation: 'The temperature drops to ten degrees today.', level: 'A2', tags: ['verb'], distractors: ['steigt', 'fällst', 'fallen'] },
  { id: 's337', text: 'Morgen soll die Sonne {blank}.', answer: 'scheinen', translation: 'Tomorrow the sun is supposed to shine.', level: 'A2', tags: ['verb'], distractors: ['regnen', 'schneien', 'scheint'] },
  { id: 's338', text: 'Zieh dir eine {blank} an, es ist kalt.', answer: 'Jacke', translation: "Put on a jacket, it's cold.", level: 'A1', tags: ['noun'], distractors: ['Mütze', 'Schal', 'Hose'] },

  // ---- Family & friends ----
  { id: 's339', text: 'Meine {blank} kocht sehr gut.', answer: 'Oma', translation: 'My grandma cooks very well.', level: 'A1', tags: ['noun'], distractors: ['Tante', 'Mutter', 'Schwester'] },
  { id: 's340', text: 'Mein {blank} arbeitet als Arzt.', answer: 'Onkel', translation: 'My uncle works as a doctor.', level: 'A1', tags: ['noun'], distractors: ['Opa', 'Bruder', 'Vater'] },
  { id: 's341', text: 'Ich habe zwei {blank} und einen Bruder.', answer: 'Schwestern', translation: 'I have two sisters and a brother.', level: 'A1', tags: ['noun'], distractors: ['Brüder', 'Onkel', 'Tanten'] },
  { id: 's342', text: 'Meine beste {blank} heißt Anna.', answer: 'Freundin', translation: 'My best friend is called Anna.', level: 'A1', tags: ['noun'], distractors: ['Schwester', 'Kollegin', 'Nachbarin'] },
  { id: 's343', text: 'Wir {blank} uns seit der Schule.', answer: 'kennen', translation: 'We have known each other since school.', level: 'A2', tags: ['verb'], distractors: ['kennst', 'kennt', 'kenne'] },
  { id: 's344', text: 'Meine Eltern {blank} in einem kleinen Dorf.', answer: 'wohnen', translation: 'My parents live in a small village.', level: 'A1', tags: ['verb'], distractors: ['wohnt', 'wohnst', 'wohne'] },
  { id: 's345', text: 'Mein Cousin ist {blank} als ich.', answer: 'jünger', translation: 'My cousin is younger than me.', level: 'A2', tags: ['komparativ'], distractors: ['jung', 'junge', 'am jüngsten'] },
  { id: 's346', text: 'Ich besuche meine {blank} jedes Jahr.', answer: 'Verwandten', translation: 'I visit my relatives every year.', level: 'A2', tags: ['noun'], distractors: ['Nachbarn', 'Kollegen', 'Lehrer'] },
  { id: 's347', text: 'Wir feiern den {blank} meiner Schwester.', answer: 'Geburtstag', translation: "We are celebrating my sister's birthday.", level: 'A1', tags: ['noun'], distractors: ['Urlaub', 'Erfolg', 'Umzug'] },
  { id: 's348', text: 'Meine Nichte {blank} erst drei Jahre alt.', answer: 'ist', translation: 'My niece is only three years old.', level: 'A1', tags: ['sein'], distractors: ['hat', 'sind', 'bin'] },

  // ---- Health & body ----
  { id: 's349', text: 'Ich habe {blank} Kopfschmerzen.', answer: 'starke', translation: 'I have a bad headache.', level: 'A2', tags: ['adjective'], distractors: ['stark', 'starken', 'starker'] },
  { id: 's350', text: 'Der Arzt {blank} mir eine Pause zu machen.', answer: 'rät', translation: 'The doctor advises me to take a break.', level: 'A2', tags: ['verb'], distractors: ['rate', 'rätst', 'raten'] },
  { id: 's351', text: 'Ich fühle mich heute {blank}.', answer: 'krank', translation: 'I feel sick today.', level: 'A1', tags: ['feelings'], distractors: ['gesund', 'müde', 'fit'] },
  { id: 's352', text: 'Nimm diese {blank} dreimal am Tag.', answer: 'Tabletten', translation: 'Take these pills three times a day.', level: 'A2', tags: ['noun'], distractors: ['Tropfen', 'Salbe', 'Spritze'] },
  { id: 's353', text: 'Ich muss zum {blank} gehen.', answer: 'Arzt', translation: 'I have to go to the doctor.', level: 'A1', tags: ['noun'], distractors: ['Zahnarzt', 'Apotheker', 'Friseur'] },
];
