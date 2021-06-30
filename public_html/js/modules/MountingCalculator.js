"use strict";
class MountingCalculator extends LaminateCalculator {
	constructor(args) {
		super(args);
		
		this.setMountingPrice();		
	}

	_calculateMountingArea() {
		this.nodes['mounting area'].value = Math.ceil(+this.nodes.area.value);
	}
	
	_calculateMountingPrice(mountingPrice) {
		this._calculateMountingArea();
		
		let totalMoutingPrice = mountingPrice * this.nodes['mounting area'].value;
		totalMoutingPrice = Math.ceil(totalMoutingPrice * 100) / 100;
		
		/* if (totalMoutingPrice < 5000) totalMoutingPrice = 5000; */
		
		this.nodes['mounting price'].innerHTML = totalMoutingPrice;		
		this.nodes['mounting price'].dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}

	_calculateArea() {
		super._calculateArea();
		
		this.setMountingPrice();
	}

	_calculatePacks() {
		super._calculatePacks();
		
		this.setMountingPrice();
	}

	setMountingPrice() {			
		let mountingPrice = 0;
		let mountingPriceContainer = this._container.querySelector('.mountingPrice');

		if (this.nodes.mounting.value == '') {
			this.reset();
			
			mountingPriceContainer.style.display = 'none';
			
			return;
		}
		
		
		let serviceId = this.nodes.mounting.value;

		mountingPrice = this._container.querySelector(`[data-packs-calculator-service-price-id="${serviceId}"]`).value;
		
		this._calculateMountingPrice(mountingPrice);
		
		this.nodes['mounting_price_per_unit'].innerHTML = this._container.querySelector(`[data-packs-calculator-service-price-id="${serviceId}"]`).value;
		
		mountingPriceContainer.style = '';		
	}

	reset() {
		this.nodes['mounting price'].innerHTML = 0;
		this.nodes['mounting_price_per_unit'].innerHTML = 0;
		this.nodes['mounting area'].value = 0;
		
		this.nodes['mounting price'].dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}

	start() {
		super.start();
		
		this.nodes.mounting.addEventListener('input', () => this.setMountingPrice());
	}
}