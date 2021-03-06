const path = require('path');
const autoprefixer = require('autoprefixer');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const helpers = require('./helpers');

module.exports = function initWebpackTest(options) {
  const config = {
    devtool: 'inline-source-map',

    resolve: {
      extensions: ['', '.ts', '.js']
    },

    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            path.join(helpers.modulesDir, 'rxjs'),
            path.join(helpers.modulesDir, '@angular')
          ]
        }
      ],

      loaders: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          query: {
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {
              removeComments: true
            }
          },
          exclude: [/\.e2e\.ts$/]
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [path.join(helpers.sourceDir, 'index.html')]
        },
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.scss$/,
          loaders: [
            'to-string-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [path.join(helpers.sourceDir, 'index.html')]
        }
      ],

      // postLoaders: [
        // {
          // test: /\.(js|ts)$/,
          // loader: 'istanbul-instrumenter-loader',
          // exclude: [
            // /\.(e2e|spec)\.ts$/,
            // /node_modules/,
            // /\index.ts$/,
            // path.join(helpers.rootDir, 'config', 'spec.bundle.js'),
            // // path.join(helpers.sourceDir, 'calculator', 'utilities', 'fakeservices.ts'),
            // path.join(helpers.sourceDir, 'calculator', 'createcalculator.ts')
          // ]
        // }
      // ]
    },

    plugins: [
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          HMR: JSON.stringify(process.env.HMR)
        }
      })
    ],

    node: {
      global: 'window',
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    },

    postcss: () => autoprefixer
  };

  if (process.env.GENERATE_COVERAGE === 'enabled') {
    config.module.postLoaders = [
        {
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/,
            /\index.ts$/,
            path.join(helpers.rootDir, 'config', 'spec.bundle.js'),
            path.join(helpers.sourceDir, 'calculator', 'utilities', 'fakeservices.ts'),
            path.join(helpers.sourceDir, 'calculator', 'createcalculator.ts')
          ]
        }
      ];
  }

  return config;
};
