import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Change from standalone to export for Amplify compatibility
  output: "export",
  // Keep images unoptimized for static export
  images: {
    unoptimized: true,
  },
  // Add rewrites to handle API paths (these work differently with export)
  
  // Add trailing slash for better compatibility with AWS Amplify
  trailingSlash: true,
  // Add server output path for better static compatibility
  distDir: '.next',
};

export default nextConfig;
