#!/usr/bin/env node
/*
  scripts/build-www.mjs — آماده‌سازی پوشهٔ www/ برای بسته‌بندی بومی (Capacitor)

  این اسکریپت «بیلد» به معنای فریم‌ورکی نیست: نه ترنسپایل، نه باندل، نه مینیفای.
  فقط فایل‌های وب پروژه را عیناً در www/ می‌گذارد و بعد بررسی می‌کند که
  هیچ ارجاعی در index.html و sw.js شکسته نباشد. اگر فایلی گم باشد،
  اسکریپت با خطا خارج می‌شود تا APK با فایل ناقص ساخته نشود.

  استفاده:
    node scripts/build-www.mjs        (یا: npm run www)
  در CI هم همین دستور قبل از «npx cap sync» اجرا می‌شود.
*/

import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "www");

/* فایل‌هایی که «باید» باشند، وگرنه APK ناقص است */
const REQUIRED_FILES = [
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "sw.js",
  "offline.html",
];
/* پوشه‌هایی که اگر بودند کپی می‌شوند */
const DIRS = ["data", "icons", "fonts", "audio"];
/* چیزهایی که اختیاری‌اند؛ نبودشان فقط هشدار است (فونت رُخ و فایل‌های صوتی را خود کاربر می‌گذارد) */
const OPTIONAL_FILES = [
  "fonts/Rokh.ttf",
  "audio/azan.mp3",
  "audio/tick.mp3",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
];
/* فایل‌های راهنما/ابزار که لازم نیست داخل APK بروند */
const SKIP_BASENAMES = new Set(["README.txt", "make-icons.html", ".DS_Store"]);

const log = (...a) => console.log("[www]", ...a);
const warn = (...a) => console.warn("[www] warn:", ...a);

/** همهٔ فایل‌های داخل یک درخت را با مسیر نسبی برمی‌گرداند. */
async function walk(dir, rel = "") {
  const out = [];
  for (const ent of await readdir(path.join(dir, rel), { withFileTypes: true })) {
    const r = rel ? path.join(rel, ent.name) : ent.name;
    if (ent.isDirectory()) out.push(...(await walk(dir, r)));
    else out.push(r);
  }
  return out;
}

/** ارجاع‌های محلی (href/src/url/PRECACHE) را از متن بیرون می‌کشد. */
function localRefs(text, kind) {
  const found = new Set();
  if (kind === "html") {
    for (const m of text.matchAll(/(?:src|href)\s*=\s*"([^"]+)"/g)) found.add(m[1]);
  } else if (kind === "sw") {
    const block = text.match(/PRECACHE_URLS\s*=\s*\[([\s\S]*?)\]/);
    if (block) for (const m of block[1].matchAll(/"([^"]+)"/g)) found.add(m[1]);
  }
  const clean = [];
  for (const raw of found) {
    const u = raw.split("#")[0].split("?")[0].trim();
    if (!u) continue;
    if (/^(https?:)?\/\//i.test(u) || /^(data|blob|mailto|tel):/i.test(u)) continue; // بیرونی — به ما کار ندارد
    clean.push(u.replace(/^\.\//, "").replace(/^\//, ""));
  }
  return clean.sort();
}

async function main() {
  const t0 = Date.now();
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const f of REQUIRED_FILES) {
    const src = path.join(ROOT, f);
    if (!existsSync(src)) throw new Error(`فایل لازم پیدا نشد: ${f}`);
    await cp(src, path.join(OUT, f));
  }

  let dirsCopied = 0;
  for (const d of DIRS) {
    const src = path.join(ROOT, d);
    if (!existsSync(src)) { warn(`پوشهٔ اختیاری نبود: ${d}/`); continue; }
    const list = await walk(src);
    for (const rel of list) {
      if (SKIP_BASENAMES.has(path.basename(rel))) continue;
      await cp(path.join(src, rel), path.join(OUT, d, rel), { recursive: true });
    }
    dirsCopied++;
  }

  /* ── یکپارچگی ارجاع‌ها ─────────────────────────────────────────────────── */
  /* چند نوع ارجاع عمداً در www/ نیستند؛ نبودشان خطا نیست:
     - فایل‌های اختیاری که کاربر خودش می‌گذارد (فونت رُخ، صدای اذان/تیک)
     - ابزارهای مرورگریِ توسعه (icons/make-icons.html) که داخل APK لازم نیستند
     - ارجاع‌های داخلی SVG مثل url(#gradGold)                                              */
  const OPTIONAL_RE = /^(fonts\/Rokh\.ttf|audio\/(azan|tick)\.mp3|icons\/(icon-512|icon-192|icon-maskable-512)\.png)$/;
  const DEV_ONLY = ["icons/make-icons.html"];
  const isFragment = u => u === "" || u.startsWith("#") || /^%23/i.test(u);

  const html = readFileSync(path.join(OUT, "index.html"), "utf8");
  const swText = readFileSync(path.join(OUT, "sw.js"), "utf8");
  const css = readFileSync(path.join(OUT, "style.css"), "utf8");

  const refs = new Set();
  const collect = (text, kind) => localRefs(text, kind).forEach(u => refs.add(u));
  collect(html, "html");
  collect(swText, "sw");
  for (const m of css.matchAll(/url\(\s*['"]?([^'"\)]+)['"]?\s*\)/g)) {
    const u = m[1].trim().replace(/^\.\//, "").replace(/^\//, "");
    refs.add(/^(https?:)?\/\//i.test(u) || /^data:/i.test(u) ? "#" + u : decodeURIComponent(u));
  }

  const missing = [], devSkipped = [], optionalMissing = [];
  for (const ref of [...refs].sort()) {
    if (isFragment(ref)) continue;
    if (existsSync(path.join(OUT, ref))) continue;
    if (OPTIONAL_RE.test(ref)) { optionalMissing.push(ref); continue; }
    if (DEV_ONLY.some(d => ref === d)) { devSkipped.push(ref); continue; }
    if (existsSync(path.join(ROOT, ref))) missing.push(ref + " (در ریپو هست ولی در www کپی نشده — باگ مرحلهٔ کپی)");
    else missing.push(ref + " (اصلاً در ریپو نیست)");
  }
  optionalMissing.forEach(r => warn(`اختیاری و نبود (بی‌خطر): ${r}`));
  devSkipped.forEach(r => log(`عمداً از بسته بیرون ماند (ابزار توسعه): ${r}`));
  if (missing.length) {
    throw new Error("ارجاع شکسته در بستهٔ وب:\n  - " + [...new Set(missing)].join("\n  - "));
  }

  const files = await walk(OUT);
  let bytes = 0;
  for (const rel of files) bytes += (await stat(path.join(OUT, rel))).size;

  const info = {
    app: "fetros",
    builtAt: new Date().toISOString(),
    files: files.length,
    bytes,
    dirsCopied,
    optionalMissing: [...optionalMissing, ...devSkipped].sort(),
  };
  await writeFile(path.join(OUT, "BUILD.json"), JSON.stringify(info, null, 2) + "\n", "utf8");

  log(`${files.length + 1} فایل · ${(bytes / 1024).toFixed(0)} KB · ${Date.now() - t0}ms · www/ آماده است`);
}

main().catch(err => {
  console.error("[www] FAIL:", err.message);
  process.exitCode = 1;
});
