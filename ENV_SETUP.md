# Environment Variables Kurulumu

## Development (.env)

Proje kök dizininde `.env` dosyası oluşturun:

```env
# Database (Development - SQLite)
DATABASE_URL="file:./dev.db"

# Environment
NODE_ENV=development

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Production (.env.production)

Production ortamı için environment variables:

```env
# Database (Production - PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Environment
NODE_ENV=production

# Next.js
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Hosting Platformlarında Ayarlama

### Vercel
1. Project Settings > Environment Variables
2. Aşağıdaki değişkenleri ekleyin:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_APP_URL` (Vercel otomatik verir, opsiyonel)

### Railway
1. Project > Variables
2. Aşağıdaki değişkenleri ekleyin:
   - `DATABASE_URL` (Railway PostgreSQL otomatik ekler)
   - `NODE_ENV=production`

### Render
1. Environment > Environment Variables
2. Aşağıdaki değişkenleri ekleyin:
   - `DATABASE_URL` (Render PostgreSQL connection string)
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_APP_URL` (Render URL'si)

## PostgreSQL Connection String Formatı

```
postgresql://username:password@host:port/database?sslmode=require
```

Örnek:
```
postgresql://kampusten_user:secure_password@db.railway.app:5432/kampusten?sslmode=require
```

## Güvenlik Notları

⚠️ **ÖNEMLİ:**
- `.env` dosyasını asla Git'e commit etmeyin
- Production connection string'lerini güvenli tutun
- Şifreleri güçlü ve benzersiz yapın
- SSL mode'u production'da mutlaka kullanın (`sslmode=require`)

