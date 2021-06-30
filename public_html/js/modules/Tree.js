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
/**
 * Открывает или закрывает подпункты
*/
Tree.prototype._dblclickHandler = function (event) {
	for (let target = event.target; target != this._elem; target = target.parentNode) {
		if (target.nodeName != 'LI') continue;
		
		if (target.dataset.tree == 'dropped out') {
			let closeEl = target.querySelector('[data-tree="close"]');
			
			if (closeEl) closeEl.dispatchEvent(new CustomEvent('close', {bubbles: true}));
			
			return;			
		}

		let openEl = target.querySelector('[data-tree="open"]');
		
		if (openEl) openEl.dispatchEvent(new CustomEvent('open', {bubbles: true}));
		
		return;		
	}
};

Tree.prototype._getParentEl = function (childEl, className) {
	for (let target = childEl; target != this._elem; target = target.parentNode) {
		if (target.className != className) continue;
		
		return target;
	}
};

Tree.prototype._openListCB = function (event) {			
	event.target.dataset.tree = 'close';
	event.target.innerHTML = '-';
	this._getParentEl(event.target, 'edit').dataset.tree = 'dropped out';

	let list = this._getParentEl(event.target, 'edit').querySelector('ul');
	
	list.anim = new MyAnimation(list);
	
	list.style.display = 'none';	
	
	let initialHeight = list.offsetHeight;

	list.style = '';	
	list.style.display = 'block';	
	list.style.overflow = 'hidden';
	
	let finalHeight = list.offsetHeight;
	
	list.style.height = initialHeight + 'px';
	list.anim.setDraw(this._dropDraw.bind(this, list, initialHeight, finalHeight));
	list.anim.setStopCallback(() => {
		list.style.height = 'inherit';
		list.style.overflow = '';
		
	});
	list.anim.interactAnimate(200);
};

Tree.prototype._closeListCB = function (event) {
	let list = this._getParentEl(event.target, 'edit').querySelector('ul');
	let	initialHeight = list.offsetHeight;	
	
	event.target.dataset.tree = 'open';		
	event.target.innerHTML = '+';
	delete this._getParentEl(event.target, 'edit').dataset.tree;
	
	list.style.display = 'block';	
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
	this._elem.addEventListener('dblclick', this._dblclickHandler.bind(this));
	this._elem.addEventListener('open', this._openListCB.bind(this));
	this._elem.addEventListener('close', this._closeListCB.bind(this));	
};