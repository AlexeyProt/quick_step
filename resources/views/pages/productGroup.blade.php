@extends('layouts.default')

@section('content')
<script src="{{ asset('js/views/productView.js') }}" defer></script>
@include('includes.cartWindow')
<div class="content">
@include('includes.imageShowMobile')
<div class="imageContainer" style="max-width: 500px;">
	<h1>{{ $product_group->name }}</h1>
	<img data-name="show" src="{{ asset('images/products/medium/'.$product_group->product_group_images[0]->name) }}">

	<div class="miniCont">
	@for($i = 1, $size = count($product_group->product_group_images); $size > 1, $i < $size; ++$i)
		<img data-name="show" src="{{ asset('/images/products/mini/'.$product_group->product_group_images[$i]->name) }}">
	@endfor
	</div>	

	<div class="productsList">
		@foreach ( $product_group->group_products as $group_product )
			<div class="product">
				<div class="cont">
					<div class="imageContainer">		
						<img data-name="show" src="{{ asset('images/products/mini/'.$group_product->product->image) }}">
					</div>
					<h4>{{ $group_product->product->name }}</h4>
					<p class="product_stock">{{ ($group_product->product->product_stock->quantity) ? 'В наличии '.$group_product->product->product_stock->quantity.' шт.' : '' }}</p>
					<p class="price">{{ $group_product->product->price->price }} руб.</p>				
				</div>
				@if ($group_product->product->product_stock->quantity)		
					<div class="openButton" data-cart-id="{{ $group_product->product->id }}">
						<div class="innerContainer">
							<div>Купить</div>			
						</div>
					</div>
				@else
					<div class="openButton" data-not_available="true">
						<div class="innerContainer">
							<div>Нет в наличии</div>			
						</div>
					</div>		
				@endif							
			</div>
		@endforeach
	</div>

</div>
<div class="textContainer">
	{!! $page->content !!}
</div>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection