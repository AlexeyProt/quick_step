"use strict";
/* Класс формы поиска */
function SearchForm(elem) {
	BaseForm.apply(this, arguments);		

	this.start();
}
// Наследуюет класс BaseForm
SearchForm.prototype = Object.create(BaseForm.prototype);
SearchForm.prototype.constructor = SearchForm;

/* Внутренние методы */

SearchForm.prototype._redirectSearch = function (event) {
	event.preventDefault();
	document.location.href = document.location.origin + '/search/' + this._elem[0].value;
};

/* Внешние методы */

SearchForm.prototype.start = function () {
	this._elem.querySelector('.openButton').addEventListener('click', this._redirectSearch.bind(this));
	this._elem.addEventListener('submit', this._redirectSearch.bind(this));
};