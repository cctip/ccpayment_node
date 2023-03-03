const axios = require('axios');
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
      const compareSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : 'http code error')
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
      const compareSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : 'http code error')
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
      const compareSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : 'http code error')
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
          'Appid': appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${appId}${appSecret}${timeStamp}${JSON.stringify({ ...data })}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const compareSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : 'http code error')
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
          'Appid': appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${appId}${appSecret}${timeStamp}${JSON.stringify({ ...data })}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const compareSignture = this.sha256(`${appid}${appSecret}${timestamp}${JSON.stringify(result.data)}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : 'http code error')
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  webHookNotify(appId, appSecret, sign, callback) {
    const timeStamp = this.createTimestamp()
    const compareSignture = this.sha256(`${appId}${appSecret}${timeStamp}`)
    callback && callback(compareSignture === sign ? 'success!' : 'http code error')
  }
}
