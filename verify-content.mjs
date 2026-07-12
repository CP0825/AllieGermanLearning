// verify-content.mjs — structural harness for the expanded content pools.
// Run: node verify-content.mjs   (from the project root)
import { VOCAB, NOUNS, VOCAB_CATEGORIES } from './js/data/vocab.js';
import { SENTENCES } from './js/data/sentences.js';
import { WORD_CHOICE } from './js/data/adjectives.js';
import { CASES } from './js/data/cases.js';
import { VERBS, PRONOUNS } from './js/data/verbs.js';
import { STARTER_CARDS } from './js/data/starterCards.js';
import { CONVERSATION, CONVERSATION_SITUATIONS } from './js/data/conversation.js';
import { TRANSLATIONS } from './js/data/translations.js';
import { SENTENCE_TRANSLATIONS } from './js/data/sentenceTranslations.js';
import { ADJECTIVE_ENDINGS } from './js/data/adjectiveEndings.js';
import { NEGATION } from './js/data/negation.js';
import { POSSESSIVES } from './js/data/possessives.js';
import { PRAETERITUM } from './js/data/praeteritum.js';

let errors = 0;
const fail = (m) => { console.error('  ✗ ' + m); errors++; };
const countBlank = (t) => (t.match(/\{blank\}/g) || []).length;
const dupes = (arr) => { const s = new Set(), d = new Set(); for (const x of arr) { if (s.has(x)) d.add(x); s.add(x); } return [...d]; };

// ---- vocab ----
const validArt = new Set(['der', 'die', 'das', null]);
const catIds = new Set(VOCAB_CATEGORIES.map((c) => c.id));
VOCAB.forEach((w, i) => {
  if (!w.german || !w.english) fail(`vocab[${i}] missing german/english`);
  if (!validArt.has(w.article)) fail(`vocab "${w.german}" bad article: ${w.article}`);
  if (w.article && w.plural === undefined) fail(`vocab noun "${w.german}" missing plural key`); // null = mass noun, allowed
  if (!catIds.has(w.category)) fail(`vocab "${w.german}" unknown category: ${w.category}`);
});
NOUNS.forEach((n) => { if (!['der','die','das'].includes(n.article)) fail(`NOUNS leaked non-noun ${n.german}`); });
const vd = dupes(VOCAB.map((w) => w.german)); if (vd.length) fail(`vocab duplicate germans: ${vd.slice(0,10).join(', ')}${vd.length>10?'…':''}`);

// ---- sentences ----
SENTENCES.forEach((s) => {
  if (countBlank(s.text) !== 1) fail(`sentence ${s.id} needs exactly one {blank}`);
  if (!s.answer || /\s/.test(s.answer.trim()) && s.answer.trim().split(/\s+/).length > 1) {} // multi-word answers allowed rarely
  if (!s.answer) fail(`sentence ${s.id} missing answer`);
  if (!s.translation) fail(`sentence ${s.id} missing translation`);
  if (s.distractors && s.distractors.includes(s.answer)) fail(`sentence ${s.id} distractor equals answer`);
});
const sd = dupes(SENTENCES.map((s) => s.id)); if (sd.length) fail(`sentence duplicate ids: ${sd.join(', ')}`);

// ---- word choice ----
WORD_CHOICE.forEach((w, i) => {
  if (countBlank(w.text) !== 1) fail(`word-choice[${i}] needs one {blank}`);
  if (!Array.isArray(w.options) || w.options.length !== 4) fail(`word-choice[${i}] "${w.text}" needs 4 options`);
  if (!w.options.includes(w.answer)) fail(`word-choice[${i}] "${w.text}" answer "${w.answer}" not in options`);
  if (new Set(w.options).size !== w.options.length) fail(`word-choice[${i}] "${w.text}" duplicate options`);
});

// ---- cases ----
const validCase = new Set(['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv']);
CASES.forEach((c, i) => {
  if (countBlank(c.text) !== 1) fail(`case[${i}] needs one {blank}`);
  if (!c.options || c.options.length !== 4) fail(`case[${i}] "${c.text}" needs 4 options`);
  if (!c.options.includes(c.answer)) fail(`case[${i}] "${c.text}" answer not in options`);
  if (!validCase.has(c.case)) fail(`case[${i}] bad case: ${c.case}`);
});

// ---- verbs ----
const keys = ['ich', 'du', 'er', 'wir', 'ihr', 'sie'];
VERBS.forEach((v) => {
  if (!v.german || !v.english) fail(`verb missing german/english: ${v.german}`);
  keys.forEach((k) => { if (!v.present || !v.present[k]) fail(`verb "${v.german}" missing present.${k}`); });
  if (!v.perfekt) fail(`verb "${v.german}" missing perfekt`);
});
if (PRONOUNS.length !== 6) fail(`PRONOUNS should be 6, got ${PRONOUNS.length}`);
const verbd = dupes(VERBS.map((v) => v.german)); if (verbd.length) fail(`verb duplicates: ${verbd.join(', ')}`);

