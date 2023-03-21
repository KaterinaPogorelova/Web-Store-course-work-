// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7f5ju":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "e09e90c293a1cfee";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"7zL1X":[function(require,module,exports) {
var _elemCreatorJs = require("./elemCreator.js");
var _basketCounterJs = require("./basketCounter.js");
var _fastReviewJs = require("./fastReview.js");
var _addToCartJs = require("./addToCart.js");
var _basketJs = require("./basket.js");
// Gets product cards from the server
function getProductCards() {
    fetch(`https://6405d1c4eed195a99f8d974d.mockapi.io/api/items`).then((response)=>response.json()).then((json)=>{
        for (const object of json)renderCards(object);
    }).catch((error)=>console.log(error));
}
getProductCards();
//Draws product cards on the page
function renderCards({ title , currentPrice , beforePrice , imgSrc , needSizes , id  }) {
    const trendsItemWrapper = document.querySelector(".trends__item-wrapper");
    const trendsItem = (0, _elemCreatorJs.createElementTag)("div", [
        "trends__item"
    ], {
        id: id
    });
    trendsItemWrapper.append(trendsItem);
    const ItemImgWrapper = (0, _elemCreatorJs.createElementTag)("div", [
        "item__img-wrapper"
    ], {});
    trendsItem.append(ItemImgWrapper);
    const image = (0, _elemCreatorJs.createElementTag)("img", [], {
        src: imgSrc,
        alt: title
    });
    ItemImgWrapper.append(image);
    const buttonReview = (0, _elemCreatorJs.createElementTag)("button", [
        "img-wrapper__button_review"
    ], {});
    ItemImgWrapper.append(buttonReview);
    buttonReview.textContent = "FAST REVIEW";
    ItemImgWrapper.addEventListener("mouseover", ()=>{
        buttonReview.style.display = "block";
    });
    ItemImgWrapper.addEventListener("mouseout", ()=>{
        buttonReview.style.display = "none";
    });
    buttonReview.addEventListener("click", ()=>{
        (0, _fastReviewJs.generateItemFastReview)(title, currentPrice, id, beforePrice, image.src, needSizes);
    });
    if (needSizes) generateSizeSystem(ItemImgWrapper, title, currentPrice, imgSrc, needSizes, id);
    const buttonCard = (0, _elemCreatorJs.createElementTag)("button", [
        "img-wrapper__button_cart-add"
    ], {});
    ItemImgWrapper.append(buttonCard);
    buttonCard.insertAdjacentHTML("afterbegin", '<svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg"> <path d="M31.6667 33.6667H2.33333C1.8471 33.6667 1.38079 33.4911 1.03697 33.1786C0.693154 32.866 0.5 32.4421 0.5 32V2.00004C0.5 1.55801 0.693154 1.13409 1.03697 0.821529C1.38079 0.508969 1.8471 0.333374 2.33333 0.333374H31.6667C32.1529 0.333374 32.6192 0.508969 32.963 0.821529C33.3068 1.13409 33.5 1.55801 33.5 2.00004V32C33.5 32.4421 33.3068 32.866 32.963 33.1786C32.6192 33.4911 32.1529 33.6667 31.6667 33.6667ZM29.8333 30.3334V3.66671H4.16667V30.3334H29.8333ZM11.5 7.00004V10.3334C11.5 11.6595 12.0795 12.9312 13.1109 13.8689C14.1424 14.8066 15.5413 15.3334 17 15.3334C18.4587 15.3334 19.8576 14.8066 20.8891 13.8689C21.9205 12.9312 22.5 11.6595 22.5 10.3334V7.00004H26.1667V10.3334C26.1667 12.5435 25.2009 14.6631 23.4818 16.2259C21.7627 17.7887 19.4312 18.6667 17 18.6667C14.5688 18.6667 12.2373 17.7887 10.5182 16.2259C8.7991 14.6631 7.83333 12.5435 7.83333 10.3334V7.00004H11.5Z" fill="#0D0D0E" /></svg>');
    buttonCard.addEventListener("click", ()=>{
        btnaddProducttoCart(ItemImgWrapper, title, currentPrice, id, imgSrc, needSizes);
    });
    const sale = (0, _elemCreatorJs.createElementTag)("p", [
        "img-wrapper__sale"
    ], {});
    sale.textContent = countPercent(currentPrice, beforePrice);
    ItemImgWrapper.append(sale);
    const priceWrapper = (0, _elemCreatorJs.createElementTag)("div", [
        "item__price-wrapper"
    ], {});
    trendsItem.append(priceWrapper);
    const price = (0, _elemCreatorJs.createElementTag)("p", [
        "item__price"
    ], {});
    price.textContent = `${currentPrice}$`;
    priceWrapper.append(price);
    const priceBeforeSale = (0, _elemCreatorJs.createElementTag)("p", [
        "item__price",
        "item__price-before-sale"
    ], {});
    priceBeforeSale.textContent = `${beforePrice}$`;
    priceWrapper.append(priceBeforeSale);
    const itemTitle = (0, _elemCreatorJs.createElementTag)("h3", [
        "item__title"
    ], {});
    itemTitle.textContent = title;
    trendsItem.append(itemTitle);
}
//Generates size system, if it's needed
function generateSizeSystem(wrapper, title, currentPrice, imgSrc, needSizes, id) {
    const sizesWrap = (0, _elemCreatorJs.createElementTag)("ul", [
        "img-wrapper__sizes"
    ], {});
    wrapper.append(sizesWrap);
    const sizeLiXS = (0, _elemCreatorJs.createElementTag)("li", [
        "sizes__size"
    ], {});
    sizesWrap.append(sizeLiXS);
    const btnXS = (0, _elemCreatorJs.createElementTag)("button", [
        "sizes__button"
    ], {});
    btnXS.innerText = "XS";
    sizeLiXS.append(btnXS);
    const sizeLiS = (0, _elemCreatorJs.createElementTag)("li", [
        "sizes__size"
    ], {});
    sizesWrap.append(sizeLiS);
    const btnS = (0, _elemCreatorJs.createElementTag)("button", [
        "sizes__button"
    ], {});
    btnS.innerText = "S";
    sizeLiS.append(btnS);
    const sizeLiM = (0, _elemCreatorJs.createElementTag)("li", [
        "sizes__size"
    ], {});
    sizesWrap.append(sizeLiM);
    const btnM = (0, _elemCreatorJs.createElementTag)("button", [
        "sizes__button"
    ], {});
    btnM.innerText = "M";
    sizeLiM.append(btnM);
    const sizeLiL = (0, _elemCreatorJs.createElementTag)("li", [
        "sizes__size"
    ], {});
    sizesWrap.append(sizeLiL);
    const btnL = (0, _elemCreatorJs.createElementTag)("button", [
        "sizes__button"
    ], {});
    btnL.innerText = "L";
    sizeLiL.append(btnL);
    const sizeLiXL = (0, _elemCreatorJs.createElementTag)("li", [
        "sizes__size"
    ], {});
    sizesWrap.append(sizeLiXL);
    const btnXL = (0, _elemCreatorJs.createElementTag)("button", [
        "sizes__button"
    ], {});
    btnXL.innerText = "XL";
    sizeLiXL.append(btnXL);
    sizesWrap.addEventListener("click", ()=>{
        sizeaddProducttoCart(sizesWrap, title, currentPrice, id, imgSrc, needSizes);
    });
}
//Adds product to cart, (button animation)
function btnaddProducttoCart(wrapper, title, currentPrice, id, imgSrc, needSizes) {
    if (!localStorage.hasOwnProperty("cart")) return;
    if (needSizes) {
        //Opens and closes sizes table only, clicking on needed size will add product to the cart 
        const sizesWrap = wrapper.children[2];
        sizesWrap.classList.toggle("img-wrapper__sizes--active");
    } else {
        let exist = (0, _addToCartJs.existInStorage)(id);
        if (!exist) {
            (0, _addToCartJs.addCardtoStorage)(title, currentPrice, id, imgSrc, needSizes);
            (0, _basketJs.draWNewCard)(id, needSizes);
            (0, _basketCounterJs.increaseCartCount)();
        } else (0, _addToCartJs.increaseItemCount)(id);
        (0, _basketJs.changeTotalSum)();
        (0, _addToCartJs.addtoCartPopUp)();
    }
}
//Adds product to cart, (size buttons animation)
function sizeaddProducttoCart(sizesWrap, title, currentPrice, id, imgSrc, needSizes) {
    if (!localStorage.hasOwnProperty("cart")) return;
    const sizeTarget = event.target.closest("button");
    let selectedSize = sizeTarget.innerText;
    let exist = (0, _addToCartJs.existInStorage)(id, needSizes, selectedSize);
    if (!exist) {
        if (needSizes) {
            (0, _addToCartJs.addCardtoStorage)(title, currentPrice, id, imgSrc, needSizes, selectedSize);
            (0, _basketJs.draWNewCard)(id, needSizes, selectedSize);
        } else {
            (0, _addToCartJs.addCardtoStorage)(title, currentPrice, id, imgSrc, needSizes);
            (0, _basketJs.draWNewCard)(id, needSizes);
        }
        (0, _basketCounterJs.increaseCartCount)();
    } else (0, _addToCartJs.increaseItemCount)(id, needSizes, selectedSize);
    (0, _basketJs.changeTotalSum)();
    (0, _addToCartJs.addtoCartPopUp)();
    sizesWrap.classList.remove("img-wrapper__sizes--active");
}
// Calculates the discount percentage
function countPercent(currentPrice, beforePrice) {
    return Math.round(100 - currentPrice / beforePrice * 100) + "%";
}

},{"./elemCreator.js":"20Jzo","./basketCounter.js":"54VTX","./fastReview.js":"lnNfd","./addToCart.js":"9FVlh","./basket.js":"igkur"}],"lnNfd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
//Generates product's fast review window 
parcelHelpers.export(exports, "generateItemFastReview", ()=>generateItemFastReview);
var _elemCreatorJs = require("./elemCreator.js");
var _basketCounterJs = require("./basketCounter.js");
var _addToCartJs = require("./addToCart.js");
var _basketJs = require("./basket.js");
let selectedSize = "";
function generateItemFastReview(title, currentPrice, id, beforePrice, source, needSizes) {
    const darkBack = (0, _elemCreatorJs.createElementTag)("div", [
        "dark-back"
    ], {});
    document.body.append(darkBack);
    const fullItem = (0, _elemCreatorJs.createElementTag)("div", [
        "trend__item-full"
    ], {});
    document.body.append(fullItem);
    const close = (0, _elemCreatorJs.createElementTag)("div", [
        "close"
    ], {});
    fullItem.append(close);
    const imgWrap = (0, _elemCreatorJs.createElementTag)("div", [
        "item-full__img-wrapper"
    ], {});
    fullItem.append(imgWrap);
    const img = (0, _elemCreatorJs.createElementTag)("img", [], {
        src: source,
        alt: title
    });
    imgWrap.append(img);
    const fullInfoWrap = (0, _elemCreatorJs.createElementTag)("div", [
        "item-full__info-wrapper"
    ], {});
    fullItem.append(fullInfoWrap);
    const fullInfo = (0, _elemCreatorJs.createElementTag)("div", [
        "item-full__info"
    ], {});
    fullInfoWrap.append(fullInfo);
    const itemTitle = (0, _elemCreatorJs.createElementTag)("h2", [
        "item-full__title"
    ], {});
    itemTitle.innerText = title;
    fullInfo.append(itemTitle);
    const itemPrices = (0, _elemCreatorJs.createElementTag)("div", [
        "item__prices"
    ], {});
    fullInfo.append(itemPrices);
    const fullCurrentPrice = (0, _elemCreatorJs.createElementTag)("p", [
        "item__price",
        "item__item__current-price",
        "item__price--full"
    ], {});
    itemPrices.append(fullCurrentPrice);
    const salePrice = (0, _elemCreatorJs.createElementTag)("span", [
        "sale-price"
    ], {});
    salePrice.innerText = currentPrice;
    fullCurrentPrice.innerText = "$";
    fullCurrentPrice.prepend(salePrice);
    const fullBeforePrice = (0, _elemCreatorJs.createElementTag)("p", [
        "item__price",
        "item__price-before-sale",
        "item__price--full"
    ], {});
    itemPrices.append(fullBeforePrice);
    const price = (0, _elemCreatorJs.createElementTag)("span", [
        "price"
    ], {});
    price.innerText = beforePrice;
    fullBeforePrice.innerText = "$";
    fullBeforePrice.prepend(price);
    if (needSizes) generateFastReviewSizeSystem(fullInfoWrap);
    const buttonFullCart = document.createElement("button");
    buttonFullCart.classList.add("item-full__button-cart");
    buttonFullCart.innerText = "Add to Cart";
    fullInfoWrap.append(buttonFullCart);
    buttonFullCart.addEventListener("click", ()=>{
        addToCartFastReview(title, currentPrice, id, source, needSizes, selectedSize);
    });
    close.addEventListener("click", ()=>{
        fullItem.remove();
        darkBack.remove();
    });
}
//Addes product to the cart in fast review window
function addToCartFastReview(title, currentPrice, id, source, needSizes, selectedSize) {
    if (!localStorage.hasOwnProperty("cart")) return;
    if (needSizes && selectedSize === "") {
        chooseSizePopUp();
        return;
    } else {
        let exist = (0, _addToCartJs.existInStorage)(id, needSizes, selectedSize);
        if (!exist) {
            if (needSizes) {
                (0, _addToCartJs.addCardtoStorage)(title, currentPrice, id, source, needSizes, selectedSize);
                (0, _basketJs.draWNewCard)(id, needSizes, selectedSize);
                selectedSize = "";
            } else {
                (0, _addToCartJs.addCardtoStorage)(title, currentPrice, id, source, needSizes);
                (0, _basketJs.draWNewCard)(id, needSizes);
            }
            (0, _basketCounterJs.increaseCartCount)();
            (0, _basketJs.changeTotalSum)();
        } else if (needSizes) {
            (0, _addToCartJs.increaseItemCount)(id, needSizes, selectedSize);
            selectedSize = "";
        } else (0, _addToCartJs.increaseItemCount)(id, needSizes);
        (0, _addToCartJs.addtoCartPopUp)();
    }
}
//Generates size system in the product's fast review window
function generateFastReviewSizeSystem(wrapper) {
    const ulSizes = (0, _elemCreatorJs.createElementTag)("ul", [
        "item-full__sizes"
    ], {});
    wrapper.append(ulSizes);
    const XS = (0, _elemCreatorJs.createElementTag)("li", [
        "item-full__size"
    ], {});
    ulSizes.append(XS);
    const labelXS = (0, _elemCreatorJs.createElementTag)("label", [
        "size__value"
    ], {});
    labelXS.innerText = "XS";
    XS.append(labelXS);
    const S = (0, _elemCreatorJs.createElementTag)("li", [
        "item-full__size"
    ], {});
    ulSizes.append(S);
    const labelS = (0, _elemCreatorJs.createElementTag)("label", [
        "size__value"
    ], {});
    labelS.innerText = "S";
    S.append(labelS);
    const M = (0, _elemCreatorJs.createElementTag)("li", [
        "item-full__size"
    ], {});
    ulSizes.append(M);
    const labelM = (0, _elemCreatorJs.createElementTag)("label", [
        "size__value"
    ], {});
    labelM.innerText = "M";
    M.append(labelM);
    const L = (0, _elemCreatorJs.createElementTag)("li", [
        "item-full__size"
    ], {});
    ulSizes.append(L);
    const labelL = (0, _elemCreatorJs.createElementTag)("label", [
        "size__value"
    ], {});
    labelL.innerText = "L";
    L.append(labelL);
    const XL = (0, _elemCreatorJs.createElementTag)("li", [
        "item-full__size"
    ], {});
    ulSizes.append(XL);
    const labelXL = (0, _elemCreatorJs.createElementTag)("label", [
        "size__value"
    ], {});
    labelXL.innerText = "XL";
    XL.append(labelXL);
    selectSize(ulSizes);
}
//Selects the size, depending on the user's choice, to be added to the cart
function selectSize(sizes) {
    const allSizes = sizes.children;
    for (const elem of allSizes)elem.addEventListener("click", ()=>{
        elem.classList.toggle("item-full__size--selected");
        selectedSize = elem.firstElementChild.innerText;
        for(let i = 0; i < allSizes.length; i++){
            if (allSizes[i] !== elem) {
                if (allSizes[i].classList.contains("item-full__size--selected")) allSizes[i].classList.remove("item-full__size--selected");
            }
        }
    });
}
//If user didn't choose the size, creats pop-up
function chooseSizePopUp() {
    const popup = document.createElement("p");
    popup.classList.add("pop-up");
    popup.innerText = "Please, select the size";
    document.body.append(popup);
    setTimeout(()=>{
        popup.remove();
    }, 2000);
}

},{"./elemCreator.js":"20Jzo","./basketCounter.js":"54VTX","./addToCart.js":"9FVlh","./basket.js":"igkur","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["7f5ju","7zL1X"], "7zL1X", "parcelRequirecc8e")

//# sourceMappingURL=index.93a1cfee.js.map
