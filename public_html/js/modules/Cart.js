"use strict";
/* Класс корзины */
function Cart() {
	this.content = document.documentElement;
	this.cartIcon = document.querySelector('.cartIcon');
	this.animIcon = new MyAnimation( this.cartIcon.querySelector('g') );
	this.cartIconElems = { quantity: this.cartIcon.querySelector('text'), black: this.cartIcon.querySelector('.black') };
	this.productsData = {};

	this._setCartIcon();
	this._setCartWindow();
	this._refreshIconsAjax();
	this.start();
}

/* Внутренние методы */

// Устанавливает окно добавления товара в корзину
Cart.prototype._setCartWindow = function () {
	this.cartWindowContainer = document.getElementById('cartWindow');
	if ( !this.cartWindowContainer ) return;
	this.cartWindow = new CartWindow( this.cartWindowContainer );
	this.cartWindowContainer.addEventListener('refreshWinow', this._refreshIconButtonCB.bind(this));
};
// Устанавливает кнопки товаров
Cart.prototype._setButtons = function () {
	var elems = document.querySelectorAll('[data-cart-id]');
	this._buttons = {};
	for ( var i = 0; i < elems.length; i++ ) {
		this._buttons[elems[i].dataset.cartId] = elems[i];
	}	
};
// Устанавливает кнопку добавленного в корзину товара
// object data - данные товара
Cart.prototype._setAddedButtons = function (data) {
	if ( this._buttons[data.id] === undefined ) return;
	var cartIcon = this._buttons[data.id].querySelector('.cartIcon');
	// Если у кнопки нет иконки, то добавляет её
	if ( !cartIcon ) {
		cartIcon = this.cartIcon.cloneNode(true);
		this._buttons[data.id].children[0].append(cartIcon);
	}
	this._buttons[data.id].dataset.cartAdded = true;
	this._setQuantButtonIcon(cartIcon, data.quantity);
};
// Устанавливает количество у иконки кнопки товара и запускает анимацию
// cartIcon - элемент иконки
// quantity - количество товара иконки
Cart.prototype._setQuantButtonIcon = function (cartIcon, quantity) {
	var text = cartIcon.querySelector('text'),
		g = cartIcon.querySelector('g'),
		black = cartIcon.querySelector('.black'),
		st2 = cartIcon.querySelector('.st2'),
		anim = new MyAnimation();		
	text.innerHTML = quantity;
	text.style.fill = 'white';
	black.style.stroke = 'white';
	st2.style.stroke = 'white';
	anim.setDraw(function () {
		g.style.opacity = 1 * anim.progress;
	});
	anim.interactAnimate(250);	
};
// Выполняет запрос обновления иконок корзины
Cart.prototype._refreshIconsAjax = function () {
	$.ajax({
		url: "/cart/get-all",
		type: "POST",
		processData: false,
		contentType: false,
		success: this._refreshIconsAll.bind(this),
		error: function(jqxhr, status, errorMsg) {
			console.log(errorMsg, jqxhr);
		}
	});	
};
// Устанавливает количество товара у иконки корзины и запускает анимацию
Cart.prototype._setQuantIcon = function (quantity) {
	this.cartIconElems.quantity.innerHTML = quantity;
	this.cartIconElems.black.style.stroke = 'red';
	this.animIcon.setDraw(this._drawIcon.bind(this));
	this.animIcon.stopAnim();	
	if ( quantity == 0 ) {
		this.animIcon.reverseAnimate();
		return;
	}
	this.animIcon.interactAnimate(250);		
};
// Обноваляет все иконки
// object data - данные товаров добавленных в корзину
Cart.prototype._refreshIconsAll = function (data) {
	this._setButtons();
	
	if (data.length === 0) return;
	this.productsData = data;
	var quantity = 0;
	for (var key in this.productsData) {
		quantity += this.productsData[key].quantity;
		this._setAddedButtons(this.productsData[key]);
	}
	this._setQuantIcon(quantity);	
};

