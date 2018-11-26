<script>
(function(){
	var japp = function(){
		function japp(a){
			return a;
		}
		japp.prototype.init = function(a) {
			return new japp(a);
		};
		return this;
	}();
	app = japp.prototype;
	app.fn1 = function(){
		return this;
	};
	window['$'] = app.init;
})();
document.querySelector('body').innerHTML = $('div');
</script>
