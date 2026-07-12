// js/flashcards.js  (#flashcards)
// ---------------------------------------------------------------------------
// Translation flashcards (English → German) + full card management.
//   • Review: step through the shuffled deck at your own pace. English shows on
//     the front; tap the card to flip to the German word. Then self-rate with
//     three buttons (Again / Good / Easy) — that logs the review (SM-2 updates
//     the due date) and moves to the next card. A "Previous card" button steps
//     back. Nothing auto-advances.
//     (Article / der-die-das drilling lives in the dedicated #der-die-das view.)
//   • Manage: add / edit / delete cards (german, english, article, emoji,
//     category, example) with an emoji category picker.
//   • Seeds STARTER_CARDS on first load and tops up missing cards after any
//     SEED_VERSION bump (additive, dedup by german word).
// ---------------------------------------------------------------------------

import {
  getCards, addCard, updateCard, deleteCard,
  getCategories, addCategory, today,
} from './db.js';
import { escapeHtml, recordAttempt, shuffle } from './engine.js';
import { speakerButton } from './audio.js';
import { STARTER_CARDS } from './data/starterCards.js';
import { VOCAB_CATEGORIES } from './data/vocab.js';

// Translation review: English prompt → German answer, then self-rate how well
// it was known. Three buttons → SM-2 quality; XP awarded when known (q ≥ 3).
const RATINGS = [
  { q: 1, label: 'Again',  sub: "didn't know", cls: 'r-again' },
  { q: 4, label: 'Good',   sub: 'knew it',     cls: 'r-good' },
  { q: 5, label: 'Easy',   sub: 'too easy',    cls: 'r-easy' },
];
const XP_BY_Q = { 1: 0, 4: 8, 5: 10 };

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

// Bump this whenever STARTER_CARDS grows so existing users get the new cards.
// (The old all-or-nothing `ag:seeded` flag froze early users at their first
//  seed — deploying more starter cards never reached them. This version key +
//  additive backfill fixes that: on each version bump we add any starter card
//  the deck is missing, matched by german word so nothing is duplicated.)
const SEED_VERSION = '2';

