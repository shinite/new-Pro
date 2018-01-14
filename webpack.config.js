var webpack = require('webpack');
var path = require("path");

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  module: {
  loaders: [
    {
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      },
    }
  ]
}
};
