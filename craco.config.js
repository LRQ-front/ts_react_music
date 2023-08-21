const path = require('path')
const CracoLessPlugin = require('craco-less')
const resolve = (dir) => path.resolve(__dirname, dir)

const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  //样式覆盖需要craco-les
  plugins: [{ plugin: CracoLessPlugin }],
  webpack: {
    alias: {
      '@': resolve('src')
    },
    configure: (webpackConfig, { env, paths }) => {
      // webpackConfig.devtool = false
      let cdn = {
        js: [],
        css: []
      }
      whenProd(() => {
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux'
          // antd: 'antd'
        }
        cdn = {
          js: [
            'https://cdn.bootcdn.net/ajax/libs/react/18.2.0/umd/react.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
            'https://cdn.bootcdn.net/ajax/libs/redux/4.2.1/redux.min.js'
          ],
          css: []
        }
      })
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )
      if (isFound) {
        // console.log('cdn', match)
        // match.options.cdn = {}
        // console.log(match, 88)
        match.userOptions.cdn = cdn
      }

      return webpackConfig
    }
  }
}
