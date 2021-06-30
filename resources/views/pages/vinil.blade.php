@extends('layouts.default')

@section('content')
<script src="{{ asset('js/modules/ProgressAnimation.js') }}" defer></script>
<script src="{{ asset('js/modules/builders/ProductBuilder.js') }}" defer></script>
<script src="{{ asset('js/modules/Tabs.js') }}" defer></script>
<script src="{{ asset('js/modules/loaders/TabsLoader.js') }}" defer></script>
<script src="{{ asset('js/modules/PacksCalculator.js') }}" defer></script>
<script src="{{ asset('js/modules/LaminateCalculator.js') }}" defer></script>
<script src="{{ asset('js/modules/RelatedProductCalculator.js') }}" defer></script>
<script src="{{ asset('js/modules/Mounting.js') }}" defer></script>
<script src="{{ asset('js/modules/MountingCalculator.js') }}" defer></script>
<script src="{{ asset('js/modules/PlinthCalculator.js') }}" defer></script>
<script src="{{ asset('js/modules/MountingPlinthCalculator.js') }}" defer></script>
<script src="{{ asset('js/modules/PriceCalculator.js') }}" defer></script>
<script src="{{ asset('js/views/floorView.js') }}" defer></script>
@include('includes.cartWindow')

@include('includes.cartCategoriesWindow')
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
<div class="content" style="border-bottom: solid 1px #004fa3;">
	@include('includes.imageShowMobile')
	<div class="imageContainer" style="max-width: 500px;">
		<h1>{{ $products['Пол']->name }}</h1>
		<img data-name="show" src="{{ asset('images/products/medium/'.$products['Пол']->image) }}">

		<div class="miniCont">
		@for($i = 1, $size = count($products['Пол']->product_images); $size > 1, $i < $size; ++$i)
			<img data-name="show" src="{{ asset('/images/products/mini/'.$products['Пол']->product_images[$i]->name) }}">
		@endfor
		</div>	
		<a data-device="mobile" class="WhatsApp" href="whatsapp://send?text={{ $products['Пол']->name }} {{ url()->current() }}%3Futm_source%3Dwhatsapp%26utm_medium%3D110415%26utm_campaign%3Duser_share">						
			<div class="openButton">
				<div class="innerContainer">
					<div><i class="fab fa-whatsapp"></i><span> Поделиться в WhatsApp</span></div>			
				</div>
			</div>	
		</a>
	</div>
	<div class="textContainer">	
		<div class="container">
			@include('includes.floor')
			<div class="characteristics">
				<div><img src="{{ asset('images/logo.png') }}" style="width:300px; border:none;"></div>
				<table border="1"><caption>Характеристики</caption>
					<tbody>
					@foreach ($products['Пол']->product_characteristics as $product_characteristic)
						<tr>
							<td>{{ $product_characteristic->characteristic->name }}</td>
							<td>{{ $product_characteristic->value }} {!! isset($product_characteristic->characteristic->unit) ? $product_characteristic->characteristic->unit->reduction : '' !!}</td>
						</tr>
					@endforeach
					</tbody>
				</table>
			</div>
			@if (isset($products['Пол']->product_characteristics_assoc['Метод монтажа']) && $products['Пол']->product_characteristics_assoc['Метод монтажа']->value == 'Клей')
				<h4 style="text-align: center;margin-top: 0;">Требует укладки на клей</h4>
			@endif			
		</div>




		
		
		{!! $page->content !!}
	</div>

</div>
<div class="content">
	<h3 style="margin-top:31px;">С этим товаром покупают</h3>
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
	<div id="tabsContainer">
		<ul class="tabs"><!--
			@if ( isset($products['Подложка']) )
				--><li data-status="active">Подложка</li><!--
			@endif
			--><li data-url="/products/categories/клей">Клей</li><!--			
		--></ul>
		@if ( isset($products['Подложка']) )
			<div data-tab="Подложка">
				<div class="productsList">
					@foreach ($products['Подложка'] as $product)
						@include('includes.productListItem', ['product' => $product])
					@endforeach		
				</div>
			</div>
		@endif
		<div data-tab="Клей">
			<div class="progressContainer"></div>
			<div class="productsList">
				
			</div>
		</div>	
		<template id="productTemp">
			@include('includes.productListItem', ['product' => new \App\Product])
		</template>		
	</div>	
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection