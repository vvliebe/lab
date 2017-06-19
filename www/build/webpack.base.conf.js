var path = require('path')

var resolve = dir => {
  return path.resolve(__dirname, '..', dir)
}
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: resolve('src'),
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.jsx?$/,
        include: resolve('src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          useRelativePath: process.env.NODE_ENV === 'production'
        }
      }
    ]
  }
}
