#!/usr/bin/env node
/*
  scripts/apply-android-assets.mjs — گذاشتن آیکون و اسپلش برند فطرس روی پروژهٔ اندروید

  پروژهٔ اندروید با «npx cap add android» از قالب پیش‌فرض Capacitor ساخته می‌شود
  و آیکون/اسپلش پیش‌فرض دارد. فایل‌های آمادهٔ ما در `native/android/res/**` هستند
  و این اسکریپت آن‌ها را سرِ جای خودشان کپی می‌کند (بدون Android Studio، بدون ویرایش دستی).

  استفاده (بعد از cap add/sync):
    node scripts/apply-android-assets.mjs
  در CI هم همین‌طور. اگر پوشهٔ android/ نباشد، با پیام راهنما خارج می‌شود.
*/

import { cp, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "native", "android", "res");
const ANDROID = path.join(ROOT, "android");
const DST = path.join(ANDROID, "app", "src", "main", "res");

const log = (...a) => console.log("[res]", ...a);

async function walk(dir, rel = "") {
  const out = [];
  for (const ent of await readdir(path.join(dir, rel), { withFileTypes: true })) {
    const r = rel ? path.join(rel, ent.name) : ent.name;
    if (ent.isDirectory()) out.push(...(await walk(dir, r)));
    else out.push(r);
  }
  return out;
}

async function main() {
  if (!existsSync(SRC)) { log("پوشهٔ native/android/res نیست — چیزی برای اعمال نیست."); return; }
  if (!existsSync(path.join(ANDROID, "app"))) {
    throw new Error("پوشهٔ android/ پیدا نشد. اول «npx cap add android && npx cap sync android» را اجرا کنید.");
  }
  const files = await walk(SRC);
  if (!files.length) throw new Error("native/android/res خالی است.");

  let bytes = 0;
  await mkdir(DST, { recursive: true });
  for (const rel of files) {
    const from = path.join(SRC, rel), to = path.join(DST, rel);
    await mkdir(path.dirname(to), { recursive: true });
    await cp(from, to);
    bytes += (await stat(to)).size;
  }
  log(`${files.length} فایل برند اعمال شد در android/app/src/main/res (${(bytes / 1024).toFixed(0)} KB)`);
  const must = ["mipmap-xxxhdpi/ic_launcher.png", "mipmap-xxxhdpi/ic_launcher_foreground.png", "drawable/splash.png", "values/ic_launcher_background.xml"];
  const missing = must.filter(m => !files.includes(m));
  if (missing.length) throw new Error("این فایل‌ها در overlay نیستند و اندروید آیکون ناقص می‌سازد: " + missing.join(", "));
}

main().catch(err => { console.error("[res] FAIL:", err.message); process.exitCode = 1; });
