"use strict";
class MountingPlinthCalculator extends PlinthCalculator {
	constructor(args) {
		super(args);
		
		this.setMountingPrice();
	}

	_setMountingPerimeter(perimeter) {	
		this.nodes['mounting perimeter'].value = (perimeter) ? perimeter : '';
		this.nodes['mounting quantity'].value = Math.ceil(perimeter);		
	}
	
	_calculateMountingPrice(mountingPrice) {	
		let totalMoutingPrice = mountingPrice * this.nodes['mounting quantity'].value;
		
		totalMoutingPrice = Math.ceil(totalMoutingPrice * 100) / 100;
		
		this.nodes['mounting price'].innerHTML = totalMoutingPrice;		
		this.nodes['mounting price'].dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}

	_calculatePerimeter() {
		super._calculatePerimeter();
		
		this.setMountingPrice();
	}

	_calculateQuantity() {
		super._calculateQuantity();

		this.setMountingPrice();
	}

	_showMoutingPrice() {
		let serviceId = this.nodes.mounting.value;

		this.nodes['mounting_price_per_unit'].innerHTML = this._container.querySelector(`[data-plinth-calculator-service-price-id="${serviceId}"]`).value;
		
		this._container.querySelector('.mountingPlinthPrice').style = '';	

		if (this.nodes['buy plinth'].checked && !+this.nodes['mounting perimeter'].value) {
			this._setMountingPerimeter(this.nodes.perimeter.value);
			
			let mountingPrice = this._container.querySelector(`[data-plinth-calculator-service-price-id="${serviceId}"]`).value;
			
			this._calculateMountingPrice(mountingPrice);	

			return;
		} 
		this._calculateMountingQuantity();		
	}
	
	_hideMoutingPrice() {
		this.reset();
		this._container.querySelector('.mountingPlinthPrice').style.display = 'none';		
	}
	
	setMountingPrice() {				
		if (this.nodes.mounting.value == '') {
			this._hideMoutingPrice();
			
			return;
		}
		this._showMoutingPrice();
	}
	
	_calculateMountingQuantity() {
		let perimeter = this.nodes['mounting perimeter'].value.replace(/[,]+/g, '.');
		
		perimeter = perimeter.replace(/[^0-9 .]+/g, '');
		
		let serviceId = this.nodes.mounting.value;	
		let mountingPrice = this._container.querySelector(`[data-plinth-calculator-service-price-id="${serviceId}"]`).value;
		
		this._setMountingPerimeter(perimeter);
		
		this._calculateMountingPrice(mountingPrice);
	}		

	reset() {
		this.nodes['mounting price'].innerHTML = 0;		
		this.nodes['mounting perimeter'].value = '';
		this.nodes['mounting_price_per_unit'].innerHTML = 0;	
		this.nodes['mounting quantity'].value = 0;
		
		this.nodes['mounting price'].dispatchEvent( new CustomEvent('changeprice', { bubbles: true }) );
	}

	start() {
		super.start();

		this.nodes.mounting.addEventListener('input', () => this.setMountingPrice());
		this.nodes['mounting perimeter'].addEventListener('input', () => this._calculateMountingQuantity());
	}
}