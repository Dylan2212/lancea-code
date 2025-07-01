import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['tzepbpbmwronhjhwgsyg.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tzepbpbmwronhjhwgsyg.supabase.co',
        pathname: '/storage/v1/object/public/profile-images/**',
      },
    ],
  },
}

export default nextConfig
