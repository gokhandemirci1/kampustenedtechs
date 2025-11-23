'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Navbar } from '@/components/Navbar'

interface Teacher {
  id: string
  name: string
  email: string
  teacherStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
}

interface Course {
  id: string
  title: string
  description: string
  teacher: {
    id: string
    name: string
  }
}

interface Assignment {
  id: string
  course: Course
  teacher: {
    id: string
    name: string
  }
  salary: number
}

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [activeTab, setActiveTab] = useState<'teachers' | 'courses' | 'assignments'>('teachers')
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showAssignmentForm, setShowAssignmentForm] = useState(false)
  const [courseForm, setCourseForm] = useState({ title: '', description: '', content: '', teacherId: '' })
  const [assignmentForm, setAssignmentForm] = useState({ courseId: '', teacherId: '', salary: '' })

  useEffect(() => {
    if (!loading && (!user || user.role !== 'ADMIN')) {
      router.push('/login?role=admin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      fetchTeachers()
      fetchCourses()
      fetchAssignments()
    }
  }, [user])

  const fetchTeachers = async () => {
    const res = await fetch('/api/admin/teachers')
    const data = await res.json()
    if (res.ok) {
      setTeachers(data.teachers)
    }
  }

  const fetchCourses = async () => {
    const res = await fetch('/api/admin/courses')
    const data = await res.json()
    if (res.ok) {
      setCourses(data.courses)
    }
  }

  const fetchAssignments = async () => {
    const res = await fetch('/api/admin/assignments')
    const data = await res.json()
    if (res.ok) {
      setAssignments(data.assignments)
    }
  }

  const handleApproveTeacher = async (teacherId: string, status: 'APPROVED' | 'REJECTED') => {
    const res = await fetch('/api/admin/teachers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacherId, status }),
    })
    if (res.ok) {
      fetchTeachers()
    }
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseForm),
    })
    if (res.ok) {
      setCourseForm({ title: '', description: '', content: '', teacherId: '' })
      setShowCourseForm(false)
      fetchCourses()
    }
  }

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignmentForm),
    })
    if (res.ok) {
      setAssignmentForm({ courseId: '', teacherId: '', salary: '' })
      setShowAssignmentForm(false)
      fetchAssignments()
    } else {
      const data = await res.json()
      alert(data.error || 'Hata oluştu')
    }
  }

  if (loading || !user || user.role !== 'ADMIN') {
    return <div>Yükleniyor...</div>
  }

  const approvedTeachers = teachers.filter(t => t.teacherStatus === 'APPROVED')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'teachers'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Öğretmenler
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dersler
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'assignments'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ders Atamaları
            </button>
          </nav>
        </div>

        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Öğretmen Onayları</h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-posta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {teacher.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          teacher.teacherStatus === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          teacher.teacherStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {teacher.teacherStatus === 'APPROVED' ? 'Onaylandı' :
                           teacher.teacherStatus === 'REJECTED' ? 'Reddedildi' : 'Beklemede'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {teacher.teacherStatus === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApproveTeacher(teacher.id, 'APPROVED')}
                              className="text-green-600 hover:text-green-900 mr-4"
                            >
                              Onayla
                            </button>
                            <button
                              onClick={() => handleApproveTeacher(teacher.id, 'REJECTED')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reddet
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Dersler</h2>
              <button
                onClick={() => setShowCourseForm(!showCourseForm)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Yeni Ders Ekle
              </button>
            </div>
            {showCourseForm && (
              <form onSubmit={handleCreateCourse} className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ders Başlığı</label>
                    <input
                      type="text"
                      required
                      value={courseForm.title}
                      onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Açıklama</label>
                    <textarea
                      required
                      value={courseForm.description}
                      onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">İçerik</label>
                    <textarea
                      value={courseForm.content}
                      onChange={(e) => setCourseForm({ ...courseForm, content: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Öğretmen</label>
                    <select
                      required
                      value={courseForm.teacherId}
                      onChange={(e) => setCourseForm({ ...courseForm, teacherId: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Seçiniz</option>
                      {approvedTeachers.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Kaydet
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCourseForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              </form>
            )}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Başlık</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Açıklama</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Öğretmen</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {course.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {course.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.teacher.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Ders Atamaları</h2>
              <button
                onClick={() => setShowAssignmentForm(!showAssignmentForm)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Yeni Atama Yap
              </button>
            </div>
            {showAssignmentForm && (
              <form onSubmit={handleCreateAssignment} className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ders</label>
                    <select
                      required
                      value={assignmentForm.courseId}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, courseId: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Seçiniz</option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Öğretmen</label>
                    <select
                      required
                      value={assignmentForm.teacherId}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, teacherId: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Seçiniz</option>
                      {approvedTeachers.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ücret (TL)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={assignmentForm.salary}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, salary: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Kaydet
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAssignmentForm(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              </form>
            )}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Öğretmen</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ücret (TL)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {assignment.course.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.teacher.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assignment.salary.toFixed(2)} TL
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

