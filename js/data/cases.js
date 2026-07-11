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

  // ---- Batch 2: Nominativ (subject) ----
  { text: '{blank} Lehrerin erklärt die Grammatik.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Den', 'Dem'], hint: 'Subject → Nominativ. Feminine: die.' },
  { text: '{blank} Auto steht vor dem Haus.', answer: 'Das', case: 'Nominativ', options: ['Das', 'Der', 'Die', 'Dem'], hint: 'Subject → Nominativ. Neuter: das.' },
  { text: '{blank} Baum ist sehr alt.', answer: 'Der', case: 'Nominativ', options: ['Der', 'Den', 'Dem', 'Des'], hint: 'Subject → Nominativ. Masculine: der.' },
  { text: '{blank} Wasser ist kalt.', answer: 'Das', case: 'Nominativ', options: ['Das', 'Der', 'Die', 'Dem'], hint: 'Subject → Nominativ. Neuter: das.' },
  { text: '{blank} Schüler lernen Deutsch.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Den', 'Dem'], hint: 'Plural subject → Nominativ: die.' },
  { text: 'Ist {blank} Arzt schon da?', answer: 'der', case: 'Nominativ', options: ['der', 'den', 'dem', 'des'], hint: 'Subject of "sein" → Nominativ: der Arzt.' },
  { text: '{blank} Stadt ist sehr groß.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Das', 'Den'], hint: 'Subject → Nominativ. Feminine: die.' },
  { text: '{blank} Fahrrad ist ganz neu.', answer: 'Das', case: 'Nominativ', options: ['Das', 'Der', 'Die', 'Dem'], hint: 'Subject → Nominativ. Neuter: das.' },
  { text: '{blank} Freunde kommen heute Abend.', answer: 'Die', case: 'Nominativ', options: ['Die', 'Der', 'Den', 'Dem'], hint: 'Plural subject → Nominativ: die.' },
  { text: '{blank} Junge spielt Fußball.', answer: 'Der', case: 'Nominativ', options: ['Der', 'Den', 'Dem', 'Des'], hint: 'Subject → Nominativ. Masculine: der.' },

  // ---- Batch 2: Akkusativ (direct object) ----
  { text: 'Ich kaufe {blank} Tisch.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'Direct object. der Tisch → den Tisch.' },
  { text: 'Er isst {blank} Suppe.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'Feminine die Suppe stays die in the Akkusativ.' },
  { text: 'Sie sucht {blank} Schlüssel.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'der Schlüssel → den Schlüssel (Akkusativ).' },
  { text: 'Wir öffnen {blank} Tür.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'Feminine die Tür stays die in the Akkusativ.' },
  { text: 'Ich trage {blank} Mantel.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'der Mantel → den Mantel (Akkusativ).' },
  { text: 'Sie liest {blank} Brief.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'der Brief → den Brief (Akkusativ).' },
  { text: 'Ich möchte {blank} Wasser.', answer: 'das', case: 'Akkusativ', options: ['das', 'dem', 'der', 'den'], hint: 'Neuter das stays das in the Akkusativ.' },
  { text: 'Er nimmt {blank} Zug.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'der Zug → den Zug (Akkusativ).' },
  { text: 'Ich habe {blank} Frage.', answer: 'eine', case: 'Akkusativ', options: ['eine', 'einen', 'ein', 'einer'], hint: 'Feminine eine stays eine in the Akkusativ.' },
  { text: 'Kaufst du {blank} Fahrkarte?', answer: 'eine', case: 'Akkusativ', options: ['eine', 'einen', 'ein', 'einer'], hint: 'Feminine eine stays eine in the Akkusativ.' },
  { text: 'Wir sehen {blank} Berge.', answer: 'die', case: 'Akkusativ', options: ['die', 'den', 'dem', 'der'], hint: 'Plural direct object → die.' },
  { text: 'Ich mag {blank} Musik.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'Feminine die Musik stays die in the Akkusativ.' },
  { text: 'Ich trinke Kaffee ohne {blank} Zucker.', answer: 'den', case: 'Akkusativ', options: ['den', 'der', 'dem', 'des'], hint: 'ohne + Akkusativ. der Zucker → den Zucker.' },
  { text: 'Sie geht ohne {blank} Jacke aus dem Haus.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'ohne + Akkusativ; feminine die stays die.' },

  // ---- Batch 2: Dativ (dative verbs / indirect object) ----
  { text: 'Ich gebe {blank} Lehrer die Hausaufgabe.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'Indirect object → Dativ. der Lehrer → dem.' },
  { text: 'Sie antwortet {blank} Chef.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'antworten takes the Dativ. der Chef → dem.' },
  { text: 'Das Auto gehört {blank} Frau.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'gehören takes the Dativ. die Frau → der.' },
  { text: 'Wir folgen {blank} Weg.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'folgen takes the Dativ. der Weg → dem.' },
  { text: 'Ich helfe {blank} Nachbarn.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'helfen takes the Dativ. der Nachbar → dem.' },
  { text: 'Er dankt {blank} Lehrerin.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'danken takes the Dativ. die Lehrerin → der.' },
  { text: 'Das Kleid gefällt {blank} Mädchen.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'gefallen takes the Dativ. das Mädchen → dem.' },
  { text: 'Ich gratuliere {blank} Freundin.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'gratulieren takes the Dativ. die Freundin → der.' },
  { text: 'Sie glaubt {blank} Mann nicht.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'glauben (a person) takes the Dativ. der Mann → dem.' },
  { text: 'Wir begegnen {blank} Lehrer auf der Straße.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'begegnen takes the Dativ. der Lehrer → dem.' },
  { text: 'Der Hut gehört {blank} Kind.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'gehören takes the Dativ. das Kind → dem.' },
  { text: 'Ich schreibe {blank} Großmutter einen Brief.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'Indirect object → Dativ. die Großmutter → der.' },
  { text: 'Die Jacke passt {blank} Mann gut.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'passen takes the Dativ. der Mann → dem.' },

  // ---- Batch 2: Dativ prepositions ----
  { text: 'Seit {blank} Unfall geht es ihm besser.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'seit + Dativ. der Unfall → dem Unfall.' },
  { text: 'Ich komme gerade aus {blank} Kino.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'aus + Dativ. das Kino → dem Kino.' },
  { text: 'Wir fahren zu {blank} Bahnhof.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'zu + Dativ. der Bahnhof → dem Bahnhof.' },
  { text: 'Nach {blank} Schule spielen wir im Park.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'nach + Dativ. die Schule → der Schule.' },
  { text: 'Sie wohnt bei {blank} Onkel.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'bei + Dativ. der Onkel → dem Onkel.' },
  { text: 'Ich fahre mit {blank} Straßenbahn.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'mit + Dativ. die Straßenbahn → der.' },
  { text: 'Seit {blank} Woche bin ich krank.', answer: 'einer', case: 'Dativ', options: ['einer', 'eine', 'einen', 'einem'], hint: 'seit + Dativ. eine Woche → einer Woche.' },
  { text: 'Er arbeitet bei {blank} Firma.', answer: 'einer', case: 'Dativ', options: ['einer', 'eine', 'einen', 'einem'], hint: 'bei + Dativ. eine Firma → einer Firma.' },
  { text: 'Das Café ist gegenüber {blank} Kirche.', answer: 'der', case: 'Dativ', options: ['der', 'die', 'den', 'dem'], hint: 'gegenüber + Dativ. die Kirche → der Kirche.' },
  { text: 'Ich gehe zu {blank} Arzt.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'zu + Dativ. der Arzt → dem Arzt.' },
  { text: 'Von {blank} Bahnhof laufe ich nach Hause.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'von + Dativ. der Bahnhof → dem Bahnhof.' },
  { text: 'Wir wohnen seit {blank} Jahr hier.', answer: 'einem', case: 'Dativ', options: ['einem', 'ein', 'einen', 'einer'], hint: 'seit + Dativ. ein Jahr → einem Jahr.' },

  // ---- Batch 2: Two-way prepositions (Wechselpräpositionen) ----
  { text: 'Die Bücher stehen in {blank} Regal.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'Position (where?) → Dativ. in dem Regal.' },
  { text: 'Ich lege das Buch in {blank} Regal.', answer: 'das', case: 'Akkusativ', options: ['das', 'dem', 'der', 'den'], hint: 'Movement (where to?) → Akkusativ. in das Regal.' },
  { text: 'Wir sitzen vor {blank} Fernseher.', answer: 'dem', case: 'Dativ', options: ['dem', 'der', 'den', 'des'], hint: 'Position → Dativ. vor dem Fernseher.' },
  { text: 'Ich stelle den Stuhl vor {blank} Tür.', answer: 'die', case: 'Akkusativ', options: ['die', 'der', 'den', 'dem'], hint: 'Movement → Akkusativ. vor die Tür.' },
  { text: 'Das Bild hängt über {blank} Sofa.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'Position → Dativ. über dem Sofa.' },
  { text: 'Er hängt die Lampe über {blank} Tisch.', answer: 'den', case: 'Akkusativ', options: ['den', 'dem', 'der', 'des'], hint: 'Movement → Akkusativ. über den Tisch.' },
  { text: 'Die Schuhe stehen unter {blank} Bett.', answer: 'dem', case: 'Dativ', options: ['dem', 'das', 'der', 'den'], hint: 'Position → Dativ. unter dem Bett.' },
  { text: 'Zwischen {blank} Häusern ist ein Garten.', answer: 'den', case: 'Dativ', options: ['den', 'die', 'der', 'dem'], hint: 'Position, plural → Dativ. die Häuser → den Häusern.' },

  // ---- Batch 2: Genitiv ----
  { text: 'Das Haus {blank} Lehrers ist groß.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'der', 'den'], hint: 'Possession → Genitiv. der Lehrer → des Lehrers.' },
  { text: 'Die Mutter {blank} Kindes arbeitet hier.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'das', 'der'], hint: 'Neuter Genitiv → des Kindes.' },
  { text: 'Der Name {blank} Straße ist lang.', answer: 'der', case: 'Genitiv', options: ['der', 'die', 'dem', 'des'], hint: 'Feminine Genitiv → der Straße.' },
  { text: 'Wegen {blank} Krankheit bleibt sie zu Hause.', answer: 'der', case: 'Genitiv', options: ['der', 'die', 'dem', 'des'], hint: 'wegen + Genitiv. die Krankheit → der.' },
  { text: 'Trotz {blank} Kälte gehen wir spazieren.', answer: 'der', case: 'Genitiv', options: ['der', 'die', 'dem', 'des'], hint: 'trotz + Genitiv. die Kälte → der Kälte.' },
  { text: 'Während {blank} Films schlief er ein.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'der', 'den'], hint: 'während + Genitiv. der Film → des Films.' },
  { text: 'Die Farbe {blank} Autos gefällt mir.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'das', 'der'], hint: 'Neuter Genitiv → des Autos.' },
  { text: 'Der Hund {blank} Nachbarin bellt laut.', answer: 'der', case: 'Genitiv', options: ['der', 'die', 'dem', 'des'], hint: 'Feminine Genitiv → der Nachbarin.' },
  { text: 'Statt {blank} Kaffees trinke ich Tee.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'der', 'den'], hint: 'statt + Genitiv. der Kaffee → des Kaffees.' },
  { text: 'Der Anfang {blank} Buches ist spannend.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'das', 'der'], hint: 'Neuter Genitiv → des Buches.' },
  { text: 'Die Fenster {blank} Schule sind neu.', answer: 'der', case: 'Genitiv', options: ['der', 'die', 'dem', 'des'], hint: 'Feminine Genitiv → der Schule.' },
  { text: 'Das Dach {blank} Hauses ist rot.', answer: 'des', case: 'Genitiv', options: ['des', 'dem', 'das', 'der'], hint: 'Neuter Genitiv → des Hauses.' },

  // ---- Batch 2: Personal pronouns in cases ----
  { text: 'Ich sehe {blank} nicht.', answer: 'dich', case: 'Akkusativ', options: ['dich', 'dir', 'du', 'dein'], hint: 'Direct object pronoun → Akkusativ: dich (you).' },
  { text: 'Sie gibt {blank} das Geld.', answer: 'uns', case: 'Dativ', options: ['uns', 'wir', 'unser', 'euch'], hint: 'Indirect object pronoun → Dativ: uns (to us).' },
  { text: 'Wir danken {blank} für das Geschenk.', answer: 'euch', case: 'Dativ', options: ['euch', 'ihr', 'euer', 'ihnen'], hint: 'danken + Dativ pronoun: euch (to you all).' },
  { text: 'Ich kenne {blank} gut.', answer: 'ihn', case: 'Akkusativ', options: ['ihn', 'ihm', 'er', 'sein'], hint: 'Direct object pronoun → Akkusativ: ihn (him).' },
  { text: 'Das Buch gehört {blank}.', answer: 'ihnen', case: 'Dativ', options: ['ihnen', 'sie', 'ihr', 'ihren'], hint: 'gehören + Dativ pronoun: ihnen (to them).' },
  { text: 'Er hilft {blank} bei den Hausaufgaben.', answer: 'ihr', case: 'Dativ', options: ['ihr', 'sie', 'ihre', 'ihrer'], hint: 'helfen + Dativ pronoun: ihr (to her).' },
];
