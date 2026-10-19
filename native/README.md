# native/ — فایل‌های بومی اندروید (overlay)

این پوشه **قالبِ پیش‌فرض Capacitor را عوض می‌کند** تا APK فطرس آیکون و اسپلش خودش را داشته باشد.
هیچ کدی اینجا نیست؛ فقط منابع `res/` آماده.

```
native/android/res/
├── mipmap-{mdpi,hdpi,xhdpi,xxhdpi,xxxhdpi}/ic_launcher.png          48/72/96/144/192 px  (کاشی گِرد-مربع)
├── mipmap-*/ic_launcher_round.png                                   همان اندازه‌ها، ماسک دایره‌ای
├── mipmap-*/ic_launcher_foreground.png                              108/162/216/324/432 px  (فقط نشان، پس‌زمینه شفاف)
├── drawable/{,-port-,-land-}{mdpi…xxxhdpi}/splash.png               همان اندازه‌های قالب، پس‌زمینه #101114 + نشان
└── values/ic_launcher_background.xml                                 رنگ پس‌زمینهٔ آیکون تطبیقی: #101114
```

## چطور اعمال می‌شود؟

بعد از `npx cap add android` و `npx cap sync android`:

```bash
node scripts/apply-android-assets.mjs
```

که فایل‌های بالا را سرِ `android/app/src/main/res/` می‌گذارد. در CI
(`.github/workflows/android-apk.yml`) هم همین مرحله اجرا می‌شود.
پوشهٔ `android/` در Git نیست (`.gitignore`) — هر بار از قالب باز ساخته می‌شود و این overlay رویش می‌نشیند.

## چرا «foreground» جدا است؟

اندروید ۸+ آیکون را با ماسک Launcher می‌بُرد (دایره/لوزی/…). برای همین آیکون تطبیقی دو تکه است:
`ic_launcher_background` (رنگ) + `ic_launcher_foreground` (نشان). نشان باید داخل **منطقهٔ امن
۶۶dp از ۱۰۸dp** بماند؛ به همین دلیل در فایل‌های foreground نشان روی ~۶۲٪ بوم رسم شده تا هرگز بریده نشود.

## اگر خواستید این PNGها را تازه کنید

منبع اصلی، بردارِ `icons/icon.svg` است (نشانِ فطرس: کمانِ طلوع + هلال + افق تقویم، طلایی→نارنجی).
برای بازتولید:

1. ساده‌ترین راه: `icons/make-icons.html` را در مرورگر باز کنید → PNG ۵۱۲ و ۱۹۲ می‌گیرد.
2. برای اندازه‌های mipmap: همان ۵۱۲ را با هر رستری‌کنندهٔ SVG/تصویر (Inkscape، resvg،
   ۴۸/۷۲/۹۶/۱۴۴/۱۹۲ (آیکون) و
   ۱۰۸/۱۶۲/۲۱۶/۳۲۴/۴۳۲ (foreground با حاشیه) برسانید و با همان نام‌ها اینجا بگذارید.
3. `node scripts/apply-android-assets.mjs` و بیلد دوباره.

هیچ‌کدام از این‌ها برای اجرای خودِ وب‌اپ لازم نیست — فقط برای بسته‌بندی APK است.
