// Подключение текстового редактора tinymce
var tinyConfiguratorScript = new TemplateScript('/js/modules/admin/TinyConfigurator.js');
tinyConfiguratorScript.addScript('/js/modules/Form.js');
tinyConfiguratorScript.addScript('/js/modules/Window.js');
tinyConfiguratorScript.addScript('/js/modules/ConfirmationWindow.js');
tinyConfiguratorScript.addScript('/js/modules/editor/ChangePricesWindow.js');
tinyConfiguratorScript.addScript('/js/modules/Uploader.js');
tinyConfiguratorScript.addScript('/js/modules/Transliterator.js');
animationScript.addScript('/js/modules/ProgressAnimation.js');
animationScript.addScript('/js/modules/Snackbar.js');
tinyConfiguratorScript.addScript('/js/modules/Checkbox.js');
tinyConfiguratorScript.addScript('/js/modules/FieldMask.js');
tinyConfiguratorScript.addScript('/js/modules/editor/DataEditor.js');
tinyConfiguratorScript.addScript('/js/modules/editor/Editor.js');
tinyConfiguratorScript.addScript('/js/modules/Search.js');
tinyConfiguratorScript.addScript('/js/modules/editor/ProductFinder.js');
tinyConfiguratorScript.addScript('/js/modules/editor/CategoryEditor.js');
tinyConfiguratorScript.callFunc(function () {
	let categoryEditor = new CategoryEditor(document.querySelector('.content'));
	
	categoryEditor.start();
});

animationScript.addScript('/js/modules/Expectation.js');
function func() {
	var content = document.querySelector('.content');
	this.contentExpect = new Expectation( content );	;	
}
animationScript.callFunc(func.bind(this));