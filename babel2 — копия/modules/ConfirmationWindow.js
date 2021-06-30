"use strict";
/* Окно подтверждения */
class ConfirmationWindow extends WindowForm {
	constructor(args) {
		super(args);
		
		this.progressAnim = new ProgressAnimation(this._elem.querySelector('.progressContainer'));
	}
}