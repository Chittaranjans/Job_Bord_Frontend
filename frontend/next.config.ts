import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  // Enable static exports for better Amplify compatibility
  images: {
    unoptimized: true, // Required for static export
  },
  // Add rewrites to handle API paths
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL 
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
          : 'http://localhost:8000/api/:path*'
      }
    ]
  },
  // Add trailing slash for better compatibility with AWS Amplify
  trailingSlash: true,
  // Add server output path for better static compatibility
  distDir: '.next',
};

export default nextConfig;
