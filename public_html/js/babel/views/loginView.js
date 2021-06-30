"use strict";
// Подключение скрипта авторизации и его родительских классов
var authScript = new TemplateScript('/js/modules/Form.js');
authScript.addScript('/js/modules/Auth.js');
authScript.callFunc(function () {
	var auth = new Auth( document.getElementById('auth') );
});
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
	new Product( content );	
}
animationScript.callFunc(func.bind(this));