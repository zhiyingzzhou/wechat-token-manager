const fs = require('fs');
const config = require('../config');

module.exports = function(app) {
    app.get('/token',function(req,res){
        try{   
            const token = fs.readFileSync(config.tokenFilePath);
            res.json(JSON.parse(token));
        }catch(err){
            console.log(err);
        }
    });
    app.get('/',function(req,res){
        res.send('www.google.com');
    });
}