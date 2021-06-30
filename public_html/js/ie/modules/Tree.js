"use strict";
/* Класс древовидного меню */
function Tree(elem) {
	this._elem = elem;
	
	this.start();
}

/* Внутренние методы */

Tree.prototype._clickHandler = function (event) {
	for (let target = event.target; target != this._elem; target = target.parentNode) {
		if (target.dataset.tree == 'open') {
			target.dispatchEvent(new CustomEvent('open', {bubbles: true}));
			return;
		}
		if (target.dataset.tree == 'close') {
			target.dispatchEvent(new CustomEvent('close', {bubbles: true}));
			return;
		} 		
	}
};

Tree.prototype._openListCB = function (event) {		
	event.target.dataset.tree = 'close';
	event.target.innerHTML = '-';
	event.target.parentNode.dataset.tree = 'dropped out'

	let list = event.target.parentNode.querySelector('ul');
	
	list.anim = new MyAnimation(list);

	let initialHeight = list.offsetHeight;
	
	list.style = '';	
	list.style.display = 'block';	
	list.style.overflow = 'hidden';
	
	let finalHeight = list.offsetHeight;
	
	list.style.height = initialHeight + 'px';
	list.anim.setDraw(this._dropDraw.bind(this, list, initialHeight, finalHeight));
	list.anim.setStopCallback(function () {
		list.style.height = 'inherit';
		list.style.overflow = '';
	});
	list.anim.interactAnimate(200);
};

Tree.prototype._closeListCB = function (event) {
	event.target.dataset.tree = 'open';		
	event.target.innerHTML = '+';
	delete event.target.parentNode.dataset.tree;
	
	let list = event.target.parentNode.querySelector('ul');
	let	initialHeight = list.offsetHeight;
	
	list.style.overflow = 'hidden';
	
	list.anim = new MyAnimation(list);
	list.anim.setDraw(this._dropDraw.bind(this, list, initialHeight, 0));
	list.anim.setStopCallback(function () {
		list.style.display = '';
		list.style.overflow = '';
	});	
	list.anim.interactAnimate(200);
};

Tree.prototype._dropDraw = function (elem, initialHeight, finalHeight) {
	elem.style.height = elem.anim.generateValue(initialHeight, finalHeight) + 'px';
};

/* Внешние методы */

Tree.prototype.start = function () {
	this._elem.addEventListener('click', this._clickHandler.bind(this));	
	this._elem.addEventListener('open', this._openListCB.bind(this));
	this._elem.addEventListener('close', this._closeListCB.bind(this));	
};