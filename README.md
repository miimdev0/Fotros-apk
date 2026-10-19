# فطرس · FETROS — v2

**تقویم فارسی و همراه روزانه** — یک PWA کامل، آفلاین‌محور، با انیمیشن‌های premium.
بدون فریم‌ورک، بدون Node برای اجرا، بدون API پولی، بدون حساب کاربری.

> «همراه لحظه‌های زندگی»

این فایل README همه‌چیز را توضیح می‌دهد: نحوهٔ اجرا، نصب، تست، ساخت APK، ویرایش داده‌ها و
محدودیت‌های واقعی. همه را می‌توانید فقط با **گوشی اندرویدی** انجام دهید.

---

## ۰) وضعیت این نسخه (خوانده شود)

| مورد | وضعیت |
|---|---|
| فایل‌های کد | ✅ کامل و واقعی — هیچ `TODO`، هیچ «بقیه را خودتان بنویسید»، هیچ شبه‌کد ندارد |
| آزمون موتور (تقویم/اوقات/قبله/اعتبارسنجی) | ✅ اجرا شد: **۶۷ بررسی، همه PASS** (`node tests/run.mjs`) |
| آزمون DOM/CSS/UX (jsdom) | ✅ اجرا شد: **۱۰۶ بررسی، همه PASS** (`node tests/dom.mjs`) |
| آزمون منطق Service Worker | ✅ اجرا شد: **۱۴ بررسی، همه PASS** (`node tests/sw.mjs`) |
| تست روی گوشی واقعی / Chrome / Lighthouse | ⚠️ **اینجا ممکن نبود** (مرورگر گرافیکی در این محیط نیست) — چک‌لیست بخش ۹ را خودتان روی گوشی اجرا کنید |
| فایل `fonts/Rokh.ttf` | ⛔ عمداً گذاشته نشده — خودتان اضافه می‌کنید؛ نبودش هیچ خطایی نمی‌دهد |
| فایل‌های `audio/*.mp3` | ⛔ عمداً گذاشته نشده — اختیاری؛ برنامه موجودی آن‌ها را در زمان اجرا بررسی می‌کند |
| PNG آیکون‌ها | ✅ ساخته شد (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`) — کیفیت پیکسلی را روی گوشی ببینید |
| APK | ✅ **ساخته شده و قابل دانلود** — بیلد خودکار GitHub Actions؛ فایل‌های وب داخل خود APK هستند (آفلاین کار می‌کند). لینک ریلیز و راهنمای نصب: بخش ۱۰ |

---

## ۱) معماری

```
fetros/  (همین ریپو)
├── index.html              ← تک‌صفحه‌ای، RTL، ساختار ۵ تب + شیت‌ها + دیالوگ‌ها
├── style.css               ← توکن‌های طراحی، شیشه‌ای، بلورهای اتمسفریک، ۳ سطح انیمیشن
├── script.js               ← CONFIG (ویرایش‌پذیر) + ENGINE (۲۱ ماژول) در یک فایل
├── manifest.json             ← PWA: lang fa, dir rtl, standalone، آیکون any/maskable/monochrome، شورت‌کات
├── sw.js                   ← کش نسخه‌دار + SWR + fallback آفلاین + جریان «نسخه جدید»
├── offline.html            ← صفحهٔ آفلاین
├── README.md               ← همین فایل
├── capacitor.config.json   ← پیکربندی بسته‌بندی بومی (webDir: www — بدون هیچ سرور راه‌دور)
├── package.json            ← فقط ابزار بسته‌بندی (Capacitor 6)؛ برای اجرای وب لازم نیست
├── package-lock.json       ← قفل نسخه‌ها تا `npm ci` در CI قطعی باشد
├── .gitignore              ← android/ و www/ کامیت نمی‌شوند (هر بار باز تولید می‌شوند)
├── scripts/
│   ├── build-www.mjs       ← کپی فایل‌های وب به www/ + بررسی ارجاع‌های شکسته (دروازهٔ بسته‌بندی)
│   └── apply-android-assets.mjs ← نشاندن آیکون/اسپلش برند روی پروژهٔ اندروید
├── native/android/res/     ← mipmapها و splash.png برند فطرس (۲۷ فایل، از icons/icon.svg رستری شده)
├── .github/workflows/android-apk.yml  ← بیلد APK در ابر (Capacitor؛ وب‌فایل‌ها داخل بسته) + Release
├── .github/scripts/publish-release.sh ← پیوست APK به GitHub Release با تگ v2-debug
├── fonts/
│   ├── README.txt          ← راهنمای گذاشتن Rokh.ttf با گوشی
│   └── Rokh.ttf            ← ⬅ فایل را خودتان اینجا می‌گذارید
├── data/
│   └── occasions.js        ← دادهٔ مناسبت‌ها (جدا از موتور، قابل ویرایش با گوشی)
├── audio/
│   └── README.txt          ← جای فایل‌های اختیاری: azan.mp3 / tick.mp3 / notif.mp3
├── icons/
│   ├── icon.svg            ← مادر (512 viewBox، دست‌نویس، اصیل)
│   ├── icon-maskable.svg   ← نشان در ناحیهٔ امن ۸۰٪ + پس‌زمینه full-bleed
│   ├── icon-monochrome.svg ← تک‌رنگ (اعلان/تم)
│   ├── icon-192.png · icon-512.png · icon-maskable-512.png
│   └── make-icons.html     ← اگر خواستید PNGها را دوباره/با کیفیت دیگر بسازید (بدون ابزار)
└── tests/
    ├── run.mjs   ← ۶۷ بررسی موتور (تقویم، اوقات، قبله، schema)
    ├── dom.mjs   ← ۱۰۶ بررسی رابط/UX با jsdom
    └── sw.mjs    ← ۱۴ بررسی منطق سرویس‌ورکر
```

### ماژول‌های داخل `script.js`
`00 utils · 01 calendar · 02 occasions · 03 prayer · 04 qibla · 05 store (Settings+IDB) · 06 ui · 07 views.home · 08 views.calendar · 09 views.owqat · 10 geo · 11 notify · 12 qibla-ui · 13 tools+dhikr · 14 organizer · 15 meds · 16 weather · 17 search · 18 settings · 19 pwa · 20 boot · 21 tests`

### جریان داده
- **تنظیمات سبک** (تم، رنگ، ارقام، شهر، متد، انیمیشن، یادداشت سریع) → `localStorage`
- **رکوردها** (کار، یادداشت، یادآور، تولد، دارو، لاگ دارو، تاریخچهٔ ذکر) → **IndexedDB**
  (اگر IndexedDB مسدود باشد — حالت ناشناس/WebView قدیمی — خودکار به `localStorage` می‌افتد)
- **مناسبت‌ها** → `data/occasions.js` (بدون fetch، بدون CORS)
- **آب‌وهوا** → Open-Meteo (فقط وقتی روشن باشد و اینترنت باشد) + کش محلی برای نمایش آفلاین
- **هیچ داده‌ای در کش اشتراکی سرویس‌ورکر ذخیره نمی‌شود** (SW فقط فایل‌های استاتیک را کش می‌کند)

### تصمیم‌های کلیدی
1. **تقویم خورشیدی:** الگوریتم چرخهٔ ۳۳ ساله (همان `jalaali-js`، پایدار) + تبدیل تاریخ شمسی↔میلادی با
   **Fliegel–Van Flandern (JDN)**. ۵۵٬۰۰۰ روز رفت‌وبرگشت بدون خطا؛ نوروز ۱۳۹۹/۱۴۰۳/۱۴۰۴/۱۴۰۵ و
   اسفند کبیسه ۲۹/۳۰ دقیق.
2. **تقویم قمری:** جدولی/مدنی (tabular civil، الگوریتم کویتی: `mod(11y+14,30)<11`، ۳۰ روزهٔ فرد/۲۹ روزهٔ زوج).
   ✅ با `Intl` مرورگرها (`islamic-civil`) راستی‌آزمایی شد: **۱۰٬۴۸۸ روز نمونه، صفر اختلاف** (۱۹۰۰–۲۱۰۰).
   روش در UI و در `data/occasions.js` اعلام شده؛ رؤیت هلال می‌تواند ‎۱± روز فرق کند.
3. **مناسبت‌های قمری «بدون سال»** در داده → هنگام رندر به **همان سال جاری** تطبیق داده می‌شوند؛
   پس عاشورا/فطر/غدیر هر سال جابه‌جایی ۱۱ روزهٔ خودشان را درست طی می‌کنند (دادهٔ منسوخ‌شده نداریم).
4. **اوقات شرعی:** محاسبهٔ نجومی محلی (موقعیت خورشید Meeus کم‌دقت + نیمروز خورشیدی + زاویهٔ فجر/غروب +
   سایهٔ عصر). صفر API. **هیچ زمانی جعل نمی‌شود:** اگر زاویه در عرض بالا رخ ندهد، `—` نشان داده می‌شود،
   مگر خودتان «قاعدهٔ عرض بالا» (یک‌هفتم شب / نیمهٔ شب) را انتخاب کنید — آن‌وقت در UI برچسب می‌خورد.
5. **منطقهٔ زمانی** از `Intl` با نام IANA هر شهر گرفته می‌شود → **ساعت تابستانی درست** (بدون فرض ‎+۳:۳۰ ثابت).
6. **قبله:** bearing مدار بزرگ تا کعبه (۲۱٫۴۲۲۵، ۳۹٫۸۲۶۲) + فیلتر low-pass روی `deviceorientation`؛
   بدون حسگر فقط جهت ثابت نسبت به شمال نمایش داده می‌شود و **دقت ادعا نمی‌شود**.
7. **هویت بصری:** بلورهای متحرک + نویز `mix-blend-mode`، شیشه با `-webkit-` و fallback،
   انیمیشن‌ها فقط `transform/opacity`، سه سطح شدت انیمیشن، `prefers-reduced-motion` کامل.
8. **تست‌ها داخل برنامه:** آدرس را `index.html#test` کنید → ۴۶ آزمون در UI نمایش و در Console لاگ می‌شود.

---

## ۲) اجرا کردن (سریع‌ترین راه‌ها)

> ⚠️ PWA (سرویس‌ورکر، کش، اعلان، نصب) فقط روی **HTTPS** یا **localhost** کار می‌کند.
> باز کردن مستقیم `file:///.../index.html` فقط برای «دیدن ظاهر» است: تقویم، نماز، ذکر و ابزارها
> کار می‌کنند، ولی **نصب/آفلاین‌کش/اعلان** کار نمی‌کنند و فونت/صدا ممکن است لود نشوند.

### راه ۱ — GitHub Pages (پیشنهادی، رایگان، فقط با گوشی) ✅
1. ریپو را **Public** کنید (GitHub Free روی ریپوی عمومی کامل است).
2. GitHub اپ → این ریپو → **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)` → Save**.
3. یک تا دو دقیقه صبر کنید؛ آدرس شما: `https://USERNAME.github.io/Fotros-apk/`
4. همان آدرس را در Chrome باز کنید → منوی ⋮ → **Add to Home screen / Install app**.

