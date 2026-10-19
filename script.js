/* =============================================================================
   FETROS · فطرس — script.js  (v2)
   PWA تقویم و همراه روزانه · HTML/CSS/JS خام، بدون فریم‌ورک، بدون بیلد
   ─────────────────────────────────────────────────────────────────────────────
   ساختار فایل:
     1) CONFIG   → بخش قابل ویرایش برای شما (متن‌ها، شهرها، ابزارها)
     2) ENGINE   → موتور برنامه (نیازی به ویرایش ندارد)
   ─────────────────────────────────────────────────────────────────────────────
   قوانین ویرایش CONFIG:
     • فقط داخل بلوک CONFIG بنویسید؛ ENGINE را دست نزنید.
     • متن‌ها را داخل " " بگذارید، ویرگول‌ها را پاک نکنید.
     • بعد از هر تغییر، فایل را ذخیره و صفحه را Refresh کنید.
     • اگر چیزی خراب شد: Ctrl+Shift+R یا «پاک کردن کش» از تنظیمات.
   ============================================================================= */

/* ==========================================================================
   ██╗ ██████╗ ██╗ ██████╗  ██████╗     ██╗   ██╗ ██╗ █████╗ ██╗
   ██║██╔════╝██║██╔═══██╗██╔════╝    ███║   ███║██║██╔══██╗██║
   ██║██║     ██║██║   ██║██║         ╚██║ ███╔╝███████║██║
   ██║██║     ██║██║   ██║██║          ╚███╔╝  ██╔══██║██║
   ██║╚██████╗██║╚██████╔╝╚██████╗     ╚██║   ██║  ██║███████╗
   ╚═╝ ╚═════╝╚═╝ ╚═════╝  ╚═════╝      ╚═╝   ╚═╝  ╚═╝╚══════╝
   بخش قابل ویرایش — فقط این قسمت را تغییر دهید
   ========================================================================== */
/* >>>>>>>>>>>>>>>>>>>>> START OF EDITABLE CONFIG >>>>>>>>>>>>>>>>>>>>>>>>>>> */

const FETROS_CONFIG = {

  // نام و متن‌های اصلی برنامه
  app: {
    name: "فطرس",
    nameEn: "FETROS",
    tagline: "همراه لحظه‌های زندگی",
    version: "2.0.0",
    copyright: "ساختهٔ شما — بدون تبلیغ، بدون ردیاب",
    // اگر می‌خواهید پیامی در پایین «درباره» دیده شود:
    aboutNote: "داده‌های مناسبت‌ها نمونه است و هر سال باید بازبینی شود."
  },

  // سلام روزانه بر اساس ساعت (۲۴ ساعته). ساعت شروع را وارد کنید.
  greetings: [
    { from: 0,  text: "شب بخیر" },
    { from: 4,  text: "سحرخیز باشید" },
    { from: 6,  text: "صبح بخیر" },
    { from: 12, text: "ظهر بخیر" },
    { from: 16, text: "عصر بخیر" },
    { from: 19, text: "شب بخیر" }
  ],

  // لیست شهرها — برای اوقات شرعی، قبله و آب‌وهوا.
  // lat/lng: عرض و طول جغرافیایی (دهدهی) · tz: منطقهٔ زمانی IANA (برای DST دقیق)
  cities: [
    { id: "tehran",   name: "تهران",        lat: 35.6892, lng: 51.3890,  tz: "Asia/Tehran" },
    { id: "mashhad",  name: "مشهد",         lat: 36.2605, lng: 59.6168,  tz: "Asia/Tehran" },
    { id: "isfahan",  name: "اصفهان",       lat: 32.6546, lng: 51.6680,  tz: "Asia/Tehran" },
    { id: "shiraz",   name: "شیراز",        lat: 29.5918, lng: 52.5837,  tz: "Asia/Tehran" },
    { id: "tabriz",   name: "تبریز",        lat: 38.0962, lng: 46.2738,  tz: "Asia/Tehran" },
    { id: "ahvaz",    name: "اهواز",        lat: 31.3183, lng: 48.6706,  tz: "Asia/Tehran" },
    { id: "qom",      name: "قم",           lat: 34.6416, lng: 50.8746,  tz: "Asia/Tehran" },
    { id: "kerman",   name: "کرمان",        lat: 30.2839, lng: 57.0834,  tz: "Asia/Tehran" },
    { id: "rasht",    name: "رشت",          lat: 37.2808, lng: 49.5832,  tz: "Asia/Tehran" },
    { id: "kermanshah", name: "کرمانشاه",   lat: 34.3277, lng: 47.0778,  tz: "Asia/Tehran" },
    { id: "yazd",     name: "یزد",          lat: 31.8974, lng: 54.3569,  tz: "Asia/Tehran" },
    { id: "ahvaz2",   name: "بندرعباس",     lat: 27.1832, lng: 56.2666,  tz: "Asia/Tehran" },
    { id: "mecca",    name: "مکه",          lat: 21.4225, lng: 39.8262,  tz: "Asia/Riyadh" },
    { id: "madinah",  name: "مدینه",        lat: 24.4672, lng: 39.6111,  tz: "Asia/Riyadh" },
    { id: "najaf",    name: "نجف",          lat: 31.989,  lng: 44.314,   tz: "Asia/Baghdad" },
    { id: "karbala",  name: "کربلا",        lat: 32.616,  lng: 44.024,    tz: "Asia/Baghdad" },
    { id: "istanbul", name: "استانبول",     lat: 41.0082, lng: 28.9784,  tz: "Europe/Istanbul" },
    { id: "dubai",    name: "دبی",          lat: 25.2048, lng: 55.2708,  tz: "Asia/Dubai" },
    { id: "kabul",    name: "کابل",         lat: 34.5553, lng: 69.2075,  tz: "Asia/Kabul" },
    { id: "tajik",    name: "دوشنبه",       lat: 38.5598, lng: 68.7870,  tz: "Asia/Dushanbe" },
    { id: "cairo",    name: "قاهره",        lat: 30.0444, lng: 31.2357,  tz: "Africa/Cairo" },
    { id: "london",   name: "لندن",         lat: 51.5074, lng: -0.1278,  tz: "Europe/London" },
    { id: "paris",    name: "پاریس",        lat: 48.8566, lng: 2.3522,   tz: "Europe/Paris" },
    { id: "berlin",   name: "برلین",        lat: 52.5200, lng: 13.4050,  tz: "Europe/Berlin" },
    { id: "toronto",  name: "تورنتو",       lat: 43.6532, lng: -79.3832, tz: "America/Toronto" },
    { id: "newyork",  name: "نیویورک",      lat: 40.7128, lng: -74.0060, tz: "America/New_York" },
    { id: "losangeles", name: "لس‌آنجلس",    lat: 34.0522, lng: -118.2437, tz: "America/Los_Angeles" },
    { id: "sydney",   name: "سیدنی",        lat: -33.8688, lng: 151.2093, tz: "Australia/Sydney" },
    { id: "kualalumpur", name: "کوالالامپور", lat: 3.1390, lng: 101.6869, tz: "Asia/Kuala_Lumpur" }
  ],

  // شهر پیش‌فرض (اگر مکان‌نما اجازه نداد) — id از لیست بالا
  defaultCity: "tehran",

  // اقدامات سریع روی دکمهٔ شناور (FAB)
  quickActions: [
    { id: "note",     label: "یادداشت تازه", icon: "📝" },
    { id: "reminder", label: "یادآور تازه",  icon: "⏰" },
    { id: "task",     label: "کار تازه",    icon: "✓" },
    { id: "birthday", label: "تولد تازه",   icon: "🎂" }
  ],

  // ابزارهای صفحهٔ «ابزارها»
  tools: [
    { id: "dhikr",     label: "ذکرشمار",  icon: "📿", desc: "حلقهٔ پیشرفت + لرزش" },
    { id: "tasks",     label: "کارها",    icon: "✓",  desc: "ایجاد، فیلتر، جستجو" },
    { id: "notes",     label: "یادداشت‌ها", icon: "📝", desc: "علاقه‌مندی + جستجو" },
    { id: "reminders", label: "یادآورها", icon: "⏰", desc: "تکرار + سررسید" },
    { id: "birthdays", label: "تولدها",   icon: "🎂", desc: "وصل به تقویم" },
    { id: "meds",      label: "دارو",     icon: "💊", desc: "برنامهٔ اختیاری" }
  ],

  // اعداد ذکرشمار
  dhikrPresets: [33, 34, 99, 100],
  dhikrDefaultLabel: "سبحان‌الله",

  // تنظیمات پیش‌فرض (می‌توانید مقدار اولیه را عوض کنید)
  defaults: {
    theme: "dark",          // "dark" | "light"
    accent: "gold",         // gold | teal | rose | violet
    persianDigits: true,    // ارقام فارسی
    motion: "medium",       // low | medium | high
    city: "tehran",
    method: "Tehran",       // Tehran | MWL | Egypt | Karachi | UmmAlQura
    asr: "Standard",        // Standard | Hanafi
    notifications: false,
    azan: false,
    vibration: true,
    weather: false,         // آب‌وهوا (نیاز به اینترنت)
    meds: false
  },

  // منابع بیرونی — فقط در صورت نیاز به اینترنت
  weather: {
    enabled: true,
    // Open-Meteo: بدون کلید، رایگان برای استفاده غیرتجاری، مجوز CC BY 4.0
    endpoint: "https://api.open-meteo.com/v1/forecast",
    attribution: "weather by open-meteo.com",
    attributionUrl: "https://open-meteo.com/",
    // دادهٔ آب‌وهوا در حافظهٔ نهان می‌ماند و به سروری ارسال نمی‌شود.
    cacheMinutes: 20
  },

  // یادآوری‌ها: با چه فاصله‌ای بررسی شوند (میلی‌ثانیه)
  reminderPollMs: 20000,

  // متن‌های راهنما و هشدارها (کاربردی برای ویرایش سریع)
  notes: {
    prayerDisclaimer: "زمان‌ها با الگوریتم نجومی محلی محاسبه شده‌اند و ممکن است با تقویم رسمی محل شما ‎۱± دقیقه تفاوت داشته باشند؛ برای دقت شرعی با مرجع محلی تطبیق دهید.",
    hijriDisclaimer: "تاریخ قمری به روش جدولی (civil/tabular) است و می‌تواند با رؤیت هلال ‎۱± روز تفاوت داشته باشد.",
    occasionsSample: "مناسبت‌ها: نمونهٔ قابل ویرایش در data/occasions.js — هر سال بازبینی کنید.",
    notifyLimitation: "در حالت PWA، اعلان فقط وقتی برنامه باز است تضمین می‌شود. برای اعلان مطمئنِ پس‌زمینه به بستهٔ APK با سرویس بومی نیاز است.",
    medsDisclaimer: "این بخش توصیهٔ پزشکی نیست؛ فقط یادآور شخصی است. دوز و زمان را پزشک تعیین می‌کند.",
    fontHint: "برای زیبایی بیشتر، فایل Rokh.ttf را در پوشهٔ fonts/ بگذارید (راهنما در README)."
  }
};

/* <<<<<<<<<<<<<<<<<<<< END OF EDITABLE CONFIG <<<<<<<<<<<<<<<<<<<< */

/* ==========================================================================
   ███████╗███╗   ██╗███╗   ██╗ ██████╗ ███████╗██████╗     ██╗   ██╗ ██╗
   ██╔════╝████╗  ██║████╗  ██║██╔════╝ ██╔════╝██╔══██╗   ███║   ███║██║
   █████╗  ██╔██╗ ██║██╔██╗ ██║██║  ███╗█████╗  ██████╔╝   ╚██║ ███╔╝███████║
   ██╔══╝  ██║╚██╗██║██║╚██╗██║██║   ██║██╔══╝  ██╔══██╗    ╚███╔╝  ██╔══██║
   ███████╗██║ ╚████║██║ ╚████║╚██████╔╝███████╗██║  ██║     ╚██║   ██║  ██║
   ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝      ╚═╝   ╚═╝  ╚═╝
   ↓↓↓ از این خط به بعد: موتور برنامه — نیازی به ویرایش ندارد ↓↓↓
   ========================================================================== */
