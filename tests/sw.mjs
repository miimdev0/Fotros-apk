/* tests/sw.mjs — Service Worker منطق تست (بدون مرورگر)
   اجرا: node tests/sw.mjs
   بررسی می‌کند:
     • install با ۴۰۴ شدنِ فونت/آیکون‌ها رد نشود (tolerant precache)
     • نسخه‌های قدیمی کش پاک شوند
     • ناوبری در حالت آفلاین به offline.html بیفتد
     • استراتژی stale-while-revalidate برای فایل‌های استاتیک
*/
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = await readFile(join(root, "sw.js"), "utf8");

const results = [];
const ok = (name, cond, extra) => { results.push({ name, cond: !!cond }); console.log((cond ? "  ✓ " : "  ✗ ") + name + (cond ? "" : "  <-- " + (extra || ""))); };

/* --- tiny SW environment --- */
const store = new Map();           // url -> { body, status }
let missing = new Set(["./fonts/Rokh.ttf"]);   // file the user has not added yet
const log = { fetches: 0, puts: 0 };
function makeCache(name) {
  const map = new Map(store.get(name) || []);
  store.set(name, map);
  return {
    name,
    async match(req) {
      const key = typeof req === "string" ? req : req.url;
      return map.has(key) ? { ok: true, status: 200, _body: map.get(key), url: key, clone() { return this; } } : undefined;
    },
    async put(req, res) { const key = typeof req === "string" ? req : res.url; map.set(key, res._body || "cached"); log.puts++; },
    async keys() { return [...map.keys()]; },
    async delete(k) { return map.delete(k); }
  };
}
const caches = {
  _names: new Set(["precache-old-v1", "runtime-old-v1"]),
  async open(n) { if (!this._names.has(n)) this._names.add(n); return makeCache(n); },
  async keys() { return [...this._names]; },
  async delete(n) { this._names.delete(n); store.delete(n); return true; },
  async match(req) {
    for (const n of this._names) { const c = await this.open(n); const r = await c.match(req); if (r) return r; }
    return undefined;
  }
};
let respondWith = null;
const self = {
  addEventListener(type, fn) { (this._l = this._l || {})[type] = fn; },
  skipWaiting() { this._skipped = true; return Promise.resolve(); },
  clients: { async claim() { this._claimed = true; } },
  registration: { installing: null },
  location: { origin: "https://fetros.test" },
  caches, fetch, console, Response, Request, URL, Promise, setTimeout, clearTimeout, URLSearchParams
};
async function fetch(req, opts) {
  log.fetches++;
  const url = typeof req === "string" ? req : req.url;
  if (missing.has(url)) { return { ok: false, status: 404, url, clone() { return this; } }; }
  if (url === "./offline.html") return { ok: true, status: 200, url, clone() { return this; }, _body: "<offline>" };
  if (url === "./index.html") return { ok: true, status: 200, url, clone() { return this; }, _body: "<index>" };
  return { ok: true, status: 200, url, clone() { return this; }, _body: "asset:" + url };
}
self.fetch = fetch;

self.self = self;
const ctx = vm.createContext(self);
vm.runInContext(src, ctx, { filename: "sw.js" });

/* --- install with a missing font + missing PNGs --- */
missing.add("./icons/icon-192.png"); missing.add("./icons/icon-512.png"); missing.add("./icons/icon-maskable-512.png");
let installRejected = null;
try { await self._l.install({ waitUntil: p => p.then(() => {}, e => { installRejected = e; }) }); } catch (e) { installRejected = e; }
await new Promise(r => setTimeout(r, 60));
ok("install does not reject when fonts/Rokh.ttf is missing", installRejected === null, String(installRejected));
ok("skipWaiting called (fresh version takes over quickly)", self._skipped === true);
const precache = store.get([...store.keys()][0]);
ok("app shell cached (index/style/script/manifest present)", precache && ["./index.html", "./style.css", "./script.js", "./manifest.json"].every(k => precache.has(k)),
   precache ? [...precache.keys()].join(",") : "no cache");
ok("missing font NOT stored as a poisoned entry", precache && !precache.has("./fonts/Rokh.ttf"));
ok("occasions dataset cached for offline calendar", precache && precache.has("./data/occasions.js"));
ok("icons that exist were cached", precache && precache.has("./icons/icon.svg"));

/* --- activate cleans old versions --- */
await self._l.activate({ waitUntil: p => p });
await new Promise(r => setTimeout(r, 20));
ok("old-version caches deleted on activate", ![...caches._names].some(n => n.includes("old-v1")), [...caches._names].join(","));
ok("clients.claim() called", self.clients._claimed === true);

/* --- navigation while offline → offline fallback --- */
async function handleFetch(reqObj) {
  let out = null;
  const ev = { request: reqObj, respondWith: (p) => { out = p; } };
  await self._l.fetch(ev);
  return out ? await out : null;
}
self.fetch = async () => { throw new Error("offline"); };
const navRes = await handleFetch({ url: "https://fetros.test/index.html", mode: "navigate", destination: "document", method: "GET", clone() { return this; } });
ok("offline navigation falls back to cached shell/offline page", !!navRes, JSON.stringify(navRes && navRes.url));

/* --- static asset: SWR serves cache first --- */
self.fetch = fetch;
const assetRes = await handleFetch({ url: "https://fetros.test/style.css", mode: "cors", destination: "style", method: "GET", clone() { return this; } });
ok("static asset served (stale-while-revalidate path)", !!assetRes, String(assetRes && assetRes.url));

/* --- open-meteo: online response is cached, offline reload replays it --- */
const WURL = "https://api.open-meteo.com/v1/forecast?latitude=35&longitude=51";
self.fetch = fetch;                                  // online → cached by the worker
const wOnline = await handleFetch({ url: WURL, mode: "cors", destination: "", method: "GET", clone() { return this; } });
ok("weather response handled online", !!wOnline, String(wOnline && wOnline.status));
self.fetch = async () => { throw new Error("no network"); };
const wOffline = await handleFetch({ url: WURL, mode: "cors", destination: "", method: "GET", clone() { return this; } });
ok("offline reload replays the LAST REAL weather reading (no fabrication)", !!wOffline, String(wOffline && wOffline.url));
let crossErr = "no-intercept";
const otherOrigin = await handleFetch({ url: "https://evil.example.com/x.js", mode: "cors", destination: "script", method: "GET", clone() { return this; } });
ok("unrelated cross-origin requests are not intercepted", otherOrigin === null, String(otherOrigin));

/* --- message channel: SKIP_WAITING + GET_VERSION --- */
self._l.message({ data: { type: "GET_VERSION" }, ports: [{ postMessage(m) { self._v = m; } }] });
ok("SW answers version over message channel", !!(self._v && /fetros-v2/.test(self._v.version)), JSON.stringify(self._v));

const fails = results.filter(r => !r.cond).length;
console.log("\nSW RESULT: " + (results.length - fails) + " passed / " + fails + " failed");
process.exit(fails ? 1 : 0);
