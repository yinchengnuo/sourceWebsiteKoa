const util = require('util');
const fs = require('fs');

const readFilePromise = util.promisify(fs.readFile);

module.exports = {
    readFilePromise
}