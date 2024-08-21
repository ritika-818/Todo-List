const path = require('path');

module.exports = {
  entry: './src/index.ts', // Entry point for your TypeScript files
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js', // Output bundle file
    path: path.resolve(__dirname, 'build'),
  },
};
