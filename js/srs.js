// js/srs.js
// ---------------------------------------------------------------------------
// A lightweight spaced-repetition scheduler for the auto-graded typing
// exercises (currently Translate) — the SAME SM-2 algorithm the flashcards use,
// so a sentence Allie gets wrong comes back soon and one she nails keeps sliding
// further out. Unlike flashcards (which live in the cards table and are
// self-rated), these items are graded automatically from what she types, so we
// map: correct → quality 5, wrong → quality 1, and keep the per-item schedule in
// localStorage keyed by section (nothing to sync — it's a personal study clock).
//
//   const s = makeScheduler('translate');
//   const item = s.pick(ITEMS, x => x.id);   // due-first, then a few new ones
//   s.record(item.id, wasCorrect);           // updates the item's due date
//
// A due-first queue is built lazily and refilled when drained, so calling pick()
// once per round (as the shared runner does) walks the study plan in order.
// ---------------------------------------------------------------------------

import { today } from './db.js';

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// SM-2 on a plain state object { ef, interval, reps }. Mirrors flashcards.schedule.
function sm2(state, quality) {
  let ef = state.ef ?? 2.5;
  let interval = state.interval ?? 0;
  let reps = state.reps ?? 0;

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

  return { ef, interval, reps };
}

export function makeScheduler(section, { newPerSession = 15 } = {}) {
  const storeKey = 'ag:srs:' + section;
  let state;
  try {
    state = JSON.parse(localStorage.getItem(storeKey) || '{}') || {};
  } catch {
    state = {};
  }
  if (typeof state !== 'object' || state === null) state = {};

  function persist() {
    try {
      localStorage.setItem(storeKey, JSON.stringify(state));
    } catch {
      /* ignore quota */
    }
  }

  let queue = [];
  let lastId = null; // avoid serving the very same item twice in a row

  // Study order: items DUE today (most overdue first), then a handful of brand-new
  // ones to introduce. When everything is caught up, do a light refresh of the
  // items whose due date is still in the future (soonest first).
  function build(items, idFn) {
    const t = today();
    const rows = items.map((it) => ({ it, id: idFn(it), s: state[idFn(it)] }));
    const due = rows
      .filter((r) => r.s && r.s.due && r.s.due <= t)
      .sort((a, b) => (a.s.due < b.s.due ? -1 : a.s.due > b.s.due ? 1 : 0));
    const fresh = shuffle(rows.filter((r) => !r.s));
    const future = rows
      .filter((r) => r.s && (!r.s.due || r.s.due > t))
      .sort((a, b) => ((a.s.due || '') < (b.s.due || '') ? -1 : 1));

    let q = [...due.map((r) => r.it), ...fresh.slice(0, newPerSession).map((r) => r.it)];
    if (!q.length) q = future.slice(0, newPerSession).map((r) => r.it);
    if (!q.length) q = shuffle(items);
    return q;
  }

  return {
    pick(items, idFn = (x) => String(x)) {
      if (!items.length) return null;
      if (!queue.length) queue = build(items, idFn);
      let item = queue.shift();
      // Don't repeat the last item back-to-back if the pool allows otherwise.
      if (items.length > 1 && idFn(item) === lastId && queue.length) {
        queue.push(item);
        item = queue.shift();
      }
      lastId = idFn(item);
      return item;
    },

    // wasCorrect → SM-2 quality (5 correct / 1 wrong). Updates the due date.
    record(id, wasCorrect) {
      if (id == null) return;
      const q = wasCorrect ? 5 : 1;
      const next = sm2(state[id] || {}, q);
      state[id] = {
        ef: next.ef,
        interval: next.interval,
        reps: next.reps,
        due: addDays(today(), next.interval),
        last: today(),
      };
      persist();
    },

    // Small progress read-out (used by the dashboard / future UI).
    stats(items, idFn = (x) => String(x)) {
      const t = today();
      let learned = 0;
      let due = 0;
      for (const it of items) {
        const s = state[idFn(it)];
        if (!s) continue;
        learned += 1;
        if (s.due && s.due <= t) due += 1;
      }
      return { total: items.length, learned, due, fresh: items.length - learned };
    },
  };
}
