'use strict';

var isExpressRouting = require('./isExpressRouting');

module.exports = {

  doReload: function (app, data) {
    console.log("PATCHING EXPRESS ROUTES");

    var mainLayers = app._router.stack;
    var idxPathToRemove = [];

    var matchRoute = function(layer) {
      for (var i=0; i<data.routes.length; i++) {
        var path = data.routes[i];
        try {
          var match = layer.match(path);
          if (match) {
            return false;
          }
        }
        catch (err) {
          console.log(err);
        }
      }

      return true;
    };

    var idxMainRouteToRemove = [];

    mainLayers.forEach(function(layer, idx) {

      if (typeof layer.handle === "function" || layer.route != null) {

          // app.get => layer.route.stack (Route)
          // or
          // router.get => layer.handle.stack

          var stack = layer.route != null && layer.route.stack != null ? layer.route.stack : layer.handle.stack;

          if (stack != null) {

            var oldLengh = stack.length;

            var newStack = stack.filter(matchRoute);

            if (oldLengh !== newStack.length && idxMainRouteToRemove.indexOf(idx) < 0) {
              idxMainRouteToRemove.push(idx);
            }

            if (layer.route != null && layer.route.stack != null) {
              layer.route.stack = newStack;
            } else {
              layer.handle.stack = newStack;
            }

          }
      }

    });

    idxMainRouteToRemove.forEach(function(elt, idx) {
      app._router.stack.splice(elt, 1);
    });

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