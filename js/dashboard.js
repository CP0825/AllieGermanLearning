// js/dashboard.js  (#dashboard)
// ---------------------------------------------------------------------------
// The progress hub. Turns daily_stats + activity_log + cards into a rewarding
// story: streak, level + XP, mastered/total/accuracy/weekly stats, a 12-week
// activity heatmap, a daily-goal ring, and a recent-activity feed.
// ---------------------------------------------------------------------------

import {
  getProfile, getCards, getAllDailyStats, getDailyStats, getActivityLog,
  recomputeStreak, onChange,
} from './db.js';
import { levelProgress, levelTitle } from './levels.js';
import { SECTIONS, GROUPS } from './nav.js';
import { cutePrefs, randomLoveNote, heroGreeting } from './cute.js';

// section id (hash without '#') → { emoji, label }
const SEC = {};
SECTIONS.forEach((s) => { SEC[s.hash.slice(1)] = { emoji: s.emoji, label: s.label }; });

export async function renderDashboard(el) {
  let t = null; // debounce timer for background refreshes

  const paint = async () => {
    recomputeStreak(); // keep the streak honest on every visit
    const [profile, cards, allDaily, todayStats, activity] = await Promise.all([
      getProfile(),
      getCards(),
      getAllDailyStats(),
      getDailyStats(),
      getActivityLog(200),
    ]);
    // Guard against a late/background refresh landing after we've navigated
    // away — never let the dashboard repaint over another view.
    if ((location.hash || '#dashboard') !== '#dashboard') return;
    el.innerHTML = template({ profile, cards, allDaily, todayStats, activity });
  };

  await paint();

  // Coalesce the burst of db:change events a background refresh can produce.
  const off = onChange(() => {
    clearTimeout(t);
    t = setTimeout(paint, 160);
  });
  return () => { clearTimeout(t); off(); };
}

// ---- date helpers ----
function dayStr(d) { return d.toISOString().slice(0, 10); }
function lastNDays(n) {
  const out = [];
  const base = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(base.getDate() - i);
    out.push(dayStr(d));
  }
  return out;
}

function heatClass(ex) {
  if (!ex) return 'hm-0';
  if (ex <= 2) return 'hm-1';
  if (ex <= 5) return 'hm-2';
  if (ex <= 9) return 'hm-3';
  return 'hm-4';
}

function template({ profile, cards, allDaily, todayStats, activity }) {
  const name = escapeHtml(profile.display_name || 'Allie');
  const sub = heroGreeting();
  const cute = cutePrefs();
  const note = randomLoveNote();

  // Level + XP
  const lvl = levelProgress(profile.xp || 0);

  // Cards — a word counts as "mastered" once its SM-2 interval reaches 21 days
  // (i.e. it survived enough successful reviews to be scheduled 3+ weeks out).
  const mastered = cards.filter((c) => (c.interval || 0) >= 21).length;

  // Weekly exercises
  const week = new Set(lastNDays(7));
  const weekEx = allDaily.filter((d) => week.has(d.day)).reduce((s, d) => s + (d.exercises || 0), 0);

  // Goal ring
  const goal = profile.daily_goal || 20;
  const doneToday = todayStats.exercises || 0;
  const goalPct = goal > 0 ? Math.min(100, Math.round((doneToday / goal) * 100)) : 0;

  // Accuracy per section (from graded activity)
  const acc = {};
  for (const a of activity) {
    if (a.is_correct === null || a.is_correct === undefined) continue;
    (acc[a.section] ||= { c: 0, n: 0 }).n++;
    if (a.is_correct) acc[a.section].c++;
  }

  return `
    <section class="view dashboard">
      <header class="hero">
        <div class="hero-row">
          <div>
            <h1 class="hero-title">Hallo ${name} <span class="wave">💕</span></h1>
            <p class="hero-sub">${escapeHtml(sub)}</p>
          </div>
          <div class="level-badge" title="${escapeHtml(levelTitle(lvl.level))}">
            <span class="lb-lv">Lv ${lvl.level}</span>
          </div>
        </div>
      </header>

      <!-- Love note (from Allie's person 💗) -->
      ${cute.notes ? `
      <div class="love-note-wrap">
        <div class="love-note">
          <span class="love-note-pin" aria-hidden="true">📌</span>
          <div class="love-note-de">${escapeHtml(note.de)}</div>
          <div class="love-note-en">${escapeHtml(note.en)}</div>
        </div>
      </div>` : ''}

      <!-- Level + XP -->
      <div class="card level-card">
        <div class="level-head">
          <span class="level-title">${escapeHtml(levelTitle(lvl.level))} · Level ${lvl.level}</span>
          <span class="muted">${profile.xp || 0} XP</span>
        </div>
        <div class="progress-bar gold"><div class="progress-fill" style="width:${lvl.pct}%"></div></div>
        <p class="goal-note muted">${lvl.toNext} XP to Level ${lvl.level + 1}</p>
      </div>

      <!-- Streak + daily goal ring -->
      <div class="hero-duo">
        <div class="card streak-card">
          <div class="streak-flame">🔥</div>
          <div class="streak-num">${profile.streak_count || 0}</div>
          <div class="streak-key">day streak</div>
          <div class="streak-best muted">best: ${profile.longest_streak || 0}</div>
        </div>
        <div class="card goal-ring-card">
          ${ring(goalPct)}
          <div class="goal-ring-label">
            <div class="grl-top">${doneToday}/${goal}</div>
            <div class="grl-sub muted">today's goal</div>
          </div>
        </div>
      </div>

      <!-- Stat tiles -->
      <div class="stat-grid">
        ${statTile('🏆', mastered, 'words mastered', 'gold')}
        ${statTile('⚡', weekEx, 'this week')}
      </div>

      <!-- Flashcard progress donut -->
      ${flashcardProgress(cards)}

      <!-- Accuracy per section -->
      ${accuracyBlock(acc)}

      <!-- Heatmap -->
      <div class="card">
        <div class="block-head">
          <h2 class="section-label" style="margin:0">Last 12 weeks</h2>
          <span class="hm-legend">less ${[0, 1, 2, 3, 4].map((i) => `<span class="hm-cell hm-${i}"></span>`).join('')} more</span>
        </div>
        ${heatmap(allDaily)}
      </div>

      <!-- Practice tiles, grouped by category -->
      <h2 class="section-label">Practice</h2>
      ${tileGroups()}

      <!-- Recent activity -->
      <div class="card">
        <h2 class="section-label" style="margin-top:0">Recent activity</h2>
        ${feed(activity)}
      </div>

      <!-- Settings entry (nav bar removed — this is how you reach Settings) -->
      <div class="home-settings">
        <a class="btn" href="#settings">⚙️ Settings</a>
      </div>

      ${cute.notes ? `
      <p class="love-footer">Für Allie gemacht, mit ganz viel Liebe
        <span class="brand-heart" aria-hidden="true">💗</span></p>` : ''}
    </section>`;
}

