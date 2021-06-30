"use strict";
class RelatedProductCalculator {
	constructor(container) {
		this._container = container;
		this.nodes = {
			packs: {},
			relatedProduct: {}
		};
		
		this._margin = 0;
		
		this._setNodes();
		this._setRelatedProductPrices();
		console.log('RelatedProductCalculator');
	}

	_setNodes() {
		let elems = this._container.querySelectorAll('[data-related-product-calculator]');

/* 		for ( var i = 0; i < elems.length; i++ ) {
			this.nodes.relatedProduct[elems[i].dataset.relatedProductCalculator] = elems[i];
		}	 */	
		
		elems = this._container.querySelectorAll('[data-packs-calculator]');

		for ( var i = 0; i < elems.length; i++ ) {
			this.nodes.packs[elems[i].dataset.packsCalculator] = elems[i];
		}				
	}
	
	_setRelatedProductNodes(container) {
		let nodes = container.querySelectorAll('[data-related-product-calculator]');
		
		this.nodes.relatedProduct = {};
		for ( var i = 0; i < nodes.length; i++ ) {
			this.nodes.relatedProduct[nodes[i].dataset.relatedProductCalculator] = nodes[i];
		}		
	}

	_setPrice(price, quantity) {
		let totalPrice = price * quantity;

		this.nodes.relatedProduct.price.innerHTML = Math.floor(totalPrice * 100) / 100;
	}

	_calculatePacks() {
		if (!this.nodes.relatedProduct.id.value) return;

		let relatedProductId = this.nodes.relatedProduct.id.value;
		let packing_areaEl = this._container.querySelector(`[data-related-product-calculator-packing_area-id="${relatedProductId}"]`);
		let priceEl = this._container.querySelector(`[data-related-product-calculator-price-id="${relatedProductId}"]`);
		let area = +this.nodes.packs.area.value;
		let areaWithMargin = +area + (area * this._margin);
		let packs = areaWithMargin / packing_areaEl.value;

		packs = Math.ceil(packs);
		if (!packs) packs = 1;		
		
		this.nodes.relatedProduct.quantity.innerHTML = packs;
		this._setPrice(priceEl.value, packs);
		
		this.nodes.relatedProduct.price.dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );		
	}
	
	_calculatePrice() {
		if (!this.nodes.relatedProduct.id.value) return;
		
		let relatedProductId = this.nodes.relatedProduct.id.value;
		let priceEl = this._container.querySelector(`[data-related-product-calculator-price-id="${relatedProductId}"]`);
		
		this._setPrice(priceEl.value, this.nodes.relatedProduct.quantity.innerHTML);
		
		this.nodes.relatedProduct.price.dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );	
	}
	
	_changeQuantityHandler() {
		for (let target = event.target; target != this._container; target = target.parentNode) {
			if (!target.className.includes('relatedProduct')) continue;
			
			this._setRelatedProductNodes(target);
			
			this._setPricePer('price_per_square_meter');
			this._setPricePer('price_per_pack');
			
			this._calculatePrice();			
		}
	}
	
	_setQuantityVidjets() {
		let relatedProductElems = this._container.querySelectorAll('.relatedProduct');
		
		for (let i = 0; i < relatedProductElems.length; i++) {
			let quantityVidjetEl = relatedProductElems[i].querySelector('.quantityVidjet');
			
			if (!quantityVidjetEl) continue;
			
			new QuantityVidjet(quantityVidjetEl);
		}		
	}
	
	_setPricePer(nodeName) {
		if (!this.nodes.relatedProduct[nodeName]) return;
		
		let relatedProductId = this.nodes.relatedProduct.id.value;
		let priceEl = this._container.querySelector(`[data-related-product-calculator-${nodeName}-id="${relatedProductId}"]`);

		this.nodes.relatedProduct[nodeName].innerHTML = priceEl.value;
	}	
	
	_setRelatedProductPrice() {			
		let relatedProductPrice = 0;
		if (!this.nodes.relatedProduct.id.value) {
			this.nodes.relatedProduct['price'].innerHTML = 0;
			this.nodes.relatedProduct['price'].dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
			
			if (this.nodes.relatedProduct['price_per_square_meter']) this.nodes.relatedProduct['price_per_square_meter'].innerHTML = 0;	
			if (this.nodes.relatedProduct['price_per_pack']) this.nodes.relatedProduct['price_per_pack'].innerHTML = 0;	
			
			this.nodes.relatedProduct.priceContainer.style.display = 'none';
			
			return;
		}

		this._setPricePer('price_per_square_meter');
		this._setPricePer('price_per_pack');
		
		this._calculatePacks();
		
		this.nodes.relatedProduct.priceContainer.style.display = '';	
	}
	
	_setRelatedProductPriceHandler() {
		if (event.target.dataset.relatedProductCalculator != 'id') return;
		
		this.nodes.relatedProduct.id = event.target;
		
		for (let target = this.nodes.relatedProduct.id; target != this._container; target = target.parentNode) {
			if (!target.className.includes('relatedProduct')) continue;
			
			this._setRelatedProductNodes(target);
			this._setRelatedProductPrice();
			
			return;
		}
	}
	
	_setRelatedProductPrices() {
		let relatedProductElems = this._container.querySelectorAll('.relatedProduct');
		
		for (let i = 0; i < relatedProductElems.length; i++) {
			this._setRelatedProductNodes(relatedProductElems[i]);
			this._setRelatedProductPrice();
		}
	}
	
	_setMargin() {
		this._margin = event.target.value / 100;
		
		this._setRelatedProductPrices();
	}	
	
	getTotalPrice() {
		let priceElems = this._container.querySelectorAll('[data-related-product-calculator="price"]');
		let totalPrice = 0;
		
		for ( var i = 0; i < priceElems.length; i++ ) {
			totalPrice += +priceElems[i].innerHTML;
		}			

		return totalPrice;
	}	
	
	start() {
		this.nodes.packs.quantityVidjet.addEventListener('quantityChange', () => this._setRelatedProductPrices());
		this.nodes.packs.area.addEventListener('input', () => this._setRelatedProductPrices());
		/* this.nodes.relatedProduct.id.addEventListener('input', () => this._setRelatedProductPrice()); */
		this.nodes.packs.margin.addEventListener('input', () => this._setMargin());
		this._container.addEventListener('input', () => this._setRelatedProductPriceHandler());
		this._container.addEventListener('quantityChange', () => this._changeQuantityHandler());
		
		this._setQuantityVidjets();
	}
}