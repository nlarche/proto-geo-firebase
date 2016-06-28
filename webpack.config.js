var path = require('path');
 
var config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel', 'eslint'],
      },
    ],
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
  },
  devtool: 'source-map',
    devServer: {
        contentBase: "./www",
        colors: true,
        historyApiFallback: true,
        inline: true,
        port: 3001,
    }
};
module.exports = config;