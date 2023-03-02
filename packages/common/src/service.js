const axios = require('axios')
const crypto = require('crypto');
const requestAPI = {
  checkoutURL: 'https://ebc65a6dtestpaymentadmin.cwallet.com/ccpayment/v1/concise/url/get',
  selectTokenURL: 'https://ebc65a6dtestpaymentadmin.cwallet.com/ccpayment/v1/support/token',
  selectChainURL: 'https://ebc65a6dtestpaymentadmin.cwallet.com/ccpayment/v1/token/chain',
  submitOrderURL: 'https://ebc65a6dtestpaymentadmin.cwallet.com/ccpayment/v1/bill/create',
  tokenRateURL: 'https://ebc65a6dtestpaymentadmin.cwallet.com/ccpayment/v1/token/rate'
}


module.exports = {

  createTimestamp(threshold = 0) {
    return parseInt(Date.now() / 1000, 10) + threshold
  },

  sha256(data) {
    let hash = crypto.createHash('sha256');
    return hash.update(data, 'utf-8').digest('hex');
  },

  async selectToken(appId, appSecret, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.selectTokenURL, null, {
        headers: {
          'Appid': appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${appId}${appSecret}${timeStamp}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const resSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(resSignture === sign ? result.data : 'http code error')
      }
    } catch (err) {
      Promise.reject(err)
    }
  },


  async selectChain(appId, appSecret, data, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.selectChainURL, {
        ...data
      }, {
        headers: {
          'Appid': appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${appId}${appSecret}${timeStamp}${JSON.stringify({ ...data })}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const resSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(resSignture === sign ? result.data : 'http code error')
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  async submitOrder(appId, appSecret, data, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.submitOrderURL, {
        ...data
      }, {
        headers: {
          'Appid': appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${appId}${appSecret}${timeStamp}${JSON.stringify({ ...data })}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const resSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(resSignture === sign ? result.data : 'http code error')
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  async checkoutURL(appId, appSecret, data, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.checkoutURL, {
        ...data
      }, {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'Appid': appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${appId}${appSecret}${timeStamp}${JSON.stringify({ ...data })}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const resSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(resSignture === sign ? result.data : 'http code error')
      }
    } catch (err) {
      Promise.reject(err)
    }
  },
  async tokenRate(appId, appSecret, data, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.tokenRateURL, {
        ...data
      }, {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'Appid': appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${appId}${appSecret}${timeStamp}${JSON.stringify({ ...data })}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const resSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(resSignture === sign ? result.data : 'http code error')
      }
    } catch (err) {
      Promise.reject(err)
    }
  }
}


// exports.checkoutURLWithSha256 = async function checkoutURLWithSha256(req, res, next) {
//   console.log('req:', req.body)
//   try {
//     const result = await axios.post(requestAPI.checkoutURL, {
//       ...req.body
//     })
//     if (result) {
//       console.log('ppk:', result.data)
//       //res.json(result.data)
//     }
//   } catch (err) {
//     throw Error(err)
//   }
  // const {
  //   ccpayment_id,
  //   app_id,
  //   app_secret,
  //   out_order_no,
  //   amount,
  //   json_content,
  //   noncestr,
  //   ...rest
  // } = req.body;
  // const timestamp = createTimestamp()
  // const signStr = `ccpayment_id=${ccpayment_id}&app_id=${app_id}&app_secret=${app_secret}&out_order_no=${out_order_no}&amount=${amount}&timestamp=${timestamp}&noncestr=${noncestr}`;
  // const sign = sha256(signStr)
  // const params = {
  //   ...rest,
  //   ccpayment_id,
  //   app_id,
  //   app_secret,
  //   out_order_no,
  //   amount,
  //   noncestr,
  //   timestamp,
  //   sign
  // }
  // console.log('request:', req)
  // try {
  //   const result = await axios.post(requestAPI.checkoutURL, params)
  //   if (result) {
  //     console.log(result.data)
  //     res.json(result.data)
  //   }
  // } catch (err) {
  //   throw Error(err)
  // }
// }

// checkout url for rsa
// exports.checkoutURLWithRSA = function checkoutURLWithRSA(keyPath) {
//   return async function (req, res, next) {
//     const {
//       ccpayment_id,
//       app_id,
//       app_secret,
//       out_order_no,
//       amount,
//       noncestr,
//       ...rest
//     } = req.body;
//     const timestamp = createTimestamp()
//     console.log(timestamp)
//     const signStr = `ccpayment_id=${ccpayment_id}&app_id=${app_id}&app_secret=${app_secret}&out_order_no=${out_order_no}&amount=${amount}&timestamp=${timestamp}&noncestr=${noncestr}`;
//     const privateKey = fs.readFileSync(keyPath, { encoding: 'utf8', flag: 'r' })
//     const sign = signRSA(signStr, privateKey)
//     const params = {
//       ...rest,
//       ccpayment_id,
//       app_id,
//       app_secret,
//       out_order_no,
//       amount,
//       noncestr,
//       timestamp,
//       sign
//     }
//     try {
//       const result = await axios.post(requestAPI.checkoutURL, params)
//       if (result) {
//         console.log(result.data)
//         res.json(result.data)
//       }
//     } catch (err) {
//       throw Error(err)
//     }
//   }
// }


// exports.createTokenTradeOrderWithSha256 = async function createTokenTradeOrderWithSha256(req, res, next) {
//   const {
//     ccpayment_id,
//     app_id,
//     app_secret,
//     out_order_no,
//     amount,
//     noncestr,
//     ...rest
//   } = req.body;
//   const timestamp = createTimestamp()
//   const signStr = `ccpayment_id=${ccpayment_id}&app_id=${app_id}&app_secret=${app_secret}&out_order_no=${out_order_no}&amount=${amount}&timestamp=${timestamp}&noncestr=${noncestr}`;
//   const sign = sha256(signStr)

//   const params = {
//     ...rest,
//     ccpayment_id,
//     app_id,
//     // app_secret,
//     out_order_no,
//     amount,
//     noncestr,
//     timestamp,
//     sign
//   }
//   console.log('params:', params)
//   try {
//     const result = await axios.post(requestAPI.createOrder, params)
//     if (result) {
//       console.log(result.data)
//       res.json(result.data)
//     }
//   } catch (err) {
//     throw Error(err)
//   }

// }

// exports.createTokenTradeOrderWithRSA = function createTokenTradeOrderWithRSA(keyPath) {
//   return async function (req, res, next) {
//     const {
//       ccpayment_id,
//       app_id,
//       app_secret,
//       out_order_no,
//       amount,
//       noncestr,
//       ...rest
//     } = req.body;
//     const timestamp = createTimestamp()
//     const signStr = `ccpayment_id=${ccpayment_id}&app_id=${app_id}&app_secret=${app_secret}&out_order_no=${out_order_no}&amount=${amount}&timestamp=${timestamp}&noncestr=${noncestr}`;
//     const privateKey = fs.readFileSync(keyPath, { encoding: 'utf8', flag: 'r' })
//     const sign = signRSA(signStr, privateKey)
//     const params = {
//       ...rest,
//       ccpayment_id,
//       app_id,
//       // app_secret,
//       out_order_no,
//       amount,
//       noncestr,
//       timestamp,
//       sign
//     }
//     try {
//       const result = await axios.post(requestAPI.createOrder, params)
//       if (result) {
//         console.log(result.data)
//         res.json(result.data)
//       }
//     } catch (err) {
//       throw Error(err)
//     }
//   }
// }

// exports.webhookVerifyWithSha256 = function webhookVerifyWithSha256(req, res, next) {
//   const {
//     app_id,
//     app_secret,
//     noncestr,
//     timestamp,
//     sign,
//   } = req.body;
//   const signStr = `app_id=${app_id}&app_secret=${app_secret}&timestamp=${timestamp}&noncestr=${noncestr}`;
//   const compareSign = sha256(signStr)

//   res.status(200).json({
//     success: sign === compareSign
//   })
// }


// exports.webhookVerifyWithRSA = function webhookVerifyWithRSA(keyPath) {
//   return function (req, res, next) {
//     const {
//       app_id,
//       app_secret,
//       noncestr,
//       timestamp,
//       sign,
//     } = req.body;

//     const signStr = `app_id=${app_id}&app_secret=${app_secret}&timestamp=${timestamp}&noncestr=${noncestr}`;
//     fs.readFile(keyPath, 'utf-8', function (err, data) {
//       if (err) {
//         throw Error(err)
//       }
//       const compareSign = signRSA(signStr, data)
//       res.status(200).json({
//         success: sign === compareSign
//       })
//     })

//   }
// }
