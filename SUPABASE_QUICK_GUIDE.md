# ⚡ Supabase Hızlı Kurulum (5 Dakika)

Bu rehber, Supabase database'inin en hızlı şekilde nasıl kurulacağını gösterir.

**📖 Detaylı rehber için:** [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

---

## 🚀 Hızlı Adımlar

### 1. Supabase'e Kaydol (1 dk)

1. [supabase.com](https://supabase.com) → **"Start your project"**
2. **"Continue with GitHub"** → GitHub ile giriş yap
3. Email doğrulama linkine tıkla

### 2. Proje Oluştur (2 dk)

1. **"New Project"** butonuna tıkla
2. Formu doldur:
   - **Name:** `kampusten-edtech`
   - **Database Password:** Güçlü bir şifre oluştur (kaydet!)
   - **Region:** `West Europe (Ireland)` veya `Central EU (Frankfurt)`
   - **Plan:** `Free`
3. **"Create new project"** → 1-2 dakika bekle

### 3. Connection String Al (1 dk)

1. Sol menü → **Settings** (⚙️) → **Database**
2. **"Connection string"** bölümünde **"URI"** sekmesine tıkla
3. Connection string'i kopyala:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require
   ```
4. ⚠️ **Şifreyi değiştir:** `[PASSWORD]` yerine gerçek şifrenizi yazın

### 4. Projeye Entegre Et (1 dk)

1. Proje dizininde `.env` dosyası oluştur:
   ```env
   DATABASE_URL="postgresql://postgres:GERÇEK_ŞİFRENİZ@db.PROJE_REF.supabase.co:5432/postgres?sslmode=require"
   NODE_ENV=development
   ```

2. PostgreSQL'e geçiş yap:
   ```bash
   npm run switch:postgres
   ```

3. Prisma Client generate et:
   ```bash
   npx prisma generate
   ```

4. Migration çalıştır:
   ```bash
   npx prisma migrate dev --name init
   ```

5. ✅ Hazır! Tablolar Supabase'de oluşturuldu

---

## ✅ Kontrol Et

1. Supabase dashboard → **"Table Editor"**
2. Şu tabloları görmelisiniz:
   - ✅ `User`
   - ✅ `Course`
   - ✅ `TeacherAssignment`

---

## 🎯 Sonraki Adımlar

### Seed Data Ekle (Opsiyonel)

```bash
npm run seed
```

Test hesapları:
- Admin: `admin@kampusten.com` / `admin123`
- Öğretmen: `teacher@kampusten.com` / `teacher123`

### Production Deployment

Vercel/Railway/Render'a deploy ederken:
- `DATABASE_URL` environment variable olarak ekle
- Aynı connection string'i kullan

---

## 🆘 Sorun mu var?

**Connection hatası?**
- Şifrenin doğru olduğundan emin ol
- `?sslmode=require` parametresini ekle
- Özel karakterleri URL encode et

**Migration hatası?**
- `npx prisma migrate reset` (dikkatli!)
- Veya Supabase'de tabloları manuel sil

**Detaylı yardım:** [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

---

**Başarılar! 🚀**

