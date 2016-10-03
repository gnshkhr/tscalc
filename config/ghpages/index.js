const execSync = require('child_process').execSync;

const helpers = require('../helpers');

const HTTPS_REPO_NAME_RE = /Push {2}URL: https:\/\/github\.com\/.*\/(.*)\.git/;
const SSH_REPO_NAME_RE = /Push\s*URL:\s*git@github\.com:.*\/(.*)\.git/;

function getWebpackConfig() {
  if (helpers.isDevelopment) return require('../webpack.dev')();
  if (helpers.isProduction) return require('../webpack.prod')();
  throw new Error('Invalid ghpages environment');
}

function getRepoName(remoteName) {
  remoteName = remoteName || 'origin';

  const outHttps = execSync('git remote show ' + remoteName);
  const matchHttps = HTTPS_REPO_NAME_RE.exec(outHttps);

  const outSsh = execSync('git remote show ' + remoteName);
  const matchSsh = SSH_REPO_NAME_RE.exec(outSsh);

  if (!matchHttps) {
    if (!matchSsh) {
      throw new Error('No repository found on remote ' + remoteName);
    }
    else {
      return matchSsh[1];
    }
  }
  else {
    return matchHttps[1];
  }
}

function stripTrailing(str, char) {
  if (str[0] === char) str = str.substr(1);
  if (str.substr(-1) === char) str = str.substr(0, str.length - 1);
  return str;
}

function safeUrl(url) {
  const stripped = stripTrailing(url || '', '/');
  return stripped ? stripped + '/' : '';
}

module.exports.getWebpackConfig = getWebpackConfig;
module.exports.getRepoName = getRepoName;
module.exports.safeUrl = safeUrl;
