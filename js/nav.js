// js/nav.js
// ---------------------------------------------------------------------------
// The shared list of learning sections.
//
//   • SECTIONS → every practice area (used by the dashboard tiles + router
//                placeholders). Keeping it here avoids an import cycle.
//
// The old top/bottom nav bars were removed — you now reach Settings from the
// button at the foot of the home screen and return via the ← on each view.
// ---------------------------------------------------------------------------

// Tile groups shown on the dashboard, in display order. The dozen-plus practice
// tiles were getting overwhelming as one flat grid, so each section now belongs
// to a `group` and the dashboard renders them under these headings.
export const GROUPS = [
  { id: 'vocab',     label: 'Vocabulary',       emoji: '🗂️', desc: 'Learn & review words and phrases' },
  { id: 'grammar',   label: 'Grammar',          emoji: '📐', desc: 'Drill the rules, one at a time' },
  { id: 'writing',   label: 'Writing',          emoji: '✍️', desc: 'Put it together and produce German' },
  { id: 'reference', label: 'Reference',        emoji: '📖', desc: 'Look up how it works' },
];

// Practice sections. `built: false` sections render a "coming soon" placeholder.
// `group` places each tile under a heading above (see GROUPS).
export const SECTIONS = [
  // ---- Vocabulary ----
  { hash: '#flashcards',   label: 'Flashcards',      emoji: '🃏', desc: 'Review your vocabulary',    group: 'vocab',   built: true },
  { hash: '#conversation', label: 'Conversation',    emoji: '💬', desc: 'Everyday phrases',          group: 'vocab',   built: true },
  // ---- Grammar (rule drills) ----
  { hash: '#der-die-das',       label: 'der / die / das',  emoji: '🇩🇪', desc: 'Master the articles',    group: 'grammar', built: true },
  { hash: '#plurals',           label: 'Plurals',          emoji: '👥', desc: 'Singular → plural',        group: 'grammar', built: true },
  { hash: '#cases',             label: 'Cases',            emoji: '📦', desc: 'Nom · Akk · Dat · Gen',    group: 'grammar', built: true },
  { hash: '#adjective-endings', label: 'Adjective endings', emoji: '🎯', desc: 'der große / ein großer',  group: 'grammar', built: true },
  { hash: '#negation',          label: 'Negation',         emoji: '🚫', desc: 'kein vs nicht',            group: 'grammar', built: true },
  { hash: '#possessives',       label: 'Possessives',      emoji: '👪', desc: 'mein · dein · sein…',      group: 'grammar', built: true },
  { hash: '#conjugate',         label: 'Conjugate',        emoji: '🔤', desc: 'Present-tense verbs',      group: 'grammar', built: true },
  { hash: '#past-tense',        label: 'Past tense',       emoji: '⏪', desc: 'The Perfekt',              group: 'grammar', built: true },
  { hash: '#praeteritum',       label: 'Präteritum',       emoji: '📜', desc: 'Simple past & polite',     group: 'grammar', built: true },
  // ---- Writing (production) ----
  { hash: '#translate',   label: 'Translate',       emoji: '📝', desc: 'English → German sentence', group: 'writing', built: true },
  { hash: '#fill-blank',  label: 'Fill the blank',  emoji: '✍️', desc: 'Complete the sentence',    group: 'writing', built: true },
  { hash: '#word-choice', label: 'Word choice',     emoji: '🎨', desc: 'Pick the right word',      group: 'writing', built: true },
  { hash: '#word-order',  label: 'Word order',      emoji: '🔀', desc: 'Arrange the words',        group: 'writing', built: true },
  // ---- Reference ----
  { hash: '#grammar', label: 'Grammar reference', emoji: '📖', desc: 'Plain-English explanations', group: 'reference', built: true },
];

// Highlight the nav item matching the current route. The nav bars are gone, so
// this is a harmless no-op today, but the router still calls it — kept so a
// future nav can re-enable highlighting without touching the router.
export function setActiveNav(hash) {
  document.querySelectorAll('.nav-item').forEach((a) => {
    a.classList.toggle('active', a.dataset.hash === hash);
  });
}
