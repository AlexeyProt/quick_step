"use strict";
/* Класс формы редактирования категории */
function CategoryEditor() {
	ProductEditor.apply(this, arguments);	
	this.model = {
		// Названия полей форм, соответствующие названиям моделей
		main: 'category', images: 'category_image',
		// url для ajax запросов
		url: {
			uploadImages: '/admin/category/upload-image',
			updatePublication: '/admin/category/update',
			create: '/admin/category/create',
			edit: '/admin/category/edit/',			
			publish: '/admin/category/store',
			cancel: '/admin/category/cancel',
			destroy: '/admin/category/destroy',
			home: '/admin/categories'
		}
	}; 
	
	this._currentCategory = null;
	this._selectedCategory = null;
	this._status = { categories: null, editor: null };
	this._categories = this._elem.querySelector('#categories');
	this._categoriesButtons = document.getElementById('categoriesButtons').content.children[0].cloneNode(true);
	this._categoryItem = document.getElementById('categoryItem').content.children[0].cloneNode(true);	
}
// Наследует класс ProductEditor
CategoryEditor.prototype = Object.create(ProductEditor.prototype);
CategoryEditor.prototype.constructor = CategoryEditor;

CategoryEditor.prototype._setFormData = function () {
	ProductEditor.prototype._setFormData.call(this);
	
	let parent_id = this._getCategoryId(this._selectedCategory);
	
	if (parent_id) this.formData.set('category[parent_id]', parent_id);
	this.formData.set('categories', JSON.stringify(this._getCategoriesData()));
};

CategoryEditor.prototype._getCategory = function (event) {
	let target = event.target;
	
	while(target != this._elem) {
		if (target.className == 'edit') {
			this._selectCategory(target.previousElementSibling);	
			this._getCategoryAjax(this._getCategoryId(target));
			return;
		}		
		target = target.parentNode;
	}
};

CategoryEditor.prototype._getCategoryId = function (target) {
	while(target != this._elem) {
		if (target.dataset.categoryId) {						
			return target.dataset.categoryId;
		}
		target = target.parentNode;
	}
	return null;
}

CategoryEditor.prototype._getCategoryNode = function (target) {
	while(target != this._categories) {
		if (target.dataset.categoryId) {						
			return target;
		}
		target = target.parentNode;
	}
	return null;	
}; 

CategoryEditor.prototype._getCategoryAjax = function (id) {
	let formData = new FormData();
	
	formData.set('id', id);
	$.ajax({
		url: "/admin/category/get",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._setCategoryData.bind(this),
		error: function(jqxhr, status, errorMsg) {
			console.log(errorMsg, jqxhr);
			self._notice.innerHTML = "";
			switch ( errorMsg ) {
				default:
					self.addWarning('Произошла ошибка. Попробуйте сохранить данные позже.<br>');
			}			
		}
	});		
};

CategoryEditor.prototype._setCategoryData = function (data) {
	this._fields['category[id]'].value = data.id;
	this._fields['category[name]'].innerHTML = data.name;
	if (data.category_image) {
		this._fields['category_image[name]'].src = document.location.origin + '/images/categories/mini/' + data.category_image.name;
		this._fields['category_image[name]'].dataset.imageName = data.category_image.name;			
	}
	if (data.categories_view) {
		this.tinyConfigurator.tinymce.activeEditor.setContent(data.categories_view.page.content);
		this._fields['page[description]'].value = data.categories_view.page.description;
		this._fields['page[title]'].value = data.categories_view.page.title;
		this._fields['page[uri]'].value = data.categories_view.page.uri;
	}
	else {
		this.tinyConfigurator.tinymce.activeEditor.setContent(data.products_view.page.content);
		this._fields['page[description]'].value = data.products_view.page.description;
		this._fields['page[title]'].value = data.products_view.page.title;
		this._fields['page[uri]'].value = data.products_view.page.uri;		
	}
	
	history.replaceState( '', '', document.location.origin+this.model.url.edit+this._elem.elements[this.model.main+'[id]'].value );
};

CategoryEditor.prototype._selectCategory = function (target) {
	if (this._selectedCategory) delete this._selectedCategory.dataset.treeSelected;
	this._selectedCategory = target;
	this._selectedCategory.dataset.treeSelected = true;
	
	this._selectOpenIcons();
};

