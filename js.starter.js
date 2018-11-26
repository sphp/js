(function(){
	"use strict";
	var  w=window, d=w.document;
	w.byid  = function(a,b){return (b||d)["getElementById"](a)};
	w.bytag = function(a,b){return (b||d)["getElementsByTagName"](a)};
	w.bycls = function(a,b){return (b||d)["getElementsByClassName"](a)};
	var jap = function(){
		function jap(a, b){
			if (!a) return;
			if (a instanceof jap) return a;
			var elm = a;
			if (typeof a === 'string'){
				if(a.indexOf(" ")>-1) elm = d.querySelectorAll(a);
				else{
					a =a.match(/^(\W)?(.*)/);
					elm = (b||d)["getElement"+(a[1]?a[1]=="#"?"ById":"sByClassName":"sByTagName")](a[2]);
				}
			}else if (typeof a === 'function'){
				return this.ready(a);
			}
			if (elm.nodeType || elm === w) elm = [elm];
			this.length = elm.length;
			for (var i = 0, l = this.length; i < l; i++) this[i] = elm[i];
		}
		jap.prototype.init = function(a, b){
			return new jap(a, b);
		};
		return jap;
	}();
	jap.prototype.each = function(cb){
		for (var i = 0, ln = this.length; i < ln; i++){
			if (cb.call(this[i], i, this[i]) === false) break;
		}
		return this;
	};
	window['$'] = jap.prototype.init;
})();
