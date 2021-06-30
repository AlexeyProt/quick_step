/* Класс формы обратной связи */
function Menu() {
	this._mobileMenu = document.getElementById('mobileMenu'); // Внешний узел мобильного меню
	this._headerMobileMenu = this._mobileMenu.querySelector('div[class="headerMobileMenu"]'); // Шапка мобильного меню
	this._mobileMenuContainer = this._mobileMenu.querySelector('div[class="mobileMenuContainer"]'); // Контейнер мобильного меню
	this._headerMobileMenuContainer = this._mobileMenu.querySelector('div[class="headerMobileMenuContainer"]'); // Контейнер шапки мобильного меню
	this._menuButton = document.getElementById('menuButton'); // Кнопка открытия меню
	this._header = document.querySelector('.header'); // Шапка
	// Анимация мобильного меню
	this._animMobileMenu = new MyAnimation ({
		mobileMenu: this._mobileMenu.querySelector('ul[class="mobileList"]'),
		mobileMenuBackground: this._mobileMenu.querySelector('div[class="mobileMenuBackground"]')
	});
	
	this.open();
	this.close();
	this.activMenuButton();
	/* this.setHeaderMargin(); */
}

/* Внутренние методы */

// Обработчик для закрытия меню
Menu.prototype._closeHandler = function () {
	var self = this;
	self._animMobileMenu.setRoundTiming(function (timeFraction) {
		switch(timeFraction) {
			case 1:
				self._mobileMenu.insertBefore( self._headerMobileMenu, self._mobileMenu.firstChild );
				self._mobileMenu.style.height = "";
				self._mobileMenuContainer.style.display = "";
				document.body.style.overflow = "";
			break;
		}
		return 1 - Math.pow(timeFraction, 5);
	});
	self._animMobileMenu.animate(500);	
};

Menu.prototype._resizeHandler = function () {
	if (this._headerMobileMenu.offsetHeight) this._header.style.marginTop = this._headerMobileMenu.offsetHeight+'px';
};

/* Внешние методы */

// Устанавливает событие клика на кнопку меню с классом menuButton для открытия меню
Menu.prototype.open = function () {
	var self = this;
	this._menuButton.onclick = function () {
		document.body.style.overflow = "hidden";
		self._mobileMenuContainer.style.display = 'table';
		self._mobileMenu.style.height = '100%';
		self._headerMobileMenuContainer.appendChild( self._headerMobileMenu );
		self._animMobileMenu.setDraw(function (elem) {
			elem.mobileMenu.style.marginLeft = self._animMobileMenu.generateValue(-265, 0) + 'px';
			elem.mobileMenuBackground.style.opacity = self._animMobileMenu.progress * 0.5;
		});
		self._animMobileMenu.setRoundTiming(function (timeFraction) {
			return Math.pow(timeFraction, 5);
		});
		self._animMobileMenu.animate(500);
	};
};
// // Устанавливает событие клика на элемент с классом mobileMenuContainer для закрытия меню
Menu.prototype.close = function () {
	this._mobileMenuContainer.addEventListener( 'click', this._closeHandler.bind(this) );
};
// Активирует анимацию кнопки меню при клике
Menu.prototype.activMenuButton = function () {
	var animMenuButton = new MyAnimation ( this._menuButton.querySelector('radialGradient') );
	function hoverButton () {
		animMenuButton.setDraw(function (elem) {
			elem.attributes['r'].value = animMenuButton.progress * 100 + '%';
		});
		animMenuButton.animate(500);		
	}
	// Устанавливает событие клика на кнопку меню с классом menuButton
	this._menuButton.addEventListener('click', hoverButton);
};
Menu.prototype.setHeaderMargin = function () {
	this._resizeHandler();
	window.addEventListener( 'optimizedResize', this._resizeHandler.bind(this) );
};

module.exports = Menu;