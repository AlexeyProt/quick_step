/* Класс увеличения изображения */
function ImageZoom(elem) {
	ImageShow.apply(this, arguments);	
	
	this.zoom();
}
// Наследуюет класс ImageShow
ImageZoom.prototype = Object.create(ImageShow.prototype);
ImageZoom.prototype.constructor = ImageZoom;

/* Внутренние методы */

// Обработчик события приближения
ImageZoom.prototype._eventZoomIn = function (self, event) {
	// Создается событие приближения изображения
	var zoomInEvent = new CustomEvent( "zoomIn", {
		bubbles: true,
		cancelable: true
	});
	// Если событие было отменено, возвращает false
	if (!event.target.dispatchEvent(zoomInEvent)) return false;	
	if ( self._enlargedImg.style.cursor == 'zoom-in' ) {
		self._enlargedImg.style.cursor = 'zoom-out';
		// Если анимация удаления изображения запущена
		if ( self.imageShow.anim.zoom !== undefined && self.imageShow.anim.zoom.progress != 0 ) {
			self.imageShow.anim.zoom.cancelReverse(); // Отменяется анимация удаления	
			return;
		}		
		var initialWidth = self._imageWidth,
			initialHeight = self._imageHeight,
			initialPadding = self.padding,
			initialCenterX = self._centerX,
			initialCenterY = self._centerY,
			img = new Image();
		img.src = event.target.src;			
		self._imageWidth = img.width;
		self._imageHeight = img.height;
		self.padding = ( initialPadding / initialWidth ) * self._imageWidth;
		var scrollCenterX = ( ( event.clientX - initialCenterX ) / initialWidth ) * self._imageWidth,
			scrollCenterY = ( ( event.clientY - initialCenterY ) / initialHeight ) * self._imageHeight;
		scrollCenterX = scrollCenterX - ( document.documentElement.clientWidth / 2 ) - ( self.padding * 2 );
		scrollCenterY = scrollCenterY - ( document.documentElement.clientHeight / 2 ) - ( self.padding * 2 );
		self._close.style.display = 'none';
		self.imageShow.anim.zoom = new MyAnimation(self.imageShow);
		self.imageShow.anim.zoom.setDraw(function (elem) {
			if (self.imageShow.anim.zoom.progress == 0) {					
				self._close.style.display = '';
				self._imageWidth = initialWidth;
				self._imageHeight = initialHeight;
				self.padding = initialPadding;
			}				
			elem.style.width = self.imageShow.anim.zoom.generateValue( initialWidth, self._imageWidth ) + "px";
			elem.style.marginLeft = self.imageShow.anim.zoom.generateValue( initialCenterX, 0 ) + "px";
			elem.style.marginTop = self.imageShow.anim.zoom.generateValue( initialCenterY, 0 ) + "px";
			elem.style.padding = self.imageShow.anim.zoom.generateValue( initialPadding, 0 ) + "px";
			self._scrollContainer.scrollLeft =  self.imageShow.anim.zoom.progress * scrollCenterX;
			self._scrollContainer.scrollTop = self.imageShow.anim.zoom.progress * scrollCenterY;				
		});
		self.imageShow.anim.zoom.setProgressInter(0, 1);
		self.imageShow.anim.zoom.interactAnimate(500);		
	}
};
// Обработчик события удаления изображения
ImageZoom.prototype._eventZoomOut = function (self, event) {
	if ( self._enlargedImg.style.cursor == 'zoom-out' ) {
		event.preventDefault(); // Отменяет событие приближения
		self._enlargedImg.style.cursor = 'zoom-in';
		self.imageShow.anim.zoom.reverseAnimate();
	}
};

/* Внешние методы */

// Устанавливает событие приближения изображения для установки событий зума 
ImageZoom.prototype.zoom = function () {
	// Устанавливает обработчики событий зума
	function addEventsZoom(event) {
		var self = event.detail;
		self._enlargedImg.style.cursor = 'zoom-in';
		self._enlargedImg.addEventListener('click', self._eventZoomIn.bind(null, self));
		self._enlargedImg.addEventListener('zoomIn', self._eventZoomOut.bind(null, self));
	}
	this._elem.addEventListener("show", addEventsZoom); // Устанавливается обработчик			
};