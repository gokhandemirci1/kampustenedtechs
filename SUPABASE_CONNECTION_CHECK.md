# ✅ Supabase Bağlantı Kontrol Listesi

## 🔍 Yapılacak Kontroller

### 1. Supabase Dashboard Kontrolü

1. [Supabase Dashboard](https://app.supabase.com) → Projenize gidin
2. Sol üstte proje adını kontrol edin
3. **Settings** (⚙️) → **Database** sekmesine gidin
4. Şunları kontrol edin:
   - ✅ Database durumu: **"Active"** olmalı
   - ✅ Connection string doğru kopyalandı mı?
   - ✅ Proje oluşturulduktan sonra **2-3 dakika** geçti mi?

### 2. Connection String Doğrulama

Supabase'den aldığınız connection string şu formatta olmalı:

```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require
```

**Mevcut connection string'iniz:**
```
postgresql://postgres:Ahu_k4g%266P%23dmD%24@db.qajwzfwfxoemkdjagzjs.supabase.co:5432/postgres?sslmode=require
```

### 3. Connection String'i Yeniden Kopyalama

1. Supabase Dashboard → **Settings** → **Database**
2. **"Connection string"** bölümüne gidin
3. **"URI"** sekmesine tıklayın
4. **"Copy"** butonuna tıklayın
5. Yeni string'i `.env` dosyasına yapıştırın

### 4. Connection Pooling Deneyin (Önerilir)

Connection Pooling daha güvenilir ve production için önerilir:

1. Supabase Dashboard → **Settings** → **Database**
2. **"Connection string"** bölümünde
3. **"Session"** yerine **"Transaction"** seçin
4. Yeni pooling URL'i kopyalayın
5. `.env` dosyasına ekleyin

**Pooling URL formatı:**
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

### 5. Network/Firewall Kontrolü

- Firewall'unuzun **5432** portunu engellemediğinden emin olun
- VPN kullanıyorsanız kapatıp deneyin
- Farklı bir internet bağlantısından deneyin

### 6. Supabase Status Kontrolü

[Supabase Status](https://status.supabase.com) sayfasından servis durumunu kontrol edin.

## 🔄 Adım Adım Çözüm

### Çözüm 1: Database'in Hazır Olduğundan Emin Olun

1. Supabase Dashboard'a gidin
2. Projenizin **"Active"** durumda olduğunu kontrol edin
3. Eğer "Setting up..." görüyorsanız, birkaç dakika bekleyin

### Çözüm 2: Connection String'i Yeniden Kopyalayın

1. Supabase Dashboard → **Settings** → **Database**
2. **"Connection string"** → **"URI"** sekmesi
3. **Yeni connection string'i kopyalayın**
4. `.env` dosyasını açın
5. `DATABASE_URL` satırını yeni string ile değiştirin

### Çözüm 3: Connection Pooling Kullanın

1. Supabase Dashboard → **Settings** → **Database**
2. **"Connection string"** bölümünde
3. **"Transaction"** modunu seçin
4. Pooling URL'i kopyalayın
5. `.env` dosyasına ekleyin:

```env
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

### Çözüm 4: .env Dosyasını Kontrol Edin

`.env` dosyanız şu şekilde olmalı:

```env
DATABASE_URL=postgresql://postgres:Ahu_k4g%266P%23dmD%24@db.qajwzfwfxoemkdjagzjs.supabase.co:5432/postgres?sslmode=require
```

**VEYA tırnak işareti ile:**

```env
DATABASE_URL="postgresql://postgres:Ahu_k4g%266P%23dmD%24@db.qajwzfwfxoemkdjagzjs.supabase.co:5432/postgres?sslmode=require"
```

### Çözüm 5: Prisma Studio ile Test

```bash
npx prisma studio
```

Bu komut database bağlantısını test eder ve görsel arayüz açar.

## 📝 Doğru .env Formatı

```env
# Supabase PostgreSQL (Direct Connection)
DATABASE_URL=postgresql://postgres:Ahu_k4g%266P%23dmD%24@db.qajwzfwfxoemkdjagzjs.supabase.co:5432/postgres?sslmode=require

# VEYA Connection Pooling (Önerilir)
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

## 🆘 Hala Çalışmıyorsa

1. **Supabase Support:** [support.supabase.com](https://support.supabase.com)
2. **Discord:** Supabase Discord topluluğuna sorun
3. **Alternatif:** Railway PostgreSQL veya Neon deneyin

---

**Başarılar! 🚀**

