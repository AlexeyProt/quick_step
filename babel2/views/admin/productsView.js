"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/ProgressAnimation.js');
animationScript.addScript('/js/modules/Search.js');
animationScript.addScript('/js/modules/ProductFinder.js');
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
	new Product( content );	
	
	let productFinder = new ProductFinder(content.querySelector('.searchFormContainer'));
	
	productFinder.searchDataURL = '/products/search-data';
	
	productFinder.start();
}
animationScript.callFunc(func.bind(this));