/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    //static: './dist', for devServer v4.0.0 or higher (hot default value true)
    //hot: false,
    contentBase: './dist',
    historyApiFallback: true,
    compress: true,
    open: true,
  },
});
