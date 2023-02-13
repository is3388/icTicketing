(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./api/build-client.js":
/*!*****************************!*\
  !*** ./api/build-client.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
 // helper file to create a different copy of axios depending on our app running on Kubernetes cluster or on the browser
// take incoming request with headers and env and then use logic to build a preconfig version of axios 
// that work on the current env
// req is the object what receive from the NextJS app and inside it has headers contains host and cookie etc
// we need to run this buildClient function before running getInitialProps bc need to know our app running on server or on browser

const buildClient = ({
  req
}) => {
  // window object only exists on browser not server
  if (true) {
    // we are on the server,  we are running our app or rendering our app on Kubernetes cluster during the 
    // server side rendering phase
    // axios.create() to create an instance of axios
    return axios__WEBPACK_IMPORTED_MODULE_0___default().create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {}
};

/* harmony default export */ __webpack_exports__["default"] = (buildClient);

/***/ }),

/***/ "./components/header.js":
/*!******************************!*\
  !*** ./components/header.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);

var _jsxFileName = "C:\\Users\\Dell8\\microservices\\ticketing\\client\\components\\header.js";
 // currentUser can get access because coming from parent App component

const Header = ({
  currentUser
}) => {
  const links = [!currentUser && {
    label: 'Sign Up',
    href: '/auth/signup'
  }, !currentUser && {
    label: 'Sign In',
    href: '/auth/signin'
  }, currentUser && {
    label: 'Sell Tickets',
    href: '/tickets/new'
  }, currentUser && {
    label: 'My Orders',
    href: '/orders'
  }, currentUser && {
    label: 'Sign Out',
    href: '/auth/signout'
  }].filter(linkConfig => linkConfig) // filter out any entry is false
  .map(({
    label,
    href
  }) => {
    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("li", {
      className: "nav-item",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: href,
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("a", {
          className: "nav-link",
          children: label
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 15,
          columnNumber: 17
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 15
      }, undefined)
    }, href, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 14
    }, undefined);
  });
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    className: "container-fluid",
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("nav", {
      className: "navbar navbar-light bg-light",
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: "/",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("a", {
          className: "navbar-brand",
          children: "GitTix"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 9
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 7
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "d-flex justify-content-end",
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("ul", {
          className: "nav d-flex align-items-center",
          children: links
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 30,
          columnNumber: 9
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 7
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 22,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ "./node_modules/bootstrap/dist/css/bootstrap.css");
/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_build_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/build-client */ "./api/build-client.js");
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/header */ "./components/header.js");

var _jsxFileName = "C:\\Users\\Dell8\\microservices\\ticketing\\client\\pages\\_app.js";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // this file for next.js to wraps up each component inside pages directory into its own
// default Component called app in order to apply styling for the whole nextjs project

const AppComponent = ({
  Component,
  pageProps,
  currentUser
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_header__WEBPACK_IMPORTED_MODULE_3__.default, {
        currentUser: currentUser ? currentUser : ""
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
      className: "container",
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({
        currentUser: currentUser
      }, pageProps), void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 7
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 14,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, undefined);
}; // NextJS server issue when getInitialProps get called, it will block component to call getInitialProps()
// the argument passing to getInitialProps for this custom App Component is not simple req and res
// it is nested inside ctx object - context === {Component, ctx: {req, res}}

/* AppComponent is the parent of all child components LandingPage, ShowTicketPage, ShowOrderPage.
   When the user navigates to the root, nextjs finds index.js which shows the LandingPage Component
   Next calls the App's getInitialProps function by default which defined in AppComponent
   and fetch some data in this case is to find out who the current user is.
   Then we manually invoke the LandingPage's getInitialProps function too */


AppComponent.getInitialProps = async appContext => {
  //console.log(Object.keys(appContext)) // 'Component, 'router', 'ctx'
  const client = (0,_api_build_client__WEBPACK_IMPORTED_MODULE_2__.default)(appContext.ctx);
  const {
    data
  } = await client.get('/api/users/currentuser'); // we manually invoke getInitialProps for individual page like LandingPage, SignIn, SignUp page so that can access currentUser state

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    // if this child component to be displayed has getInitialProps function, if yes, call it
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  } //console.log(pageProps)
  // return info will be showed up as Props on the top and pass it down to the child component as a prop
  // <Component {...pageProps} /> see the frontend code


  return _objectSpread({
    pageProps
  }, data); // or currentUser: data.currentUser
};

