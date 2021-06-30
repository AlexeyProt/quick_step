"use strict";
class Filter {
	constructor(container) {
		this._container = container;
		
		this._productBuilder = new ProductBuilder(container);
		this.pagination = new Pagination(container.querySelector('.productsList').parentNode);
	}

	/**
	 * Создает url фильтра товаров
	 * 
	 * @return string
	 */
	_createRequestUrl() {
		let requestUrl = '/products/filter/categories/ламинат';
		let characteristics = this._container.querySelectorAll('[data-filter-characteristic]');
		
		for (let i = 0; i < characteristics.length; i++) {
			let inputs = characteristics[i].querySelectorAll('input');
			let valuesString = '';
			
			for (let i = 0; i < inputs.length; i++) {
				if (!inputs[i].checked) continue;
				
				valuesString += (valuesString) ? '&' + inputs[i].value : inputs[i].value;
				
			}

			if (valuesString) requestUrl += `/characteristics/${characteristics[i].dataset.filterCharacteristic}=${valuesString}`;
	
		}
		
		return requestUrl;
	}

	/**
	 * Строит список товаров
	 * 
	 * @param array productsData
	 */
	_build(productsData) {		
		this._productBuilder.build(productsData.data);
		
		this.pagination.buildPagination(productsData);
	}
	
	/**
	 * Загружает и вставляет отфильтрованые товары
	 */
	async _load () {
		this.pagination.url = this._createRequestUrl();
		
		let productsData = await this.pagination.loadItems();
		
		this.pagination.buildItems(productsData);
		
		this._container.dispatchEvent(new CustomEvent('followlink', {
			detail: {
				href: this.pagination.url,
				handler: () => this._build(productsData)
			},
			bubbles: true
		}));				
		
	}
	
	start() {
		this.pagination.setBuildItemsCB((products) => this._build(products));
		
		this._container.addEventListener('change', () => this._load());
	}
}