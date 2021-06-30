"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/events/Drag.js'); // Подключение класса перетаскивания элемента
animationScript.addScript('/js/events/TouchZoom.js'); // Подключение класса TouchZoom
animationScript.addScript('/js/modules/PhysicsAnimation.js'); // Подключение класса анимации физики
animationScript.addScript('/js/modules/ImageShow.js'); // Подключение скрипта просмотра изображений 
animationScript.addScript('/js/modules/PacksCalculator.js'); // Подключение скрипта калькулятора упаковок
function func () {
	var content = document.querySelector('.content'),
		imageShow = new ImageShow( content ),
		packsCalculator = new PacksCalculator(content);
		
	packsCalculator.start();
		
/* 	this.contentExpect = new Expectation( content );	
	new Product( content ); */
}
animationScript.callFunc(func.bind(this));