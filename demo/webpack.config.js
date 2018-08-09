const path = require('path');

const filename = './dist/app.js';
const outpath = __dirname;
const mode = 'development';

const rules = [
  { test: /\.jsx?$/, use: [{ loader: 'babel-loader' }] },
  { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
];

module.exports = () => {
  const entry = path.join(__dirname, 'index');
  return {
    module: { rules },
    mode,
    output: { filename, path: outpath },
    entry,
    resolve: { extensions: ['.js', '.jsx'] },
  };
};
