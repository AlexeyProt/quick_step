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
			<radialGradient gradientUnits="objectBoundingBox" cx="0.5" cy="0.5" id="productGradRad" r="0.4">
				<stop offset="0" stop-color="#fff"></stop>
				<stop stop-color="#fff" offset="0.1"></stop>
				<stop stop-color="#fff" stop-opacity="0.5" offset="0.9"></stop>
				<stop offset="1" stop-color="#000" stop-opacity="0.9"></stop>
			</radialGradient>
			

			
			
			<linearGradient gradientUnits="objectBoundingBox" id="productGrad">
				<stop offset="0" stop-color="#000" stop-opacity="0.5"></stop>
				<stop offset="0.1" stop-color="#000" stop-opacity="0.1"></stop>
				<stop stop-color="#fff" offset="0.5" stop-opacity="0"></stop><stop offset="0.9" stop-color="#000" stop-opacity="0.1"></stop>
				<stop offset="1" stop-color="#000" stop-opacity="0.5"></stop>
			</linearGradient>		
			
			<mask maskContentUnits="objectBoundingBox" id="productMask">
				<g data-name="Слой 4" fill="white" stroke="none" stroke-width="0.02">
					<rect  x="0" y="0" width="1" height="1"></rect>
				</g>
			</mask>
		</defs>
	</svg>
	<div class="productsList">
		@foreach ( $products as $product )
			@include('includes.productListItem', ['product' => $product])
		@endforeach
	</div>
	{{ $products->links() }}
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection