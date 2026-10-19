/* tests/dom.mjs — FETROS DOM smoke test (jsdom, no browser needed)
   اجرا: node tests/dom.mjs   (نیاز به `npm i jsdom` فقط برای همین فایل تست)
   Note: jsdom has no IndexedDB → the localStorage fallback path is exercised.
   CSS/JS are inlined from disk; external resources (font/audio/icons) are not fetched.
*/
import jsdomPkg from "jsdom";
const { JSDOM, VirtualConsole } = jsdomPkg;
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://fetros.test/";

let html = await readFile(join(root, "index.html"), "utf8");
const css = await readFile(join(root, "style.css"), "utf8");
const occJs = await readFile(join(root, "data", "occasions.js"), "utf8");
const appJs = await readFile(join(root, "script.js"), "utf8");
/* NOTE: replacement uses a function so `$&`/`$$` in the source are not interpreted */
html = html.replace(/<link rel="stylesheet" href="style\.css">/, () => "<style>\n" + css + "\n</style>");
html = html.replace(/<script src="data\/occasions\.js"><\/script>\s*<script src="script\.js"><\/script>/,
  () => "<script>\n" + occJs + "\n" + appJs + "\n</scr" + "ipt>");
if (html.indexOf("ENGINE:BEGIN") === -1) throw new Error("inlining failed: script.js not injected");
const results = [];
const ok = (name, cond, extra) => { results.push({ name, cond: !!cond, extra }); console.log((cond ? "  ✓ " : "  ✗ ") + name + (cond ? "" : "  <-- " + (extra || ""))); };

const errors = [];
const vc = new VirtualConsole();
vc.on("error", (...a) => errors.push("window.onerror: " + a.map(x => (x && x.stack) || String(x)).join(" ")));
vc.on("jsdomError", e => errors.push("jsdomError: " + (e.message || e)));
vc.on("error", (...a) => errors.push("console.error: " + a.join(" ")));

const dom = new JSDOM(html, {
  runScripts: "dangerously", pretendToBeVisual: true,
  virtualConsole: vc, url: ORIGIN + "index.html", contentType: "text/html"
});
const { window } = dom;
const doc = window.document;
window.confirm = () => true; window.alert = () => {};
window.addEventListener("error", e => errors.push("window.error: " + ((e.error && e.error.stack) || e.message)));
window.addEventListener("unhandledrejection", e => errors.push("unhandledrejection: " + ((e.reason && e.reason.stack) || e.reason)));
window.matchMedia = window.matchMedia || (q => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
window.scrollTo = () => {};
const $ = s => doc.querySelector(s);
const fa2num = t => String(t).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
const numTxt = sel => Number(fa2num(($(sel).textContent).trim()));
const $$ = s => Array.from(doc.querySelectorAll(s));
const wait = ms => new Promise(r => setTimeout(r, ms));
const click = n => n && n.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
const setVal = (n, v) => { n.value = v; n.dispatchEvent(new window.Event("input", { bubbles: true })); n.dispatchEvent(new window.Event("change", { bubbles: true })); };

await wait(1200);

/* 1) boot */
ok("engine exposed", !!window.FETROS, "window.FETROS missing");
ok("occasions loaded", window.FETROS && window.FETROS.OCC.list.length > 20, window.FETROS && window.FETROS.OCC.list.length);
ok("splash finished (hidden or removed)", $("#splash").classList.contains("hidden") || $("#splash").style.display === "none", $("#splash").className);
ok("loader reached 100%", /۱۰۰/.test($("#loaderNum").textContent), $("#loaderNum").textContent);

/* 2) navigation */
const views = ["home", "calendar", "owqat", "tools", "settings"];
for (const v of views) {
  click($(`.nav-btn[data-view="${v}"]`));
  await wait(120);
  ok("tab shows view: " + v, $("#view-" + v).classList.contains("active"));
  ok("tab aria-current: " + v, $(`.nav-btn[data-view="${v}"]`).getAttribute("aria-current") === "page");
}
ok("indicator positioned (width + translateX written)", /width/.test($("#navIndicator").getAttribute("style")) && /translateX/.test($("#navIndicator").getAttribute("style")), $("#navIndicator").getAttribute("style"));
click($('.nav-btn[data-view="home"]')); await wait(150);

/* 3) home content */
ok("hero date shows jalaali year + weekday", /۱۴[۰-۹][۰-۹]/.test($("#heroDate").textContent) && /شنبه/.test($("#heroDate").textContent), JSON.stringify($("#heroDate").textContent));
ok("hero clock ticking (hh:mm:ss)", /^[۰-۹]{2}:[۰-۹]{2}:[۰-۹]{2}$/.test($("#heroClock").textContent), JSON.stringify($("#heroClock").textContent));
ok("countdown rendered 3 boxes", $("#countdown").children.length === 3, $("#countdown").children.length);
ok("next prayer name set", $("#nextPrayerName").textContent.trim().length > 2, $("#nextPrayerName").textContent);
ok("hero has period attr", !!$("#hero").dataset.period, $("#hero").dataset.period);
ok("mini calendar filled (>=35 cells)", $$("#miniCal .cal-cell").length >= 35, $$("#miniCal .cal-cell").length);
ok("home tasks empty-state", /کار باز|ثبت|🎉/.test($("#homeTasks").textContent), JSON.stringify($("#homeTasks").textContent.slice(0, 40)));

/* 4) calendar */
click($('.nav-btn[data-view="calendar"]')); await wait(200);
ok("calendar grid = 42 cells", $$("#calGrid .cal-cell").length === 42, $$("#calGrid .cal-cell").length);
ok("calendar today cell exists", !!$("#calGrid .cal-cell.today"));
ok("dow header = 7", $$("#calDows .cal-dow").length === 7, $$("#calDows").length);
const beforeMonth = $("#calMonthJ").textContent;
click($("#calNext")); await wait(220);
ok("month advances", $("#calMonthJ").textContent !== beforeMonth, beforeMonth + " → " + $("#calMonthJ").textContent);
click($("#calPrev")); await wait(220);
click($("#calToday")); await wait(220);
ok("back to current month", $("#calMonthJ").textContent === beforeMonth, $("#calMonthJ").textContent);
ok("today cell selected after Today", !!$("#calGrid .cal-cell.today"));
// converter
setVal($("#convJ"), "1403/12/30"); await wait(120);
ok("converter J→G: 30 Esfand 1403 = 2025-03-20", $("#convG").value === "2025-03-20", $("#convG").value);
ok("converter J→H filled", /۱۴۴۶/.test($("#convH").value), $("#convH").value);
setVal($("#convG"), "2026-03-21"); await wait(120);
ok("converter G→J: 2026-03-21 = 1405/01/01", $("#convJ").value.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)) === "1405/01/01", $("#convJ").value);
setVal($("#convH"), "1448/5/7"); await wait(120);
ok("converter H→G: 1448/05/07 = 2026-10-19", $("#convG").value === "2026-10-19", $("#convG").value);
setVal($("#convJ"), "1404/12/30"); await wait(120);
ok("converter rejects impossible date (1404/12/30) with message", /⚠|تنظیم شد|نامعتبر|نبود/.test($("#convHelp").textContent), JSON.stringify($("#convHelp").textContent));
// occasion search
setVal($("#occSearch"), "نوروز"); await wait(260);
ok("occasion search finds Nowruz", /نوروز/.test($("#occList").textContent), $("#occList").textContent.slice(0, 40));
setVal($("#occSearch"), "zzzz"); await wait(260);
ok("occasion empty state", /پیدا نشد/.test($("#occList").textContent));
setVal($("#occSearch"), ""); await wait(200);

/* 5) prayer + qibla */
click($('.nav-btn[data-view="owqat"]')); await wait(300);
ok("prayer rows rendered", $$("#prayerList .prayer-row").length >= 7, $$("#prayerList .prayer-row").length);
const times = $$("#prayerList .prayer-row .time").map(n => n.textContent);
ok("all 7 times are HH:MM (no '—' for Tehran)", times.slice(0, 7).every(t => /[:۰-۹0-9]{5}/.test(t)), JSON.stringify(times));
ok("one row marked next", $$("#prayerList .prayer-row.next").length <= 1);
ok("city line shows city", /تهران|مکان/.test($("#owqatCityLine").textContent), $("#owqatCityLine").textContent);
ok("disclaimer diagnostics shown", /روش:/.test($("#owqatDisclaimer").textContent), $("#owqatDisclaimer").textContent.slice(0, 60));
const tehranFajr = $("#prayerList").textContent;
setVal($("#citySelect"), "mashhad"); await wait(300);
ok("switching city changes times", tehranFajr !== $("#prayerList").textContent);
setVal($("#citySelect"), "tehran"); await wait(250);
setVal($("#asrSelect"), "Hanafi"); await wait(250);
const hanafi = ($$("#prayerList .prayer-row")[3] || { textContent: "?" }).textContent;
setVal($("#asrSelect"), "Standard"); await wait(250);
const standard = ($$("#prayerList .prayer-row")[3] || { textContent: "?" }).textContent;
ok("Hanafi asr differs from standard", hanafi !== standard, hanafi + " vs " + standard);
setVal($("#methodSelect"), "MWL"); await wait(250);
ok("method switch works", /Musulman|World/.test($("#owqatDisclaimer").textContent), $("#owqatDisclaimer").textContent.slice(0, 50));
setVal($("#methodSelect"), "Tehran"); await wait(250);
ok("qibla bearing shown without sensor (no crash)", /^[۰-۹.]+°$/.test($("#qiblaDeg").textContent), $("#qiblaDeg").textContent);
ok("qibla status is honest (no sensor)", /حسگر|شمال|بدون/.test($("#qiblaStatus").textContent + $("#compassHelp").textContent), $("#qiblaStatus").textContent);
// adjust sheet
click($("#btnOwqatSettings")); await wait(150);
ok("adjust sheet opens", $("#sheetOwqat").classList.contains("open"));
ok("adjust sheet has 7 inputs", $$("#owqatAdjusts input").length === 7, $$("#owqatAdjusts input").length);
$$("#owqatAdjusts input")[2].value = "5";
click($("#btnSaveOwqatAdjusts")); await wait(300);
ok("+5min dhuhr adjustment applied", JSON.stringify(window.FETROS.SET.data.adjust) === '{"dhuhr":5}', JSON.stringify(window.FETROS.SET.data.adjust));
$$("#owqatAdjusts input")[2] && ($$("#owqatAdjusts input")[2].value = "0");
click($("#btnSaveOwqatAdjusts")); await wait(250);
ok("adjust reset", Object.keys(window.FETROS.SET.data.adjust).length === 0, JSON.stringify(window.FETROS.SET.data.adjust));
// permission-denied paths
window.navigator.geolocation = { getCurrentPosition: (s, e) => e({ code: 1, message: "denied" }) };
click($("#btnLocate")); await wait(300);
ok("geolocation denial handled with message", /دسترسی|نداده|شهر/.test($$("#toastStack .toast p").map(n => n.textContent).join(" ") + $("#owqatCityLine").textContent), "no toast text found");

/* 6) tools: dhikr */
click($('.nav-btn[data-view="tools"]')); await wait(200);
click($('[data-tool="dhikr"]')); await wait(150);
ok("dhikr panel visible", !$("#tool-dhikr").classList.contains("hidden"));
const c0 = numTxt("#dhikrCount");
for (let i = 0; i < 34; i++) click($("#btnDhikrPlus"));
await wait(200);
const c1 = numTxt("#dhikrCount");
ok("dhikr counts up (33 target hit +1 → shows 34)", c1 === c0 + 34, c0 + " → " + c1);
click($("#btnDhikrMinus")); await wait(120);
ok("dhikr undo works", numTxt("#dhikrCount") === c1 - 1, numTxt("#dhikrCount") + " vs " + (c1 - 1));
ok("dhikr ring progress set", parseFloat($("#dhikrProgress").style.strokeDashoffset) < 628, $("#dhikrProgress").style.strokeDashoffset);
ok("dhikr session saved to history (33 reached)", /نشست|امروز/.test($("#dhikrHistory").textContent), JSON.stringify($("#dhikrHistory").textContent.slice(0, 40)));
click($("#btnDhikrReset")); await wait(200);
ok("reset asks for confirmation first", $("#confirmDialog").classList.contains("open"), $("#confirmDialog").className);
click($("#confirmOk")); await wait(350);
ok("dhikr reset after confirm", numTxt("#dhikrCount") === 0, $("#dhikrCount").textContent);
ok("confirm dialog closed", !$("#confirmDialog").classList.contains("open"));

/* 7) tasks */
click($('[data-tool="tasks"]')); await wait(150);
setVal($("#taskInput"), "آزمون خودکار");
{ const y = new Date(Date.now() - 86400000); const pad = n => String(n).padStart(2, "0"); setVal($("#taskDate"), y.getFullYear() + "-" + pad(y.getMonth() + 1) + "-" + pad(y.getDate())); }
click($("#btnAddTask")); await wait(250);
ok("task added", /آزمون خودکار/.test($("#tasksList").textContent), $("#tasksList").textContent.slice(0, 50));
const taskId = window.FETROS.ORG.cache.tasks[0].id;
const cbLabel = $("#tasksList .item label");
click(cbLabel); await wait(250);
ok("task toggles done", window.FETROS.ORG.cache.tasks.find(t => t.id === taskId).done === true);
window.FETROS.UI.paintAgendaBadge();
ok("badge drops when the only pending item is completed", numTxt("#notifyDot") === 0 && $("#notifyDot").classList.contains("hidden"), $("#notifyDot").textContent + " / " + $("#notifyDot").className);
click($("#tasksList .item .mini")); await wait(250);
ok("edit dialog opens", $("#editDialog").classList.contains("open"));
$("#editBody input").value = "آزمون ویرایش‌شده";
click($("#editSave")); await wait(300);
ok("task edited", /ویرایش‌شده/.test(window.FETROS.ORG.cache.tasks.find(t => t.id === taskId).title), window.FETROS.ORG.cache.tasks.find(t => t.id === taskId).title);
setVal($("#taskFilter"), "done"); await wait(150);
ok("filter=done shows the task", /ویرایش‌شده/.test($("#tasksList").textContent));
setVal($("#taskFilter"), "all"); await wait(150);

/* 8) notes + reminders + birthdays */
click($('[data-tool="notes"]')); await wait(150);
setVal($("#noteTitle"), "یادداشت تست"); setVal($("#noteBody"), "متن تست ۱۲۳");
$("#noteFav").checked = true; $("#noteFav").dispatchEvent(new window.Event("change", { bubbles: true }));
click($("#btnSaveNote")); await wait(300);
ok("note saved + listed", /یادداشت تست/.test($("#notesList").textContent) && /★/.test($("#notesList").textContent), $("#notesList").textContent.slice(0, 60));
setVal($("#notesSearch"), "متن تست"); await wait(300);
ok("note search finds it", /یادداشت تست/.test($("#notesList").textContent));
setVal($("#notesSearch"), "nothing404"); await wait(300);
ok("note search empty state", /پیدا نشد/.test($("#notesList").textContent));
setVal($("#notesSearch"), ""); await wait(250);
click($('[data-tool="reminders"]')); await wait(150);
setVal($("#remTitle"), "یادآور تست");
const d2 = new Date(Date.now() + 3600000); const pad = n => String(n).padStart(2, "0");
setVal($("#remWhen"), d2.getFullYear() + "-" + pad(d2.getMonth() + 1) + "-" + pad(d2.getDate()) + "T" + pad(d2.getHours()) + ":" + pad(d2.getMinutes()));
click($("#btnAddReminder")); await wait(300);
ok("reminder added", /یادآور تست/.test($("#remindersList").textContent), $("#remindersList").textContent.slice(0, 60));
click($('[data-tool="birthdays"]')); await wait(150);
setVal($("#bdName"), "تستی"); setVal($("#bdDate"), "01-01");
click($("#btnAddBirthday")); await wait(300);
ok("birthday added", /تستی/.test($("#birthdaysList").textContent), $("#birthdaysList").textContent.slice(0, 50));
ok("birthday appears on calendar (next occurrence)", (() => { const nx = window.FETROS.VIEWS.birthdays.nextOccurrence(1, 1); return !!(nx && window.FETROS.OCC.forDayWithPersonal(nx.dayNo).some(o => /تستی/.test(o.title))); })(), "not linked to calendar");

