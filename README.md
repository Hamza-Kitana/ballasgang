# Ballas Purple Dynasty

موقع سينمائي لعصابة Ballas في FiveM — مع لوحة إدارة كاملة وقاعدة بيانات على [JSONBin.io](https://jsonbin.io).

**الموقع:** https://www.ballasgang.site  
**الإدارة:** https://www.ballasgang.site/admin

## المميزات

- شاشة تحميل ثم تجربة fullscreen
- أقسام: الرئيسية · العصابة · الستيرمر · القوانين · المتجر · التقديم
- عربي / إنجليزي
- لوحة إدارة `/admin` للتحكم بكل المحتوى
- البيانات على JSONBin (+ كاش محلي احتياطي)

## التشغيل المحلي

```sh
bun install
cp .env.example .env   # ثم عبّئ القيم
bun run seed:jsonbin   # أول مرة فقط
bun run dev
```

- الموقع: http://localhost:3000
- الإدارة: http://localhost:3000/admin

## متغيرات البيئة (مهمة للإنتاج)

| المتغير | الوصف |
|---------|--------|
| `VITE_SITE_URL` | `https://www.ballasgang.site` |
| `ADMIN_PASSWORD` | كلمة مرور لوحة الإدارة |
| `ADMIN_SESSION_SECRET` | سر الجلسة (32 حرف على الأقل) |
| `JSONBIN_MASTER_KEY` | Master Key من JSONBin |
| `JSONBIN_BIN_ID` | معرّف الـ bin بعد `seed:jsonbin` |

ضع نفس القيم على منصة الاستضافة (Vercel / Railway / VPS…) ثم أعد النشر.

## لوحة الإدارة

بعد الدخول تقدر:

- تعديل معلومات العصابة وديسكورد
- إضافة / تعديل / حذف الأعضاء والبثوث
- إدارة القوانين وخطوات التقديم
- إدارة منتجات المتجر
- تغيير فيديو الخلفية وأغنية الموقع (YouTube IDs)
- تعديل النصوص الرئيسية عربي/إنجليزي
- Seed لإرجاع البيانات الافتراضية

## أوامر مفيدة

```sh
bun run dev
bun run build
bun run seed:jsonbin
bun run test
```
