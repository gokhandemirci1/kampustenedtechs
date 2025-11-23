import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get assignments for a specific teacher
export async function GET(request: NextRequest) {
  try {
    const teacherId = request.nextUrl.searchParams.get('teacherId')

    if (!teacherId) {
      return NextResponse.json(
        { error: 'Öğretmen ID gereklidir' },
        { status: 400 }
      )
    }

    const assignments = await prisma.teacherAssignment.findMany({
      where: {
        teacherId,
      },
      include: {
        course: {
          include: {
            teacher: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ assignments })
  } catch (error) {
    console.error('Get teacher assignments error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

