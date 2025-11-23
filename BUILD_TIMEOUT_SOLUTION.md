# 🔧 Build Timeout Sorunu - Detaylı Çözüm

## ❌ Sorun

Build sırasında Prisma Supabase'e bağlanırken takılıyor:

```
Datasource "db": PostgreSQL database "postgres", schema "public" at "aws-1-ap-southeast-2.pooler.supabase.com:6543"
```

## 🔍 Olası Nedenler

### 1. Connection Pooling Timeout
- Connection Pooling bazen yavaş yanıt verebilir
- Build timeout süresi aşılabilir
- Network latency sorunu olabilir

### 2. Prisma db push Çok Uzun Sürüyor
- `prisma db push` komutu schema'yı analiz eder
- Veritabanına bağlanır ve değişiklikleri uygular
- Bu işlem bazen çok uzun sürebilir

### 3. Vercel Build Timeout
- Vercel'in build timeout limiti var
- Eğer işlem çok uzun sürerse timeout olur

## ✅ Çözüm 1: Build'de db push Yapma (ÖNERİLEN)

Build sırasında `db push` yapmak yerine, sadece `generate` yapın. Tabloları manuel olarak oluşturun veya migration kullanın.

### package.json
```json
"build": "npx prisma generate && next build"
```

### vercel.json
```json
{
  "buildCommand": "npx prisma generate && npx prisma db push --accept-data-loss --skip-generate && npm run build"
}
```

**VEYA daha iyi:**

### vercel.json (Sadece generate)
```json
{
  "buildCommand": "npx prisma generate && npm run build"
}
```

Sonra tabloları manuel olarak oluşturun:
1. Supabase Dashboard → SQL Editor
2. Migration SQL'i çalıştırın
3. Veya `prisma db push` komutunu local'de çalıştırın

## ✅ Çözüm 2: Timeout Ayarları Ekle

### .env (Vercel'de Environment Variables)
```
DATABASE_URL=...
PRISMA_CLIENT_ENGINE_TYPE=binary
PRISMA_QUERY_ENGINE_LIBRARY=/tmp/query-engine
```

### lib/prisma.ts
```typescript
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
```

## ✅ Çözüm 3: Migration Kullan (Daha Güvenilir)

Migration dosyaları oluşturup kullanın:

```bash
# Local'de migration oluştur
npx prisma migrate dev --name init

# Migration dosyalarını commit et
git add prisma/migrations
git commit -m "Add initial migration"
git push

# Vercel'de migrate deploy kullan
```

### vercel.json
```json
{
  "buildCommand": "npx prisma generate && npx prisma migrate deploy && npm run build"
}
```

## ✅ Çözüm 4: Build Hook Kullan

Vercel'de Build Hook oluşturun ve migration'ları ayrı çalıştırın.

## 🎯 Önerilen Çözüm

**En basit ve güvenilir çözüm:**

1. Build'de sadece `prisma generate` yapın
2. Tabloları Supabase Dashboard'dan manuel oluşturun
3. Veya local'de `prisma db push` çalıştırıp tabloları oluşturun

### Adımlar:

1. **vercel.json güncelle:**
```json
{
  "buildCommand": "npx prisma generate && npm run build"
}
```

2. **Supabase Dashboard'da tabloları oluştur:**
   - SQL Editor → Migration SQL'i çalıştır
   - Veya Table Editor'dan manuel oluştur

3. **Build tekrar dene**

## 📝 Alternatif: Pre-build Hook

Vercel'de pre-build hook kullanarak migration'ları ayrı çalıştırabilirsiniz.

---

**En hızlı çözüm: Build'de db push yapmayın, sadece generate yapın!**

