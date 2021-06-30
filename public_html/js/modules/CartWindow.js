"use strict";
/* Класс окна корзины */
function CartWindow(elem) {
	WindowForm.apply(this, arguments);	
	this.caption = this._elem.querySelector('.caption');
	this.quantityVidjet = new QuantityVidjet(this._elem);
	// this.expectation = this.quantityVidjet.qetExpectation(); // Объект ожидания callback виджета количества

	this._setNodes();	
	this.start();
}
// Наследуюет класс WindowForm
CartWindow.prototype = Object.create(WindowForm.prototype);
CartWindow.prototype.constructor = CartWindow;

/* Внутренние методы */

CartWindow.prototype._setNodes = function () {
	var elems = this._elem.querySelectorAll('[data-cart-window]');
	this.nodes = {};
	for ( var i = 0; i < elems.length; i++ ) {
		this.nodes[elems[i].dataset.cartWindow] = elems[i];
	}	
};

CartWindow.prototype._roundPrice = function (price) {
	return Math.floor(price * 100) / 100;
};

// Обновляет данные
CartWindow.prototype._refreshData = function (data) {
	this._notice.innerHTML = '';
	this.addNotice('Продолжить покупки?');
	this.setData(data);
	this.expectation.remove(); // Отображает количество товара
	if (this._redirectCartCB) this._redirectCartCB();
};
// Отображает сообщение об ошибке
CartWindow.prototype._showError = function () {
	this.expectation.remove();
	this._notice.innerHTML = '';
	this.addWarning('Произошла ошибка!<br> Попробуйте обновить страницу.');
	this._redirectCartCB = null; // Отменяет переадресацию на страницу корзины
};
// Выполняет запрос изменения количества товара
CartWindow.prototype._changeQuantity = function () {
	var formData = new FormData();
	formData.set('id', this.nodes.id.dataset.id);
	formData.set('quantity', this.nodes.quantity.innerHTML);
	this.expectation = this.quantityVidjet.qetExpectation(); // Объект ожидания callback виджета количества
	$.ajax({
		url: "/cart/add",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._refreshData.bind(this),
		error: this._showError.bind(this)
	});		
};



/* Внешние методы */

// Устанавливает данные в соответствующие им узлы
// Генерирует событие refreshWinow
CartWindow.prototype.setData = function (data) {
	data = JSON.parse(data);
	this.nodes.id.dataset.id = data.id;
	this.nodes.image.src = document.location.origin + '/images/products/mini/' + data.image;
	this.nodes.name.innerHTML = data.name;
	this.nodes.price.innerHTML = this._roundPrice(data.price.price_history.price * data.quantity);
	this.nodes.quantity.innerHTML = data.quantity;
	this.nodes.unit.innerHTML = data.unit.reduction;
	if (this.nodes.product_stock) this.nodes.product_stock.innerHTML = data.product_stock.quantity;
	this._elem.dispatchEvent( new CustomEvent('refreshWinow', {detail: data} ) );
};
// Перенаправляет на страницу корзины, когда обновится количество товара
// Устанавливает callback переадресации this._redirectCartCB
CartWindow.prototype._redirectCart = function () {
	if ( this.expectation && this.expectation.count ) {
		this._redirectCartCB = function () {
			document.location.href = document.location.origin + '/cart';
		};
		return;
	}
	document.location.href = document.location.origin + '/cart';
};

CartWindow.prototype.start = function () {	
	this._elem.querySelector('.quantityVidjet').addEventListener('quantityChange', this._changeQuantity.bind(this));
	this.addButton('[data-button="confirm"]', this.closeHandler.bind(this));
	this.addButton('[data-button="cancel"]', this._redirectCart.bind(this));
};