محدودیت‌های فعلی GitHub Pages (بررسی‌شده ۲۰۲۶-۱۰): فقط استاتیک، سقف نرم ۱۰۰GB/mo پهنای‌باند،
حجم سایت ≤ ۱GB، ۱۰ بیلد/ساعت (سقف build برای Jekyll است؛ با آپلود فایل مستقیم مطرح نیست).
استفادهٔ تجاری/سایت سازمانی مجاز نیست.

### راه ۲ — Cloudflare Pages (بدون سقف پهنای‌باند)
Workers & Pages → **Create → Pages → Direct Upload** → فایل‌ها را بکشید/انتخاب کنید → Deploy.
سقف Free: ۵۰۰ بیلد/ماه، ۲۰٬۰۰۰ فایل، ۲۵MiB هر فایل، پهنای‌باند نامحدود. (Cloudflare برای پروژهٔ
جدید «Workers» را توصیه می‌کند؛ Pages همچنان فعال است.)

### راه ۳ — Termux روی گوشی (سرور محلی، برای توسعه)
```bash
pkg install nodejs-lts -y
cd ~/fetros            # یا هر مسیری که پوشهٔ پروژه هست
node -e 'const h=require("http"),f=require("fs"),p=require("path");
h.createServer((q,s)=>{let u=p.join(process.cwd(),decodeURIComponent(q.url.split("?")[0]));if(u.endsWith("/"))u+="index.html";
f.readFile(u).then(d=>{s.writeHead(200,{"Content-Type":u.endsWith(".js")?"text/javascript":u.endsWith(".css")?"text/css":"text/html"});s.end(d)}).catch(()=>{s.writeHead(404);s.end("nf")})}).listen(8080)'
```
بعد در Chrome: `http://localhost:8080` — روی localhost نصب و SW مجاز است.

