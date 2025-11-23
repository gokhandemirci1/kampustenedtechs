'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { Navbar } from '@/components/Navbar'

interface Course {
  id: string
  title: string
  description: string
  content?: string
  teacher: {
    id: string
    name: string
    email: string
  }
}

interface Teacher {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function StudentDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [activeTab, setActiveTab] = useState<'services' | 'teachers'>('services')

  useEffect(() => {
    if (!loading && (!user || user.role !== 'STUDENT')) {
      router.push('/login?role=student')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.role === 'STUDENT') {
      fetchServices()
    }
  }, [user])

  const fetchServices = async () => {
    const res = await fetch('/api/students/services')
    const data = await res.json()
    if (res.ok) {
      setCourses(data.courses)
      setTeachers(data.teachers)
    }
  }

  if (loading || !user || user.role !== 'STUDENT') {
    return <div>Yükleniyor...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Öğrenci Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Hoş geldiniz, {user.name}! Platformumuzda sunduğumuz hizmetleri ve onaylı öğretmenleri keşfedin.
        </p>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Eğitim İçerikleri
            </button>
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
          </nav>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Sunduğumuz Hizmetler</h2>
            {courses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">Henüz eğitim içeriği bulunmamaktadır.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Öğretmen:</p>
                          <p className="text-sm font-medium text-gray-900">{course.teacher.name}</p>
                        </div>
                      </div>
                      {course.content && (
                        <div className="mt-4">
                          <details className="cursor-pointer">
                            <summary className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                              İçeriği Görüntüle
                            </summary>
                            <div className="mt-2 p-3 bg-gray-50 rounded text-sm text-gray-700 whitespace-pre-wrap">
                              {course.content}
                            </div>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Teachers Tab */}
        {activeTab === 'teachers' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Onaylı Öğretmenler</h2>
            {teachers.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">Henüz onaylı öğretmen bulunmamaktadır.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">👨‍🏫</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {teacher.name}
                        </h3>
                        <p className="text-sm text-gray-500">{teacher.email}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-xs text-gray-500">
                        Üye olma tarihi: {new Date(teacher.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

