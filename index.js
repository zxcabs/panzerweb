var connect = require('connect');

var c = connect.createServer(
	  connect.static(__dirname + '/public', { maxAge: 0 })
	, connect.router(function(app){
			app.get('/test', function(req, res){
				res.end('test');
			});

	})
);

c.listen(8000);