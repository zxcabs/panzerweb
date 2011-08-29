// panzerweb api
(function (w, scope, app){
	app.api = {};
	
	//Request
	function request(o, m, p, fn) {
		var fname = 'r' + Date.now()
			, url = scope.href + 'api/' + o + '/' + m + '/' + fname
			, ps = ''
			;
			
		for (var i in p){
			if (ps) ps += '&';
			ps += i + '=' + p[i];
		};
		
		if (ps) url += '?' + ps;
		
		var el = scope.include(url, 'js', function (err, data) {
			fn(err, data);
			
			//remove
			if (el) el.parentNode.removeChild(el);
		});
	}
	
	//Ping
	function ping(fn) {
		var start = Date.now();
		request('ping', 'get', {}, function() {
			fn(null, Date.now() - start);
		});
	}
	
	app.api.ping = ping;
	
	scope.return = app.api;
})(window, window.PANZERWEB, window.PANZERWEB.app);
