// js/nav.js
// ---------------------------------------------------------------------------
// Navigation + the shared list of learning sections.
//
//   • SECTIONS   → every practice area (used by the dashboard tiles + router
//                  placeholders). Keeping it here avoids an import cycle.
//   • NAV_ITEMS  → the small, thumb-friendly set shown in the top tab bar
//                  (desktop) and the fixed bottom nav (mobile).
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

// Primary nav (kept short for mobile thumbs).
export const NAV_ITEMS = [
  { hash: '#dashboard',   label: 'Home',        emoji: '🏠' },
  { hash: '#flashcards',  label: 'Cards',       emoji: '🃏' },
  { hash: '#der-die-das', label: 'der/die/das', emoji: '🇩🇪' },
  { hash: '#settings',    label: 'Settings',    emoji: '⚙️' },
];

function itemsHtml() {
  return NAV_ITEMS.map(
    (i) => `
    <a class="nav-item" href="${i.hash}" data-hash="${i.hash}">
      <span class="nav-emoji">${i.emoji}</span>
      <span class="nav-label">${i.label}</span>
    </a>`
  ).join('');
}

// Render both nav bars from the same source so their active states stay in sync.
export function initNav() {
  const html = itemsHtml();
  const top = document.getElementById('top-nav');
  const bottom = document.getElementById('bottom-nav');
  if (top) top.innerHTML = html;
  if (bottom) bottom.innerHTML = html;
}

// Highlight the nav item matching the current route.
export function setActiveNav(hash) {
  document.querySelectorAll('.nav-item').forEach((a) => {
    a.classList.toggle('active', a.dataset.hash === hash);
  });
}
