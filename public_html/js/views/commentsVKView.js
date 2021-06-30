"use strict";
animationScript.addScript('/js/modules/DataLoader.js'); // Подключение класса постраничной навигации
function func() {
	new DataLoader( document.querySelector('.comments') );
}
animationScript.callFunc(func.bind(this));