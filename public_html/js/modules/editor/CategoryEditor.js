"use strict";
/* Редактор */
class CategoryEditor extends Editor {
	constructor(args) {
		super(args);
		
		this._checkbox = new Checkbox(this._elem);
		this._dataEditor = new DataEditor();
		this._fieldMask = new FieldMask();	
		this._productFinder = new ProductFinder(this._elem.querySelector('.searchFormContainer'));
		
		this._addWindowChangePrices();
	}
	
	/**
	 * Открывает окно для изменения цен отмеченных товаров
	*/
	_openWindowChangePrices() {
		if (!this._checkbox.selectedNodes.length) {
			this._snackbar.show('Отметьте товары на которые нужно изменить цену');
			
			return;
		}
		this.windowChangePrices.openHandler();
	}
	
	_getProductContainer(childNode) {
		for (let target = childNode; target != this._elem; target = target.parentNode) {
			if (!target.dataset.productId) continue;
			
			return target;
		}
	}
	
	/**
	 * Возвращает id отмеченных товаров
	 *
	 * @return array
	*/
	_getProductsIds() {
		let ids = [];
		
		for (let i = 0; i < this._checkbox.selectedNodes.length; i++) {
			let productContainer = this._getProductContainer(this._checkbox.selectedNodes[i]);
			
			ids.push( productContainer.dataset.productId );
		}
		
		return ids;
	}

	/** 
	 * Выполняет запрос изменения цен товаров
	 *
	 * @param float|string price цена на товары
	 * @param array ids
	 * @return object
	*/	
	async _makeRequestChangePrices(price, ids) {
		let response = await fetch('/editor/product/change-prices', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
			},
			body: JSON.stringify( {price: price, ids: ids} )
		});

		return await response.json();	
	}
	
	/** 
	 * Обрабатывает запрос изменения цен товаров
	 *
	 * @return object
	*/
	async _handleRequestChangePrices() {
		this.windowChangePrices.progressAnim.start();
		
		try {
			return await this._makeRequestChangePrices(this.windowChangePrices.priceField.value, this._getProductsIds());
		} catch (e) {
			this.windowChangePrices.closeHandler();
			
			this._snackbar.show('Произошла ошибка. Попробуйте еще раз');
			
			throw new Error(e);
		} finally {
			this.windowChangePrices.progressAnim.stop();
		}		
	}
	
	/**
	 * Заполняет элементы с атрибутом data-product="price" ценами товаров
	 *
	 * @param object productsData
	*/
	_fillInProductPrices(productsData) {		
		for (let id in productsData) {
			let productContainer = this._elem.querySelector(`[data-product-id="${id}"]`);
			
			productContainer.querySelector('[data-product="price"]').innerHTML = productsData[id].price.price_history.price;
		}
	}
	
	/**
	 * Изменяет цены отмеченных товаров
	*/
	async _changePrices() {
		this.windowChangePrices.checkFields();
		
		let productsData = await this._handleRequestChangePrices();
		
		this._fillInProductPrices(productsData);
		
		this.windowChangePrices.closeHandler();
		
		this._snackbar.show('Цены изменены');
	}
	
	/**
	 * Изменяет цену товара в элементе с атрибутом data-product="price"
	*/
	async _changePrice() {
/* 		let productEl = this._getProductContainer(this._dataEditor.editableElem);
		
		this._dataEditor.requestData = {price: this._dataEditor.editableElem.innerHTML, ids: [productEl.dataset.productId]};
		this._dataEditor.requestUrl = '/editor/product/change-prices'; */
		
		if (!this._dataEditor.isChanged()) {
			this._dataEditor.focusOut();
			
			return;
		}
		
		try {
			let productsData = await this._dataEditor.handleRequest();
			
			this._fillInProductPrices(productsData);
			
			this._snackbar.show('Цена изменена');			
		} catch (e) {
			this._snackbar.show('Произошла ошибка. Попробуйте еще раз');
			
			throw new Error(e);
		}
	}
	// Добавляет объект окна изменения цен товаров this.windowChangePrices
	_addWindowChangePrices() {
		this.windowChangePrices = new ChangePricesWindow( document.getElementById('changePricesWindow') );				
		this.windowChangePrices.addNotice('Изменить цену?<br>');
		this.windowChangePrices.addSubmit('[data-button="confirm"]', () => this._changePrices());
		this.windowChangePrices.addButton('[data-button="cancel"]', this.windowChangePrices.closeHandler.bind(this.windowChangePrices));
	};	

	_buttons() {
		/* this.windowChangePrices.open('[data-button="changePrices"]');	 */
	}

	_focusInPriceHandler() {
		if (event.target.dataset.product != 'price') return;
		
		this._dataEditor.focusIn(event.target);
		
		let productEl = this._getProductContainer(event.target);
		
		this._dataEditor.setRequestHandler( async () => await this._makeRequestChangePrices(event.target.innerHTML, [productEl.dataset.productId]) );
	}
	
	async _focusOutPriceHandler() {
		if (event.target.dataset.product != 'price') return;
		
		await this._changePrice(event.target);
	}	

	_setPriceMask() {
		if (event.target.dataset.product != 'price') return;
		
		this._fieldMask.price(event.target);
	}
	
	start() {
		super.start();
		
		this._productFinder.start();
		
		this._buttons();
		document.querySelector('[data-button="changePrices"]').addEventListener('click', () => this._openWindowChangePrices());
		this._elem.querySelector('table').addEventListener('focusin', () => this._focusInPriceHandler());
		this._elem.querySelector('table').addEventListener('focusout', () => this._focusOutPriceHandler());
		this._elem.querySelector('table').addEventListener('input', () => this._setPriceMask());
	}
}