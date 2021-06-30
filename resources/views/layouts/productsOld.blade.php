@extends('layouts.default')

@section('content')
<script src="{{ asset('js/views/productsView.js') }}" defer></script>
@include('includes.cartWindow')
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
<div class="content">
	@yield('textContent')
	<svg style="position: absolute;width: 0;height: 0;left: 0;top: 0;">
		<defs>
			<radialGradient gradientUnits="objectBoundingBox" cx="0.5" cy="0.5" id="iconsGradRad" r="0.4">
				<stop offset="0" stop-color="#fff"></stop>
				<stop stop-color="#fff" offset="0.1"></stop>
				<stop stop-color="#fff" stop-opacity="0.5" offset="0.9"></stop>
				<stop offset="1" stop-color="#000" stop-opacity="0.9"></stop>
			</radialGradient>
			

			
			
			<linearGradient gradientUnits="objectBoundingBox" id="iconsGrad">
				<stop offset="0" stop-color="#000" stop-opacity="0.5"></stop>
				<stop offset="0.1" stop-color="#000" stop-opacity="0.1"></stop>
				<stop stop-color="#fff" offset="0.5" stop-opacity="0"></stop><stop offset="0.9" stop-color="#000" stop-opacity="0.1"></stop>
				<stop offset="1" stop-color="#000" stop-opacity="0.5"></stop>
			</linearGradient>		
			
			<mask maskContentUnits="objectBoundingBox" id="iconsMask">
				<g data-name="Слой 4" fill="white" stroke="none" stroke-width="0.02">
					<rect  x="0" y="0" width="1" height="1"></rect>
				</g>
			</mask>
		</defs>
	</svg>
	<div class="productsList">
		@foreach ( $products as $product )
			<div class="product">
			@if ($product->product_group_id)
				<a href="{{ url($product->group_product->product_group->product_group_view->page->uri) }}" class="icon">
			@else
				@if ($product->product_view)
					<a href="{{ url($product->product_view->page->uri) }}" class="icon">				
				@else
					<a href="{{ url($product->laminate_products_view->page->uri) }}" class="icon">
				@endif			
			@endif
					<div class="imageContainer">
						
						<svg viewBox="0 0 100 100" width="220" height="220">
							<g fill="url(#iconsGrad)" mask="url(#iconsMask)">
								<rect x="0" y="0" width="100" height="100" fill="none"></rect>
								@if ($product->product_group_id)
									<image xlink:href="{{ asset('images/products/mini/'.$product->group_product->product_group->product_group_images[0]->name) }}" x="0" y="0" width="90" height="90" transform="scale(1) translate(0, 0)"></image>
								@else
									<image xlink:href="{{ asset('images/products/mini/'.$product->product_images[0]->name) }}" preserveAspectRatio="xMidYMid slice" x="5" y="5" width="90" height="90" transform="scale(1) translate(0, 0)"></image>
								@endif								
								<rect data-name="anim" x="0" y="0" width="100" height="100" stroke="none" stroke-width="3px" fill-opacity="0"></rect>
								@if ($product->category->moisture_resistance)
									<image xlink:href="{{ asset('images/moisture-resistance.png') }}" width="15" height="15" y="80" x="70"/>
								@endif									
							</g>
						</svg>
					</div>
					<h4>{{ ($product->product_group_id) ? $product->group_product->product_group->name : $product->name }}</h4>
					@if ($product->discount_price_per_square_meter) 
						<p><span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> <span style="text-decoration:line-through; font-size:12px;">{{ $product->price_per_square_meter }}</span> <span style="color:#ec008c;"> {{ $product->discount_price_per_square_meter }} руб.</span></p>
					@else
						<p><span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> {{ $product->price_per_square_meter }} руб.</p>
					@endif
				</a>
				@if ($product->product_group_id)
					@if ($product->group_stock)
						<div class="openButton" onclick="location.href='{{ url($product->group_product->product_group->product_group_view->page->uri) }}'">
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
				@else
					@if ($product->product_stock->quantity)
						<div class="openButton" data-cart-id="{{ $product->id }}" data-cart-category-name="Пол">
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
				@endif
			</div>
		@endforeach
	</div>
	{{ $products->links() }}
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection