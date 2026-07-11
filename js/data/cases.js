// js/data/cases.js
// ---------------------------------------------------------------------------
// Case / article items. 42 items across Nominativ, Akkusativ, Dativ (+ a taste
// of Genitiv). Each: { text (contains "{blank}"), answer, case, options:[4], hint }.
// `answer` also appears inside `options`. `hint` is shown after answering.
// ---------------------------------------------------------------------------

export const CASES = [
  // ---- Nominativ (subject) ----
  { text: '{blank} Mann liest die Zeitung.', answer: 'Der', case: 'Nominativ', options: ['Der', 'Den', 'Dem', 'Des'], hint: 'Subject → Nominativ. Masculine: der.' },
  { text: '{blank} Frau trinkt Tee.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Den', 'Dem'], hint: 'Subject → Nominativ. Feminine: die.' },
  { text: '{blank} Kind spielt draußen.', answer: 'Das', case: 'Nominativ', options: ['Das', 'Der', 'Die', 'Dem'], hint: 'Subject → Nominativ. Neuter: das.' },
  { text: '{blank} Kinder sind im Garten.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Den', 'Dem'], hint: 'Subject → Nominativ. Plural: die.' },
  { text: 'Wo ist {blank} Hund?', answer: 'der', case: 'Nominativ', options: ['der', 'den', 'dem', 'des'], hint: 'Subject of "sein" → Nominativ: der Hund.' },

  // ---- Akkusativ (direct object) ----
  { text: 'Ich sehe {blank} Mann.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'Direct object → Akkusativ. Masculine der → den.' },
  { text: 'Sie kauft {blank} Tasche.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'Feminine stays "die" in the Akkusativ.' },
  { text: 'Wir essen {blank} Brot.', answer: 'das', case: 'Akkusativ', options: ['das', 'der', 'dem', 'den'], hint: 'Neuter stays "das" in the Akkusativ.' },
  { text: 'Ich habe {blank} Apfel.', answer: 'einen', case: 'Akkusativ', options: ['einen', 'ein', 'eine', 'einem'], hint: 'Masculine "ein" → "einen" in the Akkusativ.' },
  { text: 'Er trinkt {blank} Kaffee.', answer: 'einen', case: 'Akkusativ', options: ['einen', 'ein', 'eine', 'einem'], hint: 'der Kaffee → einen Kaffee (Akkusativ).' },
  { text: 'Sie liest {blank} Buch.', answer: 'ein', case: 'Akkusativ', options: ['ein', 'einen', 'eine', 'einem'], hint: 'Neuter "ein" stays "ein" in the Akkusativ.' },
  { text: 'Ich brauche {blank} Jacke.', answer: 'eine', case: 'Akkusativ', options: ['eine', 'einen', 'ein', 'einer'], hint: 'Feminine "eine" stays "eine" in the Akkusativ.' },
  { text: 'Kaufst du {blank} Auto?', answer: 'das', case: 'Akkusativ', options: ['das', 'dem', 'der', 'den'], hint: 'Neuter "das" is the same in Nom. and Akk.' },
  { text: 'Ich liebe {blank} Sommer.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'der Sommer → den Sommer (Akkusativ).' },
  { text: 'Sie hat {blank} Bruder.', answer: 'einen', case: 'Akkusativ', options: ['einen', 'ein', 'eine', 'einem'], hint: 'der Bruder → einen Bruder (Akkusativ).' },

  // ---- Dativ (indirect object / dative verbs / dative prepositions) ----
  { text: 'Ich gebe {blank} Mann das Buch.', answer: 'dem', case: 'Dativ', options: ['dem', 'den', 'der', 'des'], hint: 'geben + indirect object → Dativ. der → dem.' },
  { text: 'Sie hilft {blank} Frau.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'helfen always takes the Dativ. die → der.' },
  { text: 'Wir danken {blank} Kind.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'danken takes the Dativ. das → dem.' },
  { text: 'Ich fahre mit {blank} Bus.', answer: 'dem', case: 'Dativ', options: ['dem', 'den', 'der', 'des'], hint: 'mit + Dativ. der Bus → dem Bus.' },
  { text: 'Das Buch liegt auf {blank} Tisch.', answer: 'dem', case: 'Dativ', options: ['dem', 'den', 'der', 'des'], hint: 'Position (where?) → Dativ. auf dem Tisch.' },
  { text: 'Wir wohnen bei {blank} Eltern.', answer: 'den', case: 'Dativ', options: ['den', 'die', 'der', 'dem'], hint: 'bei + Dativ; plural Dativ → den (+n on noun).' },
  { text: 'Sie kommt aus {blank} Schweiz.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'aus + Dativ. die Schweiz → der Schweiz.' },
  { text: 'Ich spreche mit {blank} Lehrerin.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'mit + Dativ. die → der (feminine Dativ).' },
  { text: 'Er gibt {blank} Katze Milch.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'Indirect object → Dativ. die Katze → der Katze.' },
  { text: 'Das gehört {blank} Kind.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'gehören takes the Dativ. das → dem.' },
  { text: 'Nach {blank} Arbeit gehe ich nach Hause.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'nach + Dativ. die Arbeit → der Arbeit.' },
  { text: 'Ich helfe {blank} Kindern.', answer: 'den', case: 'Dativ', options: ['den', 'die', 'der', 'dem'], hint: 'helfen + Dativ; plural Dativ → den Kindern.' },
  { text: 'Wir sprechen von {blank} Reise.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'von + Dativ. die Reise → der Reise.' },

  // ---- Prepositions with Akkusativ ----
  { text: 'Das Geschenk ist für {blank} Mutter.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'für + Akkusativ. die stays die.' },
  { text: 'Wir gehen durch {blank} Park.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'durch + Akkusativ. der Park → den Park.' },
  { text: 'Sie hat nichts gegen {blank} Plan.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'gegen + Akkusativ. der Plan → den Plan.' },
  { text: 'Ich habe ein Buch für {blank} Kind.', answer: 'das', case: 'Akkusativ', options: ['das', 'dem', 'der', 'den'], hint: 'für + Akkusativ; neuter das stays das.' },
  { text: 'Die Katze läuft um {blank} Haus.', answer: 'das', case: 'Akkusativ', options: ['das', 'dem', 'der', 'den'], hint: 'um + Akkusativ; neuter das stays das.' },

  // ---- Personal pronouns in cases ----
  { text: 'Kannst du {blank} helfen?', answer: 'mir', case: 'Dativ', options: ['mir', 'mich', 'ich', 'mein'], hint: 'helfen + Dativ pronoun: mir (to me).' },
  { text: 'Er liebt {blank}.', answer: 'mich', case: 'Akkusativ', options: ['mich', 'mir', 'ich', 'mein'], hint: 'Direct object pronoun → Akkusativ: mich (me).' },
  { text: 'Ich gebe {blank} das Buch.', answer: 'dir', case: 'Dativ', options: ['dir', 'dich', 'du', 'dein'], hint: 'Indirect object pronoun → Dativ: dir (to you).' },
  { text: 'Wir sehen {blank} morgen.', answer: 'euch', case: 'Akkusativ', options: ['euch', 'ihr', 'euer', 'ihnen'], hint: 'Direct object, "you all" → Akkusativ: euch.' },
  { text: 'Das Buch gehört {blank}.', answer: 'ihm', case: 'Dativ', options: ['ihm', 'ihn', 'er', 'sein'], hint: 'gehören + Dativ pronoun: ihm (to him).' },

  // ---- A taste of Genitiv ----
  { text: 'Das ist das Auto {blank} Mannes.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'den', 'der'], hint: 'Possession → Genitiv. der → des (+s on noun).' },
  { text: 'Die Farbe {blank} Blume ist rot.', answer: 'der', case: 'Genitiv', options: ['der', 'die', 'dem', 'des'], hint: 'Feminine Genitiv → der Blume.' },
  { text: 'Der Titel {blank} Buches ist lang.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'das', 'der'], hint: 'Neuter Genitiv → des Buches.' },
  { text: 'Wegen {blank} Wetters bleiben wir zu Hause.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'das', 'der'], hint: 'wegen + Genitiv. das Wetter → des Wetters.' },

  // ---- More Nominativ ----
  { text: '{blank} Hund schläft auf dem Sofa.', answer: 'Der', case: 'Nominativ', options: ['Der', 'Den', 'Dem', 'Des'], hint: 'Subject → Nominativ. Masculine: der.' },
  { text: '{blank} Blume ist sehr schön.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Den', 'Dem'], hint: 'Subject → Nominativ. Feminine: die.' },
  { text: '{blank} Fenster ist offen.', answer: 'Das', case: 'Nominativ', options: ['Das', 'Der', 'Die', 'Dem'], hint: 'Subject → Nominativ. Neuter: das.' },
  { text: 'Dort steht {blank} Lehrer.', answer: 'der', case: 'Nominativ', options: ['der', 'den', 'dem', 'des'], hint: 'Subject → Nominativ: der Lehrer.' },
  { text: '{blank} Sonne scheint hell.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Das', 'Den'], hint: 'Subject → Nominativ. Feminine: die.' },
  { text: '{blank} Vögel singen am Morgen.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Den', 'Dem'], hint: 'Plural subject → Nominativ: die.' },

  // ---- More Akkusativ ----
  { text: 'Ich lese {blank} Zeitung.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'Direct object, feminine stays die.' },
  { text: 'Sie trinkt {blank} Kaffee.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'Direct object, masculine der → den.' },
  { text: 'Wir besuchen {blank} Museum.', answer: 'das', case: 'Akkusativ', options: ['das', 'der', 'dem', 'den'], hint: 'Neuter stays das in the Akkusativ.' },
  { text: 'Er kauft {blank} Blumenstrauß.', answer: 'einen', case: 'Akkusativ', options: ['einen', 'ein', 'eine', 'einem'], hint: 'Masculine ein → einen in the Akkusativ.' },
  { text: 'Ich brauche {blank} neue Jacke.', answer: 'eine', case: 'Akkusativ', options: ['eine', 'einen', 'ein', 'einer'], hint: 'Feminine eine stays eine in the Akkusativ.' },
  { text: 'Hast du {blank} Stift?', answer: 'einen', case: 'Akkusativ', options: ['einen', 'ein', 'eine', 'einem'], hint: 'Masculine der Stift → einen Stift.' },
  { text: 'Für {blank} Freund kaufe ich ein Buch.', answer: 'meinen', case: 'Akkusativ', options: ['meinen', 'mein', 'meinem', 'meiner'], hint: 'für + Akkusativ. mein → meinen.' },
  { text: 'Ich sehe {blank} Kinder im Park.', answer: 'die', case: 'Akkusativ', options: ['die', 'den', 'dem', 'der'], hint: 'Plural direct object → die.' },

  // ---- More Dativ ----
  { text: 'Ich gebe {blank} Frau das Buch.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'Indirect object, feminine die → der.' },
  { text: 'Er hilft {blank} Mann.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'helfen + Dativ. Masculine → dem.' },
  { text: 'Wir spielen mit {blank} Kindern.', answer: 'den', case: 'Dativ', options: ['den', 'die', 'der', 'dem'], hint: 'mit + Dativ. Plural → den (+n on noun).' },
  { text: 'Sie fährt mit {blank} Fahrrad.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'mit + Dativ. Neuter das → dem.' },
  { text: 'Das Geschenk ist von {blank} Oma.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'von + Dativ. Feminine → der.' },
  { text: 'Nach {blank} Essen gehen wir spazieren.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'nach + Dativ. das Essen → dem Essen.' },
  { text: 'Ich wohne bei {blank} Eltern.', answer: 'den', case: 'Dativ', options: ['den', 'die', 'der', 'dem'], hint: 'bei + Dativ. Plural → den Eltern.' },
  { text: 'Der Ball gehört {blank} Jungen.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'gehören + Dativ. Masculine → dem.' },
  { text: 'Sie gibt {blank} Hund Wasser.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'Indirect object, masculine → dem.' },

  // ---- More Genitiv ----
  { text: 'Das ist die Tasche {blank} Lehrerin.', answer: 'der', case: 'Genitiv', options: ['der', 'die', 'dem', 'des'], hint: 'Feminine Genitiv → der Lehrerin.' },
  { text: 'Die Tür {blank} Hauses ist rot.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'das', 'der'], hint: 'Neuter Genitiv → des Hauses.' },
  { text: 'Trotz {blank} Regens gehen wir raus.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'der', 'den'], hint: 'trotz + Genitiv. der Regen → des Regens.' },
  { text: 'Das Auto {blank} Nachbarn ist neu.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'der', 'den'], hint: 'Masculine Genitiv → des Nachbarn.' },
  { text: 'Während {blank} Woche arbeite ich.', answer: 'der', case: 'Genitiv', options: ['der', 'die', 'dem', 'des'], hint: 'während + Genitiv. die Woche → der Woche.' },

  // ---- Two-way prepositions (Wechselpräpositionen) ----
  { text: 'Das Bild hängt an {blank} Wand.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'Position (where?) → Dativ. an der Wand.' },
  { text: 'Ich hänge das Bild an {blank} Wand.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'Movement (where to?) → Akkusativ. an die Wand.' },
  { text: 'Die Katze liegt auf {blank} Sofa.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'Position → Dativ. auf dem Sofa.' },
  { text: 'Die Katze springt auf {blank} Sofa.', answer: 'das', case: 'Akkusativ', options: ['das', 'dem', 'der', 'den'], hint: 'Movement → Akkusativ. auf das Sofa.' },
  { text: 'Wir sind in {blank} Stadt.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'Position → Dativ. in der Stadt.' },
  { text: 'Wir fahren in {blank} Stadt.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'Movement → Akkusativ. in die Stadt.' },
  { text: 'Das Buch liegt unter {blank} Tisch.', answer: 'dem', case: 'Dativ', options: ['dem', 'den', 'der', 'des'], hint: 'Position → Dativ. unter dem Tisch.' },
  { text: 'Der Hund läuft hinter {blank} Haus.', answer: 'das', case: 'Akkusativ', options: ['das', 'dem', 'der', 'den'], hint: 'Movement → Akkusativ. hinter das Haus.' },
  { text: 'Die Lampe steht neben {blank} Bett.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'Position → Dativ. neben dem Bett.' },
  { text: 'Sie stellt die Lampe neben {blank} Bett.', answer: 'das', case: 'Akkusativ', options: ['das', 'dem', 'der', 'den'], hint: 'Movement → Akkusativ. neben das Bett.' },

  // ---- Fixed-case prepositions ----
  { text: 'Ich gehe mit {blank} Freundin ins Kino.', answer: 'meiner', case: 'Dativ', options: ['meiner', 'meine', 'meinen', 'meinem'], hint: 'mit + Dativ. meine → meiner (feminine).' },
  { text: 'Das Geschenk ist für {blank} Mutter.', answer: 'meine', case: 'Akkusativ', options: ['meine', 'meiner', 'meinem', 'mein'], hint: 'für + Akkusativ. feminine → meine.' },
  { text: 'Wir sprechen über {blank} Film.', answer: 'den', case: 'Akkusativ', options: ['den', 'dem', 'der', 'des'], hint: 'über (topic) + Akkusativ. der → den.' },
  { text: 'Ich komme zu {blank} Party.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'zu + Dativ. die Party → der Party.' },
];