/* ENGINE:BEGIN */
(function () {
"use strict";

const CFG = (typeof FETROS_CONFIG !== "undefined") ? FETROS_CONFIG : {};
const NOTE = (CFG.notes) || {};
const DOC = (typeof document !== "undefined") ? document : null;
const WIN = (typeof window !== "undefined") ? window : null;

/* ---------------------------------------------------------------
   MODULE 00 · utils — کمک‌تابع‌های عمومی (ایمن، بدون innerHTML خام)
   --------------------------------------------------------------- */
const U = {};

U.$ = (sel, root) => (root || DOC).querySelector(sel);
U.$$ = (sel, root) => Array.prototype.slice.call((root || DOC).querySelectorAll(sel));
const U$ = U.$; /* alias used by the optional-audio helper */
U.el = (tag, attrs, children) => {
  const n = DOC.createElement(tag);
  if (attrs) for (const k in attrs) {
    if (k === "class") n.className = attrs[k];
    else if (k === "text") n.textContent = attrs[k];
    else if (k === "html") n.innerHTML = attrs[k];      // ONLY for trusted static markup
    else if (k.startsWith("on") && typeof attrs[k] === "function") n.addEventListener(k.slice(2), attrs[k]);
    else if (attrs[k] != null) n.setAttribute(k, attrs[k]);
  }
  if (children) (Array.isArray(children) ? children : [children]).forEach(c => c && n.appendChild(c));
  return n;
};
U.clear = (n) => { while (n && n.firstChild) n.removeChild(n.firstChild); };
U.fmt = (v) => (v == null ? "" : String(v));

/* Persian / Latin digits ------------------------------------------------- */
const FA_DIGITS = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
let USE_FA_DIGITS = true;
U.setDigits = (fa) => { USE_FA_DIGITS = !!fa; };
U.num = (v, pad) => {
  let s = (v == null ? "" : String(v));
  if (pad != null && /^[-+]?\d+$/.test(s)) s = s.padStart(pad, "0");
  if (!USE_FA_DIGITS) return s;
  return s.replace(/[0-9]/g, d => FA_DIGITS[+d]);
};
U.pad2 = (n) => String(n).padStart(2, "0");
U.mmss = (sec) => {
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return (h > 0 ? U.num(h) + ":" : "") + U.num(U.pad2(m)) + ":" + U.num(U.pad2(s));
};

/* Math helpers ----------------------------------------------------------- */
U.clamp = (v, a, b) => Math.min(b, Math.max(a, v));
U.radians = (d) => d * Math.PI / 180;
U.degrees = (r) => r * 180 / Math.PI;
U.sin = (d) => Math.sin(U.radians(d));
U.cos = (d) => Math.cos(U.radians(d));
U.tan = (d) => Math.tan(U.radians(d));
U.asin = (x) => U.degrees(Math.asin(x));
U.acos = (x) => U.degrees(Math.acos(x));
U.atan2 = (y, x) => U.degrees(Math.atan2(y, x));
U.fixAngle = (a) => ((a % 360) + 360) % 360;
U.fixHour = (h) => ((h % 24) + 24) % 24;
U.floorDiv = (a, b) => Math.floor(a / b);
U.mod = (a, b) => ((a % b) + b) % b;

/* Safe storage (works even when storage is blocked) ---------------------- */
U.lsGet = (key, fallback) => {
  try { const v = WIN.localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
  catch (e) { return fallback; }
};
U.lsSet = (key, val) => {
  try { WIN.localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch (e) { U.toast && U.toast("ذخیرهٔ تنظیمات ناموفق بود", e && e.message || "حافظهٔ مرورگر در دسترس نیست"); return false; }
};
U.lsDel = (key) => { try { WIN.localStorage.removeItem(key); } catch (e) {} };

/* media-query helper that never throws when matchMedia is missing (old WebViews) */
U.mq = (q) => {
  try { if (WIN && typeof WIN.matchMedia === "function") return WIN.matchMedia(q); } catch (e) {}
  return { matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} };
};
U.reducedMotion = () => U.mq("(prefers-reduced-motion: reduce)").matches;
U.scrollIntoView = (n) => {
  if (!n) return;
  try { if (typeof n.scrollIntoView === "function") n.scrollIntoView({ block: "center", behavior: (DOC && DOC.documentElement.dataset.motion === "low") ? "auto" : "smooth" }); }
  catch (e) { /* older engines: skip the nicety */ }
};
U.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

U.uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

U.throttle = (fn, ms) => { let t = 0, timer = null, lastArgs;
  return function () { lastArgs = arguments; const now = Date.now();
    if (now - t >= ms) { t = now; fn.apply(null, lastArgs); }
    else { clearTimeout(timer); timer = setTimeout(() => { t = Date.now(); fn.apply(null, lastArgs); }, ms - (now - t)); } }; };

/* ---------------------------------------------------------------
   MODULE 01 · calendar — جالالی (آمایشی/خورشیدی) + میلادی + قمری جدولی
   الگوریتم جالالی: نسخهٔ jalaali-js (پایدار، MIT) با اصلاح تقسیمِ کف‌محور.
   قمری: جدولی/مدنی (tabular civil) — با Intl islamic-civil راستی‌آزمایی شد.
   --------------------------------------------------------------- */
const CAL = {};

CAL.J_MONTHS = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
CAL.G_MONTHS = ["ژانویه","فوریه","مارس","آوریل","مه","ژوئن","ژوئیه","اوت","سپتامبر","اکتبر","نوامبر","دسامبر"];
CAL.H_MONTHS = ["محرّم","صفر","ربیع‌الاول","ربیع‌الثانی","جمادی‌الاول","جمادی‌الثانی","رجب","شعبان","رمضان","شوّال","ذی‌القعده","ذی‌الحجه"];
CAL.DOW = ["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"];
CAL.DOW_SHORT = ["ش","ی","د","س","چ","پ","ج"]; // index = JS getDay() (0=Sunday)

/* --- day-number: integer days since 1970-01-01 (UTC), proleptic Gregorian --- */
CAL.DAY_MS = 86400000;
CAL.dayFromGreg = (gy, gm, gd) => Math.round((Date.UTC(gy, gm - 1, gd)) / CAL.DAY_MS);
CAL.dayFromUTCDate = (d) => Math.round(d.getTime() / CAL.DAY_MS);
CAL.gregFromDay = (n) => { const d = new Date(n * CAL.DAY_MS); return { gy: d.getUTCFullYear(), gm: d.getUTCMonth() + 1, gd: d.getUTCDate(), dow: d.getUTCDay() }; };
CAL.todayDayNo = () => { const n = new Date(); return Math.round((Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / CAL.DAY_MS); };

/* --- Solar Hijri (Jalaali) — verified algorithm --- */
const J_BREAKS = [-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];
/* N.B. the jalaali algorithm is defined with *truncating* integer division
   (as in the reference implementation). Do not replace with Math.floor. */
function jDiv(a,b){ return Math.trunc(a/b); }
function jMod(a,b){ return a - Math.trunc(a/b)*b; }
/* Gregorian <-> Julian Day Number: Fliegel & Van Flandern (1968), truncating division.
   Verified monotonic + exact inverse over 40,000 consecutive days, and it reproduces
   the astronomical JDN (g2d(1970,1,1)=2440588, g2d(622,7,19)=1948440). */
const tDiv = (a, b) => Math.trunc(a / b);

function jalCal(jy) {
  const bl = J_BREAKS.length;
  const gy = jy + 621;
  let leapJ = -14, jp = J_BREAKS[0], jm, jump = 0, leapG, march, n, i;
  if (jy < jp || jy >= J_BREAKS[bl - 1]) throw new RangeError("jalaali year out of range: " + jy);
  for (i = 1; i < bl; i += 1) {
    jm = J_BREAKS[i]; jump = jm - jp;
    if (jy < jm) break;
    leapJ = leapJ + jDiv(jump, 33) * 8 + jDiv(jMod(jump, 33), 4);
    jp = jm;
  }
  n = jy - jp;
  leapJ = leapJ + jDiv(n, 33) * 8 + jDiv(jMod(n, 33) + 3, 4);
  if (jMod(jump, 33) === 4 && jump - n === 4) leapJ += 1;
  leapG = jDiv(gy, 4) - jDiv((jDiv(gy, 100) + 1) * 3, 4) - 150;
  march = 20 + leapJ - leapG;
  if (jump - n < 6) n = n - jump + jDiv(jump + 4, 33) * 33;
  let leap = jMod(jMod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;
  return { leap: leap, gy: gy, march: march };
}
function g2d(gy, gm, gd) {
  return tDiv(1461 * (gy + tDiv(gm - 14, 12) + 4800), 4)
       + tDiv(367 * (gm - 2 - 12 * tDiv(gm - 14, 12)), 12)
       - tDiv(3 * tDiv(gy + tDiv(gm - 14, 12) + 4900, 100), 4)
       + gd - 32075;
}
function d2g(jdn) {
  let L = jdn + 68569;
  const N = tDiv(4 * L, 146097);
  L = L - tDiv(146097 * N + 3, 4);
  const I = tDiv(4000 * (L + 1), 1461001);
  L = L - tDiv(1461 * I, 4) + 31;
  const J = tDiv(80 * L, 2447);
  const gd = L - tDiv(2447 * J, 80);
  L = tDiv(J, 11);
  const gm = J + 2 - 12 * L;
  const gy = 100 * (N - 49) + I + L;
  return { gy, gm, gd };
}
function j2d(jy, jm, jd) { const r = jalCal(jy); return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - jDiv(jm, 7) * (jm - 7) + jd - 1; }
function d2j(jdn) {
  const gy = d2g(jdn).gy;
  let jy = gy - 621;
  const r = jalCal(jy);
  const jdn1f = g2d(gy, 3, r.march);
  let jd, jm, k = jdn - jdn1f;
  if (k >= 0) {
    if (k <= 185) { jm = 1 + jDiv(k, 31); jd = jMod(k, 31) + 1; return { jy, jm, jd }; }
    k -= 186;
  } else { jy -= 1; k += 179; if (r.leap === 1) k += 1; }
  jm = 7 + jDiv(k, 30); jd = jMod(k, 30) + 1;
  return { jy, jm, jd };
}
CAL.jalCalInfo = jalCal;
CAL.jalaaliMonthLength = (jy, jm) => { if (jm <= 6) return 31; if (jm <= 11) return 30; return (j2d(jy + 1, 1, 1) - j2d(jy, 12, 1)); };
CAL.isJalaaliLeap = (jy) => CAL.jalaaliMonthLength(jy, 12) === 30;

CAL.gregToJal = (gy, gm, gd) => { try { return d2j(g2d(gy, gm, gd)); } catch (e) { return null; } };
CAL.jalToGreg = (jy, jm, jd) => { try { return d2g(j2d(jy, jm, jd)); } catch (e) { return null; } };

/* day-number ⇄ jalaali (single source of truth for the whole app) */
CAL.jalFromDay = (n) => { const g = CAL.gregFromDay(n); return Object.assign({}, CAL.gregToJal(g.gy, g.gm, g.gd), g); };
CAL.dayFromJal = (jy, jm, jd) => { const g = CAL.jalToGreg(jy, jm, jd); return g ? CAL.dayFromGreg(g.gy, g.gm, g.gd) : null; };

/* --- Hijri (tabular / civil) ---
   1 Muḥarram AH 1 = 1948440 JDN = 622-07-19 proleptic Gregorian.
   Leap pattern: 11 leap years per 30, leap if mod(11y+14,30) < 11.
   Month starts: alternating 30/29 with 30 appended to year (Dhū al-Ḥijjah in leap years).
   Validated against Intl `islamic-civil` (10,488 sampled days 1900–2100 → 0 mismatch).
*/
const H_EPOCH_DAY = CAL.dayFromGreg(622, 7, 19);                 // -492148
const H_MONTH_START = [0, 0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325];
const H_IS_LEAP = (y) => U.mod(11 * y + 14, 30) < 11;
const H_LEAP_PREFIX = (() => { const T = [0]; for (let k = 1; k <= 30; k++) T[k] = T[k - 1] + (H_IS_LEAP(k) ? 1 : 0); return T; })();
const H_leapsBefore = (y) => { const n = y - 1; return H_LEAP_PREFIX[30] * Math.floor(n / 30) + H_LEAP_PREFIX[U.mod(n, 30)]; };
CAL.hijriToDay = (hy, hm, hd) => { if (hy < 1 || hm < 1 || hm > 12 || hd < 1 || hd > 30) return null; return H_EPOCH_DAY + 354 * (hy - 1) + H_leapsBefore(hy) + H_MONTH_START[hm] + (hd - 1); };
CAL.hijriMonthLength = (hy, hm) => (hm === 12 && H_IS_LEAP(hy)) ? 30 : ((hm % 2 === 1) ? 30 : 29);
CAL.dayToHijri = (() => {
  const cache = new Map();
  return function (n) {
    if (cache.has(n)) return cache.get(n);
    let hy = Math.max(1, Math.floor((n - H_EPOCH_DAY) / 354.36667));
    while (CAL.hijriToDay(hy + 1, 1, 1) <= n) hy++;
    while (CAL.hijriToDay(hy, 1, 1) > n) hy--;
    let hm = 1; while (hm < 12 && CAL.hijriToDay(hy, hm + 1, 1) <= n) hm++;
    const hd = n - CAL.hijriToDay(hy, hm, 1) + 1;
    const out = { hy, hm, hd, mlen: CAL.hijriMonthLength(hy, hm) };
    if (cache.size > 6000) cache.clear();
    cache.set(n, out);
    return out;
  };
})();

/* --- Formatting --- */
CAL.fmtJal = (j, opts) => {
  opts = opts || {};
  const dName = opts.dow === false ? "" : (CAL.DOW[j.dow != null ? j.dow : CAL.gregFromDay(0).dow] || "");
  const core = U.num(j.jd) + " " + CAL.J_MONTHS[j.jm - 1] + " " + U.num(j.jy);
  return opts.short ? core : (dName ? dName + "، " + core : core);
};
CAL.fmtGreg = (g, opts) => { opts = opts || {}; return U.num(g.gd) + " " + CAL.G_MONTHS[g.gm - 1] + " " + U.num(g.gy) + (opts.dow ? "" : ""); };
CAL.fmtHijri = (h) => U.num(h.hd) + " " + CAL.H_MONTHS[h.hm - 1] + " " + U.num(h.hy);

CAL.dateInfo = (dayNo) => {
  const g = CAL.gregFromDay(dayNo);
  const j = CAL.gregToJal(g.gy, g.gm, g.gd) || {};
  const h = CAL.dayToHijri(dayNo);
  return { dayNo, gy: g.gy, gm: g.gm, gd: g.gd, dow: g.dow, jy: j.jy, jm: j.jm, jd: j.jd, jlength: j.jy ? CAL.jalaaliMonthLength(j.jy, j.jm) : 30, hijri: h };
};

/* first weekday offset for a jalaali month (Saturday = 0 index in our grid) */
CAL.jalMonthGrid = (jy, jm) => {
  const len = CAL.jalaaliMonthLength(jy, jm);
  const firstDay = CAL.dayFromJal(jy, jm, 1);
  if (firstDay == null) return null;
  const firstDow = CAL.gregFromDay(firstDay).dow;      // 0=Sun..6=Sat
  const lead = U.mod(firstDow - 6, 7);                 // Saturday-first grid
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const dn = firstDay - lead + i;
    const info = CAL.dateInfo(dn);
    cells.push(Object.assign({}, info, { inMonth: (info.jy === jy && info.jm === jm) }));
  }
  return { cells, lead, len, firstDow };
};

CAL.timeZoneOffsetHours = (date, tzName) => {
  try {
    const dtf = new Intl.DateTimeFormat("en-US", { timeZone: tzName, hour12: false, year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit", second:"2-digit" });
    const parts = {}; dtf.formatToParts(date).forEach(p => parts[p.type] = p.value);
    let asUTC = Date.UTC(+parts.year, +parts.month - 1, +parts.day, (+parts.hour) % 24, +parts.minute, +parts.second);
    return (asUTC - Math.floor(date.getTime() / 1000) * 1000) / 3600000;
  } catch (e) { return null; }
};
CAL.localTzOffsetHours = (date) => -(date || new Date()).getTimezoneOffset() / 60;
CAL.weekdayName = (d) => CAL.DOW[d] || "";

/* ---------------------------------------------------------------
   MODULE 02 · occasions — داده‌های مناسبت‌ها (از data/occasions.js)
   - قمری «بدون سال» هر سال به‌صورت پویا تطبیق داده می‌شود
   --------------------------------------------------------------- */
const OCC = { list: [], byJal: new Map(), cacheDay: new Map(), meta: null };
OCC.load = () => {
  const src = (typeof OCCASIONS !== "undefined") ? OCCASIONS : [];
  OCC.meta = (typeof OCCASIONS_META !== "undefined") ? OCCASIONS_META : { noteFa: "داده‌ای بارگذاری نشد", version: "—" };
  OCC.list = src.map(o => Object.assign({}, o));
  OCC.byJal = new Map();
  OCC.cacheDay.clear();
  OCC.list.forEach(o => {
    if (o.jMonth && o.jDay) { const k = o.jMonth + "-" + o.jDay; if (!OCC.byJal.has(k)) OCC.byJal.set(k, []); OCC.byJal.get(k).push(o); }
  });
  OCC.hijriList = OCC.list.filter(o => o.hMonth && o.hDay);
};
OCC.forDay = (dayNo) => {
  if (OCC.cacheDay.has(dayNo)) return OCC.cacheDay.get(dayNo);
  const info = CAL.dateInfo(dayNo);
  const out = [];
  const jk = info.jm + "-" + info.jd; if (OCC.byJal.has(jk)) out.push(...OCC.byJal.get(jk));
  OCC.hijriList.forEach(o => { if (o.hMonth === info.hijri.hm && o.hDay === info.hijri.hd) out.push(o); });
  OCC.list.forEach(o => { if (!o.jMonth && o.gMonth && o.gMonth === info.gm && o.gDay === info.gd) out.push(o); });
  OCC.cacheDay.set(dayNo, out);
  return out;
};
OCC.search = (q) => {
  q = (q || "").trim().toLowerCase();
  if (!q) return OCC.list.slice(0, 60);
  return OCC.list.filter(o => (o.title || "").toLowerCase().includes(q) || (o.description || "").toLowerCase().includes(q)).slice(0, 60);
};
OCC.personal = new Map(); // dayNo -> items[]  (from organizer)
OCC.addPersonal = (dayNo, item) => { if (!OCC.personal.has(dayNo)) OCC.personal.set(dayNo, []); OCC.personal.get(dayNo).push(item); OCC.cacheDay.delete(dayNo); };
OCC.resetPersonal = () => { OCC.personal = new Map(); OCC.cacheDay.clear(); };
OCC.forDayWithPersonal = (dayNo) => OCC.forDay(dayNo).concat(OCC.personal.get(dayNo) || []);
/* ---------------------------------------------------------------
   MODULE 03 · prayer — اوقات شرعی (محاسبهٔ نجومی محلی، بدون API)
   فرمول‌ها: موقعیت خورشید (Meeus، دقت پایین)، نیمروز خورشیدی، زاویهٔ فجر/غروب.
   روش‌ها: Tehran 16/14 · MWL 18/17 · Egypt 19.5/17.5 · Karachi 18/18 · UmmAlQura 18.5 / +90min
   Asr: سایه = ۱ (استاندارد/جعفری) یا ۲ (حنفی)
   اعتبارسنجی: با مقدار مرجع EoT/declination و تطبیق ساعتی شهرهای نمونه.
   --------------------------------------------------------------- */
const PRAY = {};
PRAY.METHODS = {
  Tehran:    { label: "تهران (انستیتو ژئوفیزیک)", fajr: 16,   isha: 14,   maghribMin: 0,  dhuhrMin: 0, ishaMin: null, midnight: "Jafari" },
  MWL:       { label: "Musulman World League",    fajr: 18,   isha: 17,   maghribMin: 0,  dhuhrMin: 0, ishaMin: null, midnight: "Standard" },
  Egypt:     { label: "Egyptian General Authority", fajr: 19.5, isha: 17.5, maghribMin: 0, dhuhrMin: 0, ishaMin: null, midnight: "Standard" },
  Karachi:   { label: "Univ. of Islamic Sciences, Karachi", fajr: 18, isha: 18, maghribMin: 0, dhuhrMin: 0, ishaMin: null, midnight: "Standard" },
  UmmAlQura: { label: "Umm al-Qura, Makkah",      fajr: 18.5, isha: null,  maghribMin: 1,  dhuhrMin: 0, ishaMin: 90,  midnight: "Standard" }
};
PRAY.NAMES = [
  { key: "fajr",    fa: "اذان صبح",   icon: "🌄" },
  { key: "sunrise", fa: "طلوع آفتاب", icon: "☀️", noCount: true },
  { key: "dhuhr",   fa: "اذان ظهر",   icon: "🕛" },
  { key: "asr",     fa: "عصر",        icon: "🌤️" },
  { key: "sunset",  fa: "غروب",       icon: "🌇", noCount: true },
  { key: "maghrib", fa: "اذان مغرب",  icon: "🌆" },
  { key: "isha",    fa: "عشاء",       icon: "🌙" }
];

function julianDate(y, m, d) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}
PRAY._julian = julianDate;

/* Sun: declination (deg) + equation of time (hours). Low-precision Meeus (±0.01°). */
PRAY.sunPosition = function (jd) {
  const D = jd - 2451545.0;
  const g = U.fixAngle(357.529 + 0.98560028 * D);
  const q = U.fixAngle(280.459 + 0.98564736 * D);
  const L = U.fixAngle(q + 1.915 * U.sin(g) + 0.020 * U.sin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const decl = U.asin(U.sin(e) * U.sin(L));
  let RA = U.atan2(U.cos(e) * U.sin(L), U.cos(L)) / 15;
  RA = U.fixHour(RA);
  return { decl, eot: q / 15 - RA };
};

/* Core computation. Returns fractional clock hours (0..24) or null if impossible. */
PRAY.compute = function (opts) {
  const { lat, lng, tz, date, method, asr, adjust, polarRule } = opts;
  const M = PRAY.METHODS[method] || PRAY.METHODS.Tehran;
  const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
  const jd = julianDate(y, m, d) - lng / 360;         // JD at local midnight
  const sunAt = (t) => PRAY.sunPosition(jd + t);
  const midDay = (t) => U.fixHour(12 - sunAt(t).eot);
  const asrFactor = (asr === "Hanafi") ? 2 : 1;

  function angleTime(angle, t, dir) {
    const s = sunAt(t);
    const numerator = (-U.sin(angle) - U.sin(s.decl) * U.sin(lat));
    const denominator = (U.cos(s.decl) * U.cos(lat));
    if (!denominator) return null;
    const x = numerator / denominator;
    if (x > 1 || x < -1) return null;
    const delta = U.acos(x) / 15;
    return U.fixHour(midDay(t) + (dir === "ccw" ? -delta : delta));
  }
  function asrTime(t) {
    const s = sunAt(t);
    const angle = -U.atan2(1, (asrFactor + U.tan(Math.abs(lat - s.decl))));
    return angleTime(angle, t, "cw");
  }
  function iterate(fn, guessDays) { let v = fn(guessDays); for (let i = 0; i < 3; i++) { const nv = fn(v / 24); if (nv == null) break; if (Math.abs(nv - v) < 1e-6) { v = nv; break; } v = nv; } return v == null ? null : v; }

  let sunrise = iterate(t => angleTime(0.833, t, "ccw"), 6 / 24);
  let sunset  = iterate(t => angleTime(0.833, t, "cw"), 18 / 24);
  let fajr    = iterate(t => angleTime(M.fajr, t, "ccw"), 5 / 24);
  let isha    = M.isha != null ? iterate(t => angleTime(M.isha, t, "cw"), 19 / 24) : null;
  let asrT    = iterate(t => asrTime(t), 13 / 24);
  const dhuhr = U.fixHour(midDay(12 / 24) + (M.dhuhrMin || 0) / 60);

  // Polar fallback (angles never reached): one-seventh / midnight rules
  const night = (sunrise != null && sunset != null) ? U.fixHour(sunrise + 24 - sunset) : null;
  let polarApplied = false;
  const ruleOn = polarRule && polarRule !== "none";
  if (ruleOn && night && sunrise != null && sunset != null) {
    if (fajr == null) { fajr = polarRule === "midnight" ? U.fixHour(sunset - night / 2) : U.fixHour(sunrise - night / 7); polarApplied = true; }
    if (isha == null && M.isha != null) { isha = polarRule === "midnight" ? U.fixHour(sunset + night / 2) : U.fixHour(sunset + night / 7); polarApplied = true; }
  }

  const shift = (h) => h == null ? null : U.fixHour(h + tz - lng / 15);
  const out = {};
  PRAY.NAMES.forEach(n => out[n.key] = null);
  out.fajr = shift(fajr);
  out.sunrise = shift(sunrise);
  out.dhuhr = shift(dhuhr);
  out.asr = shift(asrT);
  out.sunset = shift(sunset);
  out.maghrib = shift(sunset) == null ? null : U.fixHour(shift(sunset) + (M.maghribMin || 0) / 24);
  if (M.ishaMin) out.isha = out.maghrib == null ? null : U.fixHour(out.maghrib + M.ishaMin / 24);
  else out.isha = shift(isha);
  // per-prayer minute adjustments from user
  Object.keys(adjust || {}).forEach(k => { if (out[k] != null && adjust[k]) out[k] = U.fixHour(out[k] + adjust[k] / 60); });
  // midnight (شرعی) — sunset → next sunrise
  out.midnight = (out.sunset != null && out.sunrise != null) ? U.fixHour(out.sunset + U.fixHour(out.sunrise + 24 - out.sunset) / 2) : null;
  out.meta = { method, asr, jd, decl: sunAt(0.5).decl, eot: sunAt(0.5).eot * 60, polarApplied: polarApplied, polarDegraded: (fajr == null || isha == null || magrNull(out)) };
  function magrNull(o) { return o.fajr == null || o.isha == null; }
  return out;
};

PRAY.toClock = (h) => {
  if (h == null) return "—";
  let total = Math.round(h * 60); total = U.mod(total, 1440);
  return U.num(U.pad2(Math.floor(total / 60))) + ":" + U.num(U.pad2(total % 60));
};
PRAY.hoursToSecFromMidnight = (h) => h == null ? null : Math.round(U.mod(h, 24) * 3600);

/* Next prayer + countdown -------------------------------------------------- */
PRAY.nextInfo = function (times, now) {
  const secNow = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds() / 1000;
  const list = PRAY.NAMES.filter(n => !n.noCount && times[n.key] != null);
  for (const n of list) {
    const s = PRAY.hoursToSecFromMidnight(times[n.key]);
    if (s > secNow) return { next: n, targetSec: s, secNow, rollover: false };
  }
  return { next: list[0] || PRAY.NAMES[0], targetSec: null, secNow, rollover: true };
};

/* ---------------------------------------------------------------
   MODULE 04 · qibla — جهت قبله با بزرگ‌ترین دایره (great-circle)
   کعبه: 21.4225 N, 39.8262 E (مسجدالحرام — مقدار مرجع عمومی)
   --------------------------------------------------------------- */
const QIBLA = {};
QIBLA.KAABA = { lat: 21.4225, lng: 39.8262, name: "کعبه، مسجدالحرام" };
QIBLA.bearing = function (lat, lng) {
  const dLon = QIBLA.KAABA.lng - lng;
  const y = U.sin(dLon);
  const x = U.cos(lat) * U.tan(QIBLA.KAABA.lat) - U.sin(lat) * U.cos(dLon);
  return U.fixAngle(U.atan2(y, x));
};
QIBLA.distanceKm = function (lat, lng) {
  const R = 6371;
  const dLat = QIBLA.KAABA.lat - lat, dLon = QIBLA.KAABA.lng - lng;
  const a = Math.pow(U.sin(dLat / 2), 2) + U.cos(lat) * U.cos(QIBLA.KAABA.lat) * Math.pow(U.sin(dLon / 2), 2);
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
/* Low-pass filter for sensor smoothing (circular) */
QIBLA.filter = function (alpha) {
  let prev = null;
  return function (v) {
    const k = alpha;
    if (prev == null) { prev = v; return v; }
    let diff = ((v - prev + 540) % 360) - 180;
    prev = U.fixAngle(prev + k * diff);
    return prev;
  };
};

/* ---------------------------------------------------------------
   MODULE 05 · store — تنظیمات (localStorage) + رکوردها (IndexedDB)
   --------------------------------------------------------------- */
const SET = {};
const SET_KEY = "fetros.settings.v2";
SET.data = Object.assign({
  theme: "dark", accent: "gold", persianDigits: true, motion: "medium",
  city: (CFG.defaultCity || "tehran"), geo: null,
  method: "Tehran", asr: "Standard", adjust: {}, polarRule: "none",
  notifications: false, azan: false, vibration: true,
  weather: false, meds: false, quickNote: "", lastSeen: 0,
  dhikr: { label: (CFG.dhikrDefaultLabel || "ذکر"), target: 33, count: 0, history: [] }
}, (CFG.defaults || {}));
SET.load = function () {
  const raw = U.lsGet(SET_KEY, null);
  if (raw && typeof raw === "object") {
    SET.data = Object.assign({}, SET.data, raw);
    SET.data.dhikr = Object.assign({ label: "ذکر", target: 33, count: 0, history: [] }, raw.dhikr || {});
    SET.data.adjust = Object.assign({}, raw.adjust || {});
  }
  return SET.data;
};
SET.save = function () { return U.lsSet(SET_KEY, SET.data); };
SET.getCity = function () {
  const list = (CFG.cities || []);
  if (SET.data.geo && typeof SET.data.geo.lat === "number") return Object.assign({ id: "geo", name: "مکان فعلی" }, SET.data.geo);
  return list.find(c => c.id === SET.data.city) || list[0] || { id: "tehran", name: "تهران", lat: 35.6892, lng: 51.3890, tz: "Asia/Tehran" };
};

const DB = {
  name: "fetros", version: 1, db: null, ok: false,
  stores: ["tasks","notes","reminders","birthdays","meds","medlogs","dhikr"],
  open() {
    return new Promise((resolve) => {
      if (DB.db) return resolve(DB.db);
      if (!WIN || !WIN.indexedDB) { DB.ok = false; return resolve(null); }
      let req;
      try { req = WIN.indexedDB.open(DB.name, DB.version); } catch (e) { DB.ok = false; return resolve(null); }
      req.onupgradeneeded = (ev) => {
        const db = req.result;
        DB.stores.forEach(s => { if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, { keyPath: "id" }); });
      };
      req.onsuccess = () => { DB.db = req.result; DB.ok = true; DB.db.onversionchange = () => { try { DB.db.close(); DB.db = null; } catch (e) {} }; resolve(DB.db); };
      req.onerror = () => { DB.ok = false; resolve(null); };
      req.onblocked = () => { DB.ok = false; resolve(null); };
      setTimeout(() => { if (!DB.db) resolve(null); }, 2500);
    });
  },
  tx(store, mode) { const db = DB.db; return db.transaction(store, mode).objectStore(store); },
  all(store) {
    return DB.open().then(db => {
      if (!db) return FS.all(store);
      return new Promise(res => { const r = DB.tx(store, "readonly").getAll(); r.onsuccess = () => res(r.result || []); r.onerror = () => res([]); });
    });
  },
  put(store, obj) {
    return DB.open().then(db => {
      if (!db) return FS.put(store, obj);
      return new Promise(res => { const r = DB.tx(store, "readwrite").put(obj); r.onsuccess = () => res(obj); r.onerror = () => res(null); });
    });
  },
  del(store, id) {
    return DB.open().then(db => {
      if (!db) return FS.del(store, id);
      return new Promise(res => { const r = DB.tx(store, "readwrite").delete(id); r.onsuccess = () => res(true); r.onerror = () => res(false); });
    });
  },
  clearAll() {
    return DB.open().then(db => {
      if (!db) { DB.stores.forEach(s => FS.clear(s)); return true; }
      return new Promise(res => {
        const t = db.transaction(DB.stores, "readwrite");
        DB.stores.forEach(s => t.objectStore(s).clear());
        t.oncomplete = () => res(true); t.onerror = () => res(false);
      });
    });
  },
  dump() { return Promise.all(DB.stores.map(s => DB.all(s).then(a => [s, a]))).then(pairs => { const o = {}; pairs.forEach(([k, v]) => o[k] = v); return o; }); },
  restore(obj) {
    const jobs = [];
    DB.stores.forEach(s => { (Array.isArray(obj[s]) ? obj[s] : []).forEach(it => { if (it && it.id) jobs.push(DB.put(s, it)); }); });
    return Promise.all(jobs).then(a => a.length);
  }
};
/* localStorage fallback if IndexedDB is unavailable (private mode etc.) */
const FS = {
  key: "fetros.fallback.v2",
  read() { const o = U.lsGet(FS.key, {}); DB.stores.forEach(s => { if (!Array.isArray(o[s])) o[s] = []; }); return o; },
  write(o) { return U.lsSet(FS.key, o); },
  all(store) { return FS.read()[store] || []; },
  put(store, obj) { const o = FS.read(); const a = o[store] || []; const i = a.findIndex(x => x.id === obj.id); if (i >= 0) a[i] = obj; else a.push(obj); o[store] = a; FS.write(o); return obj; },
  del(store, id) { const o = FS.read(); o[store] = (o[store] || []).filter(x => x.id !== id); FS.write(o); return true; },
  clear(store) { const o = FS.read(); if (store) o[store] = []; else DB.stores.forEach(s => o[s] = []); FS.write(o); }
};
/* ---------------------------------------------------------------
   MODULE 06 · ui — پوسته: اسپلش، ناوبری، شیت/دیالوگ، توست، رویل، پارالاکس
   --------------------------------------------------------------- */
const UI = {};
UI.state = { view: "home", tool: "dhikr", selectedDay: null, calMonth: null, focusStack: [], booted: false };

/* --- splash: percentage counter, never hangs --- */
/* Standalone so it still works if boot() throws before initSplash() runs. */
UI.forceHideSplash = function (err) {
  const splash = DOC && DOC.querySelector("#splash");
  if (!splash || splash.dataset.fetrosHidden === "1") return;
  splash.dataset.fetrosHidden = "1";
  const fill = DOC.querySelector("#loaderFill"), num = DOC.querySelector("#loaderNum");
  if (fill) fill.style.width = "100%";
  if (num) num.textContent = U.num(100) + "٪";
  splash.classList.add("hidden");
  splash.setAttribute("aria-hidden", "true");
  setTimeout(() => { try { splash.style.display = "none"; } catch (e) {} }, 840);
  if (err && UI.toast) UI.toast("فطرس", "برخی بخش‌ها کامل بالا نیامدند: " + String(err).slice(0, 120), "warn");
};
/* watchdog: registered as soon as the script is parsed, before any boot step can fail */
if (DOC) { setTimeout(() => { try { UI.forceHideSplash("timeout"); } catch (e) {} }, 4500); }

UI.initSplash = function () {
  const splash = U.$("#splash"), fill = U.$("#loaderFill"), num = U.$("#loaderNum");
  if (!splash) { return; }
  let p = 0, done = false;
  const steps = [ {at: 15}, {at: 38}, {at: 56}, {at: 74}, {at: 88}, {at: 97} ];
  let si = 0;
  const tick = () => {
    if (done) return;
    const target = si < steps.length ? steps[si].at : 99;
    p = Math.min(99, p + Math.max(1, (target - p) * 0.35));
    if (fill) fill.style.width = p.toFixed(0) + "%";
    if (num) num.textContent = U.num(Math.floor(p)) + "٪";
    if (p >= target - 0.5) si++;
    if (!done) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  UI.finishSplash = function (err) {
    if (done) return; done = true;
    setTimeout(() => {
      UI.forceHideSplash(err ? String(err) : null);
      UI.revealer && UI.revealer.scan();
    }, 200);
  };
  // hard failsafe: even if JS/assets break, the splash disappears
  setTimeout(() => UI.finishSplash && UI.finishSplash("slow"), 4200);
  // Font probe (tolerant): marks <html data-font> so CSS can avoid synthetic bold
  // and the app stays fully usable when fonts/Rokh.ttf is absent.
  UI.probeFont();
};

UI.probeFont = function () {
  const root = DOC.documentElement;
  const mark = (state) => { if (root.dataset.font !== state) root.dataset.font = state; };
  mark("checking");
  const has = (spec) => { try { return DOC.fonts && typeof DOC.fonts.check === "function" ? DOC.fonts.check(spec) : null; } catch (e) { return null; } };
  const decide = () => {
    const ok400 = has('400 16px Rokh');
    const ok900 = has('900 16px Rokh');
    if (ok400 === null) { mark("unknown"); return; }
    mark(ok400 ? (ok900 ? "rokh" : "rokh-static") : "fallback");
  };
  try { if (DOC.fonts && DOC.fonts.ready) DOC.fonts.ready.then(decide).catch(() => mark("unknown")); else decide(); }
  catch (e) { mark("unknown"); }
  setTimeout(decide, 1600);
};

/* --- toasts --- */
UI.toast = function (title, msg, kind) {
  const stack = U.$("#toastStack");
  if (!stack) { return; }
  const t = U.el("div", { class: "toast glass" + (kind === "warn" ? " warn" : "") });
  const left = U.el("div", {}, [U.el("b", { text: title || "فطرس" }), msg ? U.el("p", { text: msg }) : null]);
  t.appendChild(left);
  const actions = U.el("div", { style: "display:flex;gap:6px;align-items:center" });
  const close = U.el("button", { class: "mini", "aria-label": "بستن", text: "×", onclick: () => kill() });
  actions.appendChild(close);
  t.appendChild(actions);
  stack.appendChild(t);
  let killed = false;
  function kill() { if (killed) return; killed = true; t.style.opacity = "0"; t.style.transform = "translateY(-6px)"; setTimeout(() => t.remove && t.remove(), 260); }
  if (kind === "sticky") return { el: t, actions, kill };
  setTimeout(kill, 4200);
  return { el: t, actions, kill };
};

/* --- bottom nav + view switching --- */
UI.initNav = function () {
  const inner = U.$("#navInner"), ind = U.$("#navIndicator");
  const btns = U.$$(".nav-btn");
  function move(btn) {
    if (!ind || !btn || !inner) return;
    const ir = inner.getBoundingClientRect(), br = btn.getBoundingClientRect();
    const w = br.width;
    ind.style.width = w + "px";
    const delta = (br.left - ir.left) - 6;
    // in RTL, translateX positive moves left visually; use raw px offset from container left
    ind.style.transform = "translateX(" + delta + "px)";
  }
  UI.setActive = function (view) {
    btns.forEach(b => { const on = b.dataset.view === view; b.classList.toggle("active", on); if (on) { b.setAttribute("aria-current", "page"); UI._activeBtn = b; } else b.removeAttribute("aria-current"); });
    U.$$(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + view));
    if (UI._activeBtn) move(UI._activeBtn);
    UI.state.view = view;
    U.lsSet("fetros.lastView", view);
    if (view === "calendar") VIEWS.calendar.render();
    if (view === "owqat") VIEWS.owqat.render();
    if (view === "tools") VIEWS.tools.show(UI.state.tool);
    if (view === "home") VIEWS.home.render();
    window.scrollTo({ top: 0, behavior: "auto" });
    UI.revealer && UI.revealer.scan();
  };
  btns.forEach(b => b.addEventListener("click", () => { UI.setActive(b.dataset.view); b.focus && b.focus({ preventScroll: true }); }));
  setTimeout(() => move(U.$(".nav-btn.active") || btns[0]), 60);
  window.addEventListener("resize", () => move(U.$(".nav-btn.active") || btns[0]), { passive: true });
};

/* --- FAB --- */
UI.initFab = function () {
  const fab = U.$("#fab"), main = U.$("#fabMain"), menu = U.$("#fabMenu");
  if (!fab || !main) return;
  U.clear(menu);
  (CFG.quickActions || []).forEach(a => {
    menu.appendChild(U.el("button", { class: "fab-item", role: "menuitem", onclick: () => { close(); if (TOOLS.quickAdd) TOOLS.quickAdd(a.id); } },
      [U.el("span", { text: a.icon || "•", "aria-hidden": "true" }), U.el("span", { text: a.label })]));
  });
  function open() { fab.classList.add("open"); main.setAttribute("aria-expanded", "true"); const f = menu.querySelector("button"); f && f.focus(); }
  function close() { fab.classList.remove("open"); main.setAttribute("aria-expanded", "false"); }
  main.addEventListener("click", () => fab.classList.contains("open") ? close() : open());
  DOC.addEventListener("click", (e) => { if (!fab.contains(e.target)) close(); }, true);
  DOC.addEventListener("keydown", (e) => { if (e.key === "Escape" && fab.classList.contains("open")) { close(); main.focus(); } });
};

/* --- sheets & dialogs with focus trap --- */
UI.sheet = {
  open(sel) {
    const s = typeof sel === "string" ? U.$(sel) : sel; if (!s) return;
    UI.focusStack = UI.focusStack || [];
    UI.focusStack.push(DOC.activeElement);
    s.classList.add("open"); s.setAttribute("aria-hidden", "false");
    const first = s.querySelector("input,select,textarea,button:not([data-close])");
    setTimeout(() => first && first.focus(), 60);
    s.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close") || e.target.closest("[data-close]")) UI.sheet.close(s); });
    s.dataset.trap = "1";
  },
  close(s) {
    s = typeof s === "string" ? U.$(s) : s; if (!s) return;
    s.classList.remove("open"); s.setAttribute("aria-hidden", "true");
    const prev = (UI.focusStack || []).pop(); prev && prev.focus && prev.focus({ preventScroll: true });
  },
  isOpen(s) { return s.classList.contains("open"); }
};
DOC && DOC.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const openDialog = U.$(".dialog.open"); if (openDialog) { UI.sheet.close(openDialog); return; }
  const openSheet = Array.prototype.slice.call(U.$$(".sheet.open")).pop(); if (openSheet) UI.sheet.close(openSheet);
  const fab = U.$("#fab"); if (fab && fab.classList.contains("open")) fab.classList.remove("open");
});
DOC && DOC.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const active = U.$(".dialog.open") || U.$(".sheet.open");
  if (!active) return;
  const items = Array.prototype.slice.call(active.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])')).filter(n => n.offsetParent !== null);
  if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && DOC.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && DOC.activeElement === last) { e.preventDefault(); first.focus(); }
});

