;(function(){
    var  w=window, d=w.document,ify=/^[\w-]*$/;
    w.$id =function(a,b){ return (b||d)["getElementById"](a);};
    w.$tag=function(a,b){ return (b||d)["getElementsByTagName"](a);};
    w.$cls=function(a,b){ return (b||d)["getElementsByClassName"](a);};
    w.$qsa=function(a,b){ return (b||d)["querySelectorAll"](a);};
    Jap = function(){
        function Jap(a,b){
            if (!isStr(a)) return a;
            var c1 = a.charAt(0), s = a.substr(1),
            elms = ify.test(a) ? ( ify.test(c1) ? $tag(a,b) : (c1=='#') ? $id(s,b) : (c1=='.') ? $cls(s,b) : void 0 ): $qsa(a,b);
            if (elms.nodeType || isDom(elms) || elms === window) elms = [elms];
            this.length = elms.length;
            for (var i=0, l = elms.length; i < l; i++) this[i] = elms[i];
        }
        Jap.prototype.init = function(a,b){
            return new Jap(a,b);
        };
        return Jap;
    }();
    japp = Jap.prototype;
    w.$ = japp.init;
    w.pdef =function(e){ e.preventDefault ? e.preventDefault():e.returnValue = false;};
    w.$each=function(arr,cb){
        for (var i = 0, ln = arr.length; i < ln; i++) if (cb.call(arr[i], i, arr[i]) === false) break;
    };
    japp.each = function(cb){$each(this,cb);return this;};
	japp.on = function(ev,cb){
        this.each(function(i,el){
            if (!el.addEventListener) el.attachEvent("on"+ev, cb);
            else el.addEventListener(ev, cb, false);
        });
    };
    japp.attr = function(a,v){
        return v===void 0 ? this[0].getAttribute(a) : this.each(function(i, el){
            v ? el.setAttribute(a,v) : el.removeAttribute(a);
        });
    };
    japp.remove = function(c){
        this.each(function(i, elm){
            var cn = elm.className;
            elm.classList ? elm.classList.remove(c) : (cn.indexOf(c)>-1) ? elm.className = cn.replace(c,'').replace(/  +/g, ' ') : void 0;
        });
    };
    japp.toggle = function(c){
        this.each(function(i, elm){
            var cn = elm.className;
            elm.classList ? elm.classList.toggle(c) : (cn.indexOf(c)>-1) ? elm.className = cn.replace(c,'').replace(/  +/g, ' ') : elm.className += " " + c;
        });
    };
    japp.add  = function(c){
        this.each(function(i, elm){
            var cn = elm.className;
            elm.classList ? elm.classList.add(c) : cn.indexOf(c)==-1 ? elm.className += " " + c : void 0;
        });
    };
    japp.html  = function(a){
        return !isDom(this) ? void 0 : a ? this.innerHTML : this.innerHTML=a;
    };
    function isJap(e){return e instanceof Jap}
    function isStr(e){return typeof e === 'string'}
    function isFunc(e){return typeof e === 'function'}
    function isDom(e){return e instanceof Element || e instanceof HTMLDocument;}
})();
