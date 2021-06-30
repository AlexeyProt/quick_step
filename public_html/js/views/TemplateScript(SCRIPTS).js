/* Класс добавления скриптов в <head> */
// Скрипты загружаются по порядку из массива this.scripts
function TemplateScript (src) {
	this._elem = document.createElement('script');
	this._script = this._elem; // Последний добавленный скрипт
	this.scripts = []; // Добавленные скрипты
	
	this.addScript(src);
}
// Добавляет скрипт по относительному пути src
TemplateScript.prototype.addScript = function (src) {
	var	head = document.getElementsByTagName('head')[0];
	this._script = this._elem.cloneNode(true);
	this._script.async = false;
	this._script.src = document.location.origin+'/'+src; // Создается абсолютный путь
	this.scripts[this.scripts.length] = this._script;
	head.appendChild(this._script);
};
// Вызывает функцию для последнего добавленного скрипта
TemplateScript.prototype.callFunc = function (func) {
	this.scripts[this.scripts.length-1].onload = function () {
		func();
	};
};