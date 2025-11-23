import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Get all courses
export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: true,
        assignments: {
          include: {
            teacher: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ courses })
  } catch (error) {
    console.error('Get courses error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Create course
export async function POST(request: NextRequest) {
  try {
    const { title, description, content, teacherId } = await request.json()

    if (!title || !description || !teacherId) {
      return NextResponse.json(
        { error: 'Başlık, açıklama ve öğretmen ID gereklidir' },
        { status: 400 }
      )
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        content,
        teacherId,
      },
      include: {
        teacher: true,
      },
    })

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Create course error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

