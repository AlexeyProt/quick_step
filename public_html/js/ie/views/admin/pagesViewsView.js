"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/Snackbar.js');
animationScript.addScript('/js/modules/State.js');
animationScript.addScript('/js/modules/admin/PagesViewer.js');
animationScript.addScript('/js/modules/ProgressAnimation.js');
animationScript.addScript('/js/modules/Pagination.js');
animationScript.addScript('/js/modules/SortingOrder.js');
animationScript.addScript('/js/modules/SortingIndicator.js');
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
	new Product( content );	
	
	let state = new State();
	state.start();
	
	let pagesViewer = new PagesViewer(content);
	pagesViewer.start();
}
animationScript.callFunc(func.bind(this));