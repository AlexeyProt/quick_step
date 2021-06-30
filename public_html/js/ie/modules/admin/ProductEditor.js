/* Класс формы редактирования товара */
function ProductEditor(elem) {
	BaseForm.apply(this, arguments);	
	this._elem = elem;
	this.window = new WindowForm( document.getElementById('confirmContainer') );
	this.model = {
		// Названия полей форм, соответствующие названиям моделей
		main: 'product', images: 'product_images',
		// url для ajax запросов
		url: {
			uploadImages: '/admin/product/upload-images',
			updatePublication: '/admin/product/update-publication',
			create: '/admin/product/create',
			edit: '/admin/product/edit/',
			publish: '/admin/product/publish',
			cancel: '/admin/product/cancel',
			destroy: '/admin/product/destroy',
			home: '/admin/products'
		}
	}; 
}
// Наследует класс BaseForm
ProductEditor.prototype = Object.create(BaseForm.prototype);
ProductEditor.prototype.constructor = ProductEditor;

/* Внутренние методы */

ProductEditor.prototype._setRequiredFields = function () {

};

ProductEditor.prototype._setFieldsNodes = function () {
	this._fields = {};
	var elems = this._elem.querySelectorAll('[data-name]');
	for ( var i = 0; i < elems.length; i++ ) {
		this._fields[elems[i].dataset.name] = elems[i];
	}
	var elems = this._elem.querySelectorAll('[name]');
	for ( var i = 0; i < elems.length; i++ ) {
		this._fields[elems[i].name] = elems[i];
	}
};

ProductEditor.prototype._setFormData = function () {
	var formFields = this._elem.querySelectorAll('[data-name]');
	this.formData = new FormData(this._elem);
	/* this.formData.set( 'product_image[level]', 1 ); */
	for ( var i = 0; i < formFields.length; i++ ) {
		if ( formFields[i].dataset.imageName ) {
			this.formData.append( formFields[i].dataset.name,  formFields[i].dataset.imageName);
			continue;
		}
		this.formData.set( formFields[i].dataset.name,  formFields[i].innerHTML);
	}
};

ProductEditor.prototype._blurHandler = function (event) {
	if ( !event.target.dataset.name ) return;
	if ( ~event.target.className.indexOf('mce-content-body') ) {
/* 		this.formData.set( event.target.dataset.name, event.target.innerHTML );
		console.log(this.formData.get('content')); */
		return;
	}
	event.target.innerHTML = event.target.innerText;
/* 	this.formData.set( event.target.dataset.name, event.target.innerText );	 */
};

ProductEditor.prototype._addBlurListener = function () {
	this._elem.addEventListener( 'blur', this._blurHandler.bind(this), { capture: true } );
};

/* ProductEditor.prototype._addUploader = function () {	
	var self = this,
		formData = new FormData(),
		image_product = this._elem.querySelector('[data-name="product_image[name]"]');
		uploader = new Uploader( image_product );
	uploader.setAccept('image/jpeg, image/png, image/gif');
	uploader.setHandler(function () {
		formData.append('userfile', uploader.getFiles()[0]);
		$.ajax({
			url: "/admin/product/upload-image",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				var image = JSON.parse(data);
				// self.formData.set( 'nameImage', image.name );
				image_product.dataset.imageName = image.name;
				image_product.src = document.location.origin + image.location;
			},
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
	});	
}; */

