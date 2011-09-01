// panzerweb api
(function (w, scope, app){
	var api = app.api = {};
	
	//Request
	function request() {
		var c, m, p, fn;
		
		switch (arguments.length) {
			case 2:
				c = arguments[0];
				m = 'get';
				fn = arguments[1];
				break;
			case 3:
				c = arguments[0];
				m = 'get';
				p =  arguments[1];
				fn = arguments[2];
				break;
			case 4:
				c = arguments[0];
				m = arguments[1]
				p = arguments[2];
				fn = arguments[3];
				break;
			default: 
				scope.error('Wrong function "request" param');
				return;
		};
		
		var fname = 'r' + Date.now()
			, url = scope.href + 'api/' + c + '/' + m + '/' + fname + ((p)? '?data=' + JSON.stringify(p): '')
			;
				
		var el = scope.include(url, 'js', function (err, data) {
			fn(err, data);
			
			//remove
			if (el) el.parentNode.removeChild(el);
		});
	}
	api.request = request;
	
	
	//Ping
	function ping(fn) {
		var start = Date.now();
		request('ping', function() {
			fn(null, Date.now() - start);
		});
	};
	api.ping = ping;
	
	//Point
	function point(fn) {
		var start = Date.now();
		request('point', fn);
	};
	api.point = point;
	
	
	//Echo
	function echo(o, fn) {
		request('echo', o, fn);
	};
	api.echo = echo;
	
	scope.return = api;
})(window, window.PANZERWEB, window.PANZERWEB.app);
