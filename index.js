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
			
			app.get('/api/point/get/:fname', function (req, res) {
				var str = JSON.stringify(test.point).replace(/^"|"$/g, '');
				res.setHeader('Content-type', 'text/javascript');
				res.end('(function(w,s){s.return='+ str +';})(window, PANZERWEB);');
			});
	})
);

function Test() {
	this.width  = 800;
	this.height = 600;
	this.point  = {x: 0, y: 0, dx: 1, dy: 2};
	this._lastTime = Date.now();
	this._interval = 100;
		
	this.run();
};

Test.prototype.run = function () {
	var self = this;
	
	function tack() {
		var tickTime = Date.now()
			, dt = tickTime - self._lastTime
			, nt
			;
		
		if (dt >= self._interval) {
			self.tick(dt);;
			self._lastTime = Date.now();
			nt = self._interval - (self._lastTime - tickTime);
		} else {
			nt = self._interval - dt;
		}
		
		nt = (nt < 0)? 0: nt;
		setTimeout(tack, nt);
	};
	
	tack();
};

Test.prototype.tick = function (dt) {
	var p = this.point;
	
	p.x += p.dx;
	p.y += p.dy;
	
	if (p.x > this.width) {
		p.x = 0;
	}
	
	if (p.y > this.height) {
		p.y = 0;
	}
};

var test = new Test();

c.listen(7654);
