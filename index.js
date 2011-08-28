var connect = require('connect');

var c = connect.createServer(
	  connect.static(__dirname + '/public', { maxAge: 0 })
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

	})
);

c.listen(8000);