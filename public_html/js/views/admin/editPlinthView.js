// Подключение текстового редактора tinymce
var tinyConfiguratorScript = new TemplateScript('/js/modules/admin/TinyConfigurator.js');
tinyConfiguratorScript.addScript('/js/modules/Form.js');
tinyConfiguratorScript.addScript('/js/modules/Window.js');
tinyConfiguratorScript.addScript('/js/modules/Uploader.js');
tinyConfiguratorScript.addScript('/js/modules/Transliterator.js');
tinyConfiguratorScript.addScript('/js/modules/admin/ProductEditor.js'); // Подключение формы редактирования страницы
tinyConfiguratorScript.callFunc(function () {
	var productEditor = new ProductEditor(document.forms.productEditor);
	
	productEditor.model.url.updatePublication = '/admin/plinth/update';
	productEditor.model.url.create = '/admin/plinth/create';
	productEditor.model.url.edit = '/admin/plinth/edit/';
	productEditor.model.url.publish = '/admin/plinth/store';
	console.log(productEditor.model);
	productEditor.start();
});

animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/Product.js'); // Подключение класса загрузки товара
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
	new Product( content );	
}
animationScript.callFunc(func.bind(this));