/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Next.js doesn't apply excessive optimizations in development
  swcMinify: process.env.NODE_ENV === 'production',
  
  // Configure image domains if needed
  images: {
    domains: [],
  },
  
  // Improve stability for server components
  experimental: {
    // Disable some experimental features that might cause instability
    serverComponentsExternalPackages: [],
    // Ensure proper compilation
    optimizeCss: process.env.NODE_ENV === 'production',
  },
  
  // Enable React strict mode for better debugging
  reactStrictMode: true,
}

module.exports = nextConfig 