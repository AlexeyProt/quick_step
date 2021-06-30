/* Класс формы редактирования страницы */
function PageEditor(elem) {
	BaseForm.apply(this, arguments);	
	this._elem = elem;
	this._uriInput = this._elem.querySelector('[data-primarykey="1"]'); // Элемет поля, содержащего первичный ключ
	this.window = new WindowForm( document.getElementById('confirmContainer') );
	
	this._setTinyConfigurator();
	this._addWindowSave();
	this._addWindowCancel();	
	this._addWindowPublish();		
	this.buttons();
}
// Наследуюет класс BaseForm
PageEditor.prototype = Object.create(BaseForm.prototype);
PageEditor.prototype.constructor = PageEditor;

/* Внутренние методы */

PageEditor.prototype._setRequiredFields = function () {
	
};
// Устанавливает tinyConfigurator и запускает его
PageEditor.prototype._setTinyConfigurator = function () {
	this.tinyConfigurator = new TinyConfigurator('[name="content"]');
	this.tinyConfigurator.start();
};
// Обработчик для сохранения данных
PageEditor.prototype._saveHandler = function (event) {
	var formData = new FormData(this._elem),
		url = "/admin/page/update"; // url для ajax запроса
	// Если данные отправляеются со страницы с url '/admin/page/create'
	if ( document.location.pathname === '/admin/page/create' ) {
		url = "/admin/page/store";
	}
	formData.append('id', this._uriInput.dataset.primarykeyValue); // Добавляется поле с первичным ключом
	this.checkFields(); // Проверяет обязательные поля
	this._ajaxSave(formData, url); // Отправляет запрос	
	this.windowSave.closeHandler();
};
// Обработчик для публикации страницы
PageEditor.prototype._publishHandler = function (event) {
	var formData = new FormData(this._elem);
	formData.append('id', this._uriInput.dataset.primarykeyValue); // Добавляется поле с первичным ключом
	this.checkFields(); // Проверяет обязательные поля
	this._ajaxSave(formData, '/admin/page/publish'); // Отправляет запрос	
	this.windowPublish.closeHandler();
};
// Обработчик для очистки элемента уведомлений
PageEditor.prototype._clearNoticeHandler = function () {
	this._notice.innerHTML = '';
};
// Обработчик для отмены изменений страницы
PageEditor.prototype._cancelHandler = function () {
	var self = this,
		formData = new FormData();
	formData.append('id', this._uriInput.dataset.primarykeyValue); // Добавляется поле с первичным ключом
	$.ajax({
		url: '/admin/page/cancel',
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
PageEditor.prototype._ajaxSave = function (formData, url) {
	var self = this;
	console.log(Object.fromEntries(formData));
	$.ajax({
		url: url,
		type: "POST",
		data: JSON.stringify( Object.fromEntries(formData) ),
		processData: false,
		contentType: 'application/json',
		beforeSend: function() {
			self._notice.innerHTML = "";
			self.addStatus('Идет отправка данных...');
		},
		success: function(data) {
			console.log(data);
			self._notice.innerHTML = "";
			self.addSucNotice('Страница сохранена');
			self._elem.addEventListener('focus', self._clearNoticeHandler.bind(self), { capture: true, once: true });
			self._uriInput.dataset.primarykeyValue = data.id; // Устанавливает новое значение первичного ключа uri
			/* history.replaceState( '', '', document.location.origin+'/admin/page/edit/'+self._uriInput.dataset.primarykeyValue ); */
		},
		error: function(jqxhr) {
			console.log(jqxhr);
			self._notice.innerHTML = "";
			switch ( jqxhr.responseText ) {
				case 'SQLSTATE: 23000':
					self.addWarning('Не удалось сохранить страницу. Страница '+document.location.origin+'/'+formData.get('uri')+' уже существует.<br>');
					self._highlight(self._uriInput);
					break;
				case 'published':
					self.addWarning('Страница '+document.location.origin+'/'+formData.get('uri')+' уже опубликована.<br>');
					break;					
				default:
					self.addWarning('Произошла ошибка. Попробуйте сохранить данные позже.<br>');
			}
		}
	});		
};
// Добавляет объект окна подтверждения this.windowSave
PageEditor.prototype._addWindowSave = function () {
	this.windowSave = this.window.createWindow();	
	this.windowSave.addNotice('Сохранить страницу?<br>');
	this.windowSave.addButton('[data-button="confirm"]', this._saveHandler.bind(this));
	this.windowSave.addButton('[data-button="cancel"]', this.windowSave.closeHandler.bind(this.windowSave));
};
// Добавляет объект окна подтверждения this.windowCancel
PageEditor.prototype._addWindowCancel = function () {
	this.windowCancel = this.window.createWindow();
	this.windowCancel.addNotice('Отменить все изменения страницы?<br>');
	this.windowCancel.addButton('[data-button="confirm"]', this._cancelHandler.bind(this));
	this.windowCancel.addButton('[data-button="cancel"]', this.windowCancel.closeHandler.bind(this.windowCancel));
};
// Добавляет объект окна подтверждения this.windowPublish
PageEditor.prototype._addWindowPublish = function () {
	this.windowPublish = this.window.createWindow();
	this.windowPublish.addNotice('Опубликовать страницу?<br>');
	this.windowPublish.addButton('[data-button="confirm"]', this._publishHandler.bind(this));
	this.windowPublish.addButton('[data-button="cancel"]', this.windowPublish.closeHandler.bind(this.windowPublish));
};

/* Внешние методы */

// Добавляет кнопки формы
PageEditor.prototype.buttons = function () {
	this.windowSave.open('[data-button="sendData"]');
	this.windowCancel.open('[data-button="cancel"]');	
	this.windowPublish.open('[data-button="publish"]');		
};


/* var formData = new FormData();
formData.append('id_category', 1);
formData.append('id_product', 100);
formData.append('nameProduct', 'тест');
formData.append('alt_nameProduct', 'test');
formData.append('content', 'Контент');
formData.append('datePrice', 0);
formData.append('price', 1000);
formData.append('nameImage', 'image');
formData.append('level', 0);
	$.ajax({
		url: '/admin/product/save',
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function() {

		},
		success: function(data) {
			console.log(data);
		},
		error: function(jqxhr, status, errorMsg) {
			console.log(errorMsg);
		}
	});	 */