const CACHE = 'badge-info-v1';
const SHARE_CACHE = 'badge-info-share';
const FILES = ['./', './index.html', './manifest.webmanifest', './sw.js', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('badge-info-') && k !== CACHE && k !== SHARE_CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Web Share Target : le fichier partagé depuis MCT / TagInfo est reçu ici.
  if (e.request.method === 'POST' && url.pathname.endsWith('/share')) {
    e.respondWith((async () => {
      const form = await e.request.formData();
      const files = form.getAll('file').filter(f => f && typeof f !== 'string' && f.size > 0);
      if (files.length) {
        const c = await caches.open(SHARE_CACHE);
        await c.put(new Request('/shared-file'), new Response(await files[0].arrayBuffer()));
      }
      return Response.redirect(new URL('./index.html?shared=1', url).href, 303);
    })());
    return;
  }

  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy));
    return res;
  })));
});
