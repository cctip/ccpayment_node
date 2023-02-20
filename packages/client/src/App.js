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
    const params = {
      "sign": "62ee167b7a08027ea30f8233827686c46b2b1d4d23b1c2b2d7bb4ee69db55a326b0f767ffaa5f1fa06916e3e146ef0a5aa9fa0eca2babda1f60ca7f252d173867243880b3716bcf6620fbb6b2bd3ce7b52152fa0939b410b0cd3689a5fd1d9810f0424ca53ea36362bdf2a1d411b28d19ec1e053f16bc20db325106bd65bb301d357470d143f5df8a744bae05bfcd1b223f65f9b1164c541045886a2004c2e28ac7657ff144fa8440b2858e7b7979e4313be8828fa71d03a105990719917fd9ed68b1802210fca713e0ca8ec622c33ce975ac351c1a671936c1f7931148c273758c1695314aec2dab7f21d81a6fc013e921ecf9a85ce75b60161702eac214397",
      "ccpayment_id": "CP10150",
      "app_id": "202302160812171626132344467566592",
      "timestamp": 1673242705,
      "notify_url": "https://cwallet.com/pay/callback",
      "remark": "",
      "device": "app",
      "noncestr": "fNZPQ",
      "json_content": {
        "token_id": "8e5741cf-6e51-4892-9d04-3d40e1dd0128",
        "chain": "TRX",
        "amount": "0.5",
        "contract": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        "out_order_no": "3735077979050379",
        "fiat_name": "USD"
      }
    }
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
      app_id: '202302160812171626132344467566592',
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
      app_id: '202302160812171626132344467566592',
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
