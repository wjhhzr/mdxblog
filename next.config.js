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
  pageExtensions: ['tsx','ts', 'jsx', 'md', 'mdx'],
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

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})


module.exports = withMDX(withImages(nextConfig))