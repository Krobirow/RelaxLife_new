const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/')
    },
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development'
};
