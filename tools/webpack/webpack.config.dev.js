const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    path: path.resolve(__dirname, '../../build'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: require('./webpack.plugins'),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: require('./webpack.aliases'),
  },
  stats: 'errors-warnings',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.includes('html')) {
            return '/index.html';
          }
        },
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
};
