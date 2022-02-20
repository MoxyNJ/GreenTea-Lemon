/**
 *  开发环境 和 生产环境 的公共配置
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const imageInlineSizeLimit = 4 * 1024 * 1000 * 10; // 4kb * 10000 => 40mb

// eslint-disable-next-line func-names
module.exports = function (options) {
  return {
    mode: options.mode,
    entry: paths.appSrc,
    output: {
      path: paths.appBuild,
      publicPath: '/',
    },
    cache: {
      // 使用持久化缓存
      type: 'filesystem', // memory:使用内容缓存 filesystem：使用文件缓存
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                // eslint-disable-next-line max-len
                importLoaders: 1, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, less-loader
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                // eslint-disable-next-line max-len
                importLoaders: 1, // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
              },
            },
            'postcss-loader',
            'less-loader',
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: imageInlineSizeLimit, // 40mb
            },
          },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2?)$/,
          type: 'asset/resource',
        },
      ],
    },
    devServer: {},
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      ...options.plugins,
    ],
    stats: options.stats, // 打包日志发生错误和新的编译时输出
    resolve: {
      modules: [paths.appNodeModules],
      extensions: ['.js', '.jsx', '.css', '.ts', '.tsx', '*'],
      alias: {
        moment$: 'moment/moment.js',
        '@public': paths.appPublic,
        '@src': paths.appSrc,
      },
    },
  };
};
