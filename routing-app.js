// Feel free to edit this file
// APPLICATION ROUTES

module.exports = function(app) {

	// respond with "hello world" when a GET request is made to the homepage
	app.get('/', function(req, res) {
	  res.send('hello world !');
	});

  app.get('/test', (req, res) => {
    res.send('this is a test');
  });

  // add few more
  app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next(); // pass control to the next handler
  });

  app.get('/random.text', function (req, res) {
    res.send('random.text');
  });

  // will match acd and abcd
  app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
  });

  // will match abcd, abbcd, abbbcd, and so on
  app.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
  });

};