"use strict";
let Cart = require('../modules/Cart');

class CartCategories extends Cart {
	constructor(args) {
		super(args);
	}

	/**
	* Выполняет запрос для добавления пола в корзину
	*
	* @param node floorContainer
	*/
	_ajaxAddForFloor(floorContainer) {
		let quantityEl = floorContainer.querySelector('[data-packs-calculator="quantity"]');		
		let quantity = (quantityEl) ? +quantityEl.innerHTML : 1;
		let formData = new FormData();
		
		formData.set('id', this._button.dataset.cartId);
		formData.set('quantity', quantity);
		$.ajax({
			url: "/cart/add",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: this._openWindow.bind(this),
			error: function(jqxhr, status, errorMsg) {
				console.log(errorMsg, jqxhr);
			}
		});			
	}
	
	/**
	* Возвращает ссылку товара
	*
	* @param string
	*/
	_getProductHref() {
		for (let target = this._button; target != document.documentElement; target = target.parentNode) {
			if (target.className != 'product') continue;
			
			return target.querySelector('[href]').href;		
		}
	}
	
	/**
	* Выполняет запрос для добавления пола в корзину или перенаправляет на страницу с товаром
	*
	* @param string categoryName категория пола
	* @return boolean если категория не categoryName, то возавращает false
	*/
	_requestForFloorOrRedirect(categoryName) {
		if (this._button.dataset.cartCategoryName == categoryName) {
			for (let target = this._button; target != document.documentElement; target = target.parentNode) {
				if (target.className != 'floor') continue;
				
				this._ajaxAddForFloor(target);

				return true;
			}
			document.location.href = this._getProductHref();
			
			return true;
		}		
		
		return false;
	}
	
	_ajaxAdd() {
		if (this._requestForFloorOrRedirect('Ламинат')) return;
		
		super._ajaxAdd();
	}
	
	_addedProductAjax() {
		if (this._requestForFloorOrRedirect('Ламинат')) return;	
		
		super._addedProductAjax();
	}

	start() {
		super.start();
	}
}

module.exports = CartCategories;