// sw.js — service worker for Deutsch für Allie (PWA + offline).
//
// Strategy: network-first for same-origin GETs, falling back to the cache when
// offline. This makes the app installable and usable offline after the first
// visit, WITHOUT ever serving stale code while you're online (important since we
// redeploy by hand and don't hash filenames). Cross-origin requests (the
// Supabase API, Google Fonts) pass straight through to the network.

const CACHE = 'allie-german-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // let CDN / API calls hit the network

  event.respondWith(
    (async () => {
      try {
        const res = await fetch(req);
        if (res && res.ok) {
          const cache = await caches.open(CACHE);
          cache.put(req, res.clone());
        }
        return res;
      } catch {
        const cached = await caches.match(req);
        if (cached) return cached;
        if (req.mode === 'navigate') {
          const shell = (await caches.match('./index.html')) || (await caches.match('./'));
          if (shell) return shell;
        }
        throw new Error('offline and not cached');
      }
    })()
  );
});
