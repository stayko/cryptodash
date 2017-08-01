var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

var htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: 'src/client/index.html'
});

var cleanWebpackPlugin = new CleanWebpackPlugin([
  'dist'
]);

module.exports = {
  entry: './src/client/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    //publicPath: '/dist'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: extractPlugin.extract({ use: ['css-loader', 'sass-loader'] }) },
      { test: /\.html$/, use: ['html-loader'] },
      { test: /\.(jpg|png)$/, use: [{ loader : 'file-loader', options: {name: '[name].[ext]', outputPath: 'img/', publicPath: 'img/'} }] }
    ]
  },
  plugins: [extractPlugin, htmlWebpackPlugin]
}
