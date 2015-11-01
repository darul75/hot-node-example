// Feel free to edit this file
var express = require('express');


module.exports = function renderApp(app) {

	var router = express.Router();	

	app.use(router);

	var r1 = express.Router();
	r1.get('/', function (req, res, next) {
	  next();
	});

	r1.get('/api', function (req, res, next) {
	  res.send('ddd');
	});

	r1.get('/apiv3', function (req, res, next) {
	  res.send('apiv3');
	});

	var r2 = express.Router();
	r2.get('/', function (req, res, next) {
	  res.send('2 middleware finesss');	  
	})

	r2.get('/titi', function (req, res, next) {
	  res.send('titi is again again');	  
	})

	app.use(r1, r2);

	return ['module B'].join(" ");
};
