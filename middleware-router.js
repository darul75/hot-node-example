// ROUTER MIDDLEWARES
var express = require('express');
var router = express.Router();

module.exports = function(app) {

  // a middleware with no mount path, gets executed for every request to the router
  router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

  // a middleware sub-stack shows request info for any type of HTTP request to /user/:id
  router.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
  }, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });

  // handler for /user/:id which renders a special page
  router.get('/user/:id', function (req, res, next) {
    console.log(req.params.id);
    res.send(req.params.id);
  });

  // mount the router on the app
  app.use('/', router);

};