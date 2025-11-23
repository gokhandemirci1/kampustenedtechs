'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Navbar } from '@/components/Navbar'

interface Assignment {
  id: string
  course: {
    id: string
    title: string
    description: string
  }
  salary: number
  createdAt: string
}

function TeacherDashboardContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [totalSalary, setTotalSalary] = useState(0)

  useEffect(() => {
    if (!loading && (!user || user.role !== 'TEACHER')) {
      router.push('/login?role=teacher')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.role === 'TEACHER') {
      fetchAssignments()
    }
  }, [user])

  const fetchAssignments = async () => {
    if (!user) return
    
    const res = await fetch(`/api/teachers/assignments?teacherId=${user.id}`)
    const data = await res.json()
    if (res.ok) {
      setAssignments(data.assignments)
      const total = data.assignments.reduce((sum: number, a: Assignment) => sum + a.salary, 0)
      setTotalSalary(total)
    }
  }

  if (loading || !user || user.role !== 'TEACHER') {
    return <div>Yükleniyor...</div>
  }

  const isPending = user.teacherStatus === 'PENDING' || searchParams.get('pending') === 'true'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Öğretmen Dashboard</h1>

        {isPending && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Beklemede:</strong> Hesabınız admin tarafından onaylanmayı bekliyor. 
                  Onaylandıktan sonra size atanan dersleri görebileceksiniz.
                </p>
              </div>
            </div>
          </div>
        )}

        {user.teacherStatus === 'APPROVED' && (
          <>
            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Toplam Ders Sayısı</h3>
                  <p className="text-3xl font-bold text-primary-600">{assignments.length}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Toplam Ücret</h3>
                  <p className="text-3xl font-bold text-green-600">{totalSalary.toFixed(2)} TL</p>
                </div>
              </div>
            </div>

            {/* Assignments List */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Atanan Derslerim</h2>
              {assignments.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-500">Henüz size atanmış bir ders bulunmamaktadır.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {assignment.course.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {assignment.course.description}
                      </p>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Ücret:</span>
                          <span className="text-lg font-bold text-green-600">
                            {assignment.salary.toFixed(2)} TL
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {user.teacherStatus === 'REJECTED' && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong>Reddedildi:</strong> Maalesef başvurunuz reddedilmiştir. 
                  Daha fazla bilgi için lütfen yönetici ile iletişime geçin.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TeacherDashboard() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <TeacherDashboardContent />
    </Suspense>
  )
}

