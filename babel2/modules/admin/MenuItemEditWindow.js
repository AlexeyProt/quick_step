"use strict";
/* Окно редактирования пункта меню */
class MenuItemEditWindow extends WindowForm {
	constructor(args) {
		super(args);
				
		this._tabs = new Tabs(this._elem);		
				
		this._menuItemPageTemp = this._elem.querySelector('#menuItemPage').content;
		this._menuItemPageProgAnim = new ProgressAnimation(this._elem.querySelector('.progressContainer'));
		this._pagesProgressAnim = new ProgressAnimation(this._elem.querySelector('[data-tab="Все"] > .progressContainer'));
		this._paginationElem = this._elem.querySelector('#pagination').content.children[0];
		this._pagination = new Pagination(this._elem.querySelector('[data-tab="Все"]'));
		this._pageLI = this._elem.querySelector('#pageLI').content.children[0];		
			
		this._nameField = this._elem.querySelector('[name="name"]');	
		this._pageIdField = this._menuItemPageTemp.querySelector('[name="page[id]"]');
		this._pageTitleElem = this._menuItemPageTemp.querySelector('[data-page="title"]');		
		this._pageUriElem = this._menuItemPageTemp.querySelector('[data-page="uri"]');
		
		this._runModules();
		this._addEventListeners();
	}	
	
	openHandler() {
		super.openHandler();
		
		this._tabs.setActiveTab(this._elem.querySelector('.tabs').children[0]);
	}
	
	_setRequiredFields() {
		this.addRequiredField( this._nameField, 'Укажите текст ссылки.<br>' );
		this.addRequiredField( this._pageUriElem, 'Выберите страницу.<br>', this._pageUriElem.innerHTML );
	}
	
	async _loadPageData(pageId) {
		this._menuItemPageProgAnim.start();
		
		try {
			let response = await fetch('/admin/page/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
				},
				body: JSON.stringify( {id: pageId} )
			});
			
			return await response.json();			
		} catch (e) {
			console.log(e);
		} finally {
			this._menuItemPageProgAnim.stop();
		}			
	} 	
	
	_buildPagesList(pagesData) {
		let ul = this._elem.querySelector('[data-tab="Все"] > ul');
		let currentPageId = this._pageIdField.value;
		
		ul.innerHTML = '';
		
		for (let i = 0; i < pagesData.data.length; i++) {
			let pageLI = this._pageLI.cloneNode(true);

			pageLI.dataset.pageId = pagesData.data[i].id;

			pageLI.children[0].innerHTML = pagesData.data[i].title;
			pageLI.children[1].href = `${document.location.origin}/${pagesData.data[i].uri}`;
			pageLI.children[1].innerHTML = `/${pagesData.data[i].uri}`;
							
			if (pagesData.data[i].id == currentPageId) {
				this._highlightCurrentPage(pageLI);
			}
			
			ul.append(pageLI);
		}
		this._pagination.buildPagination(pagesData);
	}
	
	_highlightCurrentPage(pageLI) {
		let div = document.createElement('div');
		
		div.innerHTML = 'Текущая страница';
		
		pageLI.dataset.pageLiSelected = true;		
		pageLI.lastElementChild.replaceWith(div);
	}
	
	async _selectCurrentPage(event) {
		if (event.target.dataset.button != 'page select') return;
		
		let pageLI = event.target.parentNode;
		let pageUri = pageLI.querySelector('a').innerHTML;
		let pageTitle = pageLI.querySelector('[data-page="title"]').innerHTML;
		let pages = await this._pagination.loadItems(this._pagination.currentUrl);
		
		this._updateCurrentPageData(pageLI.dataset.pageId, pageTitle, pageUri);
			
		this._pagination.buildItems(pages);		
	}
	
	_updateCurrentPageData(pageId='', pageTitle='Страница не указана', pageUri='') {		
		this._nameField.after(this._menuItemPageTemp);
		
		this._pageIdField.value = pageId;
		this._pageTitleElem.innerHTML = pageTitle;
		this._pageUriElem.href = document.location.origin + pageUri;
		this._pageUriElem.innerHTML = pageUri;	
	}
	
	_scrollToTabsContainer() {
		let tabsContainerCoordY = this._elem.querySelector('#tabsContainer').getBoundingClientRect().top;
		
		this._elem.querySelector('.scrollContainer').scrollTo(0, tabsContainerCoordY);		
	}
	
	async _showPageList() {
		let pages = await this._pagination.loadItems();
		this._pagination.buildItems(pages);
	}
	
	_handleFoundPage(event) {
		this._updateCurrentPageData(event.target.dataset.pageId, event.target.children[0].innerHTML, event.target.children[1].innerHTML);
	}
	
	openCreateMenuItemWindow() {		
		this.openHandler();						
		
		this._nameField.value = '';
		this._updateCurrentPageData();		
	}
	
	async openEditMenuItemWindow (pageId, menuItemName) {			
		this.openHandler();
						
		let page = await this._loadPageData(pageId);	
		
		this._nameField.value = menuItemName;				
					
		this._updateCurrentPageData(page.id, page.title, '/'+page.uri);		
	}
	
	_addEventListeners() {
		this._elem.querySelector('.searchFormContainer').addEventListener('queryResultSelected', () => this._handleFoundPage(event));
		this._elem.querySelector('.tabs').children[1].addEventListener('click', () => this._showPageList());
		this._elem.querySelector('.pagesList').addEventListener('click', () => this._selectCurrentPage(event));		
	}
	
	_runModules() {
		let pageFinder = new PageFinder(this._elem.querySelector('.searchFormContainer'));
		
		pageFinder.start();				
		
		this._pagination.url = '/admin/pages/all';
		this._pagination.setBuildItemsCB((pagesData) => this._buildPagesList(pagesData));
	}
}