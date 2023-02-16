import React, {useEffect} from 'react'
import axios from 'axios'
function App() {

  const handleRequest1 = () => {
    const params = {
      "ccpayment_id":"CP10107",
      "app_id":"202301170950281615285414881132544",
      "timestamp":1673661683,
      "valid_timestamp":823456,
      "amount":"1",
      "out_order_no":"2012033040550",
      "product_name":"test",
      "sign":"d6e316a5464b1484966e2817188f158d6a974e58b3f062d3b8c896ddb34037138df363ddce0b67f3eb974249cf3500c5653f89701098948df85dd56156948998c7228ce61760d403dc0483e1168ed906cbe11f0778516570d6cf8b14a8f5d947f62243a916a84bd9da618cf42a89deb96f1a9733577d7d4a7f45ed7b6c24c411c984ce1fc2475c31997b3609358d824981291cef2f43381661ccc69e1fbce58228ce560532dce942f23158e1836285d0dda8b05925e6b156700e12dd8f3df64327269b642d8c02876f18b4d2caa36f645006f72a999cf566f0b36cc1e442f189c5",
      "noncestr":"xdfg",
      "return_url":"https://app.gitbook.com/xxxxx"
  }
    axios.post('/ccpayment/checkout_url', params).then((res) => {
      console.log('res:', res.data)
    })
  }

  const handleRequest2 = () => {
    
  }
  
  return (
    <div className="App">
      <button onClick={handleRequest1}>checkout url</button>
    </div>
  );
}

export default App;
