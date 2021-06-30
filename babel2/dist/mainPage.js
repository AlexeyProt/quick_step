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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* Класс анимации */
function MyAnimation(elem) {
  this._elem = elem;
} // Временная функция (вычисляет по текущему времини состояние анимации)


MyAnimation.prototype._timing = function (timeFraction) {
  return timeFraction;
}; // Callback - срабатывает после остановки анимации


MyAnimation.prototype._stopCallback = function () {}; // Возвращает true если значение this.progress достигнуто максимального или минимального значения


MyAnimation.prototype._progressInter = function () {
  // Если достигнуто минимальное значение, то запускает функцию this._draw(this.progress) и возвращает true
  if (this.progress < this.progStart) {
    this.progress = this.progStart;

    this._draw(this.progress);

    this._stopCallback();

    return true;
  } // Если достигнуто максимальное значение, то запускает функцию this._draw(this.progress) и возвращает true	


  if (this.progress > this.progEnd) {
    this.progress = this.progEnd;

    this._draw(this.progress);

    this._stopCallback();

    return true;
  }
}; // Запускает анимацию продолжительностью в duration


MyAnimation.prototype.animate = function (duration) {
  var self = this,
      start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    if (timeFraction >= 0) {
      self.progress = self._timing(timeFraction);

      self._draw(self.progress);
    }

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}; // Функция отрисовки анимации


MyAnimation.prototype.animation = function (time) {
  this.timeFraction = (time - this.start) / this._duration;
  if (this.timeFraction > 1) this.timeFraction = 1;

  if (this.timeFraction >= 0) {
    this.progress = this._timing(this.timeFraction); // Если достигнуто предельное значение прогресса, то анимациия остонавливается

    if (this._progressInter()) return;

    this._draw(this.progress);
  }

  if (this.timeFraction < 1) this._requestId = requestAnimationFrame(this.animation.bind(this));else this._stopCallback();
}; // Запускает анимацию продолжительностью в duration с возможностью взаимодействия с анимацией


MyAnimation.prototype.interactAnimate = function (duration) {
  this.start = performance.now();
  this._duration = duration;
  this._requestId = requestAnimationFrame(this.animation.bind(this));
}; // Устанавливает callback функцию для остановки анимации


MyAnimation.prototype.setStopCallback = function (func) {
  this._stopCallback = func;
}; // Устанавливает минимальное и максимальное значение this.progress


MyAnimation.prototype.setProgressInter = function (start, end) {
  this.progStart = start;
  this.progEnd = end;
}; // Останавливает анимацию и запускает callback функцию


MyAnimation.prototype.stopAnim = function () {
  cancelAnimationFrame(this._requestId);

  this._stopCallback();
}; // Устанавливает функцию _draw(), которая анимирует свойства elem по состоянию завершенности progress
// Пример _draw(): function(elem, progress) {elem.свойство = progress*числовое_значение_свойства}


MyAnimation.prototype.setDraw = function (func) {
  this._draw = function () {
    func(this._elem, this.progress);
  };
}; // Устанавливает временную функцию _timing


MyAnimation.prototype.setTiming = function (func) {
  this._timing = function (timeFraction) {
    return func(timeFraction);
  };
}; // Устанавливает временную функцию _timing и округляет ее возвращаемое значение до 6-и знаков после запятой


MyAnimation.prototype.setRoundTiming = function (func) {
  this._timing = function (timeFraction) {
    if (timeFraction < 0) timeFraction = 0;
    return Math.round(1e6 * func(timeFraction)) / 1e6;
  };
}; // Устанавливает обратную временную функцию


MyAnimation.prototype.setReverseTiming = function (func) {
  var progress = this.progress;
  this.start = performance.now();

  this._timing = function (timeFraction) {
    return progress - func(timeFraction);
  };
}; // Запускает обратную анимацию


MyAnimation.prototype.reverseAnimate = function () {
  var progress = this.progress;
  if (this._initialTiming === undefined) this._initialTiming = this._timing; // this._initialTiming Исходная временная функция

  this.start = performance.now();

  this._timing = function (timeFraction) {
    return progress - this._initialTiming(timeFraction);
  };

  requestAnimationFrame(this.animation.bind(this));
}; // Отменяет обратную анимацию


MyAnimation.prototype.cancelReverse = function () {
  if (this._initialTiming === undefined) return;
  var progress = this.progress;
  this.start = performance.now();

  this._timing = function (timeFraction) {
    return progress + this._initialTiming(timeFraction);
  };
}; // Генерирует и возвращает значение в текущий момент анимации this.progress по начальному значению initialValue и конечноему finalValue 


MyAnimation.prototype.generateValue = function (initialValue, finalValue) {
  return initialValue - this.progress * (initialValue - finalValue);
}; // Возвращает массив цвета RGB в 10-ой системе счисления вида [ 255, 255, 255 ] по HEX вида '#ffffff'


MyAnimation.prototype.rgb10 = function (hex) {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}; // Генерирует и возвращает цвет в текущий момент анимации this.progress
// по начальному значению цвета initialColor и конечноему finalColor
// initialColor, finalColor - массивы RGB вида [ 255, 255, 255 ]


