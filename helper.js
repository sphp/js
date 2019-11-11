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
function select(a,b){if(ishtml(a))a=toelm(a); return iselm(a)?a:(b||d)['querySelector'](a)}
function nocash(url){return url+(url.indexOf('?')>0?'&v=':'?v=')+new Date().getTime()}
function loop(a,fn){a=isstr(a)?selall(a):(nlist(a)?a:[a]);for(let i=0;i<a.length;i++)fn(a[i],i)}
function each(a,fn,v){a=isstr(a)?selall(a):(nlist(a)?a:[a]);for(let i=0;i<a.length;i++)a[i][fn]=v}
function insert(a,b,p){/*beforebegin,afterbegin,beforeend,afterend*/loop(b, function(e){(e)['insertAdjacentHTML'](p||'beforeend',a)})}
function append(a,b){(iselm(b)?b:select(b))['appendChild'](iselm(a)?a: select(a))}
function elm(t,at,ht){
	var e=d.createElement(t);
	if(isobj(at))for(let k in at)e.setAttribute(k,at[k]);
	e.innerHTML=ht||at; return e;
}
function html2elm(a){return elm('div',a).firstChild}
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
function pagination(totalPage, thisPage){
	var _url = url.replace(/&page=\d+/g,''),first,last;
	if(_url.substr(_url.length-1)=='&') _url = _url.slice(0, -1);
	thisPage = Number(thisPage);
	html = '';
	for (var i = 1; i <= totalPage; i++){
		let start = thisPage-3, end = thisPage+3;
		if(thisPage < 4 ) end += 4 - thisPage;
		if(thisPage > totalPage-4 ) start = start-(3-(totalPage-thisPage));
		if( i >= start && i <= end){
			first = (thisPage>4 && totalPage>7) ? '<a href="'+_url+'&page='+1+'">first</a>' : '';
			html += '<a href="'+_url+'&page='+i+'"'+ (i==thisPage? ' class="active"' : '') +'>'+i+'</a>';
			last = (i==totalPage) ? '' : '<a href="'+_url+'&page='+totalPage+'">last</a>';
		}
	}
	return '<div class="row paging">'+first+html+last+'</div>';
}
function downloadFile(url) {
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.responseType = "blob";
	req.onload = function (event) {
		var blob = req.response;
		var fileName = req.getResponseHeader("fileName") //if you have the fileName header available
		var link=document.createElement('a');
		link.href=window.URL.createObjectURL(blob);
		link.download=fileName;
		link.click();
	};
	req.send();
}
function paging(listlen, page, maxl, sbtn){
	page= page!==void 0?Number(page):(isset(prm.page)?Number(prm.page):1);
	maxl= maxl!==void 0?Number(maxl):(isset(prm.limit)?Number(prm.limit):30);
	sbtn= sbtn!==void 0?Number(sbtn):4;
	
	var btns='', _url = url.replace(/&page=\d+/g,''), first, last, start, end, totpag, totbtn, offset, i;
	if(_url.substr(_url.length-1)=='&') _url = _url.slice(0, -1);

   if(listlen>maxl){
      offset = (page*maxl)-maxl; 
      totbtn = (sbtn*2)+1; 
      totpag = Math.ceil(listlen/maxl);
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
      if(totpag>=page) list = list.slice(offset, page<totpag ? offset+maxl : list.length);
      if(totpag>page) list = list.slice(offset, offset+maxl);else if(totpag==page) list = list.slice(offset, list.length);else list = [];
      */
      if(totpag>page) list = offset+' to '+(offset+maxl);
      else if(totpag==page) list = offset+' '+listlen;
      else list = 'nill';
      return list+'<div class="row paging">'+first+btns+last+'</div>';
   }
}
var
clist={ad :'Andorra',ae :'United Arab Emirates',af :'Afghanistan',al :'Albania',am :'Armenia',ao :'Angola',ar :'Argentina',at :'Austria',au :'Australia',aw :'Aruba',az :'Azerbaijan',ba :'Bosnia And Herzegovina',bb :'Barbados',bd :'Bangladesh',be :'Belgium',bf :'Burkina Faso',bg :'Bulgaria',bh :'Bahrain',bn :'Brunei Darussalam',bo :'Bolivia',br :'Brazil',bs :'Bahamas',by :'Belarus',ca :'Canada',cd :'Congo, Republic',cg :'Congo',ch :'Switzerland',ci :'Cote D\'ivoire',cl :'Chile',cm :'Cameroon',cn :'China',co :'Colombia',cr :'Costa Rica',cu :'Cuba',cv :'Cabo Verde',cw :'Curacao',cy :'Cyprus',cz :'Czech Republic',de :'Germany',dk :'Denmark',do :'Dominican Republic',dz :'Algeria',ec :'Ecuador',ee :'Estonia',eg :'Egypt',eh :'Western Sahara',es :'Spain',et :'Ethiopia',fi :'Finland',fj :'Fiji',fo :'Faroe Islands',fr :'France',gd :'Grenada',ge :'Georgia',gh :'Ghana',gi :'Gibraltar',gm :'Gambia',gn :'Guinea',gp :'Guadeloupe',gq :'Equatorial Guinea',gr :'Greece',gt :'Guatemala',gu :'Guam',gy :'Guyana',hk :'Hong Kong',hn :'Honduras',hr :'Croatia',ht :'Haiti',hu :'Hungary',id :'Indonesia',ie :'Ireland',il :'Israel',in :'India',int :'International',iq :'Iraq',ir :'Iran',is :'Iceland',it :'Italy',jm :'Jamaica',jo :'Hashemite Kingdom Of Jordan',jp :'Japan',ke :'Kenya',kg :'Kyrgyzstan',kh :'Cambodia',kn :'Saint Kitts And Nevis',kp :'Korea, Republic',kr :'Korea (south)',kw :'Kuwait',kz :'Kazakhstan',la :'Lao People\'s',lb :'Lebanon',li :'Liechtenstein',lk :'Sri Lanka',lt :'Lithuania',lu :'Luxembourg',lv :'Latvia',ly :'Libya',ma :'Morocco',mc :'Monaco',md :'Moldova',me :'Montenegro',mg :'Madagascar',mk :'Macedonia',mm :'Myanmar',mn :'Mongolia',mo :'Macao',mt :'Malta',mv :'Maldives',mx :'Mexico',my :'Malaysia',mz :'Mozambique',ne :'Niger',ng :'Nigeria',ni :'Nicaragua',nl :'Netherlands',no :'Norway',np :'Nepal',nz :'New Zealand',om :'Oman',pa :'Panama',pe :'Peru',ph :'Philippines',pk :'Pakistan',pl :'Poland',pr :'Puerto Rico',ps :'Palestine',pt :'Portugal',py :'Paraguay',qa :'Qatar',ro :'Romania',rs :'Serbia',ru :'Russia',rw :'Rwanda',sa :'Saudi Arabia',sd :'Sudan',se :'Sweden',sg :'Singapore',si :'Slovenia',sk :'Slovakia',sl :'Sierra Leone',sm :'San Marino',sn :'Senegal',so :'Somalia',sr :'Suriname',sv :'El Salvador',sx :'Sint Maarten',sy :'Syrian Arab Republic',tg :'Togo',th :'Thailand',tj :'Tajikistan',tm :'Turkmenistan',tn :'Tunisia',tr :'Turkey',tt :'Trinidad And Tobago',tw :'Taiwan',tz :'Tanzania',ua :'Ukraine',ug :'Uganda',uk :'United Kingdom',us :'United States',uy :'Uruguay',uz :'Uzbekistan',ve :'Venezuela',vi :'Virgin Islands',vn :'Viet Nam',xk :'xk',ye :'Yemen',za :'South Africa',zw :'Zimbabwe',unsorted :'Unsorted'},
group=['auto','business','classic','comedy','documentary','education','entertainment','family','fashion','food','general','health','history','hobby','kids','legislative','lifestyle','local','movies','music','news','quiz','religious','sci-fi','shop','sport','travel','weather','other'];
loop('script[src]',function(e){e.src =nocash(e.src )});/*Force load External JS*/
