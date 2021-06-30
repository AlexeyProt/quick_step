@extends('layouts.default')

@section('content')
<script src="{{ asset('js/modules/PacksCalculator.js') }}" defer></script>
<script src="{{ asset('js/views/productView.js') }}" defer></script>
@include('includes.cartWindow')

@include('includes.cartCategoriesWindow')
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
<div class="content">
	@include('includes.imageShowMobile')
	<div class="imageContainer" style="max-width: 500px;">
		<h1>{{ $product->name }}</h1>
		<img data-name="show" src="{{ asset('images/products/medium/'.$product->image) }}">

		<div class="miniCont">
		@for($i = 1, $size = count($product->product_images); $size > 1, $i < $size; ++$i)
			<img data-name="show" src="{{ asset('/images/products/mini/'.$product->product_images[$i]->name) }}">
		@endfor
		</div>	
		<a data-device="mobile" class="WhatsApp" href="whatsapp://send?text={{ $product->name }} {{ url()->current() }}%3Futm_source%3Dwhatsapp%26utm_medium%3D110415%26utm_campaign%3Duser_share">						
			<div class="openButton">
				<div class="innerContainer">
					<div><i class="fab fa-whatsapp"></i><span> Поделиться в WhatsApp</span></div>			
				</div>
			</div>	
		</a>
	</div>
	<div class="textContainer">	
		<div class="container">
			
			
<div class="floor">
	<div id="laminate">
		<p class="price">Цена за упак: <span>{{ $product->price->price_history->price }} руб.</span></p>
		
		<div class="row">
			<div>Площадь:</div>
			<div>
				<input data-packs-calculator="area" value="{{ $product->packing_area }}">
			</div>
		</div>
		
		<div class="row">
			<div>Расход клея:</div>
			<div>
				<span>1 упак / </span><span data-packs-calculator="packing_area">{{ $product->packing_area }}</span> м<sup>2</sup>
			</div>
		</div>	
		
		<div class="row">
			<div>Количество упаковок:</div>
			<div data-packs-calculator="quantityVidjet" class="quantityVidjet">
				<span>-</span>
				<span data-packs-calculator="quantity" data-cart="quantity" data-module="quantityVidjet" contenteditable="true">1</span>
				<span>+</span>
			</div>		
		</div>
		
		<div data-packs-calculator="discountContainer" class="row" style="display: none;">
			<div><strong>Ваша скидка: <span data-packs-calculator="discount"></span></strong></div>
			<div><span style="font-size:15px;">Сумма скидки: </span><span data-packs-calculator="discountAmount">0</span> руб.</div>
		</div>
		
		<div class="row">			
			<div>Сумма:</div>
			<div>
				<span data-packs-calculator="price" data-packs-calculator-price="{{ $product->price->price_history->price }}">{{ $product->price->price_history->price }}</span> руб.
				<span style="font-size:15px;">(кратно упаковкам)</span>
			</div>
		</div>
	</div>
	
	<div>
		<div class="floorButton">
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
		</div>
	</div>
</div>		
		
			
			<div class="characteristics">
				<table border="1"><caption>Характеристики</caption>
					<tbody>
					@foreach ($product->product_characteristics as $product_characteristic)
						<tr>
							<td>{{ $product_characteristic->characteristic->name }}</td>
							<td>{{ $product_characteristic->value }} {!! isset($product_characteristic->characteristic->unit) ? $product_characteristic->characteristic->unit->reduction : '' !!}</td>
						</tr>
					@endforeach
					</tbody>
				</table>
			</div>
		</div>




		
		
		{!! $page->content !!}
	</div>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection