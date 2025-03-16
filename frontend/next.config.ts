import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  pageExtensions: ["tsx" , "ts" , "js" , "jsx"].filter(ext =>!ext.includes('api')),
  // Skip API routes in static export
  
  // Define which paths to export (exclude API routes)
 
  
};

export default nextConfig;
