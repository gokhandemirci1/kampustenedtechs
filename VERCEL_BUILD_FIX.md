# 🔧 Vercel Build Hatası Çözümü

## ❌ Hata

```
Error: Failed to collect page data for /api/admin/assignments
Error: Command "npm run build" exited with 1
```

## 🔍 Sorun

Vercel build sırasında Next.js API route'larını statik olarak analiz etmeye çalışıyor ve Prisma client database'e bağlanmaya çalışıyor. Bu durumda:

1. **API route'ları statik analiz ediliyor** - Build zamanında database bağlantısı olmayabilir
2. **Prisma Client generate edilmemiş** - Build sırasında Prisma client oluşturulmamış olabilir
3. **Migration'lar çalışmamış** - Database tabloları oluşturulmamış olabilir

## ✅ Yapılan Düzeltmeler

### 1. API Route'larına Dynamic Export Eklendi

Tüm API route'larına şu satırlar eklendi:

```typescript
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
```

Bu, route'ların runtime'da çalışmasını sağlar ve build zamanında database'e bağlanmaya çalışmaz.

**Güncellenen dosyalar:**
- `app/api/admin/assignments/route.ts`
- `app/api/admin/courses/route.ts`
- `app/api/admin/teachers/route.ts`
- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/students/services/route.ts`
- `app/api/teachers/assignments/route.ts`

### 2. Vercel Build Komutu Güncellendi

`vercel.json` dosyasında build komutu güncellendi:

```json
{
  "buildCommand": "npx prisma generate && npx prisma migrate deploy && npm run build"
}
```

Bu komut:
1. Prisma Client'ı generate eder
2. Migration'ları çalıştırır (production için)
3. Next.js build'i yapar

### 3. Prisma Client İyileştirildi

`lib/prisma.ts` dosyasında log ayarları eklendi:

```typescript
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
```

## 📝 Vercel'de Yapılacaklar

### 1. Environment Variables Kontrolü

Vercel dashboard'da şu environment variable'ların olduğundan emin olun:

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - `production` (otomatik eklenir)

### 2. Build Settings

Vercel otomatik olarak `vercel.json` dosyasını okur, ancak manuel kontrol için:

1. Vercel Dashboard → Project Settings → Build & Development Settings
2. Build Command: `npx prisma generate && npx prisma migrate deploy && npm run build`
3. Install Command: `npm install`

### 3. Migration'ları Çalıştırma

İlk deployment'tan önce migration'ları çalıştırmanız gerekebilir:

**Seçenek 1: Vercel Build Hook (Otomatik)**
- Build komutu migration'ları otomatik çalıştırır

**Seçenek 2: Manuel Migration**
- Vercel CLI ile:
  ```bash
  vercel env pull
  npx prisma migrate deploy
  ```

## 🚀 Deployment Adımları

### 1. Değişiklikleri Commit ve Push

```bash
git add .
git commit -m "Fix Vercel build: Add dynamic exports and update build command"
git push
```

### 2. Vercel Otomatik Deploy

Vercel otomatik olarak yeni commit'i algılar ve deploy eder.

### 3. Build Loglarını Kontrol Et

Vercel Dashboard → Deployments → Build Logs

Şu adımları görmelisiniz:
1. ✅ `npm install`
2. ✅ `npx prisma generate`
3. ✅ `npx prisma migrate deploy`
4. ✅ `npm run build`

## 🆘 Hala Çalışmıyorsa

### Sorun 1: Prisma Client Generate Hatası

**Hata:** `Prisma Client not generated`

**Çözüm:**
- Build komutunda `npx prisma generate` çalıştığından emin olun
- `package.json`'da `postinstall` script ekleyin:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Sorun 2: Migration Hatası

**Hata:** `Migration failed`

**Çözüm:**
- `DATABASE_URL` environment variable'ının doğru olduğundan emin olun
- Migration'ları local'de test edin:
  ```bash
  npx prisma migrate deploy
  ```

### Sorun 3: Database Bağlantı Hatası

**Hata:** `Can't reach database server`

**Çözüm:**
- `DATABASE_URL` environment variable'ını kontrol edin
- Supabase database'inin aktif olduğundan emin olun
- Connection Pooling kullanın (daha güvenilir)

## 📋 Checklist

- [x] API route'larına `dynamic = 'force-dynamic'` eklendi
- [x] Vercel build komutu güncellendi
- [x] Prisma Client iyileştirildi
- [ ] Vercel'de `DATABASE_URL` environment variable eklendi
- [ ] Migration'lar çalıştırıldı
- [ ] Build başarılı oldu

## 🎯 Sonuç

Artık Vercel build'i başarılı olmalı. Tüm API route'ları runtime'da çalışacak ve build zamanında database'e bağlanmaya çalışmayacak.

---

**Başarılar! 🚀**

