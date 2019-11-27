<script type="text/javascript">
var  w=window,d=document;
(function(){
	'use strict';
    var Jap = function(){
        function Jap(a,b){
            let elms = (b||d)['querySelectorAll'](a);
            this.length = elms.length;
            for(let i=0,l=elms.length; i<l; i++) this[i]=elms[i];
        }
        Jap.prototype.init = function(a,b){
            return new Jap(a,b)
        };
        return Jap;
    }(),
    jap = Jap.prototype;
    jap.each=function(fn){
		for(let i=0,l=this.length;i<l;i++)fn(this[i], i);return this;
	}
	w.jap=jap.init;
})();
/********************************************************/
var $=(function(){
	'use strict';
	var Easy=function(selector){
		this.elms=document.querySelectorAll(selector);
	};
	Easy.prototype.each=function(callback){
		for(let i=0,l=this.elms.length;i<l;i++) callback(this.elms[i], i);
		return this;
	};
	return function(selector){return new Easy(selector)};
})();
/********************************************************/
;(function(){
    'use strict';
    var Js=function(s){
		this.elms=document.querySelectorAll(s);
	},
    js = Js.prototype;
	js.each=function(fn){
		for(let i=0,l=this.elms.length;i<l;i++)fn(this.elms[i], i);return this;
	}
	window._=function(s){return new Js(s)}
})();
/********************************************************/
jap('script').each(function(elm,i){
	alert(elm.innerHTML);
})
$('script').each(function(elm,i){
	alert(i);
})
_('script').each(function(elm,i){
	alert(elm);
})
</script>
