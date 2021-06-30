"use strict";
/* Класс корзины */
function CartForm(elem) {
	BaseForm.apply(this, arguments);		
	/* this.cartWindow = new CartWindow( document.getElementById('confirmContainer') ); */
	this._totalAmountElems = this._elem.querySelectorAll('[data-cart-window="total amount"]');
	this.quantityVidjet = new QuantityVidjet(this._elem);

	this.nodes = {
		service_sum: this._elem.querySelector('[data-cart-window="service_sum"]')
	};
	
	this._totalAmount();
	this.start();
	console.log('CartForm');
}
// Наследуюет класс BaseForm
CartForm.prototype = Object.create(BaseForm.prototype);
CartForm.prototype.constructor = CartForm;

/* Внутренние методы */

// Выделяет товар и вычисляет общую сумму
CartForm.prototype._select = function (event) {
	if ( event.target.name !== 'select' ) return;
	this._totalAmount();
};
// Выделяет все товары и вычисляет общую сумму
CartForm.prototype._selectAll = function (event) {
	if ( event.target.name !== 'selectAll' ) return;
	var selectAllInputs = this._elem.querySelectorAll('[name="selectAll"]');
	for ( var i = 0; i < selectAllInputs.length; i++ ) {
		selectAllInputs[i].checked = event.target.checked;
	}	
	for ( var i = 0; i < this._inputs.length; i++ ) {
		this._inputs[i].checked = event.target.checked;
	}
	this._totalAmount();
};
// Сбрасывает общую сумму
CartForm.prototype._resetTotalAmount = function () {
	for ( var i = 0; i < this._totalAmountElems.length; i++ ) {
		this._totalAmountElems[i].innerHTML = 0;
	}
};
// Устанавливает общую сумму
CartForm.prototype._setTotalAmount = function (sum) {
	for ( var i = 0; i < this._totalAmountElems.length; i++ ) {
		this._totalAmountElems[i].innerHTML = Number(this._totalAmountElems[i].innerHTML) + Number(sum);
	}
};
// Вычисляет и устанавливает общую сумму
// Устанавливает массив this._postData с данными выбранных товаров
CartForm.prototype._totalAmount = function () {
	this._inputs = this._elem.querySelectorAll('[name="select"]');	
	this._postData = [];
	this._resetTotalAmount();
	for ( var i = 0; i < this._inputs.length; i++ ) {
		if ( this._inputs[i].checked ) {
			var target = this._inputs[i];
			while ( target != this._elem ) {
				if ( target.dataset.id ) {
					var sum = target.querySelector('[data-cart-window="sum"]'),
						quantity = target.querySelector('[data-cart-window="quantity"]');
					this._setTotalAmount(sum.innerHTML);
					this._postData[this._postData.length] = {id: +target.dataset.id, quantity: +quantity.innerHTML};
					break;
				}
				target = target.parentNode;
			}			
		}
	}
};
// Устанавливает объект this._targetNodes с узлами с атрибутами [data-cart-window]
// target - целевой контейнер
CartForm.prototype._setTargetNodes = function (target) {
	var elems = target.querySelectorAll('[data-cart-window]');
	this._targetNodes = {};
	for ( var i = 0; i < elems.length; i++ ) {
		this._targetNodes[elems[i].dataset.cartWindow] = elems[i];
	}	
	this._targetNodes.id = target;
};
// callback изменения количества товара
// Вычисляет сумму товара и общую сумму
CartForm.prototype._changeQuantity = function (event) {
	var target = event.target;
	while ( target != this._elem ) {
		if ( target.dataset.id ) {
			this._setTargetNodes(target);
			( this._targetNodes['service name'] ) ? this._changeServiceQuantityAjax() : this._changeProductQuantityAjax();
			break;
		}
		target = target.parentNode;	
	}
};
// Выполняет запрос изменения количества товара
CartForm.prototype._changeProductQuantityAjax = function () {
	var formData = new FormData();
	formData.set('id', this._targetNodes.id.dataset.id);
	formData.set('quantity', this._targetNodes.quantity.innerHTML);
	this.expectation = this.quantityVidjet.qetExpectation(); // Объект ожидания callback виджета количества
	$.ajax({
		url: "/cart/add",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._refreshData.bind(this),
		error: this._showErrorQuant.bind(this)
	});		
};

// Выполняет запрос изменения количества услуги
CartForm.prototype._changeServiceQuantityAjax = function () {
	let formData = new FormData();
	formData.set('id', this._targetNodes.id.dataset.id);
	formData.set('quantity', this._targetNodes['quantity'].innerHTML);
	this.expectation = this.quantityVidjet.qetExpectation(); // Объект ожидания callback виджета количества
	$.ajax({
		url: '/cart/add-service',
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._refreshData.bind(this),
		error: this._showError.bind(this)
	});		
};
// Отображает сообщение об ошибке при изменение количества товара
CartForm.prototype._showErrorQuant = function () {
	this.expectation.remove();
	this._showError();
};
// Отображает сообщение об ошибке
CartForm.prototype._showError = function (msg) {
	console.log(msg);
	this._notice.innerHTML = '';
	this.addWarning('Произошла ошибка!<br> Попробуйте обновить страницу.');
};
// Обновляет данные
// Генерирует событие обновления количества
CartForm.prototype._refreshData = function (data) {
	this._notice.innerHTML = '';
	( this._targetNodes['service name'] ) ? this.setServiceData(data) : this.setProductData(data);
	this._totalAmount();
	this.expectation.remove(); // Отображает количество товара
	/* this._elem.dispatchEvent(new CustomEvent( 'quantityRefresh', {detail: { id: this._targetNodes.id.dataset.id, quantity: +this._targetNodes.quantity.innerHTML }} )); */
};

