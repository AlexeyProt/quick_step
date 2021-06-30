"use strict";
class PacksCalculator {
	constructor(container) {
		this._container = container;
		this.nodes = {};
		
		this.laminate = container.querySelector('#laminate');
		this.quantityVidjet = new QuantityVidjet(this.laminate);
		this._margin = 0;
		
		this._setNodes();
		this._calculateArea();
	}

	_setNodes() {
		let elems = this._container.querySelectorAll('[data-packs-calculator]');

		for ( var i = 0; i < elems.length; i++ ) {
			this.nodes[elems[i].dataset.packsCalculator] = elems[i];
		}		
	}

	_setPrice() {
		let price = this.nodes.price.dataset.packsCalculatorPrice * this.nodes.quantity.innerHTML;
		
		this.nodes.price.innerHTML = Math.floor(price * 100) / 100;
	}

	_calculateArea() {		
		let areaWithMargin = this.nodes.quantity.innerHTML * this.nodes.packing_area.innerHTML;
		let area = +areaWithMargin / (1 + this._margin);
	
		area = Math.floor(area * 100) / 100;
		this.nodes.area.value = area;
		
		this._setPrice();
		
		this.nodes.price.dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}
	
	_calculatePacks() {
		let area = this.nodes.area.value.replace(/[,]+/g, '.');
		
		area = area.replace(/[^0-9 .]+/g, '');
		
		let areaWithMargin = +area + (area * this._margin);
		let packs = areaWithMargin / this.nodes.packing_area.innerHTML;

		packs = Math.ceil(packs);
		if (!packs) packs = 1;
		
		this.nodes.area.value = area;
		this.nodes.quantity.innerHTML = packs;
		
		this._setPrice();
		
		this.nodes.price.dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}

	_setMargin() {
		this._margin = event.target.value / 100;
		
		this._calculatePacks();
	}
	
	start() {
		if (this.nodes['margin']) {
			this.nodes['margin'].querySelector('[checked]').checked = true;
			this.nodes.margin.addEventListener('input', () => this._setMargin());
		}
		
		this.nodes.quantityVidjet.addEventListener('quantityChange', () => this._calculateArea());
		this.nodes.area.addEventListener('input', () => this._calculatePacks());	
	}
}