// js/router.js
// ---------------------------------------------------------------------------
// Tiny hash-based router.
//
//   • #dashboard and #settings render real views.
//   • Every other known route renders a themed "coming soon" placeholder.
//   • A view's render function may return a cleanup function (e.g. to remove a
//     db:change listener); the router calls it before rendering the next view.
// ---------------------------------------------------------------------------

import { SECTIONS, setActiveNav } from './nav.js';
import { renderDashboard } from './dashboard.js';
import { renderSettings } from './settings.js';
import { renderFlashcards } from './flashcards.js';
import { renderDerDieDas } from './derdiedas.js';
import { renderFillBlank } from './fillblank.js';
import { renderWordOrder } from './wordorder.js';
import { renderConjugate } from './conjugate.js';
import { renderWordChoice } from './wordchoice.js';
import { renderCases } from './cases.js';

// hash → render function. Each may return a cleanup function.
const ROUTES = {
  '#dashboard': renderDashboard,
  '#settings': renderSettings,
  '#flashcards': renderFlashcards,
  '#der-die-das': renderDerDieDas,
  '#fill-blank': renderFillBlank,
  '#word-order': renderWordOrder,
  '#conjugate': renderConjugate,
  '#word-choice': renderWordChoice,
  '#cases': renderCases,
};

// hash → { label, emoji } lookup for the fallback placeholder.
const META = {
  '#dashboard': { label: 'Dashboard', emoji: '🏠' },
  '#settings': { label: 'Settings', emoji: '⚙️' },
};
SECTIONS.forEach((s) => {
  META[s.hash] = { label: s.label, emoji: s.emoji };
});

let cleanup = null;
// Monotonic render token. Views render asynchronously (they await the DB), so a
// fast tap can start a new render before the previous one finishes. We stamp
// each render and, once a view resolves, ignore it if a newer render has since
// started — otherwise a stale view would clobber the screen and, worse, leak its
// db:change listener (the classic "Settings shows Home" / "buttons do nothing" /
// "kicked back to the dashboard after one answer" bugs).
let renderId = 0;

function root() {
  return document.getElementById('app-root');
}

async function renderRoute() {
  const myId = ++renderId;

  // Tear down the previous view first.
  if (cleanup) {
    try {
      cleanup();
    } catch {
      /* ignore cleanup errors */
    }
    cleanup = null;
  }

  const hash = location.hash || '#dashboard';
  const el = root();
  el.innerHTML = '';

  const view = ROUTES[hash];
  let result;
  if (view) {
    result = await view(el);
  } else {
    result = renderPlaceholder(el, META[hash] || { label: 'Coming soon', emoji: '✨' });
  }

  // A newer navigation superseded us while we were awaiting. Immediately run
  // this view's cleanup (so its listeners don't leak) and bail — the newer
  // render owns the screen.
  if (myId !== renderId) {
    if (typeof result === 'function') {
      try { result(); } catch { /* ignore */ }
    }
    return;
  }

  cleanup = typeof result === 'function' ? result : null;
  setActiveNav(hash);
  window.scrollTo(0, 0);
}

function renderPlaceholder(el, meta) {
  el.innerHTML = `
    <section class="view placeholder">
      <div class="card placeholder-card">
        <div class="placeholder-emoji">${meta.emoji}</div>
        <h1>${meta.label}</h1>
        <p class="muted">This exercise is coming soon. 🚧</p>
        <a class="btn btn-primary" href="#dashboard">← Back to dashboard</a>
      </div>
    </section>`;
}

export function initRouter() {
  window.addEventListener('hashchange', renderRoute);
  if (!location.hash) location.replace('#dashboard');
  renderRoute();
}
