// js/settings.js
// ---------------------------------------------------------------------------
// Settings screen (#settings).
//   • Display name, daily goal, sound on/off  → persisted to the profile.
//   • Category manager stub                   → add a category with an emoji.
//   • Download backup                         → all Supabase data as JSON.
//   • Restore backup                          → import a JSON file.
// ---------------------------------------------------------------------------

import {
  getProfile,
  updateProfile,
  getCategories,
  addCategory,
  exportAll,
  importAll,
  onChange,
  today,
} from './db.js';
import { cutePrefs, setCutePref, initHearts } from './cute.js';

export async function renderSettings(el) {
  const [profile, categories] = await Promise.all([getProfile(), getCategories()]);
  el.innerHTML = template(profile, categories);
  wire(el);

  // Only refresh the category list live — never re-render while the user is
  // typing into the profile inputs (that would clobber their edit).
  const off = onChange((e) => {
    if (e.detail && e.detail.key === 'categories') refreshCategories(el);
  });
  return off;
}

function template(profile, categories) {
  return `
    <section class="view settings">
      <header class="ex-head">
        <a class="ex-back" href="#dashboard" title="Back to home">←</a>
        <h1 class="ex-title">⚙️ Settings</h1>
        <span class="score-pill">⚙️</span>
      </header>

      <div class="card">
        <h2 class="section-label">Profile</h2>

        <label class="field" for="set-name">
          <span class="field-label">Display name</span>
          <input id="set-name" class="input" type="text"
                 value="${escapeHtml(profile.display_name || '')}" placeholder="Allie" />
        </label>

        <label class="field" for="set-goal">
          <span class="field-label">Daily goal (exercises)</span>
          <input id="set-goal" class="input" type="number" min="1" max="200"
                 value="${profile.daily_goal || 20}" />
        </label>

        <div class="field field-row">
          <span class="field-label">Sound effects</span>
          <label class="switch">
            <input id="set-sound" type="checkbox" ${profile.sound_enabled ? 'checked' : ''} />
            <span class="slider"></span>
          </label>
        </div>

        <p id="set-status" class="save-status" hidden>Saved ✓</p>
      </div>

      ${cutenessCard()}

      <div class="card">
        <h2 class="section-label">Categories</h2>
        <div id="cat-list" class="cat-list">${renderCats(categories)}</div>
        <form id="cat-form" class="cat-form">
          <input id="cat-emoji" class="input input-emoji" type="text" maxlength="2" placeholder="📚" />
          <input id="cat-name" class="input" type="text" placeholder="New category name" />
          <button class="btn btn-primary" type="submit">Add</button>
        </form>
      </div>

      <div class="card">
        <h2 class="section-label">Backup</h2>
        <p class="muted small">Export everything to a JSON file, or restore from one.</p>
        <div class="btn-row">
          <button id="btn-export" class="btn" type="button">⬇︎ Download backup</button>
          <label class="btn" for="file-restore">⬆︎ Restore backup</label>
          <input id="file-restore" type="file" accept="application/json,.json" hidden />
        </div>
        <p id="backup-status" class="save-status" hidden></p>
      </div>
    </section>`;
}

function cutenessCard() {
  const p = cutePrefs();
  const opt = (v, label) => `<option value="${v}"${p.amount === v ? ' selected' : ''}>${label}</option>`;
  return `
    <div class="card">
      <h2 class="section-label">Cuteness 💗</h2>
      <div class="field field-row">
        <span class="field-label">Floating hearts</span>
        <label class="switch">
          <input id="set-hearts" type="checkbox" ${p.hearts ? 'checked' : ''} />
          <span class="slider"></span>
        </label>
      </div>
      <label class="field" for="set-amount">
        <span class="field-label">How many hearts</span>
        <select id="set-amount" class="input">
          ${opt('subtle', 'A few')}${opt('sweet', 'Sweet')}${opt('lots', 'Lots')}
        </select>
      </label>
      <div class="field field-row">
        <span class="field-label">Love notes on the home screen</span>
        <label class="switch">
          <input id="set-notes" type="checkbox" ${p.notes ? 'checked' : ''} />
          <span class="slider"></span>
        </label>
      </div>
    </div>`;
}

function wire(el) {
  const name = el.querySelector('#set-name');
  const goal = el.querySelector('#set-goal');
  const sound = el.querySelector('#set-sound');
  const status = el.querySelector('#set-status');

  const flash = () => {
    status.textContent = 'Saved ✓';
    status.hidden = false;
    clearTimeout(flash._t);
    flash._t = setTimeout(() => (status.hidden = true), 1500);
  };

  name.addEventListener('change', () => {
    updateProfile({ display_name: name.value.trim() || 'Allie' });
    flash();
  });
  goal.addEventListener('change', () => {
    const val = clampInt(goal.value, 1, 200, 20);
    goal.value = val;
    updateProfile({ daily_goal: val });
    flash();
  });
  sound.addEventListener('change', () => {
    updateProfile({ sound_enabled: sound.checked });
    flash();
  });

  // Cuteness (localStorage prefs; no DB columns)
  const hearts = el.querySelector('#set-hearts');
  const amount = el.querySelector('#set-amount');
  const notes = el.querySelector('#set-notes');
  hearts.addEventListener('change', () => { setCutePref('hearts', hearts.checked); initHearts(); flash(); });
  amount.addEventListener('change', () => { setCutePref('amount', amount.value); initHearts(); flash(); });
  notes.addEventListener('change', () => { setCutePref('notes', notes.checked); flash(); });

  // Category manager
  const catForm = el.querySelector('#cat-form');
  catForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nm = el.querySelector('#cat-name').value.trim();
    const em = el.querySelector('#cat-emoji').value.trim();
    if (!nm) return;
    await addCategory({ name: nm, emoji: em });
    el.querySelector('#cat-name').value = '';
    el.querySelector('#cat-emoji').value = '';
    // list refreshes via the db:change listener in renderSettings
  });

  // Backup: download
  el.querySelector('#btn-export').addEventListener('click', async () => {
    const dump = await exportAll();
    downloadJSON(dump, `deutsch-fuer-allie-backup-${today()}.json`);
  });

  // Backup: restore
  const backupStatus = el.querySelector('#backup-status');
  el.querySelector('#file-restore').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const dump = JSON.parse(await file.text());
      await importAll(dump);
      backupStatus.textContent = 'Restored ✓ — reloading…';
      backupStatus.hidden = false;
      setTimeout(() => location.reload(), 800);
    } catch (err) {
      backupStatus.textContent = 'Restore failed: ' + err.message;
      backupStatus.hidden = false;
    }
  });
}

async function refreshCategories(el) {
  const cats = await getCategories();
  const list = el.querySelector('#cat-list');
  if (list) list.innerHTML = renderCats(cats);
}

function renderCats(cats) {
  if (!cats || !cats.length) return `<p class="muted small">No categories yet.</p>`;
  return cats
    .map((c) => `<span class="pill cat-pill">${c.emoji || '🏷️'} ${escapeHtml(c.name)}</span>`)
    .join('');
}

// ---- helpers --------------------------------------------------------------
function downloadJSON(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function clampInt(v, min, max, dflt) {
  const n = parseInt(v, 10);
  if (Number.isNaN(n)) return dflt;
  return Math.max(min, Math.min(max, n));
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
  );
}
