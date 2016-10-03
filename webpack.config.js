switch (process.env.NODE_ENV) {
  case 'development': {
    module.exports = require('./config/webpack.dev')();
    break;
  }

  case 'test': {
    module.exports = require('./config/webpack.test')();
    break;
  }

  case 'production': {
    module.exports = require('./config/webpack.prod')();
    break;
  }
}
