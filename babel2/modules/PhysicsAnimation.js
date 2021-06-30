/* Класс анимации физики */
let MyAnimation = require('../modules/MyAnimation');

function PhysicsAnimation (elem) {
	MyAnimation.apply(this, arguments);	
}
// Наследуюет класс MyAnimation
PhysicsAnimation.prototype = Object.create(MyAnimation.prototype);
PhysicsAnimation.prototype.constructor = MyAnimation;

// Возвращает тормозной путь
// float v - начальная скорость 
// float a - ускорение
PhysicsAnimation.prototype._getBrakingDist = function ( v, a ) {
	return -Math.pow(v, 2)/(2*a);
};

PhysicsAnimation.prototype._getSpeed = function ( s, v0, a ) {
	return Math.pow( ( (2*a*s) + Math.pow(v0, 2) ), 0.5 );
};
// float aX, aY ускорение (для замедленного движения - знак минус)
PhysicsAnimation.prototype.set = function ( vX, vY, aX, aY ) {
	this.vX = vX; // начальная скорость по X
	this.vY = vY; // начальная скорость по Y
	this.aX = aX*( this.vX/Math.abs(this.vX) ); // Направление ускорения уставливается с учетом направления скорости по X
	this.aY = aY*( this.vY/Math.abs(this.vY) ); // Направление ускорения уставливается с учетом направления скорости по Y
	this.t = Math.pow( ( Math.pow(this.vX, 2) + Math.pow(this.vY, 2) ) , 0.5 ) / Math.pow( ( Math.pow(this.aX, 2) + Math.pow(this.aY, 2) ) , 0.5 ); // Время торможения
	this.sX0 = this._getBrakingDist( this.vX, this.aX ); // Начало тормозного пути по X
	this.sY0 = this._getBrakingDist( this.vY, this.aY );
};

PhysicsAnimation.prototype.getCurrentSpeedX = function () {
	return this._getSpeed(this.sX0*this.progress, this.vX, this.aX);
};

PhysicsAnimation.prototype.getCurrentSpeedY = function () {
	return this._getSpeed(this.sY0*this.progress, this.vY, this.aY);
};

// Возвращает часть тормозного пути на текущий момент анимации по оси X
PhysicsAnimation.prototype.getCurrBrakingDistX = function () {
	return this.sX0 - this._getBrakingDist( ( this.vX-(this.vX*this.progress) ), this.aX );
};
// Возвращает часть тормозного пути на текущий момент анимации по оси Y
PhysicsAnimation.prototype.getCurrBrakingDistY = function () {
	return this.sY0 - this._getBrakingDist( ( this.vY-(this.vY*this.progress) ), this.aY );
};

module.exports = PhysicsAnimation;