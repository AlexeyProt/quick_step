"use strict";
class SortingIndicator {
	constructor(container) {
		this._container = container;
		this._sortingIndicator = document.getElementById('sortingIndicator').content.children[0];
		
		this._hoverIndicator = null;
		this._selectedIndicator = null;

		this._anim = new MyAnimation(this._sortingIndicator);
	}

	/** 
	* Запускает анимацию элемента индикатора сортировки
	*
	* @param node animEl элемент индикатора сортировки
	* @param int finalTranslateY конечное значение анимации атрибута translate по оси Y
	* @param int finalScaleY конечное значение анимации атрибута scale по оси Y
	*/
	_animateIndicator(animEl, finalTranslateY, finalScaleY) {
		let initialTransform = animEl.attributes['transform'].value.match(/\(0 ([\d.]+)\) scale\(1 ([\-\d.]+)\)/);
		let initialTranslateY = initialTransform[1];
		let initialScaleY = initialTransform[2];
		
		if (animEl.anim) {
			animEl.anim.stopAnim();
		} else {
			animEl.anim = new MyAnimation(animEl);
		}	
		animEl.anim.setDraw((animEl) => {
			animEl.attributes['transform'].value = `translate(0 ${animEl.anim.generateValue(initialTranslateY, finalTranslateY)}) ` +
													`scale(1 ${animEl.anim.generateValue(initialScaleY, finalScaleY)})`;
		});
	
		animEl.anim.interactAnimate(250);
	}

	/** 
	* Отображает индикатор сортировки в положение asc
	*
	* @param node column элемент с атрибутом data-sortable-column
	*/		
	displayAsc(column) {
		column.dataset.sortableOrder = 'asc';
		
		this._animateIndicator( column.querySelector('.sortingIndicator g'), 0, 1 );		
	}

	/** 
	* Отображает индикатор сортировки в положение desc
	*
	* @param node column элемент с атрибутом data-sortable-column
	*/			
	displayDesc(column) {
		column.dataset.sortableOrder = 'desc';
		
		this._animateIndicator( column.querySelector('.sortingIndicator g'), 272, -1 );		
	}	
	
	/** 
	* Отображает индикатор сортировки внутри элемента с атрибутом data-sortable-column
	*/	
	_show() {
		for (let target = event.target; target != this._container; target = target.parentNode) {
			if (!target.dataset.sortableColumn) continue;
			
			if (target.querySelector('.sortingIndicator')) return;
			
			this._hoverIndicator = this._sortingIndicator.cloneNode(true);
			target.querySelector('.indicatorContainer').append(this._hoverIndicator);
		}
	}
	
	/** 
	* Скрывает индикатор сортировки, если он не был выделен
	*/		
	_hide() {
		if (!this._hoverIndicator || this._hoverIndicator == this._selectedIndicator) return;
		
		for (let relatedTarget = event.relatedTarget; relatedTarget; relatedTarget = relatedTarget.parentNode) {
			if (relatedTarget == this._hoverIndicator) return;
		}
		this._hoverIndicator.remove();
	}

	/** 
	* Выделяет индикатор
	*
	* @param node column элемент с атрибутом data-sortable-column
	*/			
	select(column) {
		let sortingIndicator = column.querySelector('.sortingIndicator');

		if (this._selectedIndicator) this._selectedIndicator.remove();
		
		this._selectedIndicator = sortingIndicator;
		
		column.querySelector('.indicatorContainer').append(this._selectedIndicator);

		this.displayDesc(column);
	}
	
	/** 
	* Переключает индикатор
	*
	* @param node column элемент с атрибутом data-sortable-column
	*/			
	toggle(column) {	
		this._selectedIndicator = column.querySelector('.sortingIndicator');
		
		if (column.dataset.sortableOrder == 'asc') {
			this.displayDesc(column);
			
			return;
		}
		this.displayAsc(column);
	}	

	/** 
	* Проверяет выделен ли столбец
	*
	* @param node column элемент с атрибутом data-sortable-column
	* @return boolean
	*/	
	checkSelection(column) {
		if (column.querySelector('.sortingIndicator') == this._selectedIndicator) {
			return true;
		}
		return false;
	}

	/** 
	* Возвравщает выделеный столбец
	*
	* @return node элемент с атрибутом data-sortable-column
	*/		
	getSelectedColumn() {
		if (!this._selectedIndicator) return;
		
		for (let target = this._selectedIndicator; target != this._container; target = target.parentNode) {
			if (!target || !target.dataset.sortableColumn) continue;
			
			return target;
		}
	}
	
	start() {
		this._container.addEventListener('mouseover', () => this._show(event));
		this._container.addEventListener('mouseout', () => this._hide(event));
	}
}