UI.confirm = function (title, desc) {
  return new Promise(resolve => {
    const d = U.$("#confirmDialog"); U.$("#confirmTitle").textContent = title || "تأیید";
    U.$("#confirmDesc").textContent = desc || "";
    const ok = U.$("#confirmOk");
    const handler = () => { cleanup(); UI.sheet.close(d); resolve(true); };
    function cleanup() { ok.removeEventListener("click", handler); }
    ok.addEventListener("click", handler);
    d.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close") || e.target.closest("[data-close]")) { cleanup(); resolve(false); } });
    UI.sheet.open(d);
  });
};
UI.alert = function (title, msg) { return UI.confirm(title, msg).then(()=>{}); };

/* --- generic edit dialog builder --- */
UI.editDialog = function (opts) {
  const d = U.$("#editDialog"), body = U.$("#editBody");
  U.$("#editTitle").textContent = opts.title || "ویرایش";
  U.clear(body);
  const fields = [];
  (opts.fields || []).forEach(f => {
    const id = "fld_" + f.name;
    const label = U.el("label", { for: id }, [U.el("span", { class: "label", text: f.label })]);
    let input;
    if (f.type === "select") { input = U.el("select", { class: "select", id }); (f.options || []).forEach(o => input.appendChild(U.el("option", { value: o.value, text: o.label }))); input.value = f.value; }
    else if (f.type === "textarea") { input = U.el("textarea", { class: "textarea", id, placeholder: f.placeholder || "" }); input.value = f.value || ""; }
    else { input = U.el("input", { class: "input", id, type: f.type || "text", placeholder: f.placeholder || "" }); input.value = f.value || ""; if (f.maxlength) input.maxLength = f.maxlength; }
    fields.push({ name: f.name, el: input, field: f });
    body.appendChild(label); label.appendChild(input);
  });
  (opts.extra || []).forEach(n => body.appendChild(n));
  const save = U.$("#editSave");
  const clone = save.cloneNode(true); save.parentNode.replaceChild(clone, save);
  const doSave = () => {
    const data = {}; const errs = [];
    fields.forEach(x => { let v = (x.el.value || "").trim(); if (x.field.required && !v) errs.push(x.field.label); data[x.name] = v; });
    if (errs.length) { UI.toast("فیلدهای لازم", "لطفاً " + errs.join("، ") + " را پر کنید", "warn"); return; }
    UI.sheet.close(d); opts.onSave && opts.onSave(data);
  };
  clone.addEventListener("click", doSave);
  d.addEventListener("click", (e) => { if (e.target.hasAttribute("data-close") || e.target.closest("[data-close]")) UI.sheet.close(d); });
  UI.sheet.open(d);
};

/* --- reveal on scroll (IntersectionObserver, staggered) --- */
UI.revealer = (function () {
  let io = null;
  function init() {
    if (!("IntersectionObserver" in WIN)) { U.$$(".reveal").forEach(n => n.classList.add("in")); return; }
    io = new IntersectionObserver((entries) => {
      let i = 0;
      entries.forEach(en => { if (en.isIntersecting) { const d = Math.min(240, (i++) * 55); setTimeout(() => en.target.classList.add("in"), motionOK() ? d : 0); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    scan();
  }
  function scan() { U.$$(".reveal:not(.in)").forEach(n => io && io.observe(n)); }
  function motionOK() { return DOC.documentElement.dataset.motion !== "low" && !U.reducedMotion(); }
  return { init, scan };
})();

/* --- scroll-linked & pointer parallax (desktop, cheap) --- */
UI.initParallax = function () {
  if (!U.mq("(pointer:fine)").matches) return;      // desktop pointers only
  if (U.reducedMotion()) return;
  const sun = U.$(".hero-sun"); if (!sun) return;
  let raf = 0, tx = 0, ty = 0;
  DOC.addEventListener("pointermove", (e) => {
    if (DOC.documentElement.dataset.motion === "low") return;
    const cx = (e.clientX / WIN.innerWidth - .5), cy = (e.clientY / WIN.innerHeight - .5);
    tx = cx * 14; ty = cy * 10;
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; sun.style.transform = "translate3d(" + (-tx) + "px," + (-ty) + "px,0)"; });
  }, { passive: true });
};

/* --- theme / accent / motion / digits --- */
UI.applyTheme = function () {
  const d = SET.data, root = DOC.documentElement;
  root.dataset.theme = d.theme === "light" ? "light" : "dark";
  root.dataset.accent = d.accent || "gold";
  root.dataset.motion = d.motion || "medium";
  U.setDigits(d.persianDigits !== false);
  const meta = DOC.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", d.theme === "light" ? "#FFF8EA" : "#101114");
};

/* --- pause infinite animations when tab hidden (perf) --- */
UI.initVisibility = function () {
  DOC.addEventListener("visibilitychange", () => {
    const blobs = U.$$(".blob");
    if (DOC.hidden) blobs.forEach(b => b.style.animationPlayState = "paused");
    else blobs.forEach(b => b.style.animationPlayState = "running");
  });
};

/* --- agenda badge on the header bell: due/overdue things for today --- */
UI.paintAgendaBadge = function () {
  const dot = U.$("#notifyDot"); if (!dot) return;
  let n = 0;
  try {
    const today = new Date(); const iso = today.getFullYear() + "-" + U.pad2(today.getMonth() + 1) + "-" + U.pad2(today.getDate());
    n += (ORG.cache.tasks || []).filter(t => !t.done && t.due && t.due <= iso).length;
    n += (ORG.cache.reminders || []).filter(r => r.when && r.when - today.getTime() < 2 * 3600 * 1000 && r.when > today.getTime() - 6 * 3600 * 1000).length;
    if (SET.data.meds) {
      const hm = U.pad2(today.getHours()) + ":" + U.pad2(today.getMinutes());
      const logs = MEDS.logs || [];
      n += (MEDS.list || []).reduce((a, md) => a + ((md.times || []).filter(tm => {
        if (md.from && iso < md.from) return false; if (md.to && iso > md.to) return false;
        return tm <= hm && !logs.find(l => l.medId === md.id && l.date === iso && l.time === tm);
      }).length), 0);
    }
  } catch (e) { /* badge is decoration; never break the app */ }
  dot.textContent = n > 9 ? "9+" : U.num(n);
  dot.classList.toggle("hidden", n === 0);
  WIN.__fetrosAgendaCount = n;
};

/* --- live clock + status bar --- */
UI.clockTimer = null;
UI.startClock = function () {
  const clockEl = U.$("#heroClock"), statusTime = U.$("#statusTime");
  const loop = () => {
    const n = new Date();
    const s = U.num(U.pad2(n.getHours())) + ":" + U.num(U.pad2(n.getMinutes())) + ":" + U.num(U.pad2(n.getSeconds()));
    if (clockEl) clockEl.textContent = s;
    if (statusTime) statusTime.textContent = s;
  };
  loop(); clearInterval(UI.clockTimer); UI.clockTimer = setInterval(loop, 1000);
};
UI.setNetStatus = function (onlineHint) {
  const t = U.$("#statusText"), dot = U.$(".statusbar .dot");
  const on = (typeof onlineHint === "boolean") ? onlineHint : !!(WIN.navigator && WIN.navigator.onLine);
  if (t) t.textContent = on ? "آنلاین — همه‌چیز همگام است" : "آفلاین — محاسبات محلی فعال است";
  if (dot) { dot.style.background = on ? "#22c55e" : "#92949D"; dot.style.boxShadow = on ? "0 0 0 6px rgba(34,197,94,.15)" : "0 0 0 6px rgba(146,148,157,.15)"; }
};
/* ---------------------------------------------------------------
   MODULE 07 · views.home
   --------------------------------------------------------------- */
const VIEWS = {};
const APP = {};   // shared app state: today, times, etc.
APP.todayDayNo = () => CAL.todayDayNo();
APP.timesFor = function (dayNo, dateObj) {
  const city = SET.getCity();
  const d = dateObj || new Date();
  const tz = city.tz ? (CAL.timeZoneOffsetHours(d, city.tz) != null ? CAL.timeZoneOffsetHours(d, city.tz) : CAL.localTzOffsetHours(d)) : CAL.localTzOffsetHours(d);
  return PRAY.compute({ lat: city.lat, lng: city.lng, tz, date: d, method: SET.data.method, asr: SET.data.asr, adjust: SET.data.adjust || {}, polarRule: SET.data.polarRule || "none" });
};

VIEWS.home = {
  render() {
    const dayNo = APP.todayDayNo();
    const info = CAL.dateInfo(dayNo);
    const g = new Date();
    // hero
    const hero = U.$("#hero");
    if (!hero) return;
    const hour = g.getHours() + g.getMinutes() / 60;
    let period = "day";
    const t = VIEWS._times || {};
    const sr = t.sunrise, ss = t.sunset;
    if (sr != null && ss != null) {
      if (hour < sr - 0.6 || hour > ss + 0.7) period = "night";
      else if (hour < sr + 0.8) period = "dawn";
      else if (hour > ss - 1.1) period = "sunset";
      else period = "day";
    } else if (hour < 5 || hour > 20) period = "night";
    else if (hour < 7) period = "dawn";
    else if (hour > 17) period = "sunset";
    hero.dataset.period = period;
    const greet = (CFG.greetings || []).filter(x => hour >= x.from).pop();
    U.$("#heroGreet").textContent = greet ? greet.text : "سلام";
    U.$("#heroDate").textContent = CAL.fmtJal(Object.assign({ dow: info.dow }, info));
    U.$("#heroDateEquiv").textContent = CAL.fmtGreg(info) + " · " + CAL.fmtHijri(info.hijri);
    const city = SET.getCity();
    U.$("#heroCity").textContent = city.name;
    // occasions today
    const occ = OCC.forDayWithPersonal(dayNo);
    const occEl = U.$("#heroOccasion");
    if (occ.length) { occEl.style.display = ""; occEl.textContent = "📌 " + occ.map(o => o.title).slice(0, 2).join(" · "); occEl.className = "pill" + (occ.some(o => o.holiday) ? " pill-accent" : ""); }
    else { occEl.style.display = "none"; }
    // next prayer
    VIEWS.owqat.paintNext();
    // tasks summary
    ORG.renderHomeTasks();
    // quick note
    const qn = U.$("#quickNote"); if (qn && DOC.activeElement !== qn) qn.value = SET.data.quickNote || "";
    // next reminder
    ORG.renderHomeReminders();
    // mini calendar
    VIEWS.home.miniCal(info);
    // weather
    WEATHER.maybeRefresh();
  },
  miniCal(info) {
    const grid = U.$("#miniCal"), title = U.$("#miniCalTitle");
    if (!grid) return;
    U.clear(grid);
    const grid2 = CAL.jalMonthGrid(info.jy, info.jm);
    if (!grid2) return;
    CAL.DOW_SHORT.concat().forEach(() => {});
    // header row: Sat..Fri
    ["ش","ی","د","س","چ","پ","ج"].forEach(d => grid.appendChild(U.el("div", { class: "cal-dow", text: d })));
    grid2.cells.slice(0, 42).forEach(c => {
      const occ = OCC.forDayWithPersonal(c.dayNo);
      const cls = ["cal-cell"];
      if (!c.inMonth) cls.push("other");
      if (c.dayNo === info.dayNo) cls.push("today");
      if (occ.some(o => o.holiday)) cls.push("holiday");
      if (occ.length) cls.push("has-event");
      const cell = U.el("button", { class: cls.join(" "), "aria-label": U.num(c.jd) + " " + CAL.J_MONTHS[c.jm - 1], onclick: () => { VIEWS.calendar.select(c.dayNo); UI.setActive("calendar"); } },
        [U.el("span", { class: "j", text: U.num(c.jd) })]);
      grid.appendChild(cell);
    });
    title.textContent = CAL.J_MONTHS[info.jm - 1] + " " + U.num(info.jy) + " · " + CAL.G_MONTHS[info.gm - 1] + " " + U.num(info.gy);
  },
  tickCountdown() {
    const t = VIEWS._times; if (!t) return;
    const now = new Date();
    const info = PRAY.nextInfo(t, now);
    const cd = U.$("#countdown"), nameEl = U.$("#nextPrayerName"), timeEl = U.$("#nextPrayerTime"), bar = U.$("#prayerProgress"), heroPill = U.$("#heroNextPrayer");
    if (!cd) return;
    if (info.rollover) {
      nameEl.textContent = "اذان صبح فردا";
      timeEl.textContent = PRAY.toClock(t.fajr);
      cd.setAttribute("aria-label", "تا اذان صبح فردا");
      U.$("#homePrayerNote") && (U.$("#homePrayerNote").textContent = "بعد از عشاء: شمارش معکوس تا اذان صبح فردا.");
    } else {
      nameEl.textContent = info.next.fa;
      timeEl.textContent = PRAY.toClock(t[info.next.key]);
      cd.setAttribute("aria-label", "زمان باقی‌مانده تا " + info.next.fa);
    }
    let target = info.targetSec;
    if (target == null) {
      const fsec = PRAY.hoursToSecFromMidnight(t.fajr);
      target = (fsec == null ? info.secNow : fsec) + 86400;
    }
    let left = Math.max(0, target - info.secNow);
    const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = Math.floor(left % 60);
    const boxes = [["ساعت", h], ["دقیقه", m], ["ثانیه", s]];
    if (cd.children.length !== boxes.length) { U.clear(cd); boxes.forEach(() => cd.appendChild(U.el("div", { class: "cd-box" }, [U.el("div", { class: "cd-num tabular" }), U.el("div", { class: "cd-label" })]))); }
    boxes.forEach((b, i) => {
      const box = cd.children[i], numEl = box.querySelector(".cd-num"), labEl = box.querySelector(".cd-label");
      const txt = U.num(U.pad2(b[1]));
      if (numEl.textContent !== txt) { numEl.textContent = txt; numEl.classList.remove("cd-tick"); void numEl.offsetWidth; numEl.classList.add("cd-tick"); }
      labEl.textContent = b[0];
    });
    // progress since previous named time
    const prev = VIEWS._prevTimeSec(t, info);
    if (bar) { const span = Math.max(1, target - prev); bar.style.width = U.clamp((1 - left / span) * 100, 0, 100) + "%"; }
    if (heroPill) { heroPill.style.display = ""; heroPill.textContent = (info.rollover ? "صبح فردا " : info.next.fa + " ") + (info.rollover ? PRAY.toClock(t.fajr) : PRAY.hoursToHM(left)); }
  }
};
PRAY.hoursToHM = function (sec) { const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60); return U.num(U.pad2(h)) + ":" + U.num(U.pad2(m)); };
VIEWS._prevTimeSec = function (t, info) {
  const seq = PRAY.NAMES.filter(n => t[n.key] != null);
  let prev = null;
  for (const n of seq) { const s = PRAY.hoursToSecFromMidnight(t[n.key]); if (s <= info.secNow) prev = s; }
  if (prev == null) prev = info.targetSec - 3600;
  return prev;
};

/* ---------------------------------------------------------------
   MODULE 08 · views.calendar — ماه‌نگر، مبدل، جستجوی مناسبت
   --------------------------------------------------------------- */
VIEWS.calendar = {
  init() {
    const dows = U.$("#calDows");
    if (dows) { U.clear(dows); ["ش","ی","د","س","چ","پ","ج"].forEach(d => dows.appendChild(U.el("div", { class: "cal-dow", text: d }))); }
    const info = CAL.dateInfo(APP.todayDayNo());
    UI.state.calMonth = { jy: info.jy, jm: info.jm };
    UI.state.selectedDay = info.dayNo;
    const prev = U.$("#calPrev"), next = U.$("#calNext");
    prev && prev.addEventListener("click", () => VIEWS.calendar.step(-1));
    next && next.addEventListener("click", () => VIEWS.calendar.step(1));
    U.$("#calPrevBtn") && U.$("#calPrevBtn").addEventListener("click", () => VIEWS.calendar.step(-1));
    U.$("#calNextBtn") && U.$("#calNextBtn").addEventListener("click", () => VIEWS.calendar.step(1));
    U.$("#calToday") && U.$("#calToday").addEventListener("click", () => VIEWS.calendar.goToday());
    U.$("#btnHomeCalToday") && U.$("#btnHomeCalToday").addEventListener("click", () => { VIEWS.calendar.goToday(); UI.setActive("calendar"); });
    // swipe
    const grid = U.$("#calGrid");
    if (grid) {
      let x0 = 0, y0 = 0, t0 = 0;
      grid.addEventListener("touchstart", (e) => { const t = e.touches[0]; x0 = t.clientX; y0 = t.clientY; t0 = Date.now(); }, { passive: true });
      grid.addEventListener("touchend", (e) => {
        const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
        if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy) * 1.4 && (Date.now() - t0) < 700) VIEWS.calendar.step(dx < 0 ? 1 : -1);
      }, { passive: true });
    }
    // converter
    ["convJ", "convG", "convH"].forEach(id => { const n = U.$("#" + id); n && n.addEventListener("change", () => VIEWS.calendar.convert(id)); n && n.addEventListener("keydown", (e) => { if (e.key === "Enter") VIEWS.calendar.convert(id); }); });
    U.$("#btnConvToday") && U.$("#btnConvToday").addEventListener("click", () => VIEWS.calendar.fillToday());
    // occasion search
    const s = U.$("#occSearch"); s && s.addEventListener("input", U.throttle(() => VIEWS.calendar.renderOccasions(s.value), 200));
    U.$("#convHelp") && (U.$("#convHelp").textContent = "تبدیل سه‌گانه. " + (NOTE.hijriDisclaimer || ""));
  },
  step(dir) {
    const m = UI.state.calMonth;
    let jm = m.jm + dir, jy = m.jy;
    if (jm > 12) { jm = 1; jy++; } if (jm < 1) { jm = 12; jy--; }
    try { CAL.jalaaliMonthLength(jy, jm); } catch (e) { return; }
    m.jy = jy; m.jm = jm;
    const grid = U.$("#calGrid");
    if (grid) { grid.style.opacity = "0"; grid.style.transform = "translateX(" + (dir > 0 ? "-10px" : "10px") + ")"; }
    setTimeout(() => { VIEWS.calendar.render(); if (grid) { grid.style.opacity = "1"; grid.style.transform = "none"; } }, DOC.documentElement.dataset.motion === "low" ? 0 : 130);
  },
  goToday() { const info = CAL.dateInfo(APP.todayDayNo()); UI.state.calMonth = { jy: info.jy, jm: info.jm }; UI.state.selectedDay = info.dayNo; VIEWS.calendar.render(); VIEWS.calendar.renderDetail(); },
  select(dayNo) { UI.state.selectedDay = dayNo; const info = CAL.dateInfo(dayNo); if (info.jy !== UI.state.calMonth.jy || info.jm !== UI.state.calMonth.jm) UI.state.calMonth = { jy: info.jy, jm: info.jm }; VIEWS.calendar.render(); VIEWS.calendar.renderDetail(); },
  render() {
    const m = UI.state.calMonth; if (!m) return;
    const g = CAL.jalToGreg(m.jy, m.jm, 1);
    const dayNo = g ? CAL.dayFromGreg(g.gy, g.gm, g.gd) : null;
    const h = dayNo != null ? CAL.dayToHijri(dayNo) : null;
    U.$("#calMonthJ").textContent = CAL.J_MONTHS[m.jm - 1] + " " + U.num(m.jy);
    U.$("#calMonthG").textContent = (g ? CAL.G_MONTHS[g.gm - 1] + " " + U.num(g.gy) : "—");
    U.$("#calHijriMonth").textContent = h ? (CAL.H_MONTHS[h.hm - 1] + " " + U.num(h.hy)) : "—";
    const grid = U.$("#calGrid"); U.clear(grid);
    const gm = CAL.jalMonthGrid(m.jy, m.jm);
    if (!gm) { grid.appendChild(U.el("div", { class: "empty", text: "سال خارج از بازهٔ پشتیبانی الگوریتم است (۱۲۱۰ تا ۳۱۷۷)." })); return; }
    const today = APP.todayDayNo();
    gm.cells.forEach(c => {
      const occ = OCC.forDayWithPersonal(c.dayNo);
      const cls = ["cal-cell"];
      if (!c.inMonth) cls.push("other");
      if (c.dayNo === today) cls.push("today");
      if (c.dayNo === UI.state.selectedDay) cls.push("selected");
      if (occ.some(o => o.holiday)) cls.push("holiday");
      if (occ.length) cls.push("has-event");
      const btn = U.el("button", { class: cls.join(" "), "aria-label": U.num(c.jd) + " " + CAL.J_MONTHS[c.jm - 1] + " " + U.num(c.jy) + (occ.length ? " — " + occ.map(o => o.title).join("، ") : ""), "aria-current": c.dayNo === today ? "date" : null,
        onclick: () => { UI.state.selectedDay = c.dayNo; VIEWS.calendar.render(); VIEWS.calendar.renderDetail(); } },
        [U.el("span", { class: "j", text: U.num(c.jd) }), U.el("span", { class: "g", text: U.num(c.gd) })]);
      grid.appendChild(btn);
    });
    const legend = U.$("#calLegend");
    if (legend) { U.clear(legend);
      [["#F5C451", "امروز"], ["#FF8FA3", "تعطیل رسمی"], ["#FF7A35", "رویداد/مناسبت"], ["rgba(255,255,255,.5)", "یادداشت شخصی"]]
        .forEach(([c, txt]) => legend.appendChild(U.el("span", { class: "muted" }, [U.el("i", { class: "legend-dot", style: "background:" + c }), U.el("span", { text: txt })])));
      legend.appendChild(U.el("span", { class: "muted", text: "· " + (NOTE.occasionsSample || "") }));
    }
    VIEWS.calendar.renderDetail();
    VIEWS.calendar.renderOccasions(U.$("#occSearch") ? U.$("#occSearch").value : "");
  },
  renderDetail() {
    const dayNo = UI.state.selectedDay; if (dayNo == null) return;
    const info = CAL.dateInfo(dayNo);
    U.$("#calDetailTitle").textContent = CAL.fmtJal(Object.assign({ dow: info.dow }, info));
    U.$("#calDetailDate").textContent = CAL.fmtGreg(info) + " · " + CAL.fmtHijri(info.hijri) + " · " + (CAL.isJalaaliLeap(info.jy) ? "سال کبیسه (اسفند ۳۰ روزه)" : "سال کبیسه نیست");
    const list = U.$("#calDetailOccasions"); U.clear(list);
    // personal events (tasks/reminders/birthdays) on this day
    const items = OCC.forDay(dayNo).slice();
    ORG.personalForDay(dayNo).forEach(p => items.push(p));
    if (!items.length) { list.appendChild(U.el("div", { class: "empty", text: "برای این روز رویدادی ثبت نشده. می‌توانید از دکمهٔ + یادآور یا کار بیفزایید." })); return; }
    items.forEach(o => {
      const badge = o.holiday ? "تعطیل رسمی" : (o.type === "personal" ? "شخصی" : (o.type === "religious" ? "مذهبی" : "مناسبت"));
      const color = o.holiday ? "#FF8FA3" : (o.type === "personal" ? "rgba(255,255,255,.6)" : "#FF7A35");
      list.appendChild(U.el("div", { class: "item" }, [
        U.el("span", { class: "legend-dot", style: "background:" + color + ";margin-top:7px" }),
        U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: o.title }), o.description ? U.el("div", { class: "item-meta" }, [U.el("span", { text: o.description })]) : null]),
        U.el("span", { class: "badge-soft", text: badge })
      ]));
    });
  },
  renderOccasions(q) {
    const el = U.$("#occList"); if (!el) return;
    U.clear(el);
    const items = OCC.search(q);
    if (!items.length) { el.appendChild(U.el("div", { class: "empty", text: "موردی پیدا نشد. عبارت دیگری را امتحان کنید." })); return; }
    items.forEach(o => {
      const dateStr = o.jMonth ? (U.num(o.jDay) + " " + CAL.J_MONTHS[o.jMonth - 1]) : (o.hMonth ? (U.num(o.hDay) + " " + CAL.H_MONTHS[o.hMonth - 1] + " (قمری)") : (U.num(o.gDay) + " " + CAL.G_MONTHS[o.gMonth - 1] + " (میلادی)"));
      el.appendChild(U.el("div", { class: "item" }, [
        U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: o.title }), U.el("div", { class: "item-meta" }, [U.el("span", { text: dateStr }), o.holiday ? U.el("span", { class: "badge-soft", text: "تعطیل" }) : null])]),
        o.holiday ? U.el("span", { class: "legend-dot", style: "background:#FF8FA3" }) : null
      ]));
    });
  },
  fillToday() {
    const info = CAL.dateInfo(APP.todayDayNo());
    U.$("#convJ").value = info.jy + "/" + U.pad2(info.jm) + "/" + U.pad2(info.jd);
    VIEWS.calendar.convert("convJ");
  },
  parseFa(v) { return String(v || "").replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)); },
  convert(who) {
    const val = (id) => VIEWS.calendar.parseFa(U.$("#" + id).value).trim();
    const help = U.$("#convHelp");
    let info = null, err = "", j = null, L = 0;
    try {
      if (who === "convJ") {
        const m = val("convJ").split(/[\/\-\.،\s]+/).filter(Boolean); if (m.length !== 3) throw 0;
        j = { jy: +m[0], jm: +m[1], jd: +m[2] };
        if (j.jy < 1210 || j.jy > 3177) throw "range";
        if (!(j.jm >= 1 && j.jm <= 12)) throw "badmonth";
        L = CAL.jalaaliMonthLength(j.jy, j.jm);
        if (!(j.jd >= 1 && j.jd <= L)) throw (j.jm === 12 && j.jd === 30 && L === 29) ? "noEsfand30" : "badday:" + L;
        const g = CAL.jalToGreg(j.jy, j.jm, j.jd); if (!g) throw "bad";
        info = { dayNo: CAL.dayFromGreg(g.gy, g.gm, g.gd) };
      }
      else if (who === "convG") { const m = val("convG").split(/[\/\-\.]+/).filter(Boolean); if (m.length !== 3) throw 0; const g = { gy: +m[0], gm: +m[1], gd: +m[2] }; if (g.gy < 1800 || g.gy > 2200) throw "range"; const dn = CAL.dayFromGreg(g.gy, g.gm, g.gd); if (isNaN(dn)) throw "bad"; info = { dayNo: dn }; }
      else {
        const m = val("convH").split(/[\/\-\.،\s]+/).filter(Boolean); if (m.length !== 3) throw 0;
        const h = { hy: +m[0], hm: +m[1], hd: +m[2] };
        if (!h.hy || h.hy < 1 || h.hy > 1700) throw "range";
        if (!(h.hm >= 1 && h.hm <= 12)) throw "badmonth";
        L = CAL.hijriMonthLength(h.hy, h.hm);
        if (!(h.hd >= 1 && h.hd <= L)) throw "badday:" + L;
        const dn = CAL.hijriToDay(h.hy, h.hm, h.hd); if (dn == null) throw "bad";
        info = { dayNo: dn };
      }
    } catch (e) {
      err = e === "range" ? "سال خارج از بازهٔ پشتیبانی الگوریتم است (شمسی ۱۲۱۰ تا ۳۱۷۷)."
        : e === "noEsfand30" ? "۳۰ اسفند فقط در سال کبیسه وجود دارد؛ " + U.num(j.jy) + " کبیسه نیست (اسفند " + U.num(L) + " روزه)."
        : (typeof e === "string" && e.indexOf("badday:") === 0) ? "روز واردشده بیشتر از طول ماه است (این ماه " + U.num(e.slice(7)) + " روزه است)."
        : e === "badmonth" ? "شمارهٔ ماه باید بین ۱ تا ۱۲ باشد."
        : "قالب تاریخ درست نیست. مثال: ۱۴۰۴/۰۷/۲۷";
    }
    if (err) { help.textContent = "⚠ " + err; help.style.color = "#FF8FA3"; return; }
    help.style.color = "";
    const i = CAL.dateInfo(info.dayNo);
    if (who !== "convJ") U.$("#convJ").value = U.num(i.jy + "/" + U.pad2(i.jm) + "/" + U.pad2(i.jd));
    if (who !== "convG") U.$("#convG").value = i.gy + "-" + U.pad2(i.gm) + "-" + U.pad2(i.gd);
    if (who !== "convH") U.$("#convH").value = U.num(i.hijri.hy + "/" + U.pad2(i.hijri.hm) + "/" + U.pad2(i.hijri.hd));
    if (who === "convH") {
      const back = CAL.hijriToDay(i.hijri.hy, i.hijri.hm, i.hijri.hd);
      if (back !== i.dayNo) { help.textContent = "⚠ این روز در ماه قمری وجود ندارد؛ تاریخ به «" + CAL.fmtHijri({hy:i.hijri.hy,hm:i.hijri.hm,hd:i.hijri.mlen}) + "» تنظیم شد."; help.style.color = "#F5C451"; i.hijri.hd = i.hijri.mlen; }
    }
    UI.state.selectedDay = i.dayNo; UI.state.calMonth = { jy: i.jy, jm: i.jm };
    VIEWS.calendar.render();
  }
};

