"use strict";
/* Класс диалогового окна плагина товара */
function DialogProduct(elem) {
	this._elem = elem;
	
	this.start();
}

/* Внутренние методы */

// Вставляет в редактор информацию о товаре
DialogProduct.prototype._insertDataCB = function (event) {
	var insertElem = event.target;
	while ( insertElem != this._elem ) {	
		if ( insertElem.className == 'productData' ) {
			insertElem = insertElem.cloneNode(true);
			window.parent.postMessage({
				mceAction: 'insertContent',
				content: insertElem.outerHTML
			});	
			window.parent.postMessage({
				mceAction: 'close'
			});		
			console.log(insertElem);	
			return;
		}
		insertElem = insertElem.parentNode;
	}	

};

/* Внешние методы */

DialogProduct.prototype.start = function () {
	this._elem.addEventListener( 'click', this._insertDataCB.bind(this) );	
}