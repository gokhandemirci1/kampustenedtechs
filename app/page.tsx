import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Kampüsten</h1>
            </div>
            <div className="flex gap-4">
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
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Modern Eğitim İçeriklerine Ücretsiz Erişim
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kampüsten ile kaliteli eğitim içeriklerine kolayca ulaşın. 
            Uzman öğretmenlerimizden ders alın ve kendinizi geliştirin.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Zengin İçerik</h3>
            <p className="text-gray-600">
              Çeşitli konularda hazırlanmış kaliteli eğitim içeriklerine erişin.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold mb-2">Uzman Öğretmenler</h3>
            <p className="text-gray-600">
              Alanında uzman, onaylı öğretmenlerimizden ders alın.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🆓</div>
            <h3 className="text-xl font-semibold mb-2">Ücretsiz Erişim</h3>
            <p className="text-gray-600">
              Tüm içeriklere ücretsiz kayıt olduktan sonra erişebilirsiniz.
            </p>
          </div>
        </div>

        {/* Login Options */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Giriş Yap</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/login?role=student"
              className="block p-6 border-2 border-primary-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all text-center"
            >
              <div className="text-4xl mb-3">🎓</div>
              <h4 className="text-lg font-semibold mb-2">Öğrenci Girişi</h4>
              <p className="text-sm text-gray-600">
                Eğitim içeriklerine erişmek için giriş yapın
              </p>
            </Link>
            <Link
              href="/login?role=teacher"
              className="block p-6 border-2 border-primary-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all text-center"
            >
              <div className="text-4xl mb-3">👨‍🏫</div>
              <h4 className="text-lg font-semibold mb-2">Öğretmen Girişi</h4>
              <p className="text-sm text-gray-600">
                Öğretmen panelinize erişmek için giriş yapın
              </p>
            </Link>
            <Link
              href="/login?role=admin"
              className="block p-6 border-2 border-primary-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all text-center"
            >
              <div className="text-4xl mb-3">⚙️</div>
              <h4 className="text-lg font-semibold mb-2">Admin Girişi</h4>
              <p className="text-sm text-gray-600">
                Yönetim panelinize erişmek için giriş yapın
              </p>
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Kampüsten Hakkında</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Kampüsten, modern eğitim teknolojileri kullanarak öğrencilere kaliteli eğitim içerikleri 
            sunan bir platformdur. Ücretsiz kayıt olduktan sonra, platformumuzda bulunan tüm eğitim 
            içeriklerine erişebilirsiniz.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Öğretmenlerimiz admin tarafından onaylandıktan sonra platformda yer alır ve öğrencilerimiz 
            onaylı öğretmen profillerini görüntüleyebilir. Öğretmenler, kendilerine atanan dersleri ve 
            alacakları ücretleri dashboard üzerinden takip edebilirler.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Kampüsten. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}

