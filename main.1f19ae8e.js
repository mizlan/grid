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
})({"main.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function Point(x, y) {
  _classCallCheck(this, Point);

  this.x = x;
  this.y = y;
};

var Polygon = function Polygon(points) {
  _classCallCheck(this, Polygon);

  this.points = points;
};

var Circle = function Circle(radius, center) {
  _classCallCheck(this, Circle);

  this.radius = radius;
  this.center = center;
};

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
  } else {
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ")");
  }
}

var App = /*#__PURE__*/function () {
  function App() {
    _classCallCheck(this, App);

    this.colors = ['#9c7979', '#9c9279', '#799c7d', '#798c9c', '#93799c'];
    /* private allShapes: Map<number, Polygon|Circle>; */

    this.lastMousePos = {
      x: 0,
      y: 0
    };
    this.mouseIsDown = false;
    var canvas = document.getElementById('canv');
    var ctx = canvas.getContext('2d');
    this.origin = new Point(0, 0);
    this.ctx = ctx;
    this.canvas = canvas;
    this.addMouseListeners();
    this.stepSize = 50;
    this.stepRange = 1;
    this.resize();
    this.drawBasis();
  }

  _createClass(App, [{
    key: "addMouseListeners",
    value: function addMouseListeners() {
      var _this = this;

      this.canvas.addEventListener('mousedown', function (event) {
        _this.mouseIsDown = true;
        _this.lastMousePos.x = event.x;
        _this.lastMousePos.y = event.y;
      });
      this.canvas.addEventListener('mouseup', function () {
        _this.mouseIsDown = false;
      });
      this.canvas.addEventListener('mousemove', function (event) {
        if (!_this.mouseIsDown) return;

        if (_this.lastMousePos.x !== undefined && _this.lastMousePos.y !== undefined) {
          var mDx = event.x - _this.lastMousePos.x;
          var mDy = event.y - _this.lastMousePos.y;

          _this.shiftOrigin(mDx, mDy);

          _this.drawBasis();

          _this.updateAll();
        }

        _this.lastMousePos.x = event.x;
        _this.lastMousePos.y = event.y;
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      this.canvas.setAttribute('width', window.getComputedStyle(this.canvas, null).getPropertyValue("width"));
      this.canvas.setAttribute('height', window.getComputedStyle(this.canvas, null).getPropertyValue("height"));
      this.origin = new Point(this.canvas.width / 2, this.canvas.height / 2); // for some reason, these values are reset inside this function, so set them back

      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
    }
  }, {
    key: "clearGrid",
    value: function clearGrid() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "shiftOrigin",
    value: function shiftOrigin(deltaX, deltaY) {
      this.origin.x += deltaX;
      this.origin.y += deltaY;
    }
  }, {
    key: "drawBasis",
    value: function drawBasis() {
      // tick marks
      for (var position = this.origin.x + this.stepSize; position < this.canvas.width; position += this.stepSize) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#eeeeee';
        this.ctx.beginPath();
        this.ctx.moveTo(position, 0);
        this.ctx.lineTo(position, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      for (var _position = this.origin.x - this.stepSize; _position > 0; _position -= this.stepSize) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#eeeeee';
        this.ctx.beginPath();
        this.ctx.moveTo(_position, 0);
        this.ctx.lineTo(_position, this.canvas.height);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      for (var _position2 = this.origin.y + this.stepSize; _position2 < this.canvas.height; _position2 += this.stepSize) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#eeeeee';
        this.ctx.beginPath();
        this.ctx.moveTo(0, _position2);
        this.ctx.lineTo(this.canvas.width, _position2);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      for (var _position3 = this.origin.y - this.stepSize; _position3 > 0; _position3 -= this.stepSize) {
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#eeeeee';
        this.ctx.beginPath();
        this.ctx.moveTo(0, _position3);
        this.ctx.lineTo(this.canvas.width, _position3);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      this.ctx.lineWidth = 2;
      this.ctx.fillStyle = '#c9c9c9';
      this.ctx.strokeStyle = '#c9c9c9'; // the origin

      this.ctx.beginPath();
      this.ctx.arc(this.origin.x, this.origin.y, 5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath(); // y axis

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#c9c9c9';
      this.ctx.beginPath();
      this.ctx.moveTo(this.origin.x, 0);
      this.ctx.lineTo(this.origin.x, this.canvas.height);
      this.ctx.stroke();
      this.ctx.closePath(); // x axis

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#c9c9c9';
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.origin.y);
      this.ctx.lineTo(this.canvas.width, this.origin.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    /**
     * locate the actual coordinates of a point on the canvas, given a grid point
     **/

  }, {
    key: "canvLocate",
    value: function canvLocate(point) {
      return new Point(this.origin.x + this.stepSize * point.x / this.stepRange, this.origin.y - this.stepSize * point.y / this.stepRange);
    }
  }, {
    key: "gridPoly",
    value: function gridPoly(points, color) {
      if (points.length === 0) return;
      this.ctx.fillStyle = hexToRGB(color, '0.5');
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 5;
      this.ctx.moveTo(points[0].x, points[0].y);
      this.ctx.beginPath();

      var _iterator = _createForOfIteratorHelper(points),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var point = _step.value;
          var pt = this.canvLocate(point);
          this.ctx.lineTo(pt.x, pt.y);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
    }
  }, {
    key: "addRect",
    value: function addRect(section_id, left, right, top, bottom, color) {
      var points = [];
      points.push(new Point(left, top));
      points.push(new Point(left, bottom));
      points.push(new Point(right, bottom));
      points.push(new Point(right, top));
      this.gridPoly(points, color);
    }
  }, {
    key: "addCirc",
    value: function addCirc(section_id, radius, center, color) {
      /* console.log('in here'); */
      this.ctx.strokeStyle = color;
      this.ctx.fillStyle = hexToRGB(color, '0.5');
      this.ctx.lineWidth = 5;
      this.ctx.beginPath();
      var pt = this.canvLocate(center);
      this.ctx.arc(pt.x, pt.y, radius * this.stepSize, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }, {
    key: "addPoly",
    value: function addPoly(section_id, pts, color) {
      var points = [];

      for (var i = 0; i < pts.length; i += 2) {
        points.push(new Point(pts[i], pts[i + 1]));
      }

      ;
      this.gridPoly(points, color);
    }
  }, {
    key: "isValid",
    value: function isValid(arr) {
      // check for NaN
      var _iterator2 = _createForOfIteratorHelper(arr),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var x = _step2.value;
          if (Number.isNaN(x)) return false;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return true;
    }
  }, {
    key: "isValidRect",
    value: function isValidRect(arr) {
      return this.isValid(arr) && (arr.length === 4 || arr.length === 8);
    }
  }, {
    key: "isValidCirc",
    value: function isValidCirc(arr) {
      return this.isValid(arr) && arr.length === 3;
    }
  }, {
    key: "isValidPoly",
    value: function isValidPoly(arr) {
      return this.isValid(arr) && arr.length % 2 === 0;
    }
  }, {
    key: "updateAll",
    value: function updateAll() {
      var _this2 = this;

      this.clearGrid();
      this.drawBasis();
      var shapeList = document.getElementById('shapes');
      shapeList.childNodes.forEach(function (value, position) {
        var shapeType = value.getElementsByTagName('select')[0].value;
        var numbers = value.getElementsByTagName('textarea')[0].value.trim().split(/ +/).map(function (x) {
          return +x;
        });
        /* let color = hexToRGB(this.colors[position % this.colors.length], '0.5'); */

        var color = _this2.colors[position % _this2.colors.length];

        switch (shapeType) {
          case 'rectangle':
            if (_this2.isValidRect(numbers)) {
              _this2.addRect(position, numbers[0], numbers[1], numbers[2], numbers[3], color);
            }

            break;

          case 'circle':
            if (_this2.isValidCirc(numbers)) {
              _this2.addCirc(position, numbers[0], new Point(numbers[1], numbers[2]), color);
            }

            break;

          case 'polygon':
            if (_this2.isValidPoly(numbers)) {
              _this2.addPoly(position, numbers, color);
            }

            break;

          default:
            break;
        }
      });
    }
  }]);

  return App;
}();

var app = new App();
var addShapeButton = document.getElementById('add');
var shapeList = document.getElementById('shapes');
var shapes = ['rectangle', 'circle', 'square', 'point', 'polygon'];
shapeList.addEventListener('input', function (event) {
  var target = event.target;

  if (target.tagName === 'TEXTAREA') {
    app.updateAll();
  }
}); // add new shapes

addShapeButton.addEventListener('click', function () {
  var li = document.createElement('li');
  var di = document.createElement('div');
  var tx = document.createElement('textarea');
  di.append(tx);
  di.style.width = '100%';
  var se = document.createElement('select');
  li.append(se);
  li.append(di);
  shapeList.append(li);

  var _iterator3 = _createForOfIteratorHelper(shapes),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var shape = _step3.value;
      var option = document.createElement('option');
      option.append(document.createTextNode(shape));
      se.append(option);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
});
window.addEventListener('resize', function () {
  app.resize();
  app.drawBasis();
  app.updateAll();
}); // vim: set fdm=syntax fdl=10: (fold subsections)
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50037" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map