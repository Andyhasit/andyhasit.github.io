/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/pillbug.js":
/*!************************!*\
  !*** ./lib/pillbug.js ***!
  \************************/
/*! exports provided: App, ModalContainer, View, Modal, h, NodeWrapper, Router, Route, RouteArg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalContainer", function() { return ModalContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeWrapper", function() { return NodeWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteArg", function() { return RouteArg; });
/*
Pillbug version 0.0.1


*/

const c = console;
class App {
  constructor() {
    this._eventWatchers = {}
    this._views = {}
  }
  view(cls, name) {
    let view = new cls(this)
    if (name) {
      this._views[name] = view
    }
  }
  emit(event, data) {
    this._watchers(event).forEach(w => w(data))
  }
  on(event, callback) {
    this._watchers(event).push(callback)
  }
  _watchers(event) {
    let watchers = this._eventWatchers[event]
    if (watchers == undefined) {
      watchers = []
      this._eventWatchers[event] =  watchers
    }
    return watchers
  }
}

class ModalContainer {
  constructor(id) {
    this._el = h('#' + id)
  }
  showModal(modal) {
    this._el.inner(modal)
    return modal.promise
      .then(result => {          
        this._el.clear()
        return result
      })
      .catch(error => {
        this._el.clear()
        return error
      })
  }
}


class View {
  constructor(app, props, key) {
    this._app = app
    this._key = key
    this._vCache = {}
    this._matchers = {}
    this._vals = {}
    this.v = this._view.bind(this)
    this.draw(h, this.v, app, props, key, this)
  }
  wrap(v) {
    /*
    if (el instanceof NodeWrapper || el instanceof View) {
      this.root = el
      this.el = el.el
    } else {
      throw new TypeError("View.wrap() only accepts types: NodeWrapper, View")
    }
    */
    this.root = v
    this.el = v.el
    return v
  }
  match(prop, fn) {
    if (!this._matchers.hasOwnProperty(prop)) {
      this._matchers[prop] = []
    }
    this._matchers[prop].push(fn)
  }
  update(props) {
    this._update(h, this.v, this._app, props, this._key, this)
  }
  _update(h,v,a,p,k,s) {
    for (let prop in s._matchers) {
      let val = p[prop];
      if (s._vals[prop] !== val) {
        s._matchers[prop].forEach(fn => {
          fn(val, p)
        })
      }
      s._vals[prop] = val
    }
  }
  _view(cls, props, key) {
    let view;
    if (key == undefined) {
      view = new cls(this._app, props)
    } else {
      let className = cls.name;
      if (!this._vCache.hasOwnProperty(className)) {
        this._vCache[className] = {}
      }
      let cacheForType = this._vCache[className];
      if (cacheForType.hasOwnProperty(key)) {
        view = cacheForType[key]
      } else {
        view = new cls(this._app, props, key)
        cacheForType[key] = view
      }
    }
    view.update(props)
    return view
  }
}


class Modal extends View {
  draw(h,v,a,p,k,s) {
    s.wrap(s.overlay(h,v,a,p,k,s).on({
      click: e => {
        if (e.target == s.el) {
          s.reject('user-cancelled')
        }
      }
    }))
    s.promise = new Promise((resolve, reject) => {
      s.resolve = resolve
      s.reject = reject
    })
    s.root.inner(s.content(h,v,a,p,k,s))
  }
}


function h(tag) {
  return new NodeWrapper(tag)
}


class NodeWrapper {
  constructor(tag) {
    if (tag.startsWith('#')) {
      this.el = document.getElementById(tag.substr(1))
    } else {
      this.el = document.createElement(tag)
    }
  }
  atts(atts) {
    for (let key in atts) {
      this.el.setAttribute(key, atts[key])
    }
    return this
  }
  checked(val) {
    this.el.checked = val
    return this
  }
  class(className) {
    /*
    classList.add("mystyle")
    element.classList.toggle("mystyle")
    .remove("mystyle")
    */
    this.el.className = className
    return this
  }
  clear() {
    this.el.innerHTML = ''
    return this
  }
  on(event, callback) {
    this.el.addEventListener(event, callback)
    return this
  }
  id(id) {
    this.el.id = id
    return this
  }
  inner(inner) {
    this.el.innerHTML = ''
    if (!Array.isArray(inner)) {
      inner = [inner]
    }
    let fragment = document.createDocumentFragment()
    inner.forEach(child => {
      if (child instanceof NodeWrapper || child instanceof View) {
        fragment.appendChild(child.el)
      } else if (child instanceof Node) {
        fragment.appendChild(child)
      } else {
        fragment.appendChild(document.createTextNode(child.toString()))
      }
    })
    this.el.appendChild(fragment)
    return this
  }
  html(html) {
    this.el.innerHTML = html
    return this
  }
  text(text) {
    this.el.textContent = text
    return this
  }
}

/*

Routing.

key won't work if no args, but we want it to!

params vs vars
*/

class Router {
  constructor() {
    this.routes = [];
    window.addEventListener('hashchange', e => this._hashChanged());
    window.addEventListener('load', e => this._hashChanged());
    /*
    //window.addEventListener('load', router);
    window.addEventListener('popstate', () => {
     contentDiv.innerHTML = routes[window.location.pathname];
    }
    */
  }
  add(pattern, cls, key) {
    this.routes.push(new Route(pattern, cls, keyFn))
  }
  _hashChanged(e) {
    let url = location.hash.slice(1) || '/';
    let route = this._getRoute(url);
    if (!route) {
      throw new Error('Route not matched: ' + url)
    }
    //window.history.pushState({}, url, window.location.origin + url);
  }
  _goto(url) {

  }
  _getRoute(url) {
    let len = this.routes.length;
    for (let i=0; i<len; i++) {
      let route = this.routes[i];
      if (route.matches(url)) {
        return route
      }
    }
  }
}


