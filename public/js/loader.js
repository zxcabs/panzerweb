;//loader.js
(function (window, scope) {
		scope.app = {};
		scope.app.DEBUG = true;
		
		function loadApi(fn) {
			scope.include(scope.href + 'js/api.js', 'js', fn);
		}
		
		loadApi(function(err){
			if(err) {
				scope.error(err);
			} else {
				scope.log('go go!');
			};
		});
})(window, PANZERWEB);