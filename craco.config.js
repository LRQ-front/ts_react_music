const path = require('path')
const CracoLessPlugin = require('craco-less')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  //样式覆盖需要craco-les
  plugins: [{ plugin: CracoLessPlugin }],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // 修改 publicPath
      // webpackConfig.output.publicPath = './'
      webpackConfig.resolve.alias = {
        '@': resolve('src')
      }
      return webpackConfig
    }
  }
}
