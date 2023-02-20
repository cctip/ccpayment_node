const crypto = require('crypto');
const path = require('path');
const nodeRSA = require('node-rsa');

exports.sha256 = function sha256(data) {
  let hash = crypto.createHash('sha256');
  return hash.update(data, 'utf-8').digest('hex');
}

exports.encodeRSA = function encodeRSA(data, key) {
  const rsaEncrypt = new nodeRSA(key);
  rsaEncrypt.setOptions({ encryptionScheme: 'pkcs1_oaep' });
  return rsaEncrypt.encrypt(data, 'hex');
}

exports.decodeRSA = function decodeRSA(data, key) {
  const rsaDecrypt = new nodeRSA(key);
  rsaDecrypt.setOptions({ encryptionScheme: 'pkcs1_oaep' });
  return rsaDecrypt.decrypt(data, 'utf8');
}

exports.signRSA = function signRSA(data, key) {
  const rsaSign = new nodeRSA(key)
  rsaSign.setOptions({ encryptionScheme: 'pkcs1_oaep' })
  return rsaSign.sign(data, 'hex');
}

exports.verifyRSA = function verifyRSA(data, signature, key) {
  const rsaVerify = new nodeRSA(key)
  return rsaVerify.verify(data, Buffer.from(signature, 'hex'));
}
