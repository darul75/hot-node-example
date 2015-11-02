// Feel free to edit this file
// APPLICATION ROUTES VIA ROUTER

var express = require('express');
var router = express.Router();

module.exports = function(app) {

  app.route('/items/:id').get((req, res) => {
    res.send(req.params.id);
  });

};