/* Класс горизонтального меню */
function MenuHor() {
	this._horMenus = document.querySelectorAll('ul[class="horMenu"]'); // Горизонтальные меню
	
	this.slideDown();
}

/* Внутренние методы */


/* Внешние методы */

// Активирует анимацию выпадания пунктов меню
MenuHor.prototype.slideDown = function () {
	var bottomRectHeight = +document.querySelector('rect[id="bottom"]').attributes['height'].value; // Высота SVG элемета нижнего прямоугольника
	for ( var i = 0; i < this._horMenus.length; i++ ) {
		var horMenu = this._horMenus[i];
		// Устанавливается событие наведения мыши на меню 
		horMenu.onmouseover = function(event) {
			// Если элемент является ссылкой 
			if ( event.target.tagName == 'A' ) {
				var subMenu = event.target.parentNode.querySelector('.subMenu');
				// Если элемент имеет подменю subMenu с неустановленной высотой,
				// то создается анимация выпадания подменю
				if ( subMenu && !subMenu.offsetHeight) {
					subMenu.style = '';
					subMenu.style.display = 'block';
					subMenu.anim = new MyAnimation( subMenu );
					var height = subMenu.offsetHeight,
						use = subMenu.querySelector('use[href="#bottom"]');
					subMenu.style.height = '0';
					subMenu.style.visibility = 'visible';			
					subMenu.anim.setDraw(function (elem) {
						elem.style.height = subMenu.anim.progress * height+'px';
						use.attributes['y'].value = subMenu.anim.progress * height - bottomRectHeight;
						switch( elem.style.height ) {
							case '0px':
								elem.style = '';
						}
					});
					subMenu.anim.setProgressInter(0);
					// Функция обработчик событие уведения мыши с родительского пункта меню
					function slideUp(event) {
					subMenu.anim.reverseAnimate(); // Запускает анимацию сворачивания подменю
						event.target.removeEventListener("mouseleave", slideUp); // Удаляется обработчик
					};
					// Устанавливается событие уведения мыши с родительского пункта меню
					event.target.parentNode.addEventListener("mouseleave", slideUp);
					subMenu.anim.interactAnimate(200);	// Запускается анимация
				}	
			}
		};
	}
};

module.exports = MenuHor;