"use strict";
/* Редактирование данных */
class DataEditor {
	constructor() {
		this._currentValue;
		this.editableElem;
		this.requestData;
		this.requestUrl
		
		this._progressAnim = new ProgressAnimation();
	}
	
	isChanged() {
		if (this.editableElem.innerHTML === this._currentValue) return false;
		return true;
	}
	/** 
	 * Выполняет запрос изменения данных
	 *
	 * @return object
	*/	
	async _requestHandler() {
		let url = this.requestUrl
		let data = this.requestData
		let response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
			},
			body: JSON.stringify(data)
		});
		
		return await response.json();	
	}	
	
	/**
	 * Обрабатывает запрос
	 *
	 * @return object	 
	*/
	async handleRequest() {
		this.focusOut();
		
		let editableElem = this.editableElem;
		
		this._progressAnim.setContainer(editableElem.parentNode.querySelector('.progressContainer'));		
		this._progressAnim.start(500);
		
		editableElem.style.display = 'none';		
		
		try {
			return await this._requestHandler();
		} catch (e) {
			editableElem.innerHTML = this._currentValue;
			
			throw new Error(e);
		} finally {
			this._progressAnim.stop(0);
			
			editableElem.style.display = '';
		}			
	}
	
	setRequestHandler(handler) {
		this._requestHandler = () => handler();
	}
	
	/**
	 * Выделяет редактируемый элемент
	 *
	 * @param node editableElem
	*/
	focusIn(editableElem) {
		this.editableElem = editableElem;
		
		editableElem.dataset.focus = true;
		
		this._currentValue = editableElem.innerHTML;
	}

	/**
	 * Снимает выделение с редактируемого элемента
	*/	
	focusOut() {
		delete this.editableElem.dataset.focus;
	}
}