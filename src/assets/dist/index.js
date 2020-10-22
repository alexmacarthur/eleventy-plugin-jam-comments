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
})({"../../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{}],"../../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"../../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../scss/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../../node_modules/graphql-quest/dist/quest.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestClient = n;
exports.quest = t;

async function e({
  endpoint: e,
  fetchOptions: t,
  query: n,
  variables: r
}) {
  const a = {
    query: n,
    variables: JSON.stringify(r)
  },
        {
    method: o = "POST",
    headers: s = {}
  } = t,
        i = "get" === o.toLowerCase(),
        c = i ? function (e, t) {
    const n = new URL(e);

    for (const e in t) n.searchParams.append(e, t[e]);

    return n.toString();
  }(e, a) : e;

  try {
    const e = await fetch(c, {
      method: o.toUpperCase(),
      headers: {
        "Content-Type": "application/" + (i ? "x-www-form-urlencoded" : "json"),
        ...s
      },
      body: i ? null : JSON.stringify(a)
    }),
          {
      data: t,
      errors: n
    } = await e.json(),
          r = {
      data: t
    };
    return n && (r.errors = n), r;
  } catch (e) {
    return {
      errors: [e]
    };
  }
}

async function t(t, n, r = {}, a = {}) {
  return await e({
    endpoint: t,
    query: n,
    variables: r,
    fetchOptions: a
  });
}

function n({
  endpoint: t,
  method: n,
  headers: r
}) {
  return {
    send: async (a, o = {}) => await e({
      endpoint: t,
      query: a,
      variables: o,
      fetchOptions: {
        method: n,
        headers: r
      }
    })
  };
}
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentTime = exports.formatFormValues = exports.toPrettyDate = exports.toIsoString = exports.dateFromUnix = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Given a timestamp, convert it to a Date object.
 *
 * @param {number} unix
 * @return {Date}
 */
var dateFromUnix = function dateFromUnix(unix) {
  return new Date(Number(unix));
};
/**
 * Convert unix timestamp to ISO string.
 *
 * @param {number} unix
 * @return {string}
 */


exports.dateFromUnix = dateFromUnix;

var toIsoString = function toIsoString(unix) {
  return dateFromUnix(unix).toISOString();
};
/**
 * Convert a Unix timestamp to a nice, pretty format.
 *
 * @param {integer} unix
 * @return {string}
 */


exports.toIsoString = toIsoString;

var toPrettyDate = function toPrettyDate(unix) {
  var date = dateFromUnix(unix);
  var hoursOffset = date.getTimezoneOffset() / 60;
  date.setHours(date.getHours() - hoursOffset);
  var dateString = date.toLocaleString("en-US").split(",");
  return dateString[0].trim();
};
/**
 * Given a list of elements, convert the values into an object.
 *
 * @param {NodeList} htmlElementCollection
 * @return {object}
 */


exports.toPrettyDate = toPrettyDate;

var formatFormValues = function formatFormValues(htmlElementCollection) {
  return _toConsumableArray(htmlElementCollection).reduce(function (acc, item) {
    if (!item.name) return acc;
    acc[item.name] = item.value;
    return acc;
  }, {});
};

exports.formatFormValues = formatFormValues;

var getCurrentTime = function getCurrentTime() {
  return new Date().getTime();
};

exports.getCurrentTime = getCurrentTime;
},{}],"queries.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CREATE_COMMENT_QUERY = void 0;
var CREATE_COMMENT_QUERY = "\n  mutation CreateComment(\n    $name: String!,\n    $path: String!,\n    $content: String!,\n    $domain: String!,\n    $emailAddress: String\n  ){\n    createComment(\n      name: $name,\n      path: $path,\n      content: $content,\n      emailAddress: $emailAddress\n      domain: $domain\n    ) {\n      createdAt\n      name\n      emailAddress\n      content\n      id\n      site {\n        domain\n      }\n    }\n  }\n";
exports.CREATE_COMMENT_QUERY = CREATE_COMMENT_QUERY;
},{}],"CommentController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CommentController;

var _graphqlQuest = require("graphql-quest");

var _utils = require("./utils");