// Seed / top-up the starter deck (+ base categories). Runs the first time and
// again after any SEED_VERSION bump, adding only starter cards not already
// present (dedup by lower-cased german word).
async function maybeSeed() {
  if (localStorage.getItem('ag:seedVersion') === SEED_VERSION) return;

  const cats = await ensureBaseCategories();
  const byName = Object.fromEntries(cats.map((c) => [c.name, c.id]));

  const existing = await getCards();
  const have = new Set(existing.map((c) => (c.german || '').trim().toLowerCase()));

  for (const sc of STARTER_CARDS) {
    if (have.has(sc.german.trim().toLowerCase())) continue;
    const catName = SLUG_TO_NAME[sc.category];
    await addCard({
      german: sc.german,
      english: sc.english,
      article: sc.article,
      emoji: sc.emoji,
      example: sc.example,
      category_id: catName ? byName[catName] || null : null,
    });
    have.add(sc.german.trim().toLowerCase());
  }

  localStorage.setItem('ag:seedVersion', SEED_VERSION);
  localStorage.setItem('ag:seeded', '1'); // keep legacy flag set for older code paths
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

  // ---- Review (English → German, self-paced with self-rating) ----
  // Front = English prompt. Tap the card to flip to the German answer, then rate
  // Again / Good / Easy to log the review and move on. "Previous card" steps
  // back. Nothing auto-advances.
  let queue = [];
  let idx = 0;
  let flipped = false;

  // Persist where you are in the deck so leaving (or switching to Manage) and
  // coming back RESUMES instead of resetting the counter to 1. We store the card
  // order + current index + reviewed count; on return we rebuild the queue from
  // the saved order and drop in front any brand-new cards not yet seen.
  const SESSION_KEY = 'ag:fcSession';

  function persistSession() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        ids: queue.map((c) => c.id), idx, reviewed: session.reviewed,
      }));
    } catch { /* ignore quota */ }
  }
  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  }
  // Rebuild queue/idx/reviewed from a saved session. Returns false if none valid.
  function restoreSession(all) {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { /* ignore */ }
    if (!saved || !Array.isArray(saved.ids) || !saved.ids.length) return false;
    const byId = new Map(all.map((c) => [c.id, c]));
    const restored = saved.ids.map((id) => byId.get(id)).filter(Boolean);
    // Append any cards not in the saved order (newly added / freshly seeded).
    const inQueue = new Set(saved.ids);
    for (const c of all) if (!inQueue.has(c.id)) restored.push(c);
    if (!restored.length) return false;
    queue = restored;
    idx = Math.min(Math.max(saved.idx || 0, 0), queue.length - 1);
    session.reviewed = saved.reviewed || 0;
    return true;
  }

  async function showReview() {
    const all = await getCards();
    if (!all.length) {
      renderNoCards();
      return;
    }
    if (!restoreSession(all)) {
      queue = shuffle(all);
      idx = 0;
      session.reviewed = 0;
      persistSession();
    }
    scoreEl.textContent = `⭐ ${session.reviewed} reviewed`;
    renderCard();
  }

  // Start a fresh shuffled pass (used by "Review again").
  async function restartReview() {
    clearSession();
    const all = await getCards();
    if (!all.length) { renderNoCards(); return; }
    queue = shuffle(all);
    idx = 0;
    session.reviewed = 0;
    persistSession();
    scoreEl.textContent = `⭐ ${session.reviewed} reviewed`;
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
    content.querySelector('#fc-again').addEventListener('click', restartReview);
    content.querySelector('#fc-tomanage').addEventListener('click', () => setMode('manage'));
  }

  function renderCard() {
    flipped = false;
    const card = queue[idx];
    const isNoun = !!card.article;
    const artCls = isNoun ? 'opt-' + card.article : '';
    const germanFull = (isNoun ? card.article + ' ' : '') + card.german;
    content.innerHTML = `
      <div class="fc-progress">${idx + 1} / ${queue.length} · ${session.reviewed} done</div>
      <div class="flashcard" id="flashcard" tabindex="0" role="button" aria-label="Tap to reveal the German word">
        <div class="fc-inner">
          <div class="fc-face fc-front">
            <div class="fc-emoji">${card.emoji || '🃏'}</div>
            <div class="fc-word">${escapeHtml(card.english)}</div>
            <div class="fc-tap">tap to see the German word</div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-answer ${artCls}">${escapeHtml(germanFull)} ${speakerButton(germanFull)}</div>
            ${card.example ? `<div class="fc-example">„${escapeHtml(card.example)}“ ${speakerButton(card.example)}</div>` : ''}
          </div>
        </div>
      </div>
      <p class="fc-rate-cue muted">How well did you know it?</p>
      <div class="fc-rating" id="fc-rating">
        ${RATINGS.map((r) => `
          <button class="btn fc-rate ${r.cls}" data-q="${r.q}" type="button">
            <span class="rate-label">${r.label}</span>
            <span class="rate-iv">${r.sub}</span>
          </button>`).join('')}
      </div>
      <div class="btn-row fc-prev-row" style="justify-content:center">
        <button class="btn" id="fc-prev" type="button" ${idx === 0 ? 'disabled' : ''}>← Previous card</button>
      </div>`;

    const flashcard = content.querySelector('#flashcard');

    // Tap the card → flip between English and German.
    flashcard.addEventListener('click', (e) => {
      if (e.target.closest('.speak')) return; // tapping 🔊 shouldn't flip
      toggleFlip();
    });
    flashcard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); }
    });

    content.querySelectorAll('.fc-rate').forEach((b) =>
      b.addEventListener('click', () => rate(Number(b.dataset.q)))
    );
    content.querySelector('#fc-prev').addEventListener('click', goPrev);
  }

  function toggleFlip() {
    const flashcard = content.querySelector('#flashcard');
    flipped = !flipped;
    flashcard.classList.toggle('flipped', flipped);
  }

  // A rating logs the review, updates the SM-2 due date, and advances. Position
  // is persisted after every rating, so leaving mid-deck resumes where you were.
  function rate(quality) {
    const card = queue[idx];
    // Persist the SM-2 update AND the last rating (powers the progress donut).
    updateCard(card.id, { ...schedule(card, quality), last_quality: quality });
    card.last_quality = quality; // keep the in-memory queue copy in sync
    recordAttempt('flashcards', quality >= 3, XP_BY_Q[quality] ?? 6, card.german);
    session.reviewed += 1;
    scoreEl.textContent = `⭐ ${session.reviewed} reviewed`;
    // "Again" = didn't know it → re-queue the card a few positions ahead so it
    // actually comes back around within this same session, not just next time.
    if (quality < 3) {
      const insertAt = Math.min(idx + 6, queue.length);
      queue.splice(insertAt, 0, card);
    }
    idx += 1;
    if (idx >= queue.length) {
      clearSession(); // finished the pass — next entry starts fresh
      renderDeckDone();
    } else {
      persistSession();
      renderCard();
    }
  }

  // Step back to the previous card (without un-counting anything already rated).
  function goPrev() {
    if (idx === 0) return;
    idx -= 1;
    persistSession();
    renderCard();
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
}
