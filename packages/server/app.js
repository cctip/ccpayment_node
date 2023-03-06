const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')

const ccpaymentWidgets = require('../common/src')
const router = express.Router()

const app = express();
// test start

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const appId = '202302010636261620672405236006912';
const appSecret = '62fbff1f796c42c50bb44d4d3d065390';

// Regular call example
; (function () {
  ccpaymentWidgets.checkoutURL(appId, appSecret, {
    'valid_timestamp': 823456,
    'amount': '1',
    'merchant_order_id': '012033040550',
    'product_name': 'test',
    'return_url': 'https://app.gitbook.com/xxxxx'
  }, (result) => {
    console.log('aaa:', result)
  })

  ccpaymentWidgets.selectToken(appId, appSecret, (result) => {
    console.log('bbb:', result)
  })

  ccpaymentWidgets.selectChain(appId, appSecret, {
    "token_id": "8addd19b-37df-4faf-bd74-e61e214b008a"
  }, (result) => {
    console.log('ccc:', result)
  })

  ccpaymentWidgets.submitOrder(appId, appSecret, {
    "remark": "eee",
    "token_id": "8e5741cf-6e51-4892-9d04-3d40e1dd0128",
    "chain": "TRX",
    "amount": "0.5",
    "contract": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    "merchant_order_id": "3735077979050923",
    "fiat_currency": "USD"
  }, (result) => {
    console.log('ddd:', result)
  })

  ccpaymentWidgets.tokenRate(appId, appSecret, {
    "amount": "1000",
    "token_id": "f36ad1cf-222a-4933-9ad0-86df8069f916",
  }, (result) => {
    console.log('eee:', result)
  })

  ccpaymentWidgets.webHookNotify(appId, appSecret, 'sign value...', (result) => {
    console.log('fff:', result)
  })


})()

// File read way example
fs.readFile(path.join(__dirname, 'test.txt'), 'utf8', (err, data) => {
  if (err) {
    throw Error(err)
  }
  const splitLine = data.toString().split(/\r?\n/)
  const [a, b] = splitLine
  ccpaymentWidgets.checkoutURL(a, b, {
    'valid_timestamp': 823456,
    'amount': '1',
    'merchant_order_id': '012033040550',
    'product_name': 'test',
    'return_url': 'https://app.gitbook.com/xxxxx'
  }, (result) => {
    console.log('file read:', result)
  })
})

// Routing way example
app.use('/ccpayment', router)
router.post('/checkout', (req, res, next) => {
  ccpaymentWidgets.checkoutURL(appId, appSecret, {
    ...req.body
  }, (result) => {
    console.log('aaa:', result)
    res.json(result)
  })
})



app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


const listener = app.listen(7000, function () {
  console.log('Listening on port ' + listener.address().port);
});