var _queries = require("./queries");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CommentController(shell) {
  var minimumSubmissionTime = 1000;
  var loadingSvg = shell.querySelector(".jc-CommentBox-loadingDots");
  var commentList = shell.querySelector('[data-jam-comments-component="list"]');
  var message = shell.querySelector('[data-jam-comments-component="message"]');
  var client = new _graphqlQuest.QuestClient({
    endpoint: "http://localhost:4000/graphql",
    headers: {
      "x-api-key": "JAM_COMMENTS_API_KEY"
    }
  });
  /**
   * When textarea is focused upon, show all inputs.
   *
   * @return {void}
   */

  var listenForTextareaFocus = function listenForTextareaFocus() {
    shell.querySelector('[name="content"]').addEventListener("focus", function (e) {
      _toConsumableArray(shell.querySelectorAll(".jc-CommentBox-contactInput")).forEach(function (i) {
        i.style.display = "flex";
      });
    });
  };
  /**
   * When form is submitted, send to service & respond accordingly.
   *
   * @return {void}
   */


  var listenForSubmission = function listenForSubmission() {
    shell.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      var startTime = (0, _utils.getCurrentTime)();

      var _formatFormValues = (0, _utils.formatFormValues)(e.target.elements),
          content = _formatFormValues.content,
          name = _formatFormValues.name,
          emailAddress = _formatFormValues.emailAddress;

      console.log(shell.dataset.jamCommentsUrl);
      var variables = {
        name: name,
        domain: "JAM_COMMENTS_DOMAIN",
        content: content,
        emailAddress: emailAddress,
        path: shell.dataset.jamCommentsUrl || window.location.pathname
      }; // Show the loading dots.

      loadingSvg.style.display = "";
      client.send(_queries.CREATE_COMMENT_QUERY, variables).then(function (result) {
        var remaining = minimumSubmissionTime - ((0, _utils.getCurrentTime)() - startTime);
        var delay = remaining > 0 ? remaining : 0;

        if (result.errors || !result.data) {
          hideLoadingSvg();
          return showError();
        }

        setTimeout(function () {
          hideLoadingSvg();
          appendComment(result.data.createComment);
        }, delay);
      });
    });
  };
  /**
   * Hide the loading SVG.
   *
   * @return {void}
   */


  var hideLoadingSvg = function hideLoadingSvg() {
    loadingSvg.style.display = "none";
  };
  /**
   * Display a generic error message.
   *
   * @return {void}
   */


  var showError = function showError() {
    message.style.display = "";
    message.firstElementChild.innerText = "Oh no! Something went wrong while trying to submit that comment.";
  };
  /**
   * Clone list item and attach to list of comments with latest comment data.
   *
   * @return {void}
   */


  var appendComment = function appendComment(commentData) {
    var contentKeysToReplace = ['content', 'createdAt', 'name'];
    commentData.createdAt = (0, _utils.toPrettyDate)(commentData.createdAt);
    var id = commentData.id;
    var clonedItem = commentList.querySelector('li').cloneNode(true); // Set the text content for each element piece.

    contentKeysToReplace.forEach(function (property) {
      var node = clonedItem.querySelector("[data-jam-comments-component=\"".concat(property, "\"]"));
      node.innerText = commentData[property];
    });
    clonedItem.querySelectorAll('[data-jam-comments-component="anchor"]').href = "#comment-".concat(id);
    commentList.insertBefore(clonedItem, commentList.firstChild);
  };

  listenForSubmission();
  listenForTextareaFocus();
}
},{"graphql-quest":"../../../node_modules/graphql-quest/dist/quest.es.js","./utils":"utils.js","./queries":"queries.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("../scss/style.scss");

var _CommentController = _interopRequireDefault(require("./CommentController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Initialize each comment form found on the page.
_toConsumableArray(document.querySelectorAll('[data-jam-comments-component="shell"]')).forEach(function (shell) {
  return (0, _CommentController.default)(shell);
});
},{"../scss/style.scss":"../scss/style.scss","./CommentController":"CommentController.js"}],"../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51362" + '/');

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
},{}]},{},["../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map