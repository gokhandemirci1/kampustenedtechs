# 🔧 Supabase Connection Sorun Giderme

## ✅ Yapılacak Kontroller

### 1. Supabase Dashboard Kontrolü

1. [Supabase Dashboard](https://app.supabase.com) → Projenize gidin
2. Sol menüden **"Settings"** → **"Database"** seçin
3. **"Connection string"** bölümünde:
   - Database'in **"Active"** durumda olduğundan emin olun
   - Proje oluşturulduktan sonra 1-2 dakika beklemeniz gerekebilir

### 2. Connection String Formatı

Supabase'den aldığınız connection string şu formatta olmalı:

```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Özel Karakterler için URL Encoding:**
- `&` → `%26`
- `#` → `%23`
- `$` → `%24`
- `@` → `%40` (sadece şifre içinde)
- `%` → `%25`

### 3. .env Dosyası Formatı

`.env` dosyanızda connection string şu şekilde olmalı:

```env
DATABASE_URL="postgresql://postgres:Ahu_k4g%26P%23dmD%24@db.qajwzfwfxoemkdjagzjs.supabase.co:5432/postgres?sslmode=require"
```

**VEYA tırnak işareti olmadan:**

```env
DATABASE_URL=postgresql://postgres:Ahu_k4g%26P%23dmD%24@db.qajwzfwfxoemkdjagzjs.supabase.co:5432/postgres?sslmode=require
```

### 4. Alternatif: Connection Pooling Kullanın

Supabase'de **Connection Pooling** kullanmak daha güvenilir:

1. Supabase Dashboard → **Settings** → **Database**
2. **"Connection string"** bölümünde
3. **"Session"** yerine **"Transaction"** veya **"Transaction"** seçin
4. Pooling URL'i kopyalayın

**Pooling URL Formatı:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### 5. Şifreyi URL Encode Etmeden Deneyin

Bazen Prisma otomatik olarak handle eder. Şifreyi encode etmeden deneyin:

```env
DATABASE_URL="postgresql://postgres:Ahu_k4g&6P#dmD$@db.qajwzfwfxoemkdjagzjs.supabase.co:5432/postgres?sslmode=require"
```

**⚠️ Not:** Bu durumda şifredeki özel karakterler sorun çıkarabilir.

### 6. Network/Firewall Kontrolü

- Firewall'unuzun 5432 portunu engellemediğinden emin olun
- VPN kullanıyorsanız kapatıp deneyin
- Farklı bir network'ten deneyin

### 7. Supabase Status Kontrolü

[Supabase Status](https://status.supabase.com) sayfasından servis durumunu kontrol edin.

## 🔄 Adım Adım Çözüm

### Çözüm 1: Connection String'i Yeniden Kopyalayın

1. Supabase Dashboard → **Settings** → **Database**
2. **"Connection string"** → **"URI"** sekmesi
3. **Yeni connection string'i kopyalayın**
4. `.env` dosyasına yapıştırın

### Çözüm 2: Connection Pooling Kullanın

1. Supabase Dashboard → **Settings** → **Database**
2. **"Connection string"** bölümünde
3. **"Transaction"** modunu seçin
4. Pooling URL'i kopyalayın
5. `.env` dosyasına ekleyin

### Çözüm 3: Şifreyi Değiştirin

Eğer şifrede çok fazla özel karakter varsa:

1. Supabase Dashboard → **Settings** → **Database**
2. **"Database password"** bölümünde
3. **"Reset database password"** tıklayın
4. Yeni şifre oluşturun (sadece harf, sayı ve `_` kullanın)
5. Yeni connection string'i kopyalayın

### Çözüm 4: Prisma Studio ile Test

```bash
npx prisma studio
```

Bu komut database bağlantısını test eder.

## 📝 Doğru .env Formatı Örneği

```env
# Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres?sslmode=require"

# Veya Connection Pooling ile
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?sslmode=require"
```

## 🆘 Hala Çalışmıyorsa

1. Supabase Dashboard'da database'in **"Active"** olduğundan emin olun
2. Proje oluşturulduktan sonra **2-3 dakika bekleyin**
3. Supabase support ile iletişime geçin
4. Alternatif olarak **Railway PostgreSQL** veya **Neon** deneyin

---

**Başarılar! 🚀**