// ---- Flashcard progress donut ---------------------------------------------
// Every card falls in exactly one bucket, in this fixed order (grey → the three
// rating colours, matching the Again / Good / Easy buttons in the review view).
const FC_BUCKETS = [
  { key: 'new',   label: 'Not yet done', color: '#B9AEB6' },
  { key: 'again', label: 'Again',        color: '#E5484D' },
  { key: 'good',  label: 'Good',         color: '#3BA776' },
  { key: 'easy',  label: 'Easy',         color: '#3E78C9' },
];

function cardBucket(c) {
  if (!c.last_reviewed) return 'new';
  const q = c.last_quality;
  if (q === 1) return 'again';
  if (q === 5) return 'easy';
  if (q === 4) return 'good';
  // Reviewed before per-card rating was tracked → infer from the SM-2 state.
  if ((c.repetitions || 0) === 0 || (c.interval || 0) <= 1) return 'again';
  return 'good';
}

function flashcardProgress(cards) {
  const total = cards.length;
  if (!total) return '';
  const counts = { new: 0, again: 0, good: 0, easy: 0 };
  cards.forEach((c) => { counts[cardBucket(c)]++; });
  const segs = FC_BUCKETS.map((b) => ({ ...b, value: counts[b.key] }));
  return `
    <div class="card">
      <h2 class="section-label" style="margin-top:0">Flashcard progress</h2>
      <div class="fc-progress-chart">
        ${donut(segs, total)}
        <ul class="fc-legend">
          ${segs
            .map((s) => {
              const pct = Math.round((s.value / total) * 100);
              return `
                <li class="fc-leg-item">
                  <span class="fc-leg-dot" style="background:${s.color}"></span>
                  <span class="fc-leg-label">${s.label}</span>
                  <span class="fc-leg-val">${s.value} · ${pct}%</span>
                </li>`;
            })
            .join('')}
        </ul>
      </div>
    </div>`;
}

// Donut: one stroked arc per non-empty bucket, 2px gaps between slices, total in
// the middle. All slices are also named in the legend, so identity never relies
// on colour alone.
function donut(segs, total) {
  const r = 52;
  const C = 2 * Math.PI * r;
  let acc = 0;
  const arcs = segs
    .filter((s) => s.value > 0)
    .map((s) => {
      const len = (s.value / total) * C;
      const gap = s.value < total ? 2 : 0; // full-circle single bucket → no gap
      const shown = Math.max(len - gap, 0.01);
      const dash = `${shown} ${C - shown}`;
      const off = -acc;
      acc += len;
      return `<circle cx="70" cy="70" r="${r}" fill="none" stroke="${s.color}"
        stroke-width="20" stroke-dasharray="${dash}" stroke-dashoffset="${off}"
        transform="rotate(-90 70 70)"><title>${escapeHtml(s.label)}: ${s.value}</title></circle>`;
    })
    .join('');
  return `
    <svg class="donut" viewBox="0 0 140 140" width="140" height="140" role="img"
         aria-label="Flashcard progress by rating">
      <circle cx="70" cy="70" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="20" />
      ${arcs}
      <text class="donut-total" x="70" y="67" text-anchor="middle">${total}</text>
      <text class="donut-cap" x="70" y="85" text-anchor="middle">cards</text>
    </svg>`;
}

