/* Класс события перетаскивания элемента с помощью touch */
function Drag(elem) {
	this._elem = elem;
	this.DragEventStart = new CustomEvent('dragstart');
	this.DragEvent = new CustomEvent('drag');
	this.DragEndEvent = new CustomEvent('dragend');
	this.startingPoint = []; // Координаты начальной точки
	this.currentPoint = {};

	this.addEvent();
}

/* Внутренние методы */

// Устанавливает this.startingPoint, если на элементе 1 палец
Drag.prototype._touchStartHandler = function (event) {
	if ( event.touches.length == 1 ) {
		delete this.previousPoint;
		this.currentPoint = { x: event.touches[0].clientX, y: event.touches[0].clientY, time: event.timeStamp };
		this.startingPoint = [this.currentPoint.x, this.currentPoint.y];
		this._elem.dispatchEvent(this.DragEventStart);
	}
};
// Устанавливает событию Drag свойства и вызвает его на элементе, если на элементе 1 палец
// this.DragEvent.offsetDistX - расстояние смещения по X
// this.DragEvent.offsetDistY - расстояние смещения по Y
Drag.prototype._touchMoveHandler = function (event) {
	if ( event.touches.length == 1 ) {
		event.preventDefault();
		this.previousPoint = this.currentPoint;
		this.currentPoint = { x: event.touches[0].clientX, y: event.touches[0].clientY, time: event.timeStamp };
		this.DragEvent.offsetDistX = event.touches[0].clientX - this.startingPoint[0];
		this.DragEvent.offsetDistY = event.touches[0].clientY - this.startingPoint[1];
		this._elem.dispatchEvent(this.DragEvent);	
	}
};

Drag.prototype._touchEndHandler = function (event) {
	// Устанавливает событию DragEnd свойства и вызвает его на элементе, если c элемента убрали все пальцы палец
	// this.DragEndEvent.vX - конечная скорость движения пальца по X
	// this.DragEndEvent.vX - конечная скорость движения пальца по Y	
	if ( event.touches.length == 0 ) {
		this.currentPoint = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY, time: event.timeStamp };		
		if ( this.previousPoint !== undefined ) {
			this.DragEndEvent.vX = (this.currentPoint.x - this.previousPoint.x) / (this.currentPoint.time - this.previousPoint.time);
			this.DragEndEvent.vY = (this.currentPoint.y - this.previousPoint.y) / (this.currentPoint.time - this.previousPoint.time);
		}
		else {
			this.DragEndEvent.vX = 0;
			this.DragEndEvent.vY = 0;
		}
		this._elem.dispatchEvent(this.DragEndEvent);
	}
	// Если на элементе остался 1 палец
	if ( event.touches.length == 1 ) {
		this._touchStartHandler(event);
	}
};

/* Внешние методы */

Drag.prototype.addEvent = function () {	
	this._elem.addEventListener('touchstart', this._touchStartHandler.bind(this), false);
	this._elem.addEventListener('touchmove', this._touchMoveHandler.bind(this), false);
	this._elem.addEventListener('touchend', this._touchEndHandler.bind(this), false);
};

module.exports = Drag;