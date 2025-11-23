# 🚀 Hızlı Deployment Rehberi

## En Hızlı Yol: Vercel + Supabase (Önerilen)

### 1. GitHub'a Yükle (5 dakika)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/kullaniciadi/kampusten.git
git push -u origin main
```

### 2. Supabase Database Oluştur (5 dakika)

1. [supabase.com](https://supabase.com) → Sign Up
2. New Project oluştur
3. Settings → Database → Connection string kopyala
   - Format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

### 3. Prisma'yı PostgreSQL'e Geçir (2 dakika)

```bash
# PostgreSQL schema'ya geçiş
npm run switch:postgres

# DATABASE_URL'i ayarla (.env dosyasında)
DATABASE_URL="postgresql://postgres:password@host:5432/postgres"

# Migration oluştur
npx prisma migrate dev --name init

# Prisma client generate et
npx prisma generate
```

### 4. Vercel'e Deploy Et (5 dakika)

1. [vercel.com](https://vercel.com) → Sign Up (GitHub ile)
2. "Add New Project" → Repository seç
3. Environment Variables ekle:
   - `DATABASE_URL` = Supabase connection string
   - `NODE_ENV` = `production`
4. "Deploy" butonuna tıkla
5. ✅ Hazır! URL'niz: `https://kampusten.vercel.app`

### 5. Seed Data Ekle (Opsiyonel)

```bash
# Local'de seed çalıştır (Supabase'e bağlı)
npm run seed
```

---

## Alternatif: Railway (Tek Platform)

### 1. GitHub'a Yükle
(Yukarıdaki gibi)

### 2. Railway'a Deploy Et (10 dakika)

1. [railway.app](https://railway.app) → Sign Up
2. "New Project" → "Deploy from GitHub repo"
3. Repository seç
4. "New" → "Database" → "Add PostgreSQL"
5. Environment Variables:
   - `DATABASE_URL` otomatik eklenir
   - `NODE_ENV` = `production` ekle
6. PostgreSQL schema'ya geç:
   ```bash
   npm run switch:postgres
   ```
7. Railway otomatik deploy eder
8. ✅ Hazır!

---

## Alternatif: Render

### 1. GitHub'a Yükle
(Yukarıdaki gibi)

### 2. Render'a Deploy Et (15 dakika)

1. [render.com](https://render.com) → Sign Up
2. "New" → "PostgreSQL" → Database oluştur
3. "New" → "Web Service" → Repository bağla
4. Build Command:
   ```
   npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```
5. Start Command: `npm start`
6. Environment Variables:
   - `DATABASE_URL` = Render PostgreSQL connection string
   - `NODE_ENV` = `production`
7. "Create Web Service"
8. ✅ Hazır!

---

## ⚠️ Önemli Notlar

### PostgreSQL Geçişi

Production'a geçmeden önce mutlaka:

```bash
npm run switch:postgres
```

Bu komut schema'yı PostgreSQL için günceller.

### Migration

Production'da migration çalıştırmak için:

```bash
npx prisma migrate deploy
```

### Domain Ekleme

1. Vercel/Railway/Render → Settings → Domains
2. Domain ekle
3. DNS ayarlarını yap
4. SSL otomatik aktif olur

---

## 🎯 Önerilen Stack

- **Hosting**: Vercel (Next.js için en iyi)
- **Database**: Supabase (ücretsiz, kolay)
- **Domain**: Namecheap/GoDaddy (opsiyonel)

---

## 📞 Sorun mu var?

1. Logları kontrol et (hosting panelinde)
2. `DATABASE_URL` doğru mu?
3. Migration çalıştırıldı mı?
4. Build local'de çalışıyor mu? (`npm run build`)

---

**Başarılar! 🚀**

