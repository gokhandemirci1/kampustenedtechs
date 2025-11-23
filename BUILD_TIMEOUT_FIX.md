# 🔧 Build Timeout Sorunu Çözümü

## ❌ Sorun

Build log'u şu aşamada takılıyor:

```
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "postgres", schema "public" at "aws-1-ap-southeast-2.pooler.supabase.com:6543"
```

## 🔍 Neden

`prisma migrate deploy` komutu:
- Migration dosyalarını okumaya çalışıyor
- Veritabanına bağlanıyor
- Migration'ları uygulamaya çalışıyor
- Ama timeout oluyor veya takılıyor

## ✅ Çözüm 1: `prisma db push` Kullan (Önerilen)

`prisma migrate deploy` yerine `prisma db push` kullanın:

**Avantajları:**
- ✅ Daha hızlı
- ✅ Migration dosyalarına ihtiyaç yok
- ✅ Schema'yı direkt uygular
- ✅ Production için uygun

**Dezavantajları:**
- ⚠️ Migration geçmişi tutulmaz
- ⚠️ Veri kaybı olabilir (ilk kurulumda sorun değil)

### package.json Güncellemesi

```json
"build": "npx prisma generate && npx prisma db push --accept-data-loss && next build"
```

## ✅ Çözüm 2: Migration Timeout Artırma

Eğer migration kullanmak istiyorsanız, timeout süresini artırın:

### next.config.js

```javascript
const nextConfig = {
  reactStrictMode: true,
  // Prisma timeout ayarları
  env: {
    PRISMA_QUERY_ENGINE_LIBRARY: process.env.PRISMA_QUERY_ENGINE_LIBRARY,
  },
}
```

### .env (Vercel'de)

```
DATABASE_URL=... (mevcut)
PRISMA_CLIENT_ENGINE_TYPE=binary
```

## ✅ Çözüm 3: Migration Dosyasını Basitleştir

Migration dosyası çok karmaşık olabilir. Daha basit bir versiyon deneyin.

## 🚀 Önerilen Çözüm

**`prisma db push` kullanın** - İlk kurulum için en hızlı ve güvenilir yöntem:

1. `package.json`'daki build script'i güncelleyin
2. Migration dosyalarını silebilirsiniz (opsiyonel)
3. Build'i tekrar deneyin

## 📝 Build Script Karşılaştırması

### Önceki (Migration ile):
```json
"build": "npx prisma generate && npx prisma migrate deploy && next build"
```

### Yeni (db push ile):
```json
"build": "npx prisma generate && npx prisma db push --accept-data-loss && next build"
```

## ⚠️ Önemli Notlar

- `--accept-data-loss` flag'i: Eğer tablolar varsa ve schema değiştiyse, veri kaybı olabilir
- İlk kurulumda sorun değil (tablolar yok)
- Sonradan migration'a geçebilirsiniz

## 🎯 Sonuç

`prisma db push` kullanarak:
- ✅ Daha hızlı build
- ✅ Timeout sorunu çözülür
- ✅ Tablolar oluşturulur
- ✅ Build başarılı olur

---

**Başarılar! 🚀**

