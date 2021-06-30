let BaseForm = require('../modules/Form');

/* Класс формы обратной связи */
// elem - элемент контейнера окна формы
function WindowForm(elem) {
	BaseForm.apply(this, arguments);
	this._SVGOpenClose = document.getElementById('openClose'); // SVG элемет для анимации открытия и закрытия формы
	this._animOpenClose = new MyAnimation(this._elem); // Объект анимации
	this._animFormElems = {
		light: document.getElementById('lightGradient'),
		formGradient: document.getElementById('formGradient')
	};
	this._animForm = new MyAnimation(this._animFormElems);
	this._parentElem = this._elem.parentNode;
	this._previousElem = this._elem.previousElementSibling;
	
	this.close();
	this.activAnimElems();
}
// Наследуюет класс BaseForm
WindowForm.prototype = Object.create(BaseForm.prototype);
WindowForm.prototype.constructor = WindowForm;

/* Внутренние методы */

// Активирует анимации кнопок формы
WindowForm.prototype._activFormButons = function () {
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
// Активирует анимации кнопок открытия формы
WindowForm.prototype._activOpenButons = function () {
	var	openButtons = document.querySelectorAll('svg[class="openButton"]'); // Кнопки открытия формы
	// Устанавливается постоянная анимация на кнопки открытия формы
	for ( var i = 0; i < openButtons.length; i++ ) {
		openButtons[i].animCont = { handset: new MyAnimation ( openButtons[i].querySelector('#handset') ),
									blackCircle: new MyAnimation ( openButtons[i].querySelector('#blackCircleGradient') ) };
		var animHandset = openButtons[i].animCont.handset,
			animBlackCircle = openButtons[i].animCont.blackCircle;
		openButtons[i].animCont.blackCircle.setDraw(function (elem) {
			elem.attributes['r'].value = animBlackCircle.progress * 50;
			elem.childNodes[1].attributes['stop-opacity'].value = animBlackCircle.generateValue(1, 0);
		});				
		openButtons[i].animCont.handset.setDraw(function(elem) {
			elem.attributes['transform'].value = 'rotate(' + (animHandset.progress * 70) + ' 50 50)';
			switch (animHandset.progress) {
				case 1:
					animHandset.setTiming(function (timeFraction) {	
						return 1 - timeFraction;
					});
					animHandset.animate(1000);
					break;
				case 0:
					animHandset.setTiming(function (timeFraction) {
						return timeFraction;
					});
					animBlackCircle.animate(2000);
					animHandset.animate(1000);
					break;					
			}
		});
		openButtons[i].animCont.handset.animate(1000);
		// Устанавливаются	собития при наведении мыши на кнопи открытия формы
		var orangeCircle = openButtons[i].querySelector('#orangeCircle');
		orangeCircle.animButton = new MyAnimation ( orangeCircle );
		orangeCircle.onmouseenter = function () {
			var self = this;
			this.animButton.setTiming(function (timeFraction) {
				return timeFraction;
			});
			this.animButton.setDraw(function (elem, progress) {
				elem.attributes['transform'].value = 'rotate(' + (self.animButton.progress * 180) + ' 50 50)';
			});
			this.animButton.animate(500);
		};
		orangeCircle.onmouseleave = function () {
			this.animButton.setTiming(function (timeFraction) {
				return 1 - timeFraction;
			});
			this.animButton.animate(500);
		};	
	}
};
// Активирует анимацию кнопки закрытия формы при наведении мыши
WindowForm.prototype._activCloseButons = function () {
	var close = this._elem.querySelector('svg[class="close"]'), // Крестик
	animClose = new MyAnimation ( close.querySelector('.closeOuter') );
	// Устанавливается событие при наведении мыши на крестик
	close.onmouseenter = function () {
		animClose.setTiming(function (timeFraction) {
			return timeFraction;
		});		
		animClose.setDraw(function (elem, progress) {
			elem.attributes['r'].value = animClose.generateValue(0, 50) + '%';
		});
		animClose.animate(50);
	};
	close.onmouseleave = function () {
		animClose.setTiming(function (timeFraction) {
			return 1 - timeFraction;
		});
		animClose.animate(500);
	};	
};
// Запускает анимацию ошибки
WindowForm.prototype._animError = function () {
	var self = this,
		initialColorsFG = [
			this._animForm.rgb10('#ffffff'),
			this._animForm.rgb10('#e1e1e1'),
			this._animForm.rgb10('#c2c2c2'),
			this._animForm.rgb10('#aaaaaa'),
			this._animForm.rgb10('#999999'),
			this._animForm.rgb10('#8e8e8e'),
			this._animForm.rgb10('#8b8b8b')
		],
		finalColorsFG = [
			this._animForm.rgb10('#000000'),
			this._animForm.rgb10('#000000'),
			this._animForm.rgb10('#000000'),
			this._animForm.rgb10('#000000'),
			this._animForm.rgb10('#000000'),
			this._animForm.rgb10('#000000'),
			this._animForm.rgb10('#000000')
		],
		initialColorL = '#ffffff',
		finalColorL = this._animForm.rgb10('#000000');
	initialColorL = this._animForm.rgb10(initialColorL);
	this._animForm.setDraw(function (elem, progress) {
		elem.light.attributes['r'].value = self._animForm.generateValue(600, 485.5 );
		elem.formGradient.attributes['r'].value = self._animForm.generateValue(414.5, 300 );		
		elem.light.childNodes[0].attributes['stop-opacity'].value = self._animForm.generateValue(0, 1);
		elem.light.childNodes[1].attributes['stop-opacity'].value = self._animForm.generateValue(0.8, 1);
		elem.light.childNodes[0].attributes['stop-color'].value = self._animForm.generateColor( initialColorL, finalColorL );
		for ( var i = 0; i < elem.formGradient.childNodes.length; i++ ) {
			elem.formGradient.childNodes[i].attributes['stop-color'].value = self._animForm.generateColor( initialColorsFG[i], finalColorsFG[i] );
		}
	});
	this._animForm.animate(2000);
};
// Запускает анимацию успешной отправки данных
WindowForm.prototype._animSucces = function () {
	var self = this,
		finalColorsFG = [
			this._animForm.rgb10('#ff2a2a'),
			this._animForm.rgb10('#e11f1f'),
			this._animForm.rgb10('#c21414'),
			this._animForm.rgb10('#aa0b0b'),
			this._animForm.rgb10('#990505'),
			this._animForm.rgb10('#8e0101'),
			this._animForm.rgb10('#8b0000')
		],
		initialColorsFG = [
			this._animForm.rgb10('#ffffff'),
			this._animForm.rgb10('#e1e1e1'),
			this._animForm.rgb10('#c2c2c2'),
			this._animForm.rgb10('#aaaaaa'),
			this._animForm.rgb10('#999999'),
			this._animForm.rgb10('#8e8e8e'),
			this._animForm.rgb10('#8b8b8b')
		],
		finalColorL = this._animForm.rgb10('#ff0000'),
		initialColorL = this._animForm.rgb10('#ffffff');
	this._animForm.setDraw(function (elem, progress) {
		elem.light.attributes['r'].value = self._animForm.generateValue(600, 485.5);
		elem.formGradient.attributes['r'].value = self._animForm.generateValue(414.5, 300);	
		elem.light.childNodes[0].attributes['stop-color'].value = self._animForm.generateColor( initialColorL, finalColorL );
		for ( var i = 0; i < elem.formGradient.childNodes.length; i++ ) {
			elem.formGradient.childNodes[i].attributes['stop-color'].value = self._animForm.generateColor( initialColorsFG[i], finalColorsFG[i] );
		}
	});
	this._animFormElems.light.childNodes[0].attributes['stop-opacity'].value = 0;
	this._animFormElems.light.childNodes[1].attributes['stop-opacity'].value = 0.8;
	this._animForm.animate(2000);	
};

/* Внешние методы */

// Обработчик для открытия окна
WindowForm.prototype.openHandler = function () {
	this._parentElem.insertBefore(this._elem, this._previousElem);
	document.body.style.overflow = 'hidden';
	this._elem.style.visibility = 'visible';
	this._animOpenClose.setDraw(function (elem, progress) {
		elem.style.opacity = progress * 1;
	});
	this._animOpenClose.animate(500);	
};
// Обработчик для закрытия окна
WindowForm.prototype.closeHandler = function (event) {	
	document.body.style.overflow = '';
	this._elem.style = '';
	this._elem = this._parentElem.removeChild(this._elem);
};
// Обработчик для закрытия окна
// Срабатывает при клике по фону окна
WindowForm.prototype.closeHandlerBG = function (event) {	
	if ( event.target.className === 'formInnerContainer' ) this.closeHandler(event);	
};
// Устанавливает события кликов на кнопки с селектором selector для открытия формы
// selector - string
WindowForm.prototype.open = function (selector) {
	if ( selector === undefined ) selector = '.openButton'; // Селектор по умолчанию - '.openButton'
	var self = this,
		openButtons = document.querySelectorAll(selector);
	for (var i = 0; i < openButtons.length; i++) {
		openButtons[i].addEventListener('click', this.openHandler.bind(this));
	}
};
// Устанавливает собитие клика на крестик с классом close для закрытия формы 
WindowForm.prototype.close = function () {
	this._elem.querySelector('svg[class="close"]').addEventListener('click', this.closeHandler.bind(this));
	this._elem.addEventListener('click', this.closeHandlerBG.bind(this) );
};
// Добавляет на кнопку слушателя события клика
// string selector - селектор кнопки
// function handler - обработчик события
WindowForm.prototype.addButton = function (selector, handler) {
	this._elem.querySelector(selector).addEventListener('click', handler);
};
// Возвращает объект класса WindowForm(cloneElem);
// cloneElem - копия элемента this._elem
WindowForm.prototype.createWindow = function () {
	// Если в документе есть элемент this._elem, то удаляет его
	if ( document.getElementById(this._elem.id) !== null ) {
		this._elem = this._parentElem.removeChild(this._elem);
	}
	var cloneElem = this._elem.cloneNode(true); // Создается копия this._elem
	var window = new this.__proto__.constructor(cloneElem);
	window._parentElem = this._parentElem;
	window._previousElem = this._previousElem;
	return window;
};

WindowForm.prototype.getContainer = function () {
	return this._elem;
};
// Активирует анимации элементов формы
WindowForm.prototype.activAnimElems = function () {
	this._activFormButons();
	this._activOpenButons();
	this._activCloseButons();
};

module.exports = WindowForm;