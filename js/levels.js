// js/levels.js
// ---------------------------------------------------------------------------
// XP → level curve. A gentle triangular curve: the XP needed to REACH a level
// is 50·L·(L−1), so each level costs 100 XP more than the last.
//   L1: 0   L2: 100   L3: 300   L4: 600   L5: 1000 …
// ---------------------------------------------------------------------------

export function xpForLevel(level) {
  return 50 * level * (level - 1);
}

export function levelFromXp(xp) {
  const x = Math.max(0, xp || 0);
  return Math.floor((50 + Math.sqrt(2500 + 200 * x)) / 100);
}

export function levelProgress(xp) {
  const x = Math.max(0, xp || 0);
  const level = levelFromXp(x);
  const cur = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const span = next - cur;
  const into = x - cur;
  return {
    level,
    into,
    span,
    toNext: next - x,
    pct: span > 0 ? Math.max(0, Math.min(100, Math.round((into / span) * 100))) : 0,
  };
}

// Warm, feminine level titles for Allie.
const TITLES = [
  'Neuling',        // L1
  'Anfängerin',     // L2
  'Entdeckerin',    // L3
  'Sprachfreundin', // L4
  'Wortsammlerin',  // L5
  'Satzbauerin',    // L6
  'Sprachprofi',    // L7
  'Sprachmeisterin' // L8+
];

export function levelTitle(level) {
  return TITLES[Math.min(Math.max(level, 1) - 1, TITLES.length - 1)];
}
