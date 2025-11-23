import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export interface SessionUser {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'TEACHER' | 'STUDENT'
  teacherStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: 'ADMIN' | 'TEACHER' | 'STUDENT'
) {
  const hashedPassword = await hashPassword(password)
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
      teacherStatus: role === 'TEACHER' ? 'PENDING' : undefined,
    },
  })

  return user
}

export async function authenticateUser(email: string, password: string): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return null
  }

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'ADMIN' | 'TEACHER' | 'STUDENT',
    teacherStatus: user.teacherStatus as 'PENDING' | 'APPROVED' | 'REJECTED' | undefined,
  }
}