Cart.prototype._drawIcon = function (elem) {
	if ( this.animIcon.progress == 0 ) {
		this.cartIconElems.black.style.stroke = 'black';
	}
	elem.style.opacity = 1 * this.animIcon.progress;
};
// Возвращает общее количество товаров добавленных в корзину
Cart.prototype._getTotalQuant = function () {
	var quantity = 0;
	for (var key in this.productsData) {
		quantity += this.productsData[key].quantity;
	}		
	return quantity;
};
// Обноваляет иконку у кнопки товара и иконку корзины
// object data - данные товара
Cart.prototype._refreshIconButton = function (data) {	
	this.productsData[data.id] = {id: data.id, quantity: data.quantity};
	this._setAddedButtons(this.productsData[data.id]);
	this._setQuantIcon( this._getTotalQuant() );			
};

Cart.prototype._refreshIconButtonCB = function (event) {	
	this._refreshIconButton(event.detail);
};
// Удаляет данные удаленного товара и обновляет иконку корзины
Cart.prototype._removeHandler = function (event) {	
	delete this.productsData[event.detail.id];
	this._setQuantIcon( this._getTotalQuant() );
};
// Устанавливает новое количество у обновленного товара
Cart.prototype._refreshHandler = function (event) {	
	this.productsData[event.detail.id].quantity = event.detail.quantity;
	this._setQuantIcon( this._getTotalQuant() );
};
// callback добавляет товар в корзину по нажатию кнопки с атрибутом [data-cart-id]
Cart.prototype._addCB = function (event) {
	this._button = event.target;
	while ( this._button != this.content ) { // Пока родительский элемент не станет this.content
		if ( !this._button ) return; // Если элемент был удалён
		if ( this._button.dataset.cartId ) {
			// Если товар уже добавлен в корзину
			if ( this._button.dataset.cartAdded ) {
				this._addedProductAjax();
				return;
			}
			this._ajaxAdd();			
			return;
		}
		this._button = this._button.parentNode; // Если текущий элемент не имеет атрибут data-cart-id, то проверяется родитель
	}	
};
// Выполняет запрос для уже добавленного товара с id указанным в атрибуте [data-cart-id]
Cart.prototype._addedProductAjax = function () {
	var formData = new FormData();
	formData.set('id', this._button.dataset.cartId);
	$.ajax({
		url: "/cart/get",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._openWindow.bind(this),
		error: function(jqxhr, status, errorMsg) {
			console.log(errorMsg, jqxhr);
		}
	});			
};
// Выполняет запрос добавления товара в корзину с id указанным в атрибуте [data-cart-id]
Cart.prototype._ajaxAdd = function () {
	var formData = new FormData();
	formData.set('id', this._button.dataset.cartId);
	formData.set('quantity', 1);
	$.ajax({
		url: "/cart/add",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._openWindow.bind(this),
		error: function(jqxhr, status, errorMsg) {
			console.log(errorMsg, jqxhr);
		}
	});			
};
// Открывает окно с добавленным товаром
// string data - данные товара
Cart.prototype._openWindow = function (data) {
	this._button.dataset.cartAdded = true;
	this.cartWindow.caption.innerHTML = 'Товар добавлен в корзину';
	this.cartWindow.setData(data);
	this.cartWindow.openHandler();
};
// Перенаправляет на страницу корзины
Cart.prototype._redirectCart = function () {
	if (Object.keys(this.productsData).length == 0) return;
	document.location.href = document.location.origin + '/cart';
};
// Устанавливает элемент иконки корзины в headerMenu или headerMobileMenu
Cart.prototype._setCartIcon = function () {
	if ( this.cartIcon.clientWidth ) return;
	var headerMobileMenu = document.querySelector('.headerMobileMenu'),
		headerMenu = document.querySelector('.headerMenu');
	if ( headerMobileMenu.clientWidth ) {
		headerMobileMenu.append( this.cartIcon );
	}	
	else if ( headerMenu.clientWidth ) {
		headerMenu.append( this.cartIcon );
	}	
};

/* Внешние методы */

Cart.prototype.start = function () {
	this.content.addEventListener('click', this._addCB.bind(this));
	this.content.addEventListener('removeProduct', this._removeHandler.bind(this));
	this.content.addEventListener('quantityRefresh', this._refreshHandler.bind(this));
	this.content.addEventListener('refreshCartProducts', this._refreshIconsAjax.bind(this));
	this.cartIcon.addEventListener('click', this._redirectCart.bind(this));	
	window.addEventListener( 'optimizedResize', this._setCartIcon.bind(this) );	
};