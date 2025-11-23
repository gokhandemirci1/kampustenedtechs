import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Build sırasında bu route'un çalıştırılmamasını garanti et
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const runtime = 'nodejs'

// Get all teachers (for admin)
export async function GET(request: NextRequest) {
  try {
    const teachers = await prisma.user.findMany({
      where: {
        role: 'TEACHER',
      },
      include: {
        assignments: {
          include: {
            course: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ teachers })
  } catch (error) {
    console.error('Get teachers error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

// Approve or reject teacher
export async function PATCH(request: NextRequest) {
  try {
    const { teacherId, status } = await request.json()

    if (!teacherId || !status) {
      return NextResponse.json(
        { error: 'Öğretmen ID ve durum gereklidir' },
        { status: 400 }
      )
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Geçersiz durum' },
        { status: 400 }
      )
    }

    const teacher = await prisma.user.update({
      where: { id: teacherId },
      data: { teacherStatus: status },
    })

    return NextResponse.json({ teacher })
  } catch (error) {
    console.error('Update teacher status error:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

