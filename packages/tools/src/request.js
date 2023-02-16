const axios = require('axios')
const { sha256 } = require('./sign')

exports.checkoutURLWithSha256 = async function checkoutURLWithSha256(req, res) {
  const timestamp = parseInt(Date.now() / 1000, 10) + 30
  const url = 'https://admin.ccpayment.com/ccpayment/v1/concise/url/get';
  const str = `ccpayment_id=CP10035&app_id=202302160812171626132344467566592&app_secret=a58f572564f7fce44acd66024d6da9b4&timestamp=${timestamp}&amount=1&out_order_no=1030404044004&product_name=test&noncestr=abc123`;
  const encrypt = sha256(str);
  const params = {
    ...req.body,
    ccpayment_id: 'CP10035',
    sign: encrypt,
    app_id: '202302160812171626132344467566592',
    timestamp,
    noncestr: 'abc123',
    out_order_no: '1030404044004'
  }
  try {
    const result = await axios.post(url, params)
    if (result) {
      console.log(result.data)
      res.json(result.data)
    }
  } catch (err) {
    throw Error(err)
  }

}

exports.checkoutURLWithRSA = function checkoutURLWithRSA(req, res) {

}
