// Feel free to edit this file
var express = require('express');

var testJulien = 'ee';

var app = require('./index');

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

	router.get('/api', function(req, res, next) {
	  res.send('api');
	});

	router.get('/user', function(req, res, next) {
	  res.send('userddd');
	});

	router.get('/login', function(req, res, next) {
	  res.send('logindd');
	});

	app.use(router);

	return [
		welcome
	].join(" ");
};

// just logging, not needed in real app
if(module.hot) {

	module.hot.dispose(function() {
		console.log("Disposed renderApp.js");
	});
}
