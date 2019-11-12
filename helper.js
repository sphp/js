/*Remove m=1 from mobile device url*/
var uri=window.location.href,pos=uri.search(/%3D|%3D%3D|&m=1|\?m=1/);
if(pos>0)window.history.replaceState({},document.title,uri.substring(0,pos));

var prm={},w=window,d=document,wiw=w.innerWidth,wih=w.innerHeight,
url=w.location.href,
baseURL=w.location.protocol+'//'+w.location.host+w.location.pathname;
w.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,k,v){prm[k]=v});
function isarr(a){return Array.isArray(a)}
function isset(a){return typeof a !== 'undefined'}
function iselm(a){return a instanceof Element||a instanceof HTMLDocument}
function isstr(a){return typeof a==='string'||a instanceof String}
function isobj(a){return a && typeof a==='object' && a.constructor===Object}
function ishtml(a){return /<[a-z/][\s\S]*>/i.test(a)}
function encode(a){return encodeURIComponent(a)}
function decode(a){return decodeURIComponent(a)}
function obj2str(o){return JSON.stringify(o)}
function inarr(a,v){return a.indexOf(v)>=0}
function parse(a,t){return new DOMParser().parseFromString(a,t===void 0?'text/html':t)}
function selid(a,b){return (b||d)['getElementselid'](a)}
function nlist(n){return NodeList.prototype.isPrototypeOf(n)}
function selall(a,b){return (b||d)['querySelectorAll'](a)}
/**
 * t		string		any html tag name
 * at		object 		html tag attributes
 * ht		string		html string
 * @return	object 		html dom element
 */
function elm(t,at,ht){
	var e=d.createElement(t);
	if(isobj(at))for(let k in at)e.setAttribute(k,at[k]);
	e.innerHTML=ht||at; return e;
}
function html2elm(a){return elm('div',a).firstChild}
function select(a,b){if(ishtml(a))a=html2elm(a); return iselm(a)?a:(b||d)['querySelector'](a)}
function nocash(url){return url+(url.indexOf('?')>0?'&v=':'?v=')+new Date().getTime()}
function loop(a,fn){a=isstr(a)?selall(a):(nlist(a)?a:[a]);for(let i=0;i<a.length;i++)fn(a[i],i)}
function each(a,fn,v){a=isstr(a)?selall(a):(nlist(a)?a:[a]);for(let i=0;i<a.length;i++)a[i][fn]=v}
function insert(a,b,p){/*beforebegin,afterbegin,beforeend,afterend*/loop(b, function(e){(e)['insertAdjacentHTML'](p||'beforeend',a)})}
function append(a,b){(iselm(b)?b:select(b))['appendChild'](iselm(a)?a: select(a))}

/**
 * url		string		target url
 * fn		function 	callback function
 * d		string		Send data string
 * m		string		Http Request Method Name
 * @return	string 		mixed data as string
 */
function ajax(url,fn,d,m){
	var xh=new XMLHttpRequest();
	xh.open((m||(d?'POST':'GET')),url,true);
	xh.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
	xh.onreadystatechange=function(){if(this.readyState==4&&this.status==200)fn(this.responseText)};
	xh.send(data);
}
function parseURL(url) {
	var sp,prms={},a=elm('a',{href:url}),query=a.search.replace(/^\?/,'').split('&');
	for(let i=0;i<query.length;i++){
		sp=query[i].split('=');prms[sp[0]]=sp[1];
	}
	return {protocol:a.protocol,host:a.host,hostname:a.hostname,port:a.port,path:a.pathname,search:a.search,pram:prms,hash:a.hash};
}
function eWidth(elm){
	var css=elm.currentStyle||w.getComputedStyle(elm);
	return parseFloat(css.width)+parseFloat(css.marginLeft)+parseFloat(css.marginRight);
}
function filter(val, elms, start){
	_loop(elms, function(elm){
		let txtval = elm.textContent || elm.innerText;
		if(txtval){
			if(start||true) elm.style.display=txtval.toLowerCase().startsWith(val.toLowerCase())?'':'none';
			else elm.style.display=txtval.toLowerCase().indexOf(val.toLowerCase())>-1?'':'none';
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
/*Responsive position for chield elements inside parent element*/
function Responsive(p, c){
	p=select(p);c=selall(c);
	var pw= p.offsetWidth, cw=eWidth(c[0]), rows=pw>640?5:10, rcnum = Math.floor(pw/cw), rempx = Math.floor(pw-rcnum*cw);
	if(c.length==1){
		let boxes = rows*rcnum, boxdata='';
		for(let i=0; i<boxes; i++) boxdata+='<div class="box pseudo"></div>';
		p.innerHTML = boxdata;
	}
	p.style.padding = '0 '+rempx/2+'px';
}
function storage(name, value){
	if(name=='clear')localStorage.clear();
	else if(value === void 0)return localStorage.getItem(name);
	else if(value=='remove')localStorage.removeItem(name);
	else localStorage.setItem(name, value);
}
/**
 * listlen	string		any html tag name
 * page		Integer		current page number 
 * limit	Integer		limit for each page
 * sbtn		string		html string
 * @return	object 		html dom element
 */
function paging(listlen, page, limit, sbtn){
	page = page!==void 0?Number(page):(isset(prm.page)?Number(prm.page):1);
	limit= limit!==void 0?Number(limit):(isset(prm.limit)?Number(prm.limit):30);
	sbtn = sbtn!==void 0?Number(sbtn):3;
	
	var btns='', _url = url.replace(/&page=\d+/g,''), first, last, start, end, totpag, totbtn, offset, i;
	if(_url.substr(_url.length-1)=='&') _url = _url.slice(0, -1);

   if(listlen>limit){
      offset = (page*limit)-limit; 
      totbtn = (sbtn*2)+1; 
      totpag = Math.ceil(listlen/limit);
      for(i=1;i<=totpag;i++){
         start = page>=totpag-sbtn ? totpag-totbtn : page-sbtn;
         end   = page<=sbtn?totbtn:page+sbtn;
         if( i >= start && i <= end){
            first = (page>=sbtn && totpag>totbtn) ? '<a href="'+_url+'&page='+1+'">first</a>':'';
            btns += '<a href="'+_url+'&page='+i+'"'+ (i==page? ' class="active"' : '') +'>'+i+'</a>';
            last = (page<totpag-sbtn)?'<a href="'+_url+'&page='+totpag+'">last</a>':'';
         }
      }
      /*
      if(totpag>=page) list = list.slice(offset, page<totpag ? offset+limit : list.length);
      */
      if(totpag>page) list = offset+' to '+(offset+limit);
      else if(totpag==page) list = offset+' '+listlen;
      else list = 'nill';
      return list+'<div class="row paging">'+first+btns+last+'</div>';
   }
}
//Example: loop('script[src]',function(e){e.src = nocash(e.src )}); /*nocash for External JS*/
//Example: loop('link[href]',function(e){e.href = nocash(e.href )}); /*nocash for External CSS*/
//Example:  

