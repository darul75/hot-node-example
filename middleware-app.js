// APPLICATION MIDDLEWARES

module.exports = function(app) {

  // a middleware with no mount path; gets executed for every request to the app
  app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });

  // a middleware mounted on /user/:id; will be executed for any type of HTTP request to /user/:id
  app.use('/book/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });

  // a route and its handler function (middleware system) which handles GET requests to /user/:id
  app.get('/book/:id', function (req, res, next) {
    res.send('book is ', req.params.id);
  });

};