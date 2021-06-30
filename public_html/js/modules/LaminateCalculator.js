"use strict";
class LaminateCalculator extends PacksCalculator {
	constructor(args) {
		super(args);	
		
		this._calculateDiscount();
	}

	_roundPrice(price) {
		return Math.floor(price * 100) / 100;
	}

	_setDiscount(discount) {
		let price = +this.nodes.price.innerHTML;
		
		this.nodes.discount.innerHTML = discount;
		this.nodes.discountAmount.innerHTML =  this._roundPrice( price * (discount / 100) );
		this.nodes.price.innerHTML = this._roundPrice( price - (price* (discount / 100)) );		
	}

	_calculateDiscount() {
/* 		if (this.nodes.area.value >= 100) {
			this._setDiscount(10);
			
			return;
		}			
		if (this.nodes.area.value >= 50) {
			this._setDiscount(5);
			
			return;
		}
		this._setDiscount(0); */

		if (this.nodes.discount) this._setDiscount(this.nodes.discount.innerHTML);
	}


	start() {
		super.start();
		
		this.nodes.price.addEventListener('changeprice', () => this._calculateDiscount());
	}
}