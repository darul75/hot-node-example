// Feel free to edit this file
var express = require('express');

var router = express.Router();

var moduleLoadTime = new Date();
var welcome = require("./welcome");

module.exports = function renderApp(app) {

	router.get('/api', function(req, res) {
		res.send('api');
	});

	doRoute(app);

	return [
		welcome
	].join(" ");
};

function doRoute(app) {

	router.get('/home', function(req, res) {
		res.send('homedd');
	});	

	router.param('user', function(req, res, next, id) {
		console.log('use:' + id);
		req.user = {		    
		    name: id
		  };
		next();
	});

	router.route('/users/:user').all(function(req, res, next) {
	  res.send('user is ' + req.user.name);
	});

	router.use('/use', function(req, res, next) {
	  res.send('use all');
	});

	app.get('/contact', function(req, res) {
	  res.send('contactdd');
	});

	app.use(router);

}

// just logging, not needed in real app
if(module.hot) {

	module.hot.dispose(function() {
		console.log("Disposed renderApp.js");
	});
}
