const crypto = require('crypto')

exports.getCipherMessageBase64 =  function getCipherMessageBase64(pwd, Strdata) {

    const IV = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        'aes-256-gcm',
        Buffer.from(pwd, 'hex'),
        IV
    );

    let encrypted = cipher.update(Strdata, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const auth_tag = cipher.getAuthTag().toString('hex');
    const payload = IV.toString('hex') + encrypted + auth_tag;
    const payload64 = Buffer.from(payload, 'hex').toString('base64');

    // 
    return payload64;

};



