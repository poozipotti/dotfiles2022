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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cypress/integration/missions.js":
/*!*****************************************!*\
  !*** ./cypress/integration/missions.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


describe('Complete Missions', function () {
  var username = "test+".concat(Math.floor(Math.random() * 10000), "@mighty.business");
  var password = 'thisIsABadPassword';
  var shopName = "testshop".concat(Math.floor(Math.random() * 10000));
  before(function () {
    cy.newUser(username, password);
  });
  beforeEach(function () {
    cy.login(username, password);
  });
  after(function () {
    cy.deleteCurrentUser(username, password);
  }); // tests

  it('Named Shop', function () {
    cy.visit('/mission/name-shop');
    cy.get('input').type('this is a test shop');
    cy.contains('Done').click();
    cy.contains('Next').click();
    cy.url().should('include', 'design-logo');
  });
  it('Designed Logo', function () {
    cy.visit('/mission/design-logo');
    cy.contains('Got It').click();
    cy.get('.shopbrand__icon-result').first().click();
    cy.contains('Done').click();
    cy.contains('Next').click();
    cy.url().should('include', 'select-products');
  });
  it('Selected Products', function () {
    cy.visit('/mission/select-products');
    cy.contains('Got It').click();
    cy.contains('Best').click();

    for (var i = 1; i <= 7; i++) {
      cy.get(".catalog__products-grid > :nth-child(".concat(i, ") > .catalog__product-add")).click({
        force: true
      });
    }

    cy.contains('Done').click();
    cy.get('.hud__complete > .btn').click();
    cy.url().should('include', 'design-brand');
  });
  it('Designed Brand', function () {
    cy.visit('/mission/design-brand');
    cy.contains('Got It').click();
    cy.get('.hud__save-btn').click();
    cy.get('.field.is-selected > label > .shopbrand__hero-selection').click();
    cy.contains('Done').click();
    cy.contains('Next').click();
    cy.url().should('include', 'about-me');
  });
  it('About Me', function () {
    cy.visit('/mission/about-me');
    cy.contains('Got It').click();
    cy.get('#headline').type('I am a testing bot. I was created only to test');
    cy.get('#about').type('I started this business to test Mighty');
    cy.contains('Done').click();
    cy.contains('Next').click();
    cy.url().should('include', 'launch');
  });
  it('Launch Store', function () {
    cy.visit('/mission/launch');
    cy.contains('Got It').click();
    cy.get('.hud__save-btn').click();
    cy.get('input').type(shopName);
    cy.contains('Done').click();
  });
});

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi ./cypress/integration/missions.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/george/Repos/lemonade/cypress/integration/missions.js */"./cypress/integration/missions.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY3lwcmVzcy9pbnRlZ3JhdGlvbi9taXNzaW9ucy5qcyJdLCJuYW1lcyI6WyJkZXNjcmliZSIsInVzZXJuYW1lIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicGFzc3dvcmQiLCJzaG9wTmFtZSIsImJlZm9yZSIsImN5IiwibmV3VXNlciIsImJlZm9yZUVhY2giLCJsb2dpbiIsImFmdGVyIiwiZGVsZXRlQ3VycmVudFVzZXIiLCJpdCIsInZpc2l0IiwiZ2V0IiwidHlwZSIsImNvbnRhaW5zIiwiY2xpY2siLCJ1cmwiLCJzaG91bGQiLCJmaXJzdCIsImkiLCJmb3JjZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBQSxRQUFRLENBQUMsbUJBQUQsRUFBc0IsWUFBTTtBQUNsQyxNQUFNQyxRQUFRLGtCQUFXQyxJQUFJ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LFFBQUgsQ0FBWSxNQUFaLEVBQW9CQyxLQUFwQjtBQUNBWCxNQUFFLENBQUNZLEdBQUgsR0FBU0MsTUFBVCxDQUFnQixTQUFoQixFQUEyQixVQUEzQjtBQUNELEdBUkMsQ0FBRjtBQVVBUCxJQUFFLENBQUMsVUFBRCxFQUFhLFlBQU07QUFDbkJOLE1BQUUsQ0FBQ08sS0FBSCxDQUFTLG1CQUFUO0FBQ0FQLE1BQUUsQ0FBQ1UsUUFBSCxDQUFZLFFBQVosRUFBc0JDLEtBQXRCO0FBQ0FYLE1BQUUsQ0FBQ1EsR0FBSCxDQUFPLFdBQVAsRUFBb0JDLElBQXBCLENBQXlCLGdEQUF6QjtBQUNBVCxNQUFFLENBQUNRLEdBQUgsQ0FBTyxRQUFQLEVBQWlCQyxJQUFqQixDQUFzQix3Q0FBdEI7QUFDQVQsTUFBRSxDQUFDVSxRQUFILENBQVksTUFBWixFQUFvQkMsS0FBcEI7QUFDQVgsTUFBRSxDQUFDVSxRQUFILENBQVksTUFBWixFQUFvQkMsS0FBcEI7QUFDQVgsTUFBRSxDQUFDWSxHQUFILEdBQVNDLE1BQVQsQ0FBZ0IsU0FBaEIsRUFBMkIsUUFBM0I7QUFDRCxHQVJDLENBQUY7QUFTQVAsSUFBRSxDQUFDLGNBQUQsRUFBaUIsWUFBTTtBQUN2Qk4sTUFBRSxDQUFDTyxLQUFILENBQVMsaUJBQVQ7QUFDQVAsTUFBRSxDQUFDVSxRQUFILENBQVksUUFBWixFQUFzQkMsS0FBdEI7QUFDQVgsTUFBRSxDQUFDUSxHQUFILENBQU8sZ0JBQVAsRUFBeUJHLEtBQXpCO0FBQ0FYLE1BQUUsQ0FBQ1EsR0FBSCxDQUFPLE9BQVAsRUFBZ0JDLElBQWhCLENBQXFCWCxRQUFyQjtBQUNBRSxNQUFFLENBQUNVLFFBQUgsQ0FBWSxNQUFaLEVBQW9CQyxLQUFwQjtBQUNELEdBTkMsQ0FBRjtBQU9ELENBM0VPLENBQVIsQyIsImZpbGUiOiJtaXNzaW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImRlc2NyaWJlKCdDb21wbGV0ZSBNaXNzaW9ucycsICgpID0+IHtcbiAgY29uc3QgdXNlcm5hbWUgPSBgdGVzdCske01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKX1AbWlnaHR5LmJ1c2luZXNzYDtcbiAgY29uc3QgcGFzc3dvcmQgPSAndGhpc0lzQUJhZFBhc3N3b3JkJztcbiAgY29uc3Qgc2hvcE5hbWUgPSBgdGVzdHNob3Ake01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKX1gO1xuXG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgY3kubmV3VXNlcih1c2VybmFtZSwgcGFzc3dvcmQpO1xuICB9KTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBjeS5sb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpO1xuICB9KTtcblxuICBhZnRlcigoKT0+e1xuICAgIGN5LmRlbGV0ZUN1cnJlbnRVc2VyKHVzZXJuYW1lLCBwYXNzd29yZCk7XG4gIH0pO1xuXG4gIC8vIHRlc3RzXG4gIGl0KCdOYW1lZCBTaG9wJywgKCkgPT4ge1xuICAgIGN5LnZpc2l0KCcvbWlzc2lvbi9uYW1lLXNob3AnKTtcbiAgICBjeS5nZXQoJ2lucHV0JykudHlwZSgndGhpcyBpcyBhIHRlc3Qgc2hvcCcpO1xuICAgIGN5LmNvbnRhaW5zKCdEb25lJykuY2xpY2soKTtcbiAgICBjeS5jb250YWlucygnTmV4dCcpLmNsaWNrKCk7XG4gICAgY3kudXJsKCkuc2hvdWxkKCdpbmNsdWRlJywgJ2Rlc2lnbi1sb2dvJyk7XG4gIH0pO1xuXG4gIGl0KCdEZXNpZ25lZCBMb2dvJywgKCkgPT4ge1xuICAgIGN5LnZpc2l0KCcvbWlzc2lvbi9kZXNpZ24tbG9nbycpO1xuICAgIGN5LmNvbnRhaW5zKCdHb3QgSXQnKS5jbGljaygpO1xuICAgIGN5LmdldCgnLnNob3BicmFuZF9faWNvbi1yZXN1bHQnKS5maXJzdCgpLmNsaWNrKCk7XG4gICAgY3kuY29udGFpbnMoJ0RvbmUnKS5jbGljaygpO1xuICAgIGN5LmNvbnRhaW5zKCdOZXh0JykuY2xpY2soKTtcbiAgICBjeS51cmwoKS5zaG91bGQoJ2luY2x1ZGUnLCAnc2VsZWN0LXByb2R1Y3RzJyk7XG4gIH0pO1xuXG4gIGl0KCdTZWxlY3RlZCBQcm9kdWN0cycsICgpID0+IHtcbiAgICBjeS52aXNpdCgnL21pc3Npb24vc2VsZWN0LXByb2R1Y3RzJyk7XG4gICAgY3kuY29udGFpbnMoJ0dvdCBJdCcpLmNsaWNrKCk7XG4gICAgY3kuY29udGFpbnMoJ0Jlc3QnKS5jbGljaygpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDc7IGkrKykge1xuICAgICAgY3kuZ2V0KFxuICAgICAgICBgLmNhdGFsb2dfX3Byb2R1Y3RzLWdyaWQgPiA6bnRoLWNoaWxkKCR7aX0pID4gLmNhdGFsb2dfX3Byb2R1Y3QtYWRkYFxuICAgICAgKS5jbGljayh7Zm9yY2U6IHRydWV9KTtcbiAgICB9XG4gICAgY3kuY29udGFpbnMoJ0RvbmUnKS5jbGljaygpO1xuICAgIGN5LmdldCgnLmh1ZF9fY29tcGxldGUgPiAuYnRuJykuY2xpY2soKTtcbiAgICBjeS51cmwoKS5zaG91bGQoJ2luY2x1ZGUnLCAnZGVzaWduLWJyYW5kJyk7XG4gIH0pO1xuXG4gIGl0KCdEZXNpZ25lZCBCcmFuZCcsICgpID0+IHtcbiAgICBjeS52aXNpdCgnL21pc3Npb24vZGVzaWduLWJyYW5kJyk7XG4gICAgY3kuY29udGFpbnMoJ0dvdCBJdCcpLmNsaWNrKCk7XG4gICAgY3kuZ2V0KCcuaHVkX19zYXZlLWJ0bicpLmNsaWNrKCk7XG4gICAgY3kuZ2V0KCcuZmllbGQuaXMtc2VsZWN0ZWQgPiBsYWJlbCA+IC5zaG9wYnJhbmRfX2hlcm8tc2VsZWN0aW9uJykuY2xpY2soKTtcbiAgICBjeS5jb250YWlucygnRG9uZScpLmNsaWNrKCk7XG4gICAgY3kuY29udGFpbnMoJ05leHQnKS5jbGljaygpO1xuICAgIGN5LnVybCgpLnNob3VsZCgnaW5jbHVkZScsICdhYm91dC1tZScpO1xuICB9KTtcblxuICBpdCgnQWJvdXQgTWUnLCAoKSA9PiB7XG4gICAgY3kudmlzaXQoJy9taXNzaW9uL2Fib3V0LW1lJyk7XG4gICAgY3kuY29udGFpbnMoJ0dvdCBJdCcpLmNsaWNrKCk7XG4gICAgY3kuZ2V0KCcjaGVhZGxpbmUnKS50eXBlKCdJIGFtIGEgdGVzdGluZyBib3QuIEkgd2FzIGNyZWF0ZWQgb25seSB0byB0ZXN0Jyk7XG4gICAgY3kuZ2V0KCcjYWJvdXQnKS50eXBlKCdJIHN0YXJ0ZWQgdGhpcyBidXNpbmVzcyB0byB0ZXN0IE1pZ2h0eScpO1xuICAgIGN5LmNvbnRhaW5zKCdEb25lJykuY2xpY2soKTtcbiAgICBjeS5jb250YWlucygnTmV4dCcpLmNsaWNrKCk7XG4gICAgY3kudXJsKCkuc2hvdWxkKCdpbmNsdWRlJywgJ2xhdW5jaCcpO1xuICB9KTtcbiAgaXQoJ0xhdW5jaCBTdG9yZScsICgpID0+IHtcbiAgICBjeS52aXNpdCgnL21pc3Npb24vbGF1bmNoJyk7XG4gICAgY3kuY29udGFpbnMoJ0dvdCBJdCcpLmNsaWNrKCk7XG4gICAgY3kuZ2V0KCcuaHVkX19zYXZlLWJ0bicpLmNsaWNrKCk7XG4gICAgY3kuZ2V0KCdpbnB1dCcpLnR5cGUoc2hvcE5hbWUpO1xuICAgIGN5LmNvbnRhaW5zKCdEb25lJykuY2xpY2soKTtcbiAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=