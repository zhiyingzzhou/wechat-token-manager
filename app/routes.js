const wx = require('./token');

module.exports = function(app) {
    app.get('/token',wx.getToken);
}