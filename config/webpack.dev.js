const path = require('path');
const webpackMerge = require('webpack-merge');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

module.exports = function(options) {
  const devConfig = {
    debug: true,

    devtool: 'cheap-module-source-map',

    output: {
      path: helpers.outputDir,
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
      // library: ,
      // libraryTarget: 'var'
    },

    plugins: [
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          HMR: JSON.stringify(process.env.HMR)
        }
      }),

      new NamedModulesPlugin()
    ],

    tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: helpers.sourceDir
    },

    devServer: {
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
