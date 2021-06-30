"use strict";
class State {
	constructor() {
		
		/** 
		* Объекты состояний со свойством handler
		* handler - обработчик состояния
		*
		* @var array
		*/		
		this._states = [];
		
		/** 
		* id текущего состояния
		*
		* @var null|int
		*/				
		this._stateId = null;
	}
	
	/** 
	* Добавляет состояние истории
	*/
	_push() {				
		this._stateId = (this._stateId || 1) + 1;
		
		this._states[this._stateId] = event.detail;

		history.pushState({count: this._stateId}, '', event.detail.href);
	}
	
	/** 
	* Запускает обработчик состояния истории или обновляет страницу
	*/
	_runStateHandler() {
		let id = event.state ? event.state.count : 1;

		if (this._states[id] && this._states[id].handler) {
			this._states[id].handler();
			return;
		}
		history.go(0);	
	}
	
	start() {
		document.body.addEventListener('followlink', () => this._push());
		window.addEventListener('popstate', () => this._runStateHandler());
	}
}