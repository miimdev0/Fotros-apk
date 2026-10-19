/* data/occasions.js — FETROS occasions dataset
   ———————————————————————————————————————————————
   این فایل فقط داده است و موتور برنامه به آن وابسته است.
   می‌توانید هر سال آن را بدون دست زدن به script.js به‌روز کنید.

   فرمت هر رویداد:
   {
     jMonth: 1-12,  jDay: 1-31,        // تاریخ شمسی (الزامی اگر میلادی/قمری ندارد)
     gMonth: 1-12, gDay: 1-31,         // یا تاریخ میلادی
     hMonth: 1-12, hDay: 1-30,         // یا تاریخ قمری هلالی (تقریبی — جدولی)
     title: "عنوان",
     type: "holiday" | "occasion" | "religious" | "personal",
     holiday: true/false,             // آیا تعطیل رسمی است؟
     description: "توضیح کوتاه اختیاری"
   }

   نکته مهم:
   - تعطیلات رسمی ایران بر اساس تقویم رسمی کشور است؛ برای دقت نهایی
     هر سال با تقویم رسمی مؤسسه ژئوفیزیک/مرکز تقویم بررسی کنید.
   - تاریخ‌های قمری در این فایل بر اساس تقویم جدولی (تبعی) محاسبه شده‌اند
     و ممکن است با رؤیت هلال ۱± روز اختلاف داشته باشند. در UI این موضوع یادآوری شده است.
   - این مجموعه به عنوان «نمونهٔ تأییدشده تا حد امکان» ارائه می‌شود؛ اگر
     موردی را ناقص دیدید، آن را ویرایش کنید و PR بزنید.
*/

/* exported OCCASIONS, OCCASIONS_META */
const OCCASIONS_META = {
  version: "2025-2026-sample",
  noteFa: "نمونه داده — نیاز به بازبینی سالانه دارد. تاریخ‌های قمری جدولی و تقریبی هستند.",
  noteEn: "Sample dataset — review annually. Hijri dates are tabular/civil, may differ ±1 day from observation.",
  hijriMethod: "tabular-islamic-civil (Friday epoch, 30-year cycle)",
  source: "Curated from official Iranian calendar + civil Hijri conversion; verify before printing."
};

const OCCASIONS = [
  // —— فروردین
  { jMonth:1, jDay:1, title:"جشن نوروز", type:"holiday", holiday:true, description:"آغاز سال نو خورشیدی" },
  { jMonth:1, jDay:2, title:"نوروز", type:"holiday", holiday:true },
  { jMonth:1, jDay:3, title:"نوروز", type:"holiday", holiday:true },
  { jMonth:1, jDay:4, title:"نوروز", type:"holiday", holiday:true },
  { jMonth:1, jDay:12, title:"روز جمهوری اسلامی", type:"holiday", holiday:true },
  { jMonth:1, jDay:13, title:"جشن سیزده‌بدر — روز طبیعت", type:"holiday", holiday:true },

  // —— مناسبت‌های مذهبی (نمونه قمری — جدولی و تقریبی)
  // برای ۱۴۰۴/۱۴۰۵ شمسی ≈ 2025-2026 میلادی — حتماً هر سال به‌روزرسانی کنید
  { hMonth:1, hDay:1, title:"آغاز سال هجری قمری", type:"religious", holiday:false },
  { hMonth:1, hDay:10, title:"تاسوعای حسینی", type:"religious", holiday:true, description:"تقویم جدولی — ممکن است ۱± روز اختلاف داشته باشد" },
  { hMonth:1, hDay:11, title:"عاشورای حسینی", type:"religious", holiday:true, description:"تقویم جدولی — ممکن است ۱± روز اختلاف داشته باشد" },
  { hMonth:2, hDay:28, title:"اربعین حسینی", type:"religious", holiday:true, description:"تقویم جدولی — تطبیق سالانه لازم است" },
  { hMonth:3, hDay:17, title:"میلاد پیامبر اکرم (ص) و امام صادق (ع)", type:"religious", holiday:true },
  { hMonth:7, hDay:13, title:"میلاد حضرت علی (ع) — روز پدر", type:"religious", holiday:false },
  { hMonth:7, hDay:27, title:"مبعث پیامبر اکرم (ص)", type:"religious", holiday:true },
  { hMonth:8, hDay:15, title:"میلاد حضرت مهدی (عج) — نیمه شعبان", type:"religious", holiday:false },
  { hMonth:9, hDay:1, title:"آغاز ماه مبارک رمضان", type:"religious", holiday:false },
  { hMonth:9, hDay:21, title:"شهادت حضرت علی (ع)", type:"religious", holiday:true, description:"۲۱ رمضان — جدولی" },
  { hMonth:10, hDay:1, title:"عید سعید فطر", type:"religious", holiday:true, description:"۱ شوال — جدولی" },
  { hMonth:10, hDay:2, title:"تعطیل به مناسبت عید فطر", type:"religious", holiday:true },
  { hMonth:12, hDay:10, title:"عید سعید قربان", type:"religious", holiday:true },
  { hMonth:12, hDay:18, title:"عید سعید غدیر خم", type:"religious", holiday:true },

  // —— مناسبت‌های خورشیدی ثابت
  { jMonth:2, jDay:25, title:"روز بزرگداشت فردوسی", type:"occasion", holiday:false },
  { jMonth:3, jDay:14, title:"رحلت امام خمینی (ره)", type:"holiday", holiday:true },
  { jMonth:3, jDay:15, title:"قیام ۱۵ خرداد", type:"holiday", holiday:true },
  { jMonth:4, jDay:7, title:"شهادت آیت‌الله بهشتی — روز قوه قضائیه", type:"occasion", holiday:false },
  { jMonth:11, jDay:22, title:"پیروزی انقلاب اسلامی", type:"holiday", holiday:true },
  { jMonth:12, jDay:29, title:"روز ملی شدن صنعت نفت (در سال کبیسه ۳۰ اسفند)", type:"holiday", holiday:true },

  // —— میلادی (برای تطبیق)
  { gMonth:1, gDay:1, title:"آغاز سال میلادی", type:"occasion", holiday:false },
  { gMonth:3, gDay:21, title:"روز جهانی نوروز (یونسکو)", type:"occasion", holiday:false },

  // —— نمونه رویداد شخصی (کاربر می‌تواند حذف کند)
  // { jMonth:5, jDay:5, title:"سالگرد نمونه", type:"personal", holiday:false },
];
