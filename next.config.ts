import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tzepbpbmwronhjhwgsyg.supabase.co',
        pathname: '/storage/v1/object/public/profile-images/**',
      },

      {
        protocol: 'https',
        hostname: 'tzepbpbmwronhjhwgsyg.supabase.co',
        pathname: '/storage/v1/object/public/projects/**',
      },
      {
        protocol: "https",
        hostname: "tzepbpbmwronhjhwgsyg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**"
      }
    ],
  },
}

export default nextConfig
