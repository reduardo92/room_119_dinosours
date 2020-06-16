// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/match.js":[function(require,module,exports) {
var draggableElements = document.querySelectorAll('.draggable');
var droppableElements = document.querySelectorAll('.droppable');
draggableElements.forEach(function (elem) {
  elem.addEventListener('dragstart', dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
  // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
  // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete
});
droppableElements.forEach(function (elem) {
  elem.addEventListener('dragenter', dragEnter); // Fires when a dragged item enters a valid drop target

  elem.addEventListener('dragover', dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone

  elem.addEventListener('dragleave', dragLeave); // Fires when a dragged item leaves a valid drop target

  elem.addEventListener('drop', drop); // Fires when an item is dropped on a valid drop target
}); // Drag and Drop Functions
//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData('text', event.target.id); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
} //Events fired on the drop target


function dragEnter(event) {
  if (!event.target.classList.contains('dropped')) {
    event.target.classList.add('droppable-hover');
  }
}

function dragOver(event) {
  if (!event.target.classList.contains('dropped')) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if (!event.target.classList.contains('dropped')) {
    event.target.classList.remove('droppable-hover');
  }
}

function drop(event) {
  event.preventDefault(); // This is in order to prevent the browser default handling of the data

  event.target.classList.remove('droppable-hover');
  var draggableElementData = event.dataTransfer.getData('text'); // Get the dragged data. This method will return any data that was set to the same type in the setData() method

  var droppableElementData = event.target.getAttribute('data-draggable-id');
  var isCorrectMatching = draggableElementData === droppableElementData;

  if (isCorrectMatching) {
    var draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add('dropped'); // event.target.style.backgroundColor = draggableElement.style.color; // This approach works only for inline styles. A more general approach would be the following:

    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    draggableElement.classList.add('dragged');
    draggableElement.setAttribute('draggable', 'false');
    event.target.insertAdjacentHTML('afterbegin', "<i class=\"fas fa-".concat(draggableElementData, "\"></i>"));
  }
}
},{}],"js/word.js":[function(require,module,exports) {
var boxElements = document.querySelectorAll('.box');
boxElements.forEach(function (elem) {
  elem.addEventListener('dragstart', dragStart); // elem.addEventListener("drag", drag);

  elem.addEventListener('dragend', dragEnd);
  elem.addEventListener('dragenter', dragEnter);
  elem.addEventListener('dragover', dragOver);
  elem.addEventListener('dragleave', dragLeave);
  elem.addEventListener('drop', drop);
}); // Drag and Drop Functions

function dragStart(event) {
  event.target.classList.add('drag-start');
  event.dataTransfer.setData('text', event.target.id);
}

function dragEnd(event) {
  event.target.classList.remove('drag-start');
}

function dragEnter(event) {
  if (!event.target.classList.contains('drag-start')) {
    event.target.classList.add('drag-enter');
  }
}

function dragOver(event) {
  event.preventDefault();
}

function dragLeave(event) {
  event.target.classList.remove('drag-enter');
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove('drag-enter');
  var draggableElementId = event.dataTransfer.getData('text');
  var droppableElementId = event.target.id;

  if (draggableElementId !== droppableElementId) {
    var draggableElement = document.getElementById(draggableElementId);
    var droppableElementBgColor = event.target.style.backgroundColor;
    var droppableElementTextContent = event.target.querySelector('span').textContent;
    event.target.style.backgroundColor = draggableElement.style.backgroundColor;
    event.target.querySelector('span').textContent = draggableElement.querySelector('span').textContent;
    event.target.id = draggableElementId;
    draggableElement.style.backgroundColor = droppableElementBgColor;
    draggableElement.querySelector('span').textContent = droppableElementTextContent;
    draggableElement.id = droppableElementId;
  }
}
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\img\\dinoNumbers\\0.png":[["0.c7c07da1.png","img/dinoNumbers/0.png"],"img/dinoNumbers/0.png"],"./..\\img\\dinoNumbers\\1.png":[["1.6c331d2a.png","img/dinoNumbers/1.png"],"img/dinoNumbers/1.png"],"./..\\img\\dinoNumbers\\2.png":[["2.bcfb4529.png","img/dinoNumbers/2.png"],"img/dinoNumbers/2.png"],"./..\\img\\dinoNumbers\\3.png":[["3.cba2bdb1.png","img/dinoNumbers/3.png"],"img/dinoNumbers/3.png"],"./..\\img\\dinoNumbers\\4.png":[["4.8f38a348.png","img/dinoNumbers/4.png"],"img/dinoNumbers/4.png"],"./..\\img\\dinoNumbers\\5.png":[["5.125e3d6a.png","img/dinoNumbers/5.png"],"img/dinoNumbers/5.png"],"./..\\img\\dinoNumbers\\6.png":[["6.c4f72956.png","img/dinoNumbers/6.png"],"img/dinoNumbers/6.png"],"./..\\img\\dinoNumbers\\7.png":[["7.e9ce1379.png","img/dinoNumbers/7.png"],"img/dinoNumbers/7.png"],"./..\\img\\dinoNumbers\\8.png":[["8.3c6f8e9e.png","img/dinoNumbers/8.png"],"img/dinoNumbers/8.png"],"./..\\img\\dinoNumbers\\9.png":[["9.e8e439b1.png","img/dinoNumbers/9.png"],"img/dinoNumbers/9.png"],"./..\\img\\dinoNumbers\\10.png":[["10.438520e6.png","img/dinoNumbers/10.png"],"img/dinoNumbers/10.png"],"./..\\img\\dinoNumbers\\11.png":[["11.bb9dcaf1.png","img/dinoNumbers/11.png"],"img/dinoNumbers/11.png"],"./..\\img\\dinoNumbers\\12.png":[["12.f1498f22.png","img/dinoNumbers/12.png"],"img/dinoNumbers/12.png"],"./..\\img\\dinoNumbers\\13.png":[["13.0fc18665.png","img/dinoNumbers/13.png"],"img/dinoNumbers/13.png"],"./..\\img\\dinoNumbers\\14.png":[["14.69e2258b.png","img/dinoNumbers/14.png"],"img/dinoNumbers/14.png"],"./..\\img\\dinoNumbers\\15.png":[["15.35497787.png","img/dinoNumbers/15.png"],"img/dinoNumbers/15.png"],"./..\\img\\dinoNumbers\\16.png":[["16.e184e328.png","img/dinoNumbers/16.png"],"img/dinoNumbers/16.png"],"./..\\img\\dinoNumbers\\17.png":[["17.02dd9300.png","img/dinoNumbers/17.png"],"img/dinoNumbers/17.png"],"./..\\img\\dinoNumbers\\18.png":[["18.d4b83929.png","img/dinoNumbers/18.png"],"img/dinoNumbers/18.png"],"./..\\img\\dinoNumbers\\19.png":[["19.79a1df0c.png","img/dinoNumbers/19.png"],"img/dinoNumbers/19.png"],"./..\\img\\dinoNumbers\\20.png":[["20.bfa5c4ed.png","img/dinoNumbers/20.png"],"img/dinoNumbers/20.png"],"./..\\img\\dinoAlpha\\a.png":[["a.f6083b96.png","img/dinoAlpha/a.png"],"img/dinoAlpha/a.png"],"./..\\img\\dinoAlpha\\b.png":[["b.63f0e36a.png","img/dinoAlpha/b.png"],"img/dinoAlpha/b.png"],"./..\\img\\dinoAlpha\\c.png":[["c.bfcb7fbf.png","img/dinoAlpha/c.png"],"img/dinoAlpha/c.png"],"./..\\img\\dinoAlpha\\d.png":[["d.e91b7da7.png","img/dinoAlpha/d.png"],"img/dinoAlpha/d.png"],"./..\\img\\dinoAlpha\\e.png":[["e.953811df.png","img/dinoAlpha/e.png"],"img/dinoAlpha/e.png"],"./..\\img\\dinoAlpha\\f.png":[["f.ad1d52a4.png","img/dinoAlpha/f.png"],"img/dinoAlpha/f.png"],"./..\\img\\dinoAlpha\\g.png":[["g.9ea36251.png","img/dinoAlpha/g.png"],"img/dinoAlpha/g.png"],"./..\\img\\dinoAlpha\\h.png":[["h.329586da.png","img/dinoAlpha/h.png"],"img/dinoAlpha/h.png"],"./..\\img\\dinoAlpha\\i.png":[["i.ae9a37ff.png","img/dinoAlpha/i.png"],"img/dinoAlpha/i.png"],"./..\\img\\dinoAlpha\\j.png":[["j.58dd3a46.png","img/dinoAlpha/j.png"],"img/dinoAlpha/j.png"],"./..\\img\\dinoAlpha\\k.png":[["k.159216f1.png","img/dinoAlpha/k.png"],"img/dinoAlpha/k.png"],"./..\\img\\dinoAlpha\\l.png":[["l.66d794ec.png","img/dinoAlpha/l.png"],"img/dinoAlpha/l.png"],"./..\\img\\dinoAlpha\\m.png":[["m.52da1ae2.png","img/dinoAlpha/m.png"],"img/dinoAlpha/m.png"],"./..\\img\\dinoAlpha\\n.png":[["n.97864af0.png","img/dinoAlpha/n.png"],"img/dinoAlpha/n.png"],"./..\\img\\dinoAlpha\\o.png":[["o.80fcbf60.png","img/dinoAlpha/o.png"],"img/dinoAlpha/o.png"],"./..\\img\\dinoAlpha\\p.png":[["p.5e75b974.png","img/dinoAlpha/p.png"],"img/dinoAlpha/p.png"],"./..\\img\\dinoAlpha\\q.png":[["q.0be2bc1b.png","img/dinoAlpha/q.png"],"img/dinoAlpha/q.png"],"./..\\img\\dinoAlpha\\r.png":[["r.641922b8.png","img/dinoAlpha/r.png"],"img/dinoAlpha/r.png"],"./..\\img\\dinoAlpha\\s.png":[["s.72706e70.png","img/dinoAlpha/s.png"],"img/dinoAlpha/s.png"],"./..\\img\\dinoAlpha\\t.png":[["t.999be672.png","img/dinoAlpha/t.png"],"img/dinoAlpha/t.png"],"./..\\img\\dinoAlpha\\u.png":[["u.359171cc.png","img/dinoAlpha/u.png"],"img/dinoAlpha/u.png"],"./..\\img\\dinoAlpha\\v.png":[["v.8c39bb3b.png","img/dinoAlpha/v.png"],"img/dinoAlpha/v.png"],"./..\\img\\dinoAlpha\\w.png":[["w.651818b7.png","img/dinoAlpha/w.png"],"img/dinoAlpha/w.png"],"./..\\img\\dinoAlpha\\x.png":[["x.dae0f9c2.png","img/dinoAlpha/x.png"],"img/dinoAlpha/x.png"],"./..\\img\\dinoAlpha\\y.png":[["y.d4e77739.png","img/dinoAlpha/y.png"],"img/dinoAlpha/y.png"],"./..\\img\\dinoAlpha\\z.png":[["z.26a7d897.png","img/dinoAlpha/z.png"],"img/dinoAlpha/z.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

require("../js/match");

require("../js/word");

require("./../scss/main.scss");
},{"../js/match":"js/match.js","../js/word":"js/word.js","./../scss/main.scss":"scss/main.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59468" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map