import http from 'http';
import express from 'express';

const app = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('out'));

// routes app
require('./routes')(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


// will trigger a warning, please use routing in sub modules.
app.get('/warning', function(req, res) {

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
