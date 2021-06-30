"use strict";
/* Класс ожидания callback */
function Expectation(elem) {
	this._elem = elem;
	this.count = 0; // Количество ожидаемых callback 
	this._anim = new MyAnimation( this._elem );
}

Expectation.prototype._showCB = function () {
	this._anim.setDraw(function (elem, progress) {
		elem.style.opacity = progress;
	});
	this._anim.interactAnimate(500);	
};

/* Внешние методы */

// Добавляет callback в очередь ожидания
Expectation.prototype.add = function () {
	this._anim.stopAnim();
	this.count++;
};
// Убирает callback из очереди
// Если в очереди больше нет функций, отображает элемент
Expectation.prototype.remove = function () {
	this.count--;
	if ( this.count < 0 ) this.count = 0;
	if ( this.count == 0 ) this.show();
};
// Убирает callback из очереди
// Но не отображает его
Expectation.prototype.removeNotShow = function () {
	this.count--;
	if ( this.count < 0 ) this.count = 0;
};
// Запускает анимацию отображения элемента
Expectation.prototype.show = function () {
	this._showCB();
};

Expectation.prototype.setShow = function (func) {
	this._showCB = func;
};