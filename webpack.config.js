const path = require('path');
const webpack = require('webpack');

const esmConfig = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.esm.js',
    libraryTarget: 'module', // ES module
    chunkFormat: 'module',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/],  // Exclude any file ending with .test.ts
      },
      {
        test: /\.json$/,
        type: 'json',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    usedExports: true,
    minimize: true,
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /__tests__/, // Ignore files matching the pattern
    }),
  ],
  devtool: 'source-map',
};

const cjsConfig = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.cjs.js',
    libraryTarget: 'commonjs2', // CommonJS
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/node_modules/],  // Exclude any file ending with .test.ts
      },
      {
        test: /\.json$/,
        type: 'json',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  optimization: {
    usedExports: true,
    minimize: true,
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /__tests__/, // Ignore files matching the pattern
    }),
  ],
  devtool: 'source-map',
};

module.exports = [esmConfig, cjsConfig];