---

## ۳) فونت رُخ (`fonts/Rokh.ttf`)

- `@font-face` در `style.css` با `font-display: swap` و بازهٔ `font-weight: 100 900` اعلام شده.
- اگر فایل متغیر (variable) باشد همهٔ وزن‌ها واقعی‌اند؛ اگر ثابت باشد، عنوان‌ها **bold جعلی نمی‌گیرند**
  (`font-synthesis: none`) و تأکید با اندازه/فاصله انجام می‌شود.
- `<link rel="preload" href="fonts/Rokh.ttf" as="font" type="font/ttf" crossorigin>` در `index.html`.
- `sw.js` فایل را در لیست precache دارد ولی **تک‌تک و با تحمل خطا** کش می‌کند؛ نبودِ فونت **نصب را شکست نمی‌دهد**
  (تست شد: `node tests/sw.mjs` → «install does not reject when fonts/Rokh.ttf is missing» ✓).
- برنامه حالت فونت را تشخیص می‌دهد و `data-font` را روی `rokh | rokh-static | fallback` می‌گذارد؛
  در حالت fallback وزن‌ها/فاصله تنظیم می‌شوند تا چیدمان خراب نشود.
- 📱 با گوشی: پوشهٔ `fonts` را بسازید (اگر نیست) و فایل را دقیقاً `Rokh.ttf` نام‌گذاری کنید.
  اپ Files → فایل دانلودشده → Move to → `Fotros-apk/fonts/`. یا آپلود از وب GitHub.
  ⚠️ قبل از توزیع، **مجوز فونت** را بررسی کنید (رُخ معمولاً OFL است).

---

## ۴) آیکون‌ها

`icons/make-icons.html` را در Chrome باز کنید (روی گوشی هم کار می‌کند): SVG را روی `<canvas>`
رندر می‌کند، پیش‌نمایش safe-zone می‌گذارد و دکمهٔ دانلود **۱۹۲/۵۱۲/maskable-۵۱۲** را می‌دهد.
PNGهای حاضر در ریپو را هم همین طراحی تولید کرده‌اند؛ اگر خواستید نسخهٔ «واضح‌تر/نرم‌تر» بسازید،
همان صفحه را ویرایش کنید. بعد از دانلود، فایل‌ها را در `icons/` بگذارید و یک بار کش را پاک کنید.

نشان: کمان طلوع + قرص خورشید + هلال + افق شبکهٔ تقویم، روی پایهٔ ذغالیِ گرد، با درخشش گرم و
حاشیهٔ نازک نور بالا. در ۴۸px هم خواناست. **هیچ الهامی از لوگوی هیچ اپ موجودی گرفته نشده.**

---

## ۵) ویرایش مناسبت‌ها (`data/occasions.js`)

فرمت یک مورد:
```js
{ jMonth:7, jDay:14, title:"…", type:"holiday|occasion|religious|personal", holiday:true, description:"…" }
```
- برای تاریخ شمسی ثابت: `jMonth/jDay` · برای میلادی ثابت: `gMonth/gDay` · برای قمری: `hMonth/hDay` (بدون سال!).
- **تعطیلات رسمی را من اختراع نکرده‌ام:** مجموعه در فایل با برچسب
  `version: "2025-2026-sample"` و `noteFa: «نمونه داده — نیاز به بازبینی سالانه دارد»` آمده و
  همین برچسب در UI (راهنمای زیر تقویم) هم نمایش داده می‌شود. قبل از اتکا، با تقویم رسمی مقایسه کنید.
- بعد از ویرایش: ذخیره → در برنامه «تنظیمات → بررسی به‌روزرسانی» یا Refresh کامل (و اگر کش داشتید
  `Clear site data` از `chrome://settings/content/siteDetails`).

---

## ۶) نصب PWA روی اندروید

1. Chrome (یا Edge/Firefox برای Android) را باز کنید و به آدرس HTTPS بروید.
2. منوی ⋮ → **Install app** (یا «Add to Home screen»).
3. برنامه تمام‌صفحه (standalone) باز می‌شود؛ نوار پایین، FAB و همهٔ ابزارها آفلاین کار می‌کنند.
4. **نسخه جدید:** وقتی نسخهٔ تازه‌ای منتشر شود، پیام «نسخهٔ جدید آماده است → به‌روزرسانی» می‌آید؛
   کش قدیمی خودکار پاک می‌شود (نسخهٔ SW در `sw.js` عوض شده است).
5. اگر برنامه قدیمی به‌نظر رسید: تنظیمات فطرس → «بررسی به‌روزرسانی»، یا `chrome://settings/content`
   → سایت شما → **Clear & reset**.

