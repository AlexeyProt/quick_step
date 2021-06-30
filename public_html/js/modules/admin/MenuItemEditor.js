"use strict";
/* Редактор меню */
class MenuItemEditor {
	constructor(container) {
		this._container = container;
		
		this._saved = true;
		
		let menuItemEditWindow = new MenuItemEditWindow(document.getElementById('menuItemWindow'));	
		let confirmWindow = new ConfirmationWindow(document.getElementById('confirmContainer'));
		
		this._menuItemEditWindow = menuItemEditWindow.createWindow();
		this._menuItemCreatingWindow = menuItemEditWindow.createWindow();
		this._confirmRemoveMenuItemWindow = confirmWindow.createWindow();
		this._confirmSaveWindow = confirmWindow.createWindow();
		this._confirmCancelWindow = confirmWindow.createWindow();
		
		this._highlightedItem;
		this._editingItem;
		this._menuItem = document.getElementById('menuItem').content.children[0];
		this._menuItems = document.getElementById('menuItems').content;
		this._menuButtons = document.getElementById('buttons').content.children[0];
		
		this._sorter = new Sorter(container);
		this._snackbar = new Snackbar();
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
	
	_fillInMenuItem(windowContainer) {
		let pageUriElem = windowContainer.querySelector('[data-page="uri"]');
		
		this._editingItem.dataset.menu_itemPageId = windowContainer.querySelector('[name="page[id]"]').value;
		this._editingItem.querySelector('.name').innerHTML = windowContainer.querySelector('[name="name"]').value;
		this._editingItem.querySelector('.link').href = pageUriElem.href;
		this._editingItem.querySelector('.link').innerHTML = pageUriElem.innerHTML;		
	}
	
	/** 
	* Создает элемент пункта меню и заполняет его данными
	*
	* @param obj menuItemData
	* @return node menuItem
	*/
	_createMenuItem(menuItemData) {
		let menuItem = this._menuItem.cloneNode(true);
		let urlElem = menuItem.querySelector('.link');
		
		menuItem.dataset.menu_itemId = menuItemData.id;
		menuItem.dataset.menu_itemPageId = menuItemData.page.id;
		menuItem.querySelector('.name').innerHTML = menuItemData.name;
		urlElem.href = location.href.original + '/' + menuItemData.page.uri;
		urlElem.innerHTML = '/' + menuItemData.page.uri;		
		
		return menuItem;
	}	
	
	_editMenuItem() {
		this._menuItemEditWindow.checkFields();
		
		this._fillInMenuItem( this._menuItemEditWindow.getContainer() );
		
		this._menuItemEditWindow.closeHandler();
		
		this._showMenuButtons();
	}
	
	_removeMenuItem() {
		this._editingItem.remove();
		
		this._sorter.updateChildItemsCounts();
		
		this._confirmRemoveMenuItemWindow.closeHandler();
		
		this._showMenuButtons();
	}
	
	_buildMenuItem() {
		this._menuItemCreatingWindow.checkFields();
		
		let menuItem = this._menuItem.cloneNode(true);
		
		this._editingItem.after(menuItem);		
		this._editingItem = menuItem;
		
		this._fillInMenuItem( this._menuItemCreatingWindow.getContainer() );	
		
		this._sorter.updateChildItemsCounts();
		
		this._menuItemCreatingWindow.closeHandler();
		
		this._showMenuButtons();
	}
	
	_setEditingItem(childNode) {
		for (let target = childNode; target != this._container; target = target.parentNode) {
			/* if (!target.dataset.menu_itemId) continue; */
			if (target.nodeName != 'LI') continue;
			
			this._editingItem = target;
			return;
		}
	}
	
	_openCreateMenuItemWindow(event) {
		for(let target = event.target; target != this._container; target = target.parentNode) {
			if (!target) return;
			if (target.className != 'create') continue;
			
			this._setEditingItem(event.target);
			
			this._menuItemCreatingWindow.openCreateMenuItemWindow();
			
			return;								
		}		
	}
	
	_openEditMenuItemWindow(event) {			
		for(let target = event.target; target != this._container; target = target.parentNode) {
			if (!target) return;
			if (target.className != 'edit') continue;
			
			this._setEditingItem(event.target);
			
			this._menuItemEditWindow.openEditMenuItemWindow(this._editingItem.dataset.menu_itemPageId, this._editingItem.querySelector('.name').innerHTML);
							
			return;								
		}
	}
	
	_openConfirmRemoveMenuItemWindow(event) {			
		for(let target = event.target; target != this._container; target = target.parentNode) {
			if (!target) return;
			if (target.className != 'remove') continue;
			
			this._setEditingItem(event.target);
			
			this._confirmRemoveMenuItemWindow.openHandler();
							
			return;								
		}
	}	
	
	_showMenuButtons() {
		this._container.append(this._menuButtons);
		this._saved = false;
	}
	
	_getMenuItemsData() {
		let menuItemsNodes = this._container.querySelectorAll('[data-menu_item-id]');
		let	menuItemsData = [];
		
		for (let i = 0; i < menuItemsNodes.length; i++) {
			menuItemsNodes[i].dataset.sort_order = i;
			
			menuItemsData[i] = {
				id: menuItemsNodes[i].dataset.menu_itemId,
				name: menuItemsNodes[i].querySelector('.name').innerHTML,
				sort_order: menuItemsNodes[i].dataset.sort_order,
				page_id: menuItemsNodes[i].dataset.menu_itemPageId
			}
			
			for (let target = menuItemsNodes[i].parentNode; target != this._container; target = target.parentNode) {				
				if (target.dataset.sort_order) {
					menuItemsData[i].parent_sort_order = target.dataset.sort_order;
					break;
				}		
			}
		}
		return menuItemsData;
	}
	
	_fillInMenuItemsIds(menuItemsData) {
		let menuItemsNodes = this._container.querySelectorAll('[data-menu_item-id]');
		
		for (let i = 0; i < menuItemsNodes.length; i++) {
			menuItemsNodes[i].dataset.menu_itemId = menuItemsData[i].id;
		}
	}
	
	/**
	* Строит древовидное меню
	*
	* @param object menuItemData
	* @param node parentNode родительский элемент в который будут добавлены дочерние пункты меню
	*/
	_buildMenuItems(menuItemsData, parentNode) {	
		for (let key in menuItemsData) {
			let menuItem = this._createMenuItem(menuItemsData[key]);
			
			parentNode.append(menuItem);
			
			if (!menuItemsData[key].children) continue;
			
			this._buildMenuItems(menuItemsData[key].children, menuItem.querySelector('ul'));
		}
	}
	
	/**
	* Очищает контейнер меню и вставляет в него новые пункты меню
	* 
	* @param object menuItemsData
	*/
	_updateMenuItems(menuItemsData) {
		let menuItems = this._menuItems.cloneNode(true);
		let fragment = new DocumentFragment();
		
		this._container.innerHTML = '';
		
		this._buildMenuItems(menuItemsData, fragment);
		
		menuItems.children[0].after(fragment);
		this._container.append(menuItems);		
		
		this._sorter.updateChildItemsCounts();
		
		this._saved = true;
	}
	
	async _makeRequestSave() {
		this._confirmSaveWindow.progressAnim.start();
		
		try {
			let response = await fetch('/admin/menu-items/save', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
				},
				body: JSON.stringify( {menuItems: this._getMenuItemsData()} )
			});
			
			return await response.json();			
		} catch (e) {
			this._confirmSaveWindow.closeHandler();
			
			this._snackbar.show('Произошла ошибка. Попробуйте еще раз');
			
			throw new Error(e);
		} finally {
			this._confirmSaveWindow.progressAnim.stop();
		}				
	}
	
	async _loadMenuItems() {
		this._confirmCancelWindow.progressAnim.start();
		
		try {
			let response = await fetch('/admin/menu-items/all', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
				}
			});
			
			return Object.assign({}, await response.json());			
		} catch (e) {
			this._confirmCancelWindow.closeHandler();
			
			this._snackbar.show('Произошла ошибка. Попробуйте еще раз');
			
			throw new Error(e);
		} finally {
			this._confirmCancelWindow.progressAnim.stop();
		}				
	}	
	
	async _saveMenu() {		
		let menuItemsData = await this._makeRequestSave();
		
		this._fillInMenuItemsIds(menuItemsData);
		
		this._confirmSaveWindow.closeHandler();
		
		this._snackbar.show('Меню сохранено');
		
		this._menuButtons.remove();	

		this._saved = true;
	}
	
	async _cancelChanges() {
		let menuItemsData = await this._loadMenuItems();

		this._updateMenuItems(menuItemsData);
		
		this._confirmCancelWindow.closeHandler();
	}
	/*
	* Устанавливает объект окна редактирования пункта меню this._menuItemEditWindow
	**/
	_setEditMenuItemWindow() {
		this._menuItemEditWindow.addButton('[data-button="confirm"]', () => this._editMenuItem());
		this._menuItemEditWindow.addButton('[data-button="cancel"]', () => this._menuItemEditWindow.closeHandler());
	}	
	
	_setCreateMenuItemWindow() {
		this._menuItemCreatingWindow.addButton('[data-button="confirm"]', () => this._buildMenuItem());
		this._menuItemCreatingWindow.addButton('[data-button="cancel"]', () => this._menuItemCreatingWindow.closeHandler());
	}	
	
	_setConfirmRemoveMenuItemWindow() {
		this._confirmRemoveMenuItemWindow.addNotice('Удалить пункт меню и его подпункты?<br>');
		this._confirmRemoveMenuItemWindow.addButton('[data-button="confirm"]', () => this._removeMenuItem());
		this._confirmRemoveMenuItemWindow.addButton('[data-button="cancel"]', () => this._confirmRemoveMenuItemWindow.closeHandler());
	}	
	
	_setConfirmSaveWindow() {
		this._confirmSaveWindow.addNotice('Сохранить изменения?<br>');
		this._confirmSaveWindow.addButton('[data-button="confirm"]', () => this._saveMenu());
		this._confirmSaveWindow.addButton('[data-button="cancel"]', () => this._confirmSaveWindow.closeHandler());
		this._menuButtons.querySelector('[data-button="save"]').addEventListener('click', () => this._confirmSaveWindow.openHandler());
	}		
	
	_setConfirmCancelWindow() {
		this._confirmCancelWindow.addNotice('Отменить все изменения?<br>');
		this._confirmCancelWindow.addButton('[data-button="confirm"]', () => this._cancelChanges());
		this._confirmCancelWindow.addButton('[data-button="cancel"]', () => this._confirmCancelWindow.closeHandler());
		this._menuButtons.querySelector('[data-button="cancel"]').addEventListener('click', () => this._confirmCancelWindow.openHandler());
	}			
	
	start() {
		this._setCreateMenuItemWindow();
		this._setEditMenuItemWindow();
		this._setConfirmRemoveMenuItemWindow();
		this._setConfirmSaveWindow();
		this._setConfirmCancelWindow();
		
		this._sorter.start();
		
		this._container.addEventListener('click', () => this._openCreateMenuItemWindow(event));
		this._container.addEventListener('click', () => this._openEditMenuItemWindow(event));
		this._container.addEventListener('click', () => this._openConfirmRemoveMenuItemWindow(event));
		
		this._container.addEventListener('mouseover', () => this._highlight(event));
		this._container.addEventListener('mouseout', () => this._removeHighlight(event));
		
		this._container.addEventListener('sortstart', () => this._cancelHighlight(event));
		
		this._container.addEventListener('sort', () => this._showMenuButtons());
		
		window.addEventListener('beforeunload', (event) => {
			if (!this._saved) event.preventDefault();
		});
	}
}