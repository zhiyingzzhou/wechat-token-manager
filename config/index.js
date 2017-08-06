const path = require('path');

function resolve(dir){
    return path.resolve(process.cwd(),dir);
}

module.exports = {
    wxConfig: require('./config'),
    tokenFilePath: resolve('data/access_token.json')
};