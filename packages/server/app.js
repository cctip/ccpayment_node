const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')

const { checkoutURLWithSha256, checkoutURLWithRSA, createTokenTradeOrderWithSha256, webhookVerifyWithSha256,webhookVerifyWithRSA } = require('../tools/src')
const router = express.Router()

const app = express();
// test start


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/ccpayment', router)
router.post('/checkout_url', checkoutURLWithSha256)
router.post('/checkout_url_rsa', checkoutURLWithRSA('rsa_private_key.pem'))
router.post('/createTokenTradeOrder', createTokenTradeOrderWithSha256)
router.post('/webhook_sha256', webhookVerifyWithSha256)
router.post('/webhook_rsa', webhookVerifyWithRSA('rsa_public_key.pem'))
// router.post('/checkout_url_rsa', test)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const listener = app.listen(7000, function () {
  console.log('Listening on port ' + listener.address().port); 
});

