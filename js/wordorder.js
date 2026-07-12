// js/wordorder.js  (#word-order)
// ---------------------------------------------------------------------------
// Scrambled-sentence exercise. We take a sentence template, fill its blank to
// get a correct German sentence, then scramble the words. The learner taps
// words into place; "Check" validates against the canonical order (which
// encodes the correct German verb position).
//
// Custom UI, but reuses the engine's helpers (rotator, shuffle, recordAttempt).
// ---------------------------------------------------------------------------

import { SENTENCES } from './data/sentences.js';
import { createRotator, shuffle, escapeHtml, recordAttempt, flashResult } from './engine.js';

const XP = 12;

// Build the orderable pool: full sentences of 4–8 words.
const POOL = SENTENCES
  .map((s) => {
    const full = s.text.replace('{blank}', s.answer);
    const tokens = full.split(/\s+/).filter(Boolean);
    return { id: s.id, translation: s.translation, tokens, canonical: tokens.join(' ') };
  })
  .filter((p) => p.tokens.length >= 4 && p.tokens.length <= 8);

export function renderWordOrder(container) {
  const rot = createRotator('word-order');
  const session = { attempts: 0, correct: 0, xp: 0 };
  let answered = false;
  let current = null;
  let answer = []; // [{ id, t }]
  let bank = [];   // [{ id, t }]
  let advanceTimer = null;

  container.innerHTML = `
    <section class="view exercise">
      <header class="ex-head">
        <a class="ex-back" href="#dashboard" title="Back to dashboard">←</a>
        <h1 class="ex-title">🔀 Word order</h1>
        <span class="score-pill" id="ex-score">⭐ 0</span>
      </header>
      <p class="ex-instruction">Tap the words to build the correct German sentence.</p>
      <div class="card ex-card" id="ex-body"></div>
    </section>`;

  const body = container.querySelector('#ex-body');
  const scoreEl = container.querySelector('#ex-score');

  function updateScore() {
    scoreEl.textContent = `⭐ ${session.xp} · ${session.correct}/${session.attempts}`;
  }

  function load() {
    answered = false;
    clearTimeout(advanceTimer);
    body.classList.remove('ex-flash-good', 'ex-flash-bad');
    current = rot.pick(POOL, (p) => p.id);
    answer = [];
    const chips = current.tokens.map((t, i) => ({ id: i, t }));
    // Scramble; reshuffle if we happen to land on the correct order.
    do {
      bank = shuffle(chips);
    } while (bank.length > 1 && bank.map((c) => c.t).join(' ') === current.canonical);
    renderBody();
  }

  function renderBody() {
    body.innerHTML = `
      <div class="wo-cue">Build: <span class="wo-en">${escapeHtml(current.translation)}</span></div>
      <div class="wo-answer" id="wo-answer"></div>
      <div class="wo-bank" id="wo-bank"></div>
      <div class="wo-actions">
        <button class="btn" id="wo-clear" type="button" ${answer.length ? '' : 'disabled'}>Clear</button>
        <button class="btn btn-primary" id="wo-check" type="button" ${bank.length ? 'disabled' : ''}>Check</button>
      </div>
      <div class="ex-feedback" hidden></div>`;
    renderChips();
    body.querySelector('#wo-check').addEventListener('click', check);
    body.querySelector('#wo-clear').addEventListener('click', clearAnswer);
  }

  function renderChips() {
    const ansEl = body.querySelector('#wo-answer');
    const bankEl = body.querySelector('#wo-bank');
    ansEl.innerHTML = answer.length
      ? answer.map((c) => chipHtml(c, 'answer')).join('')
      : `<span class="wo-placeholder">Tap words below…</span>`;
    bankEl.innerHTML = bank.map((c) => chipHtml(c, 'bank')).join('');
    if (!answered) {
      ansEl.querySelectorAll('.word-chip').forEach((el) =>
        el.addEventListener('click', () => moveToBank(Number(el.dataset.id)))
      );
      bankEl.querySelectorAll('.word-chip').forEach((el) =>
        el.addEventListener('click', () => moveToAnswer(Number(el.dataset.id)))
      );
    }
    const checkBtn = body.querySelector('#wo-check');
    const clearBtn = body.querySelector('#wo-clear');
    if (checkBtn) checkBtn.disabled = bank.length > 0;
    if (clearBtn) clearBtn.disabled = answer.length === 0;
  }

  function chipHtml(c, where) {
    return `<button class="word-chip ${where}" data-id="${c.id}" type="button">${escapeHtml(c.t)}</button>`;
  }

  function moveToAnswer(id) {
    if (answered) return;
    const idx = bank.findIndex((c) => c.id === id);
    if (idx < 0) return;
    answer.push(bank[idx]);
    bank.splice(idx, 1);
    renderChips();
  }
  function moveToBank(id) {
    if (answered) return;
    const idx = answer.findIndex((c) => c.id === id);
    if (idx < 0) return;
    bank.push(answer[idx]);
    answer.splice(idx, 1);
    renderChips();
  }
  function clearAnswer() {
    if (answered) return;
    bank = bank.concat(answer);
    answer = [];
    renderChips();
  }

  function check() {
    if (answered || bank.length) return;
    answered = true;
    const attempt = answer.map((c) => c.t).join(' ');
    const isCorrect = attempt === current.canonical;
    session.attempts += 1;
    if (isCorrect) {
      session.xp += XP;
      session.correct += 1;
    }
    updateScore();
    flashResult(body, isCorrect);
    recordAttempt('word-order', isCorrect, XP);

    // Colour the placed chips.
    body.querySelectorAll('#wo-answer .word-chip').forEach((el, i) => {
      el.classList.add(answer[i].t === current.tokens[i] ? 'correct' : 'wrong');
      el.disabled = true;
    });
    body.querySelectorAll('#wo-bank .word-chip').forEach((el) => (el.disabled = true));

    const fb = body.querySelector('.ex-feedback');
    fb.className = 'ex-feedback ' + (isCorrect ? 'good' : 'bad');
    fb.innerHTML = `
      <div class="fb-head">${isCorrect ? 'Perfekt! ✓' : 'Nicht ganz ✗'}</div>
      ${isCorrect ? '' : `<div class="fb-answer">${escapeHtml(current.canonical)}</div>`}
      <div class="fb-translation">${escapeHtml(current.translation)}</div>
      <button class="btn btn-primary ex-next" type="button">Weiter →</button>`;
    fb.hidden = false;
    const nb = fb.querySelector('.ex-next');
    nb.addEventListener('click', load);
    nb.focus(); // wait for the click/Enter — no auto-advance
  }

  function onKey(e) {
    if (e.key !== 'Enter') return;
    if (answered) {
      const nb = body.querySelector('.ex-next');
      if (nb) { e.preventDefault(); load(); }
    } else if (!bank.length) {
      e.preventDefault();
      check();
    }
  }
  document.addEventListener('keydown', onKey);

  updateScore();
  load();

  return () => {
    clearTimeout(advanceTimer);
    document.removeEventListener('keydown', onKey);
  };
}
