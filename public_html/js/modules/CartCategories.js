"use strict";
class CartCategories extends Cart {
	constructor(args) {
		super(args);
	}

	/**
	* Устанавливает окно добавления товара в корзину 
	*/
	_setCartWindow() {
		this.cartWindowContainer = document.documentElement.querySelector('#cartCategoriesWindow');
		if ( !this.cartWindowContainer ) return;
		this.cartWindow = new CartCategoriesWindow( this.cartWindowContainer );
		this.cartWindowContainer.addEventListener('refreshWinow', this._refreshIconButtonCB.bind(this));
	}

	_getContainerData(className) {
		
	}

	_getFormData(floorContainer) {
		let quantityEl = floorContainer.querySelector('[data-cart="quantity"]');		
		let laminateQuantity = (quantityEl) ? +quantityEl.innerHTML : 1;
		let cartProduct = floorContainer.querySelectorAll('.cartProduct');
		let cartService = floorContainer.querySelectorAll('.cartService');
		let formData = new FormData();
		
		formData.set(`products[${this._button.dataset.cartId}][id]`, this._button.dataset.cartId);
		formData.set(`products[${this._button.dataset.cartId}][quantity]`, laminateQuantity);
				
		for (let i = 0; i < cartProduct.length; i++) {
			let productEl = cartProduct[i].querySelector('[data-cart-related-product="id"]');
			if (!productEl) continue;
			let productId = (productEl.value) ? productEl.value : productEl.dataset.cartRelatedProductId
			let quantity = cartProduct[i].querySelector('[data-cart-related-product="quantity"]').innerHTML;
			
			if (!productId) continue;
			
			formData.set(`products[${productId}][id]`, productId);
			formData.set(`products[${productId}][quantity]`, quantity);
		}
		
		for (let i = 0; i < cartService.length; i++) {
			let serviceId = cartService[i].querySelector('[data-cart-service="id"]').value;
			let quantity = cartService[i].querySelector('[data-cart-service="quantity"]').value;
			
			if (!serviceId ) continue;
			
			formData.set(`services[${serviceId}][id]`, serviceId);
			formData.set(`services[${serviceId}][quantity]`, quantity);
		}		
		
		return formData;
	}

	/**
	* Выполняет запрос для добавления пола в корзину
	*
	* @param node floorContainer
	*/
	_ajaxAddForFloor(floorContainer) {	
/* 		let serviceId = floorContainer.querySelector('[name="service[id]"]').value;
		let serviceQuantity = floorContainer.querySelector('[data-cart-service="quantity"]').value;
		
		if (serviceId) {
			formData.set(`services[${serviceId}][id]`, serviceId);
			formData.set(`services[${serviceId}][quantity]`, serviceQuantity);			
		}	 */
	
		$.ajax({
			url: "/cart/multiple-add",
			type: "POST",
			data: this._getFormData(floorContainer),
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
		if (this._requestForFloorOrRedirect('Пол')) return;
		
		super._ajaxAdd();
	}
	
	_addedProductAjax() {
		if (this._requestForFloorOrRedirect('Пол')) return;	
		
		super._addedProductAjax();
	}

	start() {
		super.start();
	}
}