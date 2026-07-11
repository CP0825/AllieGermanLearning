// js/celebrate.js
// ---------------------------------------------------------------------------
// Lightweight celebrations: a toast message + a burst of confetti, fired in
// response to a window "celebrate" event ({ type, level?, value? }). The engine
// dispatches these on level-up, daily-goal-met and streak milestones.
// Respects prefers-reduced-motion (skips confetti, keeps the message).
// ---------------------------------------------------------------------------

const COLORS = ['#E24A7A', '#F5B841', '#DD2E44', '#3BA776', '#F7C5D4'];

function reducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function messageFor(detail) {
  switch (detail.type) {
    case 'level':
      return { icon: '🎉', title: `Level ${detail.level}!`, sub: 'Du wirst immer besser, Allie ✨' };
    case 'goal':
      return { icon: '🌟', title: 'Daily goal complete!', sub: 'Tagesziel geschafft — super gemacht!' };
    case 'streak':
      return { icon: '🔥', title: `${detail.value}-day streak!`, sub: 'Dranbleiben lohnt sich 💪' };
    default:
      return { icon: '✨', title: 'Nice!', sub: 'Weiter so!' };
  }
}

function showToast(detail) {
  const { icon, title, sub } = messageFor(detail);
  const el = document.createElement('div');
  el.className = 'celebrate-toast';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.innerHTML = `
    <span class="ct-icon">${icon}</span>
    <span class="ct-text"><b>${title}</b><small>${sub}</small></span>`;
  document.body.appendChild(el);
  // force reflow then animate in
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 2600);
}

function confettiBurst() {
  if (reducedMotion()) return;
  const layer = document.createElement('div');
  layer.className = 'confetti-layer';
  const count = 80;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'confetti-piece';
    const left = Math.random() * 100;
    const delay = Math.random() * 0.25;
    const dur = 1.4 + Math.random() * 1.1;
    const size = 6 + Math.random() * 8;
    p.style.left = left + 'vw';
    p.style.width = size + 'px';
    p.style.height = size * (0.4 + Math.random() * 0.8) + 'px';
    p.style.background = COLORS[i % COLORS.length];
    p.style.animationDelay = delay + 's';
    p.style.animationDuration = dur + 's';
    p.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
    p.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    layer.appendChild(p);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 2800);
}

export function celebrate(detail) {
  showToast(detail);
  confettiBurst();
}

export function initCelebrations() {
  window.addEventListener('celebrate', (e) => celebrate(e.detail || {}));
}
