"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/ImageTest.js'); 
animationScript.addScript('/js/events/Drag.js'); // Подключение класса перетаскивания элемента
animationScript.addScript('/js/events/TouchZoom.js'); // Подключение класса TouchZoom
animationScript.addScript('/js/modules/PhysicsAnimation.js'); // Подключение класса анимации физики
animationScript.addScript('/js/modules/ImageShow.js'); // Подключение родительского класса просмотра изображений
function func() {
	var content = document.querySelector('.content'),
		imageShow = new ImageShow( content );
/* 	this.contentExpect = new Expectation( content );	
	new Product( content ); */
	new ImageTest( content );	
}
animationScript.callFunc(func.bind(this));