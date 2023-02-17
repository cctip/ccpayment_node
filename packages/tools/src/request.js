const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { sha256, rsaSign, rsaVerify } = require('./sign')

const requestAPI = {
  checkoutURL: 'https://admin.ccpayment.com/ccpayment/v1/concise/url/get',
  // createOrder: 'https://admin.ccpayment.com/ccpayment/v1/pay/CreateTokenTradeOrder',
  createOrder: 'http://74ab25e1merchant.cwallet.com/ccpayment/v1/pay/CreateTokenTradeOrder'
}

exports.checkoutURLWithSha256 = function checkoutURLWithSha256(options) {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30
  const str = `ccpayment_id=CP10035&app_id=202302160812171626132344467566592&app_secret=a58f572564f7fce44acd66024d6da9b4&timestamp=${timestamp}&amount=1&out_order_no=1030404044004&product_name=test&noncestr=abc123`;
  const encrypt = sha256(str)

  return async function (req, res) {
    const params = {
      ...req.body,
      ccpayment_id: 'CP10035',
      sign: encrypt,
      app_id: '202302160812171626132344467566592',
      timestamp,
      noncestr: 'abc123',
      out_order_no: '1030404044004'
    }
    try {
      const result = await axios.post(requestAPI.checkoutURL, params)
      if (result) {
        console.log(result.data)
        res.json(result.data)
      }
    } catch (err) {
      throw Error(err)
    }
  }
}


exports.checkoutURLWithRSA = function checkoutURLWithRSA(options) {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30
  const str = `ccpayment_id=CP10035&app_id=202302160812171626132344467566592&app_secret=a58f572564f7fce44acd66024d6da9b4&timestamp=${timestamp}&amount=1&out_order_no=1030404044004&product_name=test&noncestr=abc123`;
  const privateKey = fs.readFileSync(path.join(__dirname, 'rsa_private_key.pem'), { encoding: 'utf8', flag: 'r' })
  const sign = rsaSign(str, privateKey)

  return async function (req, res) {
    const params = {
      ...req.body,
      sign,
      ccpayment_id: 'CP10035',
      app_id: '202302160812171626132344467566592',
      timestamp,
      noncestr: 'abc123',
      out_order_no: '1030404044004'
    }
    console.log('params:', params)
    try {
      const result = await axios.post(requestAPI.checkoutURL, params)
      if (result) {
        console.log(result.data)
        res.json(result.data)
      }
    } catch (err) {
      throw Error(err)
    }
  }
}

exports.createTokenTradeOrderWithSha256 = function createTokenTradeOrderWithSha256(options) {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30
  const str = `ccpayment_id=CP10159&app_id=202302140208531625316114326155264&app_secret=e17145d07805f1a7e9e7e098ec65e97b&out_order_no=202211181420251593489282956267520&timestamp=${timestamp}&noncestr=ylaDo`

  const encrypt = sha256(str);

  return async function (req, res) {
    const params = {
      ...req.body,
      ccpayment_id: 'CP10159',
      sign: encrypt,
      app_id: '202302140208531625316114326155264',
      timestamp,
      noncestr: 'ylaDo'
    }
    console.log('params:', params)
    try {
      const result = await axios.post(requestAPI.createOrder, params)
      if (result) {
        console.log(result.data)
        res.json(result.data)
      }
    } catch (err) {
      throw Error(err)
    }
  }
}

exports.createTokenTradeOrderWithRSA = function createTokenTradeOrderWithRSA(options) {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30
  const str = `ccpayment_id=CP10159&app_id=202302140208531625316114326155264&app_secret=e17145d07805f1a7e9e7e098ec65e97b&out_order_no=202211181420251593489282956267520&timestamp=${timestamp}&noncestr=ylaDo`

  const privateKey = fs.readFileSync(path.join(__dirname, 'rsa_private_key.pem'), { encoding: 'utf8', flag: 'r' })
  
  const sign = rsaSign(str, privateKey)
  return async function (req, res) {
    const params = {
      ...req.body,
      ccpayment_id: 'CP10159',
      sign,
      app_id: '202302140208531625316114326155264',
      timestamp,
      noncestr: 'ylaDo'
    }
    console.log('params:', params)
    try {
      const result = await axios.post(requestAPI.createOrder, params)
      if (result) {
        console.log(result.data)
        res.json(result.data)
      }
    } catch (err) {
      throw Error(err)
    }
  }
}

exports.webhookVerification = function webhookVerification(req, res) {

}

// // for test
// exports.test = function(req, res, next) {
//   const privateKey = fs.readFileSync(path.join(__dirname, 'rsa_private_key.pem'), { encoding: 'utf8', flag: 'r' })
//   const result = rsaSign('jamesanthony', privateKey)
//   console.log('sign:', result);
//   const publicKey = fs.readFileSync(path.join(__dirname, 'rsa_public_key.pem'), { encoding: 'utf8', flag: 'r' })
//   console.log('decode:', rsaVerify('jamesanthony', result, publicKey))
// }
