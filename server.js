const express = require('express');
const app = express();
cors = require('cors');
app.use(cors({
    origin: ['http://localhost','http://www.sogou.com'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}))
app.use(express.static('./'));
require('./app/routes')(app);
require('./app/timer.js');

app.listen('80','127.0.0.1');