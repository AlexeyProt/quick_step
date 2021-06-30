"use strict";
/* Выполняет запросы для изменения порядка сортировки */
class SortingOrder {
	constructor(container) {
		this._container = container;
		
		this.pathname;
		
		this._sortingIndicator = new SortingIndicator(container);
		this.pagination = new Pagination(container);
	}
	
	setPathname(pathname) {
		this.pathname = pathname;
	}
	
	async _sort() {
		for (let target = event.target; target != this._container; target = target.parentNode) {
			if (!target.dataset.sortableColumn) continue;
			
			await this._sortColumn(target);
		}		
	}	
	
	_test(column, items) {		
		this.pagination.buildItems(items);	
		
		this._sortingIndicator.toggle(column);
		console.log('test');
	}
	
	/**
	* Сортирует элементы по столбцу
	*
	* node column элемент с атрибутами data-sortable-column="true" и атрибутами data-sortable-column
	*/
	async _sortColumn(column) {			
		this.pagination.url = this.pathname
			+ '/order-by/' + column.dataset.sortableColumn
			+ '/order/' + column.dataset.sortableOrder;		
			
/* 		let items = await this.pagination.loadItems();
		
		this.pagination.buildItems(items);		 */
		
/* 		await this.pagination.followLink(column);
		
		this._sortingIndicator.toggle(column); */
		
		let items = await this.pagination.loadItems();
		
		this._test(column, items);
		
			column.dispatchEvent(new CustomEvent('followlink', {
			detail: {
				href: this.pagination.url,
				handler: () => this._test(column, items), // Должны быть разные обработчики для выделения столбца и для изменения порядка сортировки!
			},
			bubbles: true
		}));			
	}		
	
	start() {
		this._sortingIndicator.start();
		
		this._container.addEventListener('click', () => this._sort(event));
	}
}