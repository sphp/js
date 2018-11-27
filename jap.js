(function(){
	var  w=window,d=document,
	Jap = function(){
		function Jap(a,b){
			var elms = (b||d)["querySelectorAll"](a);
			this.length = elms.length;
			for (let i=0, l = elms.length; i < l; i++) this[i] = elms[i];
		}
		Jap.prototype.init = function(a,b){
			return new Jap(a,b);
		};
		return Jap;
	}();
	w.$id=function(a,b){return (b||d)["getElementById"](a)};
	w.each = function(arr,cb){
		for (let i = 0, ln = arr.length; i < ln; i++) if (cb.call(arr[i], i, arr[i]) === false) break;
	};
	plug = Jap.prototype;
	plug.each = function(cb){each(this,cb);return this;};
	plug.attr = function(a,v){
		return v===void 0 ? this[0].getAttribute(a) : this.each(function(i, el){
			v ? el.setAttribute(a,v) : el.removeAttribute(a);
		});
		return this;
	};
	plug.on = function(e,cb){
		this.each(function(i,el){
			return el.addEventListener(e,cb);
		});
	};
	w.$ = plug.init;
})();
