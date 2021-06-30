"use strict";
let MyAnimation = require('../modules/MyAnimation');

/* Анимация загрузки */
class ProgressAnimation {
	constructor(container) {
		this._container = container;
		this._progressElem = document.getElementById('progress').content.children[0];
		
		this._pathElem = this._progressElem.querySelector('path');
		this._anim = new MyAnimation(this._pathElem);
	}
	/** 
	* Устанавливает функцию отрисовки анимации
	*
	* int initialStrokeDashoffset начальное значение атрибута <path stroke-dashoffset="initialStrokeDashoffset">
	* string initialRotate начальное значение атрибута <path transform="rotate(initialRotate 97 97)">
	*/
	_setAnimDraw(initialStrokeDashoffset, initialRotate) {
		let strokeDasharray = this._pathElem.attributes['stroke-dasharray'].value;
		
		this._anim.setDraw(pathElem => {
			pathElem.attributes['stroke-dashoffset'].value = this._anim.generateValue(initialStrokeDashoffset, -strokeDasharray);
			pathElem.attributes['transform'].value = `rotate(${this._anim.generateValue(initialRotate, 360)} 97 97)`;
		});		
	}
	/** 
	* Добавляет элемент загрузки и запускает его анимацию
	*/	
	start() {
		this._container.append(this._progressElem);
		
		let initialStrokeDashoffset = +this._pathElem.attributes['stroke-dasharray'].value;	
		
		this._setAnimDraw(initialStrokeDashoffset, 0);
		
		this._anim.setStopCallback(() => this._anim.interactAnimate(2000));
		
		this._anim.interactAnimate(2000);
	}
	/** 
	* Останавливает анимацию элемента загрузки и удаляет его
	*/		
	stop() {
		let initialStrokeDashoffset = +this._pathElem.attributes['stroke-dashoffset'].value;
		let strokeDasharray = this._pathElem.attributes['stroke-dasharray'].value;
		let initialRotate = this._pathElem.attributes['transform'].value.match(/\(([\d.]+) /)[1];	
		
		this._anim.setStopCallback(() => {});
		this._anim.stopAnim();
		
		this._setAnimDraw(initialStrokeDashoffset, initialRotate);
		
		this._anim.setStopCallback(() => this._progressElem.remove());
		
		this._anim.interactAnimate(200);
	}
}

module.exports = ProgressAnimation;