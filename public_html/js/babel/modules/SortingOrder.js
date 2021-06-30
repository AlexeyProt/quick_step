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
	
	_select(column, items) {	
			column.dispatchEvent(new CustomEvent('followlink', {
			detail: {
				href: this.pagination.url,
				handler: () => this._displaySelect(column, items),
			},
			bubbles: true
		}));			
		
		this._displaySelect(column, items);
	}
	
	/** 
	* Переключает порядок сортировки на desc или asc и отображает данные
	*
	* @param node column элемент с атрибутом data-sortable-column
	* @param object items данные пагинации
	*/		
	_toggle(column, items) {		
		if (column.dataset.sortableOrder == 'asc') {		
				column.dispatchEvent(new CustomEvent('followlink', {
				detail: {
					href: this.pagination.url,
					handler: () => this._displayDesc(column, items),
				},
				bubbles: true	
			}));
			
			this._displayDesc(column, items);
		} else {			
				column.dispatchEvent(new CustomEvent('followlink', {
				detail: {
					href: this.pagination.url,
					handler: () => this._displayAsc(column, items),
				},
				bubbles: true	
			}));
			
			this._displayAsc(column, items);
		}
	}
	
	_displaySelect(column, items) {		
		this.pagination.buildItems(items);	
		
		this._sortingIndicator.select(column);
	}	
	
	_displayAsc(column, items) {		
		this.pagination.buildItems(items);	
		
		this._sortingIndicator.displayAsc(column);
	}
	
	_displayDesc(column, items) {		
		this.pagination.buildItems(items);	
		
		this._sortingIndicator.displayDesc(column);
	}	
	
	/**
	* Сортирует элементы по столбцу
	*
	* @param node column элемент с атрибутами data-sortable-column="true" и атрибутами data-sortable-column
	*/
	async _sortColumn(column) {			
		this.pagination.url = this.pathname
			+ '/order-by/' + column.dataset.sortableColumn
			+ '/order/' + column.dataset.sortableOrder;		
		
		let items = await this.pagination.loadItems();

		if ( this._sortingIndicator.checkSelection(column) ) {
			this._toggle(column, items);
				
			return;
		}
		this._select(column, items);					
	}		
	
	_paginationHandler(items) {
		this._buildItems(items);
		
		let orderDesc = document.location.pathname.match(/\/order\/(desc)/g);
		let column = this._sortingIndicator.getSelectedColumn();
		
		if (!column) return;
		
		if (orderDesc) {
			this._sortingIndicator.displayAsc(column);
			
			return;
		}
		this._sortingIndicator.displayDesc(column);
	}
	
	start() {
		this._sortingIndicator.start();
		
		this._buildItems = this.pagination.buildItems;
		this.pagination.setBuildItemsCB((items) => this._paginationHandler(items));
		
		this._container.addEventListener('click', () => this._sort(event));
	}
}