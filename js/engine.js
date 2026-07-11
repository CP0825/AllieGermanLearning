// js/engine.js
// ---------------------------------------------------------------------------
// The shared exercise engine — the anti-staleness core.
//
//   • createRotator(section)  — a least-recently-seen picker backed by
//     localStorage, so every round samples a fresh item and rotates through the
//     whole pool before repeating.
//   • runner(container, spec) — renders the common exercise shell (header,
//     score, prompt card, options/input, instant feedback, XP, next) and drives
//     round after round from spec.nextRound(). Used by der/die/das, fill-blank,
//     conjugate, word-choice and cases. Word-order and flashcards have their own
//     custom UI but reuse the helpers below.
//   • recordAttempt(...) — logs every attempt to Supabase (activity + daily
//     stats + XP + streak).
//
// Depends only on the data layer (db.js).
// ---------------------------------------------------------------------------

import { logActivity, bumpDailyStats, awardXp, recomputeStreak, progressSnapshot } from './db.js';
import { levelFromXp } from './levels.js';
import { speakerButton } from './audio.js';

// ---- Generic helpers -------------------------------------------------------

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function randOf(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Pick up to n distinct items from arr (excluding those matching `exclude`).
export function sample(arr, n, exclude = () => false) {
  return shuffle(arr.filter((x) => !exclude(x))).slice(0, n);
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}

// Normalise a typed answer for tolerant comparison.
export function normalize(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.!?,;:„“"'»«]/g, '');
}

// Classic Levenshtein edit distance.
export function levenshtein(a, b) {
  a = a || '';
  b = b || '';
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let cur = new Array(n + 1);
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[n];
}

// Typo-tolerant equality: exact after normalising, or within a small edit
// distance that scales with word length (so "trinke" ~ "trikne" passes but
// short words stay strict).
export function fuzzyEqual(input, answer) {
  const A = normalize(input);
  const B = normalize(answer);
  if (!A) return false;
  if (A === B) return true;
  const tol = B.length >= 8 ? 2 : B.length >= 5 ? 1 : 0;
  return levenshtein(A, B) <= tol;
}

// ---- Session bar -----------------------------------------------------------
// A fixed bar pinned above the mobile bottom-nav that shows how many items the
// learner has done in THIS practice session and an explicit Exit. It lives on
// <body> (outside the routed view) so it survives per-round re-renders; every
// exercise removes it in its router cleanup. Creating a new bar first clears any
// stale one, so a leaked bar can never stack.
export function sessionBar({ emoji = '✨', title = '', unit = 'done' } = {}) {
  document.getElementById('session-bar')?.remove();
  const bar = document.createElement('div');
  bar.id = 'session-bar';
  bar.className = 'session-bar';
  bar.innerHTML = `
    <div class="sb-info">
      <span class="sb-emoji">${emoji}</span>
      <span class="sb-title">${escapeHtml(title)}</span>
    </div>
    <div class="sb-count"><span class="sb-num">0</span> <span class="sb-unit">${escapeHtml(unit)}</span></div>
    <a class="sb-exit" href="#dashboard" aria-label="Exit practice">Exit ✕</a>`;
  document.body.appendChild(bar);
  document.body.classList.add('has-session-bar');
  const numEl = bar.querySelector('.sb-num');
  let n = 0;
  const paint = () => {
    numEl.textContent = String(n);
    numEl.classList.remove('bump');
    void numEl.offsetWidth; // restart the little bump animation
    numEl.classList.add('bump');
  };
  return {
    set(v) { n = v; paint(); },
    inc() { n += 1; paint(); },
    remove() {
      bar.remove();
      document.body.classList.remove('has-session-bar');
    },
  };
}

// ---- Least-recently-seen rotator ------------------------------------------
// Keeps a per-section window of recently used item ids in localStorage. When
// every id is in the window we pick the oldest still-in-pool id, guaranteeing a
// full rotation before repeats.

export function createRotator(section) {
  const storeKey = 'ag:seen:' + section;
  let seen;
  try {
    seen = JSON.parse(localStorage.getItem(storeKey) || '[]');
  } catch {
    seen = [];
  }
  if (!Array.isArray(seen)) seen = [];

  function persist() {
    try {
      localStorage.setItem(storeKey, JSON.stringify(seen));
    } catch {
      /* ignore quota errors */
    }
  }

  return {
    // items: array; idFn(item) → stable string id.
    pick(items, idFn = (x) => String(x)) {
      if (!items.length) return null;
      const ids = items.map(idFn);
      const fresh = items.filter((_, i) => !seen.includes(ids[i]));
      let chosenIdx;
      if (fresh.length) {
        const f = randOf(fresh);
        chosenIdx = items.indexOf(f);
      } else {
        // Everything seen → take the least-recently-seen id still in the pool.
        const oldest = seen.find((id) => ids.includes(id));
        chosenIdx = oldest != null ? ids.indexOf(oldest) : Math.floor(Math.random() * items.length);
      }
      const id = ids[chosenIdx];
      seen = seen.filter((x) => x !== id);
      seen.push(id);
      const cap = Math.min(Math.max(items.length - 1, 1), 200);
      if (seen.length > cap) seen = seen.slice(seen.length - cap);
      persist();
      return items[chosenIdx];
    },
  };
}

// ---- Attempt recording -----------------------------------------------------

const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365];

