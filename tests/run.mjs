/* tests/run.mjs — FETROS unit-style tests (no browser needed)
   اجرا:  node tests/run.mjs
   این فایل data/occasions.js و script.js را در یک اسکوپ تمیز eval می‌کند
   (بدون document/window → بوت مرورگر اجرا نمی‌شود) و تست‌های موتور را می‌گیرد.
*/
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const src =
  readFileSync(join(root, "data", "occasions.js"), "utf8") + "\n" +
  readFileSync(join(root, "script.js"), "utf8");

const ctx = vm.createContext({ console, Intl, Date, Math, JSON, Object, Array, String, Number, Boolean, RegExp, Promise, Error, isNaN, parseFloat, parseInt, encodeURIComponent, decodeURIComponent, setTimeout, clearTimeout, URLSearchParams, fetch: undefined, navigator: undefined, location: { protocol: "https:", hash: "", search: "" } });
vm.runInContext("(function(){\n" + src + "\n})();", ctx, { filename: "fetros-bundle.js" });

const ENGINE = ctx.__FETROS_ENGINE__;
if (!ENGINE) { console.error("engine export not found"); process.exit(2); }

const t = ENGINE.TESTS.run();
console.log("\n=== FETROS calendar/prayer engine unit tests ===");
for (const r of t.results) { if (!r.ok) console.log("  ✗ " + r.name + "   got=" + JSON.stringify(r.got) + " want=" + JSON.stringify(r.want)); }
console.log(`\n  passed ${t.passed} / ${t.total}   failed ${t.failed}`);

