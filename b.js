// Feel free to edit this file
var express = require('express');

var router = express.Router();

console.log("b");

console.log("eee");

module.exports = function renderApp(app) {

	console.log('export again');

	var path = '/';
	var pathRoute = '/api/*';

	console.log('b redddqddduisssrement');

	router.get('/tutu', function(req, res) {
		res.send('tutsssu');
	});

	app.get('/titi', function(req, res) {
	  res.send('ssss');
	});

	app.use(router);

	return ['module B'].join(" ");
};

// just logging, not needed in real app
if(module.hot) {

	module.hot.dispose(function() {
		console.log("Disposed b.js");
	});

	//module.hot.accept();
}