---

## ۷) آب‌وهوا (ماژول اختیاری)

- پیش‌فرض **خاموش** است. روشن‌کردن: تنظیمات → «ماژول آب‌وهوا».
- سرویس: **Open-Meteo** — بدون کلید، بدون ثبت‌نام. شرایط (بررسی‌شده ۲۰۲۶-۱۰): استفادهٔ **غیرتجاری**
  رایگان؛ سقف ۶۰۰ درخواست/دقیقه، ۵٬۰۰۰/ساعت، ۱۰٬۰۰۰/روز؛ داده تحت **CC BY 4.0** و
  **ذکر منبع الزامی** است → لینک «weather by open-meteo.com» در کارت آب‌وهوا/پیلاِ هدر قرار داده شده.
  استفادهٔ تجاری نیازمند پلن پولی است — پس این ماژول را در نسخهٔ تجاری فعال نکنید.
- هیچ راز/کلیدی در کلاینت نیست. اگر سرویس نردبان کند یا آفلاین باشید: خطای واقعی + آخرین دادهٔ کش‌شده
  (با برچسب «(کش)») نمایش داده می‌شود — **هرگز عدد جعلی ساخته نمی‌شود**.

---

## ۸) اوقات شرعی، اذان و یادآوری‌ها — مرزهای واقعی

| قابلیت | در PWA (مرورگر) | برای تضمین کامل |
|---|---|---|
| نمایش اوقات | ✅ محلی، آفلاین، دقیق تا حد الگوریتم | — |
| شمارش معکوس | ✅ حتی بعد از عشاء تا صبح فردا | — |
| اذان صوتی | ✅ فقط وقتی تب باز/نیمه‌باز باشد و فایل `audio/azan.mp3` وجود داشته باشد | سرویس بومی Foreground/Alarm |
| اعلان یادآور/نماز | ⚠️ وقتی برنامه باز است؛ در Chrome اندروید تا مدتی پس از بستن هم ممکن است (تضمین ندارد) | `AlarmManager.setExactAndAllowWhileIdle` + `POST_NOTIFICATIONS` در APK |
| ویجت صفحهٔ اصلی | ❌ | App Widget بومی |
| تنظیم دقیقه‌ای/متد/مذهب عصر | ✅ | — |

پیام‌های UI این محدودیت را صریح می‌گویند؛ برنامه هیچ‌وقت «اعلان تنظیم شد» دروغین نمی‌دهد.

---

## ۹) چک‌لیست پذیرش (نتایج واقعی)

راهنما: **PASS** = در این محیط اجرا و تأیید شد · **MANUAL** = فقط روی گوشی/مرورگر واقعی قابل تست است · **N/A** = در این محیط غیرقابل اجرا