/* CategoryEditor.prototype._selectParentCategory = function (event) {
	let li = this._getCategoryNode(event.target),
		childCategory = li.querySelector('[data-category-id]');
		
	if (childCategory) {
		if (childCategory.querySelector('[data-tree-selected="true"]')) event.target.style.color = 'red';
	}
}; */

// Проверияет была ли выделена дочерняя категория
// return boolean true если была выделена дочерняя категория
/* CategoryEditor.prototype._checkChildSelect = function (target) {
	if (!this._selectedCategory) return;
	
	let li = this._getCategoryNode(target),
		ul = li.querySelector('ul');

	for(let target = this._selectedCategory; target != this._categories; target = target.parentNode) {
		if (target == ul) return true;
	}
}; */

// Выделяет иконки открытия подкатегорий, если выбрана дочерняя категория
CategoryEditor.prototype._selectOpenIcons = function () {
	if (!this._selectedCategory) return;
	this._deselectOpenIcons();
	
	let categoryNode = this._getCategoryNode(this._selectedCategory);
	if (!categoryNode) return;
	
	for (let target = categoryNode.parentNode; target != this._categories; target = target.parentNode) {
		if (target.dataset.categoryId && target.dataset.tree != 'dropped out') {
			let openIcon = target.querySelector('[data-tree="open"]');

			openIcon.dataset.treeChildSelected = true;
		}
	}
};
// Отменяет выделения иконок открытия подкатегорий
CategoryEditor.prototype._deselectOpenIcons = function () {
	let selectedOpenIcons = this._categories.querySelectorAll('[data-tree-child-selected="true"]');
	
	for(let i = 0; i < selectedOpenIcons.length; i++) {
		delete selectedOpenIcons[i].dataset.treeChildSelected;
	}
};
// Добавляет объект окна создания новой категории this.newCategoryWindow
CategoryEditor.prototype._addWindowNewCategory = function () {
	this.newCategoryWindow = new WindowForm( document.getElementById('newCategoryWindow') );	
	this.newCategoryWindow.addButton('[data-button="confirm"]', this._clearCategoryFields.bind(this));
	this.newCategoryWindow.addButton('[data-button="cancel"]', this.newCategoryWindow.closeHandler.bind(this.newCategoryWindow));
};

CategoryEditor.prototype._clearCategoryFields = function (event) {
	let formData = this.newCategoryWindow.getFormData(event.target);

	this._fields['category[id]'].value = '';
	this._fields['category[name]'].innerHTML = formData.get('name');
	this._fields['category_image[name]'].src = document.location.origin + '/images/image.svg';
	this._fields['category_image[name]'].dataset.imageName = '';	
	this.tinyConfigurator.tinymce.activeEditor.setContent('');
	this._fields['page[description]'].value = '';
	this._fields['page[title]'].value = '';
	this._fields['page[uri]'].value = '';
	
	this._selectCategory(this._currentCategory);
	
	history.replaceState( '', '', document.location.origin+this.model.url.create );
	
	this.newCategoryWindow.closeHandler();
};

CategoryEditor.prototype._openWindowNewCategoryCB = function (event) {	
	let target = event.target;
	
	while(target != this._elem) {
		if (target.className == 'create') {
			this._currentCategory = target;
			this.newCategoryWindow.openHandler();
			return;
		}			
		target = target.parentNode;	
	}
};
// Открывает окно новой категории и устанавливает значение поля parentId
/* CategoryEditor.prototype._openWindowNewCategory = function (target) {
	this.newCategoryWindow.openHandler.call(this.newCategoryWindow);
	
	let parentId = this.newCategoryWindow.getContainer().querySelector(['[name="parentId"]']);
					
	parentId.value = this._getCategoryId(target);	
}; */

CategoryEditor.prototype._setCategoriesStatus = function () {
	this._status.categories = 'sorted';
	let categories = document.getElementById('categories');

	categories.after(this._categoriesButtons);
};

CategoryEditor.prototype._saveCategoriesOrderCB = function (event) {
	let target = event.target;
	while (target != this._elem) {
		if (target.dataset.button == 'saveOrder') {
			this._ajaxSaveCategories();
			/* this._categoriesButtons.remove(); */
			return;
		}
		target = target.parentNode; 
	}
};

