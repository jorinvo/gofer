(function(){define("parser",[],function(){function a(a,b){function c(d,e){var f=a.pop();return _.isUndefined(f)?"":f.isClosingTag?c(f.name,[]):d?d===f.name?c()+f.object[b](function(){return _.reduce(e,function(a,c){return a+(_.isString(c)?c:c.object[b].call(c.object))},"")}):(e.unshift(f),c(d,e)):c()+(_.isString(f)?f:f.object[b]())}return c().replace("{\\{","{{").replace("}\\}","}}")}return a}),define("template",["jquery"],function(a){function c(){var c=arguments;if(_.isUndefined(c[0]))return _.keys(b);if(a.isPlainObject(c[0])){var d=c[0];if(_.isString(_.values(d)[0])){_.each(d,function(a,b){d[b]=_.template(a)}),_.extend(b,d);return}return _.each(d,function(a,c){d[c]=b[c](a)}),d}if(_.isObject(c[1]))return b[c[0]](c[1]);if(_.isUndefined(c[1]))return b[c[0]];b[c[0]]=_.template(c[1]);if(c[2])return b[c[0]](c[2])}var b={};return c}),define("manage",[],function(){function a(a,b){var c=_.reject(a,function(a){return a===b});return c.length===a.length?a.push(b):a=c,a}return a}),define("value",["manage"],function(a){function b(b){function f(a){return _.isUndefined(a)||(c=a,h()),g()}function g(){return _.compose.apply(this,d)(c)}function h(){var a=g();_.each(e,function(b){b(a)})}var c=b,d=[],e=[];return _.extend(f,{modify:function(b){return d=a(d,b),this},subscribe:function(b){return e=a(e,b),this},trigger:function(){return h(),this},update:function(a){var b=arguments;return _.isArray(c)?b.length===2&&(_.isNumber(b[0])||_.isNumber(parseInt(b[0],10)))?c[b[0]]=b[1]:c=c.concat(_.isArray(a)?a:Array.prototype.slice.call(b)):_.isObject(c)?_.isUndefined(b[1])?_.isArray(a)?c[a[0]]=a[1]:_.extend(c,a):c[b[0]]=b[1]:c+=a,h(),this}}),f}return b}),define("hook",["manage"],function(a){function c(d,e){if(_.isFunction(e))return b[d]=b[d]?a(b[d],e):[e],c;var f=!0;return _.each(b[d],function(a){a(e)||(f=!1)}),f}var b={};return c}),define("helpers",["jquery"],function(a){function b(b){if(!a.isPlainObject(b))return c[b];_.defaults(c,b)}var c={};return b.overwrite=function(a){_.extend(c,a)},b}),define("tags",[],function(){var a={register:function(b){a.cache=_.defaults(a.cache,b)},cache:{}};return a}),define("id",["jquery","value","template","hook","tags"],function(a,b,c,d,e){function f(e){this.data=b(),f.subscribe(e,_.bind(this.data,this)),this.id=_.uniqueId("gofer"),d("dom",_.bind(function(){this.data.subscribe(_.bind(function(){a("."+this.id).html(this.content())},this))},this)),c("id",'<div class="<%= id %>"><%= content() %></div>')}function g(){}return _.extend(f.prototype,{edit:function(a){return a?this.content=function(){return _.reduce(this.data(),function(b,c){return b+a().replace(/\{\{el\}\}/,c)},"")}:this.content=function(){return _.reduce(this.data(),function(a,b){return a+b},"")},c("id",this)},view:function(a){return this.content()}}),f.cache={},f.subscribe=function(a,c){f.cache[a]?c(f.cache[a]()):f.cache[a]=b([]),f.cache[a].subscribe(c)},f.add=function(a,c){f.cache[a]||(f.cache[a]=b([]));var d=f.cache[a]().push(c.data())-1;c.data.subscribe(function(b){f.cache[a].update(d,b)})},_.extend(g.prototype,{edit:function(){return"{{el}}"},view:function(){return"{{el}}"}}),e.register({el:g}),f}),define("lexer",["jquery","id","tags"],function(a,b,c){function d(d){return _.map(d.split(/\{\{|\}\}/),function(d,e){if(e%2!==0){var f={temp:a.trim(d)},g={},h=f.temp.match(/\S+\(.*?\)|\S+=".*?"|\S+/g),i,j;f.name=h.shift();var k=f.name.match(/(.+?)\((.*?)\)/);if(i=f.name.match(/\/(.+)/))return f.isClosingTag=!0,f.name=i[1],f;if(j=f.name.match(/#(.+)/))return f.isId=!0,f.name=j[1],f.object=new b(f.name),f;k&&(f.name=k[1],g.param=k[2]),g.htmlAttributes="";var l;return _.each(h,function(a){var b;if(/#(.+)/.test(a))return l=a.match(/#(.+)/)[1];(b=a.match(/(.+?)\((.*?)\)/))?g[b[1]]=b[2]:/.+?".*?"/.test(a)?g.htmlAttributes+=" "+a:g[a]=!0}),f.object=new c.cache[f.name](g),l&&b.add(l,f.object),f}return d})}return d}),define("tags/input",["jquery","value","helpers","hook","template"],function(a,b,c,d,e){function f(f){this.id=_.uniqueId("gofer"),this.data=b(""),this.data.modify(_.escape),this.dataOut=f.mix?function(){return c(f.mix)(this.data())}:this.data,this.hidden=f.hidden,this.note=f.note,f.required&&d("submit",_.bind(function(){return this.data()},this)),d("dom",_.bind(function(){var b=a("#"+this.id).on("keyup",_.bind(function(){this.data(b.val())},this))},this)),e("input",'<% if(note) { %>  <label class="gofer"><%= note %></label><% } %><input type="text" value="<%= data() %>" id="<%= id %>" class="gofer">')}return _.extend(f.prototype,{edit:function(){return e("input",this)},view:function(){return this.hidden?"":this.dataOut()}}),f}),define("tags/note",[],function(){function a(){}return _.extend(a.prototype,{edit:function(a){return a()},view:function(){return""}}),a}),define("loadImage",[],function(){function a(a,b){var f=document.createElement("img"),g,h;return f.onerror=b,f.onload=function(){h&&d(h),b(f)},window.File&&a instanceof File?g=h=c(a):g=a,g?(f.src=g,f):e(a,function(a){f.src=a})}function c(a){return b?b.createObjectURL(a):!1}function d(a){return b?b.revokeObjectURL(a):!1}function e(a,b){if(window.FileReader&&FileReader.prototype.readAsDataURL){var c=new FileReader;return c.onload=function(a){b(a.target.result)},c.readAsDataURL(a),c}return!1}var b=window.createObjectURL&&window||window.URL||window.webkitURL;return a}),define("tags/img",["jquery","value","helpers","hook","template","loadImage"],function(a,b,c,d,e,f){function g(g){this.hidden=g.hidden,this.data=b({}),this.inputId=_.uniqueId("gofer"),this.imgId=_.uniqueId("gofer"),this.src=b(""),this.src.subscribe(_.bind(function(a){this.data.update("src",a)},this)),this.title=b(),this.title.subscribe(_.bind(function(a){this.data.update("title",a)},this))(g.title),g.mix&&this.data.modify(c(g.mix)),this.note=g.note,g.required&&d("submit",_.bind(function(){return this.src()},this)),d("dom",_.bind(function(b){var c=a("#"+this.imgId);b.on("change","#"+this.inputId,function(a){f(a.target.files[0],function(a){c.html(a)})})},this)),e("img",'<% if(note) { %><div class="gofer-note"><%= note %></div><% } %><div id="<%= imgId %>"></div><input type="file" accept="image/*" id="<%= inputId %>">')}return _.extend(g.prototype,{edit:function(a){return e("img",this)},view:function(){return this.hidden?"":'<img src="'+this.src()+'">'}}),g}),define("tags/link",["jquery","value","helpers","hook","template"],function(a,b,c,d,e){function f(f){this.htmlAttributes=f.htmlAttributes,this.id=_.uniqueId("gofer"),this.buttonId=_.uniqueId("gofer"),this.hrefId=_.uniqueId("gofer"),this.data=b({}),this.text=b(""),this.text.subscribe(_.bind(function(a){this.data.update("text",a)},this)),this.href=b(),this.href.subscribe(_.bind(function(a){this.data.update("href",a)},this))(f.href),f.mix&&this.data.modify(c(f.mix)),this.hidden=f.hidden,this.note=f.note,f.required&&d("submit",_.bind(function(){return this.text()&&this.href()},this)),d("dom",_.bind(function(){var b=a("#"+this.id).on("keyup",_.bind(function(){this.text(b.val())},this)),c=a("#"+this.hrefId).on("keyup",_.bind(function(){this.href(c.val())},this));a("#"+this.buttonId).on("click",function(){c.toggle()})},this)),e("link",'<% if(note) { %> <div class="gofer-note"><%= note %></div><% } %><input type="text" id="<%= id %>" value="<%= text() %>" <%= htmlAttributes %> ><input type="button" id="<%= buttonId %>"><input type="text" id="<%= hrefId %>" value="<%= href() %>">')}return _.extend(f.prototype,{edit:function(a){return e("link",this)},view:function(){return this.hidden?"":'<a href="'+this.href()+'" title="">'+this.text()+"</a>"}}),f}),define("tags/index",["tags","tags/input","tags/note","tags/img","tags/link"],function(a,b,c,d,e){a.register({input:b,note:c,link:e,img:d})});var JSON;JSON||(JSON={}),function(){function f(a){return a<10?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),require.config({paths:{jquery:"http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"},baseUrl:"../src"}),require(["jquery","lexer","parser","template","value","hook","helpers","tags","tags/index","../libs/json2"],function(a,b,c,d,e,f,g,h){function i(b){if(typeof b!="string"){if(a.isPlainObject(b))return j=_.defaults(b,i.settings()),l(),i;if(!b)return l(),i;throw new Error("invalid arguments")}console.log("implement find by #ID here...")}function l(){a.get(i.settings().template,function(c){k=b(c),f("dom",function(){a("#gofer-submit").click(function(a){f("submit")||a.preventDefault()})}),i.render()})}function m(){var a={};_.each(Id.cache,function(a,c){b.fields[c]=a()});var b={output:i.generateOutput(),template:i.getTemplate(),fields:JSON.stringify(a)};_.reduce(b,function(a,b,c){return d("hidden-field",{name:c,value:b})},"")}_.extend(i,{template:d,value:e,hook:f,helpers:g,registerTags:h.register});var j={template:"./index.gofer",dataUrl:"/goferData",postUrl:"/",updateTemplateUrl:!1,container:"body",mode:"edit"};i.settings=function(){return j};var k;i.render=function(){var b=i.settings().mode,d=a(i.settings().container);d.html((b==="edit"?i.slugs.header():"")+c(k.slice(),b)+(b==="edit"?i.slugs.footer():"")).promise().done(function(){f("dom",d)})},i.mode=function(a){if(!(!a||a in["edit","view"])){console.log("Invalid mode.\nValid modes: 'edit', 'view'");return}j.mode=i.settings().mode==="edit"?"view":"edit",i.render()},i.generateOutput=function(){var b=a("html").clone();return b.find(i.settings().container).html(c(k.slice(),"view")),b.html().replace(/<!--\s*?gofer\s*?-->[\s\S]*?(<!--\s*?\/\s*?gofer\s*?-->)/,"")},i.slugs={header:e(""),footer:e('<input type="submit" id="gofer-submit">')},i.getTemplate=function(){return _.reduce(k,function(a,b){return a+(_.isString(b)?b:"{{"+b.temp+"}}")},"")},d("hidden-field",'<input type="hidden" name="<%= name %>" value="<%= value %>">'),window.gofer=i(window.gofer)})})()