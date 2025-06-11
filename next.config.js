/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Next.js doesn't apply excessive optimizations in development
  swcMinify: process.env.NODE_ENV === 'production',
  
  // Configure image domains if needed
  images: {
    domains: [],
  },
  
  // Remove experimental features that might cause issues
  experimental: {
    serverComponentsExternalPackages: [],
  },
  
  // Enable React strict mode for better debugging
  reactStrictMode: true,
  
  // Disable static export for API routes
  trailingSlash: false,
}

module.exports = nextConfig 