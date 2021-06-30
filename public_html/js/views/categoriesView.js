"use strict";
/* animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/Slider.js');
// Подключение скрипта иконок и создания экземпляра класса
var iconsScript = new TemplateScript('/js/modules/IconsCategory.js');
function func() {
	var content = document.querySelector('.content'),
		icons = new IconsCategory( content );

	
	new Slider(document.getElementById('slider'));
}
iconsScript.callFunc(func.bind(this)); */
let content = document.querySelector('.content');
let filterEl = content.querySelector('.filter');

new IconsCategory( content.querySelector('.productsList') );
new ImageShow(content);
new Icons(filterEl);
new Tree( filterEl );
let state = new State();
let filter = new Filter( filterEl );

filter.start();
state.start();