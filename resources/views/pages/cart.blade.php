@extends('layouts.default')

<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@section('content')
<script src="{{ asset('js/modules/CartForm.js') }}" defer></script>
<script src="{{ asset('js/modules/CartServicesForm.js') }}" defer></script>
<script src="{{ asset('js/views/cartView.js') }}" defer></script>
<div class="content">
@include('includes.imageShowMobile')
	<h1>Корзина</h1>
	<h3>Выберете товары, которые хотите купить</h3>
	<form class="cart">
		<div class="table footing">
			<div>		
				<label>
					<input type="checkbox" name="selectAll" checked>
					<span>Выбрать все</span>
				</label>
			</div>
			<div><span>Общая сумма: </span><strong data-cart-window="total amount">0</strong><span> руб.</span></div>
		</div>	
		<div class="cartProducts">
			@foreach ($products as $product)	
				<div class="table" data-cart-window="id" data-id="{{ $product->id }}">
					<input type="checkbox" name="select" checked>
					<div>
						<img data-cart-window="image" src="{{ asset('/images/products/mini/'.$product->image) }}" style="width: 100px;">
					</div>
					<div data-cart-window="name">{{ $product->name }}</div>
					<div>
						<span><span>Цена за </span><span data-cart-window="unit">{{ $product->unit->reduction }}: </span></span>
						<strong data-cart-window="price">{{ $product->price->price_history->price }}</strong><span> руб.</span>
					</div>
					<div>
						<span><span>Количество </span><span data-cart-window="unit">{!! $product->unit->reduction !!}</span></span>
						<div>			
							<div class="quantityVidjet">
								<span>-</span>
								<span data-cart-window="quantity" data-module="quantityVidjet" contenteditable="true">{{ $product->quantity }}</span>
								<span>+</span>
							</div>
						</div>
					</div>
					<div>
						<span>Сумма: </span><strong data-cart-window="sum">{{ $product->discount_price or $product->price->price_history->price*$product->quantity }}</strong><span> руб.</span>
						<div data-cart-window="discount">{{ isset($product->discount) ? "Скидка: {$product->discount}%" : '' }}</div>
					</div>
					<div>@php include('images/deleteIcon.svg') @endphp</div>
				</div>	
			@endforeach
		</div>
		<div class="cartServices">
			@foreach ($services as $service)	
				<div class="table" data-cart-window="id" data-id="{{ $service->id }}">
					<input type="checkbox" name="select" checked>
					<div data-cart-window="service name">{{ $service->name }}</div>
					<div>
						<span><span>Цена за </span><span data-cart-window="unit">{!! $service->service_unit->unit->reduction !!}</span></span>
						<strong data-cart-window="service price">{{ $service->service_price->service_price_history->price }}</strong><span> руб.</span>
					</div>
					<div>
						<span><span>Количество </span><span data-cart-window="unit">{!! $service->service_unit->unit->reduction !!}</span></span>
						<div>			
							<div class="quantityVidjet">
								<span>-</span>
								<span data-cart-window="quantity" data-module="quantityVidjet" contenteditable="true">{{ $service->quantity }}</span>
								<span>+</span>
							</div>
						</div>
					</div>
					<div><span>Сумма: </span><strong data-cart-window="sum">{{ $service->service_price->service_price_history->price*$service->quantity }}</strong><span> руб.</span></div>
					<div>@php include('images/deleteIcon.svg') @endphp</div>
				</div>	
			@endforeach	
		</div>
		<div class="table footing">
			<div>		
				<label>
					<input type="checkbox" name="selectAll" checked>
					<span>Выбрать все</span>
				</label>
			</div>
			<div><span>Сумма за работы: </span><strong data-cart-window="service_sum">0</strong><span> руб.</span></div>
			<div><span>Общая сумма: </span><strong data-cart-window="total amount">0</strong><span> руб.</span></div>
		</div>	
		<div class="buttons">
			<p class="notice"></p>	
			<div class="button" data-button="checkout">
				<div class="innerContainer">Оформить заказ</div>
			</div>	
		</div>		
	</form>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection