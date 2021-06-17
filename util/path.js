//this will help us to find simply the directories and files withour doing ../ to find directory
const path = require('path');

module.exports = path.dirname(process.mainModule.filename);