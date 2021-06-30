/* Класс формы автроризации */
function ImageTest(elem) {
	this._elem = elem;
	this.galleries = this._elem.querySelectorAll('[data-modul="gallery"]');
	this.padding = 2;
	
	this._addResizeListener();
	this.start();
}


/* Внутренние методы */

ImageTest.prototype._addResizeListener = function () {
	window.addEventListener( 'optimizedResize', this.start.bind(this) );
};

/* Внешние методы */

ImageTest.prototype.position = function ( container ) {
	container.style.position = 'relative';
	container.style.width = '';
	container.parentNode.style.position = 'absolute'; // Устанавливается, чтобы ширина установилась без учета дочерних элнментов
	container.parentNode.style.display = 'block'; // Устанавливается, чтобы ширина установилась без учета дочерних элнментов
	var imgWidth = 470,
		parentWidthBox = container.parentNode.clientWidth - parseFloat( getComputedStyle( container.parentNode ).paddingLeft )*2;
	if ( imgWidth > parentWidthBox ) imgWidth = parentWidthBox - this.padding*4;		
	var colsCount = parseInt(container.clientWidth/imgWidth); // Количество столбцов
	if ( colsCount > container.children.length ) colsCount = container.children.length; // Если столбцов больше чем изображений
	container.parentNode.style.position = '';
	container.parentNode.style.display = '';
	container.style.width = (imgWidth+this.padding*2) * colsCount + this.padding*2 + 'px';
	// Если у галлереи есть заголовок
	if ( container.previousElementSibling.dataset.gallery == 'text' ) {
		container.previousElementSibling.style.width = container.style.width;
	}	
	var imgLeft = this.padding,
		imgTop = this.padding;
	for ( var i = 0; i < container.children.length; i++ ) {
		container.children[i].style.position = 'absolute';
		container.children[i].style.width = imgWidth + 'px';
		container.children[i].dataset.name = 'show';
		// Если отступ left у элемента img превышает ширину родительского элемента
		if ( imgLeft >= (container.clientWidth - this.padding*2) ) {
			imgLeft = this.padding;
		}		
		var prev = container.children[i]; // Предыдущий элемент img
		// Устанавливается отступ top для нижнего элемента img относительно img расположенного над ним
		for ( var count = 0; count < colsCount; count++ ) {
			if ( prev !== null ) {
				prev = prev.previousElementSibling;
				if ( prev !== null ) {
					if ( count == colsCount-1 ) {
						imgTop = prev.offsetTop + prev.clientHeight;
					}					
				}
			}			
		}
		container.children[i].style.top = imgTop + 'px';
		container.children[i].style.left = imgLeft + 'px';
		imgLeft += container.children[i].clientWidth;
	}
	var	heights = []; // array высоты для родительского элемента
	// Добавляются высоты относительно последнего ряда элементов img
	for ( var length = 1; length <= colsCount; length++ ) {
		if ( container.children.length < length ) break;
		heights[length-1] = container.children[container.children.length-length].offsetTop + container.children[container.children.length-length].clientHeight;
	}
	container.style.height = Math.max.apply(null, heights) + this.padding + 'px';	// Устанавливается наибольшая из высот
};

ImageTest.prototype.start = function () {
	for ( var i = 0; i < this.galleries.length; i++ ) {
		this.position(this.galleries[i]);
	}
};