/* ---------------------------------------------------------------
   MODULE 09 · views.owqat — اوقات، تنظیمات، شهر، اعلان/اذان، قبله‌نما
   --------------------------------------------------------------- */
VIEWS.owqat = {
  init() {
    const cs = U.$("#citySelect");
    if (cs) { U.clear(cs); (CFG.cities || []).forEach(c => cs.appendChild(U.el("option", { value: c.id, text: c.name }))); cs.value = SET.data.city; cs.addEventListener("change", () => { SET.data.city = cs.value; SET.data.geo = null; SET.save(); VIEWS.owqat.render(); UI.setNetStatus(); VIEWS.home.render(); }); }
    const ms = U.$("#methodSelect");
    if (ms) { ms.value = SET.data.method; ms.addEventListener("change", () => { SET.data.method = ms.value; SET.save(); VIEWS.owqat.render(); VIEWS.home.render(); }); }
    const as = U.$("#asrSelect"); if (as) { as.value = SET.data.asr; as.addEventListener("change", () => { SET.data.asr = as.value; SET.save(); VIEWS.owqat.render(); VIEWS.home.render(); }); }
    U.$("#btnLocate") && U.$("#btnLocate").addEventListener("click", () => GEO.locate(true));
    U.$("#btnOwqatSettings") && U.$("#btnOwqatSettings").addEventListener("click", () => VIEWS.owqat.openAdjust());
    U.$("#btnSaveOwqatAdjusts") && U.$("#btnSaveOwqatAdjusts").addEventListener("click", () => VIEWS.owqat.saveAdjust());
    U.$("#btnGotoOwqat") && U.$("#btnGotoOwqat").addEventListener("click", () => UI.setActive("owqat"));
    U.$("#btnTestNotif") && U.$("#btnTestNotif").addEventListener("click", () => NOTIFY.test());
    U.$("#btnTestAzan") && U.$("#btnTestAzan").addEventListener("click", () => NOTIFY.playAzan(true));
    const ne = U.$("#notifEnable"); if (ne) { ne.checked = !!SET.data.notifications; ne.addEventListener("change", () => NOTIFY.request(ne.checked)); }
    const ae = U.$("#azanEnable"); if (ae) { ae.checked = !!SET.data.azan; ae.addEventListener("change", () => { SET.data.azan = ae.checked; SET.save(); UI.toast("اذان", ae.checked ? "پخش اذان روشن شد (نیاز به فایل audio/azan.mp3)" : "پخش اذان خاموش شد"); }); }
    // chip visuals for checkboxes
    U.$$(".chip input[type=checkbox]").forEach(cb => { const sync = () => cb.closest(".chip").classList.toggle("active", cb.checked); cb.addEventListener("change", sync); sync(); });
    QIBLA_UI.init();
  },
  openAdjust() {
    const box = U.$("#owqatAdjusts"); U.clear(box);
    box.appendChild(U.el("div", { class: "small muted", text: "مقدار بر حسب دقیقه. مثبت = دیرتر، منفی = زودتر. (۰ تا ±۳۰)" }));
    const rows = [];
    PRAY.NAMES.forEach(n => {
      const inp = U.el("input", { class: "input tabular", type: "number", min: "-30", max: "30", step: "1", value: String((SET.data.adjust && SET.data.adjust[n.key]) || 0) });
      rows.push([n.key, inp]);
      box.appendChild(U.el("div", { class: "row" }, [U.el("span", { class: "title", style: "margin:0", text: n.icon + " " + n.fa }), inp]));
    });
    const pol = U.el("select", { class: "select" });
    [["none","بدون قاعده (خالی بماند)"],["seventh","یک‌هفتم شب"],["midnight","نیمهٔ شب"]]
      .forEach(([v, l]) => pol.appendChild(U.el("option", { value: v, text: l })));
    pol.value = SET.data.polarRule || "none";
    box.appendChild(U.el("div", { class: "row mt8" }, [U.el("span", { class: "title", style: "margin:0", text: "قاعدهٔ عرض جغرافیایی بالا" }), pol]));
    box.dataset.hasPolar = "1"; box._polar = pol; box._rows = rows;
    UI.sheet.open("#sheetOwqat");
  },
  saveAdjust() {
    const box = U.$("#owqatAdjusts"); const adj = {};
    (box._rows || []).forEach(([k, inp]) => { const v = Math.round(+inp.value || 0); if (v) adj[k] = U.clamp(v, -30, 30); });
    SET.data.adjust = adj;
    if (box._polar) SET.data.polarRule = box._polar.value;
    SET.save(); UI.sheet.close("#sheetOwqat");
    VIEWS.owqat.render(); VIEWS.home.render();
    UI.toast("ذخیره شد", "تنظیمات اوقات به‌روز شد");
  },
  render() {
    const city = SET.getCity();
    const now = new Date();
    const t = APP.timesFor(null, now); VIEWS._times = t;
    const list = U.$("#prayerList"); if (!list) return;
    U.clear(list);
    const info = PRAY.nextInfo(t, now);
    PRAY.NAMES.forEach(n => {
      const isNext = !info.rollover && info.next.key === n.key;
      const row = U.el("div", { class: "prayer-row" + (isNext ? " next" : "") }, [
        U.el("div", {}, [U.el("div", { class: "name", text: n.icon + " " + n.fa }), U.el("div", { class: "sub", text: isNext ? "نماز بعدی" : (n.noCount ? "—not a prayer" : "") })]),
        U.el("div", { class: "time", text: PRAY.toClock(t[n.key]) })
      ]);
      if (n.noCount) row.querySelector(".sub").textContent = (n.key === "sunrise" ? "پایان وقت صبح" : "مغرب شرعی ≈ همین زمان");
      row.querySelector(".sub").textContent = isNext ? "نماز بعدی — " + (t.meta && t.meta.polarDegraded ? "با قاعدهٔ عرض بالا" : "محاسبهٔ نجومی") : row.querySelector(".sub").textContent;
      const adjV = (SET.data.adjust && SET.data.adjust[n.key]);
      if (adjV) { const badge = U.el("span", { class: "badge-soft", text: (adjV > 0 ? "+" : "") + U.num(adjV) + "′" }); row.querySelector(".name").appendChild(badge); }
      list.appendChild(row);
    });
    if (t.midnight != null) list.appendChild(U.el("div", { class: "prayer-row", style: "opacity:.85" }, [U.el("div", {}, [U.el("div", { class: "name", text: "🌌 نیمهٔ شب شرعی" }), U.el("div", { class: "sub", text: "وسط غروب تا طلوع" })]), U.el("div", { class: "time", text: PRAY.toClock(t.midnight) })]));
    U.$("#owqatCityLine").textContent = city.name + " · " + U.num(city.lat.toFixed(4)) + "، " + U.num(city.lng.toFixed(4)) + (SET.data.geo ? " (مکان‌نما)" : " (از فهرست شهرها)") + " · منطقهٔ زمانی " + (city.tz || "گوشی شما");
    const line2 = U.$("#owqatDisclaimer");
    if (line2) {
      const mm = PRAY.METHODS[SET.data.method] || {};
      const dg = t.meta ? (U.num((t.meta.decl >= 0 ? "+" : "−") + Math.abs(t.meta.decl).toFixed(2)) + "°") : "—";
      const eo = t.meta ? (U.num((t.meta.eot >= 0 ? "+" : "−") + Math.abs(t.meta.eot).toFixed(1)) + " دقیقه") : "—";
      line2.textContent = "روش: " + (mm.label || SET.data.method) + " · فجر " + U.num(mm.fajr || "—") + "° · عشاء " + (mm.ishaMin ? (U.num(mm.ishaMin) + " دقیقه پس از مغرب") : (U.num(mm.isha || "—") + "°")) +
        " · عصر: " + (SET.data.asr === "Hanafi" ? "حنفی (سایه ۲)" : "استاندارد (سایه ۱)") + " · میل خورشیدی " + dg + " · معادلهٔ زمان " + eo +
        (t.meta && t.meta.polarApplied ? " · ⚠ فجر/عشاء با قاعدهٔ «" + (SET.data.polarRule === "midnight" ? "نیمهٔ شب" : "یک‌هفتم شب") + "» محاسبه شد (زاویهٔ تعریف‌شده در این عرض رخ نمی‌دهد)" : "") +
        (t.meta && t.meta.polarDegraded ? " · ⚠ بعضی زمان‌ها قابل محاسبه نیستند؛ ساختگی نمایش داده نشده." : "") + ". " + (NOTE.prayerDisclaimer || "");
    }
    // city pill on home
    U.$("#heroCity") && (U.$("#heroCity").textContent = city.name);
    QIBLA_UI.updateLocation(city);
    VIEWS.home.tickCountdown();
    NOTIFY.resetDay(t);
  },
  paintNext() {
    const t = VIEWS._times; if (!t) return;
    const now = new Date();
    const info = PRAY.nextInfo(t, now);
    const el = U.$("#nextPrayerName"); if (!el) return;
    VIEWS.home.tickCountdown();
  }
};

/* ---------------------------------------------------------------
   MODULE 10 · geo — مکان‌نما با اجازهٔ صریح
   --------------------------------------------------------------- */
const GEO = {};
GEO.locate = function (explicit) {
  if (!WIN.navigator.geolocation) { UI.toast("مکان‌نما", "مرورگر شما Geolocation را پشتیبانی نمی‌کند؛ شهری را از فهرست انتخاب کنید.", "warn"); return; }
  if (explicit) UI.toast("مکان‌نما", "درخواست دسترسی مکان…");
  WIN.navigator.geolocation.getCurrentPosition(pos => {
    const c = pos.coords;
    SET.data.geo = { lat: +c.latitude.toFixed(4), lng: +c.longitude.toFixed(4), tz: Intl.DateTimeFormat().resolvedOptions().timeZone, accuracy: Math.round(c.accuracy || 0) };
    SET.save();
    VIEWS.owqat.render(); VIEWS.home.render();
    UI.toast("مکان پیدا شد", "دقت تقریبی: " + U.num(SET.data.geo.accuracy) + " متر — فقط برای محاسبهٔ محلی استفاده شد");
  }, err => {
    SET.data.geo = null; SET.save();
    VIEWS.owqat.render();
    const msg = { 1: "اجازهٔ دسترسی داده نشد — از فهرست شهر استفاده می‌شود.", 2: "مکان در دسترس نیست (GPS/Wi‑Fi).", 3: "زمان پاسخ‌دهی تمام شد؛ دوباره تلاش کنید." }[err.code] || "خطا در مکان‌یابی";
    UI.toast("مکان‌نما", msg, "warn");
  }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 });
};

/* ---------------------------------------------------------------
   MODULE 11 · notify — اعلان و اذان (فقط در پیش‌زمینه قابل تضمین)
   --------------------------------------------------------------- */
