const withImages = require('next-images')
const withPWA = require('next-pwa')
const path = require('path')

const nextConfig = {
  webpack5: true,
  target: 'serverless',
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development'
  },
  images: {
    domains: ['img.codehunter.cn'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx', // Or 'ts' if you don't need tsx
        target: 'es2015'
      }
    })
    return config
  }
}

module.exports = withImages(nextConfig)