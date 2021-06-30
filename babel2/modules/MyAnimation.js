/* Класс анимации */
function MyAnimation (elem) {
	this._elem = elem;
}
// Временная функция (вычисляет по текущему времини состояние анимации)
MyAnimation.prototype._timing = function (timeFraction) {
	return timeFraction;
};
// Callback - срабатывает после остановки анимации
MyAnimation.prototype._stopCallback = function () {};
// Возвращает true если значение this.progress достигнуто максимального или минимального значения
MyAnimation.prototype._progressInter = function () {
	// Если достигнуто минимальное значение, то запускает функцию this._draw(this.progress) и возвращает true
	if ( this.progress < this.progStart ) {
		this.progress = this.progStart;
		this._draw(this.progress);
		this._stopCallback();
		return true;
	}
	// Если достигнуто максимальное значение, то запускает функцию this._draw(this.progress) и возвращает true	
	if ( this.progress > this.progEnd ) {
		this.progress = this.progEnd;
		this._draw(this.progress);
		this._stopCallback();
		return true;		
	}
};
// Запускает анимацию продолжительностью в duration
MyAnimation.prototype.animate = function (duration) {
	var self = this,
	start = performance.now();
	requestAnimationFrame(function animate(time) {
		var timeFraction = (time - start)/duration;
		if (timeFraction > 1) {
			timeFraction = 1;
		}
		if (timeFraction >= 0) {
			self.progress = self._timing(timeFraction);
			self._draw(self.progress);
		}
		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}
	});	
};
// Функция отрисовки анимации
MyAnimation.prototype.animation = function (time) {
	this.timeFraction = (time - this.start)/this._duration;
	if ( this.timeFraction > 1 ) this.timeFraction = 1;	
	if (this.timeFraction >= 0) {
		this.progress = this._timing(this.timeFraction);
		// Если достигнуто предельное значение прогресса, то анимациия остонавливается
		if ( this._progressInter() ) return;
		this._draw(this.progress);
	}	
	if ( this.timeFraction < 1 ) this._requestId = requestAnimationFrame(this.animation.bind(this));
	else this._stopCallback();
};
// Запускает анимацию продолжительностью в duration с возможностью взаимодействия с анимацией
MyAnimation.prototype.interactAnimate = function (duration) {
	this.start = performance.now();
	this._duration = duration;
	this._requestId = requestAnimationFrame(this.animation.bind(this));		
};
// Устанавливает callback функцию для остановки анимации
MyAnimation.prototype.setStopCallback = function (func) {
	this._stopCallback = func;
};
// Устанавливает минимальное и максимальное значение this.progress
MyAnimation.prototype.setProgressInter = function (start, end) {
	this.progStart = start;
	this.progEnd = end;
};
// Останавливает анимацию и запускает callback функцию
MyAnimation.prototype.stopAnim = function () {
	cancelAnimationFrame(this._requestId);
	this._stopCallback();
};
// Устанавливает функцию _draw(), которая анимирует свойства elem по состоянию завершенности progress
// Пример _draw(): function(elem, progress) {elem.свойство = progress*числовое_значение_свойства}
MyAnimation.prototype.setDraw = function (func) {
	this._draw = function () {
		func(this._elem, this.progress);
	};
};
// Устанавливает временную функцию _timing
MyAnimation.prototype.setTiming = function (func) {
	this._timing = function (timeFraction) {
		return func(timeFraction);
	};
};
// Устанавливает временную функцию _timing и округляет ее возвращаемое значение до 6-и знаков после запятой
MyAnimation.prototype.setRoundTiming = function (func) {
	this._timing = function (timeFraction) {
		if (timeFraction < 0) timeFraction = 0;
		return Math.round(  1e6 * func(timeFraction) ) / 1e6;
	};		
};
// Устанавливает обратную временную функцию
MyAnimation.prototype.setReverseTiming = function (func) {
	var progress = this.progress;
	this.start = performance.now();
	this._timing = function (timeFraction) {
		return progress - func(timeFraction);
	};
};
// Запускает обратную анимацию
MyAnimation.prototype.reverseAnimate = function () {
	var progress = this.progress;
	if ( this._initialTiming === undefined ) this._initialTiming = this._timing; // this._initialTiming Исходная временная функция
	this.start = performance.now();
	this._timing = function (timeFraction) {
		return progress - this._initialTiming(timeFraction);
	};	
	requestAnimationFrame(this.animation.bind(this));
};
// Отменяет обратную анимацию
MyAnimation.prototype.cancelReverse = function () {
	if ( this._initialTiming === undefined ) return;
	var progress = this.progress;
	this.start = performance.now();
	this._timing = function (timeFraction) {
		return progress + this._initialTiming(timeFraction);
	};
};
// Генерирует и возвращает значение в текущий момент анимации this.progress по начальному значению initialValue и конечноему finalValue 
MyAnimation.prototype.generateValue = function (initialValue, finalValue) {
	return initialValue - this.progress * ( initialValue - finalValue );
};
// Возвращает массив цвета RGB в 10-ой системе счисления вида [ 255, 255, 255 ] по HEX вида '#ffffff'
MyAnimation.prototype.rgb10 = function (hex) {
	return [
		parseInt( hex.slice(1, 3), 16 ),
		parseInt( hex.slice(3, 5), 16 ),
		parseInt( hex.slice(5, 7), 16 )
	];
};
// Генерирует и возвращает цвет в текущий момент анимации this.progress
// по начальному значению цвета initialColor и конечноему finalColor
// initialColor, finalColor - массивы RGB вида [ 255, 255, 255 ]
MyAnimation.prototype.generateColor = function (initialColor, finalColor) {
	var rgb16 = [];
	for ( var i = 0; i < initialColor.length; i++ ) {
		rgb16[i] = this.generateValue(initialColor[i], finalColor[i]);
		rgb16[i] = parseInt( rgb16[i], 10 ).toString(16);
		if ( rgb16[i].length == 1 ) {
			rgb16[i] = '0'+rgb16[i];
		}
	}
	rgb16 = '#'+rgb16[0]+rgb16[1]+rgb16[2];
	return rgb16;
};
// Возвращает анимируемый элемент _elem
MyAnimation.prototype.getElem = function () {
	return this._elem;
};

module.exports = MyAnimation;