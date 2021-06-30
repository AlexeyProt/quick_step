"use strict";
/* Класс корзины */
function OrderForm(elem) {
	BaseForm.apply(this, arguments);		
	this._totalAmountElems = this._elem.querySelectorAll('[data-cart-window="total amount"]');
	this._deliveryCont = this._elem.querySelector('[data-cart="delivery"]');
	this._deliveryMessage = this._elem.querySelector('[data-delivery="message"]');
	this._phone = this._elem.querySelector('[name="phone"]');
	this._agreement = this._elem.querySelector('[name="agreement"]');	
	this._delivery = this._elem.querySelector('[name="delivery"]');	
	this._adres = this._elem.querySelector('[name="adres"]');	
	this._product = this._elem.querySelector('#product').content.cloneNode(true);

	this._addDelivery();
	this.start();
	this.confirm();
}
// Наследуюет класс BaseForm
OrderForm.prototype = Object.create(BaseForm.prototype);
OrderForm.prototype.constructor = OrderForm;

/* Внутренние методы */

OrderForm.prototype._setRequiredFields = function () {
	this.addRequiredField( this._elem.querySelector('[name="email"]'), 'Укажите E-mail.<br>' );
	this.addRequiredField( this._elem.querySelector('[name="phone"]'), 'Укажите номер телефона.<br>' );
	this.addRequiredField( this._agreement, 'Подтвердите согласие на обработку персональных данных.<br>', this._agreement.checked );
	if ( this._delivery.checked ) this.addRequiredField( this._adres, 'Укажите адрес доставки.<br>' );
	// this.addRequiredField( this._phone, 'Пожалуйста, укажите телефон!<br>', this._phone.value.includes('_') );
};

// Сбрасывает общую сумму
OrderForm.prototype._resetTotalAmount = function () {
	for ( var i = 0; i < this._totalAmountElems.length; i++ ) {
		this._totalAmountElems[i].innerHTML = 0;
	}
};
// Устанавливает общую сумму
OrderForm.prototype._setTotalAmount = function (sum) {
	for ( var i = 0; i < this._totalAmountElems.length; i++ ) {
		this._totalAmountElems[i].innerHTML = Number(this._totalAmountElems[i].innerHTML) + Number(sum);
	}
};
// Вычисляет и устанавливает общую сумму
OrderForm.prototype._totalAmount = function () {
	this._productConts = this._elem.querySelectorAll('[data-id]');
	this._resetTotalAmount();
	for ( var i = 0; i < this._productConts.length; i++ ) {
		var sum = this._productConts[i].querySelector('[data-cart-window="sum"]');
		this._setTotalAmount(sum.innerHTML);
	}
	if ( this._delivery.checked ) {
		var deliveryPrice = this._deliveryCont.querySelector('[data-delivery="price"]');
		this._setTotalAmount(deliveryPrice.innerHTML);
	}
};

OrderForm.prototype._focusPhoneCB = function (event) {
	if ( !event.target.value ) event.target.value = '+7 (___) ___ ____';
	var cursor = event.target.value.indexOf('_');
	event.target.setSelectionRange(cursor, cursor);
};

// Обработчик события input
// Заменяет все символы, кроме цифр, при вводе 
OrderForm.prototype._replaceCharsCB = function (event) {
	var mask = '+7 (___) ___ ____';

	var start = event.target.selectionStart,
		end = event.target.selectionEnd;
		
	while ( /[) ]/g.test(event.target.value[end]) ) {
		end++;
		start = end;
	}

	var	val = event.target.value.replace(/(.*?)\s(.*?)/, '$2');
	val = val.replace(/[^0-9]/g, '');
	var i = 0;
	mask = mask.replace(/_/g, function (match, offset, input) {
		return val.charAt(i++) || "_";

	});
	event.target.value = mask;
	if ( event.target.value[end-1] === '_' || event.target.value[end-1] === undefined ) {
		end = event.target.value.indexOf('_');
	}
	if ( event.target.value[end-1] === ')' ) {
		end--
		if (event.target.value[end-1] === '_') end--;
	}
	if ( !/(.*?)\s\((.*?)/.test( event.target.value.slice(0, start-1) )) end = event.target.value.indexOf('_');	// Если курсор находится в часте строки '+7 (' то он устанавливается перед первым '_'
	// if ( !/(.*?)\s\((\d+)\)\s(\d+)\s(\d+)/.test( event.target.value.slice(0, start-1) )) end = event.target.value.indexOf('_');	// Если курсор находится в часте строки '+7 (' то он устанавливается перед первым '_'
	start = end;
	event.target.setSelectionRange(start, end);
};

