# Ballas Purple Dynasty

موقع سينمائي لعصابة Ballas في FiveM — مع لوحة إدارة كاملة وقاعدة بيانات على [JSONBin.io](https://jsonbin.io).

## المميزات

- شاشة تحميل ثم تجربة fullscreen بدون سكرول للصفحة
- أقسام: الرئيسية · العصابة · الستيرمر · القوانين · المتجر · التقديم
- عربي / إنجليزي
- **لوحة إدارة** على `/admin` للتحكم بكل المحتوى (أعضاء، قوانين، متجر، نصوص، إعدادات…)
- البيانات تُحفظ على **JSONBin** (+ كاش محلي احتياطي)

## التشغيل

```sh
bun install
bun run dev
```

افتح:

- الموقع: [http://localhost:3000](http://localhost:3000)
- الإدارة: [http://localhost:3000/admin](http://localhost:3000/admin)

## إعداد البيئة

انسخ `.env.example` إلى `.env`:

```env
VITE_SITE_URL=https://ballasgang.site
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=at-least-32-characters-secret-here
JSONBIN_MASTER_KEY=your-jsonbin-master-key
JSONBIN_BIN_ID=your-bin-id
```

### JSONBin

1. أنشئ حساب على [jsonbin.io](https://jsonbin.io) وانسخ **Master Key** من API Keys.
2. ضعه في `JSONBIN_MASTER_KEY`.
3. أنشئ الـ bin:

```sh
bun run seed:jsonbin
```

4. انسخ الـ `JSONBIN_BIN_ID` الناتج إلى `.env` وأعد تشغيل السيرفر.

> إذا فشل المفتاح، الموقع يشتغل بالبيانات الافتراضية والكاش المحلي `data/site-data.json` لحد ما يتصلح الربط.

## لوحة الإدارة

بعد تسجيل الدخول بكلمة `ADMIN_PASSWORD` تقدر:

- تعديل معلومات العصابة وديسكورد
- إضافة / تعديل / حذف الأعضاء والبثوث
- إدارة القوانين وخطوات التقديم
- إدارة منتجات المتجر
- تغيير فيديو الخلفية وأغنية الموقع (YouTube IDs)
- تعديل النصوص الرئيسية عربي/إنجليزي
- Seed لإرجاع البيانات الافتراضية

## فيديو الخلفية (اختياري محلي)

يمكن أيضًا وضع ملف:

```
public/ballas-bg.mp4
```

الافتراضي الحالي فيديو YouTube من إعدادات الداشبورد (`settings.bgVideoId`).