const NOTIFY = {};
NOTIFY.lastFired = {}; NOTIFY.perm = "default";
NOTIFY.available = () => ("Notification" in WIN);
NOTIFY.request = async function (want) {
  if (!NOTIFY.available()) { SET.data.notifications = false; SET.save(); UI.toast("اعلان", "این محیط از Notification API پشتیبانی نمی‌کند؛ یادآوری‌ها درون برنامه نشان داده می‌شوند. (در APK برای اعلان مطمئن به افزونهٔ بومی نیاز است)", "warn"); return; }
  if (!want) { SET.data.notifications = false; SET.save(); UI.toast("اعلان", "اعلان‌ها خاموش شد"); return; }
  let p = Notification.permission;
  if (p === "default") { try { p = await Notification.requestPermission(); } catch (e) { p = "denied"; } }
  NOTIFY.perm = p;
  SET.data.notifications = (p === "granted"); SET.save();
  UI.toast("اعلان", p === "granted" ? "اعلان‌ها روشن شد. یادآوری‌ها و اذان فقط وقتی برنامه باز است guaranteed کار می‌کنند." : "اجازهٔ اعلان داده نشد؛ یادآوری درون‌برنامه‌ای فعال است.", p === "granted" ? "ok" : "warn");
};
NOTIFY.show = function (title, body) {
  if (!NOTIFY.available() || Notification.permission !== "granted") { UI.toast(title, body); return; }
  try { const n = new Notification(title, { body: body, icon: "icons/icon-192.png", badge: "icons/icon-192.png", tag: "fetros", lang: "fa", dir: "rtl" }); setTimeout(() => { try { n.close(); } catch (e) {} }, 15000); n.onclick = () => { try { WIN.focus(); } catch (e) {} }; }
  catch (e) { UI.toast(title, body); }
};
NOTIFY.test = function () { if (!NOTIFY.available()) return UI.toast("تست", "Notification API در این مرورگر نیست", "warn"); NOTIFY.perm = Notification.permission; if (NOTIFY.perm === "granted") NOTIFY.show("فطرس", "تست اعلان موفق بود ✅"); else NOTIFY.request(true); };
/* optional local audio: probed at runtime so a missing file never 404s or errors */
const SND = { files: { azan: "audio/azan.mp3", tick: "audio/tick.mp3" }, ok: {} };
SND.init = function () {
  Object.keys(SND.files).forEach(key => {
    const url = SND.files[key];
    let done = false;
    const settle = (avail) => { if (done) return; done = true; SND.ok[key] = avail; if (avail) { const a = SND.el(key); if (a) { a.src = url; try { a.load(); } catch (e) {} } } SND.paint(); };
    try {
      const ctrl = new AbortController();
      const to = setTimeout(() => { try { ctrl.abort(); } catch (e) {} settle(false); }, 2500);
      fetch(url, { method: "GET", cache: "no-store", signal: ctrl.signal }).then(r => { clearTimeout(to); settle(!!(r && r.ok)); }).catch(() => { clearTimeout(to); settle(false); });
    } catch (e) { settle(false); }
  });
  const az = U.$("#azanEnable");
  if (az && !SET.data.azan) az.closest(".chip").setAttribute("title", "برای پخش اذان، فایل audio/azan.mp3 را اضافه کنید");
};
SND.el = (key) => U$(key === "azan" ? "#azanAudio" : "#tickAudio");
SND.paint = function () {
  const st = U.$("#audioState"); if (!st) return;
  const a = SND.ok.azan === undefined ? "…" : (SND.ok.azan ? "✓" : "✗");
  const t = SND.ok.tick === undefined ? "…" : (SND.ok.tick ? "✓" : "✗");
  st.textContent = "فایل‌های صوتی: اذان " + a + " · تیک " + t + (SND.ok.azan ? "" : " — (اختیاری؛ بدون فایل، برنامه بی‌صدا کار می‌کند. راهنمای پوشهٔ audio/ در README)");
};
NOTIFY.playAzan = function (force) {
  const a = SND.el("azan");
  if (!a || !SND.ok.azan) { if (force) UI.toast("اذان", "فایل audio/azan.mp3 پیدا نشد. آن را در پوشهٔ audio/ بگذارید (راهنما در README).", "warn"); return; }
  if (!force && !SET.data.azan) return;
  a.volume = 1; try { a.currentTime = 0; } catch (e) {}
  const p = a.play();
  if (p && p.catch) p.catch(() => UI.toast("پخش اذان", "پخش خودکار مسدود است؛ یک بار روی صفحه بزنید یا از «تست صدا» استفاده کنید.", "warn"));
  else if (force) UI.toast("اذان", "پخش شد ✓");
};
NOTIFY.resetDay = function (t) { const k = new Date().toDateString(); if (NOTIFY._day !== k) { NOTIFY._day = k; NOTIFY.lastFired = {}; } };
NOTIFY.tick = function () {
  const t = VIEWS._times; if (!t) return;
  NOTIFY.resetDay(t);
  const now = new Date(); const hm = now.getHours() * 60 + now.getMinutes();
  PRAY.NAMES.forEach(n => {
    const v = t[n.key]; if (v == null || n.noCount) return;
    const target = Math.round(v * 60);
    if (hm === target && !NOTIFY.lastFired[n.key]) {
      NOTIFY.lastFired[n.key] = 1;
      NOTIFY.show("فطرس · " + n.fa, "اکنون " + n.fa + " (" + PRAY.toClock(v) + ")");
      NOTIFY.playAzan(false);
      VIEWS.owqat.render();
    }
  });
};

/* ---------------------------------------------------------------
   MODULE 12 · qibla UI — قطب‌نما با حسگر + حالت بدون حسگر
   --------------------------------------------------------------- */
const QIBLA_UI = {
  sensorOK: false, listener: null, smooth: null, bearing: 0,
  init() {
    U.$("#btnCompassStart") && U.$("#btnCompassStart").addEventListener("click", () => QIBLA_UI.start());
    U.$("#btnCompassManual") && U.$("#btnCompassManual").addEventListener("click", () => { const n = U.$("#manualCoords"); n.classList.toggle("hidden"); if (!n.classList.contains("hidden")) U.$("#latInput").focus(); });
    ["latInput", "lonInput"].forEach(id => U.$("#" + id) && U.$("#" + id).addEventListener("change", () => QIBLA_UI.manual()));
    QIBLA_UI.smooth = QIBLA.filter(0.22);
  },
  manual() {
    const lat = parseFloat(U.$("#latInput").value), lng = parseFloat(U.$("#lonInput").value);
    if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) { UI.toast("مختصات", "عرض/طول جغرافیایی را درست وارد کنید", "warn"); return; }
    SET.data.geo = { lat: +lat.toFixed(4), lng: +lng.toFixed(4), tz: Intl.DateTimeFormat().resolvedOptions().timeZone, accuracy: null, manual: true };
    SET.save(); VIEWS.owqat.render(); VIEWS.home.render();
    UI.toast("مختصات ثبت شد", "قبله: " + U.num(Math.round(QIBLA.bearing(lat, lng))) + "° از شمال جغرافیایی");
  },
  updateLocation(city) {
    const b = QIBLA.bearing(city.lat, city.lng); QIBLA_UI.bearing = b;
    const dist = QIBLA.distanceKm(city.lat, city.lng);
    const degEl = U.$("#qiblaDeg"); if (degEl) degEl.textContent = U.num(b.toFixed(1)) + "°";
    const cd = U.$("#compassDeg"); if (cd) cd.textContent = U.num(Math.round(dist)) + " km";
    const mk = U.$("#qiblaMarker");
    if (mk) { mk.style.transformOrigin = "50% 50%"; mk.style.top = "50%"; mk.style.left = "50%"; mk.style.height = "50%"; mk.style.background = "linear-gradient(180deg, rgba(34,197,94,0) 0%, #22c55e 60%)"; mk.style.transform = "translate(-50%,-100%) rotate(" + b + "deg)"; }
    if (!QIBLA_UI.sensorOK) { const nd = U.$("#compassNeedle"); if (nd) nd.style.transform = "translate(-50%,-100%) rotate(" + b + "deg)"; }
    const help = U.$("#compassHelp");
    if (help && !QIBLA_UI.sensorOK) help.textContent = "بدون حسگر: عقربه از شمال جغرافیایی کوبیده می‌شود — جهت تقریبی و قابل‌اعتماد نیست. برای قطب‌نمای زنده «فعال‌سازی قطب‌نما» را بزنید. فاصله تا کعبه: " + U.num(Math.round(dist)) + " کیلومتر.";
  },
  async start() {
    if (!WIN.DeviceOrientationEvent) { QIBLA_UI.setStatus("unsupported"); return; }
    if (typeof WIN.DeviceOrientationEvent.requestPermission === "function") {
      try { const r = await WIN.DeviceOrientationEvent.requestPermission(); if (r !== "granted") { QIBLA_UI.setStatus("denied"); return; } }
      catch (e) { QIBLA_UI.setStatus("denied"); return; }
    }
    if (!("ondeviceorientationabsolute" in WIN)) { /* iOS style */ }
    const type = ("ondeviceorientationabsolute" in WIN) ? "deviceorientationabsolute" : "deviceorientation";
    const handler = (e) => {
      let heading = null;
      if (typeof e.webkitCompassHeading === "number") heading = e.webkitCompassHeading;
      else if (e.alpha != null) heading = (e.trueHeading != null ? e.trueHeading : (e.absolute ? 360 - e.alpha : null));
      if (heading == null || isNaN(heading)) { QIBLA_UI.setStatus("no-sensor"); return; }
      if (!QIBLA_UI._calibrated) QIBLA_UI.setStatus("ok", true);
      QIBLA_UI.sensorOK = true;
      const h = QIBLA_UI.smooth(U.fixAngle(+heading));
      const rel = U.fixAngle(QIBLA_UI.bearing - h);
      const nd = U.$("#compassNeedle"); if (nd) nd.style.transform = "translate(-50%,-100%) rotate(" + rel + "deg)";
      const dial = U.$("#compass"); if (dial) dial.style.setProperty("--h", h.toFixed(1) + "deg");
      U.$("#compassDeg") && (U.$("#compassDeg").textContent = U.num(Math.round(h)) + "°");
      const diff = Math.abs(((rel + 540) % 360) - 180);
      const st = U.$("#qiblaStatus"); if (st) st.textContent = diff < 8 ? "✓ رو به قبله" : ("انحراف " + U.num(Math.round(diff)) + "°");
      if (diff < 8 && SET.data.vibration && WIN.navigator.vibrate) { try { navigator.vibrate(25); } catch (e) {} }
    };
    if (QIBLA_UI.listener) WIN.removeEventListener(type, QIBLA_UI.listener);
    QIBLA_UI.listener = handler; QIBLA_UI._type = type;
    WIN.addEventListener(type, handler, { passive: true });
    QIBLA_UI._calibrated = true;
    setTimeout(() => { if (!QIBLA_UI.sensorOK) QIBLA_UI.setStatus("no-sensor"); }, 2500);
  },
  setStatus(kind, silent) {
    const st = U.$("#qiblaStatus"), help = U.$("#compassHelp"), btn = U.$("#btnCompassStart");
    const map = {
      ok: ["✓ حسگر جهت فعال — گوشی را افقی نگه دارید و figure-8 بزنید", "برای دقت بیشتر: یک‌بار گوشی را به‌صورت ∞ تکان دهید (کالیبراسیون) و از فلزات دور شوید."],
      denied: ["⛔ اجازهٔ حسگر داده نشد", "در تنظیمات مرورگر، دسترسی «Sensors/Rotation» را باز کنید؛ تا آن زمان فقط جهت ثابت نمایش داده می‌شود."],
      unsupported: ["مرورگر حسگر جهت ندارد", "این دستگاه/مرورگر deviceorientation ندارد. جهت ثابت از شمال جغرافیایی نمایش داده می‌شود؛ برای دقت از قطب‌نمای واقعی استفاده کنید."],
      "no-sensor": ["حسگر جهت داده نمی‌دهد", "ممکن است دستگاه سنسور magnetometer نداشته باشد (روی دسکتاپ رایج است). جهت ثابت نمایش داده می‌شود و دقیق نیست."]
    };
    const m = map[kind] || ["", ""];
    if (st) st.textContent = m[0];
    if (help) help.textContent = m[1] + " " + (kind === "unsupported" || kind === "no-sensor" ? "قبلهٔ شما: " + U.num(QIBLA_UI.bearing.toFixed(1)) + "° از شمال." : "");
    if (btn && kind === "denied") btn.textContent = "دوباره تلاش کنید";
  }
};
/* ---------------------------------------------------------------
   MODULE 13 · tools router + dhikr
   --------------------------------------------------------------- */
const TOOLS = {};
TOOLS.init = function () {
  U.$$("[data-tool]").forEach(b => b.addEventListener("click", () => { UI.state.tool = b.dataset.tool; VIEWS.tools.show(b.dataset.tool); }));
  // dhikr
  const plus = U.$("#btnDhikrPlus"), minus = U.$("#btnDhikrMinus"), reset = U.$("#btnDhikrReset");
  plus && plus.addEventListener("click", () => DHIKR.step(1));
  minus && minus.addEventListener("click", () => DHIKR.step(-1));
  reset && reset.addEventListener("click", () => DHIKR.reset());
  U.$("#dhikrLabel") && U.$("#dhikrLabel").addEventListener("change", () => { SET.data.dhikr.label = U.$("#dhikrLabel").value.slice(0, 40) || "ذکر"; SET.save(); DHIKR.paint(); });
  U.$("#dhikrTarget") && U.$("#dhikrTarget").addEventListener("change", () => { SET.data.dhikr.target = +U.$("#dhikrTarget").value || 0; SET.save(); DHIKR.paint(); });
  U.$("#dhikrVibrate") && U.$("#dhikrVibrate").addEventListener("change", () => { SET.data.vibration = U.$("#dhikrVibrate").checked; SET.save(); });
  U.$("#dhikrSound") && U.$("#dhikrSound").addEventListener("change", () => { SET.data.dhikrSound = U.$("#dhikrSound").checked; SET.save(); if (SET.data.dhikrSound) DHIKR.tick(); });
  U.$("#btnDhikrHistoryClear") && U.$("#btnDhikrHistoryClear").addEventListener("click", async () => { if (await UI.confirm("پاک کردن تاریخچهٔ ذکر", "همهٔ نشست‌های ذخیره‌شده حذف می‌شوند. ادامه می‌دهید؟")) { DB.all("dhikr").then(a => Promise.all(a.map(x => DB.del("dhikr", x.id)))).then(() => { DHIKR.loadHistory(); UI.toast("تاریخچه", "پاک شد"); }); } });
  // keyboard: space on the counter area counts
  plus && plus.addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); DHIKR.step(1); } });
  DHIKR.loadHistory();
  // organizer
  ORG.init(); MEDS.init(); VIEWS.tools.show(UI.state.tool);
};
TOOLS.show = function (id) { if (VIEWS && VIEWS.tools) VIEWS.tools.show(id); };
TOOLS.quickAdd = function (kind) {
  UI.setActive("tools");
  const map = {
    note:     { tool: "notes",     focus: "#noteBody",  label: "یادداشت" },
    reminder: { tool: "reminders", focus: "#remTitle",  label: "یادآور" },
    task:     { tool: "tasks",     focus: "#taskInput", label: "کار" },
    birthday: { tool: "birthdays", focus: "#bdName",    label: "تولد" }
  };
  const m = map[kind] || map.note;
  TOOLS.show(m.tool);
  setTimeout(() => { const n = U.$(m.focus); if (n) { n.focus({ preventScroll: true }); U.scrollIntoView(n); } }, 220);
  UI.toast("اقدام سریع", "فرم «" + m.label + "» آمادهٔ ورود است");
};
VIEWS.tools = { show(id) {
  U.$$(".tool-panel").forEach(p => p.classList.toggle("hidden", p.id !== "tool-" + id));
  U.$$("[data-tool]").forEach(b => { const on = b.dataset.tool === id; b.classList.toggle("active", on); b.setAttribute("aria-pressed", on ? "true" : "false"); });
  if (id === "tasks" || id === "notes" || id === "reminders" || id === "birthdays") ORG.render(id);
  if (id === "meds") MEDS.render();
  if (id === "dhikr") DHIKR.paint();
} };

const DHIKR = {};
DHIKR.count = 0;
DHIKR.init = function () { DHIKR.count = SET.data.dhikr.count || 0; DHIKR.paint(); };
DHIKR.step = function (d) {
  DHIKR.count = Math.max(0, DHIKR.count + d);
  SET.data.dhikr.count = DHIKR.count; SET.save();
  const t = SET.data.dhikr.target || 0;
  if (d > 0 && t && DHIKR.count === t) { UI.toast("تبریک", U.num(t) + " " + (SET.data.dhikr.label || "ذکر") + " کامل شد"); if (SET.data.vibration && WIN.navigator.vibrate) { try { navigator.vibrate([35, 45, 60]); } catch (e) {} } }
  else if (SET.data.vibration && WIN.navigator.vibrate && d > 0) { try { navigator.vibrate(12); } catch (e) {} }
  if (SET.data.dhikrSound) DHIKR.tick();
  DHIKR.paint();
  if (d > 0 && t && DHIKR.count % t === 0) DHIKR.saveSession();
};
DHIKR.tick = function () { const a = SND.el("tick"); if (!a || !SND.ok.tick) return; try { a.currentTime = 0; } catch (e) {} const p = a.play(); if (p && p.catch) p.catch(() => {}); };
DHIKR.saveSession = function () {
  const rec = { id: U.uid(), label: SET.data.dhikr.label || "ذکر", target: SET.data.dhikr.target || 0, count: DHIKR.count, at: Date.now(), jy: CAL.dateInfo(APP.todayDayNo()).jy, jm: CAL.dateInfo(APP.todayDayNo()).jm, jd: CAL.dateInfo(APP.todayDayNo()).jd };
  DB.put("dhikr", rec).then(() => DHIKR.loadHistory());
};
DHIKR.reset = async function () {
  if (!(await UI.confirm("بازنشانی ذکرشمار", "شمارش فعلی صفر می‌شود. اگر به هدف رسیده‌اید، در تاریخچه ذخیره شده است."))) return;
  if (DHIKR.count > 0) DHIKR.saveSession();
  DHIKR.count = 0; SET.data.dhikr.count = 0; SET.save(); DHIKR.paint();
};
DHIKR.paint = function () {
  const c = U.$("#dhikrCount"); if (!c) return;
  c.textContent = U.num(DHIKR.count);
  const t = SET.data.dhikr.target || 0;
  U.$("#dhikrLabelView").textContent = SET.data.dhikr.label || "ذکر";
  U.$("#dhikrSub").textContent = t ? (U.num(DHIKR.count % t || (DHIKR.count ? t : 0)) + " / " + U.num(t) + " · دور " + U.num(Math.ceil(DHIKR.count / t || 1))) : (U.num(DHIKR.count) + " ذکر");
  U.$("#dhikrLabel") && (U.$("#dhikrLabel").value = SET.data.dhikr.label || "");
  U.$("#dhikrTarget") && (U.$("#dhikrTarget").value = String(t));
  const ring = U.$("#dhikrProgress");
  if (ring) { const frac = t ? U.clamp((DHIKR.count % t || (DHIKR.count ? 1 : 0)) / t, 0, 1) : 0; ring.style.strokeDashoffset = String(628 * (1 - frac)); }
  const v = U.$("#dhikrVibrate"); if (v) { v.checked = !!SET.data.vibration; v.closest(".chip").classList.toggle("active", v.checked); }
  const s = U.$("#dhikrSound"); if (s) { s.checked = !!SET.data.dhikrSound; s.closest(".chip").classList.toggle("active", s.checked); }
};
DHIKR.loadHistory = function () {
  DB.all("dhikr").then(rows => {
    const box = U.$("#dhikrHistory"); if (!box) return;
    U.clear(box);
    rows = (rows || []).sort((a, b) => (b.at || 0) - (a.at || 0)).slice(0, 24);
    if (!rows.length) { box.appendChild(U.el("div", { class: "empty", text: "هنوز نشستی ذخیره نشده. با رسیدن به هدف، ذکر به‌صورت خودکار در تاریخچه ثبت می‌شود." })); return; }
    const today = APP.todayDayNo(); let todayTotal = 0;
    rows.forEach(r => { const dn = CAL.dayFromJal(r.jy, r.jm, r.jd); if (dn === today) todayTotal += (r.count || 0);
      box.appendChild(U.el("div", { class: "item" }, [U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: (r.label || "ذکر") + " — " + U.num(r.count) }), U.el("div", { class: "item-meta" }, [U.el("span", { text: U.num(r.jy) + "/" + U.pad2(r.jm) + "/" + U.pad2(r.jd) + " · " + U.num(new Date(r.at).getHours()) + ":" + U.num(U.pad2(new Date(r.at).getMinutes())) })])]), U.el("button", { class: "mini", "aria-label": "حذف", text: "🗑", onclick: () => DB.del("dhikr", r.id).then(() => DHIKR.loadHistory()) })])); });
    box.appendChild(U.el("div", { class: "small muted", text: "امروز: " + U.num(todayTotal) + " ذکر در " + U.num(rows.filter(r => CAL.dayFromJal(r.jy, r.jm, r.jd) === today).length) + " نشست" }));
  });
};

/* ---------------------------------------------------------------
   MODULE 14 · organizer — کارها، یادداشت‌ها، یادآورها، تولدها
   --------------------------------------------------------------- */
const ORG = { cache: { tasks: [], notes: [], reminders: [], birthdays: [] }, filter: "all", noteEditing: null };
ORG.init = function () {
  U.$("#btnAddTask") && U.$("#btnAddTask").addEventListener("click", () => ORG.addTask());
  U.$("#taskInput") && U.$("#taskInput").addEventListener("keydown", e => { if (e.key === "Enter") ORG.addTask(); });
  U.$("#taskFilter") && U.$("#taskFilter").addEventListener("change", () => { ORG.filter = U.$("#taskFilter").value; ORG.render("tasks"); });
  U.$("#btnTaskExport") && U.$("#btnTaskExport").addEventListener("click", () => PWA.exportJSON("fetros-tasks.json"));
  U.$("#btnSaveNote") && U.$("#btnSaveNote").addEventListener("click", () => ORG.saveNote());
  U.$("#btnClearNote") && U.$("#btnClearNote").addEventListener("click", () => ORG.clearNoteForm());
  U.$("#notesSearch") && U.$("#notesSearch").addEventListener("input", U.throttle(() => ORG.render("notes"), 180));
  U.$("#btnAddReminder") && U.$("#btnAddReminder").addEventListener("click", () => ORG.addReminder());
  U.$("#btnAddQuickReminder") && U.$("#btnAddQuickReminder").addEventListener("click", () => ORG.addQuickReminder());
  U.$("#btnSaveQuickNote") && U.$("#btnSaveQuickNote").addEventListener("click", () => ORG.saveQuickNote());
  U.$("#quickNote") && U.$("#quickNote").addEventListener("input", U.throttle(() => ORG.saveQuickNote(true), 900));
  U.$("#btnAddBirthday") && U.$("#btnAddBirthday").addEventListener("click", () => ORG.addBirthday());
  U.$$("[data-goto]").forEach(b => b.addEventListener("click", () => { const v = b.dataset.goto; if (v.startsWith("tools-")) { UI.setActive("tools"); TOOLS.show(v.slice(6)); } else UI.setActive(v); }));
  ORG.reload();
};
ORG.reload = function () {
  return Promise.all([DB.all("tasks"), DB.all("notes"), DB.all("reminders"), DB.all("birthdays")]).then(([tasks, notes, reminders, birthdays]) => {
    ORG.cache = { tasks: tasks || [], notes: notes || [], reminders: reminders || [], birthdays: birthdays || [] };
    ORG.syncPersonal(); ORG.renderAll();
  });
};
ORG.syncPersonal = function () {
  OCC.resetPersonal();
  ORG.cache.birthdays.forEach(b => { const nx = VIEWS.birthdays.nextOccurrence(b.jm, b.jd); if (nx && nx.dayNo != null) OCC.addPersonal(nx.dayNo, { title: (b.icon || "🎂") + " " + b.name, type: "personal", description: b.type === "anniversary" ? "سالگرد" : "تولد" }); });
  ORG.cache.reminders.forEach(r => { const d = new Date(r.when); if (!isNaN(d)) { const dn = CAL.dayFromGreg(d.getFullYear(), d.getMonth() + 1, d.getDate()); OCC.addPersonal(dn, { title: "⏰ " + r.title, type: "personal", description: "یادآور" }); } });
};
ORG.renderAll = function () { ["tasks","notes","reminders","birthdays"].forEach(k => ORG.render(k)); VIEWS.home.render(); UI.paintAgendaBadge && UI.paintAgendaBadge(); };

