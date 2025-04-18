/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // -- 用于借助 Next.js 部署后的服务来同时部署vue项目的打包文件 （的重定向功能，将 /vue-app/ 下的所有路径都重定向到 Vue 的 index.html 文件）
  async rewrites() {
    return [
      {
        source: '/ckn', // 匹配 /vue-app/ 下的所有路径
        destination: '/ckn/index.html', // 重定向到 Vue 的 index.html
      },
      // 匹配 /static/[path]/[filename].[hash].[extension]
      {
        source: '/static/:path*/:filename.:hash([0-9a-f]{8,}).:extension*',
        destination: '/ckn/static/:path*/:filename.:hash.:extension*',
      },
      // 通用规则，处理 /static/ 下其他文件（可选）
      {
        source: '/static/:path*',
        destination: '/ckn/static/:path*',
      },
    ]
  },
  // --
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    return config
  }
}

module.exports = nextConfig
