
const crypto = require('crypto')


exports.getMessageJsonBase64 =  function getMessageJsonBase64(pwd, payload64) {

    const payloadHex = Buffer.from(payload64, 'base64').toString('hex');

    const server_iv         = payloadHex.substr(0, 32);
    const server_encrypted  = payloadHex.substr(32, payloadHex.length - 32 - 32);
    const server_auth_tag   = payloadHex.substr(payloadHex.length - 32, 32);
 
    try {
        const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        Buffer.from(pwd, 'hex'),
        Buffer.from(server_iv, 'hex')
        );

        decipher.setAuthTag(Buffer.from(server_auth_tag, 'hex'));

        let decrypted = decipher.update(server_encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);

    } catch (error) {
        console.log(error.message);
    }
    return -1;
}

