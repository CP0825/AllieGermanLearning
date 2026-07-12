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

// Practice sections. `built: false` sections render a "coming soon" placeholder
// until their learning content is added in a later prompt.
export const SECTIONS = [
  { hash: '#conversation', label: 'Conversation',   emoji: '💬', desc: 'Everyday phrases by situation', built: true },
  { hash: '#flashcards',  label: 'Flashcards',     emoji: '🃏', desc: 'Review your vocabulary',   built: false },
  { hash: '#der-die-das', label: 'der / die / das', emoji: '🇩🇪', desc: 'Master the articles',      built: false },
  { hash: '#fill-blank',  label: 'Fill the blank',  emoji: '✍️', desc: 'Complete the sentence',    built: false },
  { hash: '#word-order',  label: 'Word order',      emoji: '🔀', desc: 'Arrange the words',        built: false },
  { hash: '#conjugate',   label: 'Conjugate',       emoji: '🔤', desc: 'Get the verb endings',     built: false },
  { hash: '#word-choice', label: 'Word choice',     emoji: '🎨', desc: 'Pick the right word',      built: false },
  { hash: '#cases',       label: 'Cases',           emoji: '📦', desc: 'Nom · Akk · Dat · Gen',    built: false },
];

// Highlight the nav item matching the current route. The nav bars are gone, so
// this is a harmless no-op today, but the router still calls it — kept so a
// future nav can re-enable highlighting without touching the router.
export function setActiveNav(hash) {
  document.querySelectorAll('.nav-item').forEach((a) => {
    a.classList.toggle('active', a.dataset.hash === hash);
  });
}
