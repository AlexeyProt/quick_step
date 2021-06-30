/* Базовый класс формы */
function PageEditor(elem) {
	BaseForm.apply(this, arguments);	
	this._elem = elem;
	this._uriInput = this._elem.querySelector('[data-primarykey="1"]'); // Элемет поля, содержащего первичный ключ
	this.tinyConfigurator = new TinyConfigurator();
	this.confirmContainer = document.getElementById('confirmContainer');
	this.window = new WindowForm( this.confirmContainer );
	
/* 	this._confirmCancel(); */
/* 	this.confirm(); */
	this.buttons();
}
// Наследуюет класс BaseForm
PageEditor.prototype = Object.create(BaseForm.prototype);
PageEditor.prototype.constructor = PageEditor;

/* Внутренние методы */

PageEditor.prototype._setRequiredFields = function () {
	
};
// Обработчик для отправки данных
PageEditor.prototype._confirmHandler = function (event) {
	var formData = this.getFormData(event.target),
		url = "/admin/page/edit"; // url для ajax запроса
	// Если данные отправляеются со страницы с url '/admin/addPage'
	if ( document.location.pathname === '/admin/addPage' ) {
		url = "/admin/page/save";
	}
	formData.append('primarykey', this._uriInput.dataset.primarykeyValue); // Добавляется поле с первичным ключом
	this.checkFields(); // Проверяет обязательные поля
	this._ajax(formData, url); // Отправляет запрос	
};
// Обработчик для очистки элемента уведомлений
PageEditor.prototype._clearNoticeHandler = function () {
	this._notice.innerHTML = '';
};

PageEditor.prototype._cancelHandler = function () {
	var self = this,
		formData = new FormData();
	formData.append('primarykey', this._uriInput.dataset.primarykeyValue); // Добавляется поле с первичным ключом
	$.ajax({
		url: '/admin/page/cancel',
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function() {
			self.confirmCancel.closeHandler();
			self._notice.innerHTML = "";
			self.addStatus('Идет отправка данных...');
		},
		success: function(data) {
			console.log(data);
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

PageEditor.prototype._ajax = function (formData, url) {
	var self = this;
	$.ajax({
		url: url,
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function() {
			self._notice.innerHTML = "";
			self.addStatus('Идет отправка данных...');
		},
		success: function(data) {
			var page = JSON.parse(data); // Объект для изменения URL
			self._notice.innerHTML = "";
			self.addSucNotice('Страница сохранена');
			self._elem.addEventListener('focus', self._clearNoticeHandler.bind(self), { capture: true, once: true });
			self._uriInput.dataset.primarykeyValue = formData.get('uri'); // Устанавливает новое значение первичного ключа uri
			history.pushState( '', '', document.location.origin+'/admin/editPage/'+page.uri );
		},
		error: function(jqxhr, status, errorMsg) {
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

PageEditor.prototype._createWindow = function () {
	this.confirmContainer = document.querySelector('#confirmContainer');
	this.confirmContainer = this.confirmContainer.parentNode.removeChild(this.confirmContainer);
}

PageEditor.prototype._confirmCancel = function () {
	var windowCancel = this.window.createWindow();
	windowCancel.addNotice('Отменить все изменения страницы?<br>');
	windowCancel.open('[data-button="cancel"]');
	windowCancel.addButton('[data-button="confirm"]', this._cancelHandler.bind(this));
	windowCancel.addButton('[data-button="cancel"]', windowCancel.closeHandler.bind(windowCancel));
	console.log(windowCancel);
};

PageEditor.prototype._confirmSave = function () {
	var windowSave = this.window.createWindow();	
	windowSave.addNotice('Сохранить страницу?<br>');
	windowSave.open('[data-button="sendData"]');
	windowSave.addButton('[data-button="confirm"]', this._confirmHandler.bind(this));
	windowSave.addButton('[data-button="cancel"]', windowSave.closeHandler.bind(windowSave));
	console.log(windowSave);
};

/* Внешние методы */

PageEditor.prototype.buttons = function () {
/* 	this._elem.querySelector('[data-button="sendData"]').addEventListener('click', this._confirmSave.bind(this), { once: true });	
	this._elem.querySelector('[data-button="cancel"]').addEventListener('click', this._confirmCancel.bind(this), { once: true }); */
	this._confirmSave();
	this._confirmCancel();
};

/* PageEditor.prototype.sendData = function () {
	this._elem.querySelector('[data-button="sendData"]').addEventListener('click', this._sendDataCallback.bind(this));	
};	 */	
