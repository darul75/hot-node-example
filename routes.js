// Feel free to edit this file
var express = require('express');

var router = express.Router();

module.exports = function renderApp(app) {

  require('./routes-api')(app);

	app.route('/book')
    .get(function(req, res) {
      res.send('Get a good book');
    })
    .post(function(req, res) {
      res.send('Add a book');
    })
    .put(function(req, res) {
      res.send('Update the book');
    });

  app.route('/bookie')
    .get(function(req, res) {
      res.send('Get a fff bodddok');
    })
    .post(function(req, res) {
      res.send('Add a book');
    })
    .put(function(req, res) {
      res.send('Update the book');
    });  

	return [].join(" ");
};

// just logging, not needed in real app
if(module.hot) {

	module.hot.accept('./routes-api', function() {
		require('./routes-api')(app);
	});
}