ORG.addTask = async function () {
  const inp = U.$("#taskInput"); const title = (inp.value || "").trim();
  if (!title) { UI.toast("کار", "ابتدا عنوان کار را بنویسید", "warn"); inp.focus(); return; }
  const dateVal = U.$("#taskDate").value;
  const t = { id: U.uid(), kind: "task", title: title.slice(0, 120), done: false, created: Date.now(), due: dateVal || null };
  await DB.put("tasks", t); ORG.cache.tasks.push(t);
  inp.value = ""; U.$("#taskDate").value = ""; ORG.render("tasks"); VIEWS.home.render();
  if (SET.data.vibration) try { navigator.vibrate && navigator.vibrate(10); } catch (e) {}
};
ORG.render = function (which) {
  try { UI.paintAgendaBadge && UI.paintAgendaBadge(); } catch (e) {}
  if (which === "tasks") {
    const list = U.$("#tasksList"); if (!list) return; U.clear(list);
    let items = ORG.cache.tasks.slice().sort((a, b) => (a.done - b.done) || String(a.due || "9999").localeCompare(String(b.due || "9999")) || (b.created - a.created));
    const today = new Date(); const iso = today.getFullYear() + "-" + U.pad2(today.getMonth() + 1) + "-" + U.pad2(today.getDate());
    if (ORG.filter === "today") items = items.filter(t => t.due === iso || (t.due === null && !t.done));
    else if (ORG.filter === "active") items = items.filter(t => !t.done);
    else if (ORG.filter === "done") items = items.filter(t => t.done);
    if (!items.length) { list.appendChild(U.el("div", { class: "empty", html: "<b>کاری ثبت نشده</b><br>از فرم بالا یا دکمهٔ ＋ استفاده کنید. کارها روی همین دستگاه ذخیره می‌شوند." })); }
    items.slice(0, 60).forEach(t => {
      const overdue = t.due && !t.done && t.due < iso;
      const cb = U.el("input", { type: "checkbox", class: "sr-only" }); cb.checked = !!t.done;
      const lab = U.el("label", { style: "display:flex;gap:10px;align-items:flex-start;flex:1;cursor:pointer" }, [
        U.el("span", { style: "width:20px;height:20px;border-radius:6px;border:1.5px solid var(--border-2);display:grid;place-items:center;flex:0 0 20px;background:" + (t.done ? "var(--accent)" : "transparent"), "aria-hidden": "true", text: t.done ? "✓" : "" }),
        U.el("div", {}, [U.el("p", { class: "item-title", style: t.done ? "text-decoration:line-through;opacity:.65" : "", text: t.title }),
          U.el("div", { class: "item-meta" }, [t.due ? U.el("span", { class: "badge-soft", style: overdue ? "color:#FF8FA3;border-color:rgba(255,143,163,.35)" : "", text: (overdue ? "⚠ عقب‌افتده · " : "📅 ") + U.num(t.due) }) : null])])
      ]);
      lab.appendChild(cb);
      list.appendChild(U.el("div", { class: "item" }, [lab,
        U.el("div", { class: "item-actions" }, [
          U.el("button", { class: "mini", "aria-label": "ویرایش", text: "✎", onclick: () => ORG.editTask(t) }),
          U.el("button", { class: "mini", "aria-label": "حذف", text: "🗑", onclick: async () => { if (await UI.confirm("حذف کار", "«" + t.title + "» حذف شود؟")) { await DB.del("tasks", t.id); ORG.cache.tasks = ORG.cache.tasks.filter(x => x.id !== t.id); ORG.render("tasks"); VIEWS.home.render(); } } })
        ])]));
      lab.addEventListener("click", async (e) => { e.preventDefault(); t.done = !t.done; await DB.put("tasks", t); ORG.render("tasks"); VIEWS.home.render(); if (SET.data.vibration) try { navigator.vibrate && navigator.vibrate(t.done ? 18 : 8); } catch (err) {} });
    });
  }
  if (which === "notes") {
    const list = U.$("#notesList"); if (!list) return; U.clear(list);
    const q = (U.$("#notesSearch").value || "").trim().toLowerCase();
    let items = ORG.cache.notes.slice().sort((a, b) => (b.fav - a.fav) || (b.updated || b.created) - (a.updated || a.created));
    if (q) items = items.filter(n => (n.title + " " + n.body).toLowerCase().includes(q));
    U.$("#notesCount").textContent = U.num(ORG.cache.notes.length) + " یادداشت";
    if (!items.length) list.appendChild(U.el("div", { class: "empty", text: q ? "یادداشتی با این جستجو پیدا نشد." : "هنوز یادداشتی ندارید. چیزی بنویسید و «ذخیره» را بزنید." }));
    items.slice(0, 40).forEach(n => {
      const box = U.el("div", { class: "item", style: "flex-direction:column;align-items:stretch;gap:6px" });
      const head = U.el("div", { class: "row" }, [
        U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: (n.fav ? "★ " : "") + (n.title || "بدون عنوان") }), U.el("div", { class: "item-meta" }, [U.el("span", { text: VIEWS.notes.dateLabel(n) })])]),
        U.el("div", { class: "item-actions" }, [
          U.el("button", { class: "mini", "aria-label": "علاقه‌مندی", text: n.fav ? "★" : "☆", onclick: () => { n.fav = !n.fav; DB.put("notes", n).then(() => ORG.render("notes")); } }),
          U.el("button", { class: "mini", "aria-label": "ویرایش", text: "✎", onclick: () => ORG.editNote(n) }),
          U.el("button", { class: "mini", "aria-label": "حذف", text: "🗑", onclick: async () => { if (await UI.confirm("حذف یادداشت", "این یادداشت حذف شود؟")) { await DB.del("notes", n.id); ORG.cache.notes = ORG.cache.notes.filter(x => x.id !== n.id); ORG.render("notes"); } } })
        ])
      ]);
      box.appendChild(head);
      box.appendChild(U.el("div", { class: "desc", style: "white-space:pre-wrap", text: (n.body || "").slice(0, 500) }));
      list.appendChild(box);
    });
  }
  if (which === "reminders") {
    const list = U.$("#remindersList"); if (!list) return; U.clear(list);
    const now = Date.now();
    const items = ORG.cache.reminders.slice().sort((a, b) => a.when - b.when);
    if (!items.length) list.appendChild(U.el("div", { class: "empty", text: "یادآوری ندارید. یادآور فقط وقتی برنامه باز است اعلان می‌دهد (محدودیت PWA — راهنمای APK در README)." }));
    items.slice(0, 40).forEach(r => {
      const d = new Date(r.when); const past = r.when < now;
      list.appendChild(U.el("div", { class: "item" }, [
        U.el("span", { class: "legend-dot", style: "background:" + (past ? "#FF8FA3" : "#F5C451") + ";margin-top:7px" }),
        U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: r.title }),
          U.el("div", { class: "item-meta" }, [U.el("span", { text: U.num(d.toLocaleString("fa-IR", { hour12: false })) }), r.repeat && r.repeat !== "none" ? U.el("span", { class: "badge-soft", text: "تکرار: " + ({daily:"روزانه",weekly:"هفتگی",monthly:"ماهانه"}[r.repeat] || r.repeat) }) : null, past ? U.el("span", { class: "badge-soft", text: "گذشت" }) : null])]),
        U.el("div", { class: "item-actions" }, [
          U.el("button", { class: "mini", text: "✎", "aria-label": "ویرایش", onclick: () => ORG.editReminder(r) }),
          U.el("button", { class: "mini", text: "✓", "aria-label": "انجام شد", onclick: async () => { if (r.repeat && r.repeat !== "none") { r.when = ORG.advance(r.when, r.repeat); await DB.put("reminders", r); UI.toast("یادآور", "به دورهٔ بعد منتقل شد"); } else { await DB.del("reminders", r.id); ORG.cache.reminders = ORG.cache.reminders.filter(x => x.id !== r.id); } ORG.syncPersonal(); ORG.render("reminders"); VIEWS.home.render(); } }),
          U.el("button", { class: "mini", text: "🗑", "aria-label": "حذف", onclick: async () => { if (await UI.confirm("حذف یادآور", "این یادآور حذف شود؟")) { await DB.del("reminders", r.id); ORG.cache.reminders = ORG.cache.reminders.filter(x => x.id !== r.id); ORG.syncPersonal(); ORG.render("reminders"); VIEWS.home.render(); } } })
        ])
      ]));
    });
  }
  if (which === "birthdays") VIEWS.birthdays.render();
};
ORG.advance = function (when, repeat) { let t = when; const step = { daily: 86400000, weekly: 7 * 86400000, monthly: null }[repeat]; if (step) { while (t < Date.now()) t += step; return t; } const d = new Date(t); let guard = 0; while (d.getTime() < Date.now() && guard++ < 400) d.setMonth(d.getMonth() + 1); return d.getTime(); };
ORG.editTask = function (t) { UI.editDialog({ title: "ویرایش کار", fields: [ { name: "title", label: "عنوان", value: t.title, required: true, maxlength: 120 }, { name: "due", label: "تاریخ سررسید (میلادی)", type: "date", value: t.due || "" } ], onSave: async (d) => { t.title = d.title.slice(0, 120); t.due = d.due || null; await DB.put("tasks", t); ORG.render("tasks"); VIEWS.home.render(); UI.toast("ویرایش شد"); } }); };
ORG.editNote = function (n) { UI.editDialog({ title: "ویرایش یادداشت", fields: [ { name: "title", label: "عنوان", value: n.title || "" }, { name: "body", label: "متن", type: "textarea", value: n.body || "" } ], onSave: async (d) => { n.title = d.title.slice(0, 120); n.body = d.body.slice(0, 8000); n.updated = Date.now(); await DB.put("notes", n); ORG.render("notes"); UI.toast("ذخیره شد"); } }); };
ORG.editReminder = function (r) { UI.editDialog({ title: "ویرایش یادآور", fields: [ { name: "title", label: "عنوان", value: r.title, required: true }, { name: "when", label: "زمان", type: "datetime-local", value: ORG.toLocalInput(new Date(r.when)), required: true }, { name: "repeat", label: "تکرار", type: "select", value: r.repeat || "none", options: [{value:"none",label:"بدون تکرار"},{value:"daily",label:"روزانه"},{value:"weekly",label:"هفتگی"},{value:"monthly",label:"ماهانه"}] } ], onSave: async (d) => { r.title = d.title.slice(0, 120); r.when = new Date(d.when).getTime() || r.when; r.repeat = d.repeat; await DB.put("reminders", r); ORG.syncPersonal(); ORG.render("reminders"); VIEWS.home.render(); UI.toast("ذخیره شد"); } }); };
ORG.toLocalInput = function (d) { return d.getFullYear() + "-" + U.pad2(d.getMonth() + 1) + "-" + U.pad2(d.getDate()) + "T" + U.pad2(d.getHours()) + ":" + U.pad2(d.getMinutes()); };
ORG.saveNote = async function () {
  const title = (U.$("#noteTitle").value || "").trim(), body = (U.$("#noteBody").value || "").trim();
  if (!title && !body) { UI.toast("یادداشت", "چیزی برای ذخیره نیست", "warn"); return; }
  const n = ORG.noteEditing || { id: U.uid(), created: Date.now(), kind: "note" };
  Object.assign(n, { title: title.slice(0, 120), body: body.slice(0, 8000), fav: !!U.$("#noteFav").checked, updated: Date.now() });
  await DB.put("notes", n);
  if (!ORG.noteEditing) ORG.cache.notes.push(n);
  ORG.clearNoteForm(); ORG.render("notes"); UI.toast("یادداشت ذخیره شد");
};
ORG.clearNoteForm = function () { ORG.noteEditing = null; U.$("#noteTitle").value = ""; U.$("#noteBody").value = ""; U.$("#noteFav").checked = false; };
ORG.addReminder = async function () {
  const title = (U.$("#remTitle").value || "").trim(), when = U.$("#remWhen").value;
  if (!title) { UI.toast("یادآور", "عنوان را وارد کنید", "warn"); return; }
  const w = when ? new Date(when).getTime() : Date.now() + 3600000;
  if (isNaN(w)) { UI.toast("یادآور", "زمان نامعتبر است", "warn"); return; }
  const r = { id: U.uid(), kind: "reminder", title: title.slice(0, 120), when: w, repeat: U.$("#remRepeat").value || "none", created: Date.now(), firedFor: null };
  await DB.put("reminders", r); ORG.cache.reminders.push(r);
  U.$("#remTitle").value = ""; U.$("#remWhen").value = "";
  ORG.syncPersonal(); ORG.render("reminders"); VIEWS.home.render();
  UI.toast("یادآور افزوده شد", "اعلان فقط وقتی برنامه باز است ارسال می‌شود");
};
ORG.addQuickReminder = async function () {
  const txt = (U.$("#quickReminderText").value || "").trim(); if (!txt) { UI.toast("یادآور", "متن یادآور را بنویسید", "warn"); return; }
  let w = U.$("#quickReminderTime").value ? new Date(U.$("#quickReminderTime").value).getTime() : null;
  if (!w || isNaN(w)) { const d = new Date(Date.now() + 2 * 3600000); d.setSeconds(0, 0); w = d.getTime(); }
  const r = { id: U.uid(), kind: "reminder", title: txt.slice(0, 120), when: w, repeat: "none", created: Date.now(), firedFor: null };
  await DB.put("reminders", r); ORG.cache.reminders.push(r);
  U.$("#quickReminderText").value = ""; U.$("#quickReminderTime").value = "";
  ORG.syncPersonal(); ORG.render("reminders"); VIEWS.home.render();
  UI.toast("یادآور", "برای " + U.num(new Date(w).toLocaleString("fa-IR", { hour12: false })) + " ثبت شد");
};
ORG.saveQuickNote = async function (silent) {
  const v = U.$("#quickNote").value || "";
  SET.data.quickNote = v.slice(0, 2000); SET.save();
  const st = U.$("#quickNoteStatus"); if (st) st.textContent = silent ? "در حال ذخیره…" : "ذخیره شد در همین دستگاه ✓";
  if (!silent) { const d = { id: U.uid(), kind: "note", title: "یادداشت سریع", body: v.slice(0, 8000), fav: false, created: Date.now(), updated: Date.now() }; await DB.put("notes", d); ORG.cache.notes.push(d); ORG.render("notes"); UI.toast("یادداشت", "در فهرست یادداشت‌ها ذخیره شد"); }
  else setTimeout(() => { if (st) st.textContent = "خودکار ذخیره شد ✓"; }, 300);
};
ORG.addBirthday = async function () {
  const name = (U.$("#bdName").value || "").trim(); const raw = (U.$("#bdDate").value || "").trim();
  const m = VIEWS.calendar.parseFa(raw).split(/[\/\-\.،\s]+/).filter(Boolean);
  if (!name) { UI.toast("تولد", "نام را وارد کنید", "warn"); return; }
  if (m.length < 2) { UI.toast("تولد", "تاریخ را به شکل MM-DD وارد کنید (مثلاً ۰۷-۲۷)", "warn"); return; }
  const jm = +m[0], jd = +m[1];
  if (!(jm >= 1 && jm <= 12 && jd >= 1 && jd <= 31)) { UI.toast("تولد", "ماه/روز نامعتبر است", "warn"); return; }
  const b = { id: U.uid(), kind: "birthday", name: name.slice(0, 60), jm, jd: Math.min(jd, 30), type: U.$("#bdType").value || "birthday", icon: (U.$("#bdType").value === "anniversary" ? "🎉" : "🎂"), created: Date.now() };
  await DB.put("birthdays", b); ORG.cache.birthdays.push(b);
  U.$("#bdName").value = ""; U.$("#bdDate").value = "";
  ORG.syncPersonal(); VIEWS.birthdays.render(); UI.toast("ثبت شد", name + " به تقویم اضافه شد");
};
ORG.renderHomeTasks = function () {
  const box = U.$("#homeTasks"); if (!box) return; U.clear(box);
  const today = new Date(); const iso = today.getFullYear() + "-" + U.pad2(today.getMonth() + 1) + "-" + U.pad2(today.getDate());
  const todays = ORG.cache.tasks.filter(t => !t.done && (!t.due || t.due === iso || t.due < iso));
  if (!todays.length) { box.appendChild(U.el("div", { class: "empty", text: "کار باز برای امروز ندارید. 🎉" })); return; }
  todays.slice(0, 4).forEach(t => box.appendChild(U.el("div", { class: "item", style: "padding:8px 10px" }, [U.el("p", { class: "item-title", style: "margin:0;flex:1", text: t.title }), t.due && t.due < iso ? U.el("span", { class: "badge-soft", text: "عقب‌افتده" }) : null])));
  if (todays.length > 4) box.appendChild(U.el("div", { class: "small muted", text: "+ " + U.num(todays.length - 4) + " کار دیگر" }));
};
ORG.renderHomeReminders = function () {
  const box = U.$("#homeReminders"); if (!box) return; U.clear(box);
  const now = Date.now();
  const next = ORG.cache.reminders.filter(r => r.when > now).sort((a, b) => a.when - b.when)[0];
  if (!next) { box.appendChild(U.el("div", { class: "small muted", text: "یادآور آینده‌ای ثبت نشده." })); return; }
  const d = new Date(next.when); const diff = (next.when - now) / 60000;
  const when = diff < 60 ? (U.num(Math.max(1, Math.round(diff))) + " دقیقهٔ دیگر") : (diff < 1440 ? (U.num(Math.round(diff / 60)) + " ساعت دیگر") : U.num(d.toLocaleString("fa-IR", { hour12: false })));
  box.appendChild(U.el("div", { class: "item", style: "padding:8px 10px" }, [U.el("p", { class: "item-title", style: "margin:0;flex:1", text: "⏰ " + next.title }), U.el("span", { class: "badge-soft", text: when })]));
};
ORG.personalForDay = function (dayNo) {
  const out = [];
  ORG.cache.tasks.filter(t => t.due && CAL.dayFromGreg(+t.due.slice(0, 4), +t.due.slice(5, 7), +t.due.slice(8, 10)) === dayNo).forEach(t => out.push({ title: (t.done ? "✓ " : "□ ") + t.title, type: "personal", description: "کار" }));
  ORG.cache.reminders.filter(r => CAL.dayFromGreg(new Date(r.when).getFullYear(), new Date(r.when).getMonth() + 1, new Date(r.when).getDate()) === dayNo).forEach(r => out.push({ title: "⏰ " + r.title, type: "personal", description: "یادآور" }));
  return out;
};
VIEWS.birthdays = {
  nextOccurrence(jm, jd) {
    const today = APP.todayDayNo();
    for (let k = 0; k < 380; k++) { const info = CAL.dateInfo(today + k); const eff = Math.min(jd, CAL.jalaaliMonthLength(info.jy, info.jm)); if (info.jm === jm && info.jd === eff) return { dayNo: today + k, jy: info.jy }; }
    return null;
  },
  render() {
    const list = U.$("#birthdaysList"); if (!list) return; U.clear(list);
    if (!ORG.cache.birthdays.length) { list.appendChild(U.el("div", { class: "empty", text: "تولد یا سالگردی ثبت نشده. این‌ها روی شبکهٔ تقویم هم نمایش داده می‌شوند." })); return; }
    const today = APP.todayDayNo();
    const rows = ORG.cache.birthdays.map(b => { const n = VIEWS.birthdays.nextOccurrence(b.jm, b.jd); return Object.assign({ dayNo: n ? n.dayNo : null, inDays: n ? n.dayNo - today : null }, b); }).sort((a, b) => (a.inDays ?? 999) - (b.inDays ?? 999));
    rows.forEach(b => {
      const info = b.dayNo != null ? CAL.dateInfo(b.dayNo) : null;
      list.appendChild(U.el("div", { class: "item" }, [U.el("span", { text: b.icon || "🎂", style: "font-size:18px" }),
        U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: b.name }), U.el("div", { class: "item-meta" }, [U.el("span", { text: U.num(b.jd) + " " + CAL.J_MONTHS[b.jm - 1] }), info ? U.el("span", { class: "badge-soft", text: b.inDays === 0 ? "امروز! 🎉" : (U.num(b.inDays) + " روز تا " + CAL.DOW[info.dow]) }) : null])]),
        U.el("button", { class: "mini", text: "🗑", "aria-label": "حذف", onclick: async () => { if (await UI.confirm("حذف", "این تولد حذف شود؟")) { await DB.del("birthdays", b.id); ORG.cache.birthdays = ORG.cache.birthdays.filter(x => x.id !== b.id); ORG.syncPersonal(); VIEWS.birthdays.render(); } } })]));
    });
  }
};

/* ---------------------------------------------------------------
   MODULE 15 · meds — یادآور دارو (اختیاری، بدون توصیهٔ پزشکی)
   --------------------------------------------------------------- */
