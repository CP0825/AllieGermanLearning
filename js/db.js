// js/db.js
// ---------------------------------------------------------------------------
// Data-access layer.
//
//   • Supabase Postgres is the source of truth.
//   • Every table is mirrored into localStorage for speed + offline use.
//   • READS are cache-first: they return the cached value immediately, then
//     refresh from Supabase in the background and emit a "db:change" event so
//     any open view can re-render with fresh data.
//   • WRITES update the cache immediately, then push to Supabase in the
//     background. If the push fails (offline / error) it is queued and retried
//     on the next successful write or when the browser comes back online.
//
// Everything is exported as an ES module.
// ---------------------------------------------------------------------------

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config.js';

// ---- Configuration guard ---------------------------------------------------
// Detect the untouched placeholder values so the app still runs (local-only)
// before real keys are pasted into config.js.
export const IS_CONFIGURED =
  !!SUPABASE_URL &&
  !SUPABASE_URL.includes('YOUR-PROJECT') &&
  !!SUPABASE_ANON_KEY &&
  !SUPABASE_ANON_KEY.includes('YOUR-ANON-KEY');

// window.supabase is provided by the CDN UMD build loaded in index.html.
const sb = IS_CONFIGURED
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ---- localStorage cache ----------------------------------------------------
const PREFIX = 'ag:'; // "Allie German"

function cacheGet(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function cacheSet(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.warn('[db] cache write failed:', e.message);
  }
}

// Used by background refreshes: write + emit ONLY when the value actually
// changed. This stops a feedback loop where a view re-renders on db:change,
// which re-reads (kicking another refresh), which emits again, and so on.
function setIfChanged(key, value, emitKey = key) {
  const next = JSON.stringify(value);
  if (localStorage.getItem(PREFIX + key) === next) return false;
  try {
    localStorage.setItem(PREFIX + key, next);
  } catch (e) {
    console.warn('[db] cache write failed:', e.message);
  }
  emit(emitKey);
  return true;
}

// ---- Change events ---------------------------------------------------------
// Views subscribe with onChange() and re-render when the cache updates.
function emit(key) {
  window.dispatchEvent(new CustomEvent('db:change', { detail: { key } }));
}
export function onChange(handler) {
  window.addEventListener('db:change', handler);
  return () => window.removeEventListener('db:change', handler);
}

// ---- Small helpers ---------------------------------------------------------
export function today() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (local-ish)
}
function nowISO() {
  return new Date().toISOString();
}
function uuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  // Fallback for older / insecure contexts.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ---- Sync status -----------------------------------------------------------
// Lets the UI show a subtle "saved locally, will sync" indicator.
function emitSync() {
  window.dispatchEvent(new CustomEvent('db:sync', { detail: getSyncStatus() }));
}
export function getSyncStatus() {
  const q = cacheGet('queue') || [];
  return { configured: IS_CONFIGURED, online: navigator.onLine, pending: q.length };
}
export function onSync(handler) {
  window.addEventListener('db:sync', handler);
  return () => window.removeEventListener('db:sync', handler);
}

// ---- Offline write queue ---------------------------------------------------
function enqueue(op) {
  const q = cacheGet('queue') || [];
  q.push(op);
  cacheSet('queue', q);
  emitSync();
}

async function execOp(op) {
  switch (op.type) {
    case 'insert':
      return sb.from(op.table).insert(op.payload);
    case 'update':
      return sb.from(op.table).update(op.payload).eq('id', op.id);
    case 'delete':
      return sb.from(op.table).delete().eq('id', op.id);
    case 'upsert':
      return sb.from(op.table).upsert(op.payload);
    default:
      return { error: new Error('unknown op type: ' + op.type) };
  }
}

// Push a single write. Never throws — failures are queued for retry.
async function push(op) {
  if (!IS_CONFIGURED) return; // local-only mode: cache is the only store
  if (!navigator.onLine) {
    enqueue(op);
    return;
  }
  try {
    const { error } = await execOp(op);
    if (error) throw error;
    flushQueue(); // opportunistically drain anything queued earlier
  } catch (e) {
    console.warn('[db] push failed, queued for retry:', e.message);
    enqueue(op);
  }
}

