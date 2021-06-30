"use strict";
class PacksCalculator {
	constructor(container) {
		this._container = container;
		this._nodes = {};
		
		this.quantityVidjet = new QuantityVidjet(container);
		this._margin = 0;
		
		this._setNodes();
		this._calculateArea();
	}

	_setNodes() {
		let elems = this._container.querySelectorAll('[data-packs-calculator]');

		for ( var i = 0; i < elems.length; i++ ) {
			this._nodes[elems[i].dataset.packsCalculator] = elems[i];
		}		
	}

	_calculateArea() {		
		let areaWithMargin = this._nodes.quantity.innerHTML * this._nodes.packing_area.innerHTML;
		let area = +areaWithMargin / (1 + this._margin);
	
		area = Math.floor(area * 100) / 100;
		this._nodes.area.value = area;
		
		this._nodes.price.innerHTML = this._nodes.price.dataset.packsCalculatorPrice * this._nodes.quantity.innerHTML;
	}
	
	_calculatePacks() {
		let area = this._nodes.area.value.replace(/[,]+/g, '.');
		
		area = area.replace(/[^0-9 .]+/g, '');
		
		let areaWithMargin = +area + (area * this._margin);
		let packs = areaWithMargin / this._nodes.packing_area.innerHTML;

		packs = Math.ceil(packs);
		if (!packs) packs = 1;
		
		this._nodes.area.value = area;
		this._nodes.quantity.innerHTML = packs;
		this._nodes.price.innerHTML = this._nodes.price.dataset.packsCalculatorPrice * this._nodes.quantity.innerHTML;
	}

	_setMargin() {
		this._margin = event.target.value / 100;
		
		this._calculatePacks();
	}
	
	start() {
		if (this._nodes['margin']) this._nodes['margin'].querySelector('[checked]').checked = true;
		
		this._container.querySelector('.quantityVidjet').addEventListener('quantityChange', () => this._calculateArea());
		this._nodes.area.addEventListener('input', () => this._calculatePacks());
		this._nodes.margin.addEventListener('input', () => this._setMargin());
	}
}