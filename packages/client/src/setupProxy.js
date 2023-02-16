const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/ccpayment', {
      target: 'http://localhost:7000',
      changeOrigin: true,
      // pathRewrite: {
      //   '^/ccpayment': ''
      // }
    })
  );
};