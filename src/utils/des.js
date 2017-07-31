import crypto from 'crypto'

var params = {
    key : 'InmbuvP6Z8',
    alg : 'aes-256-cbc'
}

// 3des 编码
export function encryptDes(plaintext) {
    console.log('crypto.createCipher',crypto.createCipher)
    var cipher = crypto.createCipher(params.alg,params.key);
    var text = getRandomCode(6,'string')+"_"+plaintext;
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    console.log(crypted);
    return crypted;
}

// 3des 解码
export function decryptDes(plaintext) {
    var decipher = crypto.createDecipher(params.alg,params.key);
    var dec = decipher.update(plaintext,'hex','utf8');
    dec += decipher.final('utf8');

    return dec;
}

// 生成随机数
function getRandomCode (len, charType) {
    len        = len || 6;
    charType   = charType || 'number';
    var chars1 = 'ABCDEFGHJKMNPQRSTUVWXYabcdefghjkmnpqrstuvwxy';
    var chars2 = '0123456789';
    var chars  = charType === 'string' ? chars1 : chars2;
    var maxPos = chars.length;
    var str    = '';
    for (var i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