const MEDS = {};
MEDS.logs = [];
MEDS.list = [];
MEDS.init = function () {
  const en = U.$("#medsEnable");
  en && en.closest(".chip").addEventListener("click", (e) => { if (e.target !== en) { e.preventDefault(); en.checked = !en.checked; en.dispatchEvent(new WIN.Event("change", { bubbles: true })); } });
  en && en.addEventListener("change", () => { SET.data.meds = en.checked; SET.save(); MEDS.paintPanel(); if (SET.data.meds) MEDS.render(); UI.toast("دارو", SET.data.meds ? "ماژول دارو روشن شد — فقط یادآور است، توصیهٔ پزشکی نیست" : "ماژول دارو خاموش شد (داده‌ها نگه داشته شد)"); });
  U.$("#btnAddMed") && U.$("#btnAddMed").addEventListener("click", () => MEDS.add());
  MEDS.paintPanel();
  DB.all("medlogs").then(l => { MEDS.logs = l || []; });
};
MEDS.paintPanel = function () { const en = U.$("#medsEnable"); if (en) { en.checked = !!SET.data.meds; en.closest(".chip").classList.toggle("active", en.checked); } U.$("#medsPanel").classList.toggle("hidden", !SET.data.meds); };
MEDS.add = async function () {
  const name = (U.$("#medName").value || "").trim();
  const times = VIEWS.calendar.parseFa(U.$("#medTimes").value || "").split(/[,،\s]+/).map(s => s.trim()).filter(Boolean);
  if (!name) { UI.toast("دارو", "نام دارو را وارد کنید", "warn"); return; }
  if (!times.length) { UI.toast("دارو", "حداقل یک ساعت وارد کنید (مثلاً 08:00, 20:00)", "warn"); return; }
  const clean = [];
  for (const t of times) { const m = t.match(/^(\d{1,2}):(\d{2})$/); if (!m || +m[1] > 23 || +m[2] > 59) { UI.toast("دارو", "قالب ساعت: HH:MM — «" + t + "» نامعتبر است", "warn"); return; } clean.push(U.pad2(+m[1]) + ":" + U.pad2(+m[2])); }
  const med = { id: U.uid(), kind: "med", name: name.slice(0, 60), dose: (U.$("#medDose").value || "").trim().slice(0, 80), times: clean, from: U.$("#medFrom").value || null, to: U.$("#medTo").value || null, created: Date.now() };
  await DB.put("meds", med);
  MEDS.list = (MEDS.list || []).concat([med]);
  await MEDS.render();
  U.$("#medName").value = ""; U.$("#medDose").value = ""; U.$("#medTimes").value = "";
  UI.toast("برنامهٔ دارو ثبت شد", "یادآور درون‌برنامه‌ای — هشدار سیستمی تضمین‌شده نیست");
};
MEDS.load = function () { return DB.all("meds").then(l => { MEDS.list = l || []; return l; }); };
MEDS.render = function () {
  MEDS.paintPanel(); if (!SET.data.meds) return Promise.resolve();
  return Promise.all([DB.all("meds"), DB.all("medlogs")]).then(([meds, logs]) => {
    MEDS.list = meds || []; MEDS.logs = logs || [];
    const today = new Date(); const iso = today.getFullYear() + "-" + U.pad2(today.getMonth() + 1) + "-" + U.pad2(today.getDate());
    const hhmm = U.pad2(today.getHours()) + ":" + U.pad2(today.getMinutes());
    const tBox = U.$("#medsToday"); U.clear(tBox);
    const sched = [];
    MEDS.list = MEDS.list || [];
    MEDS.list.forEach(md => {
      if (!md || !Array.isArray(md.times)) return;
      if (md.from && iso < md.from) return; if (md.to && iso > md.to) return;
      md.times.forEach(tm => sched.push({ md, tm, state: (MEDS.logs || []).find(l => l.medId === md.id && l.date === iso && l.time === tm) }));
    });
    sched.sort((a, b) => a.tm.localeCompare(b.tm));
    if (!sched.length) tBox.appendChild(U.el("div", { class: "empty", text: "برنامهٔ فعالی برای امروز نیست." }));
    else {
      const done = sched.filter(s => s.state && s.state.status === "taken").length;
      tBox.appendChild(U.el("div", { class: "row", style: "margin-bottom:6px" }, [U.el("span", { class: "small muted", text: "امروز · " + U.num(done) + " از " + U.num(sched.length) + " مصرف شد" }), U.el("span", { class: "small muted", text: U.num(hhmm) })]));
      tBox.appendChild(U.el("div", { class: "progress", style: "margin-bottom:10px" }, [U.el("i", { style: "width:" + (sched.length ? Math.round(done / sched.length * 100) : 0) + "%" })]));
      const grid = U.el("div", { class: "list" });
      sched.forEach(s => {
        const overdue = !s.state && s.tm < hhmm;
        grid.appendChild(U.el("div", { class: "item" }, [
          U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: U.num(s.tm) + " · " + s.md.name }), U.el("div", { class: "item-meta" }, [s.md.dose ? U.el("span", { text: s.md.dose }) : null, overdue ? U.el("span", { class: "badge-soft", text: "گذشته" }) : null])]),
          U.el("div", { class: "item-actions" }, [
            U.el("button", { class: "btn btn-sm " + (s.state && s.state.status === "taken" ? "btn-primary" : "btn-ghost"), text: "خوردم", onclick: () => MEDS.log(s.md, s.tm, iso, "taken") }),
            U.el("button", { class: "btn btn-sm btn-ghost", text: "رد شد", onclick: () => MEDS.log(s.md, s.tm, iso, "skipped") })
          ])
        ]));
      });
      tBox.appendChild(grid);
    }
    const list = U.$("#medsList"); U.clear(list);
    (MEDS.list || []).forEach(md => {
      list.appendChild(U.el("div", { class: "item" }, [U.el("span", { text: "💊", style: "font-size:16px" }), U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: md.name }), U.el("div", { class: "item-meta" }, [U.el("span", { text: (md.times || []).map(t => U.num(t)).join("، ") }), md.dose ? U.el("span", { class: "badge-soft", text: md.dose }) : null, (md.from || md.to) ? U.el("span", { class: "badge-soft", text: U.num(md.from || "—") + " → " + U.num(md.to || "—") }) : null])]),
        U.el("button", { class: "mini", text: "🗑", "aria-label": "حذف", onclick: async () => { if (await UI.confirm("حذف برنامهٔ دارو", "«" + md.name + "» حذف شود؟ تاریخچهٔ مصرف هم پاک می‌شود.")) { await DB.del("meds", md.id); MEDS.logs.filter(l => l.medId === md.id).forEach(l => DB.del("medlogs", l.id)); MEDS.render(); } } })]));
    });
  });
};
MEDS.log = async function (md, time, date, status) {
  const id = md.id + ":" + date + ":" + time;
  const rec = { id, medId: md.id, date, time, status, at: Date.now() };
  await DB.put("medlogs", rec);
  MEDS.logs = (MEDS.logs || []).filter(l => l.id !== id).concat([rec]);
  await MEDS.render();
  if (SET.data.vibration) try { navigator.vibrate && navigator.vibrate(status === "taken" ? 20 : 10); } catch (e) {}
};
MEDS.tick = function () {
  if (!SET.data.meds || !MEDS.list) return;
  const now = new Date(); const hm = U.pad2(now.getHours()) + ":" + U.pad2(now.getMinutes());
  const iso = now.getFullYear() + "-" + U.pad2(now.getMonth() + 1) + "-" + U.pad2(now.getDate());
  (MEDS.list || []).forEach(md => {
    if (md.from && iso < md.from) return; if (md.to && iso > md.to) return;
    (md.times || []).forEach(tm => { if (tm === hm && !(MEDS.logs || []).find(l => l.medId === md.id && l.date === iso && l.time === tm)) { NOTIFY.show("فطرس · دارو", md.name + (md.dose ? " — " + md.dose : "") + " (" + U.num(tm) + ")"); } });
  });
};

/* ---------------------------------------------------------------
   MODULE 16 · weather — Open-Meteo (رایگان، بدون کلید، نیاز به اینترنت)
   --------------------------------------------------------------- */
const WEATHER = { last: null, key: "fetros.weather.cache" };
WEATHER.CODES = { 0:"آفتابی",1:"عمدتاً صاف",2:"نیمه‌ابری",3:" ابری",45:"مِه",48:"مِه یخ‌زده",51:"نم‌نمک ریز",53:"نم‌نمک",55:"نم‌نمک شدید",61:"باران خفیف",63:"باران",65:"باران شدید",66:"باران یخی",67:"باران یخی شدید",71:"برف خفیف",73:"برف",75:"برف شدید",77:"دانهٔ برف",80:"رگبار",81:"رگبار متوسط",82:"رگبار شدید",85:"رگبار برف",86:"رگبار برف شدید",95:"رعد و برق",96:"رعد و برق با تگرگ",99:"رعد و برق با تگرگ شدید" };
WEATHER.maybeRefresh = function () {
  const card = U.$("#weatherCard"); if (!card) return;
  if (!SET.data.weather) { card.style.display = "none"; U.$("#heroWeatherPill") && (U.$("#heroWeatherPill").style.display = "none"); return; }
  if (!WIN.navigator.onLine) { const c = U.lsGet(WEATHER.key, null); if (c) { WEATHER.paint(c, true); card.style.display = ""; } return; }
  const ageMin = c => (Date.now() - (c && c.at || 0)) / 60000;
  const cached = U.lsGet(WEATHER.key, null);
  if (cached && ageMin(cached) < (CFG.weather && CFG.weather.cacheMinutes || 20)) { WEATHER.paint(cached); card.style.display = ""; return; }
  WEATHER.fetchNow();
};
WEATHER.fetchNow = function () {
  const city = SET.getCity();
  const cfg = CFG.weather || {};
  if (!cfg.endpoint) return;
  const url = cfg.endpoint + "?latitude=" + city.lat + "&longitude=" + city.lng +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3";
  WEATHER.skeleton();
  fetch(url, { cache: "no-store" }).then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(j => {
      if (!j || !j.current) throw new Error("پاسخ نامعتبر");
      const out = { at: Date.now(), city: city.name, cur: j.current, daily: j.daily, attribution: cfg.attribution || "", attributionUrl: cfg.attributionUrl || "https://open-meteo.com/" };
      U.lsSet(WEATHER.key, out); WEATHER.paint(out); U.$("#weatherCard").style.display = "";
    })
    .catch(err => {
      const card = U.$("#weatherCard"); card.style.display = "";
      U.$("#weatherTemp").textContent = "—°"; U.$("#weatherDesc").textContent = "دریافت نشد";
      U.$("#weatherUpdated") && (U.$("#weatherUpdated").textContent = "ناموفق");
      U.$("#weatherMeta").textContent = (err && err.message ? err.message : "خطا") + " — اتصال یا سرویس در دسترس نیست؛ دادهٔ ساختگی نمایش داده نمی‌شود.";
      U.$("#weatherForecast") && U.clear(U.$("#weatherForecast"));
    });
};
WEATHER.skeleton = function () {
  const card = U.$("#weatherCard"); if (!card) return;
  card.style.display = "";
  U.$("#weatherDesc").textContent = "در حال دریافت…";
  U.$("#weatherTemp").textContent = "—°";
  U.$("#weatherMeta").textContent = "یک بار درخواست به open-meteo.com می‌رود (بدون کلید، بدون ثبت‌نام).";
  U.$("#weatherUpdated").textContent = "…";
  const f = U.$("#weatherForecast"); U.clear(f);
  for (let i = 0; i < 3; i++) {
    const sk = U.el("div", { class: "skel", style: "padding:10px" });
    sk.appendChild(U.el("div", { class: "skel-line", style: "width:45%" }));
    sk.appendChild(U.el("div", { class: "skel-line", style: "width:70%" }));
    sk.appendChild(U.el("div", { class: "skel-line", style: "width:55%" }));
    f.appendChild(sk);
  }
};
WEATHER.paint = function (c, stale) {
  if (!c || !c.cur) return;
  const card = U.$("#weatherCard"); card.style.display = "";
  const cur = c.cur;
  U.$("#weatherTemp").textContent = U.num(Math.round(cur.temperature_2m)) + "°";
  U.$("#weatherDesc").textContent = (stale ? "(کش) " : "") + (WEATHER.CODES[cur.weather_code] || "—");
  U.$("#weatherMeta").textContent = "احساس " + U.num(Math.round(cur.apparent_temperature)) + "° · رطوبت " + U.num(cur.relative_humidity_2m) + "٪ · باد " + U.num(Math.round(cur.wind_speed_10m)) + " km/h" + " · " + U.num(c.city);
  U.$("#weatherUpdated").textContent = "آخرین به‌روزرسانی: " + U.num(new Date(c.at).toLocaleTimeString("fa-IR", { hour12: false }));
  const f = U.$("#weatherForecast"); U.clear(f);
  if (c.daily) for (let i = 0; i < Math.min(3, (c.daily.time || []).length); i++) {
    const d = new Date(c.daily.time[i] + "T12:00:00"); const info = CAL.dateInfo(CAL.dayFromGreg(d.getFullYear(), d.getMonth() + 1, d.getDate()));
    f.appendChild(U.el("div", { class: "glass card", style: "text-align:center;padding:8px" }, [
      U.el("div", { class: "small muted", text: i === 0 ? "امروز" : CAL.DOW[info.dow] }),
      U.el("div", { class: "title", style: "margin:2px 0", text: U.num(Math.round(c.daily.temperature_2m_max[i])) + "° / " + U.num(Math.round(c.daily.temperature_2m_min[i])) + "°" }),
      U.el("div", { class: "small muted", text: WEATHER.CODES[c.daily.weather_code[i]] || "—" })
    ]));
  }
  const pill = U.$("#heroWeatherPill"), pt = U.$("#heroWeatherTxt");
  if (pill && pt) { pill.style.display = ""; pt.textContent = U.num(Math.round(cur.temperature_2m)) + "° " + (WEATHER.CODES[cur.weather_code] || ""); pill.appendChild(U.el("a", { href: c.attributionUrl || "#", target: "_blank", rel: "noopener", class: "sr-only", text: c.attribution || "" })); }
};
WEATHER.toggle = function (on) { SET.data.weather = !!on; SET.save(); if (on) WEATHER.fetchNow(); else { U.$("#weatherCard").style.display = "none"; } };
/* ---------------------------------------------------------------
   MODULE 17 · notes view helpers + global search
   --------------------------------------------------------------- */
VIEWS.notes = { dateLabel(n) { const d = new Date(n.updated || n.created); const info = CAL.dateInfo(CAL.dayFromGreg(d.getFullYear(), d.getMonth() + 1, d.getDate())); return CAL.J_MONTHS[info.jm - 1] + " " + U.num(info.jd) + "، " + U.num(d.getHours()) + ":" + U.num(U.pad2(d.getMinutes())); } };

VIEWS.search = {
  init() {
    U.$("#btnSearch") && U.$("#btnSearch").addEventListener("click", () => { UI.sheet.open("#sheetSearch"); setTimeout(() => U.$("#globalSearch").focus(), 80); });
    const inp = U.$("#globalSearch");
    inp && inp.addEventListener("input", U.throttle(() => VIEWS.search.run(inp.value), 180));
    inp && inp.addEventListener("keydown", e => { if (e.key === "Enter") VIEWS.search.run(inp.value); });
    DOC.addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); UI.sheet.open("#sheetSearch"); setTimeout(() => U.$("#globalSearch").focus(), 60); } });
  },
  run(q) {
    q = (q || "").trim().toLowerCase();
    const box = U.$("#globalSearchResults"); U.clear(box);
    if (!q) { box.appendChild(U.el("div", { class: "small muted", text: "عنوان کار، یادداشت، یادآور یا مناسبت را بنویسید." })); return; }
    const hits = [];
    ORG.cache.tasks.filter(t => t.title.toLowerCase().includes(q)).slice(0, 10).forEach(t => hits.push({ icon: "✓", title: t.title, meta: (t.due ? "سررسید " + U.num(t.due) : "") + (t.done ? " · انجام‌شده" : ""), go: () => { UI.setActive("tools"); TOOLS.show("tasks"); } }));
    ORG.cache.notes.filter(n => (n.title + " " + n.body).toLowerCase().includes(q)).slice(0, 10).forEach(n => hits.push({ icon: "📝", title: n.title || "یادداشت", meta: (n.body || "").slice(0, 60), go: () => { UI.setActive("tools"); TOOLS.show("notes"); } }));
    ORG.cache.reminders.filter(r => r.title.toLowerCase().includes(q)).slice(0, 8).forEach(r => hits.push({ icon: "⏰", title: r.title, meta: U.num(new Date(r.when).toLocaleString("fa-IR", { hour12: false })), go: () => { UI.setActive("tools"); TOOLS.show("reminders"); } }));
    OCC.search(q).slice(0, 10).forEach(o => { if (o.jMonth) { const info = CAL.dateInfo(APP.todayDayNo()); const dn = CAL.dayFromJal(info.jy, o.jMonth, o.jDay); hits.push({ icon: o.holiday ? "🎌" : "📅", title: o.title, meta: U.num(o.jDay) + " " + CAL.J_MONTHS[o.jMonth - 1], go: () => { if (dn) VIEWS.calendar.select(dn); UI.setActive("calendar"); } }); } else hits.push({ icon: "📅", title: o.title, meta: "قمری/میلادی", go: () => UI.setActive("calendar") }); });
    if (!hits.length) { box.appendChild(U.el("div", { class: "empty", text: "موردی پیدا نشد برای «" + q + "»" })); return; }
    hits.forEach(h => {
      const b = U.el("button", { class: "item", style: "width:100%;text-align:right;cursor:pointer;background:var(--glass);color:var(--fg);border:1px solid var(--border);font:inherit" });
      b.appendChild(U.el("span", { text: h.icon, style: "font-size:15px" }));
      b.appendChild(U.el("div", { style: "flex:1" }, [U.el("p", { class: "item-title", text: h.title }), h.meta ? U.el("div", { class: "item-meta" }, [U.el("span", { text: h.meta })]) : null]));
      b.addEventListener("click", () => { UI.sheet.close("#sheetSearch"); h.go(); });
      box.appendChild(b);
    });
  }
};

/* ---------------------------------------------------------------
   MODULE 18 · settings view wiring + data export/import
   --------------------------------------------------------------- */
VIEWS.settings = {
  init() {
    U.$$("[data-theme-btn]").forEach(b => b.addEventListener("click", () => { SET.data.theme = b.dataset.themeBtn; SET.save(); UI.applyTheme(); VIEWS.settings.paint(); VIEWS.home.render(); }));
    U.$$("[data-accent-btn]").forEach(b => b.addEventListener("click", () => { SET.data.accent = b.dataset.accentBtn; SET.save(); UI.applyTheme(); VIEWS.settings.paint(); }));
    const pd = U.$("#setPersianDigits"); if (pd) { pd.checked = SET.data.persianDigits !== false; pd.addEventListener("change", () => { SET.data.persianDigits = pd.checked; SET.save(); UI.applyTheme(); VIEWS.settings.paint(); VIEWS.home.render(); VIEWS.owqat.render(); VIEWS.calendar.render(); }); }
    const mo = U.$("#setMotion"); if (mo) { mo.value = SET.data.motion || "medium"; mo.addEventListener("change", () => { SET.data.motion = mo.value; SET.save(); UI.applyTheme(); UI.toast("انیمیشن", { low: "حالت کم: افکت‌های تزئینی خاموش — روان‌ترین حالت", medium: "حالت متوسط", high: "حالت زیاد: همهٔ افکت‌ها فعال" }[mo.value]); }); }
    U.$("#btnSettingsLocate") && U.$("#btnSettingsLocate").addEventListener("click", () => GEO.locate(true));
    U.$("#btnSettingsOwqat") && U.$("#btnSettingsOwqat").addEventListener("click", () => { UI.setActive("owqat"); setTimeout(() => VIEWS.owqat.openAdjust(), 200); });
    U.$("#btnExportAll") && U.$("#btnExportAll").addEventListener("click", () => PWA.exportJSON("fetros-backup-" + new Date().toISOString().slice(0, 10) + ".json"));
    U.$("#importFile") && U.$("#importFile").addEventListener("change", (e) => PWA.importFile(e.target.files && e.target.files[0]));
    U.$("#btnClearAll") && U.$("#btnClearAll").addEventListener("click", () => PWA.clearAll());
    U.$("#btnCheckUpdate") && U.$("#btnCheckUpdate").addEventListener("click", () => PWA.checkUpdate(true));
    U.$("#btnNotifySettings") && U.$("#btnNotifySettings").addEventListener("click", () => NOTIFY.request(!SET.data.notifications));
    const ver = U.$("#appVersion"); if (ver) ver.textContent = "نسخه " + U.num((CFG.app && CFG.app.version) || "۲٫۰") + " · دادهٔ مناسبت " + (OCC.meta ? OCC.meta.version : "—");
    VIEWS.settings.paint();
  },
  paint() {
    U.$$("[data-theme-btn]").forEach(b => b.classList.toggle("active", b.dataset.themeBtn === SET.data.theme));
    U.$$("[data-accent-btn]").forEach(b => b.classList.toggle("active", b.dataset.accentBtn === SET.data.accent));
    const city = SET.getCity();
    const cEl = U.$("#settingsCity"); if (cEl) cEl.textContent = (SET.data.geo ? "📍 " : "🏙 ") + city.name;
    const co = U.$("#settingsCoords"); if (co) co.textContent = U.num(city.lat.toFixed(3)) + "، " + U.num(city.lng.toFixed(3)) + (SET.data.geo && SET.data.geo.accuracy ? " · دقت " + U.num(SET.data.geo.accuracy) + "m" : "") + " · متد " + (PRAY.METHODS[SET.data.method] || {}).label;
    const pd = U.$("#setPersianDigits"); if (pd) pd.checked = SET.data.persianDigits !== false;
    const mo = U.$("#setMotion"); if (mo) mo.value = SET.data.motion || "medium";
  }
};
VIEWS.settings.init2 = function () { VIEWS.settings.paint(); };

/* ---------------------------------------------------------------
   MODULE 19 · pwa — سرویس‌ورکر، نصب، به‌روزرسانی، پشتیبان‌گیری
   --------------------------------------------------------------- */
const PWA = {};
PWA.deferredInstall = null;
/* داخل APK (Capacitor) فایل‌ها از قبل روی دستگاه‌اند؛ آنجا Service Worker فقط
   نسخهٔ کهنه را نگه می‌دارد و آپدیت را سخت می‌کند، پس غیرفعال است. */
