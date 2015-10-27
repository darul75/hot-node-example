// Feel free to edit this file
var express = require('express');

var router = express.Router();

var moduleLoadTime = new Date();
var welcome = require("./welcome");

module.exports = function renderApp(app) {

	doRoute(app);

	return [
		welcome
	].join(" ");
};

function doRoute(app) {

	console.log('export again');

	var path = '/';
	var pathRoute = '/api/*';


	router.get('/tutu', function(req, res) {
		res.send('ddd');
	});

	app.get('/titddi', function(req, res) {
	  res.send('https://github.com/webpack/webpack/issues/418');
	});

	app.use(router);

}

// just logging, not needed in real app
if(module.hot) {

	module.hot.dispose(function() {
		console.log("Disposed renderApp.js");
	});
}
