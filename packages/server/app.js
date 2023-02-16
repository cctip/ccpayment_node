const http = require('http');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')

const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const axios = require('axios')

const { decodeRSA, encodeRSA } = require('../tools/src/sign')
const {checkoutURLWithSha256} = require('../tools/src/request')
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

app.post('/ccpayment/checkout_url', checkoutURLWithSha256)
// new Promise((resolve, reject) => {
//   fs.readFile(path.join(__dirname, 'rsa_public_key.pem'), 'utf-8', (err, data) => {
//     if (err) {
//       reject(err)
//     }
//     resolve(encodeRSA('#@#@#~)*@#', data))
//   })
// }).then((data) => data)
//   .then((data) => {
//     console.log('before:', data)
//     let privateKey = fs.readFileSync(path.join(__dirname, 'rsa_private_key.pem'), { encoding: 'utf-8' })
//     console.log('after:', decodeRSA(data, privateKey))
//   })
//   .catch((err) => {
//     throw err
//   })

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




let listener = app.listen(7000, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

