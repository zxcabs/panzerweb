var connect = require('connect');

var c = connect.createServer(
	  connect.query()
	, connect.static(__dirname + '/public', { maxAge: 0 })
	, connect.router(function(app){
			//create session
			app.get('/api/session/:fname', function(req, res){
				var login   = (req.query)? req.query.login: null
					, fname = req.params.fname
					;
				
				if (!login) {
					res.setHeader('Content-type', 'text/javascript');
					res.end('(function(w,s){s.load(\''+ fname.replace(/.js/, '') +'\',\'Login error\');})(window, PANZERWEB);');
				} else {
					//TODO create session
					var o = {
						  success: true
						, sid    : Math.floor(Math.random() * 100000)
					};
					
					res.setHeader('Content-type', 'text/javascript');
					res.end('(function(w,s){s.load(\''+ fname.replace(/.js/, '') +'\',null,\''+JSON.stringify(o)+'\');})(window, PANZERWEB);');
				}
			});
			
			app.get('/api/ping/get/:fname', function(req, res) {
				res.setHeader('Content-type', 'text/javascript');
				res.end('(function(w,s){s.return=\'pong\';})(window, PANZERWEB);');
			});
			
			app.get('/api/echo/get/:fname', function (req, res) {
				var str = ('string' === typeof req.query.data)? req.query.data: JSON.stringify(req.query.data).replace(/^"|"$/g, '');
				res.setHeader('Content-type', 'text/javascript');
				res.end('(function(w,s){s.return='+ str +';})(window, PANZERWEB);');				
			});
	})
);

c.listen(7654);
