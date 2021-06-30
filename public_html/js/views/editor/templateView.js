"use strict";
// Подключение скрипта анимации
var animationScript = new TemplateScript('/js/modules/MyAnimation.js');
animationScript.addScript('/js/modules/QuantityVidjet.js');
animationScript.addScript('/js/events/OneClick.js');
animationScript.addScript('/js/modules/Tree.js');
animationScript.addScript('/js/modules/editor/Menu.js');

function func() {
	new Tree( document.querySelector('#categories') );
	
	let menu = new Menu(document.querySelector('#categories'));
	
	menu.start();
}
animationScript.callFunc(func.bind(this));