!function(t){var e={};function s(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);console;class n{constructor(t,e,s){this._app=t,this._props=e,this._key=s,this._vCache={},this._matchers={},this._vals={},this.v=this._view.bind(this)}draw(){this._draw(i,this.v,this._app,this._props,this._key,this)}wrap(t){return this.root=t,this.el=t.el,t}match(t,e){this._matchers.hasOwnProperty(t)||(this._matchers[t]=[]),this._matchers[t].push(e)}update(t){this._update(i,this.v,this._app,t,this._key,this)}_update(t,e,s,n,r,i){for(let t in i._matchers){let e=n[t];i._vals[t]!==e&&i._matchers[t].forEach(t=>{t(e,n)}),i._vals[t]=e}}_view(t,e,s){let n;if(void 0==s)(n=new t(this._app,e)).draw();else{let r=t.name;this._vCache.hasOwnProperty(r)||(this._vCache[r]={});let i=this._vCache[r];i.hasOwnProperty(s)?n=i[s]:((n=new t(this._app,e,s)).draw(),i[s]=n)}return n.update(e),n}}class r extends n{_draw(t,e,s,n,r,i){i.wrap(i.overlay(t,e,s,n,r,i).on("click",t=>{t.target==i.el&&i.reject("user-cancelled")})),i.promise=new Promise((t,e)=>{i.resolve=t,i.reject=e}),i.root.inner(i.content(t,e,s,n,r,i))}}function i(t){return new a(t)}class a{constructor(t){t.startsWith("#")?this.el=document.getElementById(t.substr(1)):this.el=document.createElement(t)}atts(t){for(let e in t)this.el.setAttribute(e,t[e]);return this}checked(t){return this.el.checked=t,this}class(t){return this.el.className=t,this}clear(){return this.el.innerHTML="",this}focus(){return this.el.focus(),this}on(t,e){return this.el.addEventListener(t,e),this}id(t){return this.el.id=t,this}inner(t){this.el.innerHTML="",Array.isArray(t)||(t=[t]);let e=document.createDocumentFragment();return t.forEach(t=>{t instanceof a||t instanceof n?e.appendChild(t.el):t instanceof Node?e.appendChild(t):e.appendChild(document.createTextNode(t.toString()))}),this.el.appendChild(e),this}html(t){return this.el.innerHTML=t,this}text(t){return this.el.textContent=t,this}}class o extends n{constructor(t,e){super(t),this.wrap(i("#"+e))}switch(t){this.root.inner(this._view(t.cls,t.props,t.keyFn(t.props)))}}class h{constructor(t,e,s){let n;this.cls=e,this.keyFn=s||function(){return 1},[t,n]=t.split("?"),this.pattern=t,this.chunks=t.split("/").map(t=>t.startsWith("{")?new l(t.slice(1,-1)):t),this.params={},n&&n.split(",").forEach(t=>{let e=new l(t.trim());this.params[e.name]=e})}matches(t){let e,s,n;[e,s]=t.split("?"),n=e.split("/");let r,i,a={},o=0,h=this.chunks.length,c=!1;if(h==n.length){for(;;){if(r=this.chunks[o],i=n[o],r instanceof l)a[r.name]=r.convert(i);else if(r!==i){c=!0;break}if(++o>h)break}if(!c)return s&&s.split("&").forEach(t=>{let e,s;[e,s]=t.split("="),this.params.hasOwnProperty(e)&&(a[e]=this.params[e].convert(s))}),this.props=a,!0}return!1}}class l{constructor(t){let e,s;switch([e,s]=t.split(":"),this.name=e,s){case"int":this.conv=(t=>parseInt(t));break;case"float":this.conv=(t=>parseFloat(t));break;default:this.conv=(t=>t)}}convert(t){return this.conv(t)}}const u=console;class d{constructor(t,e){this.schema=t,this.target=e}capitalize(t){return t.charAt(0).toUpperCase()+t.slice(1)}addStore(t){let e=this.capitalize(t);["put","del","get","getAll"].forEach(s=>{this.target[s+e]=function(e){return this[s](t,e)}})}oneToMany(t,e){let s=this.capitalize(t),n=this.capitalize(e),r=n+"s";this.target["get"+n+s]=function(s){return this.getParent(e,t,s)},this.target["get"+s+r]=function(s){return this.getChildren(t,e,s)},this.target["set"+n+s]=function(s,n){return this.setParent(e,t,s,n)}}manyToMany(t,e){}}class p{constructor(t,e,s){this.schema=t,this.idb=e,this.stores={},this.defaultConf=s}addStore(t,e=this.defaultConf){let s=this.idb.createObjectStore(t,e);return this.stores[t]=s,s}oneToMany(t,e){this.stores[e].createIndex(t,this.schema.getFkName(t))}manyToMany(t,e){let s=this.idb.createObjectStore(this.schema.getLinkStoreName(t,e),this.defaultConf);s.createIndex(t,this.schema.getFkName(t)),s.createIndex(e,this.schema.getFkName(e))}}const m=new class{constructor(t={keyPath:"id",autoIncrement:!0}){this.defaultConf=t,this._versions=[]}addVersion(t){this._versions.push(t)}getVersion(){return this._versions.length+1}upgrade(t,e){let s=new p(this,t,this.defaultConf);this._versions.forEach((t,n)=>{n>=e&&t(s,!0)})}createFunctions(t){let e=new d(this,t);this._versions.forEach((t,s)=>{t(e,!1)})}getFkName(t){return`__${t}Id`}getLinkStoreName(t,e){return`m2m__${t}__${e}`}};!function(t){indexedDB.deleteDatabase(t)}("mop-todos"),m.addVersion((t,e)=>{let s=t.addStore("day");t.addStore("task"),t.addStore("tag");t.oneToMany("day","task"),t.manyToMany("tag","task"),e&&s.put({day:"mon"})});const _=new class{constructor(t,e){this.schema=e,this._caches={},this._fullyLoaded={},this._dbp=new Promise((s,n)=>{let r=indexedDB.open(t,e.getVersion());r.onerror=(()=>n(r.error)),r.onsuccess=(()=>{e.createFunctions(this),s(r.result)}),r.onupgradeneeded=(t=>{e.upgrade(r.result,t.oldVersion)})})}ready(){return this._dbp}dump(){let t={},e=[];return this._dbp.then(s=>{let n=s.objectStoreNames,r=s.objectStoreNames.length;for(let s=0;s<r;s++){let r=n[s];e.push(this.getAll(r).then(e=>t[r]=e))}return Promise.all(e).then(e=>t)})}_cacheOf(t){return this._caches.hasOwnProperty(t)||(this._caches[t]={}),this._caches[t]}_wrap(t,e,s,...n){return this._dbp.then(r=>new Promise((i,a)=>{let o=r.transaction(t,s),h=o.objectStore(t)[e](...n);o.oncomplete=(()=>i(h.result)),o.onabort=o.onerror=(()=>a(o.error))}))}put(t,e){return this._wrap(t,"put","readwrite",e).then(s=>(e.id=s,this._cacheOf(t)[s]=e,e))}del(t,e){return this._wrap(t,"delete","readwrite",e.id).then(s=>{delete this._cacheOf(t)[e.id]})}get(t,e){let s=this._cacheOf(t)[e];return void 0==s?this._wrap(t,"get",void 0,e).then(s=>(this._cacheOf(t)[e]=s,s)):Promise.resolve(s)}getAll(t){return this._fullyLoaded[t]?Promise.resolve(Object.values(this._cacheOf(t))):this._wrap(t,"getAll").then(e=>{let s=this._cacheOf(t);return this._fullyLoaded[t]=!0,e.map(t=>s[t.id]=t),e})}_criteriaMatch(t,e){for(let s in e)if(t[s]!==e[s])return!1;return!0}_fetchOne(t,e){return this._dbp.then(s=>new Promise((n,r)=>{let i=[],a=s.transaction(t).objectStore(t).openCursor();a.onerror=(t=>u.log(t)),a.onsuccess=(t=>{var s=t.target.result;if(s){let t=s.value;this._criteriaMatch(t,e)?i.push(t):s.continue()}else n(i)})}))}filter(t,e){return this._dbp.then(s=>new Promise((n,r)=>{let i=[],a=s.transaction(t).objectStore(t).openCursor();a.onerror=(t=>u.log(t)),a.onsuccess=(t=>{var s=t.target.result;if(s){let t=s.value;this._criteriaMatch(t,e)&&i.push(t),s.continue()}else n(i)})}))}getParent(t,e,s){let n=s[this.schema.getFkName(e)];return void 0==n?Promise.resolve(void 0):this.get(e,n)}getChildren(t,e,s){return this._dbp.then(n=>new Promise((r,i)=>{let a=n.transaction(e),o=a.objectStore(e).index(t).get(s);a.oncomplete=(()=>r(o.result)),a.onabort=a.onerror=(()=>i(a.error))}))}setParent(t,e,s,n){return s[this.schema.getFkName(e)]=n,this.put(t,s)}link(t,e,s,n){let r=this.schema.getLinkStoreName(t,e),i={};return i[this.schema.getFkName(t)]=s.id,i[this.schema.getFkName(e)]=n.id,this.put(r,i)}}("mop-todos",m);class f extends r{overlay(t,e,s,n,r,i){return t("div").class("modal-background")}content(t,e,s,n,r,i){let a="",o=t("input").atts({autofocus:!0}).on("change",t=>{a=t.target.value});return t("div").class("modal-content modal-animate").inner([t("div").inner([o]),t("button").text("OK").on("click",t=>i.resolve({text:a})),t("button").text("Cancel").on("click",t=>i.reject("user-cancelled"))])}}const g=[["/",class extends n{_draw(t,e,s,n,r,i){i.tasksUL=t("ul"),i.btnAdd=t("button").text("Add").on("click",t=>{s.showModal(new f).then(t=>{s.addTask(t)}).catch(t=>{})}),i.wrap(t("div").inner([i.btnAdd,i.tasksUL])),s.on("tasks-updated",e=>i.drawTasksUl(t,i,e))}drawTasksUl(t,e,s){e.tasksUL.inner(s.map(e=>t("div").inner(e.text)))}}],["todos/{id}?name,age",""]],w=new class{constructor(){this._eventWatchers={},this._views={}}view(t,e){let s=new t(this);s.draw(),e&&(this._views[e]=s)}emit(t,e){this._watchers(t).forEach(t=>t(e))}on(t,e){this._watchers(t).push(e)}_watchers(t){let e=this._eventWatchers[t];return void 0==e&&(e=[],this._eventWatchers[t]=e),e}};w.db=_,w.router=new class{constructor(t,e,s){this._app=t,this.pageContainer=new o(this._app,e),this.routes=s.map(t=>new h(...t)),window.addEventListener("hashchange",t=>this._hashChanged()),window.addEventListener("load",t=>this._hashChanged())}add(t,e,s){this.routes.push(new h(t,e,keyFn))}_hashChanged(t){let e=location.hash.slice(1)||"/",s=this._getRoute(e);if(!s)throw new Error("Route not matched: "+e);this.pageContainer.switch(s)}_goto(t){}_getRoute(t){let e=this.routes.length;for(let s=0;s<e;s++){let e=this.routes[s];if(e.matches(t))return e}}}(w,"page-container",g),w.modalContainer=new class{constructor(t){this._el=i("#"+t)}showModal(t){return t.draw(),this._el.inner(t),new Promise((e,s)=>{t.promise.then(t=>{this._el.clear(),e(t)}).catch(t=>{this._el.clear(),s(t)})})}}("modal-container"),w.view(class extends n{_draw(t,e,s,n,r,i){let a=t("span").html("&#9776;").class("menu-button").on("click",t=>i.showMenu()),o=t("a").atts({href:"#"}).html("&times;").class("closebtn").on("click",t=>i.hideMenu());i.menuDiv=t("div").id("menu").class("overlay").inner([o,t("div").class("overlay-content").inner([i.getMenuEntry(s,t,"Home",""),i.getMenuEntry(s,t,"Page2","page2"),i.downloadButton(t,e,s,n,r,i)])]),i.wrap(t("#menu-container")).inner([i.menuDiv,a])}downloadButton(t,e,s,n,r,i){return t("a").atts({href:"#"}).text("Download").on("click",t=>{s.db.dump().then(t=>{!function(t,e){var s=document.createElement("a");s.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(e)),s.setAttribute("download",t),s.style.display="none",document.body.appendChild(s),s.click(),document.body.removeChild(s)}("pointydb.json",JSON.stringify(t)),this.hideMenu()})})}getMenuEntry(t,e,s,n){return e("a").atts({href:"#"+n}).text(s).on("click",t=>{this.hideMenu()})}showMenu(){this.menuDiv.atts({style:"width: 70%"})}hideMenu(){this.menuDiv.atts({style:"width: 0"})}}),w.showModal=function(t){return w.modalContainer.showModal(t)},w.goto=function(t){},w.addTask=function(t){this.db.putTask(t).then(t=>{this.db.getAll("task").then(t=>this.emit("tasks-updated",t))})},w.loadData=function(){let t=this.db;this.tasks=[],t.ready().then(()=>{t.putDay({day:new Date}).then(()=>{t.putTag({name:"lame"}).then(()=>{t.putTag({name:"heroic"}).then(e=>{t.putTask({text:"Did my stuff"}).then(s=>{t.link("tag","task",e,s).then(()=>{t.getAll("m2m__tag__task").then(t=>{c.log(t)})})})})})})})},w.loadData()}]);
//# sourceMappingURL=bundle.js.map