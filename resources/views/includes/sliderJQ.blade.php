<div id="slider">
	<button class="left" onclick="slider.left();"></button>
	<div id="frame">
	<div id="slides"><!--	
	@foreach ($categories as $category)
		--><a href="{{ url(isset( $category->categories_view ) ? $category->categories_view->page->uri : $category->products_view->page->uri) }}"><div class="slide"><div class="slideText">{{ $category->name }}</div></div></a><!--
	@endforeach
	--></div>
	</div>
	<button class="right" onclick="slider.right();"></button>
</div>
<script>
var slider = {
	slides:[
		@foreach ($categories as $category)
			"{{ asset('images/categories/'.$category->category_image->name) }}",
		@endforeach
	],
	frame:0,
	slidesPosition: function (number) {
		var shift = number*(-100)+"%";
		$('#slides').animate({
			left: shift
		}, 1000);
		
	}, // установка нужного слайда

	set: function(image) { // установка нужного фона слайдеру
		let slides = document.querySelectorAll('.slide');
		
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.backgroundImage = "url("+image[i]+")";
		}
	},
	timer: Date.now(),
	init: function() { // запуск слайдера с картинкой с нулевым индексом
		this.set(this.slides);
		document.getElementById("slides").style.left = "0%";
	},
	left: function() { // крутим на один кадр влево
		if ( (Date.now() - this.timer) < 1000 ) return;
		if (this.frame === 0) {
			var idSlides = document.getElementById("slides");
			idSlides.appendChild( idSlides.firstElementChild );			
			this.frame = this.slides.length-1;
			idSlides.style.left = (this.slides.length-1)*(-100)+"%";			

		}			
			this.slidesPosition(--this.frame);
			this.timer = Date.now();
	},
	right: function() {
		// крутим на один кадр вправо
		if ( (Date.now() - this.timer) < 1000 ) return;
		if (this.frame === this.slides.length-1) {
			var idSlides = document.getElementById("slides");
			idSlides.insertBefore( idSlides.lastElementChild, idSlides.firstElementChild );			
			this.frame = 0;
			idSlides.style.left = "0%";			
		}
		this.slidesPosition(++this.frame);
		this.timer = Date.now();
	}
};
window.onload = function() { // запуск слайдера после загрузки документа
	slider.init();
	setInterval(function() { // ставим пятисекундный интервал для перелистывания картинок
	if ( (Date.now() - slider.timer) >= 4990 ) {
		slider.right();
	}
	},5000);	
};
</script>