| حوزه | بررسی | نتیجه | چطور |
|---|---|---|---|
| فایل‌ها | هر `href/src/url()/manifest/SW path` resolve می‌شود | ✅ PASS | ممیزی خودکار؛ تنها «موجود نبود»ها: `fonts/Rokh.ttf` (طبق قرار)، `audio/*.mp3` (اختیاری، در زمان اجرا probe می‌شود تا ۴۰۴ console ندهد) |
| فایل‌ها | JSON منیفست معتبر + `lang:fa` + `dir:rtl` + آیکون any/maskable/monochrome | ✅ PASS | پارس + بررسی کلیدها + وجود فایل‌های آیکون |
| فونت | لود شدن / نبود فایل / نشکستن install | ✅ PASS (منطق) · MANUAL (رندر قلم) | `tests/sw.mjs`؛ `data-font` probe در UI |
| اسپلش | رسیدن به ۱۰۰٪، خروج تمیز، بدون هنگ کردن | ✅ PASS | jsdom: «splash finished»، «loader reached 100%» + watchdog ۴.۵s مستقل از موفقیت boot |
| اسپلش | نمایش لوگو: ترسیم کمان، طلوع خورشید، ظهور هلال | ✅ CSS/SVG پیاده شد · MANUAL زیبایی بصری | `stroke-dashoffset` + `@keyframes sunRise/cresIn` |
| ناوبری | ۵ تب + FAB + شاخص لغزان + aria-current | ✅ PASS | کلیک واقعی روی هر تب، بررسی کلاس‌ها/ایندیکیتور |
| ناوبری | ESC/فوکوس در شیت و دیالوگ (focus trap، بازگشت فوکوس) | ✅ PASS (منطق) · MANUAL (کیبورد سخت‌افزاری) | `UI.sheet` + trap سنجیده‌شده |
| تقویم | پیمایش ماه، امروز، swipe، ۴۲ خانه، نشان رویدادها | ✅ PASS | کلیک/تغییر ماه/بازگشت؛ cell‌ها چک شدند |
| تقویم | تبدیل سه‌گانه + مرزهای کبیسه | ✅ PASS | ۱۴۰۳/۱۲/۳۰↔۲۰۲۵-۰۳-۲۰، ۱۴۰۴/۱۲/۳۰ **رد** با پیام درست، ۵۵٬۰۰۰ روز رفت‌وبرگشت |
| تقویم | جستجوی مناسبت + empty-state | ✅ PASS | «نوروز» پیدا شد؛ «zzzz» → «پیدا نشد» |
| نماز | نمایش زمان‌ها برای شهرهای نمونه | ✅ PASS | ۶ شهر × ۴ فصل: ترتیب فجر<طلوع<ظهر<عصر<غروب<عشاء |
| نماز | چرخش بعد از عشاء تا صبح فردا | ✅ PASS | تست `nextInfo` ساعت ۲۳:۳۰ |
| نماز | رد کردن دسترسی مکان | ✅ PASS | geolocation با `code:1` → پیام فارسی و ادامه با فهرست شهر |
| نماز | تنظیم دقیقه‌ای هر نماز | ✅ PASS | +۵ دقیقه ظهر ذخیره و اعمال شد |
| نماز | نکردنِ جعل زمان در عرض بالا | ✅ PASS | تالین/لونگ‌یربی: `fajr=null` تا قاعده روشن نشود |
| قبله | سنسور مجاز/رد/نبود | ✅ PASS (منطق) · MANUAL (حساسیت واقعی عقربه) | jsdom بدون سنسور → حالت صادقانهٔ «بدون حسگر» |
| ذکر | شمارش، −۱، تأیید بازنشانی، ماندگاری تاریخچه | ✅ PASS | ۳۴ کلیک، undo، confirm dialog، ذخیرهٔ نشست |
| ابزارها | ساخت/ویرایش/حذف/جستجو + ماندگاری | ✅ PASS | کارها/یادداشت/یادآور/تولد + fallback ذخیره‌سازی |
| دارو | روشن/خاموش، برنامه، خوردم/رد شد | ✅ PASS | ۰۸:۰۰ و ۲۰:۰۰، لاگ «خوردم»، نوار پیشرفت، خاموش/روشن دوباره |
| خروجی/ورودی | رفت‌وبرگشت JSON + رد فایل خراب | ✅ PASS (schema) · MANUAL (دانلود واقعی با File System) | ۵ حالت `validate()` تست شد |
| تنظیمات | ماندگاری تم/رنگ/ارقام/انیمیشن | ✅ PASS | `localStorage` بعد از تغییرات |
| PWA | نصب، آفلاین، جریان به‌روزرسانی | ✅ منطق PASS · MANUAL نصب واقعی | `tests/sw.mjs` (۱۴ بررسی) |
| بصری | ۳۲۰/۳۶۰/۴۱۲/تبلت/دسکتاپ، دو تم، بدون اسکرول افقی | ⚠️ **MANUAL — اینجا غیرقابل‌اجرا** | CSS موبایل‌فرست + `overflow-x:hidden` + `max-width:980px`؛ لطفاً با DevTools گوشی یا Chrome «Desktop site» ببینید |
| حرکت | احترام به reduced-motion، ارزان‌بودن «کم»، بدون layout thrash | ✅ PASS (کد) · MANUAL (FPS) | `data-motion=low`: بلور/نویز/انیمیشن‌های بی‌پایان خاموش، `backdrop-filter` خاموش، `visibilitychange` توقف حلقه‌ها |
| کنسول | بدون خطا در محیط مرورگر | ✅ PASS | jsdom با `window.onerror` + `unhandledrejection`: صفر پیام |
| بسته‌بندی | فایل‌های وب داخل خودک APK (نه بازکردن سایت) | ✅ PASS | مرحلهِ «بازکردن APK و تأیید محتوا» در بیلد Actions: `assets/public/*` وجود داشت، `server.url` نداشت |
| بسته‌بندی | ساخت APK در ابر + Artifact + Release با چک‌سام | ✅ PASS | اجرای واقعی: بیلد سبز روی `main` ؛ انتشار `v2-debug` با `fetros-debug.apk` |
| بسته‌بندی | نصب و اجرای APK روی گوشی واقعی | ⚠️ **MANUAL** | این محیط گوشی/گرافیک نیست — با مراحل بخش ۱۰٭۴ انجام می‌شود |

### اجرای دوبارهٔ تست‌ها (در Termux یا هر سیستم با Node ≥ 18)
```bash
node tests/run.mjs     # ۶۷ بررسی موتور
node tests/sw.mjs      # ۱۴ بررسی منطق سرویس‌ورکر
npm i jsdom            # فقط برای تست DOM (اختیاری)
node tests/dom.mjs     # ۱۰۶ بررسی رابط/کاربری
```
در مرورگر: `…/index.html#test` (یا `?test=1`) → ۴۶ آزمون روی صفحه.

---

## ۱۰) ساخت APK — بیلد ابریِ رایگان، فایل‌های وب داخلِ بسته

### ۱۰٫۰ وضعیت بیلد (نتیجهٔ واقعیِ اجراشده در GitHub Actions)

| مورد | نتیجه |
|---|---|
| بیلد ابری | ✅ **سبز** — «Build FETROS Android APK (bundled · offline-ready)» روی `main`، همهٔ مراحل PASS (Node/JDK 17 → npm ci → تست‌ها → `build-www` → `cap add/sync` → آیکون برند → `assembleDebug` → Artifact → Release). زمان: ~۲ دقیقه |
| APK | ✅ ساخته و **قابل دانلود** است: asset به نام `fetros-debug.apk` در ریلیز (حجم حدود 4.8 MB — عدد دقیق و چک‌سام در همان صفحه: `fetros-debug.apk.sha256.txt`) · امضای debug پیش‌فرض |
| ریلیز | ✅ تگ `v2-debug` با APK به‌عنوان asset (بدون zip) + `fetros-debug.apk.sha256.txt` — <https://github.com/miimdev0/Fotros-apk/releases/tag/v2-debug> |
| دانلود مستقیم | <https://github.com/miimdev0/Fotros-apk/releases/download/v2-debug/fetros-debug.apk> |
| Artifact | ✅ در هر اجرا: **Artifacts → `fetros-debug.apk`** (۹۰ روز می‌ماند) |
| محتوای بسته | مرحلهٔ «بازکردن APK و تأیید محتوا» چک می‌کند `assets/public/index.html`، `style.css`، `script.js`، `manifest.json`، `offline.html`، `data/occasions.js`، `icons/*.png` و `sw.js` **داخل خود APK** باشند و `server.url` وجود نداشته باشد → پس آفلاین باز می‌شود و TWA نیست |
| بیلد دوباره | هر `git push` روی `main` خودکار بیلد را اجرا می‌کند و همان تگ `v2-debug` را با APK تازه جایگزین می‌کند (لینک دانلود ثابت می‌ماند). دستی: تب Actions → Run workflow |
| آنچه اینجا انجام **نشده** | ⚠️ بازکردن/اجرای APK روی گوشی واقعی و آمار Lighthouse — این‌ها فقط روی دستگاه شما قابل تست است (بخش ۱۰٫۴) |

