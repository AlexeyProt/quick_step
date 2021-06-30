/* Класс иконок */
function IconsCategory(elem) {
	this._elem = elem;
	
	this.activAnimElems();
}

/* Внутренние методы */

// Активирует анимацию иконок при наведении мыши
IconsCategory.prototype._activIcons = function () {
	var self = this,
		currentElem = null; // Элемент внутри которого находится курсор
	function hover(event) {
		if ( currentElem ) return; // Если установлен currentElem, значит переход внутри элемента
		var target = event.target;
		while ( target != this ) { // Пока родительский элемент не станет this._elem
			if ( target.className == "icon" && target.tagName == "A" ) { // Если курсор находится внутри <a class="icon"></a> 
				var circle = target.querySelector('[data-name="anim"]');
				circle.anim = new MyAnimation(circle);
				circle.anim.setDraw(function (elem) {
					elem.attributes['fill-opacity'].value = elem.anim.generateValue(0, 1);
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
IconsCategory.prototype.activAnimElems = function () {
	this._activIcons();
};