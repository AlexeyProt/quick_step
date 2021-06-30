"use strict";
/* Событие одиночного клика */
class OneClick {
	constructor(elem) {
		this._elem = elem;
		
		this.oneclickEvent = new CustomEvent('oneclick', {bubbles: true});
		
		this.addEvent();
	}
	
	/**
	 * Генерирует событие одного клика oneclick через 0,5 сек
	 */
	_clickHandler() {
		let target = event.target;
		
		if (this._timerId) clearTimeout(this._timerId);
		
		this._timerId = setTimeout(() => target.dispatchEvent(this.oneclickEvent), 500);
	}	

	/**
	 * Отменяет событие одного клика oneclick
	 */	
	_dblclickHandler() {
		if (this._timerId) clearTimeout(this._timerId);
	}
	
	addEvent() {
		this._elem.addEventListener('click', () => this._clickHandler(), false);
		this._elem.addEventListener('dblclick', () => this._dblclickHandler(), false);
	}
}