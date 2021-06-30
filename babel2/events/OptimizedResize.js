/* Класс оптимизированного события изменения окна браузера */
function OptimizedResize() {
	this._running = false;
	this.optimizedResizeEvent = new CustomEvent('optimizedResize');

	this.addEvent();
}

/* Внутренние методы */

OptimizedResize.prototype._requestAnimationFrameHandler = function () {
	window.dispatchEvent( this.optimizedResizeEvent );
	this._running = false;	
};
// Если событие resize не запущено, то добавляет кадр анимации
OptimizedResize.prototype._resizeHandler = function () {
	if (this._running) return;
	this._running = true;
	requestAnimationFrame( this._requestAnimationFrameHandler.bind(this) );	
};

/* Внешние методы */

OptimizedResize.prototype.addEvent = function () {	
	window.addEventListener( 'resize', this._resizeHandler.bind(this) );
};

module.exports = OptimizedResize;