// APPLICATION ROUTES VIA ROUTER

var express = require('express');
var router = express.Router();

module.exports = function(app) {

  app.route('/book')
    .get(function(req, res) {
     res.send('Get a random book book');
    })
    .post(function(req, res) {
     res.send('Add a book');
    })
    .put(function(req, res) {
     res.send('Update the book');
    });

};