// js/data/possessives.js
// ---------------------------------------------------------------------------
// Possessive-word drill (mein, dein, sein, ihr, unser…). Each:
//   { text (one {blank}), answer, options:[4], translation }.
// Possessives decline like ein/kein: they agree with the THING owned (its
// gender + case), not the owner. `answer` always appears in `options`.
// ---------------------------------------------------------------------------

export const POSSESSIVES = [
  { text: 'Das ist {blank} Vater.', answer: 'mein', options: ['mein', 'meine', 'meinen', 'meiner'], translation: 'That is my father. (der Vater, subject)' },
  { text: 'Das ist {blank} Mutter.', answer: 'meine', options: ['meine', 'mein', 'meinen', 'meiner'], translation: 'That is my mother. (die Mutter, subject)' },
  { text: 'Ich liebe {blank} Vater.', answer: 'meinen', options: ['meinen', 'mein', 'meine', 'meiner'], translation: 'I love my father. (der Vater, accusative)' },
  { text: 'Wo ist {blank} Bruder?', answer: 'dein', options: ['dein', 'deine', 'deinen', 'deiner'], translation: 'Where is your brother? (der Bruder, subject)' },
  { text: 'Ich mag {blank} Schwester.', answer: 'deine', options: ['deine', 'dein', 'deinen', 'deiner'], translation: 'I like your sister. (die Schwester, accusative)' },
  { text: 'Er sucht {blank} Schlüssel.', answer: 'seinen', options: ['seinen', 'sein', 'seine', 'seiner'], translation: 'He is looking for his key. (der Schlüssel, accusative)' },
  { text: 'Sie liebt {blank} Kinder.', answer: 'ihre', options: ['ihre', 'ihr', 'ihren', 'ihrer'], translation: 'She loves her children. (plural, accusative)' },
  { text: 'Das ist {blank} Haus.', answer: 'unser', options: ['unser', 'unsere', 'unseren', 'unserem'], translation: 'That is our house. (das Haus, subject)' },
  { text: 'Ich besuche {blank} Großeltern.', answer: 'meine', options: ['meine', 'mein', 'meinen', 'meiner'], translation: 'I visit my grandparents. (plural, accusative)' },
  { text: '{blank} Auto ist rot.', answer: 'Mein', options: ['Mein', 'Meine', 'Meinen', 'Meiner'], translation: 'My car is red. (das Auto, subject)' },
  { text: 'Hast du {blank} Handy?', answer: 'dein', options: ['dein', 'deine', 'deinen', 'deiner'], translation: 'Do you have your phone? (das Handy, accusative)' },
  { text: 'Er wohnt bei {blank} Eltern.', answer: 'seinen', options: ['seinen', 'seine', 'sein', 'seiner'], translation: 'He lives with his parents. (plural, dative)' },
  { text: 'Ich fahre mit {blank} Auto.', answer: 'meinem', options: ['meinem', 'mein', 'meine', 'meinen'], translation: 'I drive with my car. (das Auto, dative)' },
  { text: 'Sie spricht mit {blank} Mutter.', answer: 'ihrer', options: ['ihrer', 'ihre', 'ihren', 'ihr'], translation: 'She talks with her mother. (die Mutter, dative)' },
  { text: 'Wo sind {blank} Bücher?', answer: 'deine', options: ['deine', 'dein', 'deinen', 'deiner'], translation: 'Where are your books? (plural, subject)' },
  { text: 'Das ist {blank} Freundin.', answer: 'seine', options: ['seine', 'sein', 'seinen', 'seiner'], translation: 'That is his girlfriend. (die Freundin, subject)' },
  { text: 'Ich kenne {blank} Namen nicht.', answer: 'deinen', options: ['deinen', 'dein', 'deine', 'deiner'], translation: "I don't know your name. (der Name, accusative)" },
  { text: '{blank} Schwester ist Ärztin.', answer: 'Meine', options: ['Meine', 'Mein', 'Meinen', 'Meiner'], translation: 'My sister is a doctor. (die Schwester, subject)' },
  { text: 'Wir lieben {blank} Stadt.', answer: 'unsere', options: ['unsere', 'unser', 'unseren', 'unserem'], translation: 'We love our city. (die Stadt, accusative)' },
  { text: 'Er gibt {blank} Hund Wasser.', answer: 'seinem', options: ['seinem', 'sein', 'seinen', 'seine'], translation: 'He gives his dog water. (der Hund, dative)' },
];
