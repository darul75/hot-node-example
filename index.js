console.log("Application started");

var http = require('http');
var express = require("express");
var renderApp = require("./renderApp");

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('out'));

renderApp(new Date(), app);

// fake server, one request per 5s, logged to console
/*setInterval(function() {
	console.log(renderApp(new Date()));
}, 5000);*/

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

if(module.hot) {
	module.hot.accept("./renderApp", function() {
		renderApp = require("./renderApp")(new Date(), app);

	/*	var layers = router.stack;
    var path = '/api/*';
    var idxToRemove = [];
    layers.forEach((layer, idx) => {
      try {
        const match = layer.match(path);
        if (match) {
          idxToRemove.push(idx);
        }
      } catch (err) {
        return err;
      }
    });

    idxToRemove.forEach((idx) => {
      layers.splice(idx, 1);
    });*/

	});
}
