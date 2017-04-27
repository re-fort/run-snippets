const path = require('path')
const webpack = require('webpack')
const glob = require('glob')

let snippets = {}

glob.sync('./src/snippets/*.js').map((file) => {
  let basename = path.basename(file, '.js')
  snippets[`snippets/${basename}`] = file
})

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