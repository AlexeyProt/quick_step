/* Класс тулбара */
function ToolBar() {
	this._headerMenu = document.querySelector('div[class="headerMenu"]'); // Шапка тулбара
	this._header = document.querySelector('.header'); // Шапка
	
	/* this.setHeaderMargin(); */
}

/* Внутренние методы */

ToolBar.prototype._resizeHandler = function () {
	if (this._headerMenu.offsetHeight) this._header.style.marginTop = this._headerMenu.offsetHeight+'px';
};

/* Внешние методы */

ToolBar.prototype.setHeaderMargin = function () {
	this._resizeHandler();
	window.addEventListener( 'optimizedResize', this._resizeHandler.bind(this) );
};

module.exports = ToolBar;