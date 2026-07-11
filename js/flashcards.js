// js/flashcards.js  (#flashcards)
// ---------------------------------------------------------------------------
// Flashcards with SM-2 spaced repetition + full card management.
//   • Review flow over getDueCards(): flip a card, then rate Again/Hard/Good/
//     Easy. SM-2 updates ease_factor / interval / repetitions / due_date.
//   • Manage: add / edit / delete cards (german, english, article, emoji,
//     category, example) with an emoji category picker.
//   • Seeds STARTER_CARDS the first time the cards table is empty.
// ---------------------------------------------------------------------------

import {
  getCards, addCard, updateCard, deleteCard, getDueCards,
  getCategories, addCategory, today,
} from './db.js';
import { escapeHtml, recordAttempt } from './engine.js';
import { speakerButton } from './audio.js';
import { STARTER_CARDS } from './data/starterCards.js';
import { VOCAB_CATEGORIES } from './data/vocab.js';

// Rating → SM-2 quality, and XP awarded (only when correct, i.e. q ≥ 3).
const RATINGS = [
  { key: 'again', q: 1, label: 'Again', cls: 'r-again' },
  { key: 'hard',  q: 3, label: 'Hard',  cls: 'r-hard' },
  { key: 'good',  q: 4, label: 'Good',  cls: 'r-good' },
  { key: 'easy',  q: 5, label: 'Easy',  cls: 'r-easy' },
];
const XP_BY_Q = { 1: 0, 3: 6, 4: 8, 5: 10 };

// slug (from vocab / starter data) → display category name.
const SLUG_TO_NAME = Object.fromEntries(VOCAB_CATEGORIES.map((c) => [c.id, c.name]));
SLUG_TO_NAME.verbs = 'Verbs';
SLUG_TO_NAME.adjectives = 'Adjectives';

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// The SM-2 algorithm (exactly as specified). Exported for testing.
export function schedule(card, quality) {
  let ef = card.ease_factor ?? 2.5;
  let interval = card.interval ?? 0;
  let reps = card.repetitions ?? 0;

  if (quality < 3) {
    reps = 0;
    interval = 1;
  } else {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 6;
    else interval = Math.round(interval * ef);
    reps += 1;
  }

  ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < 1.3) ef = 1.3;

  return {
    ease_factor: ef,
    interval,
    repetitions: reps,
    due_date: addDays(today(), interval),
    last_reviewed: new Date().toISOString(),
  };
}

function ivLabel(days) {
  if (days <= 1) return '1d';
  if (days < 30) return days + 'd';
  if (days < 365) return Math.round(days / 30) + 'mo';
  return Math.round(days / 365) + 'y';
}

// One-time seed of the starter deck (+ base categories) when empty.
async function maybeSeed() {
  if (localStorage.getItem('ag:seeded')) return;
  const cards = await getCards();
  if (cards.length) {
    localStorage.setItem('ag:seeded', '1');
    return;
  }
  const cats = await ensureBaseCategories();
  const byName = Object.fromEntries(cats.map((c) => [c.name, c.id]));
  for (const sc of STARTER_CARDS) {
    const catName = SLUG_TO_NAME[sc.category];
    await addCard({
      german: sc.german,
      english: sc.english,
      article: sc.article,
      emoji: sc.emoji,
      example: sc.example,
      category_id: catName ? byName[catName] || null : null,
    });
  }
  localStorage.setItem('ag:seeded', '1');
}

async function ensureBaseCategories() {
  let cats = await getCategories();
  if (cats.length) return cats;
  const base = [
    ...VOCAB_CATEGORIES.map((c) => ({ name: c.name, emoji: c.emoji })),
    { name: 'Verbs', emoji: '🔤' },
    { name: 'Adjectives', emoji: '🎨' },
  ];
  for (const b of base) await addCategory(b);
  return getCategories();
}

// ===========================================================================
// View
// ===========================================================================

