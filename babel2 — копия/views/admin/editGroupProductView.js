// Подключение текстового редактора tinymce
var tinyConfiguratorScript = new TemplateScript('/js/modules/admin/TinyConfigurator.js');
tinyConfiguratorScript.addScript('/js/modules/Form.js');
tinyConfiguratorScript.addScript('/js/modules/Window.js');
tinyConfiguratorScript.addScript('/js/modules/Uploader.js');
tinyConfiguratorScript.addScript('/js/modules/Transliterator.js');
tinyConfiguratorScript.addScript('/js/modules/admin/ProductEditor.js'); // Подключение формы редактирования товара
tinyConfiguratorScript.addScript('/js/modules/admin/GroupProductEditor.js'); // Подключение формы редактирования товара группы
tinyConfiguratorScript.callFunc(function () {
	var groupProductEditor = new GroupProductEditor(document.forms.groupProductEditor);
	groupProductEditor.start();
});

animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
	new Product( content );	
}
animationScript.callFunc(func.bind(this));