/* Класс формы регистрации карты */
function RegCard(elem) {
	WindowForm.apply(this, arguments);	
	this._elem = elem;
	this._img = document.createElement('img');
	this._div = document.createElement('div');
	this._div.className = 'filename';
	this._typeCard = this._elem.querySelector('select[name="typeCard"]'); // Тип карты
	
	this.open('[data-open="regCard"]');
	this._hideInputs();
	this._hidePartForm();
	this.choiceTypeCard();
	this.addFiles();
	this.confirm();
}
// Наследуюет класс WindowForm
RegCard.prototype = Object.create(WindowForm.prototype);
RegCard.prototype.constructor = RegCard;

/* Внутренние методы */

// Скрывает все инпуты для добавления файлов
RegCard.prototype._hideInputs = function () {
	var inputs = this._elem.querySelectorAll('input[type="file"]');
	for ( var i = 0; i < inputs.length; i++ ) {
		inputs[i].style.opacity = 0;
		inputs[i].style.width = '1px';
		inputs[i].style.height = '1px';
	}
};
// Скрывает часть формы
RegCard.prototype._hidePartForm = function () {
	var kartaVod = this._elem.querySelector('[data-form="karta-vod"]'),
		kartaPred = this._elem.querySelector('[data-form="karta-pred"]');
	switch (this._typeCard.value) {
		case 'Карта водителя': // Если выбрана карта водителя, то скрываются поля для карты предприятия
			kartaVod.style.display = '';
			kartaPred.style.display = 'none';
			this._notice.innerHTML = "";
			break;
		case 'Карта предприятия': // Если выбрана карта предприятия, то скрываются поля для карты водителя
			kartaPred.style.display = '';
			kartaVod.style.display = 'none';
			this._notice.innerHTML = "";
			break;			
	}
};
RegCard.prototype._setRequiredFields = function () {
	this.addRequiredField( this._elem.querySelector('[name="user"]'), 'Пожалуйста, укажите фамилию, имя, отчество!<br>' );
	this.addRequiredField( this._elem.querySelector('[name="mail"]'), 'Пожалуйста, укажите E-mail!<br>' );
	this.addRequiredField( this._elem.querySelector('[name="phoneNumber"]'), 'Пожалуйста, укажите телефон!<br>' );
	switch (this._typeCard.value) {
		case 'Карта водителя': // Если выбрана карта водителя, то скрываются поля для карты предприятия
			this.addRequiredField( this._elem.querySelector('[name="userfiles[zayavlenie]"]'), 'Пожалуйста, добавьте заявление!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[pasport]"]'), 'Пожалуйста, добавьте паспорт!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[vod-udost]"]'), 'Пожалуйста, добавьте вод. удостоверение!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[SNILS]"]'), 'Пожалуйста, добавьте СНИЛС!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[INN]"]'), 'Пожалуйста, добавьте ИНН!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[pred-karta]"]'), 'Пожалуйста, добавьте предыдущую карту!<br>' );			
			break;
		case 'Карта предприятия': // Если выбрана карта предприятия, то скрываются поля для карты водителя
			this.addRequiredField( this._elem.querySelector('[name="userfiles[zayavlenie-pred]"]'), 'Пожалуйста, добавьте заявление!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[rekviziti]"]'), 'Пожалуйста, добавьте реквизиты организации!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[kop-OGRN]"]'), 'Пожалуйста, добавьте копию ОГРН организации!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[kop-prikaza]"]'), 'Пожалуйста, добавьте копию приказа!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[kop-pasporta]"]'), 'Пожалуйста, добавьте копию паспорта!<br>' );
			this.addRequiredField( this._elem.querySelector('[name="userfiles[obr-podpisi]"]'), 'Пожалуйста, добавьте образец подписи!<br>' );
			break;			
	}	
};
// Добавляет изображение
// input элемент input с аттрибутом type="file"
// whitelist массив списка допустмых тиов файлов
// src значения аттрибута src для изображения (необязательный аргумент)
// Возвращает true если тип файла указанного в элементе input соответствует одному из списка whitelist
RegCard.prototype.addImage = function (input, whitelist, src) {
	var noticeFile = input.parentNode.querySelector('.noticeFile');
	if ( src === undefined ) src = window.URL.createObjectURL(input.files[0]); // Если аргумент src не передан, устанавливается URL с путем к файлу на устройстве клиента 
	noticeFile.dataset.kind = '';
	for ( var i = 0; i < whitelist.length; i++ ) {
		if ( input.files[0].type == whitelist[i] ) {
			var img = this._img.cloneNode(true),
				div = this._div.cloneNode(true);
			img.src = src;
			div.innerHTML = input.files[0].name;
			noticeFile.innerHTML = "";
			noticeFile.appendChild(img);
			noticeFile.appendChild(div);
			return true;
		}
	}	
};
// Не добавляет файл и добавляет предупреждение
// input элемент input с аттрибутом type="file"
// warning текст предупреждения
RegCard.prototype.addWarningFile = function (input, warning) {
	var noticeFile = input.parentNode.querySelector('.noticeFile');
	input.value = "";
	noticeFile.dataset.kind = 'warning';
	noticeFile.innerHTML = warning;
};

/* Внешние методы */

// Устанавливает обработчик события изменения поля формы
RegCard.prototype.addFiles = function () {
	var self = this;
	// Добавляет файл в поле
	function addFile (event) {
		// Если событие произошло не на поле с аттрибутом type="file", то прекращается исполнение функции
		if ( event.target.attributes['type'] === undefined || event.target.attributes['type'].value !== 'file' ) return; 
		if ( event.target.files[0].size > 1000000 ) {
			return self.addWarningFile( event.target,  "Размер файла не должен превышать 1МБ!");
		}
		if ( self.addImage( event.target, ["application/pdf"],  document.location.origin+'/images/PDF.svg') ) return;
		if ( self.addImage( event.target, [ "image/jpeg", "image/png", "image/gif" ] ) ) return;
		// Если изображения не были добавлены, то файл не добавляется и выводится предупреждение
		self.addWarningFile( event.target,  "Не поддерживаемый тип файла! Доступны: JPEG, PNG, GIF, PDF." );
	}
	this._elem.addEventListener( 'change', addFile );
};
// Устанавливает обработчик события изменения поля this._typeCard
RegCard.prototype.choiceTypeCard = function () {
	var self = this;
	function hidePartForm() {
		self._hidePartForm();
	}
	this._typeCard.addEventListener( 'change', hidePartForm );
};

RegCard.prototype._ajax = function (formData) {
	var self = this;
	$.ajax({
		url: "/regCard",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function() {
			self.addStatus('Идет отправка данных...');
		},
		success: function(data) {
			self._notice.innerHTML = "";
			self.addSucNotice('Данные успешно отправлены!');
		},
		error: function(jqxhr, status, errorMsg) {
			self._notice.innerHTML = "";
			self.addNotice('Извините, произошла ошибка. Попробуйте отправить данные позже.');
		}
	});		
};