export async function renderFlashcards(container) {
  await maybeSeed();

  let mode = 'review';
  let editingId = null; // manage mode: id being edited

  container.innerHTML = `
    <section class="view flashcards">
      <header class="ex-head">
        <a class="ex-back" href="#dashboard" title="Back to dashboard">←</a>
        <h1 class="ex-title">🃏 Flashcards</h1>
        <span class="score-pill" id="fc-score">🃏</span>
      </header>
      <div class="fc-tabs">
        <button class="fc-tab" data-mode="review">Review</button>
        <button class="fc-tab" data-mode="manage">Manage cards</button>
      </div>
      <div id="fc-content"></div>
    </section>`;

  const content = container.querySelector('#fc-content');
  const scoreEl = container.querySelector('#fc-score');
  const session = { reviewed: 0 };

  container.querySelectorAll('.fc-tab').forEach((t) =>
    t.addEventListener('click', () => setMode(t.dataset.mode))
  );

  function setMode(m) {
    mode = m;
    editingId = null;
    container.querySelectorAll('.fc-tab').forEach((t) =>
      t.classList.toggle('active', t.dataset.mode === m)
    );
    if (m === 'review') showReview();
    else showManage();
  }

  // ---- Review ----
  let queue = [];

  async function showReview(ahead = false) {
    scoreEl.textContent = `⭐ ${session.reviewed} reviewed`;
    const all = await getCards();
    if (!all.length) {
      renderNoCards();
      return;
    }
    queue = ahead ? all : await getDueCards();
    if (!queue.length) {
      renderCaughtUp(ahead);
      return;
    }
    renderCard(queue[0]);
  }

  function renderNoCards() {
    content.innerHTML = `
      <div class="card fc-done">
        <div class="fc-done-emoji">🌱</div>
        <h2>No cards yet</h2>
        <p class="muted">Add your first word and start building Allie's deck.</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn-primary" id="fc-addfirst">Add a card</button>
        </div>
      </div>`;
    content.querySelector('#fc-addfirst').addEventListener('click', () => setMode('manage'));
  }

  function renderCaughtUp(wasAhead) {
    content.innerHTML = `
      <div class="card fc-done">
        <div class="fc-done-emoji">🎉</div>
        <h2>${wasAhead ? 'Deck finished!' : 'All caught up!'}</h2>
        <p class="muted">${
          session.reviewed
            ? `You reviewed ${session.reviewed} card${session.reviewed === 1 ? '' : 's'}. Schön gemacht!`
            : 'No cards are due right now.'
        }</p>
        <div class="btn-row" style="justify-content:center">
          ${wasAhead ? '' : '<button class="btn" id="fc-ahead">Review ahead</button>'}
          <button class="btn btn-primary" id="fc-tomanage">Manage cards</button>
        </div>
      </div>`;
    const ahead = content.querySelector('#fc-ahead');
    if (ahead) ahead.addEventListener('click', () => showReview(true));
    content.querySelector('#fc-tomanage').addEventListener('click', () => setMode('manage'));
  }

  function renderCard(card) {
    const isNoun = !!card.article;
    const artCls = isNoun ? 'opt-' + card.article : '';
    content.innerHTML = `
      <div class="fc-progress">${queue.length} to review · ${session.reviewed} done</div>
      <div class="flashcard" id="flashcard" tabindex="0" role="button" aria-label="Flip card">
        <div class="fc-inner">
          <div class="fc-face fc-front">
            <div class="fc-emoji">${card.emoji || '🃏'}</div>
            <div class="fc-word">${escapeHtml(card.german)} ${speakerButton(card.german)}</div>
            ${isNoun ? '<div class="fc-hint">der · die · das?</div>' : ''}
            <div class="fc-tap">tap to flip</div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-answer ${artCls}">${isNoun ? escapeHtml(card.article) + ' ' : ''}${escapeHtml(card.german)} ${speakerButton((isNoun ? card.article + ' ' : '') + card.german)}</div>
            <div class="fc-english">${escapeHtml(card.english)}</div>
            ${card.example ? `<div class="fc-example">„${escapeHtml(card.example)}“ ${speakerButton(card.example)}</div>` : ''}
          </div>
        </div>
      </div>
      <button class="btn btn-primary fc-flip-btn" id="fc-flip">Show answer</button>
      <div class="fc-rating" id="fc-rating" hidden>
        ${RATINGS.map((r) => {
          const iv = schedule(card, r.q).interval;
          return `<button class="btn fc-rate ${r.cls}" data-q="${r.q}">
                    <span class="rate-label">${r.label}</span>
                    <span class="rate-iv">${ivLabel(iv)}</span>
                  </button>`;
        }).join('')}
      </div>`;

    const flashcard = content.querySelector('#flashcard');
    const flipBtn = content.querySelector('#fc-flip');
    const rating = content.querySelector('#fc-rating');

    const flip = () => {
      flashcard.classList.add('flipped');
      flipBtn.hidden = true;
      rating.hidden = false;
    };
    flashcard.addEventListener('click', (e) => {
      if (e.target.closest('.speak')) return; // tapping 🔊 shouldn't flip
      flip();
    });
    flashcard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
    flipBtn.addEventListener('click', flip);

    rating.querySelectorAll('.fc-rate').forEach((b) =>
      b.addEventListener('click', () => rate(card, Number(b.dataset.q)))
    );
  }

  async function rate(card, quality) {
    const patch = schedule(card, quality);
    updateCard(card.id, patch);
    recordAttempt('flashcards', quality >= 3, XP_BY_Q[quality] ?? 6, card.german);
    session.reviewed += 1;
    scoreEl.textContent = `⭐ ${session.reviewed} reviewed`;

    queue.shift();
    if (quality < 3) queue.push({ ...card, ...patch }); // relearn this session
    if (queue.length) renderCard(queue[0]);
    else renderCaughtUp(false);
  }

  // ---- Manage ----
  async function showManage() {
    scoreEl.textContent = '🃏';
    const [cards, cats] = await Promise.all([getCards(), getCategories()]);
    const editing = editingId ? cards.find((c) => c.id === editingId) : null;
    content.innerHTML = manageHtml(cards, cats, editing);
    wireManage(cards, cats);
  }

  function catOptions(cats, selected) {
    return (
      '<option value="">— category —</option>' +
      cats
        .map(
          (c) =>
            `<option value="${c.id}" ${c.id === selected ? 'selected' : ''}>${c.emoji || '🏷️'} ${escapeHtml(c.name)}</option>`
        )
        .join('')
    );
  }

  function manageHtml(cards, cats, editing) {
    const e = editing || {};
    return `
      <div class="card cm-form-card">
        <h2 class="section-label">${editing ? 'Edit card' : 'Add a card'}</h2>
        <form id="cm-form" autocomplete="off">
          <div class="cm-grid">
            <input class="input" id="cm-german" placeholder="German (e.g. Apfel)" value="${escapeHtml(e.german || '')}" required />
            <input class="input" id="cm-english" placeholder="English (e.g. apple)" value="${escapeHtml(e.english || '')}" required />
            <select class="input" id="cm-article">
              ${['', 'der', 'die', 'das'].map((a) => `<option value="${a}" ${a === (e.article || '') ? 'selected' : ''}>${a || '— article —'}</option>`).join('')}
            </select>
            <input class="input input-emoji" id="cm-emoji" maxlength="2" placeholder="🍎" value="${escapeHtml(e.emoji || '')}" />
            <select class="input" id="cm-category">${catOptions(cats, e.category_id || '')}</select>
            <input class="input" id="cm-example" placeholder="Example sentence (optional)" value="${escapeHtml(e.example || '')}" />
          </div>
          <div class="btn-row">
            <button class="btn btn-primary" type="submit">${editing ? 'Save changes' : 'Add card'}</button>
            ${editing ? '<button class="btn" type="button" id="cm-cancel">Cancel</button>' : ''}
          </div>
        </form>
      </div>

      <div class="card">
        <h2 class="section-label">Your cards <span class="muted">(${cards.length})</span></h2>
        <div class="cm-list">
          ${
            cards.length
              ? cards.map((c) => cardRow(c, cats)).join('')
              : '<p class="muted small">No cards yet — add one above.</p>'
          }
        </div>
      </div>`;
  }

  function cardRow(c, cats) {
    const cat = cats.find((x) => x.id === c.category_id);
    return `
      <div class="cm-item">
        <span class="cm-emoji">${c.emoji || '🃏'}</span>
        <span class="cm-text">
          <b>${c.article ? escapeHtml(c.article) + ' ' : ''}${escapeHtml(c.german)}</b>
          <span class="muted"> — ${escapeHtml(c.english)}</span>
          ${cat ? `<span class="pill cm-cat">${cat.emoji || '🏷️'} ${escapeHtml(cat.name)}</span>` : ''}
        </span>
        <span class="cm-actions">
          <button class="cm-btn" data-edit="${c.id}" title="Edit">✏️</button>
          <button class="cm-btn" data-del="${c.id}" title="Delete">🗑️</button>
        </span>
      </div>`;
  }

  function wireManage(cards, cats) {
    const form = content.querySelector('#cm-form');
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const payload = {
        german: content.querySelector('#cm-german').value.trim(),
        english: content.querySelector('#cm-english').value.trim(),
        article: content.querySelector('#cm-article').value || null,
        emoji: content.querySelector('#cm-emoji').value.trim() || null,
        category_id: content.querySelector('#cm-category').value || null,
        example: content.querySelector('#cm-example').value.trim() || null,
      };
      if (!payload.german || !payload.english) return;
      if (editingId) {
        await updateCard(editingId, payload);
        editingId = null;
      } else {
        await addCard(payload);
      }
      showManage();
    });

    const cancel = content.querySelector('#cm-cancel');
    if (cancel) cancel.addEventListener('click', () => { editingId = null; showManage(); });

    content.querySelectorAll('[data-edit]').forEach((b) =>
      b.addEventListener('click', () => {
        editingId = b.dataset.edit;
        showManage();
        content.querySelector('#cm-german')?.focus();
      })
    );
    content.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', async () => {
        await deleteCard(b.dataset.del);
        if (editingId === b.dataset.del) editingId = null;
        showManage();
      })
    );
  }

  // Start in review mode.
  setMode('review');

  // No persistent listeners to tear down.
  return () => {};
}
