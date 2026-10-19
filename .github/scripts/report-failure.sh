#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# report-failure.sh — وقتی بیلد APK می‌شکند، انتهای لاگ را در ریپو می‌گذارد
# (شاخهٔ build-logs → build-logs/latest-failure.md) تا لازم نباشد برای فهمیدن
# علت، درگاه Actions را باز کنید. این مرحله هرگز خودِ job را «بدتر» نمی‌کند
# و هیچ رازی (توکن/کلید) در فایل نمی‌نویسد.
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

BRANCH="build-logs"
REPO="${GITHUB_REPOSITORY:?}"
TOKEN="${GITHUB_TOKEN:-${GH_TOKEN:-}}"
DIR="/tmp/fetros-report"
FILE="$DIR/$BRANCH/latest-failure.md"

rm -rf "$DIR"; mkdir -p "$DIR/$BRANCH"

{
  echo "# فطرس · گزارش خطای بیلد APK"
  echo
  echo "- اجرا: <${GITHUB_SERVER_URL:-https://github.com}/${REPO}/actions/runs/${GITHUB_RUN_ID}> (تلاش ${GITHUB_RUN_ATTEMPT:-1})"
  echo "- کامیت: \`${GITHUB_SHA:0:7}\` · ref: \`${GITHUB_REF_NAME:-?}\` · رویداد: \`${GITHUB_EVENT_NAME:-?}\`"
  echo "- زمان: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo
  echo "## آخرین مرحله‌ای که اجرا شد"
  echo "اگر خطای Gradle است، معمولاً در بخش «ساخت APK» است؛ اگر نصب/سینک است، در بخش npm یا cap."
  echo
  echo '## انتهای لاگ (۲۰۰ خط آخر)'
  echo '```text'
  if [ -n "${LOG:-}" ] && [ -s "$LOG" ]; then
    sed -E 's#https://x-access-token:[^@]*@#https://[masked]@#g' "$LOG" | tail -200
  else
    echo "(لاگی ثبت نشده — مرحلهٔ preflight هم اجرا نشده؛ معمولاً یعنی runner یا خودِ YAML مشکل داشته)"
  fi
  echo '```'
} > "$FILE"

echo "── گزارش خطا ──"
head -24 "$FILE"
echo "…"

if [ -z "$TOKEN" ]; then
  echo "GITHUB_TOKEN در دسترس این مرحله نبود؛ گزارش فقط در لاگ چاپ شد."
  exit 0
fi

(
  cd "$DIR"
  git init -q .
  git config user.name  "fetros-ci[bot]"
  git config user.email "41898282+fetros-ci[bot]@users.noreply.github.com"
  git checkout -q -b "$BRANCH"
  git add -f "$BRANCH/latest-failure.md"
  git commit -q -m "ci: build failure log for ${GITHUB_SHA:0:7}"
  git remote add origin "https://x-access-token:${TOKEN}@github.com/${REPO}.git"
  git push -q --force origin "$BRANCH"
) && echo "گزارش نوشته شد → ${GITHUB_SERVER_URL:-https://github.com}/${REPO}/tree/${BRANCH}/${BRANCH}" \
  || echo "warning: ارسال گزارش به شاخهٔ ${BRANCH} ممکن نشد (لاگ همین job را ببینید)"

exit 0