class Route {
  constructor(pattern, cls, keyFn) {
    //'todos/{id:int}?name,age'
    let paramStr;
    this.cls = cls;
    this.keyFn = keyFn; //TODO - implement/use
    [pattern, paramStr] = pattern.split('?')
    this.pattern = pattern
    this.chunks = pattern.split('/').map(s => {
      if (s.startsWith('{')) {
        return new RouteArg(s.slice(1,-1))
      }
      return s
    })
    this.params = {}
    if (paramStr) {
      paramStr.split(',').forEach(s => {
        let r = new RouteArg(s.trim());
        this.params[r.name] = r;
      })
    }
  }
  /*
  _extract(str) {
    return str.match(/\{.+?\}/g).map(x => x.slice(1,-1))
  }
  */
  match(url) {
    let main, paramStr, chunks;
    [main, paramStr] = url.split('?')
    chunks = main.split('/')
    let defChunk, testChunk, props = {}, i=0, end=this.chunks.length, mismatch=false;
    if (end == chunks.length) {
      while (true) {
        defChunk = this.chunks[i];
        testChunk = chunks[i];
        if (defChunk instanceof RouteArg) {
          props[defChunk.name] = defChunk.convert(testChunk)
        } else if (defChunk !== testChunk) {
          mismatch = true;
          break;
        }
        i ++;
        if (i > end) {
          break;
        }
      }
      if (!mismatch) {
        if (paramStr) {
          paramStr.split('&').forEach(e => {
            let k, v;
            [k,v] = e.split('=')
            if (this.params.hasOwnProperty(k)) {
              props[k] = this.params[k].convert(v)
            }
          })
        }
        return props
      }
    }
    return false
  }
}

class RouteArg {
  constructor(str) {
    // No error checks :-(
    let name, conv;
    [name, conv] = str.split(':')
    this.name = name
    switch (conv) {
      case 'int':
        this.conv = v => parseInt(v);
        break;
      case 'float':
        this.conv = v => parseFloat(v);
        break;
      default:
        this.conv = v => v;
    }
  }
  convert(val) {
    return this.conv(val)
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pillbug.js */ "./lib/pillbug.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./src/menu.js");
/* harmony import */ var _page_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-container */ "./src/page-container.js");
/* harmony import */ var _modal_yes_no__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal-yes-no */ "./src/modal-yes-no.js");





const c = console;

const app = new _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["App"]()
app.modal = new _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["ModalContainer"]('modal-container')
app.router = new _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["Router"]([
  ['todos/{id}?name,age', ''],
])

app.goto = function(route) {
  // so far not used as we use hrefs
  //this.emit('goto', page)
}
app.showModal = app.modal.showModal;

app.view(_menu__WEBPACK_IMPORTED_MODULE_1__["default"])


/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Menu; });
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pillbug.js */ "./lib/pillbug.js");



class Menu extends _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  draw(h,v,a,p,k,s) {
    let showMenuBtn = h('span').html('&#9776;').class('menu-button').on('click', e => s.showMenu())
    let hideMenuBtn = h('a').atts({href:"#"}).html('&times;').class('closebtn').on('click', e => s.hideMenu())
    s.menuDiv = h('div').id('menu').class('overlay').inner([
      hideMenuBtn,
      h('div').class('overlay-content').inner([
        s.getMenuEntry(a, h, 'Page1', 'page1'),
        s.getMenuEntry(a, h, 'Page2', 'page2')
        ])
      ])
    s.wrap(h('#menu-container')).inner([
      s.menuDiv, 
      showMenuBtn
      ])
  }
  getMenuEntry(a, h, text, route) {
    return h('a').atts({href:"#/" + route}).text(text).on('click', e => {
      this.hideMenu()
      //a.goto(route)
    })
  }
  showMenu() {
    this.menuDiv.atts({style: 'width: 70%'})
  }
  hideMenu() {
    this.menuDiv.atts({style: 'width: 0'})
  }
}

/***/ }),

/***/ "./src/modal-yes-no.js":
/*!*****************************!*\
  !*** ./src/modal-yes-no.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ModalYesNo; });
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pillbug.js */ "./lib/pillbug.js");



class ModalYesNo extends _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["Modal"] {
  overlay(h,v,a,p,k,s) {
    return h('div').class('modal-background')
  }
  content(h,v,a,p,k,s) {
    return h('div').class('modal-content modal-animate').inner([
      h('button').text('OK').on({click: e => s.resolve(222521)}),
      h('button').text('Cancel').on({click: e => s.reject('user-cancelled')}),
    ])
  }
}


/***/ }),

/***/ "./src/page-container.js":
/*!*******************************!*\
  !*** ./src/page-container.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageContainer; });
/* harmony import */ var _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pillbug.js */ "./lib/pillbug.js");


class PageContainer extends _lib_pillbug_js__WEBPACK_IMPORTED_MODULE_0__["View"] {
  draw(h,v,a,p,k) {
    this.wrap(h('#page-container')).inner(p)
    a.on('goto', page => this.root.inner(page))
  }
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map