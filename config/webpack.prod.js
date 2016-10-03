const path = require('path');
const webpackMerge = require('webpack-merge');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

const extractVendorCSS = new ExtractTextPlugin('vendor.[contenthash].css');
const extractMainCSS = new ExtractTextPlugin('main.[contenthash].css');

const METADATA = webpackMerge(commonConfig({}).metadata, {});

module.exports = function(options) {
  const productionConfig = {
    debug: false,

    devtool: 'source-map',

    output: {
      path: helpers.outputDir,
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[file].[chunkhash].map',
      chunkFilename: '[id].[chunkhash].chunk.js'
    },

    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
          exclude: [
            path.join(helpers.sourceDir, 'vendor.browser.ts'),
            path.join(helpers.sourceDir, 'main.scss'),
            helpers.modulesDir
          ]
        },
        {
          test: /\.css$/,
          loader: extractVendorCSS.extract('style', 'css?sourceMap!postcss'),
          include: [
            path.join(helpers.sourceDir, 'vendor.browser.ts'),
            path.join(helpers.modulesDir, 'normalize.css')
          ]
        },
        {
          test: /\.scss$/,
          loader: extractMainCSS.extract('style', 'css?sourceMap!postcss!sass'),
          include: [path.join(helpers.sourceDir, 'main.scss')]
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(['!dist/.gitkeep', 'dist/**/*.*'], {
        verbose: true,
        root: helpers.rootDir
      }),

      new WebpackMd5Hash(),

      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),

      new UglifyJsPlugin({
        compress: { warnings: false }
      }),

      extractVendorCSS,
      extractMainCSS
    ],

    // tslint: {
      // emitErrors: true,
      // failOnHint: true,
      // resourcePath: helpers.sourceDir
    // },

    node: {
      global: 'window',
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  return webpackMerge(commonConfig(), productionConfig);
};
