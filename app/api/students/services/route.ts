import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Get all approved courses and teachers (services)
export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        teacher: {
          teacherStatus: 'APPROVED',
        },
      },
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const teachers = await prisma.user.findMany({
      where: {
        role: 'TEACHER',
        teacherStatus: 'APPROVED',
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ courses, teachers })
  } catch (error) {
    console.error('Get services error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

