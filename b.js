// Feel free to edit this file
var express = require('express');

var router = express.Router();

module.exports = function renderApp(app) {

	console.log('export again');

	var path = '/';
	var pathRoute = '/api/*';


	router.get('/tutu', function(req, res) {
		res.send('tuddddtu');
	});

	app.get('/titi', function(req, res) {
	  res.send('titi');
	});

	app.use(router);

	return ['module B'].join(" ");
};

// just logging, not needed in real app
if(module.hot) {

	module.hot.dispose(function() {
		console.log("Disposed renderApp.js");
	});
}
