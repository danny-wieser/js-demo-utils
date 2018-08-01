const path = require('path');
const filename = './build/app.js';
const outpath = __dirname;
const mode = 'development';

const rules = [
  { test: /\.jsx?$/, use: [{ loader: 'babel-loader' }] },
  { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] }
];

module.exports = () => ({
  module: { rules },
  mode,
  output: { filename, path: outpath },
  entry: path.join(__dirname, 'index'),
  resolve: { extensions: ['.js', '.jsx'] }
});