/* harmony default export */ __webpack_exports__["default"] = (AppComponent);

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ "../next-server/lib/router-context":
/*!**************************************************************!*\
  !*** external "next/dist/next-server/lib/router-context.js" ***!
  \**************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ "../next-server/lib/router/utils/get-asset-path-from-route":
/*!**************************************************************************************!*\
  !*** external "next/dist/next-server/lib/router/utils/get-asset-path-from-route.js" ***!
  \**************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-is");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "?ca47":
/*!******************************************!*\
  !*** ./utils/resolve-rewrites (ignored) ***!
  \******************************************/
/***/ (function() {

/* (ignored) */

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, ["vendors-node_modules_bootstrap_dist_css_bootstrap_css-node_modules_next_link_js"], function() { return __webpack_exec__("./pages/_app.js"); });
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9hcGkvYnVpbGQtY2xpZW50LmpzIiwid2VicGFjazovL2NsaWVudC8uL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL19hcHAuanMiLCJ3ZWJwYWNrOi8vY2xpZW50L2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9jbGllbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0LmpzXCIiLCJ3ZWJwYWNrOi8vY2xpZW50L2V4dGVybmFsIFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZS5qc1wiIiwid2VicGFjazovL2NsaWVudC9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vY2xpZW50L2V4dGVybmFsIFwicmVhY3QtaXNcIiIsIndlYnBhY2s6Ly9jbGllbnQvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9jbGllbnQvaWdub3JlZHxDOlxcVXNlcnNcXERlbGw4XFxtaWNyb3NlcnZpY2VzXFx0aWNrZXRpbmdcXGNsaWVudFxcbm9kZV9tb2R1bGVzXFxuZXh0XFxkaXN0XFxuZXh0LXNlcnZlclxcbGliXFxyb3V0ZXJ8Li91dGlscy9yZXNvbHZlLXJld3JpdGVzIl0sIm5hbWVzIjpbImJ1aWxkQ2xpZW50IiwicmVxIiwiYXhpb3MiLCJiYXNlVVJMIiwiaGVhZGVycyIsIkhlYWRlciIsImN1cnJlbnRVc2VyIiwibGlua3MiLCJsYWJlbCIsImhyZWYiLCJmaWx0ZXIiLCJsaW5rQ29uZmlnIiwibWFwIiwiQXBwQ29tcG9uZW50IiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiZ2V0SW5pdGlhbFByb3BzIiwiYXBwQ29udGV4dCIsImNsaWVudCIsImN0eCIsImRhdGEiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7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QTtBQUFBO0FBQUE7QUFBQSxpQkFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERjtBQVdELENBYkQsQyxDQWNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQUYsWUFBWSxDQUFDRyxlQUFiLEdBQStCLE1BQU9DLFVBQVAsSUFBc0I7QUFDcEQ7QUFDQSxRQUFNQyxNQUFNLEdBQUdsQiwwREFBVyxDQUFDaUIsVUFBVSxDQUFDRSxHQUFaLENBQTFCO0FBQ0EsUUFBTTtBQUFDQztBQUFELE1BQVMsTUFBTUYsTUFBTSxDQUFDRyxHQUFQLENBQVcsd0JBQVgsQ0FBckIsQ0FIb0QsQ0FJcEQ7O0FBQ0EsTUFBSU4sU0FBUyxHQUFHLEVBQWhCOztBQUNBLE1BQUlFLFVBQVUsQ0FBQ0gsU0FBWCxDQUFxQkUsZUFBekIsRUFBMEM7QUFBRTtBQUMzQ0QsYUFBUyxHQUFHLE1BQU1FLFVBQVUsQ0FBQ0gsU0FBWCxDQUFxQkUsZUFBckIsQ0FBcUNDLFVBQVUsQ0FBQ0UsR0FBaEQsRUFBcURELE1BQXJELEVBQTZERSxJQUFJLENBQUNkLFdBQWxFLENBQWxCO0FBQ0QsR0FSb0QsQ0FTbkQ7QUFDQTtBQUNBOzs7QUFDQTtBQUFRUztBQUFSLEtBQ0tLLElBREwsRUFabUQsQ0FheEM7QUFJWixDQWpCRDs7QUFtQkEsK0RBQWVQLFlBQWYsRTs7Ozs7Ozs7Ozs7QUMvQ0EsbUM7Ozs7Ozs7Ozs7O0FDQUEseUU7Ozs7Ozs7Ozs7O0FDQUEsaUc7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsc0M7Ozs7Ozs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7Ozs7QUNBQSxlIiwiZmlsZSI6InBhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcbi8vIGhlbHBlciBmaWxlIHRvIGNyZWF0ZSBhIGRpZmZlcmVudCBjb3B5IG9mIGF4aW9zIGRlcGVuZGluZyBvbiBvdXIgYXBwIHJ1bm5pbmcgb24gS3ViZXJuZXRlcyBjbHVzdGVyIG9yIG9uIHRoZSBicm93c2VyXHJcbi8vIHRha2UgaW5jb21pbmcgcmVxdWVzdCB3aXRoIGhlYWRlcnMgYW5kIGVudiBhbmQgdGhlbiB1c2UgbG9naWMgdG8gYnVpbGQgYSBwcmVjb25maWcgdmVyc2lvbiBvZiBheGlvcyBcclxuLy8gdGhhdCB3b3JrIG9uIHRoZSBjdXJyZW50IGVudlxyXG4vLyByZXEgaXMgdGhlIG9iamVjdCB3aGF0IHJlY2VpdmUgZnJvbSB0aGUgTmV4dEpTIGFwcCBhbmQgaW5zaWRlIGl0IGhhcyBoZWFkZXJzIGNvbnRhaW5zIGhvc3QgYW5kIGNvb2tpZSBldGNcclxuLy8gd2UgbmVlZCB0byBydW4gdGhpcyBidWlsZENsaWVudCBmdW5jdGlvbiBiZWZvcmUgcnVubmluZyBnZXRJbml0aWFsUHJvcHMgYmMgbmVlZCB0byBrbm93IG91ciBhcHAgcnVubmluZyBvbiBzZXJ2ZXIgb3Igb24gYnJvd3NlclxyXG5jb25zdCBidWlsZENsaWVudCA9ICh7IHJlcSB9KSA9PiB7XHJcbiAgLy8gd2luZG93IG9iamVjdCBvbmx5IGV4aXN0cyBvbiBicm93c2VyIG5vdCBzZXJ2ZXJcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIC8vIHdlIGFyZSBvbiB0aGUgc2VydmVyLCAgd2UgYXJlIHJ1bm5pbmcgb3VyIGFwcCBvciByZW5kZXJpbmcgb3VyIGFwcCBvbiBLdWJlcm5ldGVzIGNsdXN0ZXIgZHVyaW5nIHRoZSBcclxuICAgIC8vIHNlcnZlciBzaWRlIHJlbmRlcmluZyBwaGFzZVxyXG4gICAgLy8gYXhpb3MuY3JlYXRlKCkgdG8gY3JlYXRlIGFuIGluc3RhbmNlIG9mIGF4aW9zXHJcbiAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcclxuICAgICAgYmFzZVVSTDogJ2h0dHA6Ly9pbmdyZXNzLW5naW54LWNvbnRyb2xsZXIuaW5ncmVzcy1uZ2lueC5zdmMuY2x1c3Rlci5sb2NhbCcsXHJcbiAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzXHJcbiAgICB9KVxyXG4gIH1cclxuICBlbHNlIHsgLy8gd2UgYXJlIHJ1bm5pbmcgb3VyIGFwcCBvbiB0aGUgYnJvd3NlciBubyBuZWVkIHRvIGluY2x1ZGUgaGVhZGVycyBhcyBicm93c2VyIHdpbGwgYXBwZW5kIHRvIHRoZSByZXF1ZXN0IGF1dG9cclxuICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xyXG4gICAgICBiYXNlVVJMOiAnLydcclxuICAgIH0pXHJcblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDbGllbnQiLCJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXHJcbi8vIGN1cnJlbnRVc2VyIGNhbiBnZXQgYWNjZXNzIGJlY2F1c2UgY29taW5nIGZyb20gcGFyZW50IEFwcCBjb21wb25lbnRcclxuY29uc3QgSGVhZGVyID0gKHsgY3VycmVudFVzZXIgfSkgPT4ge1xyXG4gIGNvbnN0IGxpbmtzID0gW1xyXG4gICAgIWN1cnJlbnRVc2VyICYmIHsgbGFiZWw6ICdTaWduIFVwJywgaHJlZjogJy9hdXRoL3NpZ251cCd9LFxyXG4gICAgIWN1cnJlbnRVc2VyICYmIHsgbGFiZWw6ICdTaWduIEluJywgaHJlZjogJy9hdXRoL3NpZ25pbid9LFxyXG4gICAgY3VycmVudFVzZXIgJiYgeyBsYWJlbDogJ1NlbGwgVGlja2V0cycsIGhyZWY6ICcvdGlja2V0cy9uZXcnfSxcclxuICAgIGN1cnJlbnRVc2VyICYmIHsgbGFiZWw6ICdNeSBPcmRlcnMnLCBocmVmOiAnL29yZGVycyd9LFxyXG4gICAgY3VycmVudFVzZXIgJiYgeyBsYWJlbDogJ1NpZ24gT3V0JywgaHJlZjogJy9hdXRoL3NpZ25vdXQnfVxyXG5dXHJcbiAgLmZpbHRlcigobGlua0NvbmZpZykgPT4gbGlua0NvbmZpZykgLy8gZmlsdGVyIG91dCBhbnkgZW50cnkgaXMgZmFsc2VcclxuICAubWFwKCh7IGxhYmVsLCBocmVmIH0pID0+IHtcclxuICAgIHJldHVybiAoIDxsaSBrZXk9e2hyZWZ9IGNsYXNzTmFtZT0nbmF2LWl0ZW0nPlxyXG4gICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2hyZWZ9PlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPSduYXYtbGluayc+XHJcbiAgICAgICAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgPC9MaW5rPiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8L2xpPiApXHJcbn0pXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXItZmx1aWQnPlxyXG4gICAgPG5hdiBjbGFzc05hbWU9J25hdmJhciBuYXZiYXItbGlnaHQgYmctbGlnaHQnPlxyXG4gICAgICA8TGluayBocmVmPScvJz5cclxuICAgICAgICA8YSBjbGFzc05hbWU9J25hdmJhci1icmFuZCc+XHJcbiAgICAgICAgICBHaXRUaXhcclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvTGluaz5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9J2QtZmxleCBqdXN0aWZ5LWNvbnRlbnQtZW5kJz5cclxuICAgICAgICA8dWwgY2xhc3NOYW1lPSduYXYgZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlcic+XHJcbiAgICAgICAgICB7bGlua3N9XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25hdj5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyIiwiaW1wb3J0ICdib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzcyc7XHJcbmltcG9ydCBidWlsZENsaWVudCBmcm9tICcuLi9hcGkvYnVpbGQtY2xpZW50JztcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9jb21wb25lbnRzL2hlYWRlcic7XHJcblxyXG4vLyB0aGlzIGZpbGUgZm9yIG5leHQuanMgdG8gd3JhcHMgdXAgZWFjaCBjb21wb25lbnQgaW5zaWRlIHBhZ2VzIGRpcmVjdG9yeSBpbnRvIGl0cyBvd25cclxuLy8gZGVmYXVsdCBDb21wb25lbnQgY2FsbGVkIGFwcCBpbiBvcmRlciB0byBhcHBseSBzdHlsaW5nIGZvciB0aGUgd2hvbGUgbmV4dGpzIHByb2plY3RcclxuY29uc3QgQXBwQ29tcG9uZW50ID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMsIGN1cnJlbnRVc2VyIH0pID0+IHtcclxuICBcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPGgxPlxyXG4gICAgICAgIDxIZWFkZXIgY3VycmVudFVzZXI9e2N1cnJlbnRVc2VyID8gY3VycmVudFVzZXIgOiBcIlwifS8+XHJcbiAgICAgIDwvaDE+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250YWluZXInPlxyXG4gICAgICA8Q29tcG9uZW50IGN1cnJlbnRVc2VyPXtjdXJyZW50VXNlcn0gey4uLnBhZ2VQcm9wc30gLz4gXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgXHJcbiAgKVxyXG59XHJcbi8vIE5leHRKUyBzZXJ2ZXIgaXNzdWUgd2hlbiBnZXRJbml0aWFsUHJvcHMgZ2V0IGNhbGxlZCwgaXQgd2lsbCBibG9jayBjb21wb25lbnQgdG8gY2FsbCBnZXRJbml0aWFsUHJvcHMoKVxyXG4vLyB0aGUgYXJndW1lbnQgcGFzc2luZyB0byBnZXRJbml0aWFsUHJvcHMgZm9yIHRoaXMgY3VzdG9tIEFwcCBDb21wb25lbnQgaXMgbm90IHNpbXBsZSByZXEgYW5kIHJlc1xyXG4vLyBpdCBpcyBuZXN0ZWQgaW5zaWRlIGN0eCBvYmplY3QgLSBjb250ZXh0ID09PSB7Q29tcG9uZW50LCBjdHg6IHtyZXEsIHJlc319XHJcbi8qIEFwcENvbXBvbmVudCBpcyB0aGUgcGFyZW50IG9mIGFsbCBjaGlsZCBjb21wb25lbnRzIExhbmRpbmdQYWdlLCBTaG93VGlja2V0UGFnZSwgU2hvd09yZGVyUGFnZS5cclxuICAgV2hlbiB0aGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIHJvb3QsIG5leHRqcyBmaW5kcyBpbmRleC5qcyB3aGljaCBzaG93cyB0aGUgTGFuZGluZ1BhZ2UgQ29tcG9uZW50XHJcbiAgIE5leHQgY2FsbHMgdGhlIEFwcCdzIGdldEluaXRpYWxQcm9wcyBmdW5jdGlvbiBieSBkZWZhdWx0IHdoaWNoIGRlZmluZWQgaW4gQXBwQ29tcG9uZW50XHJcbiAgIGFuZCBmZXRjaCBzb21lIGRhdGEgaW4gdGhpcyBjYXNlIGlzIHRvIGZpbmQgb3V0IHdobyB0aGUgY3VycmVudCB1c2VyIGlzLlxyXG4gICBUaGVuIHdlIG1hbnVhbGx5IGludm9rZSB0aGUgTGFuZGluZ1BhZ2UncyBnZXRJbml0aWFsUHJvcHMgZnVuY3Rpb24gdG9vICovXHJcbkFwcENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoYXBwQ29udGV4dCkgPT4ge1xyXG4gLy9jb25zb2xlLmxvZyhPYmplY3Qua2V5cyhhcHBDb250ZXh0KSkgLy8gJ0NvbXBvbmVudCwgJ3JvdXRlcicsICdjdHgnXHJcbiBjb25zdCBjbGllbnQgPSBidWlsZENsaWVudChhcHBDb250ZXh0LmN0eClcclxuIGNvbnN0IHtkYXRhfSA9IGF3YWl0IGNsaWVudC5nZXQoJy9hcGkvdXNlcnMvY3VycmVudHVzZXInKVxyXG4gLy8gd2UgbWFudWFsbHkgaW52b2tlIGdldEluaXRpYWxQcm9wcyBmb3IgaW5kaXZpZHVhbCBwYWdlIGxpa2UgTGFuZGluZ1BhZ2UsIFNpZ25JbiwgU2lnblVwIHBhZ2Ugc28gdGhhdCBjYW4gYWNjZXNzIGN1cnJlbnRVc2VyIHN0YXRlXHJcbiBsZXQgcGFnZVByb3BzID0ge31cclxuIGlmIChhcHBDb250ZXh0LkNvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMpIHsgLy8gaWYgdGhpcyBjaGlsZCBjb21wb25lbnQgdG8gYmUgZGlzcGxheWVkIGhhcyBnZXRJbml0aWFsUHJvcHMgZnVuY3Rpb24sIGlmIHllcywgY2FsbCBpdFxyXG4gIHBhZ2VQcm9wcyA9IGF3YWl0IGFwcENvbnRleHQuQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyhhcHBDb250ZXh0LmN0eCwgY2xpZW50LCBkYXRhLmN1cnJlbnRVc2VyKVxyXG59XHJcbiAgLy9jb25zb2xlLmxvZyhwYWdlUHJvcHMpXHJcbiAgLy8gcmV0dXJuIGluZm8gd2lsbCBiZSBzaG93ZWQgdXAgYXMgUHJvcHMgb24gdGhlIHRvcCBhbmQgcGFzcyBpdCBkb3duIHRvIHRoZSBjaGlsZCBjb21wb25lbnQgYXMgYSBwcm9wXHJcbiAgLy8gPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPiBzZWUgdGhlIGZyb250ZW5kIGNvZGVcclxuICByZXR1cm4ge3BhZ2VQcm9wcyxcclxuICAgIC4uLmRhdGEgfS8vIG9yIGN1cnJlbnRVc2VyOiBkYXRhLmN1cnJlbnRVc2VyXHJcbiBcclxuIFxyXG4gXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcENvbXBvbmVudFxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZS5qc1wiKTs7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWlzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7OyIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=