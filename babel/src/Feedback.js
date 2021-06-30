/* Класс формы обратной связи */
function Feedback(elem) {
	this._elem = elem;
	this._notice = this._elem.querySelector('p[class="notice"]'); // Контейнер уведомлений
	this._span = document.createElement('span'); // Элемент span
	
	this.activAnimElems();
	this.sendData();
}

/* Внутренние методы */

// Активирует анимации кнопок формы
Feedback.prototype._activFormButons = function () {
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
Feedback.prototype._addNotice = function (textNotice) {
	var spanNotice = this._span.cloneNode(true);
	spanNotice.innerHTML = textNotice;
	this._notice.appendChild(spanNotice);
};
// Добавляет уведомление об успешной отправки данных с текстом textNotice
Feedback.prototype._addSucNotice = function (textNotice) {
	this._notice.dataset.kind = 'succes';
	this._addNotice(textNotice);
}
// Добавляет предупреждение с текстом textNotice
Feedback.prototype._addWarning = function (textNotice) {
	this._notice.dataset.kind = 'warning';
	this._addNotice(textNotice);
}
// Подсвечивает незаполненное поле field
Feedback.prototype._highlight = function (field) {
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
Feedback.prototype._doubleHighlight = function (field1, field2) {
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
// Проверяет заполнены ли обязательные поля
Feedback.prototype.checkFields = function () {
	// Элементы полей
	var user = this._elem.querySelector('input[name="user"]'),
		phoneNumber = this._elem.querySelector('input[name="phoneNumber"]'),
		mail = this._elem.querySelector('input[name="mail"]'),
		agreement = this._elem.querySelector('input[name="agreement"]');
	this._notice.innerHTML = "";
	// Если поля не заполнены, то выбырасывает исключения
	try {
		if ( user.value === "" ) {
			throw new Error('Не указано имя!');
		}
		if ( phoneNumber.value === "" ) {
			throw new Error('Не указан телефон!');
		}
	}
	// Вставляет элементы уведомления, если поля не заполнены и заверашает работу скрипта
	catch (e) {
		if ( user.value === "" ) {
			this._addWarning('Пожалуйста, укажите имя!<br>');
			this._highlight(user);
		}
		if ( phoneNumber.value === "" ) {
			this._addWarning('Пожалуйста, укажите телефон!<br>');
			this._highlight(phoneNumber);
		}
		throw new Error('Не заполнены обязательные поля!');
	}
};

/* Внешние методы */

// Активирует анимации элементов формы
Feedback.prototype.activAnimElems = function () {
	this._activFormButons();
};
// Устанавливает собтие клика на кнопку отправки данных с аттрибутом data-button="feedback"
Feedback.prototype.sendData = function () {
	var self = this;
	self._elem.querySelector('div[data-button="feedback"]').onclick = function () {
		var form = this.parentNode;
		while ( form.tagName != 'FORM' ) {
			form = form.parentNode;
		}
		var formData = new FormData(form);
		self.checkFields();
		$.ajax({
			url: "/feedback",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				self._notice.innerHTML = "";
				self._addSucNotice('Наши специалисты свяжутся с Вами в ближайшее время!');
			},
			error: function(jqxhr, status, errorMsg) {
				self._addNotice('Извините, произошла ошибка. Попробуйте отправить данные позже.');
			}
		});	
	};		
};