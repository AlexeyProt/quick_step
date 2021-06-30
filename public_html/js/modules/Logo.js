/* Класс формы автроризации */
function Logo(elem) {
	this._elem = elem;
/* 	this.animationOverEvent = new CustomEvent('animationover');
	this.textCircle = this._elem.querySelector('#textCircle');
	this.textMask = this._elem.querySelector('#textMask');
	this.line = this.textMask.lastElementChild;

	this._textCircleAnim();
	this._addEventListeners(); */
	
	this._backgroundAnim();
}


/* Внутренние методы */

Logo.prototype._lineAnimHandler = function () {
	this._strokeDashoffsetAnim( this.line, 125 );
};

Logo.prototype._addEventListeners = function () {
	this.textMask.addEventListener( 'animationover', this._lineAnimHandler.bind(this), { once: true } );
	this.textCircle.addEventListener( 'animationover', this._strokeDashoffsetAnim.bind( this, this.textMask, 5000 ), { once: true } );
};

Logo.prototype._textCircleAnim = function () {
	var self = this,
		animation = new MyAnimation( this.textCircle ),
		transform = this.textCircle.attributes['transform'],
		initialValue = +transform.value.substring(7, transform.value.indexOf(' '));
		attrComponents = transform.value.split(' ');
		attrComponents[0] = attrComponents[0].substring(0, 7);
	animation.setDraw(function () {
		transform.value = attrComponents[0] + animation.generateValue( initialValue, 0 ) + ' ' + attrComponents[1] + ' ' + attrComponents[2];
		if ( animation.progress == 1 ) {
			self.textCircle.dispatchEvent(self.animationOverEvent);
		}
	});
	animation.setTiming(function (timeFraction) {
		return Math.pow(timeFraction, 1/2);
	});
	animation.interactAnimate(2000);
};

Logo.prototype._strokeDashoffsetAnim = function (elem, duration) {
	var self = this,
		animation = new MyAnimation( elem ),
		strokeDashoffset = elem.attributes['stroke-dashoffset'],
		initialValue = +strokeDashoffset.value;
	animation.setDraw(function () {
		strokeDashoffset.value = animation.generateValue( initialValue, 0 );
		if ( animation.progress == 1 ) {
			elem.dispatchEvent(self.animationOverEvent);
		}
	});
	animation.interactAnimate(duration);	
};

Logo.prototype._backgroundAnim = function () {
	var self = this,
		animation = new MyAnimation( document.getElementById('backgroundGradient') );
	animation.setDraw(function (elem) {
		elem.childNodes[0].attributes['stop-opacity'].value = animation.progress * 1;
		elem.childNodes[1].attributes['stop-opacity'].value = animation.progress * 1;
		elem.childNodes[2].attributes['stop-opacity'].value = animation.progress * 1;					
	});
	animation.interactAnimate(500);
};

/* Внешние методы */

/* Logo.prototype.start = function () {
	var self = this,
		animation = new MyAnimation( this.textMask ),
		strokeDashoffset = this.textMask.attributes['stroke-dashoffset'],
		initialValue = +strokeDashoffset.value;
	animation.setDraw(function () {
		strokeDashoffset.value = animation.generateValue( initialValue, 0 );
		if ( animation.progress == 1 ) {
			self.textMask.dispatchEvent(self.animationOverEvent);
		}
	});
	animation.interactAnimate(5000);
}; */