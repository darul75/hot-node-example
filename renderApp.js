// Feel free to edit this file
var express = require('express');

var express = require("express");

var app = express();

var testJulien = 'ee';

var router = express.Router();

var moduleLoadTime = new Date();
var welcome = require("./welcome");

module.exports = function renderApp(input) {

	console.log('export again');

	var path = '/';
	var pathRoute = '/api/*';

   /* var mainLayers = app._router.stack;

    var idxPathToRemove = [];

    mainLayers.forEach(function(layer, idx) {

    	console.log('********************');
    	console.log(layer);
    	console.log('********************');

    	if (
    		typeof layer.handle === 'function' ||
    		layer.route != null && layer.route.path === path) {

    		var stack = layer.route != null && layer.route.stack != null ? layer.route.stack : layer.handle.stack;

		    if (stack != null) {
		    	var idxRoutesToRemove = [];
		    	stack.forEach(function(subLayer, idx2) {

	    			var test = layer.route != null && layer.route.path === path ? path : pathRoute;

	    			console.log('test' + test);

	    			try {
				        var match = subLayer.match(test);
				        if (match) {
				          var idxToRemove = subLayer.route != null && subLayer.route.path === path ? idx : idx2;
				          console.log("route removed " + idx);
				          idxRoutesToRemove.push(idx);
				        }
				    }
				      catch (err) {
				      	console.log(err);
				      }
			    });

			    idxRoutesToRemove.forEach(function(elt, idx) {
			    	stack.splice(idx, 1);
			    });
		    }
    	}
    });*/

	/*router.use('/api/*', function(req, res, next) {
	  console.log('api julien');
	});*/

	router.use('/apiv1*', function(req, res, next) {
	  console.log('asspi julien');
	});

	router.use('/apiv1*', function(req, res, next) {
	  console.log('asspi julien coucou');
	});

	router.use('/toto', function(req, res, next) {
	  console.log('toto');
	});

	router.use('/toto', function(req, res, next) {
	  console.log('tutu');
	});

	app.get('/', function (req, res) {
	  console.log(new Date());
	  res.send('jul rot');
	});

	app.delete('/titi', function (req, res) {
	  console.log(new Date());
	  res.send('jul rot');
	});

	app.use(router);

	return [
		welcome,
		"World julikkkksssen",
		"Module loaded at", moduleLoadTime.toLocaleTimeString(),
		"Rendered at", input.toLocaleTimeString()
	].join(" ");
};

// just logging, not needed in real app
if(module.hot) {

	module.hot.dispose(function() {
		console.log("Disposed renderApp.js");
	});
}
