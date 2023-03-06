const axios = require('axios');
const crypto = require('crypto');

const requestAPI = {
  checkoutURL: 'https://admin.ccpayment.com/ccpayment/v1/concise/url/get',
  selectTokenURL: 'https://admin.ccpayment.com/ccpayment/v1/support/token',
  selectChainURL: 'https://admin.ccpayment.com/ccpayment/v1/token/chain',
  submitOrderURL: 'https://admin.ccpayment.com/ccpayment/v1/bill/create',
  tokenRateURL: 'https://admin.ccpayment.com/ccpayment/v1/token/rate'
}


module.exports = {
  appId: null,
  appSecret: null,

  axios: axios,

  createTimestamp(threshold = 0) {
    return parseInt(Date.now() / 1000, 10) + threshold
  },
  

  sha256(data) {
    let hash = crypto.createHash('sha256');
    return hash.update(data, 'utf-8').digest('hex');
  },
  

  init(appId, appSecret) {
    this.appId = appId
    this.appSecret = appSecret
  },

  async selectToken(callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.selectTokenURL, null, {
        headers: {
          'Appid': this.appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${this.appId}${this.appSecret}${timeStamp}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const compareSignture = this.sha256(`${appid}${this.appSecret}${timestamp}${result.data ? JSON.stringify(result.data) : ''}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : Error('http code error'))
      }
    } catch (err) {
      Promise.reject(err)
    }
  },


  async selectChain(data, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.selectChainURL, {
        ...data
      }, {
        headers: {
          'Appid': this.appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${this.appId}${this.appSecret}${timeStamp}${data ? JSON.stringify({ ...data }) : ''}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const compareSignture = this.sha256(`${appid}${this.appSecret}${timestamp}${result.data ? JSON.stringify(result.data) : ''}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : Error('http code error'))
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  async submitOrder(data, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.submitOrderURL, {
        ...data
      }, {
        headers: {
          'Appid': this.appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${this.appId}${this.appSecret}${timeStamp}${data ? JSON.stringify({ ...data }) : ''}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const compareSignture = this.sha256(`${appid}${this.appSecret}${timestamp}${result.data ? JSON.stringify(result.data) : ''}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : Error('http code error'))
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  async checkoutURL(data, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.checkoutURL, {
        ...data
      }, {
        headers: {
          'Appid': this.appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${this.appId}${this.appSecret}${timeStamp}${data ? JSON.stringify({ ...data }) : ''}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const compareSignture = this.sha256(`${appid}${this.appSecret}${timestamp}${result.data ? JSON.stringify(result.data) : ''}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : Error('http code error'))
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  async tokenRate(data, callback) {
    const timeStamp = this.createTimestamp()
    try {
      const result = await axios.post(requestAPI.tokenRateURL, {
        ...data
      }, {
        headers: {
          'Appid': this.appId,
          'Timestamp': timeStamp,
          'Sign': this.sha256(`${this.appId}${this.appSecret}${timeStamp}${data ? JSON.stringify({ ...data }) : ''}`)
        }
      })
      const { appid, timestamp, sign } = result.headers
      const compareSignture = this.sha256(`${appid}${this.appSecret}${timestamp}${result.data ? JSON.stringify(result.data) : ''}`)
      if (result) {
        callback && callback(compareSignture === sign ? result.data : Error('http code error'))
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  webHookNotify(sign, callback) {
    const timeStamp = this.createTimestamp()
    const compareSignture = this.sha256(`${this.appId}${this.appSecret}${timeStamp}`)
    callback && callback(compareSignture === sign ? 'success!' : Error('http code error'))
  }
}
