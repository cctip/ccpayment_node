import axios from 'axios'

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
      <button onClick={handleRequest1}>test header</button>
    </>
  );
}

export default App;
