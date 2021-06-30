/* Класс вкладок */
function Tabs(elem) {
	this._elem = elem;
	this._tabs = this._elem.querySelector('.tabs');
	this._activeTab = this._tabs.firstElementChild; // Элемет активной вкладки
	this._contentTab = this._elem.querySelector('[data-tab="'+this._activeTab.innerHTML+'"]'); // Элемет с контентом активной вкладки
	
	this.setActiveTab();
	this.activateTab();
}

/* Внутренние методы */

/* Внешние методы */

// Устанавливает активную вкладку
// tab элемет вкладки (необязательный аргумент)
Tabs.prototype.setActiveTab = function (tab) {
	if ( tab === undefined ) tab = this._tabs.firstElementChild; // Если аргумент tab не передан, устанавливается первый дочерний элемет элемета списка this._tabs
	this._activeTab.dataset.status = '';
	this._contentTab.style = '';
	tab.dataset.status = 'active';
	this._activeTab = tab;
	this._contentTab = this._elem.querySelector('[data-tab="'+tab.innerHTML+'"]');
	this._contentTab.style.display = 'block'; 
};
// Устанавливает обработчик события клика на вкладку
Tabs.prototype.activateTab = function () {
	var self = this;
	function activateTab (event) {
		if ( event.target.tagName != 'LI' ) return;
		self.setActiveTab(event.target);
	}
	this._tabs.addEventListener( 'click', activateTab );
}
/* Шаблон */
// [data-status="active"] устанавливается на элемете li с активной вкладкой
// [data-tab="Текст вкладки"] устанавливается на элемете с контентом. Внутри аттрибута data-tab текст вкладки, которой принадлежит контент 