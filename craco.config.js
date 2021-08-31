const path = require('path');

module.exports = {
  webpack: {
    alias: {
      common: path.resolve(__dirname, 'src/common'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },
};
