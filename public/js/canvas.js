;//canvas.js
(function (window, scope) {
		var   app = scope.app
			, lib = scope.lib
			;
		var Canvas = lib.Canvas = function (el) {
			this.el = document.createElement('canvas');
			this.ctx = this.el.getContext('2d');
			
			this.el.width = 800;
			this.el.height = 600;
			
			this.el.setAttribute('style', 'border: solid 2px black;position:absolute;top:0px;left:0px;background:white;z-index:4000;');
						
			el.appendChild(this.el);
		}
		
		Canvas.prototype.clear = function () {
			this.ctx.clearRect (0, 0, 800, 600);
		}

})(window, PANZERWEB);
