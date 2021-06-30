/* Класс вертикального меню */
function MenuVert() {
	this._vertMenus = document.querySelectorAll('ul[class="vertMenu"]');
	
	this.test();
}

/* Внутренние методы */


/* Внешние методы */

MenuVert.prototype.test = function () {
	for ( var i = 0; i < this._vertMenus.length; i++ ) {
		var vertMenu = this._vertMenus[i];
		vertMenu.onmouseover = function(event) {
			if ( event.target.tagName == 'A' ) {
				console.log(event.target.parentNode);
			}
		};
	}
};