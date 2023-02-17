const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { sha256, signRSA, verifyRSA } = require('./sign')

const requestAPI = {
  checkoutURL: 'https://admin.ccpayment.com/ccpayment/v1/concise/url/get',
  // createOrder: 'https://admin.ccpayment.com/ccpayment/v1/pay/CreateTokenTradeOrder',
  createOrder: 'http://74ab25e1merchant.cwallet.com/ccpayment/v1/pay/CreateTokenTradeOrder',

}
// checkout url for sha256
exports.checkoutURLWithSha256 = async function checkoutURLWithSha256(req, res) {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30
  const {
    ccpayment_id,
    app_id,
    app_secret,
    out_order_no,
    amount,
    noncestr,
    ...rest
  } = req.body;

  const signStr = `ccpayment_id=${ccpayment_id}&app_id=${app_id}&app_secret=${app_secret}&out_order_no=${out_order_no}&amount=${amount}&timestamp=${timestamp}&noncestr=${noncestr}`;
  const sign = sha256(signStr)
  console.log('sign:', sign)
  const params = {
    ...rest,
    ccpayment_id,
    app_id,
    app_secret,
    out_order_no,
    amount,
    noncestr,
    timestamp,
    sign
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

// checkout url for rsa
exports.checkoutURLWithRSA = function checkoutURLWithRSA(keyPath) {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30
  return async function (req, res) {
    const {
      ccpayment_id,
      app_id,
      app_secret,
      out_order_no,
      amount,
      noncestr,
      ...rest
    } = req.body;

    const signStr = `ccpayment_id=${ccpayment_id}&app_id=${app_id}&app_secret=${app_secret}&out_order_no=${out_order_no}&amount=${amount}&timestamp=${timestamp}&noncestr=${noncestr}`;
    const privateKey = fs.readFileSync(path.join(__dirname, keyPath), { encoding: 'utf8', flag: 'r' })
    const sign = signRSA(signStr, privateKey)
    const params = {
      ...rest,
      ccpayment_id,
      app_id,
      app_secret,
      out_order_no,
      amount,
      noncestr,
      timestamp,
      sign
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


exports.createTokenTradeOrderWithSha256 = async function createTokenTradeOrderWithSha256() {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30
  const {
    ccpayment_id,
    app_id,
    app_secret,
    out_order_no,
    amount,
    noncestr,
    ...rest
  } = req.body;

  const signStr = `ccpayment_id=${ccpayment_id}&app_id=${app_id}&app_secret=${app_secret}&out_order_no=${out_order_no}&amount=${amount}&timestamp=${timestamp}&noncestr=${noncestr}`;
  const sign = sha256(signStr)
  console.log('sign:', sign)
  const params = {
    ...rest,
    ccpayment_id,
    app_id,
    app_secret,
    out_order_no,
    amount,
    noncestr,
    timestamp,
    sign
  }
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

exports.createTokenTradeOrderWithRSA = function createTokenTradeOrderWithRSA(keyPath) {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30

  return async function (req, res) {
    const {
      ccpayment_id,
      app_id,
      app_secret,
      out_order_no,
      amount,
      noncestr,
      ...rest
    } = req.body;

    const signStr = `ccpayment_id=${ccpayment_id}&app_id=${app_id}&app_secret=${app_secret}&out_order_no=${out_order_no}&amount=${amount}&timestamp=${timestamp}&noncestr=${noncestr}`;
    const privateKey = fs.readFileSync(path.join(__dirname, keyPath), { encoding: 'utf8', flag: 'r' })
    const sign = signRSA(signStr, privateKey)
    const params = {
      ...rest,
      ccpayment_id,
      app_id,
      app_secret,
      out_order_no,
      amount,
      noncestr,
      timestamp,
      sign
    }
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

exports.webhookVerifyWithSha256 = function webhookVerifyWithSha256(req, res) {
  // TODO

}

exports.webhookVerifyWithRSA = function webhookVerifyWithRSA(req, res) {
  // TODO


}
