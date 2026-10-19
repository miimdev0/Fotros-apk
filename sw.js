/* sw.js — FETROS Offline-first Service Worker
   Versioned precache + stale-while-revalidate + offline fallback + update flow
*/
const SW_VERSION = "fetros-v2-2026-10-19-001";
const PRECACHE = `precache-${SW_VERSION}`;
const RUNTIME = `runtime-${SW_VERSION}`;

// App shell — همهٔ مسیرها نسبی به scope
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./offline.html",
  "./data/occasions.js",
  "./icons/icon.svg",
  "./icons/icon-maskable.svg",
  "./icons/icon-monochrome.svg",
  // PNGs may not exist yet — we try to cache them but don't fail install if missing
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  // font — optional, must NOT fail install if missing
  "./fonts/Rokh.ttf"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(PRECACHE);
    // cache.addAll would fail entirely if ONE url 404s — so we add one-by-one tolerantly
    await Promise.allSettled(PRECACHE_URLS.map(async (url) => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok) await cache.put(url, res);
        else console.warn("[SW] precache skip (not ok):", url, res.status);
      } catch (e) {
        console.warn("[SW] precache skip (fetch fail):", url, e?.message);
      }
    }));
    // Activate new SW immediately (user will get "new version" toast in page)
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k !== PRECACHE && k !== RUNTIME) return caches.delete(k);
      // keep current version; delete old versions that share prefix but different suffix
      if ((k.startsWith("precache-") || k.startsWith("runtime-")) && k !== PRECACHE && k !== RUNTIME) {
        return caches.delete(k);
      }
    }));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
  if (event.data && event.data.type === "GET_VERSION") {
    event.ports && event.ports[0] && event.ports[0].postMessage({ version: SW_VERSION });
  }
});

// Network strategies
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Same-origin GET + the (optional) keyless weather API only.
  // Personal data never goes through the network, so nothing private can be cached here.
  const SAME_ORIGIN = url.origin === location.origin;
  const WEATHER_HOST = /(^|\.)open-meteo\.com$/.test(url.hostname);
  if (req.method !== "GET" || !(SAME_ORIGIN || WEATHER_HOST)) return;

  // Never cache personal data endpoints (we don't have backend, but be safe)
  // Navigation: network-first with offline fallback
  if (SAME_ORIGIN && (req.mode === "navigate" || req.destination === "document")) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(RUNTIME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(req) || await caches.match("./index.html") || await caches.match("./offline.html");
        return cached || new Response("آفلاین — فطرس", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" }});
      }
    })());
    return;
  }

  // Static assets (same origin only): stale-while-revalidate
  if (SAME_ORIGIN && (["style", "script", "image", "font", "manifest"].includes(req.destination) || PRECACHE_URLS.some(u => url.pathname.endsWith(u.replace("./", "/"))))) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME);
      const cached = await caches.match(req);
      const fetchPromise = fetch(req).then(res => {
        if (res.ok) cache.put(req, res.clone());
        return res;
      }).catch(()=>null);
      return cached || (await fetchPromise) || new Response("", { status: 504 });
    })());
    return;
  }

  // Weather API (open-meteo) — network-first, so an offline reload can still show the
  // last real reading. No fabricated data is ever produced by this worker.
  if (WEATHER_HOST) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(RUNTIME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch(e) {
        const cached = await caches.match(req);
        if (cached) return cached;
        throw e;
      }
    })());
    return;
  }

  // Default: cache-first fallback
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) {
      // revalidate in background
      fetch(req).then(res=>{ if(res.ok) caches.open(RUNTIME).then(c=>c.put(req,res)); }).catch(()=>{});
      return cached;
    }
    try {
      const res = await fetch(req);
      if (res.ok) {
        const c = await caches.open(RUNTIME);
        c.put(req, res.clone());
      }
      return res;
    } catch(e) {
      return cached || Response.error();
    }
  })());
});
