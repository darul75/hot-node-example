'use strict';

var isExpressRouting = require('./isExpressRouting');

module.exports = {

  doReload: function (app, data) {
    console.log("PATCHING EXPRESS ROUTES");

    var idxPathToRemove = [];

    var matchRoute = function(layer, idx) {
      for (var i=0; i<data.routes.length; i++) {
        var path = data.routes[i];
        try {
          var match = layer.match(path);
          if (match) {
            idxPathToRemove.push(idx);
            return false;
          }
        }
        catch (err) {
          console.log(err);
        }
      }

      return true;
    };

    var removeRoute = function(layer, idx, layers) {
      // app.get => layer.route.stack (Route)
      // or
      // router.get => layer.handle.stack

      var stack = layer.handle.stack;

      if (stack != null) {

        var oldLengh = stack.length;

        var newStack = stack.filter(matchRoute);

        if (oldLengh !== newStack.length) {
          layers.splice(idx, 1);
        }

      }

      if (layer.route) {
        layer.route.stack.forEach(removeRoute);
      }

    };

    app._router.stack.forEach(removeRoute);

  },

  setExpressResourcePath: function(path) {
    this.mainExpressResourcePath = path;
  },

  warn: function() {
    console.warn(
      'It appears you put your middlewares/routes in main file. ' +
      'Please declare it in your dependencies.');
  },

  checkModule: function(mod, __webpack_require__) {

    mod.children.forEach(function(elt) {
      var requiredModule = __webpack_require__(elt);

      console.log(requiredModule.toString());
    });
  }
};