// Retry every queued write. Called after a successful push and on "online".
export async function flushQueue() {
  if (!IS_CONFIGURED || !navigator.onLine) return;
  const q = cacheGet('queue') || [];
  if (!q.length) return;
  const remaining = [];
  for (const op of q) {
    try {
      const { error } = await execOp(op);
      if (error) throw error;
    } catch {
      remaining.push(op); // keep for the next attempt
    }
  }
  cacheSet('queue', remaining);
  emitSync();
}
window.addEventListener('online', () => { emitSync(); flushQueue(); });
window.addEventListener('offline', emitSync);

// ===========================================================================
// PROFILE  (singleton row)
// ===========================================================================

const DEFAULT_PROFILE = {
  id: null,
  display_name: 'Allie',
  xp: 0,
  streak_count: 0,
  longest_streak: 0,
  last_active: null,
  daily_goal: 20,
  sound_enabled: true,
};

export async function getProfile() {
  const cached = cacheGet('profile');
  if (cached) {
    refreshProfile(); // background refresh
    return cached;
  }
  return refreshProfile();
}

// Also creates the singleton profile row on first run if none exists.
async function refreshProfile() {
  if (!IS_CONFIGURED) {
    let p = cacheGet('profile');
    if (!p) {
      p = { ...DEFAULT_PROFILE };
      setIfChanged('profile', p);
    }
    return p;
  }
  try {
    let { data } = await sb.from('profile').select('*').limit(1).maybeSingle();
    if (!data) {
      const created = await sb.from('profile').insert({}).select().single();
      data = created.data;
    }
    if (data) {
      setIfChanged('profile', data);
      return data;
    }
  } catch (e) {
    console.warn('[db] refreshProfile failed:', e.message);
  }
  return cacheGet('profile') || { ...DEFAULT_PROFILE };
}

// Called once on boot from index.html.
export async function ensureProfile() {
  return getProfile();
}

export async function updateProfile(patch) {
  const current = cacheGet('profile') || { ...DEFAULT_PROFILE };
  const next = { ...current, ...patch };
  cacheSet('profile', next);
  emit('profile');
  if (next.id) {
    push({ type: 'update', table: 'profile', id: next.id, payload: patch });
  }
  return next;
}

// Add to the running total XP on the profile (used by exercises + flashcards).
export async function awardXp(amount) {
  if (!amount) return;
  const p = cacheGet('profile') || { ...DEFAULT_PROFILE };
  return updateProfile({ xp: (p.xp || 0) + amount });
}
// NOTE: streaks are computed from daily_stats history — see recomputeStreak().

// ===========================================================================
// CATEGORIES
// ===========================================================================

export async function getCategories() {
  const cached = cacheGet('categories');
  if (cached) {
    refreshCategories();
    return cached;
  }
  return refreshCategories();
}

async function refreshCategories() {
  if (!IS_CONFIGURED) return cacheGet('categories') || [];
  try {
    const { data } = await sb.from('categories').select('*').order('created_at');
    if (data) {
      setIfChanged('categories', data);
      return data;
    }
  } catch (e) {
    console.warn('[db] refreshCategories failed:', e.message);
  }
  return cacheGet('categories') || [];
}

export async function addCategory({ name, emoji }) {
  const row = {
    id: uuid(),
    name,
    emoji: emoji || null,
    created_at: nowISO(),
  };
  const list = cacheGet('categories') || [];
  list.push(row);
  cacheSet('categories', list);
  emit('categories');
  push({ type: 'insert', table: 'categories', payload: row });
  return row;
}

// ===========================================================================
// CARDS
// ===========================================================================

export async function getCards() {
  const cached = cacheGet('cards');
  if (cached) {
    refreshCards();
    return cached;
  }
  return refreshCards();
}

async function refreshCards() {
  if (!IS_CONFIGURED) return cacheGet('cards') || [];
  try {
    const { data } = await sb.from('cards').select('*').order('created_at');
    if (data) {
      // If we still have un-pushed card writes queued, DON'T let the server copy
      // overwrite them — that would revert an optimistic edit (e.g. a fresh
      // rating) back to the stale row and make the UI "snap back". Keep local
      // until the queue drains and server + cache agree.
      if (queueHas('cards')) return cacheGet('cards') || data;
      setIfChanged('cards', data);
      return data;
    }
  } catch (e) {
    console.warn('[db] refreshCards failed:', e.message);
  }
  return cacheGet('cards') || [];
}

// True if the offline write queue still holds an op targeting `table`.
function queueHas(table) {
  return (cacheGet('queue') || []).some((op) => op.table === table);
}

