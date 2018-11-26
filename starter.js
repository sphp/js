var  w=window, d=w.document,
byid  = function(a,b){return (b||d)["getElementById"](a)},
bytag = function(a,b){return (b||d)["getElementsByTagName"](a)},
bycls = function(a,b){return (b||d)["getElementsByClassName"](a)},
$     = function(a,b){
            if(a.indexOf(" ")>-1)return d.querySelectorAll(a);
            a=a.match(/^(\W)?(.*)/);return (b||d)["getElement"+(a[1]?a[1]=="#"?"ById":"sByClassName":"sByTagName")](a[2]);
        },
_     = function(a){
            return {
                each:   function(cb){
                            if(typeof cb!=='function')throw new Error('!function');
                            for(var i=0,ln=a.length; i<ln; i++) cb(a[i]); return a;
                        },
                on:     function(b,cb){a.addEventListener(b,cb)},
                attr:   function(b,c){return c?a.setAttribute(b, c):a.getAttribute(b)}
            }
        };
