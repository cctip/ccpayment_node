import React, { useEffect } from 'react'
import axios from 'axios'
// const JsEncrypt  = require('jsencrypt');
// console.log(JsEncrypt)
function App() {

  // fake data
  const params = {
    "ccpayment_id": "CP10035",
    "app_id": "202302160812171626132344467566592",
    "app_secret": "a58f572564f7fce44acd66024d6da9b4",
    "timestamp": 1673661683,
    "valid_timestamp": 823456,
    "amount": "1",
    "out_order_no": "202211181420251593489282956267520",
    "product_name": "test",
    "sign": "jamesanthony",
    "noncestr": "ylaDo",
    "return_url": "https://app.gitbook.com/xxxxx"
  }

  
  const handleRequest1 = () => {
    axios.post('/ccpayment/checkout_url', params).then((res) => {
      console.log('res:', res.data)
    })
  }

  const handleRequest2 = () => {
    axios.post('/ccpayment/checkout_url_rsa', params).then((res) => {
      console.log('res:', res.data)
    })
  }

  const handleRequest3 = () => {
    axios.post('/ccpayment/createTokenTradeOrder', params).then((res) => {
      console.log('res:', res.data)
    })
  }

  const handleRequest6 = () => {
    axios.post('/ccpayment/createTokenTradeOrder_rsa', params).then((res) => {
      console.log('res:', res.data)
    })
  }

  const handleRequest4 = () => {
    //const noncestr = 'app_id=202302160812171626132344467566592&app_secret=a58f572564f7fce44acd66024d6da9b4&timestamp=${Date.now()}'
    const params = {
      app_id:  '202302160812171626132344467566592',
      app_secret: 'a58f572564f7fce44acd66024d6da9b4',
      timestamp: 1676863220621,
      noncestr: 'abc123',
      sign: 'b8af2a7f17cdb7f6b1e8f2587813decdc62892e281236ac63c2cba0b888b7b08'
      
    }
    axios.post('/ccpayment/webhook_sha256', params).then((res) => {
      console.log('res:', res.data)
    })
  }
  const handleRequest5 = () => {
    //const noncestr = 'app_id=202302160812171626132344467566592&app_secret=a58f572564f7fce44acd66024d6da9b4&timestamp=${Date.now()}'
    const params = {
      app_id:  '202302160812171626132344467566592',
      app_secret: 'a58f572564f7fce44acd66024d6da9b4',
      timestamp: 1676863220621,
      noncestr: 'abc123',
      sign: 'b8af2a7f17cdb7f6b1e8f2587813decdc62892e281236ac63c2cba0b888b7b08'
      
    }
    axios.post('/ccpayment/webhook_rsa', params).then((res) => {
      console.log('res:', res.data)
    })
  }
  

  return (
    <>
      <div>
        <button onClick={handleRequest1}>checkout url</button>
      </div>
      <div>
        <button onClick={handleRequest2}>checkout url rsa</button>
      </div>
      <div>
        <button onClick={handleRequest3}>ccpayment order</button>
      </div>
      <div>
        <button onClick={handleRequest6}>ccpayment order rsa</button>
      </div>
      <div>
        <button onClick={handleRequest4}>web hook sha256</button>
      </div>
      <div>
        <button onClick={handleRequest5}>web hook rsa</button>
      </div>
    </>
  );
}

export default App;
