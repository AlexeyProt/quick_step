"use strict";
/* Класс сортировки элементов */
function Sorter(elem) {
	this._elem = elem;
	this._currentTarget = null;
	
	/** 
	* Перетаскиваемый элемент, двигующийся за курсором
	*/
	this._movableElem = null;
	
	/**
	* Элемент ссылки. Target события mousedown
	*
	* @var null|node
	*/
	this._linkTarget = null;
	/**
	* Если движение мыши произошло на элементе this._linkTarget, то true
	*
	* @var boolean
	*/	
	this._isMouseMoveOnLink = false
}

/* Внутренние методы */

Sorter.prototype._setCurrentTarget = function (target, clientX, clientY) {
	this._currentTarget = target;		
	this._movableElem = this._currentTarget.cloneNode(true);	
	
	this._movableElem.style.position = 'fixed';
	this._movableElem.style.zIndex = 1;
	this._movableElem.style.opacity = 0.3;
	this._movableElem.style.pointerEvents = 'none';
	this._movableElem.style.width = target.querySelector('.parentItem').offsetWidth + 'px';
	
	this._movableElemShiftX = clientX - target.getBoundingClientRect().left;
	this._movableElemShiftY = clientY - target.getBoundingClientRect().top;	
};

/**
 * Выделяет элемент для перемещения
 * Если у элемента установлен аттрибут data-sortable="true"
 * Если у элемента установлен аттрибут data-sortable="after", то выделения не происходит
 */
Sorter.prototype._selectSortable = function (event) {
	let target = event.target;
	let targetCursor = getComputedStyle(target).cursor;
	
	if (targetCursor != 'move') return;	
	
	this._elem.dataset.sorterMoving = true;
	
	while( target != this._elem ) {
		if (target.dataset.tree == 'open' || target.dataset.tree == 'close') return;
		
		if ( target.dataset.sortable ) {
			if (target.dataset.sortable == 'after' || target.dataset.sortable == 'before') return;
			
			this._setCurrentTarget(target, event.clientX, event.clientY);
						
			return;
		}
		target = target.parentNode;
	}
};

/**
 * Перемещает выделенный элемент среди элементов с аттрибутами data-sortable="true"
 * Если у элемента установлен аттрибут data-sortable="after", то перемещаемый элемент вставляется после него
 * Генерирует событие sortstart на перемещаемом элементе 
 * Генерирует событие sort на перемещённом элементе
 */
Sorter.prototype._moveSortable = function (event) {
	if (!this._currentTarget) return;	
	
	this._currentTarget.dataset.sorterSelected = true;
	
	this._currentTarget.dispatchEvent(new CustomEvent('sortstart', {bubbles: true}));
	
	let target = event.target;
	
	while( target != this._elem ) {
		if (target.dataset.tree == 'open' || target.dataset.tree == 'close') return;
			
		if ( target.dataset.sortable ) {					
			this._elem.append(this._movableElem);
	
			this._movableElem.style.left = target.getBoundingClientRect().left + 'px';
			this._movableElem.style.top = event.clientY - this._movableElemShiftY + 'px';				
			// Если список раскрыт
			if (target.dataset.tree == 'dropped out') {	
				let parentItem = target.querySelector('.parentItem');
				let parentItemCoordY = event.clientY - parentItem.getBoundingClientRect().top;

				// Если курсор находится в верхней части родительского пункта списка
				if (parentItemCoordY < parentItem.offsetHeight/2) {
					target = target.previousElementSibling;			
				}
				else {
					// Первый дочерний пункт
					target = target.querySelector('li');
				}				
			}			
			while (target.dataset.sortable == 'after') {
				if (!target.nextElementSibling) break;				
				target = target.nextElementSibling;
				
				if (target.dataset.tree == 'dropped out') {
					target = target.previousElementSibling;
					break;
				}
			}
			while (target.dataset.sortable == 'before') {
				if (!target.previousElementSibling) break;				
				target = target.previousElementSibling;
				
				if (target.dataset.tree == 'dropped out') {
					target = target.nextElementSibling;
					break;
				}
			}			
			// Если элемент небыл перемещён	
			if (target == this._currentTarget) return;		
			
			let targetCoordY = event.clientY - target.getBoundingClientRect().top;
			let height = (this._currentTarget.offsetHeight > target.offsetHeight) ? target.offsetHeight/2 : this._currentTarget.offsetHeight/2;

			// Если курсор находится в верхней части перемещаемого элемента
			if (targetCoordY > height && target.dataset.sortable != 'before' || target.dataset.sortable == 'after') {
				if (target == this._currentTarget.previousElementSibling) return;
				try {							
					target.after(this._currentTarget);
				} catch (e) {
					return;
				}				
			}
			else {
				if (target == this._currentTarget.nextElementSibling) return;
				try {							
					target.before(this._currentTarget);		
				} catch (e)	{
					return;
				}			
			}	
			
			this.updateChildItemsCounts();
			
			this._currentTarget.dispatchEvent(new CustomEvent('sort', {bubbles: true}));
			return;
		}
		target = target.parentNode;
	}	
};

