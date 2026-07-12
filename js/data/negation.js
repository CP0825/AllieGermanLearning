// js/data/negation.js
// ---------------------------------------------------------------------------
// Negation drill: kein (declines like ein) vs nicht. Each:
//   { text (one {blank}), answer, options:[4], translation }.
// `kein` negates a noun with ein / no article and takes ein-endings for gender +
// case; `nicht` negates a verb, an adjective, or a noun that already has a
// der/die/das or a name. `answer` always appears in `options`.
// ---------------------------------------------------------------------------

export const NEGATION = [
  { text: 'Ich habe {blank} Zeit.', answer: 'keine', options: ['keine', 'kein', 'keinen', 'nicht'], translation: 'I have no time. (die Zeit, accusative)' },
  { text: 'Ich habe {blank} Auto.', answer: 'kein', options: ['kein', 'keine', 'keinen', 'nicht'], translation: 'I have no car. (das Auto, accusative)' },
  { text: 'Ich sehe {blank} Mann.', answer: 'keinen', options: ['keinen', 'kein', 'keine', 'nicht'], translation: 'I see no man. (der Mann, accusative)' },
  { text: 'Ich spiele heute {blank}.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: "I'm not playing today. (negates the verb)" },
  { text: 'Der Kaffee ist {blank} heiß.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: 'The coffee is not hot. (negates an adjective)' },
  { text: 'Das ist {blank} mein Auto.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: 'That is not my car. (noun already has mein)' },
  { text: 'Ich habe {blank} Geld.', answer: 'kein', options: ['kein', 'keine', 'keinen', 'nicht'], translation: 'I have no money. (das Geld, accusative)' },
  { text: 'Sie hat {blank} Kinder.', answer: 'keine', options: ['keine', 'kein', 'keinen', 'nicht'], translation: 'She has no children. (plural)' },
  { text: 'Ich kenne ihn {blank}.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: "I don't know him. (negates the verb)" },
  { text: 'Wir haben {blank} Hunger.', answer: 'keinen', options: ['keinen', 'kein', 'keine', 'nicht'], translation: "We're not hungry. (der Hunger, accusative)" },
  { text: 'Das Wetter ist heute {blank} schön.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: 'The weather is not nice today. (negates an adjective)' },
  { text: 'Ich trinke {blank} Milch.', answer: 'keine', options: ['keine', 'kein', 'keinen', 'nicht'], translation: "I don't drink milk. (die Milch, accusative)" },
  { text: 'Er ist {blank} mein Freund.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: 'He is not my friend. (noun already has mein)' },
  { text: 'Ich möchte {blank} Suppe.', answer: 'keine', options: ['keine', 'kein', 'keinen', 'nicht'], translation: "I don't want any soup. (die Suppe, accusative)" },
  { text: 'Das Buch ist {blank} interessant.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: 'The book is not interesting. (negates an adjective)' },
  { text: 'Ich habe {blank} Bruder.', answer: 'keinen', options: ['keinen', 'kein', 'keine', 'nicht'], translation: 'I have no brother. (der Bruder, accusative)' },
  { text: 'Wir gehen heute {blank} ins Kino.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: "We're not going to the cinema today. (negates the verb)" },
  { text: 'Sie hat {blank} Auto, sie fährt Fahrrad.', answer: 'kein', options: ['kein', 'keine', 'keinen', 'nicht'], translation: 'She has no car, she rides a bike. (das Auto, accusative)' },
  { text: 'Ich habe {blank} Idee.', answer: 'keine', options: ['keine', 'kein', 'keinen', 'nicht'], translation: 'I have no idea. (die Idee, accusative)' },
  { text: 'Der Film war {blank} gut.', answer: 'nicht', options: ['nicht', 'kein', 'keine', 'keinen'], translation: 'The film was not good. (negates an adjective)' },
];
