const path = require('path');

const helpers = require('./helpers');

module.exports = function initKarma(config) {
  const webpackConfig = require(path.join(helpers.rootDir, 'webpack.config'));

  const configuration = {
    basePath: '',

    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    reporters: ['spec'],

    files: [
      {
        pattern: path.join(helpers.rootDir, 'config', 'spec.bundle.js'),
        watched: false
      }
    ],

    exclude: [],

    preprocessors: {
      [path.join(helpers.rootDir, 'config', 'spec.bundle.js')]:
        ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,
    webpackServer: {
      quiet: false,
      noInfo: true,
      stats: {
        chunks: false,
        colors: true,
        timings: false,
        version: false,
        hash: false,
        assets: false,
        chunkModules: false,
        modules: false,
        children: false
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  };

  config.set(configuration);
};
