"use strict";
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
/* Класс добавления скриптов в <head> */
// Скрипты загружаются по порядку из массива this.scripts
function TemplateScript (src) {
	this._elem = document.createElement('script');
	this._script = this._elem; // Последний добавленный скрипт
	
	this.addScript(src);
}
// Добавляет скрипт по относительному пути src
TemplateScript.prototype.addScript = function (src) {
	if ( src[0] == '/' ) src = document.location.origin + src;
	var	head = document.getElementsByTagName('head')[0];
	this._script = this._elem.cloneNode(true);
	this._script.async = false;
	this._script.src = src; // Создается абсолютный путь
	head.appendChild(this._script);
};
// Вызывает функцию для последнего добавленного скрипта
TemplateScript.prototype.callFunc = function (func) {
	this._script.onload = function () {
		func();
	};
};