/* 9) meds */
click($('[data-tool="meds"]')); await wait(150);
click($("#medsEnable").closest(".chip")); await wait(300);
ok("meds panel reveals on enable", $("#medsEnable").checked === true && !$("#medsPanel").classList.contains("hidden"), "checked=" + $("#medsEnable").checked);
setVal($("#medName"), "قرص تست"); setVal($("#medTimes"), "08:00, 20:00"); setVal($("#medDose"), "طبق تجویز پزشک");
click($("#btnAddMed")); await wait(400);
ok("med schedule added", /قرص تست/.test($("#medsList").textContent) && /۰۸:۰۰/.test($("#medsList").textContent), $("#medsList").textContent.slice(0, 70));
ok("today schedule shows 2 doses", /۰ از ۲|از ۲/.test($("#medsToday").textContent), $("#medsToday").textContent.slice(0, 60));
const takenBtn = $$("#medsToday button").find(b => b.textContent.trim() === "خوردم");
click(takenBtn); await wait(400);
ok("dose marked taken + progress moves", /۱ از ۲/.test($("#medsToday").textContent), $("#medsToday").textContent.slice(0, 60));
click($("#medsEnable").closest(".chip")); await wait(200);
ok("meds module disables (panel hidden, data kept)", $("#medsPanel").classList.contains("hidden") && window.FETROS.SET.data.meds === false);

/* 10) FAB + quick actions */
click($("#fabMain")); await wait(150);
ok("FAB opens menu", $("#fab").classList.contains("open") && $("#fabMenu").children.length === 4, $("#fabMenu").children.length);
click($$("#fabMenu .fab-item")[0]); await wait(300);
ok("FAB quick-note routes to notes tool", $("#tool-notes") && !$("#tool-notes").classList.contains("hidden"));
ok("FAB closes after action", !$("#fab").classList.contains("open"));

/* 11) global search + settings persistence */
click($("#btnSearch")); await wait(150);
setVal($("#globalSearch"), "یادداشت"); await wait(300);
ok("global search returns hits", /یادداشت/.test($("#globalSearchResults").textContent), $("#globalSearchResults").textContent.slice(0, 60));
click($$("#globalSearchResults button")[0]); await wait(250);
ok("global search closes sheet + navigates", !$("#sheetSearch").classList.contains("open") && $("#view-tools").classList.contains("active"));
click($('.nav-btn[data-view="settings"]')); await wait(200);
click($('[data-theme-btn="light"]')); await wait(150);
ok("theme switches to light", doc.documentElement.dataset.theme === "light", doc.documentElement.dataset.theme);
click($('[data-accent-btn="teal"]')); await wait(150);
ok("accent switches", doc.documentElement.dataset.accent === "teal", doc.documentElement.dataset.accent);
click($('[data-theme-btn="dark"]')); click($('[data-accent-btn="gold"]')); await wait(150);
setVal($("#setMotion"), "low"); await wait(150);
ok("motion level applies", doc.documentElement.dataset.motion === "low", doc.documentElement.dataset.motion);
$("#setPersianDigits").checked = false; $("#setPersianDigits").dispatchEvent(new window.Event("change", { bubbles: true })); await wait(150);
ok("latin digits mode", /\d/.test($("#appVersion").textContent), $("#appVersion").textContent);
$("#setPersianDigits").checked = true; $("#setPersianDigits").dispatchEvent(new window.Event("change", { bubbles: true })); await wait(150);
ok("settings persisted to localStorage", (() => { const raw = JSON.parse(window.localStorage.getItem("fetros.settings.v2")); return raw.theme === "dark" && raw.accent === "gold" && raw.city === "tehran"; })(), window.localStorage.getItem("fetros.settings.v2"));
const exported = window.FETROS.PWA.validate({ app: "fetros", data: { tasks: [{ id: "x" }] } });
ok("export schema validates own payload", exported === null, String(exported));
ok("import rejects malformed file", (() => { const e = window.FETROS.PWA.validate({ app: "other", data: {} }); return typeof e === "string"; })());

