"use strict";
/* Класс виджета количества */
function QuantityVidjet(elem) {
	this._elem = elem;
	this.minQuant = 1;
	// this._quantityVidjet = this._elem.querySelector('.quantityVidjet');
	this._previousQuantity = null;
	// this._currentQuantity = this._quantityVidjet.children[1].innerHTML;
	// this.expectation = new Expectation(this._quantityVidjet.children[1]);
	this._quantityVidjetEvent = new CustomEvent('quantityChange', {bubbles: true});

	this.start();
}

/* Внутренние методы */

QuantityVidjet.prototype._dispatchChangeEvent = function () {
	this._previousQuantity = this._currentQuantity;
	this._currentQuantity = this._quantityVidjet.children[1].innerHTML;
	this._quantityVidjet.dispatchEvent( this._quantityVidjetEvent );
}
// Добавляет callback в очередь ожидания
QuantityVidjet.prototype._addExpectation = function () {};

// callback для кнопок изменения количества
// Увеличивает или уменьшает количество
// Если виджет ожидает callback, то устанавливается предыдущие значение количества
QuantityVidjet.prototype._changeButtonsCB = function (event) {
	if ( event.target.parentNode.className == 'quantityVidjet' ) {
		this._target = event.target.parentNode.children[1];
		this._previousQuantity = this._target.innerHTML;
		switch (event.target.innerHTML) {
			case '-':					
				this._target.innerHTML--; 
				if ( this._target.innerHTML < this.minQuant ) this._target.innerHTML = this.minQuant;
				/* this._dispatchChangeEvent(); */
				event.target.parentNode.dispatchEvent( this._quantityVidjetEvent );
				if (this._addExpectation()) {
					this._target.innerHTML = this._previousQuantity;
				}							
				break;
			case '+':						
				this._target.innerHTML++; 		
				/* this._dispatchChangeEvent(); */
				event.target.parentNode.dispatchEvent( this._quantityVidjetEvent );
				if (this._addExpectation()) {
					this._target.innerHTML = this._previousQuantity;
				}				
				break;
		}
	}
};
// Обработчик события input
// Заменяет все символы, кроме цифр, при вводе 
QuantityVidjet.prototype._replaceCharsCB = function (event) {
	if ( event.target.dataset.module !== 'quantityVidjet' ) return;
	var sel = window.getSelection(),
		start = sel.anchorOffset,
		range = document.createRange();
	event.target.innerHTML = event.target.innerHTML.replace(/[^0-9]+/, '');
	var node = sel.anchorNode;

	if (!node.firstChild) node.innerHTML = ' ';
	// node.innerHTML = parseInt(node.innerHTML);
	// if ( node.innerHTML < 1 ) node.innerHTML = 1;
	if ( start > node.firstChild.length ) start = node.firstChild.length;
	range.setStart(node.firstChild, start);
	sel.removeAllRanges();
	sel.addRange(range);
	/* this._dispatchChangeEvent(); */
};

QuantityVidjet.prototype._focusHandler = function (event) {
	if ( event.target.dataset.module !== 'quantityVidjet' ) return;	
	this._target = event.target;
	this._previousQuantity = event.target.innerHTML;
};

QuantityVidjet.prototype._blurHandler = function (event) {
	if ( event.target.dataset.module !== 'quantityVidjet' ) return;		
	if ( event.target.innerHTML < this.minQuant ) {
		event.target.innerHTML = this.minQuant;
	} 
	if ( this._previousQuantity === event.target.innerHTML ) return;

	event.target.parentNode.dispatchEvent( this._quantityVidjetEvent );
	if (this._addExpectation()) {
		event.target.innerHTML = this._previousQuantity;
	}		
};

/* Внешние методы */

QuantityVidjet.prototype.resetQuant = function () {
	if (!this._previousQuantity) return;
	this._quantityVidjet.children[1].innerHTML = this._previousQuantity;
	this._currentQuantity = this._previousQuantity;
	this._previousQuantity = null;
}
// Возваращает объект ожидания callback
// Устанавливает функцию добаления callback в очередь ожидания
QuantityVidjet.prototype.qetExpectation = function () {	
	this.expectation = new Expectation(this._target);
	this._addExpectation = function () {
		this._target.style.opacity = '0';		
		this.expectation.add();		
		return true;
	};
	return this.expectation;
};

QuantityVidjet.prototype.start = function () {	
	this._elem.addEventListener('click', this._changeButtonsCB.bind(this));
	this._elem.addEventListener('input', this._replaceCharsCB.bind(this));
	this._elem.addEventListener('focus', this._focusHandler.bind(this), true);	
	this._elem.addEventListener('blur', this._blurHandler.bind(this), true);
};

module.exports = QuantityVidjet;