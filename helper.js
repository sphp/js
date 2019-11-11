var uri=window.location.href,pos=uri.search(/%3D|%3D%3D|&m=1|\?m=1/);
if(pos>0)window.history.replaceState({},document.title,uri.substring(0,pos));
function elm(tag,attr,html,nl='\n'){
	var e=document.createElement(tag);
	if(isobj(attr))for(const[k, v] of Object.entries(attr))e.setAttribute(k,v);
	else if(isstr(attr)&&html===void 0)e.innerHTML=attr;
	if(html!==void 0)e.innerHTML=isarr(html)?html.join(nl):html;
	return e;
}
var w = window, d=document, wW=w.innerWidth, wH=w.innerHeight,
url = w.location.href,
baseUrl = w.location.protocol+'//'+w.location.host+w.location.pathname,
selid = function(a,b){return (b||d)['getElementselid'](a)},
inarr = function(a,v){return a.indexOf(v)>=0},
isarr = function(a){return Array.isArray(a)},
isset = function(a){return typeof a !== 'undefined'},
iselm = function(a){return a instanceof Element||a instanceof HTMLDocument},
isstr = function(a){return typeof a==='string'||a instanceof String},
isobj = function(a){return a && typeof a==='object' && a.constructor===Object},
ishtml= function(a){return /<[a-z/][\s\S]*>/i.test(a)}
objstr= function(obj){return JSON.stringify(obj)},
toelm = function(a){return elm('div',a).firstChild},
parse = function(a,t){return new DOMParser().parseFromString( a , t===void 0 ? 'text/html': t)},
select= function(a,b){if(ishtml(a))a=toelm(a);return iselm(a)?a:(b||d)['querySelector'](a)},
selall= function(a,b){return (b||d)['querySelectorAll'](a)},
nlist = function(n){return NodeList.prototype.isPrototypeOf(n)},
encode= function(a){return encodeURIComponent(a)},
decode= function(a){return decodeURIComponent(a)},
nocash= function(url){return url+(url.indexOf('?')>0?'&v=':'?v=')+new Date().getTime()},
_loop = function(a,fn){a=isstr(a)?selall(a):(nlist(a)?a:[a]);for(let i=0;i<a.length;i++)fn(a[i],i)},
_each = function(a,fn,v){a=isstr(a)?selall(a):(nlist(a)?a:[a]);for(let i=0;i<a.length;i++)a[i][fn]=v},
_insert=function(a,b,p='beforeend'){_loop(b, function(e){(e)['insertAdjacentHTML'](p,a)})}, /*beforebegin,afterbegin,beforeend,afterend*/
_append=function(a,b){(iselm(b)?b:select(b))['appendChild'](iselm(a)?a: select(a))},
_ajax  = function(url,fn,data=null,method){
		if(method==void 0) method=data==null?'GET':'POST';
		var xh=new XMLHttpRequest();
		xh.open(method,url,true);
		xh.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
		xh.onreadystatechange=function(){if(this.readyState==4&&this.status==200)fn(this.responseText)};
		xh.send(data);
	};
function filter(val, elms, start=true){
	_loop(elms, function(elm){
		let txtval = elm.textContent || elm.innerText;
		if(txtval){
			if(start) elm.style.display = txtval.toLowerCase().startsWith(val.toLowerCase()) ? '' : 'none';
			else elm.style.display = txtval.toLowerCase().indexOf(val.toLowerCase())>-1 ? '' : 'none';
		}
	})
}
function toggle(el,nc){
	_loop(el,function(e){
		if(e.classList) e.classList.toggle(nc);
		else{
			let cls=e.className.split(' '),
			i=cls.indexOf(nc);
			e.className = i>=0 ? cls.splice(i, 1): cls.push(nc).join(" ");
		}
	})
}