CartForm.prototype._roundPrice = function (price) {
	return Math.floor(price * 100) / 100;
};

// Устанавливает данные в соответствующие им узлы
CartForm.prototype.setProductData = function (data) {
	data = JSON.parse(data);
	this._targetNodes.id.dataset.id = data.id;
	this._targetNodes.image.src = document.location.origin + '/images/products/mini/' + data.image;
	this._targetNodes.name.innerHTML = data.name;
	this._targetNodes.price.innerHTML = data.price.price_history.price;
	/* this._targetNodes.product_stock.innerHTML = data.product_stock.quantity; */
	this._targetNodes.quantity.innerHTML = data.quantity;
	this._targetNodes.sum.innerHTML = this._roundPrice( (data.price.price_history.price * data.quantity) * 100 );
	
	if (data.discount) {
		this._targetNodes.discount.innerHTML = `Скидка: ${data.discount}%`;
		this._targetNodes.sum.innerHTML = this._roundPrice(data.discount_price);
	} else {
		this._targetNodes.discount.innerHTML = '';
		this._targetNodes.sum.innerHTML = this._roundPrice( (data.price.price_history.price * data.quantity) * 100 );
	}		
};

// Устанавливает данные в соответствующие им узлы
CartForm.prototype.setServiceData = function (data) {
	data = JSON.parse(data);
	this._targetNodes.id.dataset.id = data.service.id;
	this._targetNodes['service name'].innerHTML = data.service.name;
	this._targetNodes['service price'].innerHTML = data.service.service_price.service_price_history.price;
	this._targetNodes['quantity'].innerHTML = data.service.quantity;
	this._targetNodes.sum.innerHTML = this._roundPrice((data.service.service_price.service_price_history.price * data.service.quantity) * 100);
};
// Удаляет товар из корзины
CartForm.prototype._remove = function (event) {
	var target = event.target;
	while ( target != this._elem ) {
		if ( target.className.baseVal === 'deleteIcon' ) {
			this._targetNodes = {};
			this._targetNodes.id = event.target; // Целевой контейнер
			while ( this._targetNodes.id != this._elem ) {
				if ( this._targetNodes.id.dataset.id ) {
					(this._targetNodes.id.querySelector('[data-cart-window="service name"]')) ? this._removeServiceAjax() : this._removeProductAjax();
					return;
				}
				this._targetNodes.id = this._targetNodes.id.parentNode;
			}						
		}
		target = target.parentNode;	
	}	
};
// Выполняет запрос удаления услуги из корзины
CartForm.prototype._removeServiceAjax = function () {
	var formData = new FormData();
	formData.set('id', this._targetNodes.id.dataset.id);
	$.ajax({
		url: "/cart/remove-service",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._removeCont.bind(this),
		error: this._showError.bind(this)
	});		
};
// Выполняет запрос удаления товара из корзины
CartForm.prototype._removeProductAjax = function () {
	var formData = new FormData();
	formData.set('id', this._targetNodes.id.dataset.id);
	$.ajax({
		url: "/cart/remove",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._removeCont.bind(this),
		error: this._showError.bind(this)
	});		
};
// Удаляет контейнер товара и вычисляет общую сумму
// Генерирует событие удаления товара
CartForm.prototype._removeCont = function () {
	this._targetNodes.id.remove();
	this._totalAmount();
	this._checkAvailability();
	this._elem.dispatchEvent(new CustomEvent( 'removeProduct', {detail: { id: this._targetNodes.id.dataset.id }} ));
};
// Проверяет пуста ли корзина
CartForm.prototype._checkAvailability = function () {
	var productConts = this._elem.querySelectorAll('[data-id]');
	if (!productConts.length) this._elem.innerHTML = '<h1>Корзина пуста</h1>';
};
// Перенаправляет на страницу оформления заказа
CartForm.prototype._checkout = function (event) {
	var target = event.target;
	while ( target != this._elem ) {
		if ( target.dataset.button == 'checkout' ) {
			this._redirect();
			return;
		}
		target = target.parentNode;	
	}		
};
// Выполняет запрос добавления выбранных товаров для оформления заказа
CartForm.prototype._addToOrderAjax = function () {
	var order = {order: this._postData};
	$.ajax({
		url: "/cart/add-to-order",
		type: "POST",
		data: JSON.stringify(order),
		processData: false,
		contentType: 'application/json',
		success: this._redirect.bind(this),
		error: this._showError.bind(this)
	});		
};
CartForm.prototype._checkout = function (event) {
	var target = event.target;
	while ( target != this._elem ) {
		if ( target.dataset.button == 'checkout' ) {
			this._checkSelected();
			return;
		}
		target = target.parentNode;	
	}		
};
// Если не выбран ни один товар, выводит сообщение об ошибке
// Выполняет запрос добавления выбранных товаров для оформления заказа
CartForm.prototype._checkSelected = function () {
	if (!this._postData.length) {
		this._notice.innerHTML = '';
		this.addWarning('Не выбран ни один товар.<br> Отметьте товары, которые хотите купить.');		
		return;
	}
	this._addToOrderAjax();
};
// Перенаправляет на страницу оформления заказа
CartForm.prototype._redirect = function (data) {
	document.location.href = document.location.origin + '/cart/order';
};

/* Внешние методы */

CartForm.prototype.start = function () {
	this._elem.addEventListener('click', this._select.bind(this));
	this._elem.addEventListener('click', this._selectAll.bind(this));
	this._elem.addEventListener('click', this._remove.bind(this));
	this._elem.addEventListener('quantityChange', this._changeQuantity.bind(this));
	this._elem.addEventListener('click', this._checkout.bind(this));	
};