"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
// Подключение скрипта иконок и создания экземпляра класса
var iconsScript = new TemplateScript('/js/modules/Icons.js');
function func() {
	var content = document.querySelector('.content'),
		icons = new Icons( content );
/* 	this.contentExpect = new Expectation( content );	
	new Product( content ); */
}
iconsScript.callFunc(func.bind(this));