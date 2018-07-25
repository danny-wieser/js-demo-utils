const path = require('path');

const filename = './build/app.js';
const outpath = __dirname;
const mode = 'development';

const rules = [
  { test: /\.js?$/, use: [{ loader: 'babel-loader' }] },
];

module.exports = () => ({
  module: { rules },
  mode,
  output: { filename, path: outpath },
  entry: path.join(__dirname, 'index'),
  resolve: { extensions: ['.js'] },
});