// extra independent assertions (beyond the in-app set)
const CAL = ENGINE.CAL, PRAY = ENGINE.PRAY, QIB = ENGINE.QIBLA, U = ENGINE.U;
let extraFail = 0;
const assert = (name, cond) => { console.log((cond ? "  ✓ " : "  ✗ ") + name + (cond ? "" : "  <-- FAILED")); if (!cond) extraFail++; t.total++; };
console.log("\n=== extra independent checks ===");
// 1) consecutive-day consistency of jalaali day numbering
let dayOk = true;
for (let d = CAL.dayFromGreg(2023, 1, 1); d < CAL.dayFromGreg(2031, 1, 1); d++) {
  const i = CAL.dateInfo(d), nx = CAL.dateInfo(d + 1);
  const endOfMonth = i.jd === CAL.jalaaliMonthLength(i.jy, i.jm);
  if (endOfMonth) { const expJm = i.jm === 12 ? 1 : i.jm + 1, expJy = i.jm === 12 ? i.jy + 1 : i.jy; if (nx.jm !== expJm || nx.jy !== expJy || nx.jd !== 1) dayOk = false; }
  else if (nx.jy !== i.jy || nx.jm !== i.jm || nx.jd !== i.jd + 1) dayOk = false;
}
assert("jalaali day→next-day increments correctly for 8 years (leap + month ends)", dayOk);
// 2) no fabricated times: impossible solar angles must be null, not guessed
const polar = PRAY.compute({ lat: 78.0, lng: 15.0, tz: 1, date: new Date(2026, 5, 21), method: "MWL", asr: "Standard", adjust: {}, polarRule: "none" });
assert("Longyearbyen midsummer: fajr/isha = null (never fabricated)", polar.fajr == null && polar.isha == null);
const tallinn = PRAY.compute({ lat: 59.437, lng: 24.7536, tz: 3, date: new Date(2026, 5, 21), method: "MWL", asr: "Standard", adjust: {}, polarRule: "none" });
assert("Tallinn midsummer: sunrise exists, 18° fajr/isha undefined (no fabrication)", tallinn.sunrise != null && tallinn.fajr == null && tallinn.isha == null);
const tallinn2 = PRAY.compute({ lat: 59.437, lng: 24.7536, tz: 3, date: new Date(2026, 5, 21), method: "MWL", asr: "Standard", adjust: {}, polarRule: "seventh" });
assert("Tallinn + 'one-seventh' rule fills fajr/isha", tallinn2.fajr != null && tallinn2.isha != null && tallinn2.meta.polarApplied === true);
assert("polarRule 'none' must never fabricate (regression)", tallinn.meta.polarApplied === false);
// 3) ordering for every Iranian city on 4 dates
let orderOk = true;
const cities = [[35.6892,51.389],[36.2605,59.6168],[32.6546,51.668],[29.5918,52.5837],[38.0962,46.2738],[34.6416,50.8746]];
for (const [la, lo] of cities) for (const mo of [0, 2, 5, 9]) {
  const p = PRAY.compute({ lat: la, lng: lo, tz: 3.5, date: new Date(2026, mo, 15), method: "Tehran", asr: "Standard", adjust: {}, polarRule: "none" });
  if (!(p.fajr < p.sunrise && p.sunrise < p.dhuhr && p.dhuhr < p.asr && p.asr < p.sunset && p.sunset < p.isha)) orderOk = false;
}
assert("prayer ordering holds for 6 cities × 4 seasons", orderOk);
// 4) qibla bearings vs published approximations
const qb = (la, lo) => Math.round(QIB.bearing(la, lo));
assert("Qibla Tehran≈218°", qb(35.6892, 51.3890) === 218);
assert("Qibla Istanbul≈151°", Math.abs(qb(41.0082, 28.9784) - 151) <= 1);
assert("Qibla Delhi≈267°", Math.abs(qb(28.6139, 77.2090) - 267) <= 1);
assert("Qibla NYC≈58°", Math.abs(qb(40.7128, -74.0060) - 58) <= 2);
assert("Tehran→Mecca great-circle ≈ 1944km", Math.abs(QIB.distanceKm(35.6892, 51.3890) - 1944) < 25);
assert("NYC→Mecca ≈ 10300km", Math.abs(QIB.distanceKm(40.7128, -74.006) - 10306) < 60);
// 5) number formatting
U.setDigits(true); assert("Persian digits with zero padding", U.num(7, 2) === "۰۷");
U.setDigits(false); assert("Latin digits", U.num("۱۴۰۵".replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))) === "1405");
U.setDigits(true);
// 6) countdown rollover after Isha
const nowLate = new Date(2026, 9, 19, 23, 30, 0);
const times = PRAY.compute({ lat: 35.6892, lng: 51.3890, tz: 3.5, date: new Date(2026, 9, 19), method: "Tehran", asr: "Standard", adjust: {}, polarRule: "none" });
const info = PRAY.nextInfo(times, nowLate);
assert("after Isha → rolls over to tomorrow's Fajr", info.rollover === true && info.next.key === "fajr");
const nowEarly = new Date(2026, 9, 19, 3, 0, 0);
const info2 = PRAY.nextInfo(times, nowEarly);
assert("03:00 → next is Fajr of same day", info2.rollover === false && info2.next.key === "fajr");
// 7) import schema validation (rejects garbage, accepts our own shape)
const PWA = ENGINE.PWA;
assert("validate() rejects null", typeof PWA.validate(null) === "string");
assert("validate() rejects other app", typeof PWA.validate({ app: "evil", data: {} }) === "string");
assert("validate() rejects non-array store", typeof PWA.validate({ app: "fetros", data: { tasks: {} } }) === "string");
assert("validate() rejects record without id", typeof PWA.validate({ app: "fetros", data: { tasks: [{ title: "x" }] } }) === "string");
assert("validate() accepts a valid payload", PWA.validate({ app: "fetros", data: { tasks: [{ id: "a", title: "t" }] } }) === null);

const total = t.failed + extraFail;
console.log("\nRESULT: " + (total === 0 ? "ALL PASS (" + t.total + " checks)" : total + " FAILING of " + t.total));
process.exit(total === 0 ? 0 : 1);
