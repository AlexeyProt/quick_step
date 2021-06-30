"use strict";
class PlinthCalculator {
	constructor(container) {
		this._container = container;
		this.nodes = {};
		
		this.plinth = container.querySelector('#plinth');
		this.quantityVidjet = new QuantityVidjet(this.plinth);
		this._plinthCharact = this.plinth.querySelector('#plinthCharact').content.children[0];
		
		this._setNodes();
		this._showPlinthCharact();
		/* this._calculatePerimeter(); */
	}

	_setNodes() {
		let elems = this._container.querySelectorAll('[data-plinth-calculator]');

		for ( let i = 0; i < elems.length; i++ ) {
			this.nodes[elems[i].dataset.plinthCalculator] = elems[i];
		}		
		
		elems = this._plinthCharact.querySelectorAll('[data-plinth-calculator]');
		
		for ( let i = 0; i < elems.length; i++ ) {
			this.nodes[elems[i].dataset.plinthCalculator] = elems[i];
		}			
	}

	_setPrice() {
		let price = this.nodes.price.dataset.plinthCalculatorPrice * this.nodes.quantity.innerHTML;
		
		this.nodes.price.innerHTML = Math.floor(price * 100) / 100;
	}

	_calculatePerimeter() {		
		let perimeter = this.nodes.quantity.innerHTML * this.nodes.length.innerHTML;
	
		perimeter = Math.floor(perimeter * 100) / 100;
		this.nodes.perimeter.value = perimeter;
		
		this._setPrice();
		
		this.nodes.price.dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}
	
	_calculateQuantity() {
		let perimeter = this.nodes.perimeter.value.replace(/[,]+/g, '.');
		
		perimeter = perimeter.replace(/[^0-9 .]+/g, '');
		
		let quantity = perimeter / this.nodes.length.innerHTML;

		quantity = Math.ceil(quantity);
		if (!quantity) quantity = 1;
		
		this.nodes.perimeter.value = perimeter;
		this.nodes.quantity.innerHTML = quantity;
		
		this._setPrice();
		
		this.nodes.price.dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}	
	
	_showPlinthCharact() {		
		if (this.nodes['buy plinth'].checked) {			
			this.plinth.append(this._plinthCharact);
			
			this.nodes.perimeter.value = this._container.querySelector('[data-packs-calculator="area"]').value;
			this._calculateQuantity();
	
			return;
		}

		this.nodes.quantity.innerHTML = 0;

		this._calculatePerimeter();
		
		this._plinthCharact.remove();
	}
	
	start() {
		this.nodes.quantityVidjet.addEventListener('quantityChange', () => this._calculatePerimeter());
		this.nodes.perimeter.addEventListener('input', () => this._calculateQuantity());
		this.nodes['buy plinth'].addEventListener('input', () => this._showPlinthCharact());
	}
}