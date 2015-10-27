'use strict';

module.exports = {

  doReload: function (app, data) {
    console.log("PATCHING EXPRESS ROUTES");

    var mainLayers = app._router.stack;
    var idxPathToRemove = [];

    mainLayers.forEach(function(layer, idx) {

      var idxMainRouteToRemove = [];
      // 'if (typeof layer.handle === "function" ||\n\t',
      if (typeof layer.handle === "function" || layer.route != null) {
          //console.log(layer);

          var stack = layer.route != null && layer.route.stack != null ? layer.route.stack : layer.handle.stack;

          if (stack != null) {
            var idxRoutesToRemove = [];

            stack.forEach(function(subLayer, idx2) {
              //console.log(subLayer);,
              data.routes.forEach(function(path) {
                try {
                  var match = subLayer.match(path);
                  if (match) {
                    if (idxMainRouteToRemove.indexOf(idx) < 0) {
                      idxMainRouteToRemove.push(idx);
                    }
                    if (idxRoutesToRemove.indexOf(idx2) < 0) {
                      idxRoutesToRemove.push(idx2);
                    }
                  }
                }
                catch (err) {
                  console.log(err);
                }
              });

              idxRoutesToRemove.forEach(function(elt, idx) {
                stack.splice(idx, 1);
              });
            });

            //console.log(idxMainRouteToRemove);
            idxMainRouteToRemove.forEach(function(elt, idx) {
              layer.handle.stack.splice(idx, 1);
            });
          }
      }

      //  another pass for old way
      idxMainRouteToRemove = [];
      data.routes.forEach(function(path) {
        try {
          var match = layer.match(path);
          if (match) {
            if (idxMainRouteToRemove.indexOf(idx) < 0) {
              idxMainRouteToRemove.push(idx);
            }
          }
        }
        catch (err) {
          console.log(err);
        }
      });

      if (layer.route != null) {
        idxMainRouteToRemove.forEach(function(elt) {
          layer.route.stack.splice(0, 1);
        });
      }

    });
  },

  setExpressResourcePath: function(path) {
    this.mainExpressResourcePath = path;
  },

  warn: function() {
    console.warn(
      'It appears you put your middlewares/routes in main file. ' +
      'Please declare it in your dependencies.');
  }
};