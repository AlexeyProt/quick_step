"use strict";
class TabsLoader {
	constructor(container) {
		this._container = container;
		
		this.activeTab;
		this.tabContent;		
		this.requestData;
		this.requestUrl
		
		this._productBuilder = new ProductBuilder(container);
		this._progressAnim = new ProgressAnimation();		
		
		this._load();
	}

	/** 
	 * Выполняет запрос изменения данных
	 *
	 * @return object
	*/	
	async _requestHandler() {
		let url = this.requestUrl;

		let response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
			}
		});
		
		return await response.json();	
	}	
	
	/**
	 * Обрабатывает запрос
	 *
	 * @return object	 
	*/
	async handleRequest() {		
		let tabContent = this.tabContent;

		this._progressAnim.setContainer(tabContent.querySelector('.progressContainer'));		
		this._progressAnim.start();	
		
		try {
			return await this._requestHandler();
		} catch (e) {			
			throw new Error(e);
		} finally {
			this._progressAnim.stop();
		}			
	}	
	
	async _load() {		
		this.activeTab = this._container.querySelector('[data-status="active"]');
		
		if (!this.activeTab.dataset.url) return;
		
		let tabName = this.activeTab.innerHTML;
		
		this.requestUrl = this.activeTab.dataset.url;
		this.tabContent = this._container.querySelector(`[data-tab="${tabName}"]`);	
		
		this._productBuilder.productsListEl = this.tabContent.querySelector('.productsList');

		if (this._productBuilder.productsListEl.children.length) return;
		
		let productsData = await this.handleRequest();
		
		this._productBuilder.build(productsData);
		
		this.tabContent.dispatchEvent(new CustomEvent('refreshCartProducts', {bubbles: true}));
	}
	
	start() {
		this._container.addEventListener('click', () => this._load());
	}
}