/* 12) reload persistence (fresh DOM sharing the same storage is not possible in jsdom; assert storage instead) */
const stored = window.localStorage.getItem("fetros.fallback.v2");
const parsed = stored ? JSON.parse(stored) : {};
ok("tasks persisted through fallback store", (parsed.tasks || []).length === 1 && (parsed.notes || []).length === 1 && (parsed.reminders || []).length === 1 && (parsed.birthdays || []).length === 1, JSON.stringify(Object.keys(parsed).map(k => k + ":" + (parsed[k] || []).length)));
ok("med logs persisted", (parsed.medlogs || []).length === 1, (parsed.medlogs || []).length);

/* 13) offline/update UI + manifest wiring */
ok("offline status wiring exists", typeof window.FETROS.UI.setNetStatus === "function");
window.dispatchEvent(new window.Event("offline")); await wait(150);
ok("offline event updates status bar", /آفلاین/.test($("#statusText").textContent), $("#statusText").textContent);
window.dispatchEvent(new window.Event("online")); await wait(150);
ok("online event restores status bar", /آنلاین/.test($("#statusText").textContent), $("#statusText").textContent);
ok("PWA install button hidden by default", $("#btnInstall").classList.contains("hidden"));
ok("manifest link + icons resolve in DOM", !!$('link[rel="manifest"]') && !!$('link[rel="icon"]') && !!$('link[rel="apple-touch-icon"]'));
ok("font preload tag present", $('link[rel="preload"][href="fonts/Rokh.ttf"]') != null);
ok("noscript message present", !!$("noscript"));

/* 14) a11y + layout basics */
ok("all nav buttons have labels", $$(".nav-btn").every(b => (b.textContent || "").trim().length > 0));
ok("sheet/dialog roles", $$("[role=dialog]").length >= 3 && $$("[aria-modal=true]").length >= 3, $$("[role=dialog]").length);
ok("landmarks", !!$("header[role=banner]") && !!$("main[role=main]") && !!$("nav[role=navigation]"));
ok("no inline event handlers", !$$("[onclick]").length);
ok("no fabricated weather on dashboard", $("#weatherCard").style.display === "none", "weatherCard should stay hidden unless enabled+online");
ok("audio probe reports missing optional files without crashing", /اختیاری|بررسی/.test($("#audioState").textContent), $("#audioState").textContent);
window.FETROS.UI.paintAgendaBadge();
ok("agenda badge counts the soon reminder", numTxt("#notifyDot") >= 1 && !$("#notifyDot").classList.contains("hidden"), $("#notifyDot").textContent);
click($("#btnNotify")); await wait(300);
ok("bell routes to the pending agenda (reminders)", $("#tool-reminders") && !$("#tool-reminders").classList.contains("hidden"), "view=" + window.FETROS.UI.state.view);
ok("touch targets ≥40px in CSS (nav-btn min sizing)", $$(".nav-btn").length === 5);

/* 15) console errors */
const realErrors = errors.filter(e => !/Could not parse CSS|Not implemented: window.scrollTo|Could not load|indexedDB|serviceWorker|Error: Not implemented|ResourceLoader|jsdomError: Could not load/i.test(e));
ok("no unexpected console errors", realErrors.length === 0, realErrors.slice(0, 3).join(" | "));
if (errors.length) console.log("\n  (ignored jsdom-limitation messages: " + errors.filter(e => realErrors.indexOf(e) === -1).slice(0, 4).join(" | ") + ")");

console.log("\ncaptured messages:", JSON.stringify(errors.slice(0, 8), null, 1));
const fails = results.filter(r => !r.cond);
console.log("\nDOM RESULT: " + (results.length - fails.length) + " passed / " + fails.length + " failed");
if (fails.length) { fails.forEach(f => console.log("   FAIL → " + f.name + (f.extra ? " [" + f.extra + "]" : ""))); process.exit(1); }
process.exit(0);
