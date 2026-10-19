#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# publish-release.sh — APK را به یک GitHub Release می‌چسباند (تگ متحرک v2-debug)
# طوری نوشته شده که هر بار اجرا، همان فایل را با نسخهٔ تازه جایگزین کند
# (تا لینک دانلود همیشه ثابت بماند: …/releases/download/v2-debug/fetros-debug.apk)
#
# ورودی‌ها (از workflow): APK_PATH, REL_TAG, PUBLISH, TITLE, GITHUB_* ، APP_VERSION
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

APK="${APK_PATH:-out/fetros-debug.apk}"
TAG="${REL_TAG:-v2-debug}"
PUBLISH="${PUBLISH:-true}"
TITLE="${TITLE:-فطرس v2 — APK دیباگ (اندروید)}"
VERSION="${APP_VERSION:-2.0.0}"

say() { printf '\033[36m[release]\033[0m %s\n' "$*"; }
die() { printf '::error::%s\n' "$*" >&2; exit 1; }

[ -s "$APK" ] || die "فایل APK پیدا نشد: $APK"
[ "$PUBLISH" = "true" ] || { say "publish_release=false → فقط Artifact منتشر می‌شود، ریلیز نه."; exit 0; }
command -v gh >/dev/null 2>&1 || die "gh CLI روی runner نیست."
: "${GITHUB_REPOSITORY:?}" ; : "${GITHUB_SHA:?}"

SIZE_KB="$(du -k "$APK" | cut -f1)"
SHA256="$(sha256sum "$APK" | cut -d' ' -f1)"
RUN_URL="${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}"
REL_URL="${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY}/releases/tag/${TAG}"
FILE_URL="${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY}/releases/download/${TAG}/fetros-debug.apk"

NOTES="$(mktemp)"
cat > "$NOTES" <<MD
### فطرس · نسخهٔ اندروید (APK دیباگ)

این بسته **خودِ فایل‌های وب را درون خودش** دارد (Capacitor، \`webDir: www\`) — یک TWA
نیست و آدرس سایت را باز نمی‌کند. برای باز کردن برنامه به اینترنت نیاز ندارید:
تقویم، مناسبت‌ها، اوقات شرعی، قبله‌نما، ذکر، برنامهٔ روز و یادداشت‌ها کاملاً آفلاین
کار می‌کنند. فقط آب‌وهوا (Open-Meteo) و کشیدن نسخهٔ تازهٔ داده نیاز به اتصال دارند.

**نصب روی گوشی — ۴ قدم**
1. همین \`fetros-debug.apk\` را با مرورگرِ همان گوشی دانلود کنید (روی لینک فایل پایین همین صفحه بزنید).
2. اگر بارِ اول است: **تنظیمات گوشی → برنامه‌ها / Apps → نصب برنامهٔ ناشناس (Install unknown apps / Special app access)** → برای «مرورگر» یا «فایل منیجر» روشن کنید.
3. فایل دانلودشده را از اعلان/پوشهٔ Downloads باز کنید → **Install**.
4. «فطرس» را از کشوی برنامه‌ها باز کنید.

> اگر نسخهٔ قبلی نصب است، همین فایل رویش نصب (update) می‌شود و داده‌ها
> (وظایف، یادداشت‌ها، تنظیمات، یادآور تولدها) پاک **نمی‌شود**.

**مشخصات این بیلد**

| مورد | مقدار |
|---|---|
| نسخه | \`${VERSION}-build${GITHUB_RUN_NUMBER:-0}\` |
| بسته | \`${PACKAGE_ID:-ir.fetros.app}\` |
| کامیت | \`${GITHUB_SHA:0:7}\` |
| حجم | ${SIZE_KB} KB |
| SHA-256 | \`${SHA256}\` |
| بیلد لاگ | [GitHub Actions](${RUN_URL}) |

**نکته‌های صادقانه**
- این APK با **debug keystore پیش‌فرض اندروید** امضا شده: برای نصب روی گوشی خودتان و تست
  کاملاً مناسب است، ولی برای انتشار در کافه‌بازار/Play باید با keystore شخصی خودتان امضا شود
  (راهنما: README بخش ۱۰).
- چون امضای دیباگ است، اندروید ممکن است هنگام نصب هشدار «ناشناخته» بدهد — طبیعی است.
- یادآورهای پس‌زمینهٔ مطمئن و ویجت صفحهٔ خانه در نسخهٔ وب ممکن است توسط اندروید کُند
  یا قطع شوند؛ برای رفتار کامل-native باید افزونهٔ \`@capacitor/local-notifications\`
  اضافه شود (README بخش ۱۳). فایل‌های فونت (\`fonts/Rokh.ttf\`) و صدای اذان
  (\`audio/*.mp3\`) هم اگر در ریپو باشند داخل همین بسته می‌آیند.
MD

HAD_RELEASE=0
gh release view "$TAG" >/dev/null 2>&1 && HAD_RELEASE=1
HAD_TAG=0
git ls-remote --exit-code --tags origin "refs/tags/$TAG" >/dev/null 2>&1 && HAD_TAG=1

# تگ را به همین کامیت منتقل کن (best-effort) تا ریلیز همیشه تازه‌ترین بیلد را نشان دهد
git tag -f "$TAG" "$GITHUB_SHA" >/dev/null 2>&1 || true
if git push --force origin "refs/tags/$TAG" >/dev/null 2>&1; then
  say "تگ ${TAG} روی کامیت ${GITHUB_SHA:0:7} قرار گرفت"
else
  say "هشدار: جابه‌جایی تگ ممکن نشد (ریلیز روی تگ قبلی می‌ماند؛ فایل APK بازم جایگزین می‌شود)"
fi

if [ "$HAD_RELEASE" = "1" ]; then
  say "ریلیز ${TAG} از قبل وجود داشت → فایل APK جایگزین می‌شود"
  gh release upload "$TAG" "$APK" --clobber || die "آپلود asset در ریلیز ${TAG} ناموفق بود"
  gh release edit "$TAG" --title "$TITLE" --notes-file "$NOTES" || true
elif [ "$HAD_TAG" = "1" ]; then
  say "ریلیز تازه روی تگ موجود ${TAG} ساخته می‌شود"
  gh release create "$TAG" "$APK" --title "$TITLE" --notes-file "$NOTES" || die "ساخت ریلیز ناموفق بود"
else
  say "تگ و ریلیز تازه ساخته می‌شوند"
  gh release create "$TAG" "$APK" --target "$GITHUB_SHA" --title "$TITLE" --notes-file "$NOTES" --latest \
    || die "ساخت ریلیز/تگ ناموفق بود"
fi

rm -f "$NOTES"

say "لینک مستقیم دانلود: $FILE_URL"
if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
  {
    echo
    echo "### ⬇️ دانلود APK از Release"
    echo
    echo "**[\`${TAG}\` · fetros-debug.apk](${FILE_URL})** — ${SIZE_KB} KB (بدون زیپ، مستقیم روی گوشی)"
    echo
    echo "صفحهٔ ریلیز: <${REL_URL}> · sha256 \`${SHA256}\`"
  } >> "$GITHUB_STEP_SUMMARY"
fi
echo "RELEASE_URL=${REL_URL}" >> "${GITHUB_ENV:-/dev/null}"
echo "APK_DOWNLOAD_URL=${FILE_URL}" >> "${GITHUB_ENV:-/dev/null}"
