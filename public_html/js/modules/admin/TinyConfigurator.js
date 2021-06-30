/* Класс для конфигурации редактора tinymce */
function TinyConfigurator(selector) {
	var self = this;
	// Свойства редактора 
	this.properties = {
		selector: selector,
		plugins: [ "link", 'image', 'table', 'lists', 'charmap', 'autoresize', 'autolink', 'testplugin', 'noneditable', 'code', 'imagetools' ],
		menu: {
			testplugin: { title: 'Custom Menu', items: 'undo redo testplugin' }
		},
		menubar: 'file edit insert format testplugin',
		toolbar: 'bullist testplugin charmap code',
		mobile: {
			menubar: true
		},		
		noneditable_noneditable_class: 'productData',
		content_css: [ document.location.origin + '/css/style.css' ],
		body_id: 'tinymce',
		language: "ru",
		branding: false,
		// Функция запускается после загрузки редактора
		init_instance_callback: function (editor) {
			// При потере фокуса вставляет содержимое редактора в элемент, установленный в свойстве selector
			editor.on('blur', function () {
				editor.targetElm.value = editor.getContent();
				editor.targetElm.dispatchEvent(new Event('blur'));
			});
			// При получении фокуса генерирует событие фокуса на элементе контейнера контента редактора
			editor.on('focus', function (event) {
				var focus = new Event('focus');
				editor.getContentAreaContainer().dispatchEvent(focus);
			});
		},
		// Функция для загрузки файлов
		// Срабатывает при нажатии на кнопку поиска файла
		// callback функция, устанавливающая значения полей ( callback('myimage.jpg', {alt: 'My alt text'}) )
		// value - текущее значение затронутого поля
		// meta - объект , содержащий значения других полей в указанном диалоговом окне (обратите внимание , что содержит тип поля)meta.filetype
		file_picker_callback: function(callback, value, meta) {
			var uploader = new Uploader();
			// Если кнопка нажата в диалоговом окне вставки ссылки
			if (meta.filetype == 'file') {
				uploader.setHandler(self._filePickerCallbackAjax.bind(self, callback, uploader, "/admin/upload"));
				uploader.open();
			}
			// Если кнопка нажата в диалоговом окне вставки изображения
			if (meta.filetype == 'image') {
				uploader.setAccept('image/*');
				uploader.setHandler(self._filePickerCallbackAjax.bind(self, callback, uploader, "/admin/upload/mini"));
				uploader.open();
			}
		},
		// without images_upload_url set, Upload tab won't show up
		images_upload_url: '/admin/uploader',
		// Функция обработчик загрузки изображений
		// Срабатывает после выборе файла во вкладке Загрузки в диалоговом окне вставки изображений
		images_upload_handler: function (blobInfo, success, failure) {
			var formData = new FormData();
			formData.append('userfile', blobInfo.blob(), blobInfo.filename());
			$.ajax({
				url: "/admin/upload/mini", // Сохранение изображения и создание его миниатюр
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				success: function(data) {
					var json = JSON.parse(data);
					success(json.location);
				},
				error: function(jqxhr, status, errorMsg) {
					switch( errorMsg ) {
						case 'Invalid extension':
							failure('Недопустимое расширение.');
							break;
						case 'Server Error':
							failure('Ошибка сервера.');
							break;
						default:
							failure('Произошла ошибка.');
							break;
					}
				}
			});				
		}
	};
}

/* Внутренние методы */

// Выполняет ajax запрос 
// callback функция, устанавливающая значения полей ( callback('myimage.jpg', {alt: 'My alt text'}) )
// объект uploader, содержащий выбранный в диалоговом окне файл 
TinyConfigurator.prototype._filePickerCallbackAjax = function ( callback, uploader, url ) {
	var formData = new FormData();
	formData.append('userfile', uploader.getFiles()[0]);
	$.ajax({
		url: url,
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: function(data) {
			var json = JSON.parse(data);
			callback(json.location);
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
};

/* Внешние методы */

// Подключает необходимые классы для работы с редактором и запускает его
// Устанавливает объект редактора this.tinymce
TinyConfigurator.prototype.start = function () {
	var self = this,
		tinymceScript = new TemplateScript('/js/modules/Uploader.js'); // Подключение класса для работы с <input type="file">
	tinymceScript.addScript('/js/modules/admin/tinymce/js/tinymce/tinymce.min.js'); // Подключение текстового редактора tinymce
	tinymceScript.callFunc(function () {
		tinymce.init(self.properties);
		self.tinymce = tinymce;
	});	
};