PWA.native = !!(WIN && (WIN.Capacitor || /^(capacitor|ionic):/i.test((WIN.location && WIN.location.protocol) || "")));
PWA.init = function () {
  if (PWA.native) {
    PWA.mode = "native";
    UI.setNetStatus(WIN.navigator.onLine !== false);
    const t = U.$("#statusText"); if (t) t.textContent = "نسخهٔ APK — فایل‌ها داخل برنامه‌اند، آفلاین همیشه کار می‌کند";
    const note = U.$("#pwaModeNote");
    if (note) note.textContent = "این نسخه APK است: همهٔ فایل‌ها داخل برنامه کپی شده‌اند، پس بدون اینترنت هم باز می‌شود و نیازی به «Install app» یا سرویس‌ورکر نیست. برای به‌روزرسانی، APK تازه را روی همین نصب نصب کنید — داده‌هایتان می‌ماند.";
    const b = U.$("#btnInstall"); if (b) b.classList.add("hidden");
    const upd = U.$("#btnCheckUpdate"); if (upd) upd.textContent = "چطور به‌روز کنم؟";
    UI.initConnectivity();
    return;
  }
  PWA.mode = "web";
  if (!WIN.navigator.serviceWorker) { UI.toast("PWA", "مرورگر Service Worker ندارد؛ آفلاین‌بودن محدود می‌شود", "warn"); return; }
  if (location.protocol === "file:") { UI.toast("هشدار", "باز کردن با file:// باعث می‌شود PWA و کش کار نکند. از HTTPS یا localhost استفاده کنید.", "sticky"); }
  WIN.navigator.serviceWorker.register("sw.js").then(reg => {
    PWA.reg = reg;
    reg.addEventListener("updatefound", () => {
      const nw = reg.installing; if (!nw) return;
      nw.addEventListener("statechange", () => {
        if (nw.state === "installed" && WIN.navigator.serviceWorker.controller) PWA.offerUpdate();
      });
    });
    if (reg.waiting) PWA.offerUpdate();
    setInterval(() => { try { reg.update(); } catch (e) {} }, 6 * 3600 * 1000);
  }).catch(err => console.warn("[fetros] SW registration failed:", err));
  WIN.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); PWA.deferredInstall = e; const b = U.$("#btnInstall"); if (b) { b.classList.remove("hidden"); b.addEventListener("click", async () => { b.disabled = true; try { e.prompt(); const r = await e.userChoice; if (r && r.outcome === "accepted") UI.toast("نصب", "در حال نصب…", "ok"); } catch (err) {} b.classList.add("hidden"); }, { once: true }); } });
  WIN.addEventListener("appinstalled", () => { UI.toast("فطرس", "به برنامه‌ها اضافه شد ✓"); const b = U.$("#btnInstall"); if (b) b.classList.add("hidden"); });
  UI.initConnectivity();
};
UI.initConnectivity = function () {
  if (UI._conn) return; UI._conn = 1;
  WIN.addEventListener("online", () => { UI.setNetStatus(true); VIEWS.home.render(); UI.toast("آنلاین", "دوباره به اینترنت وصل شدید — آب‌وهوا و به‌روزرسانی فعال است."); });
  WIN.addEventListener("offline", () => {
    UI.setNetStatus(false);
    UI.toast("آفلاین", "اینترنت قطع شد — تقویم، ذکر، یادداشت‌ها و اوقات شرعی کار می‌کنند؛ فقط آب‌وهوا متوقف می‌شود.");
  });
};
PWA.offerUpdate = function () {
  if (PWA._updateShown) return; PWA._updateShown = true;
  const t = UI.toast("نسخهٔ جدید آماده است", "برای دریافت تغییرات، برنامه را تازه کنید.", "sticky");
  const btn = U.el("button", { class: "btn btn-primary btn-sm", text: "به‌روزرسانی", onclick: () => { t.kill(); if (PWA.reg && PWA.reg.waiting) { PWA.reg.waiting.postMessage({ type: "SKIP_WAITING" }); } WIN.location.reload(); } });
  t.actions.insertBefore(btn, t.actions.firstChild);
};
PWA.checkUpdate = async function (manual) {
  if (PWA.native) { UI.toast("به‌روزرسانی", "در نسخهٔ APK، به‌روزرسانی با نصب کردن فایل APK تازه انجام می‌شود (رویکرد همان نصب؛ داده‌ها پاک نمی‌شوند)."); return; }
  if (!PWA.reg) { UI.toast("بررسی", "سرویس‌ورکر ثبت نشده است", "warn"); return; }
  try { await PWA.reg.update(); UI.toast("بررسی به‌روزرسانی", "بررسی شد. اگر نسخهٔ جدیدی باشد، پیام «به‌روزرسانی» را می‌بینید."); }
  catch (e) { UI.toast("بررسی به‌روزرسانی", "ناموفق: " + (e && e.message || ""), "warn"); }
};
PWA.exportJSON = function (filename) {
  DB.dump().then(data => {
    const payload = { app: "fetros", kind: "backup", version: (CFG.app && CFG.app.version) || "2.0.0", schema: 2, exportedAt: new Date().toISOString(), settings: SET.data, data };
    if (filename && filename.indexOf("tasks") > -1) { payload.kind = "tasks"; payload.data = { tasks: data.tasks }; }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = U.el("a", { href: URL.createObjectURL(blob), download: filename || "fetros-backup.json" });
    DOC.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1200);
    UI.toast("خروجی آماده شد", filename + " در پوشهٔ دانلودها");
  });
};
PWA.importFile = function (file) {
  if (!file) return;
  const rd = new FileReader();
  rd.onerror = () => UI.toast("ورود", "خواندن فایل ممکن نشد", "warn");
  rd.onload = () => {
    let obj = null;
    try { obj = JSON.parse(String(rd.result)); } catch (e) { UI.toast("ورود رد شد", "فایل JSON معتبر نیست.", "warn"); return; }
    const err = PWA.validate(obj);
    if (err) { UI.toast("ورود رد شد", err, "warn"); return; }
    UI.confirm("ورود اطلاعات", "فایل معتبر است. " + Object.keys(obj.data).map(k => k + ": " + (obj.data[k] || []).length).join("، ") + ". با ورود، داده‌های فعلی جایگزین می‌شوند. ادامه می‌دهید؟").then(ok => {
      if (!ok) return;
      DB.clearAll().then(() => DB.restore(obj.data)).then(n => {
        if (obj.settings) { SET.data = Object.assign(SET.data, obj.settings); SET.save(); UI.applyTheme(); }
        ORG.reload().then(() => { VIEWS.settings.paint(); VIEWS.owqat.render(); });
        UI.toast("ورود انجام شد", U.num(n) + " رکورد بازیابی شد");
      });
    });
  };
  rd.readAsText(file);
};
PWA.validate = function (o) {
  if (!o || typeof o !== "object") return "ساختار فایل نامشخص است.";
  if (o.app !== "fetros") return "این فایل پشتیبان فطرس نیست.";
  if (!o.data || typeof o.data !== "object") return "بخش data وجود ندارد.";
  const allowed = ["tasks","notes","reminders","birthdays","meds","medlogs","dhikr"];
  for (const k of Object.keys(o.data)) {
    if (allowed.indexOf(k) === -1) return "بخش ناشناخته: " + k;
    if (!Array.isArray(o.data[k])) return k + " باید آرایه باشد.";
    for (const it of o.data[k]) { if (!it || typeof it !== "object" || typeof it.id !== "string") return "رکورد نامعتبر در " + k; }
  }
  if (o.settings && typeof o.settings !== "object") return "بخش settings نامعتبر است.";
  return null;
};
PWA.clearAll = async function () {
  if (!(await UI.confirm("پاک کردن همهٔ داده‌ها", "کارها، یادداشت‌ها، یادآورها، تولدها، داروها و تاریخچهٔ ذکر حذف می‌شوند. این عمل بازگشت‌ناپذیر است."))) return;
  if (!(await UI.confirm("مطمئنید؟", "پیشنهاد می‌شود اول «خروجی JSON» بگیرید."))) return;
  await DB.clearAll();
  FS.clear();
  U.lsDel("fetros.weather.cache");
  ORG.cache = { tasks: [], notes: [], reminders: [], birthdays: [] };
  DHIKR.count = 0; SET.data.dhikr.count = 0; SET.data.quickNote = ""; SET.save();
  ORG.syncPersonal(); VIEWS.settings.paint(); VIEWS.home.render(); ORG.renderAll(); DHIKR.loadHistory(); DHIKR.paint();
  UI.toast("پاک شد", "همهٔ داده‌های شخصی حذف شدند (تنظیمات ظاهری ماند).");
};

/* ---------------------------------------------------------------
   MODULE 20 · boot — راه‌اندازی
   --------------------------------------------------------------- */
const TICKER = {};
TICKER.start = function () {
  clearInterval(TICKER._t);
  TICKER._t = setInterval(() => {
    try {
      if (DOC.hidden) return;
      VIEWS.home.tickCountdown();
      NOTIFY.tick();
      ORG.checkDue();
      MEDS.tick();
    } catch (e) { console.warn("[fetros] ticker", e); }
  }, 1000);
  setInterval(() => { try { WEATHER.maybeRefresh(); } catch (e) {} }, 10 * 60000);
};
ORG.checkDue = U.throttle(function () {
  const now = Date.now();
  ORG.cache.reminders.forEach(r => {
    const key = new Date(r.when).toString();
    if (r.when <= now && r.firedFor !== key) {
      r.firedFor = key; DB.put("reminders", r);
      NOTIFY.show("فطرس · یادآور", r.title);
      UI.toast("یادآور", r.title);
      if (SET.data.vibration) try { WIN.navigator.vibrate && WIN.navigator.vibrate([25, 40, 25]); } catch (e) {}
      if (r.repeat && r.repeat !== "none") { r.when = ORG.advance(r.when, r.repeat); DB.put("reminders", r); }
      ORG.render("reminders"); VIEWS.home.render();
    }
  });
}, 3000);

const APP_BOOT = {};
APP_BOOT.run = async function () {
  SET.load();
  // respect OS theme on first run
  if (!U.lsGet(SET_KEY, null) && U.mq("(prefers-color-scheme: light)").matches) SET.data.theme = "light";
  if (U.reducedMotion() && SET.data.motion === "medium") SET.data.motion = "low";
  UI.applyTheme();
  OCC.load();
  await DB.open();
  U.$("#brandHome") && U.$("#brandHome").addEventListener("click", e => { e.preventDefault(); UI.setActive("home"); });
  U.$("#btnSettings") && U.$("#btnSettings").addEventListener("click", () => UI.setActive("settings"));
  U.$("#btnNotify") && U.$("#btnNotify").addEventListener("click", () => {
    const n = WIN.__fetrosAgendaCount || 0;
    if (!n) { UI.toast("امروز", "چیز عقب‌افتاده یا در شرف سررسیدی نیست ✓"); UI.setActive("home"); return; }
    UI.toast("امروز", U.num(n) + " مورد در انتظار شما — یادآورها و کارها باز می‌شود");
    UI.setActive("tools"); TOOLS.show("reminders");
  });
  VIEWS.calendar.init();
  VIEWS.owqat.init();
  TOOLS.init();
  DHIKR.init();
  VIEWS.settings.init();
  VIEWS.search.init();
  UI.initFab();
  UI.initNav();
  UI.initParallax();
  UI.initVisibility();
  UI.setNetStatus();
  UI.initConnectivity();
  if (SND.init) SND.init();
  UI.startClock();
  MEDS.load().then(() => MEDS.render());
  await ORG.reload();
  VIEWS.owqat.render();
  VIEWS.home.render();
  VIEWS.calendar.fillToday();
  // deep link / shortcuts
  const params = new URLSearchParams(WIN.location.search);
  const hash = WIN.location.hash || "";
  if (params.get("action") === "new-note") { UI.setActive("tools"); TOOLS.show("notes"); setTimeout(() => U.$("#noteBody").focus(), 350); }
  else if (params.get("action") === "new-reminder") { UI.setActive("tools"); TOOLS.show("reminders"); setTimeout(() => U.$("#remTitle").focus(), 350); }
  else if (hash === "#owqat") UI.setActive("owqat");
  else if (hash === "#calendar") UI.setActive("calendar");
  else if (hash === "#tools") UI.setActive("tools");
  else if (hash === "#settings") UI.setActive("settings");
  else { const last = U.lsGet("fetros.lastView", "home"); UI.setActive(["home","calendar","owqat","tools","settings"].includes(last) ? last : "home"); }
  WIN.addEventListener("hashchange", () => { const h = (WIN.location.hash || "").replace("#", ""); if (["home","calendar","owqat","tools","settings"].includes(h)) UI.setActive(h); });
  UI.revealer.init();
  UI.initSplash();
  PWA.init();
  TICKER.start();
  UI.booted = true;
  setTimeout(() => UI.finishSplash && UI.finishSplash(false), 260);
  UI.paintAgendaBadge();
  if (TESTS) TESTS.autoRunOnHash();
};

/* ---------------------------------------------------------------
   MODULE 21 · tests — آزمون‌های واحد تقویم (اجرا با #test در آدرس)
   --------------------------------------------------------------- */
const TESTS = { results: [], passed: 0, failed: 0 };
TESTS.eq = function (name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  TESTS.results.push({ name, ok, got, want });
  if (ok) TESTS.passed++; else TESTS.failed++;
  return ok;
};
TESTS.run = function () {
  TESTS.results = []; TESTS.passed = 0; TESTS.failed = 0;
  OCC.load && OCC.load();
  // 1) known Gregorian ⇄ Jalaali pairs
  TESTS.eq("2026-10-19 → 1405/07/27", CAL.gregToJal(2026, 10, 19), { jy: 1405, jm: 7, jd: 27 });
  TESTS.eq("Nowruz 1404", CAL.gregToJal(2025, 3, 21), { jy: 1404, jm: 1, jd: 1 });
  TESTS.eq("Nowruz 1403", CAL.gregToJal(2024, 3, 20), { jy: 1403, jm: 1, jd: 1 });
  TESTS.eq("Nowruz 1405", CAL.gregToJal(2026, 3, 21), { jy: 1405, jm: 1, jd: 1 });
  TESTS.eq("1404/01/01 → 2025-03-21", CAL.jalToGreg(1404, 1, 1), { gy: 2025, gm: 3, gd: 21 });
  TESTS.eq("1399 leap → Esfand 30", CAL.jalaaliMonthLength(1399, 12), 30);
  TESTS.eq("1403 leap → Esfand 30", CAL.jalaaliMonthLength(1403, 12), 30);
  TESTS.eq("1404 not leap → Esfand 29", CAL.jalaaliMonthLength(1404, 12), 29);
  TESTS.eq("1403 isLeap flag", CAL.isJalaaliLeap(1403), true);
  TESTS.eq("1404 isLeap flag", CAL.isJalaaliLeap(1404), false);
  // 2) Esfand 29/30 boundary
  TESTS.eq("30 Esfand 1403 → 2025-03-20", CAL.jalToGreg(1403, 12, 30), { gy: 2025, gm: 3, gd: 20 });
  TESTS.eq("29 Esfand 1404 → 2026-03-20", CAL.jalToGreg(1404, 12, 29), { gy: 2026, gm: 3, gd: 20 });
  // 3) year boundary round trip
  let rt = 0, n = 0;
  for (let d = CAL.dayFromGreg(2020, 3, 19); d < CAL.dayFromGreg(2027, 3, 21); d += 13) {
    const j = CAL.gregToJal(...Object.values(CAL.gregFromDay(d))); n++;
    const back = CAL.jalToGreg(j.jy, j.jm, j.jd); const bd = CAL.dayFromGreg(back.gy, back.gm, back.gd);
    if (bd === d) rt++;
  }
  TESTS.eq("jalaali round-trip 2020-2027 (all samples)", rt, n);
  // 4) Hijri known anchors + Intl agreement sample
  TESTS.eq("1 Muharram AH 1 = 622-07-19 Gregorian", (() => { const g = CAL.gregFromDay(CAL.hijriToDay(1, 1, 1)); return [g.gy, g.gm, g.gd]; })(), [622, 7, 19]);
  TESTS.eq("2026-10-19 → 1448/05/07 (civil)", (() => { const h = CAL.dayToHijri(CAL.dayFromGreg(2026, 10, 19)); return [h.hy, h.hm, h.hd]; })(), [1448, 5, 7]);
  TESTS.eq("2025-06-26 → 1446/12/29 (civil)", (() => { const h = CAL.dayToHijri(CAL.dayFromGreg(2025, 6, 26)); return [h.hy, h.hm, h.hd]; })(), [1446, 12, 29]);
  TESTS.eq("2027-03-10 → 1448/10/01 (civil)", (() => { const h = CAL.dayToHijri(CAL.dayFromGreg(2027, 3, 10)); return [h.hy, h.hm, h.hd]; })(), [1448, 10, 1]);
  // Intl cross-check over 400 weekly steps
  if (typeof Intl !== "undefined") {
    let ok = 0, tot = 0;
    let f = null; try { f = new Intl.DateTimeFormat("en-u-ca-islamic-civil", { year: "numeric", month: "numeric", day: "numeric", timeZone: "UTC" }); } catch (e) {}
    if (f) {
      for (let d = CAL.dayFromGreg(2020, 1, 1); d < CAL.dayFromGreg(2027, 1, 1); d += 7) {
        tot++; const t = new Date(d * 86400000); const p = f.formatToParts(t); const g = x => +p.find(q => q.type === x).value;
        const h = CAL.dayToHijri(d);
        if (h.hy === g("year") && h.hm === g("month") && h.hd === g("day")) ok++;
      }
      TESTS.eq("hijri matches Intl islamic-civil (" + tot + " samples)", ok, tot);
    } else TESTS.results.push({ name: "Intl islamic-civil unavailable (fallback tabular only)", ok: true, got: "n/a", want: "n/a" }), TESTS.passed++;
  }
  // 5) hijri round trip
  let hOk = 0, hTot = 0;
  for (let d = CAL.dayFromGreg(2024, 1, 1); d < CAL.dayFromGreg(2026, 12, 31); d++) { const h = CAL.dayToHijri(d); hTot++; if (CAL.hijriToDay(h.hy, h.hm, h.hd) === d) hOk++; }
  TESTS.eq("hijri round-trip 2024-2026", hOk, hTot);
  (() => { let allOk = true; for (let hy = 1430; hy <= 1460; hy++) { let s = 0; for (let m = 1; m <= 12; m++) s += CAL.hijriMonthLength(hy, m); if (s !== (CAL.hijriToDay(hy + 1, 1, 1) - CAL.hijriToDay(hy, 1, 1))) allOk = false; } TESTS.eq("hijri: Σ month lengths = year length (AH 1430-1460)", allOk, true); })();
  // 6) prayer times sanity for Tehran
  const tz = 3.5;
  const pt = PRAY.compute({ lat: 35.6892, lng: 51.3890, tz, date: new Date(2026, 9, 19), method: "Tehran", asr: "Standard", adjust: {}, polarRule: "none" });
  const inRange = (h, a, b) => h != null && h >= a && h <= b;
  TESTS.eq("Tehran 2026-10-19 sunrise ≈ 06:15", PRAY.toClock(pt.sunrise).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)), "06:14");
  TESTS.eq("Tehran dhuhr before asr", pt.dhuhr < pt.asr, true);
  TESTS.eq("Tehran asr before sunset", pt.asr < pt.sunset, true);
  TESTS.eq("Tehran fajr before sunrise", pt.fajr < pt.sunrise, true);
  TESTS.eq("Tehran isha after sunset", pt.isha > pt.sunset, true);
  TESTS.eq("Tehran day length sane (10-12h)", (pt.sunset - pt.sunrise) > 10 && (pt.sunset - pt.sunrise) < 12, true);
  TESTS.eq("Tehran mid-Oct sunrise window", inRange(pt.sunrise, 6.0, 6.6), true);
  // 7) Hanafi asr later than standard
  const ph = PRAY.compute({ lat: 35.6892, lng: 51.3890, tz, date: new Date(2026, 9, 19), method: "Tehran", asr: "Hanafi", adjust: {}, polarRule: "none" });
  TESTS.eq("Hanafi asr later than standard", ph.asr > pt.asr, true);
  // 8) per-prayer adjustment applies
  const pa = PRAY.compute({ lat: 35.6892, lng: 51.3890, tz, date: new Date(2026, 9, 19), method: "Tehran", asr: "Standard", adjust: { dhuhr: 2 }, polarRule: "none" });
  TESTS.eq("+2min adjust on dhuhr", Math.abs((pa.dhuhr - pt.dhuhr) * 60 - 2) < 0.001, true);
  // 9) southern hemisphere inversion (summer day longer)
  const pS = PRAY.compute({ lat: -33.8688, lng: 151.2093, tz: 11, date: new Date(2026, 11, 22), method: "MWL", asr: "Standard", adjust: {}, polarRule: "none" });
  TESTS.eq("Sydney 22 Dec: day > night", (pS.sunset - pS.sunrise) > 12, true);
  // 10) polar: London mid-June has no 18° fajr (degraded, not fabricated)
  const pL = PRAY.compute({ lat: 51.5074, lng: -0.1278, tz: 1, date: new Date(2026, 5, 21), method: "MWL", asr: "Standard", adjust: {}, polarRule: "none" });
  TESTS.eq("London 21 Jun: fajr undefined without polar rule (never fabricated)", pL.fajr == null && pL.meta.polarApplied === false, true);
  const pL2 = PRAY.compute({ lat: 51.5074, lng: -0.1278, tz: 1, date: new Date(2026, 5, 21), method: "MWL", asr: "Standard", adjust: {}, polarRule: "seventh" });
  TESTS.eq("London 21 Jun: polar rule fills fajr", pL2.fajr != null, true);
  // 11) qibla bearings (reference values: commonly published to 0.1°)
  TESTS.eq("Qibla from Tehran ≈ 218.4°", QIBLA.bearing(35.6892, 51.3890).toFixed(1), "218.4");
  TESTS.eq("Qibla from London ≈ 119°", Math.round(QIBLA.bearing(51.5074, -0.1278)), 119);
  TESTS.eq("Qibla from Isfahan ≈ 226°", Math.round(QIBLA.bearing(32.6546, 51.6680)), 226);
  TESTS.eq("Qibla from Mashhad ≈ 235°", Math.round(QIBLA.bearing(36.2605, 59.6168)), 235);
  TESTS.eq("Qibla from Cairo ≈ 136°", Math.round(QIBLA.bearing(30.0444, 31.2357)), 136);
  // 12b) polar rule must not fire when disabled, and midnight = midpoint of shifted times
  { const pm = PRAY.compute({ lat: 51.5074, lng: -0.1278, tz: 1, date: new Date(2026, 5, 21), method: "MWL", asr: "Standard", adjust: {}, polarRule: "none" });
    TESTS.eq("midnight = midpoint(sunset→sunrise)", Math.abs(U.fixHour(pm.sunset + U.fixHour(pm.sunrise + 24 - pm.sunset) / 2) - pm.midnight) < 1e-9, true); }
  // 12) digits + calendar weekday grid
  U.setDigits(true); TESTS.eq("Persian digits", U.num("2026-10-19"), "۲۰۲۶-۱۰-۱۹");
  U.setDigits(false); TESTS.eq("Latin digits", U.num(1405), "1405");
  U.setDigits(true);
  const gm2 = CAL.jalMonthGrid(1405, 1);
  TESTS.eq("1 Farvardin 1405 = Saturday 2026-03-21 (0 lead in Sat-first grid)", gm2.firstDow, 6);
  TESTS.eq("Farvardin 1405 has 31 cells in month", gm2.cells.filter(c => c.inMonth).length, 31);
  // 13) occasions
  TESTS.eq("occasions loaded", OCC.list.length > 20, true);
  const nowruz = OCC.forDay(CAL.dayFromJal(1405, 1, 1)); TESTS.eq("1 Farvardin has Nowruz", nowruz.some(o => /نوروز/.test(o.title)), true);
  const search = OCC.search("رمضان"); TESTS.eq("search 'رمضان' finds something", search.length > 0, true);
  const sample = OCC.meta && /sample/i.test(OCC.meta.version || ""); TESTS.eq("dataset flagged as sample (honest labelling)", !!sample, true);
  return TESTS.summary();
};
TESTS.summary = function () {
  const out = { passed: TESTS.passed, failed: TESTS.failed, total: TESTS.results.length, results: TESTS.results.slice() };
  console.groupCollapsed("%c[fetros tests] " + out.passed + " passed / " + out.failed + " failed", "color:" + (out.failed ? "#FF7A35" : "#22c55e"));
  TESTS.results.forEach(r => console.log((r.ok ? "✓ " : "✗ ") + r.name + (r.ok ? "" : "  got=" + JSON.stringify(r.got) + " want=" + JSON.stringify(r.want))));
  console.groupEnd();
  return out;
};
TESTS.autoRunOnHash = function () {
  const on = /#test/.test(WIN.location.hash) || WIN.location.search.indexOf("test=1") >= 0;
  if (!on) return;
  const s = TESTS.run();
  const panel = U.el("div", { class: "glass card mt12", style: "border-color:rgba(245,196,81,.35)" });
  panel.appendChild(U.el("div", { class: "title", text: "نتیجهٔ آزمون‌های واحد — " + U.num(s.passed) + " قبول / " + U.num(s.failed) + " رد" }));
  const ul = U.el("div", { class: "list mt8" });
  TESTS.results.forEach(r => ul.appendChild(U.el("div", { class: "item", style: "padding:6px 10px" }, [U.el("span", { text: r.ok ? "✓" : "✗", style: "color:" + (r.ok ? "#22c55e" : "#FF8FA3") }), U.el("span", { class: "small", style: "flex:1", text: r.name + (r.ok ? "" : " got " + JSON.stringify(r.got)) })])));
  panel.appendChild(ul);
  U.$("#view-calendar").insertBefore(panel, U.$("#view-calendar").firstChild.nextSibling);
  UI.setActive("calendar");
};

/* exports for tests / advanced use (browser console + Node harness) */
const GLOBAL = (typeof globalThis !== "undefined") ? globalThis : (WIN || {});
GLOBAL.__FETROS_ENGINE__ = { CFG, U, CAL, PRAY, QIBLA, OCC, SET, DB, UI, VIEWS, TOOLS, ORG, DHIKR, MEDS, WEATHER, PWA, NOTIFY, SND, GEO, TESTS, APP_BOOT, APP };
if (WIN) { WIN.FETROS = GLOBAL.__FETROS_ENGINE__; }

const IS_BROWSER = !!(DOC && WIN && DOC.querySelector && WIN.navigator);
if (IS_BROWSER) {
  const go = () => APP_BOOT.run().catch(e => { console.error("[fetros] boot error", e); UI.forceHideSplash(e && e.message); });
  if (DOC.readyState === "loading") DOC.addEventListener("DOMContentLoaded", go); else go();
}

})();
/* ENGINE:END */
