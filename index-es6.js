import http from 'http';
import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('out'));

// routes app
require('./routes-es6')(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/warning', function(req, res) {
	// warning
})

if(module.hot) {
	module.hot.accept('./routes-es6', function() {
		try {
			require('./routes-es6')(app);
		}
		catch(e) {

		}
	});
}
