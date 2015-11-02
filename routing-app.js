// APPLICATION ROUTES

module.exports = function(app) {

	// respond with "hello world" when a GET request is made to the homepage
	app.get('/', function(req, res) {
	  res.send('hello world');
	});

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

	// will match abcd, abxcd, abRABDOMcd, ab123cd, and so on
	app.get('/ab*cd', function(req, res) {
	  res.send('ab*cd');
	});

	// will match /abe and /abcde
	app.get('/ab(cd)?e', function(req, res) {
	 res.send('ab(cd)?e');
	});

	// will match butterfly, dragonfly; but not butterflyman, dragonfly man, and so on
	app.get(/.*fly$/, function(req, res) {
	  res.send('/.*fly$/');
	});

	var cb0 = function (req, res, next) {
	  console.log('CB0');
	  next();
	}

	var cb1 = function (req, res, next) {
	  console.log('CB1');
	  next();
	}

	var cb2 = function (req, res) {
	  res.send('Hello from C!');
	}

	app.get('/example/c', [cb0, cb1, cb2]);



};