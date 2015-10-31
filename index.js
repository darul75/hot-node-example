console.log("Application started");

var http = require('http');
var express = require("express");

var app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('out'));

// routes app
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/warning', function(req, res) {
	// warning
})

if(module.hot) {
	module.hot.accept('./routes', function() {
		try {
			require('./routes')(app);
		}
		catch(e) {

		}
	});
}
