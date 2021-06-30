<div id="slider">
	<button class="left"></button>
	<div id="frame">
	<div id="slides"><!--	
	@foreach ($floors as $floor)
		--><a href="{{ url(isset( $floor->categories_view ) ? $floor->categories_view->page->uri : $floor->products_view->page->uri) }}"><div class="slide" style="background-image:url('{{ asset('images/categories/'.$floor->category_image->name) }}');"><div class="slideText">{{ $floor->name }}</div></div></a><!--
	@endforeach
	--></div>
	</div>
	<button class="right"></button>
</div>