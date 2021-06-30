"use strict";
class OrderServicesForm extends OrderForm {
	constructor(args) {
		super(args);
		
		this._service = this._elem.querySelector('#service').content.cloneNode(true);
		console.log('OrderServicesForm');
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

		this._elem.querySelector('[data-cart-window="service_sum"]').innerHTML = sum;
	}
	
	// Вычисляет и устанавливает общую сумму
	_totalAmount() {
		let service_sum = this._elem.querySelector('[data-cart-window="service_sum"]');
		let sumPrices = [];

		service_sum.innerHTML = 0;
		this._productConts = this._elem.querySelectorAll('[data-id]');
		this._resetTotalAmount();
		for ( let i = 0; i < this._productConts.length; i++ ) {
			let sum = this._productConts[i].querySelector('[data-cart-window="sum"]');
			let serviceName = this._productConts[i].querySelector('[data-cart-window="service name"]');
			
			if (serviceName) {
				sumPrices.push( Number(sum.innerHTML) );
				
				continue;
			}
			this._setTotalAmount(sum.innerHTML);
		}
		
		this._setServiceSum(sumPrices);
		this._setTotalAmount(service_sum.innerHTML);		
		
		if ( this._delivery.checked ) {
			let deliveryPrice = this._deliveryCont.querySelector('[data-delivery="price"]');
			this._setTotalAmount(deliveryPrice.innerHTML);
		}
	}

	_refreshProducts(data) {
		let cartProducts = this._elem.querySelector('.cartProducts');
		let cartServices = this._elem.querySelector('.cartServices');
		
		cartProducts.innerHTML = '';
		cartServices.innerHTML = '';
		
		for ( let i = 0; i < data.products.length; i++ ) {
			let product = this._product.firstElementChild.cloneNode(true),		
				dataNodes = this._getObj(product.querySelectorAll('[data-cart-window]'));	
			
			product.dataset.id = data.products[i].id;
			dataNodes.image.src = document.location.origin + '/images/products/mini/' + data.products[i].image;
			dataNodes.name.innerHTML = data.products[i].name;
			dataNodes.price.innerHTML = data.products[i].price.price_history.price;
			dataNodes['unit price'].innerHTML = `${data.products[i].unit.reduction}:`;
			dataNodes.unit.innerHTML = ` ${data.products[i].unit.reduction}`;
			
			if (data.products[i].discount) {
				dataNodes.discount.innerHTML = `Скидка: ${data.products[i].discount}%`;
				dataNodes.sum.innerHTML = data.products[i].discount_price;
			} else {
				dataNodes.discount.innerHTML = '';
				dataNodes.sum.innerHTML = data.products[i].price.price_history.price * data.products[i].quantity;
			}							
			dataNodes.quantity.innerHTML = data.products[i].quantity;		
		
			cartProducts.append(product);		
		}
		
		for ( let i = 0; i < data.services.length; i++ ) {
			let service = this._service.firstElementChild.cloneNode(true),		
				dataNodes = this._getObj(service.querySelectorAll('[data-cart-window]'));	
			
			service.dataset.id = data.services[i].id;
			dataNodes['service name'].innerHTML = data.services[i].name;
			dataNodes['service price'].innerHTML = data.services[i].service_price.service_price_history.price;
			dataNodes['unit price'].innerHTML = `${data.services[i].service_unit.unit.reduction}:`;
			dataNodes.unit.innerHTML = ` ${data.services[i].service_unit.unit.reduction}`;
			dataNodes.quantity.innerHTML = data.services[i].quantity;		
			dataNodes.sum.innerHTML = data.services[i].service_price.service_price_history.price * data.services[i].quantity;
		
			cartServices.append(service);		
		}			
	}
	
	_getObjData(selector) {
		let dataElems = this._elem.querySelectorAll(selector);
		let data = {};
		
		for (let i = 0; i < dataElems.length; i++) {
			data[dataElems[i].dataset.id] = {
				id: dataElems[i].dataset.id,
				quantity: +dataElems[i].querySelector('[data-cart-window="quantity"]').innerHTML
			}
		}
		
		return data;
	}
	
	_printOut() {
		let products = this._getObjData('.cartProducts [data-cart-window="id"]');
		let services = this._getObjData('.cartServices [data-cart-window="id"]');
		let print = JSON.stringify({ products: products, services: services });
		let postForm = new PostForm('/cart/print-order', { print: print }); 

		postForm.redirectBlank();
	}
	
	start() {
		super.start();
		
		this._elem.querySelector('[data-button="printOut"]').addEventListener('click', () => this._printOut());
	}
}