export async function recordAttempt(section, isCorrect, xp, label = null) {
  try {
    const before = progressSnapshot();
    // Small streak bonus: +1 XP per 3 days of current streak, capped at +5.
    const bonus = isCorrect ? Math.min(5, Math.floor((before.streak || 0) / 3)) : 0;
    const earned = (isCorrect ? xp : 0) + bonus;

    logActivity({ section, is_correct: isCorrect, xp_earned: earned, detail: label ? { label } : null });
    bumpDailyStats({ exercises: 1, correct: isCorrect ? 1 : 0, xp: earned });
    if (earned) awardXp(earned);
    await recomputeStreak();

    fireCelebrations(before, progressSnapshot());
    return earned;
  } catch (e) {
    console.warn('[engine] recordAttempt failed:', e.message);
    return 0;
  }
}

// Detect level-ups, daily-goal completion and streak milestones, and dispatch
// a "celebrate" event for celebrate.js to pick up.
function fireCelebrations(before, after) {
  const events = [];
  const beforeLvl = levelFromXp(before.xp);
  const afterLvl = levelFromXp(after.xp);
  if (afterLvl > beforeLvl) events.push({ type: 'level', level: afterLvl });
  if (before.todayExercises < before.goal && after.todayExercises >= after.goal)
    events.push({ type: 'goal' });
  if (after.streak > before.streak && STREAK_MILESTONES.includes(after.streak))
    events.push({ type: 'streak', value: after.streak });
  events.forEach((d) => window.dispatchEvent(new CustomEvent('celebrate', { detail: d })));
}

// Encouraging bilingual microcopy (chosen at random for variety).
const PRAISE = ['Richtig! ✓', 'Super gemacht! ✨', 'Genau! 🎉', 'Perfekt! ✓', 'Klasse! 🌟'];
const NUDGE = ['Fast! Try again 💪', 'Nicht ganz ✗', 'Kein Problem — weiter!', 'Knapp daneben 💭'];

// ===========================================================================
// GENERIC RUNNER  (choice + input exercises)
// ===========================================================================
//
// spec = {
//   section:  string (used for logging + rotator),
//   title:    string,   emoji: string,   instruction: string,
//   xp:       number (default 10),
//   nextRound(): round     // called for every new question
// }
//
// round = {
//   prompt:      html string (the question / sentence),
//   type:        'choice' | 'input',
//   options:     [{ label, value, correct? }]   // choice
//   shuffle:     boolean (default true)          // choice
//   optionClass: (value) => string               // choice (optional styling)
//   answer:      string                          // input canonical answer
//   accept:      (userInput) => boolean          // input (optional custom check)
//   reveal:      string   // the correct answer shown in feedback
//   translation: string   // optional, shown after answering
//   hint:        string   // optional, shown after answering
// }

