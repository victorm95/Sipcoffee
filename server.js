var app = require('./conf/app');

app.listen(app.get('port'), function() {
	console.log('http://localhost:'+app.get('port'));
});
