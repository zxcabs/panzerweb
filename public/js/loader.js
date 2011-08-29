;//loader.js
(function (window, scope) {
		var app = scope.app = {
				  DEBUG: true
				, PING_INTERVAL: 1000
			};
		
		function loadApi(fn) {
			scope.include(scope.href + 'js/api.js', 'js', fn);
		}
		
		function ping() {
			scope.app.api.ping(function (err, data) {
				scope.log(Date.now() + ' - ping: ' + data + 'ms');
				setTimeout(ping, app.PING_INTERVAL);
			});
		}
		
		loadApi(function(err, api){
			if(err) {
				scope.error(err);
			} else {
				scope.log('go go!');
				//ping();			
			};
		});
})(window, PANZERWEB);
