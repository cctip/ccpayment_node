const crypto = require('crypto');
const path = require('path');
const nodeRSA = require('node-rsa');

exports.sha256 = function sha256(data) {
    let hash = crypto.createHash('sha256');
    return hash.update(data, 'utf-8').digest('hex');
}

exports.encodeRSA = function encodeRSA(data, publicKey) {
    const rsaEncrypt = new nodeRSA(publicKey, { b: 1024 });
    rsaEncrypt.setOptions({ encryptionScheme: 'pkcs1' });
    return rsaEncrypt.encrypt(data, 'base64');
}

exports.decodeRSA = function decodeRSA(data, privateKey) {
    const rsaDecrypt = new nodeRSA(privateKey);
    rsaDecrypt.setOptions({ encryptionScheme: 'pkcs1' });
    return rsaDecrypt.decrypt(data, 'utf8');
}