export async function addCard(card) {
  const row = {
    id: uuid(),
    category_id: card.category_id || null,
    german: card.german,
    english: card.english,
    article: card.article || null,
    emoji: card.emoji || null,
    example: card.example || null,
    ease_factor: 2.5,
    interval: 0,
    repetitions: 0,
    due_date: today(),
    last_reviewed: null,
    last_quality: null,
    created_at: nowISO(),
  };
  const list = cacheGet('cards') || [];
  list.push(row);
  cacheSet('cards', list);
  emit('cards');
  push({ type: 'insert', table: 'cards', payload: row });
  return row;
}

export async function updateCard(id, patch) {
  const list = cacheGet('cards') || [];
  const idx = list.findIndex((c) => c.id === id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...patch };
    cacheSet('cards', list);
    emit('cards');
  }
  push({ type: 'update', table: 'cards', id, payload: patch });
}

export async function deleteCard(id) {
  const list = (cacheGet('cards') || []).filter((c) => c.id !== id);
  cacheSet('cards', list);
  emit('cards');
  push({ type: 'delete', table: 'cards', id });
}

// Cards whose due_date is today or earlier (or unset).
export async function getDueCards() {
  const list = await getCards();
  const t = today();
  return list.filter((c) => !c.due_date || c.due_date <= t);
}

// ===========================================================================
// ACTIVITY LOG
// ===========================================================================

export async function logActivity({ section, is_correct = null, xp_earned = 0, detail = null }) {
  const row = {
    id: uuid(),
    section,
    is_correct,
    xp_earned,
    detail,
    created_at: nowISO(),
  };
  const log = cacheGet('activity') || [];
  log.unshift(row);
  cacheSet('activity', log.slice(0, 200)); // keep cache bounded
  emit('activity');
  push({ type: 'insert', table: 'activity_log', payload: row });
  return row;
}

export async function getActivityLog(limit = 50) {
  const cached = cacheGet('activity');
  if (cached) {
    refreshActivity();
    return cached.slice(0, limit);
  }
  const fresh = await refreshActivity();
  return fresh.slice(0, limit);
}

async function refreshActivity() {
  if (!IS_CONFIGURED) return cacheGet('activity') || [];
  try {
    const { data } = await sb
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (data) {
      setIfChanged('activity', data);
      return data;
    }
  } catch (e) {
    console.warn('[db] refreshActivity failed:', e.message);
  }
  return cacheGet('activity') || [];
}

// ===========================================================================
// DAILY STATS  (keyed by day)
// ===========================================================================

export async function bumpDailyStats({ exercises = 0, correct = 0, xp = 0 }) {
  const day = today();
  const key = 'daily:' + day;
  const current = cacheGet(key) || { day, exercises: 0, correct: 0, xp: 0 };
  const next = {
    day,
    exercises: current.exercises + exercises,
    correct: current.correct + correct,
    xp: current.xp + xp,
  };
  cacheSet(key, next);
  emit('daily');
  // day is the primary key, so upsert overwrites the row with the new totals.
  push({ type: 'upsert', table: 'daily_stats', payload: next });
  return next;
}

export async function getDailyStats(day = today()) {
  const key = 'daily:' + day;
  const cached = cacheGet(key);
  if (cached) {
    refreshDaily(day);
    return cached;
  }
  return refreshDaily(day);
}

async function refreshDaily(day) {
  const key = 'daily:' + day;
  const fallback = { day, exercises: 0, correct: 0, xp: 0 };
  if (!IS_CONFIGURED) return cacheGet(key) || fallback;
  try {
    const { data } = await sb.from('daily_stats').select('*').eq('day', day).maybeSingle();
    const row = data || fallback;
    setIfChanged(key, row, 'daily');
    return row;
  } catch (e) {
    console.warn('[db] refreshDaily failed:', e.message);
    return cacheGet(key) || fallback;
  }
}

// ---- Aggregate daily stats (for streak, heatmap, weekly totals) ------------

let lastAllDailyFetch = 0;

// All daily_stats rows. Cache-first; refreshes from Supabase in the background.
export async function getAllDailyStats() {
  const cached = collectDailyFromCache();
  if (IS_CONFIGURED) refreshAllDaily();
  return cached;
}

async function refreshAllDaily() {
  if (!IS_CONFIGURED) return;
  try {
    const { data } = await sb.from('daily_stats').select('*');
    if (data) {
      let changed = false;
      data.forEach((d) => {
        if (setIfChanged('daily:' + d.day, d, 'daily')) changed = true;
      });
      lastAllDailyFetch = Date.now();
      if (changed) emit('daily');
    }
  } catch (e) {
    console.warn('[db] refreshAllDaily failed:', e.message);
  }
}

