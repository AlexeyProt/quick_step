/* Класс иконок */
let MyAnimation = require('../modules/MyAnimation');

function Icons(elem) {
	this._elem = elem;
	
	this.activAnimElems();
}

/* Внутренние методы */

// Активирует анимацию иконок при наведении мыши
Icons.prototype._activIcons = function () {
	var self = this,
		currentElem = null; // Элемент внутри которого находится курсор
	function hover(event) {
		if ( currentElem ) return; // Если установлен currentElem, значит переход внутри элемента
		var target = event.target;
		while ( target != this ) { // Пока родительский элемент не станет this._elem
			if ( target.className == "icon" && target.tagName == "A" ) { // Если курсор находится внутри <a class="icon"></a> 
				var circle = target.querySelector('[data-name="anim"]');
				var image = target.querySelector('image');
				circle.anim = new MyAnimation();
				circle.anim.setDraw(function () {
					let translateCoord = circle.anim.progress * 6;
					circle.attributes['fill-opacity'].value = circle.anim.generateValue(0, 1);
					image.attributes['transform'].value = `scale(${circle.anim.generateValue(1, 0.9)}) translate(${translateCoord}, ${translateCoord})`
				});
				circle.anim.setProgressInter(0, 1);
				circle.anim.interactAnimate(200);
				currentElem = target; // Устанавливается текущий элемент
				// Функция обработчик событие уведения мыши с текущего элемента
				function leave() {
					circle.anim.reverseAnimate();
					currentElem = null; // Когда курсор ушел с элемента, текущий элемент обнуляется
					target.removeEventListener( 'mouseleave', leave ); // Удаляется обработчик
				}
				target.addEventListener( 'mouseleave', leave ); // Устанавливается обработчик события ухода мыши
				return;
			}
			target = target.parentNode; // Если текущий элемент не <a class="icon"></a>, то проверяется родитель
		}
	}
	this._elem.addEventListener( 'mouseover', hover );
};

/* Внешние методы */

// Активирует анимации иконок
Icons.prototype.activAnimElems = function () {
	this._activIcons();
};

module.exports = Icons;