// ---- starter cards ----
STARTER_CARDS.forEach((c, i) => {
  if (!c.german || !c.english) fail(`starter[${i}] missing german/english`);
  if (!validArt.has(c.article)) fail(`starter "${c.german}" bad article: ${c.article}`);
  if (!c.example) fail(`starter "${c.german}" missing example`);
});
const scd = dupes(STARTER_CARDS.map((c) => c.german)); if (scd.length) fail(`starter duplicate germans: ${scd.join(', ')}`);

// ---- conversation ----
const validSit = new Set(CONVERSATION_SITUATIONS);
CONVERSATION.forEach((c) => {
  if (countBlank(c.text) !== 1) fail(`conversation ${c.id} needs one {blank}`);
  if (!c.answer) fail(`conversation ${c.id} missing answer`);
  if (!c.translation) fail(`conversation ${c.id} missing translation`);
  if (!validSit.has(c.situation)) fail(`conversation ${c.id} bad situation: ${c.situation}`);
});
const cvd = dupes(CONVERSATION.map((c) => c.id)); if (cvd.length) fail(`conversation duplicate ids: ${cvd.join(', ')}`);
const sitCoverage = CONVERSATION_SITUATIONS.filter((s) => !CONVERSATION.some((c) => c.situation === s));
if (sitCoverage.length) fail(`conversation situations with no items: ${sitCoverage.join(', ')}`);

// ---- translate (production items) ----
const fold = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ')
  .replace(/[.!?,;:„“"'»«]/g, '')
  .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');

SENTENCE_TRANSLATIONS.forEach((t, i) => {
  if (!t.id) fail(`sentenceTranslation[${i}] missing id`);
  if (!t.en) fail(`sentenceTranslation ${t.id} missing en`);
  if (!t.de) fail(`sentenceTranslation ${t.id} missing de`);
  if (/\{blank\}/.test(t.de)) fail(`sentenceTranslation ${t.id} still has {blank} in de`);
});
const stid = dupes(SENTENCE_TRANSLATIONS.map((t) => t.id));
if (stid.length) fail(`sentenceTranslation duplicate ids: ${stid.slice(0, 10).join(', ')}`);
const stde = dupes(SENTENCE_TRANSLATIONS.map((t) => fold(t.de)));
if (stde.length) fail(`sentenceTranslation duplicate de: ${stde.slice(0, 5).join(' | ')}`);
// Generated items must not duplicate a curated answer.
const curated = new Set(TRANSLATIONS.map((t) => fold(t.de)));
const clash = SENTENCE_TRANSLATIONS.filter((t) => curated.has(fold(t.de))).map((t) => t.id);
if (clash.length) fail(`sentenceTranslation collides with curated: ${clash.slice(0, 5).join(', ')}`);

// ---- grammar drills (4 options, answer among them, one blank) ----
const drills = { 'adjective-endings': ADJECTIVE_ENDINGS, negation: NEGATION, possessives: POSSESSIVES, praeteritum: PRAETERITUM };
for (const [name, items] of Object.entries(drills)) {
  if (items.length < 20) fail(`drill ${name} has ${items.length} items (< 20)`);
  items.forEach((it, i) => {
    if (countBlank(it.text) !== 1) fail(`${name}[${i}] needs exactly one {blank}`);
    if (!Array.isArray(it.options) || it.options.length !== 4) fail(`${name}[${i}] "${it.text}" needs 4 options`);
    if (!it.options.includes(it.answer)) fail(`${name}[${i}] "${it.text}" answer "${it.answer}" not in options`);
    if (new Set(it.options).size !== it.options.length) fail(`${name}[${i}] "${it.text}" duplicate options`);
    if (!it.translation) fail(`${name}[${i}] "${it.text}" missing translation`);
  });
}

// ---- summary ----
console.log('\nCounts:');
console.log(`  VOCAB          ${VOCAB.length}  (nouns ${NOUNS.length})`);
console.log(`  SENTENCES      ${SENTENCES.length}`);
console.log(`  WORD_CHOICE    ${WORD_CHOICE.length}`);
console.log(`  CASES          ${CASES.length}`);
console.log(`  VERBS          ${VERBS.length}`);
console.log(`  STARTER_CARDS  ${STARTER_CARDS.length}`);
console.log(`  CONVERSATION   ${CONVERSATION.length}  (situations ${CONVERSATION_SITUATIONS.length})`);
console.log(`  TRANSLATE      ${TRANSLATIONS.length + SENTENCE_TRANSLATIONS.length}  (curated ${TRANSLATIONS.length} + generated ${SENTENCE_TRANSLATIONS.length})`);
console.log(`  DRILLS         adj ${ADJECTIVE_ENDINGS.length} · neg ${NEGATION.length} · poss ${POSSESSIVES.length} · prät ${PRAETERITUM.length}`);
console.log(errors ? `\n❌ ${errors} problem(s) found.` : '\n✅ All structural checks passed.');
process.exit(errors ? 1 : 0);
