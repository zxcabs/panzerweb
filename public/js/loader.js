;//loader.js
(function (window, scope) {
		var app = scope.app = {
				  DEBUG: true
				, PING_INTERVAL: 1000
			}
			, lib = scope.lib = {}
			, canvas
			, point = {x:0, y: 0}
			;
		
		function load(fn) {
			scope.include(scope.href + 'js/api.js', 'js', function() {
				scope.include(scope.href + 'js/canvas.js', 'js', fn);
			});
		}
		
		function ping() {
			scope.app.api.ping(function (err, data) {
				scope.log(Date.now() + ' - ping: ' + data + 'ms');
				setTimeout(ping, app.PING_INTERVAL);
			});
		}
		
		load(function(err){
			if(err) {
				scope.error(err);
			} else {
				scope.log('go go!');
				run();			
			};
		});
		
		function run() {
			canvas = new lib.Canvas(document.body);
			getPoint();
			t();
		}
		
		//every 200ms
		function getPoint() {
			
			app.api.point(function(err, p, ping) {
				point = p;
				setTimeout(getPoint, 100);
			});
		}
		//every 1/30s
		function t() {
			canvas.clear();
			
			canvas.ctx.beginPath();
			canvas.ctx.arc(point.x, point.y, 25, 25, Math.PI * 2, true);
			canvas.ctx.closePath();
			canvas.ctx.fill();
			
			setTimeout(t, parseInt(1000/30));
		}
})(window, PANZERWEB);
