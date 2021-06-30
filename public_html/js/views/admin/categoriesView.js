"use strict";
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
animationScript.addScript('/js/modules/admin/TinyConfigurator.js');
animationScript.addScript('/js/modules/admin/Sorter.js');
animationScript.addScript('/js/modules/Form.js');
animationScript.addScript('/js/modules/Window.js');
animationScript.addScript('/js/modules/Uploader.js');
animationScript.addScript('/js/modules/admin/ProductEditor.js');
animationScript.addScript('/js/modules/admin/CategoryEditor.js');
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
	new Product( content );	
	new Tree( content.querySelector('#categories') );
	
	let sorter = new Sorter( content.querySelector('#categories') ),
		categoryEditor = new CategoryEditor( content.querySelector('form') );
		
	sorter.start();
	categoryEditor.start();
}
animationScript.callFunc(func.bind(this));