# Kampüsten - Eğitim Platformu

Modern eğitim içeriklerine ücretsiz erişim sağlayan bir eğitim platformu.

## Özellikler

- **Ücretsiz Kayıt**: Öğrenciler ücretsiz kayıt olarak tüm içeriklere erişebilir
- **Öğretmen Onay Sistemi**: Öğretmen kayıtları admin tarafından onaylanır
- **Ders Yönetimi**: Admin tarafından dersler oluşturulur ve öğretmenlere atanır
- **Ücret Takibi**: Öğretmenler atanan dersler ve alacakları ücretleri görebilir
- **Rol Tabanlı Erişim**: Admin, Öğretmen ve Öğrenci rolleri

## Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Prisma** - Database ORM
- **SQLite** - Development Database
- **PostgreSQL** - Production Database
- **bcryptjs** - Password hashing

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Veritabanını oluşturun:
```bash
npx prisma generate
npx prisma db push
```

3. (Opsiyonel) İlk admin kullanıcısını oluşturun:
```bash
npm run seed
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## Kullanım

### Admin Girişi
- Admin kullanıcısı ile giriş yapın
- Öğretmen kayıtlarını onaylayın/reddedin
- Dersler oluşturun
- Dersleri öğretmenlere atayın ve ücret belirleyin

### Öğretmen Girişi
- Öğretmen olarak kayıt olun
- Admin onayı bekleyin
- Onaylandıktan sonra atanan dersleri ve ücretleri görüntüleyin

### Öğrenci Girişi
- Öğrenci olarak kayıt olun
- Eğitim içeriklerini görüntüleyin
- Onaylı öğretmen profillerini inceleyin

## Veritabanı Yapısı

- **User**: Kullanıcılar (Admin, Öğretmen, Öğrenci)
- **Course**: Dersler
- **TeacherAssignment**: Öğretmen-Ders atamaları ve ücretler

## Notlar

- İlk admin kullanıcısını oluşturmak için seed script'ini kullanabilirsiniz
- Öğretmenler admin onayından sonra aktif olur
- Sadece onaylı öğretmenlere ders atanabilir

## 🚀 Production Deployment

Projeyi internete yüklemek için detaylı rehberler:

- **[Hızlı Başlangıç](QUICK_START_DEPLOYMENT.md)** - En hızlı deployment yöntemi
- **[Detaylı Rehber](DEPLOYMENT.md)** - Tüm hosting seçenekleri ve adımlar
- **[Environment Variables](ENV_SETUP.md)** - Environment variables kurulumu

### Önerilen Stack

- **Hosting**: Vercel (Next.js için optimize)
- **Database**: Supabase veya Railway PostgreSQL
- **Domain**: İstediğiniz domain sağlayıcısı

### Hızlı Deployment (5 dakika)

```bash
# 1. GitHub'a yükle
git init && git add . && git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main

# 2. PostgreSQL'e geçiş
npm run switch:postgres

# 3. Vercel'e deploy et (vercel.com)
# 4. Supabase database oluştur (supabase.com)
# 5. DATABASE_URL'i Vercel'e ekle
# ✅ Hazır!
```

Detaylar için [QUICK_START_DEPLOYMENT.md](QUICK_START_DEPLOYMENT.md) dosyasına bakın.

