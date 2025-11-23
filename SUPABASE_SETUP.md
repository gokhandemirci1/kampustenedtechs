# 🗄️ Supabase Database Kurulum Rehberi

Bu rehber, Kampüsten projesi için Supabase PostgreSQL database'inin nasıl kurulacağını detaylı olarak açıklar.

## 📋 İçindekiler

1. [Supabase Nedir?](#supabase-nedir)
2. [Hesap Oluşturma](#hesap-oluşturma)
3. [Proje Oluşturma](#proje-oluşturma)
4. [Database Ayarları](#database-ayarları)
5. [Connection String Alma](#connection-string-alma)
6. [Projeye Entegrasyon](#projeye-entegrasyon)
7. [Migration Çalıştırma](#migration-çalıştırma)
8. [Test ve Doğrulama](#test-ve-doğrulama)
9. [Sorun Giderme](#sorun-giderme)

---

## 🎯 Supabase Nedir?

**Supabase**, açık kaynaklı bir Firebase alternatifidir ve şunları sağlar:
- ✅ PostgreSQL database (ücretsiz)
- ✅ Otomatik API oluşturma
- ✅ Gerçek zamanlı özellikler
- ✅ Authentication
- ✅ Storage
- ✅ Ücretsiz tier (500MB database, 2GB bandwidth)

**Ücretsiz Plan Limitleri:**
- 500 MB database storage
- 2 GB bandwidth/ay
- 50,000 aktif kullanıcı/ay
- 2 proje

---

## 📝 Adım 1: Hesap Oluşturma

### 1.1. Supabase'e Git

1. Tarayıcınızda [supabase.com](https://supabase.com) adresine gidin
2. Sağ üst köşedeki **"Start your project"** veya **"Sign In"** butonuna tıklayın

### 1.2. GitHub ile Giriş (Önerilen)

1. **"Continue with GitHub"** butonuna tıklayın
2. GitHub hesabınızla giriş yapın
3. Supabase'e erişim izni verin

**Alternatif:** Email ile de kayıt olabilirsiniz

### 1.3. Email Doğrulama

- Email adresinize gelen doğrulama linkine tıklayın
- Hesabınız aktif olacak

---

## 🚀 Adım 2: Proje Oluşturma

### 2.1. Yeni Proje Başlat

1. Supabase dashboard'a giriş yaptıktan sonra
2. **"New Project"** butonuna tıklayın
3. Veya **"Create a new project"** seçeneğini seçin

### 2.2. Proje Bilgilerini Doldur

Aşağıdaki formu doldurun:

#### **Organization (Organizasyon)**
- Eğer daha önce organization oluşturmadıysanız:
  - **"New Organization"** seçin
  - Organization adı girin (örn: "My Projects")
  - **"Create organization"** tıklayın

#### **Project Details (Proje Detayları)**

1. **Name (Proje Adı)**
   - Örnek: `kampusten-edtech`
   - Veya: `kampusten-production`

2. **Database Password (Veritabanı Şifresi)**
   - ⚠️ **ÖNEMLİ:** Güçlü bir şifre oluşturun
   - En az 12 karakter
   - Büyük/küçük harf, sayı ve özel karakter içermeli
   - **Bu şifreyi mutlaka kaydedin!** (Sonradan değiştirilemez)
   - Örnek: `MyStr0ng!P@ssw0rd2024`

3. **Region (Bölge)**
   - Size en yakın bölgeyi seçin
   - Türkiye için: **"West Europe (Ireland)"** veya **"Central EU (Frankfurt)"** önerilir
   - Daha düşük gecikme için yakın bölge seçin

4. **Pricing Plan (Fiyatlandırma)**
   - **"Free"** planını seçin (başlangıç için yeterli)

### 2.3. Projeyi Oluştur

1. Tüm bilgileri doldurduktan sonra
2. **"Create new project"** butonuna tıklayın
3. ⏳ Proje oluşturma 1-2 dakika sürebilir
4. "Setting up your project..." mesajını göreceksiniz

---

## ⚙️ Adım 3: Database Ayarları

### 3.1. Dashboard'a Erişim

Proje oluşturulduktan sonra otomatik olarak proje dashboard'una yönlendirileceksiniz.

**Dashboard Bölümleri:**
- **Table Editor** - Veritabanı tablolarını görüntüleme/düzenleme
- **SQL Editor** - SQL sorguları çalıştırma
- **Database** - Connection bilgileri
- **API** - API ayarları
- **Auth** - Authentication ayarları
- **Storage** - Dosya depolama

### 3.2. Database Bilgilerini Kontrol Et

1. Sol menüden **"Settings"** (⚙️) ikonuna tıklayın
2. **"Database"** sekmesine gidin
3. Burada database bilgilerinizi göreceksiniz

---

## 🔗 Adım 4: Connection String Alma

### 4.1. Connection String Bulma

1. Sol menüden **"Settings"** (⚙️) → **"Database"** sekmesine gidin
2. **"Connection string"** bölümünü bulun
3. **"URI"** sekmesine tıklayın

### 4.2. Connection String Formatı

Connection string şu formatta olacak:

```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Örnek:**
```
postgresql://postgres:MyStr0ng!P@ssw0rd2024@db.abcdefghijklmnop.supabase.co:5432/postgres
```

### 4.3. Connection String'i Kopyalama

1. Connection string'in yanındaki **kopyala** (📋) ikonuna tıklayın
2. Veya string'i seçip `Ctrl+C` ile kopyalayın
3. **⚠️ ÖNEMLİ:** Bu string'i güvenli bir yere kaydedin

### 4.4. Connection Pooling (Opsiyonel - Önerilir)

Production için **Connection Pooling** kullanmanız önerilir:

1. **"Connection string"** bölümünde
2. **"Session"** yerine **"Transaction"** veya **"Transaction"** seçin
3. Pooling URL'i kopyalayın

**Pooling URL Formatı:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

**Avantajları:**
- Daha iyi performans
- Daha fazla eşzamanlı bağlantı
- Production için önerilir

---

## 🔧 Adım 5: Projeye Entegrasyon

### 5.1. Local Environment Variables

1. Proje kök dizininde `.env` dosyası oluşturun (eğer yoksa)
2. Connection string'i ekleyin:

```env
# Development (SQLite - local için)
# DATABASE_URL="file:./dev.db"

# Production (PostgreSQL - Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"

# Environment
NODE_ENV=development

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ ÖNEMLİ:**
- `[PASSWORD]` yerine gerçek şifrenizi yazın
- `[PROJECT-REF]` yerine proje referansınızı yazın
- `.env` dosyasını **asla** Git'e commit etmeyin!

### 5.2. Prisma Schema'yı PostgreSQL'e Geçir

1. Terminal'de proje dizinine gidin
2. PostgreSQL schema'ya geçiş yapın:

```bash
npm run switch:postgres
```

Bu komut:
- Mevcut SQLite schema'yı yedekler
- PostgreSQL schema'ya geçer

### 5.3. Prisma Client Generate

```bash
npx prisma generate
```

Bu komut Prisma Client'ı PostgreSQL için oluşturur.

---

## 📊 Adım 6: Migration Çalıştırma

### 6.1. Migration Oluşturma

```bash
npx prisma migrate dev --name init
```

Bu komut:
- Migration dosyaları oluşturur
- Supabase database'ine tabloları ekler
- Migration geçmişini tutar

### 6.2. Migration Çıktısı

Başarılı olursa şunu göreceksiniz:
```
✔ Migration created and applied
```

### 6.3. Supabase'de Tabloları Kontrol Et

1. Supabase dashboard'a gidin
2. Sol menüden **"Table Editor"** seçin
3. Şu tabloları görmelisiniz:
   - `User`
   - `Course`
   - `TeacherAssignment`

---

## ✅ Adım 7: Test ve Doğrulama

### 7.1. Prisma Studio ile Test

```bash
npx prisma studio
```

Bu komut:
- Tarayıcıda Prisma Studio'yu açar
- Database içeriğini görsel olarak gösterir
- Veri ekleme/düzenleme yapabilirsiniz

### 7.2. Seed Data Ekleme (Opsiyonel)

Örnek veriler eklemek için:

```bash
npm run seed
```

Bu komut:
- Admin kullanıcı oluşturur
- Örnek öğretmen ekler
- Örnek ders ve atama oluşturur

**Test Hesapları:**
- Admin: `admin@kampusten.com` / `admin123`
- Öğretmen: `teacher@kampusten.com` / `teacher123`

### 7.3. Supabase SQL Editor ile Test

1. Supabase dashboard'da **"SQL Editor"** seçin
2. Şu sorguyu çalıştırın:

```sql
SELECT * FROM "User";
```

3. Kullanıcıları görmelisiniz

---

## 🚀 Adım 8: Production Deployment

### 8.1. Vercel/Railway/Render'a Deploy

Deployment platformunda:

1. **Environment Variables** ekleyin:
   - `DATABASE_URL` = Supabase connection string
   - `NODE_ENV` = `production`

2. **Build Command:**
   ```
   npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```

3. **Start Command:**
   ```
   npm start
   ```

### 8.2. Production Migration

Production'da migration çalıştırmak için:

```bash
npx prisma migrate deploy
```

Bu komut sadece uygulanmamış migration'ları çalıştırır.

---

## 🔒 Güvenlik Ayarları

### 8.1. Database Şifresini Güvenli Tutun

- Connection string'i asla public repository'lere commit etmeyin
- Environment variables kullanın
- Şifreleri düzenli olarak değiştirin

### 8.2. Row Level Security (RLS) - İleri Seviye

Supabase'de Row Level Security aktif edebilirsiniz:

1. **"Authentication"** → **"Policies"** bölümüne gidin
2. Her tablo için policy oluşturun
3. Bu, database seviyesinde güvenlik sağlar

**Not:** Şu an için Prisma kullandığımız için RLS opsiyoneldir.

### 8.3. Connection Pooling Kullanın

Production için mutlaka Connection Pooling kullanın:
- Daha güvenli
- Daha performanslı
- Rate limiting koruması

---

## 🆘 Sorun Giderme

### Sorun 1: Connection String Çalışmıyor

**Hata:** `Connection refused` veya `Authentication failed`

**Çözüm:**
1. Şifrenin doğru olduğundan emin olun
2. Connection string'deki `[PASSWORD]` kısmını URL encode edin
   - Özel karakterler için: `@` → `%40`, `#` → `%23`
3. `sslmode=require` parametresini ekleyin

### Sorun 2: Migration Hatası

**Hata:** `Migration failed` veya `Table already exists`

**Çözüm:**
```bash
# Migration'ı sıfırla (dikkatli kullanın!)
npx prisma migrate reset

# Veya manuel olarak Supabase'de tabloları silin
# Sonra tekrar migration çalıştırın
npx prisma migrate dev
```

### Sorun 3: Prisma Client Generate Hatası

**Hata:** `Prisma Client not generated`

**Çözüm:**
```bash
# Prisma'yı temizle ve yeniden generate et
rm -rf node_modules/.prisma
npx prisma generate
```

### Sorun 4: Connection Limit Hatası

**Hata:** `Too many connections`

**Çözüm:**
1. Connection Pooling kullanın
2. Prisma connection pool ayarlarını yapılandırın
3. Kullanılmayan bağlantıları kapatın

### Sorun 5: SSL Bağlantı Hatası

**Hata:** `SSL connection required`

**Çözüm:**
Connection string'e `?sslmode=require` ekleyin:
```
postgresql://...?sslmode=require
```

---

## 📊 Supabase Dashboard Özellikleri

### Table Editor
- Tabloları görsel olarak düzenleyin
- Veri ekleyin/düzenleyin/silin
- Filtreleme ve arama yapın

### SQL Editor
- SQL sorguları çalıştırın
- Sorgu geçmişini görüntüleyin
- Favori sorguları kaydedin

### Database Settings
- Connection bilgileri
- Connection pooling
- Database şifresi değiştirme
- Backup ayarları

### API Settings
- REST API endpoint'leri
- GraphQL endpoint'leri
- API anahtarları

---

## 📈 Monitoring ve Analytics

### Database Usage

1. **"Settings"** → **"Usage"** bölümüne gidin
2. Database kullanımınızı görüntüleyin:
   - Storage kullanımı
   - Bandwidth kullanımı
   - API istekleri

### Logs

1. **"Logs"** bölümüne gidin
2. Database loglarını görüntüleyin
3. Hataları takip edin

---

## 🎯 Özet Checklist

- [ ] Supabase hesabı oluşturuldu
- [ ] Yeni proje oluşturuldu
- [ ] Database şifresi kaydedildi
- [ ] Connection string kopyalandı
- [ ] `.env` dosyasına eklendi
- [ ] Prisma schema PostgreSQL'e geçirildi
- [ ] Prisma Client generate edildi
- [ ] Migration çalıştırıldı
- [ ] Tablolar Supabase'de görüntülendi
- [ ] Seed data eklendi (opsiyonel)
- [ ] Production deployment için hazır

---

## 🔗 Yararlı Linkler

- [Supabase Dokümantasyon](https://supabase.com/docs)
- [PostgreSQL Dokümantasyon](https://www.postgresql.org/docs/)
- [Prisma Dokümantasyon](https://www.prisma.io/docs)
- [Supabase Status](https://status.supabase.com)

---

## 💡 İpuçları

1. **Connection Pooling Kullanın:** Production için mutlaka pooling kullanın
2. **Şifreleri Güvenli Tutun:** Connection string'leri asla commit etmeyin
3. **Backup Alın:** Önemli veriler için düzenli backup alın
4. **Monitoring Yapın:** Usage bölümünden kullanımı takip edin
5. **SQL Editor Kullanın:** Karmaşık sorgular için SQL Editor'ü kullanın

---

**Başarılar! 🎉**

Artık Supabase database'iniz hazır ve projenize entegre edildi!

