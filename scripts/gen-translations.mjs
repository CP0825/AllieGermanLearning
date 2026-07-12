// scripts/gen-translations.mjs
// ---------------------------------------------------------------------------
// Regenerate js/data/sentenceTranslations.js from js/data/sentences.js.
// Turns every fill-the-blank sentence into a full-sentence English→German
// production item for the Translate exercise (blank filled with its vetted
// answer). Deduped against the hand-authored TRANSLATIONS.
//   Run from the project root:  node scripts/gen-translations.mjs
// ---------------------------------------------------------------------------
import { SENTENCES } from '../js/data/sentences.js';
import { TRANSLATIONS } from '../js/data/translations.js';
import { writeFileSync } from 'node:fs';

const fold = (s) =>
  String(s).trim().toLowerCase().replace(/\s+/g, ' ')
    .replace(/[.!?,;:„“"'»«]/g, '')
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');

// Curated answers already covered — don't duplicate them.
const seen = new Set(TRANSLATIONS.map((t) => fold(t.de)));
const items = [];
let skipped = 0;

for (const s of SENTENCES) {
  const de = s.text.replace('{blank}', s.answer).trim();
  const en = (s.translation || '').trim();
  if (!en || !de) { skipped++; continue; }
  const key = fold(de);
  if (seen.has(key)) { skipped++; continue; }
  seen.add(key);
  items.push({ id: 't-' + s.id, en, de, level: s.level || 'A1', tags: s.tags || [] });
}

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const lines = items.map((it) => {
  const tags = it.tags.length ? `[${it.tags.map((t) => `'${esc(t)}'`).join(', ')}]` : '[]';
  return `  { id: '${it.id}', en: '${esc(it.en)}', de: '${esc(it.de)}', level: '${esc(it.level)}', tags: ${tags} },`;
});

const out = `// js/data/sentenceTranslations.js
// ---------------------------------------------------------------------------
// AUTO-GENERATED from js/data/sentences.js — do not edit by hand.
// Every A1–A2 fill-the-blank sentence, reconstructed into a full-sentence
// English→German PRODUCTION item for the Translate exercise. The blank is
// filled with its vetted answer, so each \`de\` is a complete, correct sentence;
// \`en\` is the sentence's own translation.
//   Regenerate: node scripts/gen-translations.mjs
// Matching in translate.js is lenient on case/punctuation/umlauts but strict on
// words + order, and the model answer is always shown, so these teach even when
// a valid alternative phrasing is marked wrong.
// ---------------------------------------------------------------------------

export const SENTENCE_TRANSLATIONS = [
${lines.join('\n')}
];
`;

writeFileSync(new URL('../js/data/sentenceTranslations.js', import.meta.url), out);
console.log(`Wrote ${items.length} items (skipped ${skipped}).`);
