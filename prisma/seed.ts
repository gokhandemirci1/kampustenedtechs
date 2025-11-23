import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kampusten.com' },
    update: {},
    create: {
      email: 'admin@kampusten.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', admin.email, 'Password: admin123')

  // Create a sample approved teacher
  const teacherPassword = await bcrypt.hash('teacher123', 10)
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@kampusten.com' },
    update: {},
    create: {
      email: 'teacher@kampusten.com',
      password: teacherPassword,
      name: 'Örnek Öğretmen',
      role: 'TEACHER',
      teacherStatus: 'APPROVED',
    },
  })

  console.log('Sample teacher created:', teacher.email, 'Password: teacher123')

  // Create a sample course
  const course = await prisma.course.create({
    data: {
      title: 'Web Geliştirme Temelleri',
      description: 'HTML, CSS ve JavaScript ile web geliştirmeye giriş',
      content: 'Bu ders web geliştirmenin temellerini kapsar. HTML yapısı, CSS stillendirme ve JavaScript programlama konularını içerir.',
      teacherId: teacher.id,
    },
  })

  console.log('Sample course created:', course.title)

  // Create a sample assignment
  const assignment = await prisma.teacherAssignment.create({
    data: {
      courseId: course.id,
      teacherId: teacher.id,
      salary: 5000.00,
    },
  })

  console.log('Sample assignment created with salary:', assignment.salary)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

