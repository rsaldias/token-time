// Test from dev

const { getTokenTime, verified, timer, hashSha256Hex , getJson} = require('./lib/token-time');


const JsonMsg = {
    role: 'user',
    email: 'email@example.com'
}

seconds = 20;
pwd     = '123456'; 
api_key = 'api_key'

const key = hashSha256Hex(pwd, api_key);

const payload64 = getTokenTime(key, JsonMsg, seconds);

// const payloadToSend = payload64.toString('utf8');

// console.log('payloadToSend:', payloadToSend)

// const payloadReceive = payloadToSend.toString('base64');

console.log('verified: ', verified(key, payload64))

console.log('timer: ', timer(key, payload64))

console.log('data: ', getJson(key, payload64))

var newStr = payload64.replace(/\//g, '_');

console.log('newStr: ', newStr)
console.log('payload64: ', payload64)

