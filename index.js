console.log("Application started");

var http = require('http');
var express = require("express");

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('out'));

require("./a")(app);

app.get('/route', function(req, res) {
	console.log('route');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

if(module.hot) {
	module.hot.accept("./a", function() {
		try {
			require("./a")(app);
		}
		catch(e) {

		}
	});
}
