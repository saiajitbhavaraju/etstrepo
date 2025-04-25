import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/AlgoVisualizer_node/' : '',
  basePath: isProd ? '/AlgoVisualizer_node' : '',
  output: 'export'
};

export default nextConfig;