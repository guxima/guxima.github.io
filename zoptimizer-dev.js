(function(){var e={ns:function(a,b){var c=window;this.each(this.trim(a).split(b||"."),function(b,a){c[b]=c[b]||{};c=c[b]});c=null},getNSObj:function(a){var b={};try{b=(new Function("return "+a))()}catch(c){}return b},trim:function(a,b){b=RegExp("^"+(b||"\\s")+"+|"+(b||"\\s")+"+$","g");return a.replace(b,"")},trimLeft:function(a,b){b=RegExp("^"+(b||"\\s")+"+","g");return a.replace(b,"")},trimRight:function(a,b){b=RegExp((b||"\\s")+"+$","g");return a.replace(b,"")},removeArrayItem:function(a,b){this.each(a,
function(c,d){return c===b?""+a.splice(d,1):0})},each:function(a,b){for(var c=0,d=a.length;c<d&&!b(a[c],c++););},foreach:function(a,b){for(var c in a)if(a.hasOwnProperty(c)&&b(c,a[c]))break},extend:function(a,b,c){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c&&this.isFunction(b)&&(a.prototype=b.prototype)},copy:function(a){var b={},c;for(c in a)("hasOwnProperty"in a&&a.hasOwnProperty(c)||0<e.isIE&&9>e.isIE)&&(b[c]=a[c]);return b},list2Array:function(a){var b;try{b=[].slice.call(a,0)}catch(c){for(var d=
0,f=a.length;d<f;d++)b.push(a[f])}return b},isUndefined:function(a){return"undefined"===typeof a},isNull:function(a){return null===a},isIE:function(){var a=navigator.userAgent.match(/MSIE\s*(.*?);/i);return a?Math.round(a[1]):0}(),injectCSS2Page:function(a){var b;if(document.createStyleSheet){b=document.createStyleSheet();var c=this;this.each(a,function(a){a=c.trim(a).match(/(.+?)\{([^\}]*)\}/);3===a.length&&b.addRule(a[1],a[2])})}else if(b=document.createElement("style"))b.type="text/css",b.innerHTML=
a.join(""),document.head.appendChild(b);else throw"injectCSS2Page failed";},$:function(a){return document.getElementById(a)||a},formatDecimal:function(a,b){a=String(a);var c=a.indexOf(".");return-1!==c?a.substr(0,c+b+1):a},DomEvent:function(){var a=[];return window.addEventListener?{on:function(b,a,d){b.addEventListener(a,d,!1)},un:function(a,c,d){a.removeEventListener(c,d)}}:{on:function(b,c,d){b.attachEvent("on"+c,a[a.push({dom:b,type:c,callback:d,handle:function(){return d.apply(b,arguments)}})-
1].handle)},un:function(b,c,d){var f;e.each(a,function(a,e){if(a.dom===b&&a.type===c&&a.callback===d)return b.detachEvent("on"+c,a.handle),f=e,!0});!e.isUndefined(f)&&a.splice(f,1)}}}(),sumArray:function(a){var b=0;this.each(a,function(a){b+=a});return b},getMaxFromArray:function(a){return(new Function("return Math.max("+(a.join()||0)+")"))()},addClass:function(a,b){RegExp("\\b"+b+"\\b").test(a.className)||(a.className=""===a.className?b:a.className+" "+b)}};e.each(["Object","Array","Boolean","Number",
"Function"],function(a){e["is"+a]=function(b){return Object.prototype.toString.call(b)==="[object "+a+"]"}});e.extend(e,{domReady:function(){function a(){for(var a=0,c;c=b[a++];)c.apply(this,arguments)}var b=[],c,d=0;if(window.addEventListener)e.DomEvent.on(document,"DOMContentLoaded",function(){d=1;e.DomEvent.un(document,"DOMContentLoaded",arguments.callee);a.apply(this,arguments)});else c=setInterval(function(){try{document.documentElement.doScroll("left"),d=1,a.apply(this,arguments),window.clearInterval(c)}catch(b){}});
return function(a){return d||"loaded"===document.readyState||"complete"===document.readyState?a.call(document):b.push(a)}}()});var r={create:function(a){var b={};e.foreach(a,function(c,d){a.hasOwnProperty(c)&&(b[c]=d)});b.addListener=this.addListener;b.removeListener=this.removeListener;b.fireEvent=this.fireEvent;b.getListener=this.getListener;return b},addListener:function(a,b){a=e.trim(a).split(" ");for(var c=0,d;d=a[c++];)this.getListener(d).push(b)},removeListener:function(a,b){a=e.trim(a).split(" ");
for(var c=0,d;d=a[c++];)(d=this.getListener(d))&&e.removeArrayItem(d,b)},fireEvent:function(a){a=e.trim(a).split(" ");for(var b=0,c;c=a[b++];){var d=this.getListener(c),f,k;if(d)for(k=d.length;k--;)d[k]&&(f=d[k].apply(this,arguments));(f=this["on"+c.toLowerCase()])&&(f=f.apply(this,arguments))}return f},getListener:function(a){var b=this.allListeners;a=a.toLowerCase();return b?b[a]||(this.allListeners[a]=[]):(this.allListeners={},this.allListeners[a]=[])}},g=function(){function a(a,d){for(var f=b.length;f--;)if(b[f][a]===
d)return b[f]}var b=[];return r.create({version:"1.1.1",check:function(c){var d,f,k;f="string"===typeof c?e.getNSObj(e.trimRight(e.trimLeft(c,"window\\."),"\\.")):c;for(b.push({object:f,name:c,supCopy:null});f;){c=(c=a("supCopy",f))?c.realSup:f;d=k=e.copy(f);for(var h in d)if("hasOwnProperty"in d&&d.hasOwnProperty(h)||0<e.isIE&&9>e.isIE)if(f=d[h],delete d[h],!a("object",f)){if(e.isObject(f))b.push({object:f,supCopy:d,realSup:c,name:h});else if("function"===typeof f){for(var n=[],g=a("object",c);g;)g.name&&
n.unshift(g.name),g=a("object",a("supCopy",g.supCopy).realSup);b.push({object:f,supCopy:d,realSup:c,name:h,path:n.join(".")+"."+h});this.fireEvent("function-found",b[b.length-1].path);d=e.getNSObj(n.join("."));d[h]=this.wrapCount(f);e.extend(d[h],f,1)}else continue;d=f;break}f=k===d?a("object",c).supCopy:d}},wrapCount:function(b){var d=this;return function(){var f=a("object",b).path;d.fireEvent("before-function-exec",f,arguments,b);var e,h=+new Date;if(this.constructor===arguments.callee){e=0;for(var g=
[];e<arguments.length;e++)g.push("string"===typeof arguments[e]?'"'+arguments[e]+'"':arguments[e]);e=(new Function("return new fn("+g.join(",")+")"))()}else e=b.apply(this,arguments);d.fireEvent("after-function-exec",f,arguments,b,+new Date-h);return e}},getShell:function(){return b}})}(),m=function(){var a={};return{setInfoByPath:function(b){a[b]={runtime:[],arglist:[],caller:[]}},getInfoByPath:function(b){return b?a[b]:a},applyFormat:function(b,c){e.foreach(a,function(a,e){b[c](a,e)})},getFuncInfosLength:function(){var b=
0;e.foreach(a,function(){b++});return b}}}();g.addListener("function-found",function(a,b){m.setInfoByPath(b)});g.addListener("after-function-exec",function(a,b,c,d,f){a=m.getInfoByPath(b);a.runtime.push(f);a.arglist.push(e.list2Array(c).join(","));a.caller.push(c.callee.caller)});var p={displayMaxLine:10};g.addListener("preference-changed",function(a,b,c){e.isUndefined(p[b])||(p[b]=c)});var l=function(){var a={},b=0;return{create:function(c){var d={label:"format-filter"+b++,filter:this.filter};a[d.label]=
d;c&&e.extend(d,c);return d},filter:function(){},getFilteredData:function(a){a=this.getFormatByName(a);m.applyFormat(a,"filter");return a.getData()},getFormatByName:function(b){return a[b]||a}}}();l.create({label:"\u8c03\u7528\u6b21\u6570\u6700\u591a\u7684\u51fd\u6570\u5217\u8868",filteredData:[],filter:function(a,b){this.filteredData.push([a,b.runtime.length])},getData:function(){var a={header:[["\u51fd\u6570\u540d\u79f0",75],["\u8c03\u7528\u6b21\u6570",25]],data:this.filteredData.sort(function(a,
c){return c[1]-a[1]})};this.filteredData=[];return a}});l.create({label:"\u5e73\u5747\u8017\u65f6\u6700\u591a\u7684\u51fd\u6570\u5217\u8868",filteredData:[],filter:function(a,b){var c=b.runtime,d=e.sumArray(c);this.filteredData.push([a,0<d?e.formatDecimal(d/c.length,2):0])},getData:function(){var a={header:[["\u51fd\u6570\u540d\u79f0",75],["\u5e73\u5747\u8017\u65f6(ms)",25]],data:this.filteredData.sort(function(a,c){return c[1]-a[1]})};this.filteredData=[];return a}});l.create({label:"\u5355\u6b21\u8c03\u7528\u8017\u65f6\u6700\u957f\u7684\u51fd\u6570\u5217\u8868",
filteredData:[],filter:function(a,b){this.filteredData.push([a,e.getMaxFromArray(b.runtime)])},getData:function(){var a={header:[["\u51fd\u6570\u540d\u79f0",75],["\u8017\u65f6(ms)",25]],data:this.filteredData.sort(function(a,c){return c[1]-a[1]})};this.filteredData=[];return a}});var s={formatHTML:function(a){var b=[],c;0<(c=a.data).length&&(b.push("<table>"),0<(a=a.header).length&&(b.push("<tr>"),e.each(a,function(a){b.push("<th"+(a[1]?" width="+a[1]+"%":"")+">"+a[0]+"</th>")}),b.push("</tr>")),
e.each(c.slice(0,p.displayMaxLine),function(a){b.push("<tr>");e.each(a,function(a){b.push("<td>"+a+"</td>")});b.push("</tr>")}));return b.join("")}},q=function(){var a=[".zoptimizer-wrapper{text-align:left;position:fixed;right:0;bottom:0;border:1px solid #666;width:330px;font-size:12px;line-height:1.8;background-color:#fff;color:#333;overflow:hidden;z-index:9999999}",".zoptimizer-wrapper *{padding:0;margin:0;}",".zoptimizer-wrapper .minimize{display:block;float:right;margin:10px 10px 0 0;width:20px;height:3px;border:5px solid #666;background-color:#fff;cursor:pointer;}",
".zoptimizer-wrapper .maximize{display:block;float:right;width:20px;height:8px;margin:10px 10px 0 0;border:2px solid #fff;cursor:pointer;}",".zoptimizer-wrapper input{vertical-align:top;}",".zoptimizer-wrapper select{vertical-align:top;}",".zoptimizer-header{background-color:#666;height:36px;color:#fff;font:600 14px/2.5 georgia, arial, sans-serif;text-indent:1em;}",".zoptimizer-content-wrap{padding:10px 6px;}",".zoptimizer-comp{border:1px solid #666;background-color:#fff;color:#333;}","#zoptimizer-dataset{display:none;}",
"#zoptimizer-data-input{width:190px;height:20px;}","#zoptimizer-input-confirm:hover{color:#fff;background-color:#666;}","#zoptimizer-input-confirm{width:50px;height:22px;cursor:pointer;margin-left:10px;}","#zoptimizer-filter-type{height:22px;width:190px;}","#zoptimizer-resultbar table{border:1px solid #d3d2d2;border-collapse:collapse;width:100%;table-layout:fixed;}","#zoptimizer-resultbar th{text-align:center;height:26px;line-height:26px;background-color:#f3f2f2;word-break;break-all;word-wrap:break-word;border:1px solid #d3d2d2;}",
"#zoptimizer-resultbar td{text-align:left;padding:0 4px;word-break;break-all;word-wrap:break-word;border:1px solid #d3d2d2;}"];return r.create({init:function(b){var c=this;e.domReady(function(){var d=c.wrap=document.createElement("div"),f=e.$;d.className="zoptimizer-wrapper";d.id="zoptimizer";d.innerHTML='<div class="zoptimizer-header"><span id="zoptimizer-winToggle"></span>ZOptimizer\u8ba9\u811a\u672c\u8fd0\u884c\u65f6\u66f4\u9ad8\u6548\uff01</div><div class="zoptimizer-content-wrap" id="zoptimizer-searchbar"><label forid="zoptimizer-data-input">\u76d1\u6d4b\u5bf9\u8c61\uff1a</label><input id="zoptimizer-data-input" class="zoptimizer-comp" type="text" placeholder="\u8f93\u5165\u8981\u76d1\u6d4b\u7684\u5bf9\u8c61" /><input type="button" class="zoptimizer-comp" id="zoptimizer-input-confirm" value="\u786e\u5b9a" /></div><div id="zoptimizer-dataset"><div class="zoptimizer-content-wrap" id="zoptimizer-filterbar">\u7b5b\u9009\u65b9\u5f0f\uff1a<select id="zoptimizer-filter-type" class="zoptimizer-comp"></select></div><div class="zoptimizer-content-wrap" id="zoptimizer-resultbar"></div></div>';
document.body.appendChild(d);e.injectCSS2Page(a);c.dataInput=f("zoptimizer-data-input");c.inputConfirm=f("zoptimizer-input-confirm");c.filterType=f("zoptimizer-filter-type");c.filterResult=f("zoptimizer-resultbar");c.datasetWrap=f("zoptimizer-dataset");c.winToggle=f("zoptimizer-winToggle");e.DomEvent.on(c.inputConfirm,"click",function(){c.startCheck(c.dataInput.value,c.filterType.value)});e.DomEvent.on(c.dataInput,"keydown",function(a){13===a.keyCode&&e.trim(c.dataInput.value)&&c.startCheck(c.dataInput.value,
c.filterType.value)});c.setFilterTypes(b)})},startCheck:function(a,c){this.datasetWrap.style.display="block";this.dataInput.parentNode.replaceChild(document.createTextNode(this.dataInput.value),this.dataInput);this.inputConfirm.style.display="none";g.check(a);this.filterTypeChange(c);if(0<m.getFuncInfosLength()){this.winToggle.className="minimize";var d=this;e.DomEvent.on(this.winToggle,"click",function(a){"minimize"===this.className?(d.datasetWrap.style.display="none",this.className="maximize"):
(d.datasetWrap.style.display="block",this.className="minimize",d.filterTypeChange(d.filterType.value))})}},setFilterTypes:function(a){var c=this.filterType,d=document.createDocumentFragment(),f=this,g;e.foreach(a,function(a,b){g=document.createElement("option");g.innerHTML=b.label;g.value=a;d.appendChild(g)});c.appendChild(d);e.DomEvent.on(c,"change",function(){this.disabled=!0;f.filterTypeChange(this.value);this.disabled=!1})},filterTypeChange:function(a){"none"!==this.datasetWrap.style.display&&
(this.filterResult.innerHTML=s.formatHTML(l.getFilteredData(a))||"\u6682\u65e0\u7ed3\u679c")}})}();q.init(l.getFormatByName());g.addListener("after-function-exec",function(){var a;return function(){a&&window.clearTimeout(a);a=setTimeout(function(){q.filterTypeChange(q.filterType.value)},50)}}())})();
