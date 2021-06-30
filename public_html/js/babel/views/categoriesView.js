"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/Slider.js');
// Подключение скрипта иконок и создания экземпляра класса
var iconsScript = new TemplateScript('/js/modules/IconsCategory.js');
function func() {
	var content = document.querySelector('.content'),
		icons = new IconsCategory( content );
/* 	this.contentExpect = new Expectation( content );	
	new Product( content ); */
	
	new Slider(document.getElementById('slider'));
}
iconsScript.callFunc(func.bind(this));