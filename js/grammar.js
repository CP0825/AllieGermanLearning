// js/grammar.js  (#grammar)
// ---------------------------------------------------------------------------
// The Grammar reference: a browsable page of the plain-English explanations,
// including topics that don't have their own drill yet (Perfekt, adjective
// endings, negation, possessives, plurals, numbers). Content lives in
// data/explanations.js so the exercises and this page never drift apart.
// ---------------------------------------------------------------------------

import { GRAMMAR_ORDER, explainTopic } from './data/explanations.js';
import { escapeHtml } from './engine.js';

export function renderGrammar(el) {
  const topics = GRAMMAR_ORDER.map((key) => ({ key, ...explainTopic(key) })).filter((t) => t.title);

  el.innerHTML = `
    <section class="view exercise grammar">
      <header class="ex-head">
        <a class="ex-back" href="#dashboard" title="Back to home">←</a>
        <h1 class="ex-title">📖 Grammar</h1>
        <span class="score-pill">📖</span>
      </header>
      <p class="ex-instruction">Plain-English explanations of the German you're practising.</p>
      <nav class="gr-toc">
        ${topics
          .map((t) => `<button class="gr-chip" type="button" data-target="gr-${t.key}">${t.emoji} ${escapeHtml(t.title)}</button>`)
          .join('')}
      </nav>
      ${topics
        .map(
          (t, i) => `
        <details class="card gr-card" id="gr-${t.key}"${i === 0 ? ' open' : ''}>
          <summary><span class="gr-emoji">${t.emoji}</span> ${escapeHtml(t.title)}</summary>
          <div class="gr-body">${t.html}</div>
        </details>`
        )
        .join('')}
    </section>`;

  // TOC chips open + scroll to their card (buttons, not hash links, so the
  // router isn't triggered).
  el.querySelectorAll('.gr-chip').forEach((chip) =>
    chip.addEventListener('click', () => {
      const card = el.querySelector('#' + chip.dataset.target);
      if (!card) return;
      card.open = true;
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    })
  );
}
