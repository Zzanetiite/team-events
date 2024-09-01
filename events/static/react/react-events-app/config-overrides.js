const path = require('path');

module.exports = function override(config, env) {
  config.output.path = path.resolve(__dirname, '../../../');
  config.output.publicPath = '../../../';
  return config;
};
