const path = require('path');
const webpackMerge = require('webpack-merge');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

const extractVendorCSS = new ExtractTextPlugin('vendor.css');
const extractMainCSS = new ExtractTextPlugin('main.css');

module.exports = function(options) {
  const devConfig = {
    debug: true,

    devtool: 'cheap-module-source-map',

    output: {
      path: helpers.outputDir,
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js'
      // library: ,
      // libraryTarget: 'var'
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

      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          HMR: JSON.stringify(process.env.HMR)
        }
      }),

      new NamedModulesPlugin(),

      extractVendorCSS,
      extractMainCSS
    ],

    tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: helpers.sourceDir
    },

    devServer: {
      contentBase: helpers.outputDir,
      host: helpers.host,
      port: helpers.port,
      historyApiFallback: true,
      stats: {
        chunks: false,
        colors: true,
        timings: true,
        version: false,
        hash: false,
        assets: false,
        chunkModules: false,
        modules: false,
        children: false
      }
    },

    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  return webpackMerge(commonConfig({}), devConfig);
};
