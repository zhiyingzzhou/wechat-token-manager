const getToken = require('./token');

// getToken();
// 定时器,每隔90分钟刷新一次token
setInterval(getToken,90*60*1000);