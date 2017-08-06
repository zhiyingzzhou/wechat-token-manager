const fs = require('fs');
const rp = require('request-promise');
const { wrap : async} = require('co');
const config = require('../config');

/**
 * sleep函数
 * @param {number} ms  
 */

const sleep = ms => {
    return new Promise(resolve=>setTimeout(resolve,ms*1000))
};

/**
 * 从微信服务器获取access_token
 */
const getToken = async(function* (){
    const {wxConfig,tokenFilePath} = config;
    const {appid,secret} = wxConfig;
    let result;
    try{    
        let options = {
            uri: 'https://api.weixin.qq.com/cgi-bin/token',
            qs: {
                'grant_type': 'client_credential', // -> uri + '?grant_type=client_credential'
                'appid': appid,
                'secret': secret
            },
            json: true // Automatically parses the JSON string in the response
        }
        result = yield rp(options);
        if(result&&!result.errcode){
            fs.writeFile(tokenFilePath,JSON.stringify(result),err=>{
                if(err) console.error(err);
                console.log(result);
            });
        }else{
            throw result;
        }
    }catch(err){
        const {statusCode,response} = err;
        if(response){
            const {statusCode,statusMessage} = response;
            console.log('request uri: '+response.request.href);
            console.log('statusCode: '+statusCode);
            console.log('statusMessage: '+statusMessage);
        }else if(statusCode){
            const {name,message} = err;
            console.log('errName: '+name);
            console.log('errMessage: '+message);
        }else{
            console.log(err);
        }
        yield sleep(20);
        getToken();
    }
});

module.exports = getToken;