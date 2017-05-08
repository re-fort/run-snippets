const path = require('path')
const webpack = require('webpack')
const glob = require('glob')

const _snippets = 'snippets'
let snippets = {}

glob.sync(`./src/${_snippets}/**/*.js`).map((file) => {
  let pathname = file.replace(`./src/${_snippets}/`, '').replace('.js', '')
  snippets[`${_snippets}/${pathname}`] = file
})

if (Object.keys(snippets).length === 0) process.exit()

module.exports = {
  entry: snippets,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ])
}