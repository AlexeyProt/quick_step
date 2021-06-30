/* Класс увеличения изображения */
let MyAnimation = require('../modules/MyAnimation');
let Drag = require('../events/Drag');
let TouchZoom = require('../events/TouchZoom');
let PhysicsAnimation = require('../modules/PhysicsAnimation');

function ImageShow(elem) {
	this._elem = elem;
	this._show = this._elem.querySelector('.show');
	this.imageShow = this._show.querySelector('.imageShow');
	this.imageShow.anim = {};
	this._scrollContainer = this._elem.querySelector('.scrollContainer');
	this._close = this._show.querySelector('svg[class="close"]');
	this._imageWidth = 0; // Ширина увеличенного изображения
	this._imageHeight = 0; // Высота увеличенного изображения
	this.padding = parseFloat( getComputedStyle( this.imageShow ).paddingTop ); // float padding элемента this.imageShow указаный в каскаде CSS
	
	new Drag( this.imageShow );
	new TouchZoom( this.imageShow );
	this._setAnimDrag();
	this.open();
	this.close();
	this.activAnimElems();
}

/* Внутренние методы */

// Активирует анимацию кнопки закрытия формы при наведении мыши
ImageShow.prototype._activCloseButons = function () {
	var close = this._show.querySelector('svg[class="close"]'), // Крестик
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


// Обработчик для закрытия изображения
ImageShow.prototype._closeCallback = function () {
	this._animDrag.stopAnim();
	this.imageShow.anim.show.reverseAnimate();
};

// Обработчик для увеличения изображения
// int scale - масштаб изображения
ImageShow.prototype._showCallback = function ( scale, event ) {
	// Если у элемета установлен аттрибут data-name="show"
	if ( event.target.dataset.name == 'show' ) {
		var imgCoords = event.target.getBoundingClientRect(), // Объект координат изображения
			left = imgCoords.left - this.padding, // отступ слева без padding
			top = imgCoords.top - this.padding, // отступ сверху без padding
			imageShowBackground = this._show.querySelector('#imageShowBackground');
		this._enlargedImg = event.target.cloneNode(); // Увеличенное изображение
		this._enlargedImg.dataset.name = "enlarged"; // Устанавливает data-name="enlarged"
		this._enlargedImg.style = "";
		this._enlargedImg.removeAttribute('width');
		this._enlargedImg.removeAttribute('height');
		this._enlargedImg.src = this._enlargedImg.src.replace(/mini\/|medium\//, ''); // Устанавливает src с изображением высокого разрешения
		this._show.querySelector('.container').appendChild(this._enlargedImg); // Увеличенное изображение добавляется в контейнер
		var initialWidth = imgCoords.right - imgCoords.left, // Началная ширина изображения
			initialHeight = imgCoords.bottom - imgCoords.top, // Началная высота изображения
			minClientSize = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight); // Наименьшая сторона окна браузера
		if ( initialWidth >= initialHeight ) {
			this._imageWidth = ( minClientSize - this.padding*2 ) * scale, // Конечная ширина изображения с учетом padding
			this._imageHeight = initialHeight * this._imageWidth/initialWidth;	// Конечная высота изображения с учетом padding
		}
		else {
			this._imageHeight = ( minClientSize - this.padding*2 ) * scale,
			this._imageWidth = initialWidth * this._imageHeight/initialHeight;				
		}		
		this._centerX = (document.documentElement.clientWidth / 2) - ((this.padding*2 + this._imageWidth) / 2); // Центр изображения по оси X с учетом padding
		this._centerY = (document.documentElement.clientHeight / 2) - ((this.padding*2 + this._imageHeight) / 2); // Центр изображения по оси Y с учетом padding
		this._enlargedWidth = this._imageWidth;
		var	lightRect = this._show.querySelector('rect'); // Прямоугольная область с затемнением
		this.imageShow.style.marginLeft = left + "px";
		this.imageShow.style.marginTop = top + "px";			
		this.imageShow.style.width = initialWidth + "px";
		this._scrollContainer.style.visibility = 'visible';
		// Создается событие показа изображения
		var showEvent = new CustomEvent( "show", {
			bubbles: true,
			cancelable: true,
			detail: this // Сохраняется текущий объект
		});
		showEvent.clientX = event.clientX;
		showEvent.clientY = event.clientY;
		// Если событие было отменено, возвращает false
		if (!event.target.dispatchEvent(showEvent)) return false;	
		this.imageShow.anim.show = new MyAnimation (this.imageShow);
		var self = this;
		this.imageShow.anim.show.setDraw(function (elem) {			
			if (self.imageShow.anim.show.progress == 0) {
				document.body.style.overflow = '';
				self._scrollContainer.style.visibility = '';
				self._enlargedImg.parentNode.removeChild(self._enlargedImg);		
			}
			if (self.imageShow.anim.show.progress == 1) {
				document.body.style.overflow = "hidden";				
			}			
			elem.style.marginLeft = self.imageShow.anim.show.generateValue( left, self._centerX ) + "px";
			elem.style.marginTop = self.imageShow.anim.show.generateValue( top, self._centerY ) + "px";
			elem.style.width = self.imageShow.anim.show.generateValue( initialWidth, self._imageWidth ) + "px";
			imageShowBackground.style.opacity = self.imageShow.anim.show.progress * 1;
			lightRect.attributes['fill-opacity'].value = self.imageShow.anim.show.progress * 1;				
		});
		this.imageShow.anim.show.setProgressInter(0);			
		this.imageShow.anim.show.interactAnimate(500);
	}	
};
// Возвращает float marginLeft, где marginLeft ограничен определенными пределами
// float marginLeft - исходный marginLeft
ImageShow.prototype._getRestrictMarginLeft = function (marginLeft) {
	if ( this.imageShow.clientWidth > document.documentElement.clientWidth ) {
		// Ограничевается зона перемещения левым краем изображения
		if ( marginLeft > 0 ) {
			marginLeft = 0;
		}
		// Ограничевается зона перемещения правым краем изображения
		if ( (this.imageShow.clientWidth + marginLeft) <  document.documentElement.clientWidth ) {
			marginLeft = document.documentElement.clientWidth - this.imageShow.clientWidth;
		}	
	}
	else {
		marginLeft = this._centerX;	// Изображение фиксируется относительно центра по оси X	
	}
	return marginLeft;
};
// Возвращает float marginTop, где marginTop ограничен определенными пределами
// float marginTop - исходный marginTop
ImageShow.prototype._getRestrictMarginTop = function (marginTop) {
	if ( this.imageShow.clientHeight > document.documentElement.clientHeight ) {	
		// Ограничевается зона перемещения верхним краем изображения
		if ( marginTop > 0 ) {
			marginTop = 0;
		}	
		// Ограничевается зона перемещения нижним краем изображения
		if ( (this.imageShow.clientHeight + marginTop) <  document.documentElement.clientHeight ) {
			marginTop = document.documentElement.clientHeight - this.imageShow.clientHeight;
		}
	}	
	else {
		marginTop = this._centerY; // Изображение фиксируется относительно центра по оси Y				
	}
	return marginTop;
};
// Изменяет размер изображения в мастштабе event.scale
// Устанавливает margin-left, margin-top относительно точки масштабирования
ImageShow.prototype._touchZoomHandler = function (event) {
	var scaledWidth = this._imageWidth * event.scale;
	if ( scaledWidth < this._enlargedWidth ) scaledWidth = this._enlargedWidth; // Минимальный масштаб - x1
	if ( scaledWidth > this._enlargedWidth*3 ) return; // Максимальный масштаб - x3
	this.imageShow.style.width = scaledWidth + 'px';
	var marginLeft = (document.documentElement.clientWidth / 2) - (this.imageShow.clientWidth / 2), // Центр изображения по оси X
		marginTop = (document.documentElement.clientHeight / 2) - (this.imageShow.clientHeight / 2); // Центр изображения по оси Y
	if ( this.imageShow.clientWidth > document.documentElement.clientWidth ) {
		marginLeft = event.centerX - ( (event.centerX - this._centerX) * event.scale ); // margin-left относительно точки масштабирования по оси X
		// Ограничевается зона масштабирования левым краем изображения
		if ( marginLeft > 0 ) {
			marginLeft = 0;
		}
		// Ограничевается зона масштабирования правым краем изображения
		if ( (this.imageShow.clientWidth + marginLeft) <  document.documentElement.clientWidth ) {
			marginLeft = document.documentElement.clientWidth - this.imageShow.clientWidth;
		}		
	}
	if ( this.imageShow.clientHeight > document.documentElement.clientHeight ) {
		marginTop = event.centerY - ( (event.centerY - this._centerY) * event.scale ); //  margin-top относительно точки масштабирования по оси Y
		// Ограничевается зона масштабирования верхним краем изображения
		if ( marginTop > 0 ) {
			marginTop = 0;
		}
		// Ограничевается зона масштабирования нижним краем изображения
		if ( (this.imageShow.clientHeight + marginTop) <  document.documentElement.clientHeight ) {
			marginTop = document.documentElement.clientHeight - this.imageShow.clientHeight;
		}		
	}
	this.imageShow.style.marginLeft = marginLeft + 'px';
	this.imageShow.style.marginTop = marginTop + 'px';
};

ImageShow.prototype._touchZoomEndHandler = function () {
	this._imageWidth = parseFloat(this.imageShow.style.width);
	this._imageHeight = parseFloat(this.imageShow.style.height);
	this._animDrag.stopAnim();
};

ImageShow.prototype._dragStartHandler = function () {
	this._animDrag.stopAnim();
};
// Перетаскивает изображение на расстояние event.offsetDistX, event.offsetDistY
// Устанавливает margin-left, margin-top относительно точки касания
ImageShow.prototype._dragHandler = function (event) {
	var marginLeft = this._getRestrictMarginLeft( this._centerX + event.offsetDistX ), // margin-left относительно точки касания по оси X
		marginTop = this._getRestrictMarginTop( this._centerY + event.offsetDistY ); // margin-top относительно точки касания по оси Y	
	this.imageShow.style.marginLeft = marginLeft + 'px';
	this.imageShow.style.marginTop = marginTop + 'px';	
};

/* ImageShow.prototype._dragEndHandler = function (event) {
	event.vX = 0.5;
	event.vY = 0.1;
	console.log('dragend');
	var animation = new MyAnimation(this.imageShow),
		aX = -0.001*(event.vX/Math.abs(event.vX)),
		aY = -0.001*(event.vY/Math.abs(event.vY)),
		t = Math.pow( ( Math.pow(event.vX, 2) + Math.pow(event.vY, 2) ) , 0.5 ) / Math.pow( ( Math.pow(aX, 2) + Math.pow(aY, 2) ) , 0.5 ),
		sX0 = -Math.pow(event.vX, 2)/(2*aX),
		sY0 = -Math.pow(event.vY, 2)/(2*aY);
	var self = this;
	animation.setDraw(function (elem, progress) {
		sX = -Math.pow((event.vX-(event.vX*progress)), 2)/(2*aX);
		sY = -Math.pow((event.vY-(event.vY*progress)), 2)/(2*aY);
		elem.style.marginLeft = self._centerX + (sX0 - sX) + 'px';
		elem.style.marginTop = self._centerY + (sY0 - sY) + 'px';
	});
	animation.interactAnimate(t);	
}; */

ImageShow.prototype._setAnimDrag = function () {
	this._animDrag = new PhysicsAnimation( this.imageShow );
	this._animDrag.setStopCallback(this._setMargins.bind(this));
	this._animDrag.setDraw(this._dragDraw.bind(this));	
};

ImageShow.prototype._setMargins = function () {
	this._centerX = parseFloat(this.imageShow.style.marginLeft);
	this._centerY = parseFloat(this.imageShow.style.marginTop);
};

ImageShow.prototype._dragDraw = function (elem) {
	elem.style.marginLeft = this._getRestrictMarginLeft( this._centerX + this._animDrag.getCurrBrakingDistX() ) + 'px';
	elem.style.marginTop = this._getRestrictMarginTop( this._centerY + this._animDrag.getCurrBrakingDistY() )+ 'px';	
};

ImageShow.prototype._dragEndHandler = function (event) {
/* 	event.vX = 0.5;
	event.vY = 0.1;	 */
/* 	if ( this._centerX == parseFloat(this.imageShow.style.marginLeft) ) event.vX = 0; // Если изображение не переместилось по X
	if ( this._centerY == parseFloat(this.imageShow.style.marginTop) ) event.vY = 0; // Если изображение не переместилось по Y */
	this._setMargins();
	this._animDrag.set(event.vX, event.vY, -0.001, -0.001);
	this._animDrag.interactAnimate(this._animDrag.t);
};

ImageShow.prototype._touchEndHandler = function (event) {
	console.log('touchend');
	this._imageWidth = parseFloat(this.imageShow.style.width);
	this._imageHeight = this.imageShow.clientHeight - this.padding*2;
	this._centerX = parseFloat(this.imageShow.style.marginLeft);
	this._centerY = parseFloat(this.imageShow.style.marginTop);	
/* 	if ( this._imageWidth > document.documentElement.clientWidth ) {
		this._centerX = parseFloat(this.imageShow.style.marginLeft);
		this._centerY = parseFloat(this.imageShow.style.marginTop);		
		if ( this._centerX > 0 ) {
			this.imageShow.style.marginLeft = '0px';
			this._centerX = 0;			
		}
		if ( (this._imageWidth + this._centerX) <  document.documentElement.clientWidth ) {
			this.imageShow.style.marginLeft = this._centerX + (document.documentElement.clientWidth - (this._imageWidth + this._centerX)) + 'px';
			this._centerX = this._centerX + (document.documentElement.clientWidth - (this._imageWidth + this._centerX));			
		}
		return;
	}
	this._centerX = (document.documentElement.clientWidth / 2) - ((this.padding*2 + this._imageWidth) / 2);
	this._centerY = (document.documentElement.clientHeight / 2) - ((this.padding*2 + this._imageHeight) / 2);
	this.imageShow.style.marginLeft = this._centerX + 'px';
	this.imageShow.style.marginTop = this._centerY + 'px'; */
};

/* Внешние методы */

// Устанавливает события клика на this._elem для увеличения изображения
ImageShow.prototype.open = function () {
	this._elem.addEventListener( "click", this._showCallback.bind(this, this._elem.clientWidth/this._elem.parentNode.clientWidth) ); // Устанавливается обработчик
	this.imageShow.addEventListener( "touchZoomStart", this._dragStartHandler.bind(this) );	
	this.imageShow.addEventListener( "touchZoom", this._touchZoomHandler.bind(this) );
	this.imageShow.addEventListener( "touchZoomEnd", this._touchZoomEndHandler.bind(this) );
	this.imageShow.addEventListener( "dragstart", this._dragStartHandler.bind(this) );	
	this.imageShow.addEventListener( "drag", this._dragHandler.bind(this) );	
	this.imageShow.addEventListener( "dragend", this._dragEndHandler.bind(this) );	
/* 	this.imageShow.addEventListener( "touchend", this._touchEndHandler.bind(this) ); */
};
// Устанавливает событие клика на крестик с классом close для закрытия формы 
ImageShow.prototype.close = function () {
	this._close.addEventListener('click', this._closeCallback.bind(this) );
	this._scrollContainer.querySelector('#imageShowLight').addEventListener('click', this._closeCallback.bind(this) );
};
// Активирует анимации элементов формы
ImageShow.prototype.activAnimElems = function () {
	this._activCloseButons();
};

module.exports = ImageShow;