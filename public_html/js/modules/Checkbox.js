"use strict";

class Checkbox {
	constructor(container) {
		this._container = container;
		this._inputs = [];
		this.selectedNodes = [];
		
		this.start();
	}

	_select() {
		if (event.target.name != 'select') return;
		
		this._setSelectedNodes();
		this._selectAllInputsChecked();
	}
	
	_selectAll() {
		if (event.target.name != 'selectAll') return;
		
		let selectAllInputs = this._container.querySelectorAll('[name="selectAll"]');
		this._inputs = this._container.querySelectorAll('[name="select"]');
		
		if (!this.selectedNodes.length) {
			for (let i = 0; i < this._inputs.length; i++) {
				this._inputs[i].checked = true;
			}			
		} else {
			for (let i = 0; i < this._inputs.length; i++) {
				this._inputs[i].checked = false;
			}	
			event.target.checked = false;
		}		
		
		this._setSelectedNodes();
	}

	_selectAllInputsChecked() {
		let selectAllInputs = this._container.querySelectorAll('[name="selectAll"]');
		
		if (this.selectedNodes.length === 0) {
			for (let i = 0; i < selectAllInputs.length; i++) {
				selectAllInputs[i].checked = false;
				selectAllInputs[i].indeterminate = false;
			}
		} else if (this.selectedNodes.length === this._inputs.length) {
			for (let i = 0; i < selectAllInputs.length; i++) {
				selectAllInputs[i].checked = true;
				selectAllInputs[i].indeterminate = false;
			}		
		} else {
			for (let i = 0; i < selectAllInputs.length; i++) {
				selectAllInputs[i].checked = false;
				selectAllInputs[i].indeterminate = true;
			}			
		}		
	}

	_setSelectedNodes() {	
		this._inputs = this._container.querySelectorAll('[name="select"]');
		
		this.selectedNodes = [];
		for (let i = 0; i < this._inputs.length; i++) {
			if (this._inputs[i].checked) this.selectedNodes.push(this._inputs[i]);
		}	
	}

	start() {
		this._setSelectedNodes();
		
		this._container.addEventListener('click', () => this._select());
		this._container.addEventListener('click', () => this._selectAll());
	}
}