const {dirname} = require('path');
module.exports = dirname(require.main.filename);
