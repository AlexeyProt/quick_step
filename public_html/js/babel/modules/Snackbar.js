"use strict";
class Snackbar {
	constructor() {
		this._snackbar = document.getElementById('snackbar').content.children[0];

		this._anim = new MyAnimation(this._snackbar);
	}

	/** 
	* Устанавливает функцию отрисовки анимации
	*
	* int finalOpacity конечное значение opacity
	*/
	_setAnimDraw(finalOpacity) {
		let initialOpacity = +this._snackbar.style.opacity;
		
		this._snackbar.style.opacity = initialOpacity;
		
		this._anim.setDraw((snakbar) => {
			snakbar.style.opacity = this._anim.generateValue(initialOpacity, finalOpacity);
		});	
	}
	
	/** 
	* Отображает уведомление
	*
	* string text текст уведомления
	*/	
	show(text) {
		if (this._timerId) clearTimeout(this._timerId);
		
		this._snackbar.innerHTML = text;
		document.body.append(this._snackbar);
		
		this._anim.setStopCallback(() => this._timerId = setTimeout(() => this.hide(), 5000));
		
		this._setAnimDraw(1);
		this._anim.interactAnimate(1000);
	}
	
	/** 
	* Скрывает уведомление
	*/		
	hide() {
		this._anim.setStopCallback(() => this._snackbar.remove());
		this._setAnimDraw(0);
		this._anim.interactAnimate(1000);
	}
}