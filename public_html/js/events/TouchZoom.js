/* Класс события масштабирования элемента с помощью touch */
function TouchZoom(elem) {
	this._elem = elem;
	this.touchZoomStartEvent = new CustomEvent('touchZoomStart');	
	this.touchZoomEvent = new CustomEvent('touchZoom');
	this.touchZoomEndEvent = new CustomEvent('touchZoomEnd');	
	this.distance = 0; // Начальное расстояние между пальцами

	this.addEvent();
}

/* Внутренние методы */

// Возваращает расстояние между пальцами
TouchZoom.prototype._getDistance = function (x, y) {
	return Math.pow( Math.pow( ( x[1] - x[0] ), 2 ) + Math.pow( ( y[1] - y[0] ), 2 ) , 0.5 );
};
// Устанавливает this.distance, если на элементе не менее 2-ух пальцев
TouchZoom.prototype._touchStartHandler = function (event) {
	if ( event.touches.length >= 2 ) {
		this.distance = this._getDistance( [event.touches[0].clientX, event.touches[1].clientX], [event.touches[0].clientY, event.touches[1].clientY] );
		this._elem.dispatchEvent(this.touchZoomStartEvent);
	}
};
// Устанавливает событию touchZoom свойство scale и вызвает его на элементе, если на элементе не менее 2-ух пальцев
// this.touchZoomEvent.scale - масштаб
TouchZoom.prototype._touchMoveHandler = function (event) {
	if ( event.touches.length >= 2 ) {
		event.preventDefault();
		this.touchZoomEvent.scale = this._getDistance( [event.touches[0].clientX, event.touches[1].clientX], [event.touches[0].clientY, event.touches[1].clientY] ) / this.distance;
		this.touchZoomEvent.centerX = ( event.touches[0].clientX + event.touches[1].clientX ) / 2;
		this.touchZoomEvent.centerY = ( event.touches[0].clientY + event.touches[1].clientY ) / 2;
		this._elem.dispatchEvent(this.touchZoomEvent);		
	}
};
// Вызавет событие touchZoomEnd на элементе если на элементе остался 1 палец
TouchZoom.prototype._touchEndHandler = function (event) {
	if ( event.touches.length == 1 ) {
		this._elem.dispatchEvent(this.touchZoomEndEvent);	
	}
};

/* Внешние методы */

TouchZoom.prototype.addEvent = function () {	
	this._elem.addEventListener('touchstart', this._touchStartHandler.bind(this), false);
	this._elem.addEventListener('touchmove', this._touchMoveHandler.bind(this), false);
	this._elem.addEventListener('touchend', this._touchEndHandler.bind(this), false);
};