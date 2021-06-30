/* Класс для работы с <input type="file"> */
function Uploader(elem) {
	this._elem = elem;
	this._input = document.createElement('input'); // Элемент input
	this._input.type = 'file';
	this._input.accept = '';
	
	this._addElemClickListner();
}

/* Внутренние методы */

// Если передан элемент, то на него добавляется слушатель события клика и обработчик открывающий окно загрузки файла
Uploader.prototype._addElemClickListner = function () {
	if ( this._elem ) this._elem.addEventListener( 'click', this.open.bind(this) );
};

/* Внешние методы */

// Открывает окно загрузки файла
Uploader.prototype.open = function () {
	this._input.click();
};
// Устанавливает обработчик события изменния input
Uploader.prototype.setHandler = function ( handler ) {
	this._input.addEventListener('change', handler);
};
// Устанавливает атрибут accept
// string accept 
Uploader.prototype.setAccept = function ( accept ) {
	this._input.accept = accept;
};
// Устанавливает атрибут multiple
Uploader.prototype.multiple = function () {
	this._input.multiple = 'multiple';
};
// Возвращает выбранные файлы
Uploader.prototype.getFiles = function () {
	return this._input.files;
};