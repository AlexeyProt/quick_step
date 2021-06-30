"use strict";
class Menu {
	constructor(container) {
		this._container = container;
		
		new OneClick(container);
	}
		
	_getId(editEl) {
		for (let target = editEl; target != this._container; target = target.parentNode) {
			if (!target.dataset.categoryId) continue;
			
			return target.dataset.categoryId;
		}
	}	
		
	_oneClickHandler() {
		for (let target = event.target; target != this._container; target = target.parentNode) {
			if (target.dataset.tree == 'open' || target.dataset.tree == 'close') return;
			if (target.className != 'edit') continue;

			location.href = location.origin + '/editor/category/edit/' + this._getId(target);
			
			return;
		}
	}	
	
	_clickHandler() {
		for (let target = event.target; target != this._container; target = target.parentNode) {
			if (target.dataset.tree == 'open' || target.dataset.tree == 'close') return;
			if (target.className != 'edit') continue;			
			if (target.querySelector('.droppedCont')) continue;

			location.href = location.origin + '/editor/category/edit/' + this._getId(target);
			
			return;
		}
	}		
		
	start() {
		this._container.addEventListener('oneclick', () => this._oneClickHandler());
		this._container.addEventListener('click', () => this._clickHandler());
	}
}