// js/flashcards.js  (#flashcards)
// ---------------------------------------------------------------------------
// Translation flashcards (English → German) + full card management.
//   • Review: a slideshow over the shuffled deck. English shows on the front
//     and the card auto-advances after 1.5s. Tap the card to flip to the German
//     word (cancels the auto-advance so you can study it); tap beside the card
//     (or the › zone / "Next card") to move on. Each card seen counts as a
//     review — logged with a light SM-2 "Good" so due dates still progress.
//     (Article / der-die-das drilling lives in the dedicated #der-die-das view.)
//   • Manage: add / edit / delete cards (german, english, article, emoji,
//     category, example) with an emoji category picker.
//   • Seeds STARTER_CARDS the first time the cards table is empty.
// ---------------------------------------------------------------------------

import {
  getCards, addCard, updateCard, deleteCard,
  getCategories, addCategory, today,
} from './db.js';
import { escapeHtml, recordAttempt, sessionBar, shuffle } from './engine.js';
import { speakerButton } from './audio.js';
import { STARTER_CARDS } from './data/starterCards.js';
import { VOCAB_CATEGORIES } from './data/vocab.js';

// Translation review: English prompt → German answer. XP per card reviewed.
const XP_PER_CARD = 6;
// How long a card lingers before auto-advancing to the next (ms).
const AUTO_ADVANCE_MS = 1500;

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
  const bar = sessionBar({ emoji: '🃏', title: 'Flashcards', unit: 'reviewed' });

  container.querySelectorAll('.fc-tab').forEach((t) =>
    t.addEventListener('click', () => setMode(t.dataset.mode))
  );

  function setMode(m) {
    mode = m;
    editingId = null;
    clearTimeout(autoTimer); // never let a pending flip-timer bleed across modes
    container.querySelectorAll('.fc-tab').forEach((t) =>
      t.classList.toggle('active', t.dataset.mode === m)
    );
    if (m === 'review') showReview();
    else showManage();
  }

  // ---- Review (English → German translation slideshow) ----
  // Front = English prompt. The card auto-advances after AUTO_ADVANCE_MS.
  //   • Tap NEXT TO the card (or the › zone / Skip) → jump to the next card now.
  //   • Tap ON the card → flip to reveal the German word; this cancels the
  //     auto-advance so the learner can study it as long as they like.
  let queue = [];
  let idx = 0;
  let flipped = false;
  let autoTimer = null;
  let recorded = false; // count each card as reviewed at most once

  async function showReview() {
    scoreEl.textContent = `⭐ ${session.reviewed} reviewed`;
    const all = await getCards();
    if (!all.length) {
      renderNoCards();
      return;
    }
    queue = shuffle(all);
    idx = 0;
    renderCard();
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

  function renderDeckDone() {
    clearTimeout(autoTimer);
    content.innerHTML = `
      <div class="card fc-done">
        <div class="fc-done-emoji">🎉</div>
        <h2>Deck finished!</h2>
        <p class="muted">You reviewed ${session.reviewed} card${session.reviewed === 1 ? '' : 's'}. Schön gemacht!</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn-primary" id="fc-again">Review again</button>
          <button class="btn" id="fc-tomanage">Manage cards</button>
        </div>
      </div>`;
    content.querySelector('#fc-again').addEventListener('click', showReview);
    content.querySelector('#fc-tomanage').addEventListener('click', () => setMode('manage'));
  }

  function renderCard() {
    clearTimeout(autoTimer);
    flipped = false;
    recorded = false;
    const card = queue[idx];
    const isNoun = !!card.article;
    const artCls = isNoun ? 'opt-' + card.article : '';
    const germanFull = (isNoun ? card.article + ' ' : '') + card.german;
    content.innerHTML = `
      <div class="fc-progress">${idx + 1} / ${queue.length} · ${session.reviewed} done</div>
      <div class="fc-stage" id="fc-stage">
        <div class="flashcard" id="flashcard" tabindex="0" role="button" aria-label="Tap to reveal the German word">
          <div class="fc-inner">
            <div class="fc-face fc-front">
              <div class="fc-emoji">${card.emoji || '🃏'}</div>
              <div class="fc-word">${escapeHtml(card.english)}</div>
              <div class="fc-tap">tap card = German · tap side = next</div>
            </div>
            <div class="fc-face fc-back">
              <div class="fc-answer ${artCls}">${escapeHtml(germanFull)} ${speakerButton(germanFull)}</div>
              ${card.example ? `<div class="fc-example">„${escapeHtml(card.example)}“ ${speakerButton(card.example)}</div>` : ''}
            </div>
          </div>
        </div>
        <button class="fc-next-zone" id="fc-next" type="button" aria-label="Next card">›</button>
      </div>
      <div class="btn-row" style="justify-content:center">
        <button class="btn" id="fc-skip" type="button">Next card →</button>
      </div>`;

    const stage = content.querySelector('#fc-stage');
    const flashcard = content.querySelector('#flashcard');

    // Tap the card → flip and stop the auto-advance so it can be studied.
    flashcard.addEventListener('click', (e) => {
      e.stopPropagation();
      if (e.target.closest('.speak')) return; // tapping 🔊 shouldn't flip
      toggleFlip();
    });
    flashcard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); }
    });

    // Tap anywhere beside the card (the stage) → advance.
    stage.addEventListener('click', (e) => {
      if (e.target.closest('#flashcard')) return;
      advance();
    });
    content.querySelector('#fc-next').addEventListener('click', (e) => { e.stopPropagation(); advance(); });
    content.querySelector('#fc-skip').addEventListener('click', advance);

    // Auto-advance unless the learner taps the card.
    autoTimer = setTimeout(advance, AUTO_ADVANCE_MS);
  }

  function toggleFlip() {
    clearTimeout(autoTimer); // studying → cancel the auto-advance for this card
    const flashcard = content.querySelector('#flashcard');
    flipped = !flipped;
    flashcard.classList.toggle('flipped', flipped);
  }

  // Log the current card as reviewed (once) and nudge its SM-2 due date forward.
  function recordCurrent() {
    if (recorded) return;
    recorded = true;
    const card = queue[idx];
    updateCard(card.id, schedule(card, 4)); // treat a review as "Good"
    recordAttempt('flashcards', true, XP_PER_CARD, card.german);
    session.reviewed += 1;
    scoreEl.textContent = `⭐ ${session.reviewed} reviewed`;
    bar.inc();
  }

  function advance() {
    clearTimeout(autoTimer);
    recordCurrent();
    idx += 1;
    if (idx >= queue.length) renderDeckDone();
    else renderCard();
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
      '<option value="">— category (optional) —</option>' +
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
          <p class="muted small cm-note">Only <b>English</b> and <b>German</b> are required — article, emoji, category and example are optional.</p>
          <div class="btn-row">
            <button class="btn btn-primary" type="submit">${editing ? 'Save changes' : 'Add card'}</button>
            ${editing ? '<button class="btn" type="button" id="cm-cancel">Cancel</button>' : ''}
          </div>
        </form>
      </div>

      ${editing ? '' : bulkHtml()}

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

  function bulkHtml() {
    return `
      <div class="card cm-bulk-card">
        <h2 class="section-label">Bulk add</h2>
        <p class="muted small">
          Paste one word <b>per line</b>. Separate the columns with a <b>Tab</b>
          (paste straight from Excel / Google Sheets) or a <b>comma</b>, in this order:
        </p>
        <div class="cm-bulk-cols">English&nbsp;→&nbsp;German&nbsp;→&nbsp;article&nbsp;→&nbsp;emoji&nbsp;→&nbsp;example</div>
        <p class="muted small">
          Only the first two are required. <b>article</b> must be der / die / das
          (leave blank for non-nouns). Example:
        </p>
        <pre class="cm-bulk-example">apple, Apfel, der, 🍎, Ich esse einen Apfel.
to run, laufen
house, Haus, das, 🏠</pre>
        <textarea id="cm-bulk" class="input cm-bulk-input" rows="6"
          placeholder="apple, Apfel, der, 🍎&#10;house, Haus, das, 🏠&#10;to run, laufen"></textarea>
        <div class="btn-row">
          <button class="btn btn-primary" id="cm-bulk-add" type="button">Add all</button>
        </div>
        <p id="cm-bulk-status" class="save-status" hidden></p>
      </div>`;
  }

  // Parse pasted bulk text into card rows. Tab-delimited if any tab is present
  // (spreadsheet paste), otherwise comma-delimited. Columns:
  //   English, German, article, emoji, example  (only the first two required).
  function parseBulk(text) {
    const ok = [];
    let skipped = 0;
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line) continue;
      const parts = (line.includes('\t') ? line.split('\t') : line.split(','))
        .map((s) => s.trim());
      const [english, german, article, emoji, example] = parts;
      if (!english || !german) { skipped++; continue; }
      const art = ['der', 'die', 'das'].includes((article || '').toLowerCase())
        ? article.toLowerCase()
        : null;
      ok.push({
        english,
        german,
        article: art,
        emoji: emoji || null,
        example: example || null,
        category_id: null,
      });
    }
    return { ok, skipped };
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

    // Bulk add
    const bulkBtn = content.querySelector('#cm-bulk-add');
    if (bulkBtn) {
      bulkBtn.addEventListener('click', async () => {
        const ta = content.querySelector('#cm-bulk');
        const status = content.querySelector('#cm-bulk-status');
        const { ok, skipped } = parseBulk(ta.value);
        if (!ok.length) {
          status.textContent = 'Nothing to add — each line needs at least English and German.';
          status.hidden = false;
          return;
        }
        bulkBtn.disabled = true;
        for (const row of ok) await addCard(row);
        const msg = `Added ${ok.length} card${ok.length === 1 ? '' : 's'}` +
          (skipped ? ` · skipped ${skipped} incomplete line${skipped === 1 ? '' : 's'}` : '');
        await showManage(); // refresh the card list (clears the textarea too)
        const fresh = content.querySelector('#cm-bulk-status');
        if (fresh) { fresh.textContent = msg; fresh.hidden = false; }
      });
    }

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

  // Stop any pending auto-advance and remove the session bar on leave.
  return () => { clearTimeout(autoTimer); bar.remove(); };
}
