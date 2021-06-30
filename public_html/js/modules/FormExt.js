/* Класс формы обратной связи */
function BaseForm(elem) {
	this._elem = elem;
	this._notice = this._elem.querySelector('p[class="notice"]'); // Контейнер уведомлений
	this._span = document.createElement('span'); // Элемент span
	
	this.activAnimElems();
	this.sendData();
}

/* Внутренние методы */

// Активирует анимации кнопок формы
BaseForm.prototype._activFormButons = function () {
	var	buttons = document.querySelectorAll('svg[class="button"]');// Кнопки формы
	// Устанавливаются	собития при наведении мыши на кнопи формы
	for ( var i = 0; i < buttons.length; i++ ) {
		buttons[i].animButton = new MyAnimation ( buttons[i].querySelector('radialGradient') );
		buttons[i].onmouseenter = function () {
			var self = this;
			this.animButton.setTiming(function (timeFraction) {
				return timeFraction;
			});
			this.animButton.setDraw(function (elem, progress) {
				elem.attributes['r'].value = self.animButton.generateValue(0, 50) + '%';
			});
			this.animButton.animate(50);
		};
		buttons[i].onmouseleave = function () {
			this.animButton.setTiming(function (timeFraction) {
				return 1 - timeFraction;
			});
			this.animButton.animate(500);
		};		
	}	
};
// Добавляет уведомление с текстом textNotice
BaseForm.prototype._addNotice = function (textNotice) {
	var spanNotice = this._span.cloneNode(true);
	spanNotice.innerHTML = textNotice;
	this._notice.appendChild(spanNotice);
};
// Добавляет уведомление об успешной отправки данных с текстом textNotice
BaseForm.prototype._addSucNotice = function (textNotice) {
	this._notice.dataset.kind = 'succes';
	this._addNotice(textNotice);
}
// Добавляет предупреждение с текстом textNotice
BaseForm.prototype._addWarning = function (textNotice) {
	this._notice.dataset.kind = 'warning';
	this._addNotice(textNotice);
}
// Добавляет уведомление о статусе с текстом textNotice
BaseForm.prototype._addStatus = function (textNotice) {
	this._notice.dataset.kind = '';
	this._addNotice(textNotice);
}
// Подсвечивает незаполненное поле field или заполненное неверно
BaseForm.prototype._highlight = function (field) {
	field.dataset.kind = 'warning';
	field.oninput = function () {
		if ( field.value !== '' ) {
			field.dataset.kind = '';
		}
		else {
			field.dataset.kind = 'warning';
		}
	};
};
// Подсвечивает поля field1 и field2, если хотя бы одно из них не заполнено
BaseForm.prototype._doubleHighlight = function (field1, field2) {
	field1.dataset.kind = 'warning';
	field2.dataset.kind = 'warning';
	field1.oninput = function () {
		if ( field1.value !== "" || field2.value !== "" ) {
			field1.dataset.kind = '';
			field2.dataset.kind = '';
		}
		else {
			field1.dataset.kind = 'warning';
			field2.dataset.kind = 'warning';
		}
	};
	field2.oninput = function () {
		if ( field1.value !== "" || field2.value !== "" ) {
			field1.dataset.kind = '';
			field2.dataset.kind = '';
		}
		else {
			field1.dataset.kind = 'warning';
			field2.dataset.kind = 'warning';
		}		
	};	
};
// Добавляет обязательное поле в массив this._requiredFields
// elem элемент поля формы
// warning текст предупреждения добавляемый в элемент с классом notice, в случае если поле elem не заполнено
// boolean verifiedValue результат сравнения проверяемого значения в elem, позволяющее определить заполнено ли поле (необязательный аргумент)
// dataWarning текст предупреждения добавляемый в элемент с классом notice, в случае если поле elem заполнено не верно
// boolean verifiedDataValue результат сравнения проверяемого значения полученного в результате запроса, позволяющее определить правильные ли данные введены в поле (необязательный аргумент)
// warningCon текст предупреждения отображаемый в консоле, в случае если поле elem не заполнено (необязательный аргумент)
BaseForm.prototype._addRequiredField = function (elem, warning, verifiedValue, dataWarning, verifiedDataValue,  warningCon) {
	if ( verifiedValue === undefined ) verifiedValue = elem.value === ''; // Если аргумент не передан, устанавливается результат сравнения elem.value === ''
	if ( verifiedDataValue === undefined ) verifiedDataValue = false; // Если аргумент не передан, устанавливается false	
	if ( warningCon === undefined ) warningCon = warning;
	this._requiredFields[this._requiredFields.length] = {
		elem: elem,
		verifiedValue: verifiedValue,
		verifiedDataValue: verifiedDataValue,
		dataWarning: dataWarning,
		warning: warning,
		warningCon: warningCon
	};
};
// Проверяет заполнены ли и правильно ли заполнены обязательные поля
// В дочернем классе должен быть объявлен метод _setRequiredFields()
BaseForm.prototype.checkFields = function () {
	this._requiredFields = []; // Массив объектов обязательных полей
	this._setRequiredFields();
	this._notice.innerHTML = "";
	// Если поля не заполнены или заполнены неверно, то выбырасывает исключения
	try {
		for ( var i = 0; i < this._requiredFields.length; i++ ) {
			if ( this._requiredFields[i].verifiedValue ||  this._requiredFields[i].verifiedDataValue ) throw new Error(this._requiredFields[i].warningCon);		
		}
	}
	// Вставляет элементы уведомления, если поля не заполнены или заполнены неверно и заверашает работу скрипта
	catch {
		for ( var i = 0; i < this._requiredFields.length; i++ ) {
			if ( this._requiredFields[i].verifiedValue ) {
				this._addWarning(this._requiredFields[i].warning);
				this._highlight(this._requiredFields[i].elem);
			}
			if ( this._requiredFields[i].verifiedDataValue ) {
				this._addWarning(this._requiredFields[i].dataWarning);
				this._highlight(this._requiredFields[i].elem);
			}			
		}
		throw new Error('Не заполнены обязательные поля!');
	}
};

/* Внешние методы */

// Активирует анимации элементов формы
BaseForm.prototype.activAnimElems = function () {
	this._activFormButons();
};
// Устанавливает собтие клика на кнопку отправки данных с аттрибутом data-button="sendData"
// В дочернем классе должен быть объявлен метод _ajax(formData)
BaseForm.prototype.sendData = function () {
	var self = this;
	self._elem.querySelector('[data-button="sendData"]').onclick = function () {
		var form = this.parentNode;
		while ( form.tagName != 'FORM' ) {
			form = form.parentNode;
		}
		var formData = new FormData(form);
		self.checkFields(); // Проверяет обязательные поля
		self._ajax(formData); // Отправляет запрос
	};		
};