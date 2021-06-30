"use strict";
/* Редактор меню */
class MenuCategoryEditor {
	constructor(container) {
		this._container = container;
		
		this._menuCategoryWindow;
		this._highlightedItem;
		this._editingItem;
	}
	
	_highlight(event) {
		for (let target = event.target; target != this._container; target = target.parentNode) {
			if (target.className != 'parentItem') continue;
			if (this._highlightedItem) return;
			
			if (target.parentNode.parentNode.dataset.sorterSelected) return;
			
			this._highlightedItem = target;
			this._highlightedItem.style.boxShadow = '0px 0px 4px 1px black';
		}
	}
	
	_removeHighlight(event) {
		if (!this._highlightedItem) return;
		
		for (let relatedTarget = event.relatedTarget; relatedTarget; relatedTarget = relatedTarget.parentNode) {
			if (relatedTarget == this._highlightedItem) return;
		}
		this._highlightedItem.style.boxShadow = '';		
		this._highlightedItem = null;
	}
	
	_cancelHighlight(event) {
		if (!this._highlightedItem) return;
		
		this._highlightedItem.style.boxShadow = '';	
	}
	
	_changeMenuItem() {
		console.log('change');
	}
	
	async _loadMenuCategoryData() {
		
	}
	
	_setEditingItem (childNode) {
		for (let target = childNode; target != this._container; target = target.parentNode) {
			if (!target.dataset.menu_categoryId) continue;
			
			this._editingItem = target;
			return;
		}
	}
	
	async _loadPages(url = '/admin/pages/all') {
		this._pagesProgressAnim.start();
		
		try {
			let response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
				}
			});
			
			return await response.json();			
		} catch (e) {
			console.log(e);
		} finally {
			this._pagesProgressAnim.stop();
		}
	}

	_buildPagination(paginationData) {
		this._paginationElem.innerHTML = '';
		this._paginationElem.remove();
		
		if (paginationData.last_page == 1) return;
		
		let tabContainer = this._menuCategoryWindow.getContainer().querySelector('[data-tab="Все"]');
		let li = document.createElement('li');
		
		tabContainer.append(this._paginationElem);
		
		if (paginationData.prev_page_url) {
			let prevLI = li.cloneNode(false);
			prevLI.rel = 'prev';
			prevLI.innerHTML = `<a href="${paginationData.prev_page_url}">&laquo;</a>`;
			
			this._paginationElem.append(prevLI);
		}
		for (let i = 1; i <= paginationData.last_page; i++) {
			let pageLI = li.cloneNode(false);
			
			if (i == paginationData.current_page) {
				pageLI.className = 'active';
				pageLI.innerHTML = `<span>${i}</span>`;
			} else {
				pageLI.innerHTML = `<a href="${paginationData.path}/${i}">${i}</a>`;				
			}
			this._paginationElem.append(pageLI);
		}
		if (paginationData.next_page_url) {
			let nextLI = li.cloneNode(false);
			nextLI.rel = 'next';
			nextLI.innerHTML = `<a href="${paginationData.next_page_url}">&raquo;</a>`;
			
			this._paginationElem.append(nextLI);
		}		
	}
	
	_buildPagesList(pagesData) {
		let ul = this._menuCategoryWindow.getContainer().querySelector('[data-tab="Все"] > ul');
		let li = document.createElement('li');
		
		ul.innerHTML = '';
		
		for (let i = 0; i < pagesData.data.length; i++) {
			li = li.cloneNode(false);
			li.innerHTML = `<div>${pagesData.data[i].title}</div>
							<div style="font-size: 15px;">${pagesData.data[i].uri}</div>`;
			
			ul.append(li);
		}
		this._buildPagination(pagesData);
	}
	
	async _showPageList() {
		let pages = await this._loadPages();
		this._buildPagesList(pages);
	}
	
	async _showPaginationPage(event) {
		if (event.target.nodeName != 'A') return;
		
		event.preventDefault();

		let pages = await this._loadPages(event.target.href);
		
		this._buildPagesList(pages);
	}
	_openWindowMenuCategory (event) {			
		for(let target = event.target; target != this._container; target = target.parentNode) {
			if (target.className != 'edit') continue;
			
			this._setEditingItem(event.target);
			
			this._menuCategoryWindow.openHandler();
							
			let windowContainer = this._menuCategoryWindow.getContainer();		
			
			windowContainer.querySelector('[name="title"]').value = this._editingItem.querySelector('.name').innerHTML;
			windowContainer.querySelector('[name="url"]').value = this._editingItem.querySelector('.link').innerHTML;
						
			return;								
		}
	}
	
	/*
	* Устанавливает объект окна редактирования пункта меню this._menuCategoryWindow
	**/
	_setMenuCategoryWindow () {
		this._menuCategoryWindow = new WindowForm( document.getElementById('menuCategoryWindow') );	
		this._menuCategoryWindow.addButton('[data-button="confirm"]', () => this._changeMenuItem());
		this._menuCategoryWindow.addButton('[data-button="cancel"]', this._menuCategoryWindow.closeHandler.bind(this._menuCategoryWindow));

		let windowContainer = this._menuCategoryWindow.getContainer();	
		
		new Tabs(windowContainer);
		
		this._pagesProgressAnim = new ProgressAnimation(windowContainer.querySelector('[data-tab="Все"] > .progressContainer'));
		this._paginationElem = windowContainer.querySelector('#pagination').content.children[0];
		
		let pageFinder = new PageFinder(windowContainer.querySelector('.searchFormContainer'));
		
		pageFinder.start();		
		
		windowContainer.querySelector('.tabs').children[1].addEventListener('click', () => this._showPageList());
		this._paginationElem.addEventListener('click', () => this._showPaginationPage(event));
	}	
	
	start() {
		this._setMenuCategoryWindow();
		
		this._container.addEventListener('click', () => this._openWindowMenuCategory(event));
		
		this._container.addEventListener('mouseover', () => this._highlight(event));
		this._container.addEventListener('mouseout', () => this._removeHighlight(event));
		
		this._container.addEventListener('sortstart', () => this._cancelHighlight(event));
	}
}