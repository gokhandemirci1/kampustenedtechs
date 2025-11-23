# 🗄️ Supabase Tablolarını Manuel Oluşturma

Build sırasında `prisma db push` timeout oluyor. Bu durumda tabloları manuel olarak oluşturabilirsiniz.

## 📝 Adım 1: Supabase SQL Editor'a Git

1. [Supabase Dashboard](https://app.supabase.com) → Projenize gidin
2. Sol menüden **"SQL Editor"** seçin
3. **"New query"** butonuna tıklayın

## 📝 Adım 2: SQL'i Çalıştır

Aşağıdaki SQL'i kopyalayıp SQL Editor'a yapıştırın ve **"Run"** butonuna tıklayın:

```sql
-- CreateTable: User
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "teacherStatus" TEXT DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Course
CREATE TABLE IF NOT EXISTS "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teacherId" TEXT NOT NULL,
    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable: TeacherAssignment
CREATE TABLE IF NOT EXISTS "TeacherAssignment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TeacherAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: User email unique
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- CreateIndex: TeacherAssignment unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS "TeacherAssignment_courseId_teacherId_key" ON "TeacherAssignment"("courseId", "teacherId");

-- AddForeignKey: Course -> User
ALTER TABLE "Course" ADD CONSTRAINT IF NOT EXISTS "Course_teacherId_fkey" 
    FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: TeacherAssignment -> Course
ALTER TABLE "TeacherAssignment" ADD CONSTRAINT IF NOT EXISTS "TeacherAssignment_courseId_fkey" 
    FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey: TeacherAssignment -> User
ALTER TABLE "TeacherAssignment" ADD CONSTRAINT IF NOT EXISTS "TeacherAssignment_teacherId_fkey" 
    FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

## ✅ Adım 3: Kontrol Et

1. **Table Editor** → Tabloları görüntüleyin
2. Şu tabloları görmelisiniz:
   - ✅ `User`
   - ✅ `Course`
   - ✅ `TeacherAssignment`

## 🚀 Sonuç

Artık tablolar oluşturuldu. Build sırasında:
- ✅ `npx prisma generate` - Prisma Client oluşturulur
- ✅ `npm run build` - Next.js build edilir
- ✅ Tablolar zaten mevcut olduğu için sorun olmaz

## 📝 Notlar

- `IF NOT EXISTS` kullanıldı, güvenli çalıştırma için
- Tablolar zaten varsa hata vermez
- Birden fazla kez çalıştırabilirsiniz

---

**Tablolar oluşturulduktan sonra build başarılı olacak! 🎉**

