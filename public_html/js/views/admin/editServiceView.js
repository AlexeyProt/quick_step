﻿animationScript.addScript('/js/modules/Form.js');
animationScript.addScript('/js/modules/Window.js');
animationScript.addScript('/js/modules/ProgressAnimation.js');
animationScript.addScript('/js/modules/Snackbar.js');
animationScript.addScript('/js/modules/admin/ServiceEditor.js'); // Подключение формы редактирования страницы
animationScript.callFunc(function () {
	var serviceEditor = new ServiceEditor(document.forms.serviceEditor);
	serviceEditor.start();
});

animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
	new Product( content );	
}
animationScript.callFunc(func.bind(this));