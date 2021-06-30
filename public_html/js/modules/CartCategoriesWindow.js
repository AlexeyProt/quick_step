"use strict";
class CartCategoriesWindow extends CartWindow {
	constructor(args) {
		super(args);
				
		this._cartProducts = this._elem.querySelector('.cartProducts');
		this._cartServices = this._elem.querySelector('.cartServices');		
		console.log('CartCategoriesWindow', this._cartProduct);
	}

	_setNodes() {
		this.nodes = {};
		
		this._cartProduct = this._elem.querySelector('#cartProduct').content;

		let productElems = this._cartProduct.querySelectorAll('[data-cart-window]');		
		for (let i = 0; i < productElems.length; i++) {
			this.nodes[productElems[i].dataset.cartWindow] = productElems[i];
		}	
		
		this._cartService = this._elem.querySelector('#cartService').content;

		let serviceElems = this._cartService.querySelectorAll('[data-cart-window]');
		for (let i = 0; i < serviceElems.length; i++) {
			this.nodes[serviceElems[i].dataset.cartWindow] = serviceElems[i];
		}			
		
		this.nodes.service_sum = this._elem.querySelector('[data-cart-window="service_sum"]');
	}

	/**
	* Устанавливает данные в соответствующие им узлы
	* Генерирует событие refreshWinow
	*/
	setData(data) {
		data = JSON.parse(data);

		this.nodes.service_sum.innerHTML = '';
		if (data.service_sum) this.nodes.service_sum.innerHTML = `Cумма за работы: ${data.service_sum} руб.`;

		this._cartProducts.innerHTML = '';		
		this._cartServices.innerHTML = '';
		
		for (let i = 0; i < data.products.length; i++) {
			this.nodes.id.dataset.id = data.products[i].id;
			this.nodes.image.src = document.location.origin + '/images/products/mini/' + data.products[i].image;
			this.nodes.name.innerHTML = data.products[i].name;
			this.nodes.quantity.innerHTML = data.products[i].quantity;
			this.nodes.unit.innerHTML = data.products[i].unit.reduction;
			if (this.nodes.product_stock) this.nodes.product_stock.innerHTML = data.products[i].product_stock.quantity;
			
			if (data.products[i].discount) {				
				this.nodes.discount.innerHTML = `Скидка: ${data.products[i].discount}%`;
				this.nodes.price.innerHTML = this._roundPrice(data.products[i].discount_price);
			} else {
				this.nodes.discount.innerHTML = '';
				this.nodes.price.innerHTML = this._roundPrice(data.products[i].price.price_history.price * data.products[i].quantity);
			}
			
			this._elem.dispatchEvent( new CustomEvent('refreshWinow', {detail: data.products[i]} ) );		

			this._cartProducts.append(this._cartProduct.cloneNode(true));
		}
		
		for (let i = 0; i < data.services.length; i++) {
			this.nodes['service id'].dataset.id = data.services[i].id;
			this.nodes['service name'].innerHTML = data.services[i].name;
			this.nodes['service price'].innerHTML = this._roundPrice(data.services[i].service_price.service_price_history.price * data.services[i].quantity);
			this.nodes['service quantity'].innerHTML = data.services[i].quantity;
			this.nodes['service unit'].innerHTML = data.services[i].service_unit.unit.reduction;
			/* this._elem.dispatchEvent( new CustomEvent('refreshWinow', {detail: data.services[i]} ) );		 */

			this._cartServices.append(this._cartService.cloneNode(true));
		}			
	}

	// Устанавливает объект this._targetNodes с узлами с атрибутами [data-cart-window]
	// target - целевой контейнер
	_setTargetNodes(target) {
		let elems = target.querySelectorAll('[data-cart-window]');
		this._targetNodes = {};
		for ( let i = 0; i < elems.length; i++ ) {
			this._targetNodes[elems[i].dataset.cartWindow] = elems[i];
		}	
		this._targetNodes.id = target;
	}
	// callback изменения количества товара
	// Вычисляет сумму товара и общую сумму
	_changeQuantity() {
		let target = event.target;
		while ( target != this._elem ) {
			if ( target.dataset.id ) {
				this._setTargetNodes(target);
				( this._targetNodes['service name'] ) ? this._changeServiceQuantityAjax() : this._changeProductQuantityAjax();
				break;
			}
			target = target.parentNode;	
		}
	}

	// Выполняет запрос изменения количества услуги
	_changeServiceQuantityAjax() {
		let formData = new FormData();
		formData.set('id', this._targetNodes.id.dataset.id);
		formData.set('quantity', this._targetNodes['service quantity'].innerHTML);
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
	}	
	
	// Выполняет запрос изменения количества товара
	_changeProductQuantityAjax() {
		let formData = new FormData();
		formData.set('id', this._targetNodes.id.dataset.id);
		formData.set('quantity', this._targetNodes.quantity.innerHTML);
		this.expectation = this.quantityVidjet.qetExpectation(); // Объект ожидания callback виджета количества
		$.ajax({
			url: '/cart/add',
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: this._refreshData.bind(this),
			error: this._showError.bind(this)
		});		
	}	
	
	// Обновляет данные
	_refreshData(data) {
		this._notice.innerHTML = '';
		this.addNotice('Продолжить покупки?');
		( this._targetNodes['service name'] ) ? this.setServiceData(data) : this.setProductData(data);
		this.expectation.remove(); // Отображает количество товара
		if (this._redirectCartCB) this._redirectCartCB();
	}
	
	// Устанавливает данные в соответствующие им узлы
	setProductData(data) {
		data = JSON.parse(data);
		this._targetNodes.id.dataset.id = data.id;
		this._targetNodes.image.src = document.location.origin + '/images/products/mini/' + data.image;
		this._targetNodes.name.innerHTML = data.name;
		this._targetNodes.quantity.innerHTML = data.quantity;
		
		if (data.discount) {
			this._targetNodes.discount.innerHTML = `Скидка: ${data.discount}%`;
			this._targetNodes.price.innerHTML = data.discount_price;
		} else {
			this._targetNodes.discount.innerHTML = '';
			this._targetNodes.price.innerHTML = this._roundPrice(data.price.price_history.price * data.quantity);
		}		
		
		this._elem.dispatchEvent( new CustomEvent('refreshWinow', {detail: data} ) );
	}
	
	// Устанавливает данные в соответствующие им узлы
	setServiceData(data) {
		data = JSON.parse(data);
		this._targetNodes.id.dataset.id = data.service.id;
		this._targetNodes['service name'].innerHTML = data.service.name;
		this._targetNodes['service price'].innerHTML = this._roundPrice(data.service.service_price.service_price_history.price * data.service.quantity);
		this._targetNodes['service quantity'].innerHTML = data.service.quantity;
		
		if (data.service_sum) this.nodes.service_sum.innerHTML = `Cумма за работы: ${data.service_sum} руб.`;
		/* this._elem.dispatchEvent( new CustomEvent('refreshWinow', {detail: data} ) ); */
	}	
	
	start() {
		/* this._elem.querySelector('.quantityVidjet').addEventListener('quantityChange', this._changeQuantity.bind(this)); */
		this._elem.addEventListener('quantityChange', this._changeQuantity.bind(this));
		this.addButton('[data-button="confirm"]', this.closeHandler.bind(this));
		this.addButton('[data-button="cancel"]', this._redirectCart.bind(this));		
	}
}