MyAnimation.prototype.generateColor = function (initialColor, finalColor) {
  var rgb16 = [];

  for (var i = 0; i < initialColor.length; i++) {
    rgb16[i] = this.generateValue(initialColor[i], finalColor[i]);
    rgb16[i] = parseInt(rgb16[i], 10).toString(16);

    if (rgb16[i].length == 1) {
      rgb16[i] = '0' + rgb16[i];
    }
  }

  rgb16 = '#' + rgb16[0] + rgb16[1] + rgb16[2];
  return rgb16;
}; // Возвращает анимируемый элемент _elem


MyAnimation.prototype.getElem = function () {
  return this._elem;
};

module.exports = MyAnimation;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Slider = __webpack_require__(2);

var IconsCategory = __webpack_require__(3);

var content = document.querySelector('.content');
new IconsCategory(content);
new Slider(document.getElementById('slider'));
var productFinder = new ProductFinder(document.querySelector('.searchFormContainer'));
productFinder.searchDataURL = '/products/search-data';
productFinder.searchResultURL = '/search';
productFinder.start();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MyAnimation = __webpack_require__(0);

var Slider = /*#__PURE__*/function () {
  function Slider(container) {
    _classCallCheck(this, Slider);

    this._container = container;
    this._slidesCont = container.querySelector('#slides');
    this._buttonLeft = container.querySelector('.left');
    this._buttonRight = container.querySelector('.right');
    this.timer = Date.now();
    this.frame = 0;
    this.start();
  } // установка нужного слайда	


  _createClass(Slider, [{
    key: "slidesPosition",
    value: function slidesPosition(number) {
      var _this = this;

      var shift = number * -100;
      var initialLeft = +this._slidesCont.style.left.replace(/[^\d \- .]+/, '');
      this._anim = new MyAnimation(this._slidesCont);

      this._anim.setDraw(function (slidesCont, progress) {
        slidesCont.style.left = _this._anim.generateValue(initialLeft, shift) + '%';
      });

      this._anim.interactAnimate(1000);
    } // крутим на один кадр влево

  }, {
    key: "left",
    value: function left() {
      if (Date.now() - this.timer < 1000) return;

      if (this.frame === 0) {
        this._slidesCont.appendChild(this._slidesCont.firstElementChild);

        this.frame = this._slidesCont.children.length - 1;
        this._slidesCont.style.left = (this._slidesCont.children.length - 1) * -100 + "%";
      }

      this.slidesPosition(--this.frame);
      this.timer = Date.now();
    } // крутим на один кадр вправо

  }, {
    key: "right",
    value: function right() {
      if (Date.now() - this.timer < 1000) return;

      if (this.frame === this._slidesCont.children.length - 1) {
        this._slidesCont.insertBefore(this._slidesCont.lastElementChild, this._slidesCont.firstElementChild);

        this.frame = 0;
        this._slidesCont.style.left = "0%";
      }

      this.slidesPosition(++this.frame);
      this.timer = Date.now();
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      this._buttonLeft.addEventListener('click', function () {
        return _this2.left();
      });

      this._buttonRight.addEventListener('click', function () {
        return _this2.right();
      });

      setInterval(function () {
        // ставим пятисекундный интервал для перелистывания картинок
        if (Date.now() - _this2.timer >= 4990) {
          _this2.right();
        }
      }, 5000);
    }
  }]);

  return Slider;
}();

module.exports = Slider;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Класс иконок */
var MyAnimation = __webpack_require__(0);

function IconsCategory(elem) {
  this._elem = elem;
  this.activAnimElems();
}
/* Внутренние методы */
// Активирует анимацию иконок при наведении мыши


IconsCategory.prototype._activIcons = function () {
  var self = this,
      currentElem = null; // Элемент внутри которого находится курсор

  function hover(event) {
    if (currentElem) return; // Если установлен currentElem, значит переход внутри элемента

    var target = event.target;

    while (target != this) {
      // Пока родительский элемент не станет this._elem
      if (target.className == "icon" && target.tagName == "A") {
        var circle;

        var _ret = function () {
          // Устанавливается текущий элемент
          // Функция обработчик событие уведения мыши с текущего элемента
          var leave = function leave() {
            circle.anim.reverseAnimate();
            currentElem = null; // Когда курсор ушел с элемента, текущий элемент обнуляется

            target.removeEventListener('mouseleave', leave); // Удаляется обработчик
          };

          // Если курсор находится внутри <a class="icon"></a> 
          circle = target.querySelector('[data-name="anim"]');
          circle.anim = new MyAnimation(circle);
          circle.anim.setDraw(function (elem) {
            elem.attributes['fill-opacity'].value = elem.anim.generateValue(1, 0);
          });
          circle.anim.setProgressInter(0, 1);
          circle.anim.interactAnimate(200);
          currentElem = target;
          target.addEventListener('mouseleave', leave); // Устанавливается обработчик события ухода мыши

          return {
            v: void 0
          };
        }();

        if (_typeof(_ret) === "object") return _ret.v;
      }

      target = target.parentNode; // Если текущий элемент не <a class="icon"></a>, то проверяется родитель
    }
  }

  this._elem.addEventListener('mouseover', hover);
};
/* Внешние методы */
// Активирует анимации иконок


IconsCategory.prototype.activAnimElems = function () {
  this._activIcons();
};

module.exports = IconsCategory;

/***/ })
/******/ ]);