"use strict";
/* Класс загрузки данных */
function DataLoader(elem) {
	this._dataElemsCont = elem; // Контнейнер элементов в который будут добавлены элементы с загруженными данними
	this.count = this._dataElemsCont.children.length; // Количество элементов, которые нужно добавить
	this._offset = 0; // Смещение относительно первого элемента

	this.start();
}

/* Внутренние методы */

// Добавляет новые элементы
DataLoader.prototype._appendCB = function (data) {
	var dataObjs = JSON.parse(data);
	// Если данных больше нет, то прекращает их загружать
	if (dataObjs.length == 0) {
		this._running = true;
		return;		
	}
	for ( var i = 0; i < dataObjs.length; i++ ) {
		var newElem = this._dataElemsCont.firstElementChild.cloneNode(true);
		for ( var key in dataObjs[i] ) {
			var innerElem = newElem.querySelector('[data-load-html="'+key+'"]');
			// В элементы с аттрибутом [data-load-html="key"] устанавливает html 
			if ( innerElem ) {
				innerElem.innerHTML = dataObjs[i][key];
				continue;
			}
			innerElem = newElem.querySelector('[data-load-src="'+key+'"]'); 
			// В элементы с аттрибутом [data-load-src="key"] устанавливает src 
			if ( innerElem ) {
				innerElem.src = dataObjs[i][key];
				continue;
			}	
		}		
		this._dataElemsCont.appendChild( newElem );
	}
	this._running = false;
	this.load();
};

// Выполняет ajax запрос для получения данных
DataLoader.prototype._ajax = function () {
	if ( this._running ) return;
	this._running = true;
	var formData = new FormData();
	this._offset += this.count;
	formData.set('count', this.count);
	formData.set('offset', this._offset);
	$.ajax({
		url: "/loadReviews",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this._appendCB.bind(this),
		error: function(jqxhr, status, errorMsg) {
			console.log(errorMsg);
		}
	});		
};

/* Внешние методы */

// Загружает данные, если область просмотра находится ниже последнего элемента
DataLoader.prototype.load = function () {
	if ( (window.pageYOffset+document.documentElement.clientHeight) < (this._dataElemsCont.offsetTop+this._dataElemsCont.offsetHeight) ) return;	
	this._ajax();
};

DataLoader.prototype.start = function () {
	this.load();
	window.addEventListener( 'scroll', this.load.bind(this) );
};