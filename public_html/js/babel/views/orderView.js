"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/OrderForm.js'); // Подключение класса формы заказа
function func() {
	var content = document.querySelector('.content');
/* 	this.contentExpect = new Expectation( content );	
	new Product( content ); */
	new OrderForm( content );
}
animationScript.callFunc(func.bind(this));