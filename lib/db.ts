// Database helper functions - Direct database access
// Use these instead of API routes when you need data during build time

import { prisma } from './prisma'

export async function getTeachers() {
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
    return teachers
  } catch (error) {
    console.error('Get teachers error:', error)
    return []
  }
}

export async function getCourses() {
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
    return courses
  } catch (error) {
    console.error('Get courses error:', error)
    return []
  }
}

export async function getAssignments() {
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
    return assignments
  } catch (error) {
    console.error('Get assignments error:', error)
    return []
  }
}

export async function getServices() {
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

    return { courses, teachers }
  } catch (error) {
    console.error('Get services error:', error)
    return { courses: [], teachers: [] }
  }
}

export async function getTeacherAssignments(teacherId: string) {
  try {
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
    return assignments
  } catch (error) {
    console.error('Get teacher assignments error:', error)
    return []
  }
}