CategoryEditor.prototype._getCategoriesData = function () {
	let categoriesNodes = this._categories.querySelectorAll('[data-category-id]'),
		categoriesData = [];
	
	for (let i = 0; i < categoriesNodes.length; i++) {
		categoriesData[i] = {id: categoriesNodes[i].dataset.categoryId, parent_id: null};
		
		for (let target = categoriesNodes[i].parentNode; target != this._categories; target = target.parentNode) {
			if (target.dataset.categoryId) {
				categoriesData[i].parent_id = target.dataset.categoryId;
				break;
			}		
		}
	}
	return categoriesData;
};

CategoryEditor.prototype._ajaxSaveCategories = function () {
	let categoriesButtons = this._categoriesButtons,
		categories = this._getCategoriesData();
	$.ajax({
		url: '/admin/category/update-order',
		type: "POST",
		data: JSON.stringify(categories),
		processData: false,
		contentType: 'application/json',
		beforeSend: function() {
/* 			categoriesButtons._notice.innerHTML = "";
			categoriesButtons.addStatus('Идет отправка данных...'); */
		},
		success: function(data) {
			console.log(data);
		},
		error: function(jqxhr, status, errorMsg) {
			console.log(jqxhr);
			categoriesButtons._notice.innerHTML = "";
		}
	});		
};

ProductEditor.prototype._setUploader = function () {
	this.uploader = new Uploader();
	this.uploader.setAccept('image/jpeg, image/png, image/gif');
	this.uploader.setHandler(this._uploadHandler.bind(this));
};

// Обработчик загрузки изображений
ProductEditor.prototype._uploadHandler = function () {
	var formData = new FormData(),
		file = this.uploader.getFiles()[0];
		formData.append('userfile', file);
	$.ajax({
		url: this.model.url.uploadImages,
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._updateImage.bind(this),
		error: function(jqxhr, status, errorMsg) {
			switch( errorMsg ) {
				case 'Invalid extension':
					tinymce.activeEditor.windowManager.alert('Недопустимое расширение.');
					break;
				case 'Server Error':
					tinymce.activeEditor.windowManager.alert('Ошибка сервера.');
					break;
				default:
					tinymce.activeEditor.windowManager.alert('Произошла ошибка.');
					break;
			}
		}
	});	
};	

// Обновляет изображение категории на странице
CategoryEditor.prototype._updateImage = function (data) {
	var main_image = this._elem.querySelector('[data-name="'+this.model.images+'[name]"]');
	
	main_image.src = document.location.origin + '/images/categories/mini/' + data;
	main_image.dataset.imageName = data;
};

// Заменяет выделеный элемет категории на элемет, только что созданой категории
CategoryEditor.prototype._saveSuc = function (data) {
	console.log(data);
	ProductEditor.prototype._saveSuc.apply(this, arguments);
	
	// Если категория обновилась
	if (this.url == this.model.url.updatePublication) {
		this._selectedCategory.innerHTML = this._fields['category[name]'].innerHTML;
		return;
	};
	
	let categoryItem = this._categoryItem.cloneNode(true),
		categoryName = categoryItem.querySelector('.name');
	
	categoryItem.dataset.categoryId = this._fields['category[id]'].value;
	categoryName.innerHTML = this._fields['category[name]'].innerHTML;	
	
	this._selectedCategory.after(categoryItem);
		
	this._selectCategory(categoryName);
};

// Добавляет кнопки формы
CategoryEditor.prototype._buttons = function () {
	this.windowSave.open('[data-button="sendData"]');
	this.windowCancel.open('[data-button="cancel"]');	
	this.windowUpdateFields.open('[data-button="updateFields"]');	
	this.windowDestroy.open('[data-button="destroy"]');	
	this.windowImage.open('[data-name="'+this.model.images+'[name]"]');
};


CategoryEditor.prototype.start = function () {
	ProductEditor.prototype.start.call(this);
	
	this._addWindowNewCategory();
	
	this._elem.addEventListener('click', this._openWindowNewCategoryCB.bind(this));
	this._elem.addEventListener('click', this._getCategory.bind(this));
	this._elem.addEventListener('sort', this._setCategoriesStatus.bind(this));
	this._elem.addEventListener('click', this._saveCategoriesOrderCB.bind(this));
	this._categories.addEventListener('open', this._selectOpenIcons.bind(this));
	this._categories.addEventListener('close', this._selectOpenIcons.bind(this));		
};