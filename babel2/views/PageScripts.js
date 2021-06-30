/* Класс добавления скриптов в <head> */
function PageScripts () {
	this._elem = document.createElement('script');
	this._elem.async = false;
	this._script = this._elem; // Последний добавленный скрипт
}
// Добавляет скрипт по относительному пути src
PageScripts.prototype.addScript = function (src) {
	var	head = document.getElementsByTagName('head')[0];
	this._script = this._elem.cloneNode(true);
	this._script.src = document.location.origin+'/'+src; // Создается абсолютный путь
	head.appendChild(this._script);
};
// Вызывает функцию для последнего добавленного скрипта
PageScripts.prototype.callFunc = function (func) {
	this._script.onload = function () {
		func();
	};
};