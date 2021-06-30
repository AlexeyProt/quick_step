"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/* Класс иконок */
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