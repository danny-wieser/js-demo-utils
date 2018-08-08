const path = require('path');

//output path
const filename = './dist/index.js';
const outpath = __dirname;

const rules = [
  { test: /\.jsx?$/, use: [{ loader: 'babel-loader' }] },
  { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
];

module.exports = env => {
  const entry = env && env.content === 'demo' ? path.join(__dirname, 'demo/index') : path.join(__dirname, 'src/index');
  const mode = env && env.content === 'demo' ? 'development' : 'production';
  return {
    module: { rules },
    mode,
    output: { filename, path: outpath },
    entry,
    resolve: { extensions: ['.js', '.jsx'] },
  }
};
