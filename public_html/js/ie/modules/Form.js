"use strict";

/* Базовый класс формы */
function BaseForm(elem) {
  this._elem = elem;
  this._notice = this._elem.querySelector('p[class="notice"]'); // Контейнер уведомлений

  this._span = document.createElement('span'); // Элемент span

  this.activAnimElems();
}
/* Внутренние методы */
// Активирует анимации кнопок формы


BaseForm.prototype._activFormButons = function () {
  var buttons = document.querySelectorAll('svg[class="button"]'); // Кнопки формы
  // Устанавливаются	собития при наведении мыши на кнопи формы

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].animButton = new MyAnimation(buttons[i].querySelector('radialGradient'));

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
}; // Добавляет уведомление с текстом textNotice


BaseForm.prototype.addNotice = function (textNotice) {
  var spanNotice = this._span.cloneNode(true);

  spanNotice.innerHTML = textNotice;

  this._notice.appendChild(spanNotice);

  this._notice.dataset.kind = '';
}; // Добавляет уведомление об успешной отправки данных с текстом textNotice


BaseForm.prototype.addSucNotice = function (textNotice) {
  this.addNotice(textNotice);
  this._notice.dataset.kind = 'succes';
}; // Добавляет предупреждение с текстом textNotice


BaseForm.prototype.addWarning = function (textNotice) {
  this.addNotice(textNotice);
  this._notice.dataset.kind = 'warning';
}; // Добавляет уведомление о статусе с текстом textNotice


BaseForm.prototype.addStatus = function (textNotice) {
  this.addNotice(textNotice);
  this._notice.dataset.kind = '';
}; // Подсвечивает незаполненное поле field


BaseForm.prototype._highlight = function (field) {
  field.dataset.kind = 'warning';

  field.oninput = function () {
    if (field.value !== '') {
      field.dataset.kind = '';
    } else {
      field.dataset.kind = 'warning';
    }
  };
}; // Подсвечивает поля field1 и field2, если хотя бы одно из них не заполнено


BaseForm.prototype._doubleHighlight = function (field1, field2) {
  field1.dataset.kind = 'warning';
  field2.dataset.kind = 'warning';

  field1.oninput = function () {
    if (field1.value !== "" || field2.value !== "") {
      field1.dataset.kind = '';
      field2.dataset.kind = '';
    } else {
      field1.dataset.kind = 'warning';
      field2.dataset.kind = 'warning';
    }
  };

  field2.oninput = function () {
    if (field1.value !== "" || field2.value !== "") {
      field1.dataset.kind = '';
      field2.dataset.kind = '';
    } else {
      field1.dataset.kind = 'warning';
      field2.dataset.kind = 'warning';
    }
  };
}; // Добавляет обязательное поле в массив this._requiredFields
// elem элемент поля формы
// warning текст предупреждения добавляемый в элемент с классом notice, в случае если поле elem не заполнено
// boolean verifiedValue результат сравнения проверяемого значения в elem, позволяющее определить заполнено ли поле (необязательный аргумент)
// warningCon текст предупреждения отображаемый в консоле, в случае если поле elem не заполнено (необязательный аргумент)


BaseForm.prototype.addRequiredField = function (elem, warning, verifiedValue, warningCon) {
  if (verifiedValue === undefined) verifiedValue = Boolean(elem.value); // Если аргумент не передан, устанавливается результат сравнения elem.value === ''

  if (warningCon === undefined) warningCon = warning;
  this._requiredFields[this._requiredFields.length] = {
    elem: elem,
    verifiedValue: verifiedValue,
    warning: warning,
    warningCon: warningCon
  };
}; // Проверяет заполнены ли обязательные поля
// Должен быть объявлен метод _setRequiredFields()


BaseForm.prototype.checkFields = function () {
  this._requiredFields = []; // Массив объектов обязательных полей

  this._setRequiredFields();

  this._notice.innerHTML = ""; // Если поля не заполнены, то выбырасывает исключения

  try {
    for (var i = 0; i < this._requiredFields.length; i++) {
      if (!this._requiredFields[i].verifiedValue) throw new Error(this._requiredFields[i].warningCon);
    }
  } // Вставляет элементы уведомления, если поля не заполнены и заверашает работу скрипта
  catch (_unused) {
    for (var i = 0; i < this._requiredFields.length; i++) {
      if (!this._requiredFields[i].verifiedValue) {
        this.addWarning(this._requiredFields[i].warning);

        this._highlight(this._requiredFields[i].elem);
      }
    }

    throw new Error('Не заполнены обязательные поля!');
  }
}; // Проверяет правильно ли заполнены обязательные поля
// string data данные полученные в результате запроса 
// В дочернем классе должен быть объявлен метод _setCheckedCorFields(data)


BaseForm.prototype._checkCorrect = function (data) {
  this._requiredFields = []; // Массив объектов обязательных полей

  this._setCheckedCorFields(data); // Устанавливает поля для проверки на правильность их заполнения


  this._notice.innerHTML = ""; // Если поля заполнены неверно, то выбырасывает исключения

  try {
    for (var i = 0; i < this._requiredFields.length; i++) {
      if (!this._requiredFields[i].verifiedValue) throw new Error(this._requiredFields[i].warningCon);
    }
  } // Вставляет элементы уведомления, если поля заполнены неверно и заверашает работу скрипта
  catch (_unused2) {
    for (var i = 0; i < this._requiredFields.length; i++) {
      if (!this._requiredFields[i].verifiedValue) {
        this.addWarning(this._requiredFields[i].warning);

        this._highlight(this._requiredFields[i].elem);
      }
    }

    throw new Error('Неверно заполнены обязательные поля!');
  }
}; // Обработчик для подтверждения
// Отправляет данные формы
// В дочернем классе должен быть объявлен метод _ajax(formData)


BaseForm.prototype._confirmHandler = function (event) {
  var formData = this.getFormData(event.target);
  this.checkFields(); // Проверяет обязательные поля

  this._ajax(formData); // Отправляет запрос	

};
/* Внешние методы */
// Активирует анимации элементов формы


BaseForm.prototype.activAnimElems = function () {
  this._activFormButons();
}; // Возвращает объект formData
// target - элемент на котором произошло событие


BaseForm.prototype.getFormData = function (target) {
  var form = target.parentNode;

  while (form.tagName != 'FORM') {
    form = form.parentNode;
  }

  return new FormData(form);
}; // Устанавливает собтие клика на кнопку подтверждения с аттрибутом data-button="sendData"


BaseForm.prototype.confirm = function () {
  this._elem.querySelector('[data-button="sendData"]').addEventListener('click', this._confirmHandler.bind(this));
};