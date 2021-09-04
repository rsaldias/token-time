

Install: >> npm i token-time

How to use:

const { getTokenTime, verified, timer, hashSha256Hex , getJson} = require('token-time');


const JsonMsg = {
    role: 'user',
    email: 'email@example.com'
}

seconds = 20;
pwd     = '123456'; 
api_key = 'api_key'

const key = hashSha256Hex(pwd, api_key);

const payload64 = getTokenTime(key, JsonMsg, seconds);

console.log('verified: ', verified(key, payload64))

console.log('timer: ', timer(key, payload64))

console.log('data: ', getJson(key, payload64))

// Update new function

