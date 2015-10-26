console.log("Application started");

var http = require('http');
var express = require("express");

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('out'));

// fake server, one request per 5s, logged to console
/*setInterval(function() {
	console.log(renderApp(new Date()));
}, 5000);*/

var renderApp = require("./renderApp")();

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
  
});

if(module.hot) {
	module.hot.accept("./renderApp", function() {
		renderApp = require("./renderApp")();
	});
}
