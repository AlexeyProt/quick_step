"use strict";
/* Анимация загрузки */

var ProgressAnimation = /*#__PURE__*/function () {
  function ProgressAnimation(container) {
    this._container = container;
    this._progressElem = document.getElementById('progress').content.children[0];
    this._pathElem = this._progressElem.querySelector('path');
    this._anim = new MyAnimation(this._pathElem);
  }
  /** 
  * Устанавливает функцию отрисовки анимации
  *
  * int initialStrokeDashoffset начальное значение атрибута <path stroke-dashoffset="initialStrokeDashoffset">
  * string initialRotate начальное значение атрибута <path transform="rotate(initialRotate 97 97)">
  */


  var _proto = ProgressAnimation.prototype;

  _proto._setAnimDraw = function _setAnimDraw(initialStrokeDashoffset, initialRotate) {
    var _this = this;

    var strokeDasharray = this._pathElem.attributes['stroke-dasharray'].value;

    this._anim.setDraw(function (pathElem) {
      pathElem.attributes['stroke-dashoffset'].value = _this._anim.generateValue(initialStrokeDashoffset, -strokeDasharray);
      pathElem.attributes['transform'].value = "rotate(" + _this._anim.generateValue(initialRotate, 360) + " 97 97)";
    });
  }
  /** 
  * Добавляет элемент загрузки и запускает его анимацию
  */
  ;

  _proto.start = function start() {
    var _this2 = this;

    this._container.append(this._progressElem);

    var initialStrokeDashoffset = +this._pathElem.attributes['stroke-dasharray'].value;

    this._setAnimDraw(initialStrokeDashoffset, 0);

    this._anim.setStopCallback(function () {
      return _this2._anim.interactAnimate(2000);
    });

    this._anim.interactAnimate(2000);
  }
  /** 
  * Останавливает анимацию элемента загрузки и удаляет его
  */
  ;

  _proto.stop = function stop() {
    var _this3 = this;

    var initialStrokeDashoffset = +this._pathElem.attributes['stroke-dashoffset'].value;
    var strokeDasharray = this._pathElem.attributes['stroke-dasharray'].value;

    var initialRotate = this._pathElem.attributes['transform'].value.match(/\(([\d.]+) /)[1];

    this._anim.setStopCallback(function () {});

    this._anim.stopAnim();

    this._setAnimDraw(initialStrokeDashoffset, initialRotate);

    this._anim.setStopCallback(function () {
      return _this3._progressElem.remove();
    });

    this._anim.interactAnimate(200);
  };

  return ProgressAnimation;
}();