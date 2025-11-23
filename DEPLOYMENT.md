# 🚀 Kampüsten - Deployment Rehberi

Bu rehber, Kampüsten projesini internete yüklemek ve farklı cihazlardan erişilebilir hale getirmek için adım adım talimatlar içerir.

## 📋 İçindekiler

1. [Hazırlık](#hazırlık)
2. [Hosting Seçenekleri](#hosting-seçenekleri)
3. [Veritabanı Kurulumu](#veritabanı-kurulumu)
4. [Deployment Adımları](#deployment-adımları)
5. [Domain ve SSL](#domain-ve-ssl)
6. [Güvenlik](#güvenlik)

---

## 🎯 Hazırlık

### 1. Projeyi GitHub'a Yükleyin

```bash
# Git repository oluştur
git init
git add .
git commit -m "Initial commit"

# GitHub'da yeni repository oluşturduktan sonra
git remote add origin https://github.com/kullaniciadi/kampusten.git
git push -u origin main
```

### 2. Environment Variables Hazırlayın

`.env.example` dosyasını `.env.production` olarak kopyalayın ve değerleri doldurun.

---

## 🌐 Hosting Seçenekleri

### Seçenek 1: Vercel (Önerilen - Next.js için en uygun)

**Avantajlar:**
- Next.js için optimize edilmiş
- Otomatik SSL
- Ücretsiz plan mevcut
- Kolay deployment
- Global CDN

**Adımlar:**
1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Environment variables ekleyin
4. Deploy edin

### Seçenek 2: Railway

**Avantajlar:**
- PostgreSQL dahil
- Kolay kurulum
- Ücretsiz kredi
- Otomatik deployment

**Adımlar:**
1. [Railway](https://railway.app) hesabı oluşturun
2. New Project > Deploy from GitHub
3. PostgreSQL ekleyin
4. Environment variables ayarlayın

### Seçenek 3: Render

**Avantajlar:**
- PostgreSQL dahil
- Ücretsiz plan
- Otomatik SSL
- Kolay yönetim

**Adımlar:**
1. [Render](https://render.com) hesabı oluşturun
2. New Web Service
3. PostgreSQL database ekleyin
4. Environment variables ayarlayın

---

## 🗄️ Veritabanı Kurulumu

### SQLite → PostgreSQL Geçişi

Production için PostgreSQL kullanmalısınız. SQLite production için uygun değildir.

### Seçenek 1: Railway PostgreSQL (Önerilen)

1. Railway'de yeni PostgreSQL servisi oluşturun
2. Connection string'i kopyalayın
3. `DATABASE_URL` environment variable olarak ekleyin

### Seçenek 2: Supabase (Ücretsiz)

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. Settings > Database > Connection string kopyalayın
4. `DATABASE_URL` olarak ekleyin

### Seçenek 3: Neon (Ücretsiz)

1. [Neon](https://neon.tech) hesabı oluşturun
2. Yeni database oluşturun
3. Connection string'i kopyalayın
4. `DATABASE_URL` olarak ekleyin

### Veritabanı Migration

```bash
# Prisma schema'yı PostgreSQL için güncelleyin
# (schema.prisma dosyasında provider'ı "postgresql" yapın)

# Migration oluştur
npx prisma migrate dev --name init

# Production'da migration çalıştır
npx prisma migrate deploy

# Seed data ekle (opsiyonel)
npm run seed
```

---

## 📦 Deployment Adımları

### Vercel ile Deployment

1. **Vercel'e Giriş**
   - [vercel.com](https://vercel.com) adresine gidin
   - GitHub ile giriş yapın

2. **Proje İçe Aktar**
   - "Add New" > "Project"
   - GitHub repository'nizi seçin
   - Import

3. **Environment Variables**
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   NODE_ENV=production
   ```

4. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Deploy**
   - "Deploy" butonuna tıklayın
   - İlk deployment 2-3 dakika sürebilir

### Railway ile Deployment

1. **Railway'a Giriş**
   - [railway.app](https://railway.app) adresine gidin
   - GitHub ile giriş yapın

2. **Yeni Proje**
   - "New Project" > "Deploy from GitHub repo"
   - Repository'nizi seçin

3. **PostgreSQL Ekle**
   - "New" > "Database" > "Add PostgreSQL"
   - Connection string otomatik olarak environment variable olarak eklenir

4. **Environment Variables**
   ```
   NODE_ENV=production
   ```

5. **Deploy**
   - Railway otomatik olarak deploy eder
   - URL'yi not edin

### Render ile Deployment

1. **Render'a Giriş**
   - [render.com](https://render.com) adresine gidin
   - GitHub ile giriş yapın

2. **Web Service Oluştur**
   - "New" > "Web Service"
   - Repository'nizi bağlayın

3. **Build & Deploy Ayarları**
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - Start Command: `npm start`

4. **PostgreSQL Database**
   - "New" > "PostgreSQL"
   - Internal Database URL'i kopyalayın

5. **Environment Variables**
   ```
   DATABASE_URL=<PostgreSQL connection string>
   NODE_ENV=production
   ```

---

## 🌍 Domain ve SSL

### Vercel

1. Settings > Domains
2. Domain'inizi ekleyin
3. DNS ayarlarını yapın
4. SSL otomatik olarak aktif olur

### Railway

1. Settings > Domains
2. Custom domain ekleyin
3. DNS kayıtlarını ekleyin
4. SSL otomatik olarak aktif olur

### Render

1. Settings > Custom Domains
2. Domain ekleyin
3. DNS ayarlarını yapın
4. SSL otomatik olarak aktif olur

---

## 🔒 Güvenlik

### 1. Environment Variables

Asla `.env` dosyasını commit etmeyin. `.gitignore`'da olduğundan emin olun.

### 2. Production Build

```bash
npm run build
npm start
```

### 3. Database Güvenliği

- Güçlü şifreler kullanın
- Connection string'i güvenli tutun
- Production'da SSL bağlantısı kullanın

### 4. Rate Limiting

Production'da rate limiting eklemeyi düşünün (ör: Upstash Rate Limit).

---

## 📝 Checklist

- [ ] GitHub repository oluşturuldu
- [ ] PostgreSQL database kuruldu
- [ ] Environment variables ayarlandı
- [ ] Prisma schema PostgreSQL için güncellendi
- [ ] Migration çalıştırıldı
- [ ] Production build test edildi
- [ ] Domain bağlandı (opsiyonel)
- [ ] SSL aktif
- [ ] Güvenlik kontrolleri yapıldı

---

## 🆘 Sorun Giderme

### Build Hatası

```bash
# Local'de test edin
npm run build
```

### Database Bağlantı Hatası

- Connection string'i kontrol edin
- Database'in erişilebilir olduğundan emin olun
- Firewall ayarlarını kontrol edin

### Migration Hatası

```bash
# Production'da migration çalıştırın
npx prisma migrate deploy
```

---

## 📞 Destek

Sorun yaşarsanız:
1. Logları kontrol edin
2. Environment variables'ı doğrulayın
3. Database bağlantısını test edin

---

**Başarılar! 🎉**

