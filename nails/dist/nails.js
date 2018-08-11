/*
How it works:
  A box is created via the constructor (then stashed using a key).


  It can then be flushed, which will force a redraw if it is dirty.
  The redraw identifies all the child boxes to be shown.
  The flush then cascades to them.

  The box object has 4 public methods: constructor, push, flush and getKey (which is static). All the other methods start with _ and are internal.



*/

  /*
  _event(event, callback) {
    let m = this
    let eventName = 'on' + event
    let fn = function() {
      m[fn].apply(this, arguments);
    }
    return {
      eventName: 
    }
  }*/


class Box {
  constructor(data) {
    this._data = data
    this._dirty = true
    this._childBoxes = []
  }
  static getKey() {
    if (this.trackBy !== undefined && arguments.length > 0) {
      return arguments[0][this.trackBy]
    }
    return 'singleton'
  }
  push(data) {
    this._data = data
    this._dirty = true
  }
  flush(force) {
    if (force || this._dirty) {
      this._redraw()
    }
    //todo: cancel this if current element is not visible.
    this._childBoxes.forEach(function(box) {
      box.flush()
    })
  }
  _redraw() {
    let virtual = this.render()
    if (this.element == undefined) {
      this.element = document.createElement(virtual.tag)
    }
    this._childBoxes.length = 0
    this._updateNode(this.element, virtual, this._childBoxes)
    this._dirty = false
  }
  _updateNode(element, virtual, childBoxes) {
    let inner = virtual.inner;
    this._updateElement(element, virtual.atts)
    if (Array.isArray(inner)) {
      this._updateChildren(element, inner, childBoxes)
    } else if (inner !== undefined && inner.isVirtualNode) {
      this._updateNode(element, inner, childBoxes)
    } else {
      // maybe convert to string first?
      if (element.innerHTML !== inner) {
        let old = element.innerHTML
        element.innerHTML = inner
        //c.log(`updated "${old}" to "${inner}"`)
      }
    }
  }
  _updateChildren(element, children, childBoxes) {
    /*
    This function gets called when inner is an array.

    */
    let _this = this
    let fragment = document.createDocumentFragment()
    children.forEach(function(child) {
      let childElement
      if (child instanceof mop.Box) {
        if (child.element == undefined) { 
          // if child box was never bound, render it now.
          child._redraw()
        } else {
          // else add to childBoxes to be flushed once done here.
          childBoxes.push(child)
        }
        childElement = child.element
      } else if (child.isVirtualNode) {
        childElement = document.createElement(child.tag)
        _this._updateNode(childElement, child, childBoxes)
      } else {
        //childElement = document.createTextNode(child);
        //Maybe https://developer.mozilla.org/en-US/docs/Web/API/range/createContextualFragment
        childElement = document.createElement('div')
        childElement.innerHTML = child
      }
      fragment.appendChild(childElement)
    });
    element.innerHTML = ''
    element.appendChild(fragment)
  }
  _updateElement(element, atts) {
    for (var key in atts) {
      let val = atts[key]
      if (key.startsWith('on') && val.startsWith('@')) {
        let call = val.slice(1)
        val = `${this._eventPrefix()}.${call}`
      }
      element.setAttribute(key, val);
    }
  }
  _eventPrefix() {
    if (this._eventPrefixStr == undefined) {
      let c = this.constructor
      this._eventPrefixStr = `mop._box(${c.name}, '${this._key}')`
    }
    return this._eventPrefixStr
  }
  _updateNodeOld(element, virtual, childBoxes) {
    var childElement, fragment, _this = this, inner = virtual.inner;
    this._updateElement(element, virtual.atts)
    if (Array.isArray(inner)) {
      fragment = document.createDocumentFragment()
      inner.forEach(function(child) {
        if (child instanceof mop.Box) {
          if (child.element == undefined) { 
            // if child box was never bound, render it now.
            child._redraw()
          } else {
            // else add to childBoxes to be flushed once done here.
            childBoxes.push(child)
          }
          childElement = child.element
        } else if (child.isVirtualNode) {
          childElement = document.createElement(child.tag)
          _this._updateNode(childElement, child, childBoxes)
        } else {
          //childElement = document.createTextNode(child);
          //Maybe https://developer.mozilla.org/en-US/docs/Web/API/range/createContextualFragment
          childElement = document.createElement('div')
          childElement.innerHTML = child
        }
        fragment.appendChild(childElement)
      });
      element.innerHTML = ''
      element.appendChild(fragment)
    } else if (inner !== undefined && inner.isVirtualNode) {
      _this._updateNode(element, inner, childBoxes)
    } else {
      c.log(element.innerHTML)
      element.innerHTML = inner
    }
  }
}


/*
Gets used by Box register to establish the key
Note that this function has no access to the object itself.
'this' resolves to the prototype (like a static method)
*/


/*
Gets called whenever the box is requested during parent _redraw.
Arguments will be same as init but with changes pushed in front.

This implementation only checks if data has changed.
*/
/*
Recursively applies a definition tree to an element
Definition can be:
  - Box
  - VirtualNode
  - 


function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

*/



ViewModel = function(props) {
  this._watchers = [];
  this._changes = [];
  for (var key in props) {
    this[key] = props[key];
  }
}

ViewModel.prototype.flush = function() { 
  var _this = this;
  this._watchers.forEach(function(watcher){
    watcher.push(_this);
    watcher.flush();
  });
  this._changes.length = [];
}

ViewModel.prototype.action = function(name, fn) {
  this[name] = function() {
    fn.apply(this, arguments);
    this.flush();
  }
}
function extractInner(args) {
  var inner = Array.prototype.slice.call(args, 1);
  if (inner.length == 1) {
    return inner[0];
  }
  return inner;
  //TODO: could also return '' instead, which removes an extra check in applyChanges
}

var mop = {
  Box: Box,
  _boxRegister: {},
  box: function(cls, ...args) {
    className = cls.name
    let key = cls.getKey.apply(cls, args)
    if (key == undefined) {
      return new cls(...args)
    }
    if (!this._boxRegister.hasOwnProperty(className)) {
      this._boxRegister[className] = {}
    }
    let register = this._boxRegister[className]
    if (register.hasOwnProperty(key)) {
      let box = register[key]
      box.push.apply(box, args)
      return box
    } else {
      let box = new cls(...args)
      box._key = key
      register[key] = box
      return box
    }
  },
  _box: function(cls, key) {
    let register = this._boxRegister[cls.name]
    return register[key]
  },
  helpers: function(target, elements) {
    elements.forEach(function(tag) {
      target[tag] = function() {
        return new VirtualNode(tag, arguments[0], extractInner(arguments));
      }
    })
  }
}



function VirtualNode(tag, atts, inner) {
  this.tag = tag.toUpperCase();
  this.inner = inner;
  this.atts = atts;
}
VirtualNode.prototype.isVirtualNode = true;