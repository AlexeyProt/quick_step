"use strict";
class Slider {
	constructor(container) {
		this._container = container;
		this._slidesCont = container.querySelector('#slides');
		this._buttonLeft = container.querySelector('.left');
		this._buttonRight = container.querySelector('.right');
		
		this.timer = Date.now();
		this.frame = 0;
		
		this.start();
	}
	
	// установка нужного слайда	
	slidesPosition(number) {
		let shift = number*(-100);
		let initialLeft = +this._slidesCont.style.left.replace(/[^\d \- .]+/, '');

		this._anim = new MyAnimation(this._slidesCont);
		
		this._anim.setDraw((slidesCont, progress) => {
	
			slidesCont.style.left = this._anim.generateValue(initialLeft, shift) + '%';
		});

		this._anim.interactAnimate(1000);	
	}
	// крутим на один кадр влево
	left() { 
			if ( (Date.now() - this.timer) < 1000 ) return;
			if (this.frame === 0) {
				this._slidesCont.appendChild( this._slidesCont.firstElementChild );			
				this.frame = this._slidesCont.children.length-1;
				this._slidesCont.style.left = (this._slidesCont.children.length-1)*(-100)+"%";			

			}			
			this.slidesPosition(--this.frame);
			this.timer = Date.now();
	}	
	
	// крутим на один кадр вправо
	right() {
			if ( (Date.now() - this.timer) < 1000 ) return;
			if (this.frame === this._slidesCont.children.length-1) {
				this._slidesCont.insertBefore( this._slidesCont.lastElementChild, this._slidesCont.firstElementChild );			
				this.frame = 0;
				this._slidesCont.style.left = "0%";			
			}
			this.slidesPosition(++this.frame);
			this.timer = Date.now();
	}	
	
	start() {		
		this._buttonLeft.addEventListener('click', () => this.left());
		this._buttonRight.addEventListener('click', () => this.right());
	
		setInterval(() => { // ставим пятисекундный интервал для перелистывания картинок
			if ( (Date.now() - this.timer) >= 4990 ) {
				this.right();
			}
		},5000);			
	}
}