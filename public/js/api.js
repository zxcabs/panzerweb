// panzerweb api
(function (w, scopre, app){
	app.api = {};
	
	//Request
	function request(o, m, p, fn) {
		var fname = Date.now()
			, url = scope.href + o + '/' + m + '/' + fname
			, ps = ''
			;
			
		for (var i in p){
			if (ps) ps += '&';
			ps += i + '=' + p[i];
		};
		
		if (ps) url += '?' + ps;
		
		scope.include(url, 'js', fn);
	}
	
	//Ping
	function ping(fn) {
		request('ping', 'get', {}, fn);
	}
	
})(window, window.PANZERWEB, window.PANZERWEB.app);