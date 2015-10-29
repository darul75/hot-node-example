// Feel free to edit this file
var express = require('express');

var router = express.Router();

var moduleLoadTime = new Date();
var welcome = require("./welcome");

var app = require('./index');

module.exports = function renderApp(app) {

	var b = require("./b")(app);

	router.get('/apiv2', function(req, res) {
		res.send('v2sddd');
	});

	app.use(router);

	return [
		welcome
	].join(" ");
};

// just logging, not needed in real app
if(module.hot) {

	module.hot.dispose(function() {
		console.log("Disposed a.js");
	});

	module.hot.accept("./b", function() {
		try {
			var b = require("./b")(app);
			console.log('requiring again' + b);
		}
		catch(e) {
			console.log(e);
		}
	});
}
