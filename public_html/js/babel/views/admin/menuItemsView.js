"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/admin/Sorter.js');
animationScript.addScript('/js/modules/Form.js');
animationScript.addScript('/js/modules/Window.js');
animationScript.addScript('/js/modules/Tabs.js');
animationScript.addScript('/js/modules/ProgressAnimation.js');
animationScript.addScript('/js/modules/Search.js');
animationScript.addScript('/js/modules/admin/PageFinder.js');
animationScript.addScript('/js/modules/ConfirmationWindow.js');
animationScript.addScript('/js/modules/Pagination.js');
animationScript.addScript('/js/modules/admin/MenuItemEditWindow.js');
animationScript.addScript('/js/modules/Snackbar.js');
animationScript.addScript('/js/modules/admin/MenuItemEditor.js');

function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
	new Product( content );	
	new Tree( content.querySelector('#menuEditor') );
	
	let menuItemEditor = new MenuItemEditor( content.querySelector('#menuEditor') );
		
	menuItemEditor.start();
}
animationScript.callFunc(func.bind(this));