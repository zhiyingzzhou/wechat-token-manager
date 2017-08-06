const express = require('express');
const app = express();

require('./app/routes')(app);

app.listen(3000);