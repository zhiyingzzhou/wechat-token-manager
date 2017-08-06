const rp = require('request-promise');
const { wrap : async} = require('co');
const config = require('../config');

/**
 * 从微信服务器获取access_token
 */
const getAccessToekn = async(function* (){
    try{    
        let options = {
            uri: 'https://api.weixin.qq.com/cgi-bin/token',
            qs: {
                'grant_type': 'client_credential', // -> uri + '?grant_type=client_credential'
                // 'appid': config.appid,
                'secret': config.secret
            },
            json: true // Automatically parses the JSON string in the response
        }
        const result = yield rp(options);
        return result;
    }catch(err){
        const {statusCode,response} = err;
        if(!statusCode){
            const {name,message} = err;
            console.log(name,message);
        }else{
            const {statusCode,statusMessage} = response;
            console.log('状态码:',statusCode);
            console.log('statusMessage',statusMessage);
        }
    }
});

exports.getToken = async(function* (req,res){
    const token = yield getAccessToekn();
    console.log(token);
});