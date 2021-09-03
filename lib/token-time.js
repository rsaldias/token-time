
const { getCipherMessageBase64, getCipherMessageUTF8 } = require('./cipher.js');
const { getMessageJsonBase64, getMessageUtf8ToJson } = require('./decipher.js');
const {
    createHmac,
  } = require('crypto');

exports.getTokenTime =  function getTokenTime(pwdHash, JsonMsg, seconds) {

    const data = {
        hash    : pwdHash,
        end     : new Date(Date.now() + ( seconds * 1000)), // 24 hour in milliseconds= ( 3600 * 1000 * 24)
        data    : JsonMsg,
    }
    const Strdata = JSON.stringify(data);

    // cipher 
    const payload = getCipherMessageBase64(pwdHash, Strdata);

    return payload;
};

exports.verified =  function verified(pwdHash, payload) {
    // decipher
    const  json = getMessageJsonBase64(pwdHash, payload);

    const date1 =  new Date(json.end);
    const date2 =  new Date();
    const seconds =  (date1.getTime() - date2.getTime()) / 1000;

    return seconds >= 0
}

exports.getJson =  function getJson(pwdHash, payload64) {
    // decipher
    const json = getMessageJsonBase64(pwdHash, payload64);
    return json.data;
}

exports.timer =  function timer(pwdHash, payload64) {
    // decipher
    const  json = getMessageJsonBase64(pwdHash, payload64);
    const date1 =  new Date(json.end);
    const date2 =  new Date();
    return (date1.getTime() - date2.getTime()) / 1000;
}

exports.hashSha256Hex =  function hashSha256Hex(str, pwd) {
    const hmac = createHmac('sha256', pwd); 
    hmac.update(str);
    return hmac.digest('hex');    
};

exports.printMsg = function() {
    console.log("token-time is a base64 token format with expiration time, generated from a json object");
}

