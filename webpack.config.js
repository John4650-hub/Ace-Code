const path = require('path');
module.exports = {
  mode:'production',
  entry: './www/js/app.js',
  output: {
    filename: 'app.bundle.js',
    path: './www/dist/'
  },
};
