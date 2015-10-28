// Feel free to edit this file
var express = require('express');

var router = express.Router();

var moduleLoadTime = new Date();
var welcome = require("./welcome");

module.exports = function renderApp(app) {

	require("./b")(app);

	router.get('/apiv2', function(req, res) {
		res.send('apiv3');
	});

	app.use(router);

	return [
		welcome
	].join(" ");
};

// just logging, not needed in real app
if(module.hot) {
	module.hot.accept("./b", function() {
		try {
			require("./b")(app);
		}
		catch(e) {

		}
	});
}
