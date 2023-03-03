import React, { useEffect } from 'react'
import axios from 'axios'
// const JsEncrypt  = require('jsencrypt');
// console.log(JsEncrypt)
function App() {

  // fake data
  const params = {
    'valid_timestamp': 823456,
    'amount': '1',
    'merchant_order_id': '012033040550',
    'product_name': 'test',
    'return_url': 'https://app.gitbook.com/xxxxx'
  }


  const handleRequest1 = () => {
    axios.post('/ccpayment/checkout', params).then((res) => {
      console.log('res:', res.data)
    })
  }

  


  return (
    <>
      <div>
        <button onClick={handleRequest1}>test header</button>
      </div>
      {/* <div>
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
      </div> */}
    </>
  );
}

export default App;
