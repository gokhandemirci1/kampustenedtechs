# ✅ Vercel Environment Variables Kontrol Listesi

## 🔍 Yapmanız Gerekenler

### 1. Vercel Dashboard'a Gidin
- https://vercel.com/dashboard
- Projenizi seçin

### 2. Environment Variables Kontrolü

**Settings** → **Environment Variables** sekmesine gidin ve şunu ekleyin/kontrol edin:

```
DATABASE_URL = postgresql://postgres.drzlusgujsfdbrnihtej:b2bqzhw5zkqGISJtLv06UT4H0f6rkkOY@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?sslmode=require
```

**ÖNEMLİ:**
- ✅ **Production** için ekleyin
- ✅ **Preview** için ekleyin  
- ✅ **Development** için ekleyin

### 3. Build Command Kontrolü

**Settings** → **General** → **Build & Development Settings**

**Build Command** şöyle olmalı:
```
npm run build
```

(Artık `prisma generate` yok, çünkü `postinstall` script'i zaten çalıştırıyor)

### 4. Build Cache Temizleme

**Settings** → **General** → **Clear Build Cache** butonuna tıklayın

### 5. Yeniden Deploy

- Son deployment'ın yanındaki **"..."** → **"Redeploy"**
- Veya GitHub'a yeni commit push edin

## ✅ Kontrol Listesi

- [ ] `DATABASE_URL` environment variable eklendi (Production, Preview, Development)
- [ ] Build Command: `npm run build`
- [ ] Build Cache temizlendi
- [ ] Yeniden deploy edildi

## 🎯 Sonuç

Artık:
- ✅ `npm install` → `postinstall` → `prisma generate` (otomatik)
- ✅ `npm run build` → `next build` (hızlı, timeout yok)

Build başarılı olmalı! 🚀

