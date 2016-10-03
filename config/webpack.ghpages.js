const ghPages = require('gh-pages');
const webpackMerge = require('webpack-merge');

const helpers = require('./helpers');
const ghHelpers = require('./ghpages');

const webpackConfig = ghHelpers.getWebpackConfig();

const GIT_REMOTE_NAME = 'origin';
const COMMIT_MESSAGE = 'gh-pages updates';
const REPO_NAME = ghHelpers.getRepoName(GIT_REMOTE_NAME);

const METADATA = webpackMerge(webpackConfig.metadata, {
  // all resource URIs (assets) will have this prefix added unless they are
  // absolute URIs. handled in output.publicPath
  baseUrl: `/${REPO_NAME}/${ghHelpers.safeUrl(webpackConfig.metadata.baseUrl)}`
});

const config = webpackMerge(webpackConfig, {
  metadata: METADATA,

  output: {
    // publicPath set to REPO_NAME
    publicPath: `/${REPO_NAME}/${ghHelpers.safeUrl(webpackConfig.output.publicPath)}`
  },

  plugins: [
    function() {
      this.plugin('done', function(stats) {
        console.log('deploying to github pages...');

        const log = function(msg) {
          console.log(msg);
        };

        const options = {
          logger: log,
          remote: GIT_REMOTE_NAME,
          message: COMMIT_MESSAGE
        };

        ghPages.publish(webpackConfig.output.path, options, function(err) {
          if (err) {
            console.log('github pages deployment done with ERROR', err);
            throw err;
          }
          else {
            console.log('github pages deployment successful');
          }
        });
      });
    }
  ]
});

module.exports = config;
