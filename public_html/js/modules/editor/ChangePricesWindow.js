"use strict";
/* Окно изменения цен товаров */
class ChangePricesWindow extends ConfirmationWindow {
	constructor(args) {
		super(args);	
			
		this._fieldMask = new FieldMask();	
			
		this.priceField = this._elem.querySelector('[name="price"]');	
		
		this._addEventListeners();
	}	
	
	
	_setRequiredFields() {
		this.addRequiredField( this.priceField, 'Укажите цену.<br>' );
	}
	
	_setPriceMask() {
		this._fieldMask.price(event.target);
	}
	
	_addEventListeners() {
		this.priceField.addEventListener('input', () => this._setPriceMask());
	}
}