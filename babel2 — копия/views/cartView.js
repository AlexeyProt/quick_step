"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/CartForm.js'); // Подключение класса формы корзины
function func() {
	var content = document.querySelector('.content');
/* 	this.contentExpect = new Expectation( content );	
	new Product( content ); */
	new CartForm( content );
}
animationScript.callFunc(func.bind(this));