export function runner(container, spec) {
  const xpPerRound = spec.xp || 10;
  const session = { attempts: 0, correct: 0, xp: 0 };
  let answered = false;
  let advanceTimer = null;

  container.innerHTML = `
    <section class="view exercise">
      <header class="ex-head">
        <a class="ex-back" href="#dashboard" title="Back to dashboard">←</a>
        <h1 class="ex-title">${spec.emoji || ''} ${escapeHtml(spec.title || '')}</h1>
        <span class="score-pill" id="ex-score">⭐ 0</span>
      </header>
      <p class="ex-instruction">${escapeHtml(spec.instruction || '')}</p>
      <div class="card ex-card" id="ex-body"></div>
    </section>`;

  const body = container.querySelector('#ex-body');
  const scoreEl = container.querySelector('#ex-score');
  const bar = sessionBar({ emoji: spec.emoji, title: spec.title, unit: 'done' });

  function updateScore() {
    scoreEl.textContent = `⭐ ${session.xp} · ${session.correct}/${session.attempts}`;
  }

  function next() {
    clearTimeout(advanceTimer);
    answered = false;
    loadRound();
  }

  function finishRound(isCorrect, round) {
    if (answered) return;
    answered = true;
    session.attempts += 1;
    if (isCorrect) {
      session.xp += xpPerRound;
      session.correct += 1;
    }
    updateScore();
    bar.inc();
    recordAttempt(spec.section, isCorrect, xpPerRound, round.label || round.reveal);
    renderFeedback(isCorrect, round);
    // Auto-advance on a correct answer; wait for the learner on a wrong one.
    if (isCorrect) advanceTimer = setTimeout(next, 1300);
  }

  function renderFeedback(isCorrect, round) {
    const fb = body.querySelector('.ex-feedback');
    const extras = [];
    if (!isCorrect) extras.push(`<div class="fb-answer">Answer: <b>${escapeHtml(round.reveal)}</b></div>`);
    if (round.speak) {
      extras.push(`<div class="fb-listen">${speakerButton(round.speak)}<span>${escapeHtml(round.speak)}</span></div>`);
    }
    if (round.translation) extras.push(`<div class="fb-translation">${escapeHtml(round.translation)}</div>`);
    if (round.hint) extras.push(`<div class="fb-hint">💡 ${escapeHtml(round.hint)}</div>`);
    fb.className = 'ex-feedback ' + (isCorrect ? 'good' : 'bad');
    fb.innerHTML = `
      <div class="fb-head">${isCorrect ? randOf(PRAISE) : randOf(NUDGE)}</div>
      ${extras.join('')}
      <button class="btn btn-primary ex-next" type="button">Weiter →</button>`;
    fb.hidden = false;
    const nextBtn = fb.querySelector('.ex-next');
    nextBtn.addEventListener('click', next);
    if (!isCorrect) nextBtn.focus();
  }

  function loadRound() {
    const round = spec.nextRound();
    body.innerHTML = renderRound(round);
    if (round.type === 'choice') wireChoice(round);
    else wireInput(round);
  }

  function renderRound(round) {
    if (round.type === 'choice') {
      const opts = round.shuffle === false ? round.options : shuffle(round.options);
      const buttons = opts
        .map((o, i) => {
          const cls = round.optionClass ? ' ' + round.optionClass(o.value) : '';
          return `<button class="btn ex-option${cls}" data-i="${i}" data-correct="${!!(o.correct || o.value === round.answer)}">
                    <span class="opt-key">${i + 1}</span>${escapeHtml(o.label)}
                  </button>`;
        })
        .join('');
      return `
        <div class="ex-prompt">${round.prompt}</div>
        <div class="ex-options">${buttons}</div>
        <div class="ex-feedback" hidden></div>`;
    }
    // input
    return `
      <div class="ex-prompt">${round.prompt}</div>
      <form class="ex-input-form" autocomplete="off">
        <input class="input ex-input" type="text" placeholder="Type your answer…" autocomplete="off" autocapitalize="off" spellcheck="false" />
        <button class="btn btn-primary" type="submit">Check</button>
      </form>
      <div class="ex-feedback" hidden></div>`;
  }

  function wireChoice(round) {
    const btns = [...body.querySelectorAll('.ex-option')];
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        const isCorrect = btn.dataset.correct === 'true';
        btns.forEach((b) => {
          b.disabled = true;
          if (b.dataset.correct === 'true') b.classList.add('correct');
        });
        if (!isCorrect) btn.classList.add('wrong');
        finishRound(isCorrect, round);
      });
    });
  }

  function wireInput(round) {
    const form = body.querySelector('.ex-input-form');
    const input = body.querySelector('.ex-input');
    input.focus();
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (answered) return;
      const val = input.value;
      if (!val.trim()) return;
      const isCorrect = round.accept ? round.accept(val) : fuzzyEqual(val, round.answer);
      input.classList.add(isCorrect ? 'correct' : 'wrong');
      input.disabled = true;
      form.querySelector('button').disabled = true;
      finishRound(isCorrect, round);
    });
  }

  // Keyboard: 1-4 to choose, Enter to advance once answered.
  function onKey(e) {
    if (answered) {
      if (e.key === 'Enter') {
        const nb = body.querySelector('.ex-next');
        if (nb) { e.preventDefault(); next(); }
      }
      return;
    }
    if (/^[1-9]$/.test(e.key)) {
      const btn = body.querySelector(`.ex-option[data-i="${Number(e.key) - 1}"]`);
      if (btn) { e.preventDefault(); btn.click(); }
    }
  }
  document.addEventListener('keydown', onKey);

  updateScore();
  loadRound();

  // Cleanup for the router.
  return () => {
    clearTimeout(advanceTimer);
    document.removeEventListener('keydown', onKey);
    bar.remove();
  };
}
