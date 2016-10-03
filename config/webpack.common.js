const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const helpers = require('./helpers');

const METADATA = {
  title: 'TypeScript Calculator',
  baseUrl: '/'
};

module.exports = function(options) {
  const config = {
    metadata: METADATA,

    entry: {
      polyfills: path.join(helpers.sourceDir, 'polyfills.browser.ts'),
      vendor: path.join(helpers.sourceDir, 'vendor.browser.ts'),
      main: helpers.mainPath
    },

    resolve: {
      extensions: ['', '.js', '.ts']
    },

    module: {
      // preLoaders: [
        // {
          // test: /\.js$/,
          // loader: 'source-map-loader',
          // exclude: [
            // path.join(helpers.modulesDir, 'rxjs'),
            // path.join(helpers.modulesDir, '@angular')
          // ]
        // }
      // ],

      loaders: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [path.join(helpers.sourceDir, 'index.html')]
        },
        {
          test: /\.png$/,
          loader: 'file'
        }
      ]// ,

      // postLoaders: []
    },

    plugins: [
      new AssetsPlugin({
        path: helpers.outputDir,
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      new ForkCheckerPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'polyfills']
      }),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.sourceDir
      ),

      new HtmlWebpackPlugin({
        template: path.join(helpers.sourceDir, 'index.html'),
        chunksSortMode: 'dependency'
      })
    ],

    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },

    postcss: () => [autoprefixer]
  };

  return config;
};
