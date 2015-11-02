// Feel free to edit this file
const express = require('express');
const router = express.Router();

module.exports = function(app) {

  // application routing
  require('./routing-app')(app);

  // application routing via Router application
  require('./routing-router')(app);

  // application routing via Router instance
  const routingModular = require('./routing-modular');

  app.use('/birds', routingModular);

  // application middleware
  require('./middleware-app')(app);

  // application middleware
  require('./middleware-router')(app);
};

if(module.hot) {

  var acceptedDepencies = ['./routing-app', './routing-modular', './routing-router'];

  module.hot.accept(acceptedDepencies, function() {
    try {
      require('./routing-app');
      require('./routing-router');
      require('./middleware-app');
      require('./middleware-router');

      const routingModular = require('./routing-modular');
      app.use('/birds', routingModular);
    }
    catch(e) {

    }
  });
}
