"use strict";
/* Отображение страниц */
class PagesViewer {
	constructor(container) {
		this._container = container;
		
		this._page = document.getElementById('page').content.children[0];
		
		this._sortingOrder = new SortingOrder(container);
	}

	_buildPages(items) {
		let tbody = this._container.querySelector('tbody');
		
		tbody.innerHTML = '';
		
		for (let i = 0; i < items.data.length; i++) {
			let page = this._page.cloneNode(true);
			
			page.children[0].innerHTML = items.data[i].title;
			page.children[1].innerHTML = '/' + items.data[i].uri;
			(items.data[i].published) ? page.children[2].innerHTML = 'Да' : page.children[2].innerHTML = 'Нет'
			page.children[3].innerHTML = items.data[i].created_at;
			
			tbody.append(page);
		}
		this._sortingOrder.pagination.buildPagination(items);
	}	
	
	start() {
		this._sortingOrder.setPathname('/admin/pages-views');
		this._sortingOrder.pagination.setBuildItemsCB((pages) => this._buildPages(pages));
		this._sortingOrder.start();
	}
}