/**
 * Снимает выделения с перемещаемого элемента
 */
Sorter.prototype._removeSelectionSortable = function () {
	if (this._currentTarget) {
		delete this._currentTarget.dataset.sorterSelected;
		this._currentTarget = null;		
		
		delete this._elem.dataset.sorterMoving;
		
		this._movableElem.remove();
	}
};

Sorter.prototype._setLinkTarget = function (event) {
	if (event.target.nodeName == 'A') this._linkTarget = event.target; 
};

Sorter.prototype._setMouseMoveOnLink = function (event) {
	if (event.target == this._linkTarget) {
		this._isMouseMoveOnLink = true;
		return;
	}
	this._isMouseMoveOnLink = false;
};

Sorter.prototype._cancelFollowing = function (event) {
	if (this._isMouseMoveOnLink) event.preventDefault();
	
	this._isMouseMoveOnLink = false;
	this._linkTarget = null;
};

/**
 * Отменеят переход по ссылки, если после нажатия кнопки мышки, мышь была передвинута
 */
Sorter.prototype._cancelFollowingAfterMousemove = function () {
	this._elem.addEventListener('dragstart', () => event.preventDefault());
	
	this._elem.addEventListener('mousedown', () => this._setLinkTarget(event));	
	this._elem.addEventListener('mousemove', () => this._setMouseMoveOnLink(event));	
	this._elem.addEventListener('click', () => this._cancelFollowing(event));
};

Sorter.prototype._mouseLeaveHandler = function () {
	this._removeSelectionSortable();
};

/* Внешние методы */

Sorter.prototype.updateChildItemsCounts = function () {
	let items = this._elem.querySelectorAll('[data-sortable="true"]');
	
	for (let i = 0; i < items.length; i++) {
		let ul = items[i].querySelector('ul');
		let childItemsCount = 0;	

		for(let i = 0; i < ul.children.length; i++) {
			if (ul.children[i].dataset.sortable === 'true') childItemsCount++;
		}		
		items[i].querySelector('.childItemsCount').innerHTML = (childItemsCount) ? childItemsCount : '';
	}
};

/* Sorter.prototype.updateChildItemsCount = function (target) {
	for (; target != this._elem; target = target.parentNode) {
		if (target.nodeName != 'LI') continue;
		
		let ul = target.querySelector('ul');
		let childItemsCount = 0;
		
		for(let i = 0; i < ul.children.length; i++) {
			if (ul.children[i].dataset.sortable === 'true') childItemsCount++;
		}
		console.log(target.querySelector('.childItemsCount'));
		target.querySelector('.childItemsCount').innerHTML = (childItemsCount) ? childItemsCount : '';
		
		return;
	}
}; */

Sorter.prototype.start = function () {	
	this._elem.addEventListener('mousedown', this._selectSortable.bind(this));
	this._elem.addEventListener('mousemove', this._moveSortable.bind(this));
	this._elem.addEventListener('mouseup', this._removeSelectionSortable.bind(this));	
	this._elem.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this));
	
	this._cancelFollowingAfterMousemove();	
}