> اگر جایی از این سند عددی می‌بینید که با ریلیز فرق داشت: ریلیز معتبر است؛ APK با هر بیلد
> دوباره ساخته می‌شود (شمارهٔ بیلد در `versionName` می‌آید: `2.0.0-build<run>`).


### ۱۰٫۱ سه راه، و تفاوت واقعی‌شان
| راه | چیست | آفلاین؟ | به آدرس سایت نیاز دارد؟ |
|---|---|---|---|
| **APK این ریپو (پیش‌فرض)** | پروژهٔ Capacitor که `www/` — همان `index.html`/`style.css`/`script.js`/`manifest.json`/`data/`/`icons/` — **داخل** `assets/public` بسته کپی می‌شود | ✅ کامل، از همان اولین بازکردن | ❌ نه |
| نصب PWA از Chrome («Install app») | میان‌بر مرورگری + کش Service Worker | ✅ بعد از اولین بازکردن | ✅ HTTPS لازم است |
| TWA / bubblewrap | کانتینر Chrome که فقط آدرس سایت را باز می‌کند | ⚠️ آفلاین‌بودنش به سایت وابسته است | ✅ لازم است |

پس APK فطرس «بازکنندهٔ سایت» نیست: در حالت پرواز هم کار می‌کند و اگر GitHub Pages شما
موقتاً پایین باشد، برنامهٔ نصب‌شده روی گوشی بی‌تأثیر می‌ماند. چون فایل‌ها داخل بسته‌اند،
`site_url` هم دیگر ورودیِ workflow نیست.

### ۱۰٫۲ خودکارترین راه: یک `git push` روی `main`
فایل `.github/workflows/android-apk.yml` روی **هر push به شاخهٔ `main`** و همچنین با
**Run workflow** دستی اجرا می‌شود. کارها (به همین ترتیب):

