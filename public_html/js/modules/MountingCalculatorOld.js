"use strict";
class MountingCalculator extends PacksCalculator {
	constructor(args) {
		super(args);
	}

	_calculateMountingPrice(mountingPrice) {
		let totalMoutingPrice = mountingPrice * this.nodes.area.value;
		
		this.nodes['mounting price'].innerHTML = Math.ceil(totalMoutingPrice * 100) / 100;		
		this.nodes['mounting price'].dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}

	_calculateArea() {
		super._calculateArea();
		
		this._setMountingPrice();
	}

	_calculatePacks() {
		super._calculatePacks();
		
		this._setMountingPrice();
	}

	_setMountingPrice() {			
		let mountingPrice = 0;
		let mountingPriceContainer = this._container.querySelector('.mountingPrice');
		
		if (!this.nodes.mounting.checked) {
			this.nodes['mounting price'].innerHTML = 0;
			this.nodes['mounting price'].dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
			
			mountingPriceContainer.style.display = 'none';
			
			return;
		}
		switch(this._margin) {
			case 0:
				mountingPrice = this._container.querySelector('[name="Укладка ламината одним полотном"]').value;

				this._calculateMountingPrice(mountingPrice);
				mountingPriceContainer.style = '';
				break;
			case 0.05:
				mountingPrice = this._container.querySelector('[name="Укладка ламината по прямой"]').value;
				
				this._calculateMountingPrice(mountingPrice);
				mountingPriceContainer.style = '';
				break;
			case 0.1:
				mountingPrice = this._container.querySelector('[name="Укладка ламината по диагонали"]').value;
				
				this._calculateMountingPrice(mountingPrice);
				mountingPriceContainer.style = '';
				break;				
		} 
	}

	start() {
		super.start();
		
		this.nodes.mounting.addEventListener('input', () => this._setMountingPrice());
	}
}