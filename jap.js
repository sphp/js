var isJap  = function(val){return val instanceof Jap},
    isSet  = function(val){return typeof val !== 'undefined'},
    isStr  = function(val){return typeof val === 'string' || val instanceof String},
    isArr  = function(val){return val && typeof val === 'object' && val.constructor === Array},
    isNum  = function(val){return typeof val === 'number' && isFinite(val)},
    isObj  = function(val){return val && typeof val === 'object' && val.constructor === Object},
    isBool = function(val){return typeof val === 'boolean'},
    isFunc = function(val){return typeof val === 'function'},
    isDom  = function(elm){return elm instanceof Element || elm instanceof HTMLDocument},
    inArr  = function(a,v){return isArr(a) && a.indexOf(v) > -1},
    $id    = function(a,b){ return (b||document)["getElementById"](a)},
    $tag   = function(a,b){ return (b||document)["getElementsByTagName"](a)},
    $nam   = function(a,b){ return (b||document)["getElementsByName"](a)},
    $cls   = function(a,b){ return (b||document)["getElementsByClassName"](a)},
    $qsa   = function(a,b){ return (b||document)["querySelectorAll"](a)},
    $qs    = function(a,b){ return (b||document)["querySelector"](a)},
    pdef   = function(e){ e.preventDefault ? e.preventDefault() : e.returnValue = false},
    etrg   = function(et){ return !et.target ? et.srcElement : et.target};
;(function(){
    var  w=window, d=w.document,ify=/^[\w-]*$/;
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
            return new Jap(a,b)
        };
        return Jap;
    }();
    japp = Jap.prototype;
    w.$ = japp.init;

    /**
     * Independent Loop function
     * 
     * @param arr array object
     * @param cb callback function
	 * 
     * @return void
     */
    w.$each=function(arr,cb){
        for (var i = 0, ln = arr.length; i < ln; i++) if (cb.call(arr[i], i, arr[i]) === false) break;
    };

    /**
     * Loop function
     * 
     * @param cb (function) call back function
     * @return void
     */
    japp.each = function(cb){ $each(this,cb); return this; };
	
    /**
     * Get inner text
     * 
     * @param el document element
     * @return inner text content
     */
    w.getText= function(el){
        var node, ret = "", i = 0, nt = el.nodeType;
        if (!nt) while ( (node = el[i++]) ) ret += getText(node);
        else if ( inArr([1,9,11],nt) ) {
            if ( isStr(el.textContent) ) return el.textContent;
            else for(el = el.firstChild; el; el = el.nextSibling ) ret += getText( el );
        }else if( inArr([3,4],nt) ) return el.nodeValue;
        return ret;
    },

    /**
     * Get or Set Text Content 
     * 
     * @param a (string) text/html
     * @return SET or GET Text Content 
     */
    japp.text = function(val) {
        return !isSet(val) ? getText(this) : this.each(function(i,el){
            if ([1,9,11].indexOf(el.nodeType) >-1 ) el.textContent = val;
        });
    };

    /**
     * Add Event Listener
     * 
     * @param ev (string) trigger name
     * @param cb (function) callback function
     * @return void
     */
    japp.on = function(ev,cb){
        this.each(function(i,el){
            el.addEventListener ? el.addEventListener(ev, cb, false) : el.attachEvent ? el.attachEvent("on"+ev, cb) : el["on"+ev]=cb;
        });
    };
    /**
     * Remove Event Listener
     * 
     * @param ev (string) trigger name
     * @param cb (function) callback function
     * @return void
     */
    japp.off = function(ev,cb){
        this.each(function(i,el){
            el.removeEventListener ? el.removeEventListener(ev, cb, false) : el.detachEvent ? el.detachEvent("on"+ev, cb) : el["on"+ev]=null;
        });
    };

    /**
     * Get or Set Attribute 
     * 
     * @param a (string) attribute
     * @param v (string) attribute's value
     * @return GET attribute's value
     */
    japp.attr = function(a,v){
        return v===void 0 ? this[0].getAttribute(a) : this.each(function(i, el){
            v ? el.setAttribute(a,v) : el.removeAttribute(a);
        });
    };

    /**
     * Remove Class name from element
     * 
     * @param c (string) selector name
     * @return void
     */
    japp.removeClass = function(c){
        this.each(function(i, elm){
            var cn = elm.className;
            elm.classList ? elm.classList.remove(c) : (cn.indexOf(c)>-1) ? elm.className = cn.replace(c,'').replace(/  +/g, ' ') : void 0;
        });
    };

    /**
     * Toggle Class name on element
     * 
     * @param c (string) selector name
     * @return void
     */
    japp.toggleClass = function(c){
        this.each(function(i, elm){
            var cn = elm.className;
            elm.classList ? elm.classList.toggle(c) : (cn.indexOf(c)>-1) ? elm.className = cn.replace(c,'').replace(/  +/g, ' ') : elm.className += " " + c;
        });
    };

    /**
     * Add class name on element
     * 
     * @param a (string) selector name
     * @return void
     */
    japp.addClass  = function(c){
        this.each(function(i, elm){
            var cn = elm.className;
            elm.classList ? elm.classList.add(c) : cn.indexOf(c)==-1 ? elm.className += " " + c : void 0;
        });
    };

    /**
     * Add CSS 
     * 
     * @param a (string) property:value
     * @return void
     */
    japp.css  = function(a){this.attr('style',a)};

    /**
     * Get or Set innerHTML 
     * 
     * @param a (string) text/html
     * @return SET or GET innerHTML
     */
    japp.html = function(a){ 
        return !isSet(a) ? this[0].innerHTML : this.each(function(i, elm){
             elm.innerHTML=a;
        });
    };
})();
