/**
 *  针对 开发环境 的配置
 */

const ESLintPlugin = require('eslint-webpack-plugin')
const paths = require('./paths')

module.exports = require('./webpack.common')({
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    // @ts-ignore
    new ESLintPlugin({
      fix: true, // 启用ESLint自动修复功能
      extensions: ['js', 'jsx'],
      exclude: ['/node_modules/', 'build'], // 指定要排除的文件/目录
      cache: true, // 缓存
      cwd: paths.appPath, // 文件根目录
    }),
  ],
  stats: 'normal', // 只在发生错误或有新的编译时输出
})
