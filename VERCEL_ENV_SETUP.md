# 🔧 Vercel Environment Variables Kurulumu

## 📝 Supabase Connection String

Aşağıdaki connection string'i Vercel'e environment variable olarak eklemeniz gerekiyor:

```
postgresql://postgres:b2bqzhw5zkqGISJtLv06UT4H0f6rkkOY@db.drzlusgujsfdbrnihtej.supabase.co:5432/postgres?sslmode=require
```

## 🚀 Vercel'de Environment Variable Ekleme

### Adım 1: Vercel Dashboard'a Gidin

1. [vercel.com](https://vercel.com) → Giriş yapın
2. Projenizi seçin: **kampustenedtechs**

### Adım 2: Settings'e Gidin

1. Proje sayfasında **"Settings"** sekmesine tıklayın
2. Sol menüden **"Environment Variables"** seçin

### Adım 3: Environment Variable Ekleyin

1. **"Add New"** butonuna tıklayın
2. Şu bilgileri girin:

   **Key (İsim):**
   ```
   DATABASE_URL
   ```

   **Value (Değer):**
   ```
   postgresql://postgres:b2bqzhw5zkqGISJtLv06UT4H0f6rkkOY@db.drzlusgujsfdbrnihtej.supabase.co:5432/postgres?sslmode=require
   ```

3. **Environment'ları seçin:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. **"Save"** butonuna tıklayın

### Adım 4: Redeploy

Environment variable eklendikten sonra:

1. **"Deployments"** sekmesine gidin
2. En son deployment'ın yanındaki **"..."** menüsüne tıklayın
3. **"Redeploy"** seçin
4. Veya yeni bir commit push edin (otomatik redeploy)

## ✅ Kontrol

Deployment başarılı olduktan sonra:

1. Vercel Dashboard → **Deployments**
2. Build loglarını kontrol edin
3. Şu adımları görmelisiniz:
   - ✅ `npm install`
   - ✅ `npx prisma generate`
   - ✅ `npx prisma migrate deploy`
   - ✅ `npm run build`

## 🔒 Güvenlik Notları

- ⚠️ **ÖNEMLİ:** Connection string'i asla public repository'lere commit etmeyin
- ✅ `.env` dosyası `.gitignore`'da olduğundan commit edilmeyecek
- ✅ Vercel environment variables güvenli bir şekilde saklanır
- ✅ Production'da connection string'i environment variable olarak kullanın

## 📋 Environment Variables Listesi

Vercel'de şu environment variable'lar olmalı:

| Key | Value | Açıklama |
|-----|-------|----------|
| `DATABASE_URL` | `postgresql://postgres:...` | Supabase PostgreSQL connection string |
| `NODE_ENV` | `production` | Otomatik eklenir (opsiyonel) |

## 🆘 Sorun Giderme

### Sorun 1: Build Hatası

**Hata:** `Can't reach database server`

**Çözüm:**
- `DATABASE_URL` environment variable'ının doğru eklendiğinden emin olun
- Connection string'in tamamını kopyaladığınızdan emin olun
- Supabase database'inin aktif olduğundan emin olun

### Sorun 2: Migration Hatası

**Hata:** `Migration failed`

**Çözüm:**
- `DATABASE_URL` doğru mu kontrol edin
- Supabase database'ine erişebildiğinizden emin olun
- Build loglarını kontrol edin

### Sorun 3: Environment Variable Görünmüyor

**Çözüm:**
- Environment variable'ı ekledikten sonra **redeploy** yapın
- Veya yeni bir commit push edin
- Build loglarında environment variable'ların yüklendiğini kontrol edin

## 🎯 Özet

1. ✅ Vercel Dashboard → Settings → Environment Variables
2. ✅ `DATABASE_URL` ekle
3. ✅ Connection string'i yapıştır
4. ✅ Tüm environment'ları seç (Production, Preview, Development)
5. ✅ Save
6. ✅ Redeploy

---

**Başarılar! 🚀**

