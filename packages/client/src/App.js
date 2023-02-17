import React, { useEffect } from 'react'
import axios from 'axios'
function App() {

  // fake data
  const params = {
    "ccpayment_id": "CP10107",
    "app_id": "202301170950281615285414881132544",
    "timestamp": 1673661683,
    "valid_timestamp": 823456,
    "amount": "1",
    "out_order_no": "2012033040550",
    "product_name": "test",
    "sign": "d6e316a5464b1484966e2817188f158d6a974e58b3f062d3b8c896ddb34037138df363ddce0b67f3eb974249cf3500c5653f89701098948df85dd56156948998c7228ce61760d403dc0483e1168ed906cbe11f0778516570d6cf8b14a8f5d947f62243a916a84bd9da618cf42a89deb96f1a9733577d7d4a7f45ed7b6c24c411c984ce1fc2475c31997b3609358d824981291cef2f43381661ccc69e1fbce58228ce560532dce942f23158e1836285d0dda8b05925e6b156700e12dd8f3df64327269b642d8c02876f18b4d2caa36f645006f72a999cf566f0b36cc1e442f189c5",
    "noncestr": "xdfg",
    "return_url": "https://app.gitbook.com/xxxxx"
  }

  const params1 = {
    "sign": "62ee167b7a08027ea30f8233827686c46b2b1d4d23b1c2b2d7bb4ee69db55a326b0f767ffaa5f1fa06916e3e146ef0a5aa9fa0eca2babda1f60ca7f252d173867243880b3716bcf6620fbb6b2bd3ce7b52152fa0939b410b0cd3689a5fd1d9810f0424ca53ea36362bdf2a1d411b28d19ec1e053f16bc20db325106bd65bb301d357470d143f5df8a744bae05bfcd1b223f65f9b1164c541045886a2004c2e28ac7657ff144fa8440b2858e7b7979e4313be8828fa71d03a105990719917fd9ed68b1802210fca713e0ca8ec622c33ce975ac351c1a671936c1f7931148c273758c1695314aec2dab7f21d81a6fc013e921ecf9a85ce75b60161702eac214397",
    "ccpayment_id": "CP10150",
    "app_id": "202301170950281615285414881132544",
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
    axios.post('/ccpayment/createTokenTradeOrder', params1).then((res) => {
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
    </>
  );
}

export default App;
