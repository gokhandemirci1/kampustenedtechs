import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Build sırasında bu route'un çalıştırılmamasını garanti et
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const runtime = 'nodejs'

// Get all assignments
export async function GET(request: NextRequest) {
  try {
    const assignments = await prisma.teacherAssignment.findMany({
      include: {
        course: true,
        teacher: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ assignments })
  } catch (error) {
    console.error('Get assignments error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Create assignment (assign course to teacher)
export async function POST(request: NextRequest) {
  try {
    const { courseId, teacherId, salary } = await request.json()

    if (!courseId || !teacherId || salary === undefined) {
      return NextResponse.json(
        { error: 'Ders ID, öğretmen ID ve ücret gereklidir' },
        { status: 400 }
      )
    }

    // Check if teacher is approved
    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
    })

    if (!teacher || teacher.role !== 'TEACHER' || teacher.teacherStatus !== 'APPROVED') {
      return NextResponse.json(
        { error: 'Sadece onaylı öğretmenlere ders atanabilir' },
        { status: 400 }
      )
    }

    const assignment = await prisma.teacherAssignment.create({
      data: {
        courseId,
        teacherId,
        salary: parseFloat(salary),
      },
      include: {
        course: true,
        teacher: true,
      },
    })

    return NextResponse.json({ assignment })
  } catch (error: any) {
    console.error('Create assignment error:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Bu ders zaten bu öğretmene atanmış' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

