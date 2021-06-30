"use strict";
class PriceCalculator {
	constructor(container) {
		this._container = container;
		this.nodes = {};
		
		this._mounting = new Mounting(container);
		this._relatedProductCalculator = new RelatedProductCalculator(container);		
		
		this._setNodes();
		this._calculateTotalPrice();
	}

	_setNodes() {
		let elems = this._container.querySelectorAll('[data-price-calculator]');

		for ( var i = 0; i < elems.length; i++ ) {
			this.nodes[elems[i].dataset.priceCalculator] = elems[i];
		}		
	}
	
	_calculateTotalPrice() {
		let servicesPrice = Number(this._mounting.mountingCalculator.nodes['mounting price'].innerHTML) + Number(this._mounting.mountingPlinthCalculator.nodes['mounting price'].innerHTML);

		if (servicesPrice && servicesPrice < 5000) servicesPrice = 5000; 
		
		let prices = [
			+this._mounting.mountingCalculator.nodes['price'].innerHTML,
			servicesPrice,
			+this._mounting.mountingPlinthCalculator.nodes['price'].innerHTML,
			+this._relatedProductCalculator.getTotalPrice()
		];
		let totalPrice = 0;

		for (let i = 0; i < prices.length; i++) {
			totalPrice += prices[i];
		}
		
		this.nodes['service_sum'].innerHTML =  Math.floor(servicesPrice * 100) / 100;
		this.nodes['total price'].innerHTML = Math.floor(totalPrice * 100) / 100;
	}
	
	start() {
		this._mounting.start();
		this._relatedProductCalculator.start();
		
		this._container.addEventListener('changeprice', () => this._calculateTotalPrice());
	}
}