OrderForm.prototype._addDelivery = function () {
	this._totalAmount();
	if ( this._delivery.checked ) {
		this._adres.type = 'text';
		this._deliveryCont.style.display = 'block';
		this._deliveryMessage.style.display = 'block';
		this._deliveryMessage.previousElementSibling.style.display = 'none';
		return;
	}
	this._adres.type = 'hidden';
	this._deliveryCont.style.display = 'none';
	this._deliveryMessage.style.display = 'none';
	this._deliveryMessage.previousElementSibling.style.display = '';	
	this._notice.innerHTML = '';
};

// Отображает сообщение об ошибке
OrderForm.prototype._showError = function (msg) {
	this._notice.innerHTML = '';
	console.log(msg);
	if (msg.responseJSON) {
		this._refreshProducts(msg.responseJSON);
		this.addWarning('Некоторых товаров нет в наличии.<br> Если хотите продолжить, нажмите оформить заказ.');
		return;
	}
	
	
	
	this.addWarning('Произошла ошибка!<br> Попробуйте обновить страницу.');
};

// Выполняет запрос добавления выбранных товаров для оформления заказа
OrderForm.prototype._ajax = function (formData) {
	formData.delete('agreement');
	formData.delete('delivery');
	var order = { customer: Object.fromEntries(formData) };
	$.ajax({
		url: "/cart/checkout",
		type: "POST",
		data: JSON.stringify(order),
		processData: false,
		contentType: 'application/json',
		beforeSend: this.addStatus('Идет отправка данных...'),
		success: this._checkoutSuc.bind(this),
		error: this._showError.bind(this)
	});		
};

OrderForm.prototype._getObj = function (arr) {
	let obj = {};
	for ( let i = 0; i < arr.length; i++ ) {
		obj[arr[i].dataset.cartWindow] = arr[i];
	}
	return obj;
};

OrderForm.prototype._refreshProducts = function (data) {
	let products = this._elem.querySelector('#products');
	
	products.innerHTML = '';
	
	for ( let i = 0; i < data.length; i++ ) {
		let product = this._product.firstElementChild.cloneNode(true),		
			dataNodes = this._getObj(product.querySelectorAll('[data-cart-window]'));	
		
		dataNodes.image.src = document.location.origin + '/images/products/mini/' + data[i].image;
		dataNodes.name.innerHTML = data[i].name;
		dataNodes.price.innerHTML = data[i].price.price_history.price;
		if (data[i].to_much) {
			dataNodes.quantity.parentNode.style.color = 'red';
			dataNodes.quantity.parentNode.innerHTML = (data[i].product_stock.quantity) ? '<span>Осталось только '+data[i].product_stock.quantity+' шт.</span>' : 'Нет в наличии';			
			dataNodes.sum.innerHTML = data[i].price.price_history.price * data[i].product_stock.quantity;
		}
		else {
			dataNodes.quantity.innerHTML = data[i].quantity;		
			dataNodes.sum.innerHTML = data[i].price.price_history.price * data[i].quantity;			
		}

		
		products.append(product);
		
	}

};
// Перенаправляет на страницу оформления заказа
OrderForm.prototype._checkoutSuc = function (data) {
	this._refreshProducts(data);
	
	this._notice.innerHTML = '';
	this.addSucNotice('Заказ сформирован.<br>На Ваш e-mail отправлена информация о заказе.<br>');
	var buttonSend = this._elem.querySelector('[data-button="sendData"]');
	var buttonMain = buttonSend.cloneNode(true);
	buttonMain.dataset.button = 'redirectMain';
	buttonMain.children[0].innerHTML = 'Перейти на главную';
	buttonMain.addEventListener('click', this._redirectMain.bind(this));
	buttonSend.after(buttonMain);
	buttonSend.remove();
};
// Перенаправляет на главную страницу
OrderForm.prototype._redirectMain = function () {
	document.location.href = document.location.origin;
};

/* Внешние методы */

OrderForm.prototype.start = function () {
	/* this._elem.addEventListener('click', this._checkout.bind(this));	 */
	this._phone.addEventListener('input', this._replaceCharsCB.bind(this));
	this._phone.addEventListener('focus', this._focusPhoneCB.bind(this));
	this._delivery.addEventListener('click', this._addDelivery.bind(this));
};