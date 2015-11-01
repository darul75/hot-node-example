// Feel free to edit this file
const express = require('express');
const router = express.Router();

module.exports = function renderApp(app) {

  require('./routes-api')(app);

	app.route('/book')
    .get((req, res) => {
      res.send('Get a good');
    })
    .post((req, res) => {
      res.send('Add a book');
    })
    .put((req, res) => {
      res.send('Update the book');
    }); 

	return [].join(" ");
};
