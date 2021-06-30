"use strict";
class CartServicesForm extends CartForm {
	constructor(args) {
		super(args);
		

		console.log('CartServicesForm');
	}

	/**
	* Устанавливает сумму за услуги
	* @param array sumPrices
	*/
	_setServiceSum(sumPrices) {
		let sum = 0;
		for (let i = 0; i < sumPrices.length; i++) {
			sum += sumPrices[i];
		}
		if (sum && sum < 5000) sum = 5000;
		
		this.nodes.service_sum.innerHTML = sum;
	}
	// Вычисляет и устанавливает общую сумму
	// Устанавливает массив this._postProductsData с данными выбранных товаров
	// Устанавливает массив this._postServicesData с данными выбранных услуг
	_totalAmount() {
		this._inputs = this._elem.querySelectorAll('[name="select"]');	
		this._postProductsData = [];
		this._postServicesData = [];
		this._resetTotalAmount();
		this.nodes.service_sum.innerHTML = 0;
		
		let sumPrices = [];
		for ( var i = 0; i < this._inputs.length; i++ ) {
			if ( this._inputs[i].checked ) {
				var target = this._inputs[i];
				while ( target != this._elem ) {
					if ( target.dataset.id ) {
						var sum = target.querySelector('[data-cart-window="sum"]'),
							quantity = target.querySelector('[data-cart-window="quantity"]'),
							serviceName = target.querySelector('[data-cart-window="service name"]');
							
						
						
						if (serviceName) {							
							sumPrices.push( Number(sum.innerHTML) );
							this._postServicesData[this._postServicesData.length] = {id: +target.dataset.id, quantity: +quantity.innerHTML};
							
							break;
						}
						this._setTotalAmount(sum.innerHTML);
						this._postProductsData[this._postProductsData.length] = {id: +target.dataset.id, quantity: +quantity.innerHTML};	
						
						break;
					}
					target = target.parentNode;
				}			
			}
		}
		this._setServiceSum(sumPrices);
		this._setTotalAmount(this.nodes.service_sum.innerHTML);
	}

	// Выполняет запрос добавления выбранных товаров и услуг для оформления заказа
	_addToOrderAjax() {
		let order = {
			order_products: this._postProductsData,
			order_services: this._postServicesData
		}
		$.ajax({
			url: "/cart/add-to-order",
			type: "POST",
			data: JSON.stringify(order),
			processData: false,
			contentType: 'application/json',
			success: this._redirect.bind(this),
			error: this._showError.bind(this)
		});		
	}

	// Если не выбран ни один товар, выводит сообщение об ошибке
	// Выполняет запрос добавления выбранных товаров для оформления заказа
	_checkSelected() {
		if (!this._postProductsData.length && !this._postServicesData) {
			this._notice.innerHTML = '';
			this.addWarning('Не выбран ни один товар.<br> Отметьте товары, которые хотите купить.');		
			return;
		}
		this._addToOrderAjax();
	}
}