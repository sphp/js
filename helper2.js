var prm={},w=window,d=document,wiw=w.innerWidth,wih=w.innerHeight,
url=w.location.href,
baseURL=w.location.protocol+'//'+w.location.host+w.location.pathname;
w.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,k,v){prm[k]=v});

function byid(a,b){return (b||d)['getElementById'](a)};
function isset(a){return typeof a !== 'undefined'}
function isobj(a){return a && typeof a==='object' && a.constructor===Object}
function iselm(a){return a instanceof Element||a instanceof HTMLDocument}
function ishtml(a){return /<[a-z/][\s\S]*>/i.test(a)}
function elm(t,at,ht){let e=d.createElement(t);if(isobj(at))for(let k in at)e.setAttribute(k,at[k]);e.innerHTML=ht||at;return e;}
function toelm(a){return elm('div',a).firstChild}
function select(a,b){if(ishtml(a))a=toelm(a);return iselm(a)?a:(b||d)['querySelector'](a)}
function selall(a,b){return (b||d)['querySelectorAll'](a)}
function ajax(url, fn, data=null, method){
    var xhr = new XMLHttpRequest();
    xh.open((m||(d?'POST':'GET')),url,true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onreadystatechange = function(){if(this.readyState == 4 && this.status == 200)fn(this.responseText)};
    xhr.send(data);
}
function each(a,fn){a=isstr(a)?selall(a):(iselm(a)?[a]:a);for(let i in a)fn(a[i],i)}
function loop(a,fn,v){a=isstr(a)?selall(a):(iselm(a)?[a]:a);for(let i in a)a[i][fn]=v}

function url2obj(url){
    let prms={},pobj = (url||w.location.search).substr(1).split('&');
    for(let i in pobj){let p=pobj[i].split('=');prms[p[0]]=p[1]}
    return prms;
}
function obj2url(obj){
    let parr,qstr;
    for(let i in obj.prm) parr[i] = i+'='+obj.prm[i];
    qstr=parr.join('&');
    return qstr;
}
function parseURL(url){
    var sp,prms={},a=elm('a',{href:url}), query=a.search.replace(/^\?/,'').split('&');
    for(let i=0;i<query.length;i++){sp=query[i].split('=');prms[sp[0]]=sp[1];}
    return {protocol:a.protocol,host:a.host,hostname:a.hostname,port:a.port,path:a.pathname,search:a.search,pram:prms,hash:a.hash};
}
function elm(t,at,ht){
	let e=d.createElement(t);
	if(isobj(at))for(let k in at)e.setAttribute(k,at[k]);
	e.innerHTML=ht||at;
	return e;
}