function prevDay(dayStr) {
  const d = new Date(dayStr + 'T00:00:00');
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Recompute the current + longest streak from the day-by-day activity and write
// them to the profile. A day "counts" once it has ≥1 exercise. Called after
// every attempt and on dashboard load.
export async function recomputeStreak() {
  // Make sure we have the full history before judging the streak.
  if (IS_CONFIGURED && Date.now() - lastAllDailyFetch > 30000) {
    await refreshAllDaily();
    lastAllDailyFetch = Date.now();
  }
  const active = new Set(
    collectDailyFromCache().filter((d) => (d.exercises || 0) > 0).map((d) => d.day)
  );
  const t = today();

  // Current streak: run of consecutive active days ending today (or yesterday,
  // so a streak stays "alive" until a whole day is missed).
  let cursor = active.has(t) ? t : prevDay(t);
  let current = 0;
  if (active.has(cursor)) {
    while (active.has(cursor)) {
      current++;
      cursor = prevDay(cursor);
    }
  }

  // Longest streak across all history.
  let longest = 0;
  let run = 0;
  const days = [...active].sort();
  for (let i = 0; i < days.length; i++) {
    run = i > 0 && prevDay(days[i]) === days[i - 1] ? run + 1 : 1;
    if (run > longest) longest = run;
  }

  const p = cacheGet('profile') || { ...DEFAULT_PROFILE };
  const newLongest = Math.max(p.longest_streak || 0, longest, current);
  const lastActive = active.has(t) ? t : p.last_active;
  if (
    p.streak_count !== current ||
    (p.longest_streak || 0) !== newLongest ||
    p.last_active !== lastActive
  ) {
    await updateProfile({ streak_count: current, longest_streak: newLongest, last_active: lastActive });
  }
  return current;
}

// A synchronous progress snapshot from cache (used to detect level-ups,
// goal-completion and streak milestones right after an attempt).
export function progressSnapshot() {
  const p = cacheGet('profile') || { ...DEFAULT_PROFILE };
  const d = cacheGet('daily:' + today()) || { exercises: 0 };
  return {
    xp: p.xp || 0,
    streak: p.streak_count || 0,
    goal: p.daily_goal || 20,
    todayExercises: d.exercises || 0,
  };
}

// ===========================================================================
// BACKUP  (export / import everything)
// ===========================================================================

const TABLES = ['profile', 'categories', 'cards', 'activity_log', 'daily_stats'];

export async function exportAll() {
  const dump = { app: 'deutsch-fuer-allie', version: 1, exported_at: nowISO(), tables: {} };
  if (IS_CONFIGURED) {
    for (const t of TABLES) {
      try {
        const { data } = await sb.from(t).select('*');
        dump.tables[t] = data || [];
      } catch {
        dump.tables[t] = [];
      }
    }
  } else {
    dump.tables.profile = [cacheGet('profile')].filter(Boolean);
    dump.tables.categories = cacheGet('categories') || [];
    dump.tables.cards = cacheGet('cards') || [];
    dump.tables.activity_log = cacheGet('activity') || [];
    dump.tables.daily_stats = collectDailyFromCache();
  }
  return dump;
}

function collectDailyFromCache() {
  const out = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIX + 'daily:')) {
      try {
        out.push(JSON.parse(localStorage.getItem(k)));
      } catch {
        /* skip corrupt entry */
      }
    }
  }
  return out;
}

export async function importAll(dump) {
  const tables = (dump && dump.tables) || {};

  // 1. Update the local cache immediately.
  if (tables.profile && tables.profile.length) cacheSet('profile', tables.profile[0]);
  if (tables.categories) cacheSet('categories', tables.categories);
  if (tables.cards) cacheSet('cards', tables.cards);
  if (tables.activity_log) cacheSet('activity', tables.activity_log);
  if (tables.daily_stats) tables.daily_stats.forEach((d) => cacheSet('daily:' + d.day, d));
  emit('all');

  // 2. Push to Supabase (categories first so card FKs resolve).
  if (IS_CONFIGURED) {
    for (const t of ['categories', 'cards', 'profile', 'daily_stats', 'activity_log']) {
      const rows = tables[t];
      if (rows && rows.length) {
        try {
          await sb.from(t).upsert(rows);
        } catch (e) {
          console.warn('[db] import failed for', t, e.message);
        }
      }
    }
  }
}
