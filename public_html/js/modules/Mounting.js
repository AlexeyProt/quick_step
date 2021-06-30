"use strict";
class Mounting {
	constructor(container) {
		this._container = container;
		this.nodes = {};
		
		this._moutingServices = container.querySelector('#mountingServices');
		
		this.mountingCalculator = new MountingCalculator(container);
		this.mountingPlinthCalculator = new MountingPlinthCalculator(container);	
		
		this._setNodes();
		this._showServices();
		console.log('Mounting');
	}

	_setNodes() {
		let elems = this._container.querySelectorAll('[data-mounting]');

		for ( var i = 0; i < elems.length; i++ ) {
			this.nodes[elems[i].dataset.mounting] = elems[i];
		}		
	}
	
	_showServices() {
		if (this.nodes.order_mounting.checked) {
			this._moutingServices.style.display = '';
			
			this.mountingCalculator.setMountingPrice();
			this.mountingPlinthCalculator.setMountingPrice();
			
			return;
		}
		this._moutingServices.style.display = 'none';
		
		this.mountingCalculator.reset();
		this.mountingPlinthCalculator.reset();
	}
		
	start() {
		this.mountingCalculator.start();
		this.mountingPlinthCalculator.start();
		
		this.nodes.order_mounting.addEventListener('input', () => this._showServices());
	}
}