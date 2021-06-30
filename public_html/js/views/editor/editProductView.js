// Подключение текстового редактора tinymce
var tinyConfiguratorScript = new TemplateScript('/js/modules/admin/TinyConfigurator.js');
tinyConfiguratorScript.addScript('/js/modules/Form.js');
tinyConfiguratorScript.addScript('/js/modules/Window.js');
tinyConfiguratorScript.addScript('/js/modules/Uploader.js');
tinyConfiguratorScript.addScript('/js/modules/Transliterator.js');
animationScript.addScript('/js/modules/ProgressAnimation.js');
animationScript.addScript('/js/modules/Snackbar.js');
tinyConfiguratorScript.addScript('/js/modules/editor/Editor.js'); // Подключение формы редактирования страницы
tinyConfiguratorScript.callFunc(function () {
	let editor = new Editor(document.forms.productEditor);
	
	editor.url = '/editor/product/update';
	editor.start();
});

animationScript.addScript('/js/modules/Expectation.js');
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	
}
animationScript.callFunc(func.bind(this));