ProductEditor.prototype._setUploader = function () {
	this.uploader = new Uploader();
	this.uploader.setAccept('image/jpeg, image/png, image/gif');
	this.uploader.multiple();
	this.uploader.setHandler(this._uploadHandler.bind(this));
};
// Обработчик загрузки изображений
ProductEditor.prototype._uploadHandler = function () {
	var formData = new FormData(),
		files = this.uploader.getFiles();
	formData.set(this.model.main+'[id]', this._fields[this.model.main+'[id]'].value);
	for ( var i = 0; i < files.length; i++ ) {
		formData.append('userfiles[]', files[i]);
	}
	$.ajax({
		url: this.model.url.uploadImages,
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._updateImages.bind(this),
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
// Обновляет изображения товара на странице
ProductEditor.prototype._updateImages = function (data) {
	var images = JSON.parse(data),
		main_image = this._elem.querySelector('[data-name="'+this.model.images+'[][name]"]');
	
	main_image.src = document.location.origin + '/images/products/medium/' + images[0].name;
	main_image.dataset.imageName = images[0].name;
	
	if (images.length < 2) return;
	
	var miniCont = this._elem.querySelector('.miniCont'),
		img = document.createElement('img');
		img.dataset.name = this.model.images+'[][name]';
	miniCont.innerHTML = '';
	for ( let i = 1; i < images.length; i++ ) {
		img = img.cloneNode(false);
		img.src = document.location.origin + '/images/products/mini/' + images[i].name;
		img.dataset.imageName = images[i].name;
		miniCont.append(img);
	}
};
// Обработчик для сохранения данных
ProductEditor.prototype._saveHandler = function () {
	this._setFormData();
	var url = "/admin/product/update"; // url для ajax запроса
	// Если данные отправляеются со страницы с url '/admin/product/create'
	if ( document.location.pathname === '/admin/product/create' ) {
		url = "/admin/product/store";
	}
	this.checkFields(); // Проверяет обязательные поля
	this._ajaxSave(this.formData, url); // Отправляет запрос
	this.windowSave.closeHandler();
};
// Обработчик для публикации товара
ProductEditor.prototype._publishHandler = function () {
	this.url = this.model.url.updatePublication; // url для ajax запроса
	// Если данные отправляеются со страницы с url '/admin/product/create'
	if ( document.location.pathname === this.model.url.create ) {
		this.url = this.model.url.publish;
	}	
	this._setFields(null, true);
	this.windowSave.closeHandler();	
};
// Обработчик для удаления товара
ProductEditor.prototype._destroyHandler = function () {
	// Если данные отправляеются со страницы с url '/admin/product/create'
	if ( document.location.pathname === '/admin/product/create' ) {
		this.windowDestroy.closeHandler();	
		this._clearNoticeHandler();
		this.addWarning('Товар не был сохранён.<br>');
		return;
	}	
	var formData = new FormData();
	formData.set(this.model.main+'[id]', this._fields[this.model.main+'[id]'].value);
	this._ajaxDestroy(formData);
	this.windowSave.closeHandler();	
};
// Обработчик для очистки элемента уведомлений
ProductEditor.prototype._clearNoticeHandler = function () {
	this._notice.innerHTML = '';
};
// Обработчик для отмены изменений товара
ProductEditor.prototype._cancelHandler = function () {
	var self = this,
		formData = new FormData();
	$.ajax({
		url: this.model.url.cancel,
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function() {
			self.windowCancel.closeHandler();
			self._notice.innerHTML = "";
			self.addStatus('Идет отправка данных...');
		},
		success: function(data) {
			var page = JSON.parse(data); // Объект для изменения полей формы
			self._notice.innerHTML = "";
			self._elem.elements.title.value = page.title;
			self._elem.elements.description.value = page.description;
			self._elem.elements.uri.value = page.uri;
			self._elem.elements.content.value = page.content;
			self.tinyConfigurator.tinymce.activeEditor.setContent(page.content);
		},
		error: function(jqxhr, status, errorMsg) {
			self._notice.innerHTML = "";
			switch ( errorMsg ) {
				case 'Not Found':
					self.addWarning('Не удалось загрузить страницу. Страница '+document.location.origin+'/'+self._uriInput.dataset.primarykeyValue+' не найдена.<br>');
					break;
				default:
					self.addWarning('Произошла ошибка. Попробуйте повторить позже.<br>');
			}
		}		
	});
};
// Отправляет запрос сохранения страницы
ProductEditor.prototype._ajaxSave = function (formData) {
	var self = this;
	$.ajax({
		url: this.url,
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function() {
			self._notice.innerHTML = "";
			self.addStatus('Идет отправка данных...');
		},
		success: this._saveSuc.bind(this),
		error: function(jqxhr, status, errorMsg) {
			console.log(jqxhr);
			self._notice.innerHTML = "";
			switch ( errorMsg ) {
				case 'SQLSTATE: 23000':
					self.addWarning('Не удалось сохранить страницу. Страница '+document.location.origin+'/'+formData.get('uri')+' уже существует.<br>');
					self._highlight(self._uriInput);
					break;
				default:
					self.addWarning('Произошла ошибка. Попробуйте сохранить данные позже.<br>');
			}
		}
	});		
};

ProductEditor.prototype._saveSuc = function (data) {
	// Если добавляется новый товар
	if ( data ) {
		var product = JSON.parse(data);
		this._elem.elements[this.model.main+'[id]'].value = product.id; // Устанавливается значение id в поле <input name="product[id]">
	}			
	this._notice.innerHTML = "";
	this.addSucNotice('Страница сохранена');
	this._elem.addEventListener('focus', this._clearNoticeHandler.bind(this), { capture: true, once: true });		
	history.replaceState( '', '', document.location.origin+this.model.url.edit+this._elem.elements[this.model.main+'[id]'].value );	
};
// Отправляет запрос удаления товара
ProductEditor.prototype._ajaxDestroy = function (formData) {
	var self = this;
	$.ajax({
		url: this.model.url.destroy,
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function() {
			self._notice.innerHTML = "";
			self.addStatus('Идет отправка данных...');
		},
		success: function(data) {
			document.location.href = document.location.origin + self.model.url.home;
		},
		error: function(jqxhr, status, errorMsg) {
			console.log(jqxhr);
			self._notice.innerHTML = "";
			switch ( errorMsg ) {
				default:
					self.addWarning('Произошла ошибка. Попробуйте обновить страницу.<br>');
			}
		}
	});		
};
// Добавляет объект окна подтверждения this.windowSave
ProductEditor.prototype._addWindowSave = function () {
	this.windowSave = this.window.createWindow();	
	this.windowSave.addNotice('Сохранить товар?<br>');
	this.windowSave.addButton('[data-button="confirm"]', this._publishHandler.bind(this));
	this.windowSave.addButton('[data-button="cancel"]', this.windowSave.closeHandler.bind(this.windowSave));
};
// Добавляет объект окна подтверждения this.windowCancel
ProductEditor.prototype._addWindowCancel = function () {
	this.windowCancel = this.window.createWindow();
	this.windowCancel.addNotice('Отменить все изменения товара?<br>');
	this.windowCancel.addButton('[data-button="confirm"]', this._cancelHandler.bind(this));
	this.windowCancel.addButton('[data-button="cancel"]', this.windowCancel.closeHandler.bind(this.windowCancel));
};
// Добавляет объект окна подтверждения this.windowUpdateFields
ProductEditor.prototype._addWindowUpdateFields = function () {
	this.windowUpdateFields = this.window.createWindow();
	this.windowUpdateFields.addNotice('Обновить данные страницы?<br>');
	this.windowUpdateFields.addButton('[data-button="confirm"]', this._updateFields.bind(this));
	this.windowUpdateFields.addButton('[data-button="cancel"]', this.windowUpdateFields.closeHandler.bind(this.windowUpdateFields));
};
// Добавляет объект окна подтверждения this.windowDestroy
ProductEditor.prototype._addWindowDestroy = function () {
	this.windowDestroy = this.window.createWindow();
	this.windowDestroy.addNotice('Удалить товар?<br>');
	this.windowDestroy.addButton('[data-button="confirm"]', this._destroyHandler.bind(this));
	this.windowDestroy.addButton('[data-button="cancel"]', this.windowDestroy.closeHandler.bind(this.windowDestroy));
};
// Добавляет объект окна работы с изображениями this.windowImage
ProductEditor.prototype._addWindowImage = function () {
	this.windowImage = new WindowForm( document.getElementById('imageWindow') );
	this.windowImage.addButton('[data-button="upload"]', this._openUploader.bind(this));
	this.windowImage.addButton('[data-button="delete"]', this.windowImage.closeHandler.bind(this.windowImage));
};

ProductEditor.prototype._openUploader = function () {
	this.windowImage.closeHandler();
	this.uploader.open();
};

ProductEditor.prototype._setFields = function (event, publish) {
	this.publish = publish;
	if (this._fields['page[title]'] !== undefined && !this._fields['page[title]'].value) this._fields['page[title]'].value = this._fields[this.model.main+'[name]'].innerHTML;
	/* if (!this._fields['page[description]'].value) this._fields['page[description]'].value = this._fields['page[title]'].value; */
	if (this._fields['page[uri]'] !== undefined && !this._fields['page[uri]'].value) {
		this._setUriAjax();
		return;
	}
	this._setFormData();
	this.checkFields(); // Проверяет обязательные поля
	this._ajaxSave(this.formData); // Отправляет запрос	
};
ProductEditor.prototype._updateFields = function () {
	this._fields['page[title]'].value = this._fields[this.model.main+'[name]'].innerHTML;
	this._fields['page[description]'].value = this._fields['page[title]'].value;
	this._setUriAjax();
	this.windowUpdateFields.closeHandler();
};
// Выполняет запрос установки uri относительно категории товара
ProductEditor.prototype._setUriAjax = function () {
	var cb = (this.publish) ? this._setUriBefPublsih.bind(this) : this._setUri.bind(this);
	var formData = new FormData(),
		self = this;
	if (this._fields[this.model.main+'[category_id]'] !== undefined) formData.set('id', this._fields[this.model.main+'[category_id]'].value);
	$.ajax({
		url: "/admin/category/get-uri",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: cb,
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

ProductEditor.prototype._setUri = function (data) {
	var transliterator = new Transliterator();
	this._fields['page[uri]'].value = data + '/' + transliterator.transliterate(this._fields['page[title]'].value);
};

ProductEditor.prototype._setUriBefPublsih = function (data) {
	this._setUri(data);
	this._setFormData();
	this.checkFields(); // Проверяет обязательные поля
	this._ajaxSave(this.formData); // Отправляет запрос	
};

ProductEditor.prototype._editNameFocus = function (event) {
	if (event.target.style.color == 'grey') {
		event.target.innerHTML = ' ';
		event.target.style.color = '';
	}
};

ProductEditor.prototype._editNameBlur = function (event) {
	if (event.target.innerText == '')  {
		event.target.innerHTML = 'Название товара';
		event.target.style.color = 'grey';		
	}
};

ProductEditor.prototype._setTinyConfigurator = function () {
	this.tinyConfigurator = new TinyConfigurator('[data-name="page[content]"]');
	var self = this,
		init_instance_callback = this.tinyConfigurator.properties.init_instance_callback.bind(this);
	this.tinyConfigurator.properties.init_instance_callback = function (editor) {
/* 		init_instance_callback(editor); */
		editor.hide();
		editor.targetElm.addEventListener('click', function () {
			editor.show();
			editor.focus();
			console.log(document.getElementById('tinymce'));
		});
		editor.on('blur', function () {
			editor.hide();
		});
		
	}
	this.tinyConfigurator.properties.inline = true;
	this.tinyConfigurator.properties.content_css[this.tinyConfigurator.properties.content_css.length] = document.location.origin + '/css/admin.css';
	this.tinyConfigurator.start();
};

// Добавляет кнопки формы
ProductEditor.prototype._buttons = function () {
	this.windowSave.open('[data-button="sendData"]');
	this.windowCancel.open('[data-button="cancel"]');	
	this.windowUpdateFields.open('[data-button="updateFields"]');	
	this.windowDestroy.open('[data-button="destroy"]');	
	this.windowImage.open('[data-name="'+this.model.images+'[][name]"]');
};

/* Внешние методы */

ProductEditor.prototype.start = function () {
	this._setFieldsNodes();
	this._setUploader();
	this._addBlurListener();
	/* this._addUploader(); */	
	this._addWindowSave();
	this._addWindowCancel();	
	this._addWindowUpdateFields();
	this._addWindowDestroy();	
	this._addWindowImage();	
	this._buttons();	
	this._setTinyConfigurator();
	
	var quantityVidjet = new QuantityVidjet(this._elem);
	quantityVidjet.minQuant = '0';
	
	this._fields[this.model.main+'[name]'].addEventListener('focus', this._editNameFocus.bind(this));
	this._fields[this.model.main+'[name]'].addEventListener('blur', this._editNameBlur.bind(this));
	// this._fields[this.model.main+'[name]'].addEventListener('blur', this._setFields.bind(this));
	// this._fields[this.model.main+'[category_id]'].addEventListener('change', this._setUriAjax.bind(this));
	this._fields[this.model.main+'[name]'].dispatchEvent(new Event('blur'));	
};

