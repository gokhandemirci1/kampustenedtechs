'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getDashboardLink = () => {
    if (!user) return null
    
    switch (user.role) {
      case 'ADMIN':
        return '/dashboard/admin'
      case 'TEACHER':
        return '/dashboard/teacher'
      case 'STUDENT':
        return '/dashboard/student'
      default:
        return null
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary-600">Kampüsten</h1>
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <span className="text-gray-700">Hoş geldiniz, {user.name}</span>
                {getDashboardLink() && (
                  <Link
                    href={getDashboardLink()!}
                    className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