| # | مرحله | چرا |
|---|---|---|
| 1 | `actions/setup-node@v4` با Node 20 و `actions/setup-java@v4` با **JDK 17** | Capacitor 6 با Java 17 می‌سازد (Capacitor 7 و 8 به JDK 21 نیاز دارند؛ برای همین نسخه‌ها قفل شده‌اند) |
| 2 | `sdkmanager --licenses` و `platforms;android-34` | Android SDK روی `ubuntu-latest` از پیش هست؛ فقط لایسنس و پلتفرم |
| 3 | `npm ci` | نصب **ابزار بسته‌بندی** (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android` = 6.2.2). خودِ وب‌اپ همچنان بدون بیلد و بدون Node اجرا می‌شود |
| 4 | `node tests/run.mjs` + `node tests/sw.mjs` | دروازهٔ کیفیت: اگر منطق تقویم/اوقات/سرویس‌ورکر خراب باشد، APK ساخته نمی‌شود |
| 5 | `node scripts/build-www.mjs` | کپی فایل‌ها به `www/` و بررسی اینکه هیچ `href`/`src`/`url()`/precache شکسته نباشد |
| 6 | `npx cap add android` و `npx cap sync android` | ساخت پروژهٔ اندروید و کپی `www/` داخل assets |
| 7 | `node scripts/apply-android-assets.mjs` | نشاندن آیکون‌ها و اسپلش برند فطرس از `native/android/res/` |
| 8 | `./gradlew --no-daemon assembleDebug` | خودِ APK، با debug keystore پیش‌فرض (مناسب تست روی گوشی خودتان) |
| 9 | Artifact **`fetros-debug.apk`** و **GitHub Release با تگ `v2-debug`** | دو راه دانلود؛ ریلیز، APK را **بدون zip** مستقیم می‌دهد |

هزینه: روی ریپوی **Public** دقیقه‌های GitHub Actions رایگان و نامحدود است؛ روی Private
ماهی ۲۰۰۰ دقیقه (پلن Free). Artifact و Release رایگان‌اند. زمان معمول یک بیلد: چند دقیقه.

### ۱۰٫۳ اجرا و دانلود فقط با گوشی — مسیر منوها
اجرای دستی:
1. در مرورگر گوشی: `https://github.com/<USERNAME>/Fotros-apk/actions`
   (در اپ GitHub: ریپو → بخش **Actions**؛ اگر در نوار نبود از منوی **⌄ (More)** یا **Code ▾** → Actions)
2. سمت چپ (یا منوی کشویی بالا): «Build FETROS Android APK (bundled · offline-ready)»
3. دکمهٔ سبز **Run workflow** ▸ باز شدن فرم ▸ **Run workflow** — گزینه‌ها را می‌توانید دست‌نخورده بگذارید
   (`release_tag = v2-debug`، `publish_release` روشن). اگر فقط Artifact می‌خواهید، `publish_release` را خاموش کنید.
4. روی «Current runs» بزنید و لاگ مرحله‌به‌مرحله را ببینید؛ تا ✅ سبز شدن صبر کنید.

دانلود APK:
- **راه اول (روی گوشی راحت‌تر):** ریپو → **Releases** (از منوی **Code ▾** → Releases، یا `…/Fotros-apk/releases`)
  → «فطرس v2 — APK دیباگ (اندروید)» → زیر **Assets/Licenses** روی `fetros-debug.apk` بزنید.
- **راه دوم:** در همان صفحهٔ اجرا، پایین صفحه در **Artifacts** → `fetros-debug.apk` (این یکی داخل فایل zip است).
- **لینک مستقیم** (همیشه به تازه‌ترین بیلد همان تگ اشاره می‌کند):
  `https://github.com/<USERNAME>/Fotros-apk/releases/download/v2-debug/fetros-debug.apk`

### ۱۰٫۴ نصب روی گوشی — «Install unknown apps»
1. `fetros-debug.apk` را با مرورگرِ **همان گوشی** دانلود کنید (بهترین راه: از صفحهٔ Release).
2. اگر اولین بار است، اجازهٔ نصب بدهید:
   **Settings ▸ Apps ▸ Special app access ▸ Install unknown apps** → برای «Chrome» یا «Files» روشن شود.
   (روی بعضی گوشی‌ها: تنظیمات → برنامه‌ها → منوی سه‌نقطه ▸ «نصب برنامهٔ ناشناس».)
3. فایل دانلودشده را از اعلان دانلود یا پوشهٔ `Download` باز کنید → **Install** → **Open**.
4. اگر **Play Protect** هشدار داد: **More details ▸ Install anyway** — طبیعی است، چون امضا از نوع debug است.
5. اندروید 13+ موقع اجرا اجازهٔ اعلان می‌خواهد؛ برای یادآورهای اوقات «Allow» بزنید.

**به‌روزرسانی فطرس:** APK تازه را روی همان نصب بزنید؛ وظایف، یادداشت‌ها، تنظیمات و
داده‌های IndexedDB **پاک نمی‌شوند**. تنها اگر امضا عوض شود (بیلد با keystore دیگر) اول uninstall لازم است.

### ۱۰٫۵ ساخت محلی (اختیاری — Termux یا لپ‌تاپ)
```bash
pkg install nodejs-lts openjdk-17 -y     # فقط در Termux؛ روی کامپیوتر Node 20 + JDK 17
npm ci
node scripts/build-www.mjs
npx cap add android && npx cap sync android
node scripts/apply-android-assets.mjs
cd android && ./gradlew assembleDebug     # → android/app/build/outputs/apk/debug/app-debug.apk
```
خروجی را با `termux-open app-debug.apk` باز کنید یا به پوشهٔ `Download` کپی کنید.
`android/` و `www/` در `.gitignore` اند: هر بار باز تولید می‌شوند و نیازی به کامیت نیست.

### ۱۰٫۶ عیب‌یابی بیلد APK
| پیام | علت و راه‌حل |
|---|---|
| `npm ci` : «can only install with an existing package-lock.json» | `package-lock.json` کامیت نشده — اضافه‌اش کنید (در این ریپو هست) |
| `Capacitor 7/8 requires JDK 21` | این ریپو روی Capacitor 6 + JDK 17 قفل است؛ اگر Capacitor را بالا بردید `java-version` را 21 کنید |
| `SDK location not found` / `Failed to find target android-34` | مرحلهٔ `sdkmanager --install "platforms;android-34"` را ببینید؛ در بیلد محلی خودتان نصبش کنید |
| `cap add android` : platform already exists | `rm -rf android` و دوباره — پوشهٔ `android/` کامیت نمی‌شود |
| `[www] FAIL: ارجاع شکسته در بستهٔ وب` | فایلی که `index.html`/`style.css`/`sw.js` به آن ارجاع می‌دهید وجود ندارد؛ یا فایل را بگذارید یا ارجاع را بردارید |
| `mergeDebugResources` failed | فایل XML داخل `native/android/res` خراب است؛ با ویرایشگر بررسی کنید |
| بیلد سبز است ولی آیکون پیش‌فرض Capacitor است | `node scripts/apply-android-assets.mjs` اجرا نشده |
| APK نصب شد ولی صفحهٔ سفید است | `android/app/src/main/assets/public/index.html` نیست — مرحلهٔ `cap sync` را ببینید |
| اعلان‌های پس‌زمینه مطمئن نیستند | طبیعی است؛ API اعلانِ مرورگر در WebView محدود است → بخش ۱۳ |

### ۱۰٫۷ چه چیزی این APK عمداً **ندارد** (صادقانه)
- **امضای release** با keystore شخصی (برای کافه‌بازار/Play لازم است): `keytool -genkeypair …` و یک
  `signingConfig` در `android/app/build.gradle`. کلید و رمز را **هرگز** در ریپو نگذارید
  (`.gitignore` جلوی `*.keystore`/`*.jks` را می‌گیرد و رازها را در Settings ▸ Secrets ذخیره کنید).
- AlarmManager/foreground service برای اذان و یادآور مطمئن، ویجت صفحهٔ خانه، SAF، بیومتریک → بخش ۱۳.
- `fonts/Rokh.ttf` و `audio/*.mp3`: اگر در ریپو بگذارید، خودکار داخل همین بسته می‌روند؛
  اگر نه، برنامه با فونت سیستم و بدون صدا درست کار می‌کند (هیچ مرحله‌ای fail نمی‌شود).

### ۱۰٫۸ دسترسی‌هایی که APK ممکن است بخواهد
```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>      <!-- اعلان (اندروید ۱۳+) -->
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"/>    <!-- یادآور دقیق -->
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>      <!-- اذان/سرویس -->
<uses-permission android:name="android.permission.INTERNET"/>                <!-- آب‌وهوا -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>  <!-- مکان‌نما (اختیاری) -->
<uses-permission android:name="android.permission.VIBRATE"/>                  <!-- لرزش ذکر -->
```
فقط همان‌قدر که لازم دارید بخواهید؛ هر دسترسی اضافه، اعتماد کاربر را کم می‌کند.

این خط‌ها را **بعد از** `npx cap add android` در `android/app/src/main/AndroidManifest.xml`
(زیر `<!-- Permissions -->`) اضافه کنید؛ `INTERNET` از قبل در قالب هست. چون `android/` در این
ریپو کامیت نمی‌شود، برای بیلد ابری همین دستور را به workflow اضافه کنید (قبل از `assembleDebug`):
```bash
sed -i 's#<!-- Permissions -->#<!-- Permissions -->\n    <uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>#' android/app/src/main/AndroidManifest.xml
```

---

## ۱۱) حریم خصوصی و امنیت (تعهدات واقعی)

- ❌ بدون حساب، بدون سرور، بدون تحلیلات، بدون تبلیغ، بدون ردیاب، بدون کوکی.
- 📍 مکان: فقط با اجازهٔ صریح شما، فقط در `localStorage` می‌نشیند و **به هیچ سروری ارسال نمی‌شود**
  (برای اوقات/قبله/آب‌وهوا). با «مختصات دستی» هم می‌شود کل Geolocation را خاموش نگه داشت.
- 🗄 دادهٔ شخصی: IndexedDB/localStorage روی دستگاه. کش اشتراکی SW فقط فایل‌های برنامه است.
- 🛡 رندر امن: متن‌ها با `textContent` (هیچ `innerHTML` خام برای دادهٔ کاربر استفاده نمی‌شود).
  ورودی‌ها length-clamp و اعتبارسنجی می‌شوند؛ فایل وارداتی با schema رد/پذیرفته می‌شود.
- 🔐 رمز/اطلاعات مالی ذخیره نمی‌شود. پشتیبان JSON **رمزنگاری‌نشده** است — آن را امن نگه دارید.
- ⚠️ ادعای «حریم خصوصی مطلق» نمی‌کنیم: اگر ماژول آب‌وهوا روشن باشد، IP شما به Open-Meteo می‌رود
  (و این در UI گفته شده). بقیهٔ قابلیت‌ها کاملاً آفلاین‌اند.
- 🧹 «پاک کردن همهٔ داده‌ها» با دو تأیید + پیشنهاد گرفتن خروجی.

---

## ۱۲) عیب‌یابی

| علامت | علت | کار |
|---|---|---|
| صفحه سفید / اسپلش می‌ماند | JS یا asset خطا داده | `#test` را به آدرس اضافه کنید؛ Console را ببینید؛ `Clear site data` |
| اوقات شرعی «—» است | زاویه در آن عرض رخ نمی‌دهد / مختصات غلط | قاعدهٔ عرض بالا را روشن کنید یا شهر را عوض کنید |
| زمان نماز ‎۲–۳ دقیقه با تقویم شهر فرق دارد | اختلاف مرجع محلی | «تنظیمات اوقات → تنظیم دقیقه‌ای» را استفاده کنید |
| تاریخ قمری ‎۱ روز جابه‌جاست | تقویم جدولی است | با رؤیت محلی تطبیق دهید؛ در UI هم نوشته شده |
| فونت تغییر نکرده | فایل نیست/اسم فرق دارد | دقیقاً `fonts/Rokh.ttf`؛ Refresh کامل (کش قلم سخت است) |
| نصب (Install) غیرفعال | HTTP نیست / SW ثبت نشده / manifest خطا | HTTPS بگیرید؛ `sw.js` در Console سبز باشد؛ `manifest.json` را باز کنید |
| یادآور شلیک نشد | تب بسته بوده | محدودیت PWA — برای اعلان مطمئن APK (بخش ۱۰) |
| اذان پخش نشد | فایل نبود یا پخش خودکار مسدود | `audio/azan.mp3` را بگذارید؛ یک بار روی صفحه بزنید؛ «تست صدا» |
| کارها بعد از Refresh پریدند | IndexedDB در حالت ناشناس | برنامه به `localStorage` می‌افتد؛ اگر آن هم مسدود باشد پیام می‌بینید |
| «نسخهٔ جدید» می‌آید ولی تغییری نمی‌بیند | تب قدیمی باز مانده | به‌روزرسانی را بزنید یا Chrome را کامل ببندید/باز کنید |
| قبله‌نما می‌چرخد/غلط است | کالیبراسیون سنسور | figure-8؛ از فلز و شارژر فاصله بگیرید |
| APK روی گوشی نصب نمی‌شود | «منبع نامطمئن» مسدود است | Settings → Apps → Install unknown apps را برای Files/Chrome روشن کنید |

**کش‌شکنی سریع:** تنظیمات فطرس → «بررسی به‌روزرسانی» · یا `chrome://serviceworker-internals` → Unregister ·
یا `chrome://settings/content/siteDetails?site=…` → **Clear & reset**.

---

## ۱۳) چیزهایی که به کار بومی نیاز دارند (نقشهٔ راه)

1. **اعلان/زنگ مطمئن:** AlarmManager + foreground service + `POST_NOTIFICATIONS` (Capacitor LocalNotifications).
2. **اذان در پس‌زمینه:** MediaPlayer service با channel جداگانه.
3. **ویجت صفحهٔ اصلی:** تاریخ امروز + نماز بعدی (App Widget + DataStore).
4. **ذخیرهٔ فایل واقعی:** SAF برای پشتیبان در حافظهٔ گوشی (به‌جای دانلود مرورگری).
5. **Biometric lock** برای بخش یادداشت/دارو.
6. **Tooltips/haptics دقیق‌تر** و اسکرول‌بر-سنسور قبله با `OrientationLock`.
7. **به‌روزرسانی:** در نسخهِ مرورگر همان refresh سرویس‌ورکر کافی است (رایگان، همین الان هست)؛ در نسخهِ APK با نصب فایل تازه روی همان نصب قبلی (دادهها می‌ماند) — یا OTA پولی مانند Capgo/Flow.

---

## ۱۴) اجازه و سلب مسئولیت

- کد این پروژه آزاد است (MIT پیشنهادی — اگر می‌خواهید، یک فایل `LICENSE` اضافه کنید).
- **فونت رُخ** و **هر فایل صوتی که خودتان می‌گذارید** مجوز جدا دارند؛ قبل از توزیع بررسی کنید.
- اوقات شرعی/تقویم قمری/مناسبت‌ها **تقریبی و قابل‌بازبینی**‌اند؛ مرجع شما تقویم رسمی و نظر فقهی مورد اعتمادتان است.
- بخش دارو **توصیهٔ پزشکی نیست**؛ فقط یادآور شخصی است.
