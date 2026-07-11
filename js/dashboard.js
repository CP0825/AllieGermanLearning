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
import { SECTIONS } from './nav.js';

// section id (hash without '#') → { emoji, label }
const SEC = {};
SECTIONS.forEach((s) => { SEC[s.hash.slice(1)] = { emoji: s.emoji, label: s.label }; });

const SUBTITLES = [
  'Bereit für ein bisschen Deutsch heute? 💕',
  'Kleine Schritte, große Fortschritte. ✨',
  'Schön, dass du wieder da bist! 🌸',
  'Jede Karte zählt — du schaffst das! 💪',
];

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
  const sub = SUBTITLES[Math.floor(Math.random() * SUBTITLES.length)];

  // Level + XP
  const lvl = levelProgress(profile.xp || 0);

  // Cards
  const mastered = cards.filter((c) => (c.interval || 0) >= 21).length;
  const total = cards.length;
  const t = dayStr(new Date());
  const due = cards.filter((c) => !c.due_date || c.due_date <= t).length;

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
        ${statTile('🃏', total, 'total cards')}
        ${statTile('⚡', weekEx, 'this week')}
        ${statTile('📅', due, 'cards due')}
      </div>

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

      <!-- Practice tiles -->
      <h2 class="section-label">Practice</h2>
      <div class="tile-grid">${tiles(due)}</div>

      <!-- Recent activity -->
      <div class="card">
        <h2 class="section-label" style="margin-top:0">Recent activity</h2>
        ${feed(activity)}
      </div>
    </section>`;
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

function tiles(due) {
  return SECTIONS.map(
    (s) => `
    <a class="tile" href="${s.hash}">
      <div class="tile-emoji">${s.emoji}</div>
      <div class="tile-body">
        <div class="tile-title">${s.label}</div>
        <div class="tile-desc">${s.desc}</div>
      </div>
      ${s.hash === '#flashcards' && due ? `<span class="pill pill-due">${due}</span>` : ''}
    </a>`
  ).join('');
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