function statTile(icon, value, label, tone = '') {
  return `
    <div class="stat mini">
      <div class="stat-icon ${tone}">${icon}</div>
      <div class="stat-val">${value}</div>
      <div class="stat-key">${label}</div>
    </div>`;
}

function ring(pct) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  return `
    <svg class="goal-ring" viewBox="0 0 110 110" width="110" height="110" aria-hidden="true">
      <circle class="ring-track" cx="55" cy="55" r="${r}" />
      <circle class="ring-fill" cx="55" cy="55" r="${r}"
        stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"
        transform="rotate(-90 55 55)" />
    </svg>`;
}

function accuracyBlock(acc) {
  const rows = Object.entries(acc)
    .filter(([, v]) => v.n > 0)
    .sort((a, b) => b[1].n - a[1].n);
  if (!rows.length) return '';
  return `
    <div class="card">
      <h2 class="section-label" style="margin-top:0">Accuracy by section</h2>
      <div class="acc-list">
        ${rows
          .map(([sec, v]) => {
            const m = SEC[sec] || { emoji: '•', label: sec };
            const pct = Math.round((v.c / v.n) * 100);
            return `
              <div class="acc-row">
                <span class="acc-emoji">${m.emoji}</span>
                <span class="acc-label">${escapeHtml(m.label)}</span>
                <span class="acc-bar"><span class="acc-fill" style="width:${pct}%"></span></span>
                <span class="acc-pct">${pct}%</span>
              </div>`;
          })
          .join('')}
      </div>
    </div>`;
}

function heatmap(allDaily) {
  const exByDay = {};
  allDaily.forEach((d) => { exByDay[d.day] = d.exercises || 0; });
  const days = lastNDays(84);
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return `
    <div class="heatmap">
      ${weeks
        .map(
          (wk) =>
            `<div class="hm-col">${wk
              .map((day) => {
                const ex = exByDay[day] || 0;
                return `<span class="hm-cell ${heatClass(ex)}" title="${day}: ${ex} exercise${ex === 1 ? '' : 's'}"></span>`;
              })
              .join('')}</div>`
        )
        .join('')}
    </div>`;
}

function tile(s) {
  return `
    <a class="tile" href="${s.hash}">
      <div class="tile-emoji">${s.emoji}</div>
      <div class="tile-body">
        <div class="tile-title">${escapeHtml(s.label)}</div>
        <div class="tile-desc">${escapeHtml(s.desc)}</div>
      </div>
    </a>`;
}

// Practice tiles grouped under their category headings (see GROUPS in nav.js).
// A group with no sections is skipped so the layout never shows an empty header.
function tileGroups() {
  return GROUPS.map((g) => {
    const secs = SECTIONS.filter((s) => s.group === g.id);
    if (!secs.length) return '';
    return `
      <div class="tile-group">
        <div class="tile-group-head">
          <span class="tg-emoji" aria-hidden="true">${g.emoji}</span>
          <span class="tg-label">${escapeHtml(g.label)}</span>
          ${g.desc ? `<span class="tg-desc muted">${escapeHtml(g.desc)}</span>` : ''}
        </div>
        <div class="tile-grid">${secs.map(tile).join('')}</div>
      </div>`;
  }).join('');
}

function feed(activity) {
  if (!activity.length) {
    return `<p class="muted small feed-empty">No activity yet — pick a tile above and start practising! 🌱</p>`;
  }
  return `
    <ul class="feed">
      ${activity
        .slice(0, 8)
        .map((a) => {
          const m = SEC[a.section] || { emoji: '•', label: a.section };
          const label = (a.detail && a.detail.label) || m.label;
          const mark =
            a.is_correct === true ? '<span class="feed-ok">✓</span>'
              : a.is_correct === false ? '<span class="feed-no">✗</span>'
                : '';
          return `
            <li class="feed-item">
              <span class="feed-emoji">${m.emoji}</span>
              <span class="feed-label">${escapeHtml(label)}</span>
              ${mark}
              ${a.xp_earned ? `<span class="feed-xp">+${a.xp_earned}</span>` : ''}
            </li>`;
        })
        .join('')}
    </ul>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}
