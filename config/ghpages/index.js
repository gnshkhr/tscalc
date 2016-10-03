const execSync = require('child_process').execSync;

const helpers = require('../helpers');

const REPO_NAME_RE = /Push {2}URL: https:\/\/github\.com\/.*\/(.*)\.git/;

function getWebpackConfig() {
  if (helpers.isDevelopment) return require('../webpack.dev');
  if (helpers.isProduction) return require('../webpack.prod');
  throw new Error('Invalid ghpages environment');
}

function getRepoName(remoteName) {
  const name = remoteName || 'origin';

  const out = execSync(`git remote show ${name}`);
  const match = REPO_NAME_RE.exec(out);

  if (!match) throw new Error(`No repository found on remote ${name}`);
  return match[1];
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
