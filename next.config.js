/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // API route'larının build sırasında analiz edilmesini engelle
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // API route'larını dynamic olarak işaretle
  async headers() {
    return []
  },
}

module.exports = nextConfig

