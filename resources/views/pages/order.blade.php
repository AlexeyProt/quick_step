@extends('layouts.default')

@section('content')
<script src="{{ asset('js/modules/services/PostForm.js') }}" defer></script>
<script src="{{ asset('js/modules/OrderForm.js') }}" defer></script>
<script src="{{ asset('js/modules/OrderServicesForm.js') }}" defer></script>
<script src="{{ asset('js/views/orderView.js') }}" defer></script>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
<div class="content">
@include('includes.imageShowMobile')
	<h1>Ваш заказ</h1>
	<form class="cart order">
		<div class="table footing">
			<div><span>Общая сумма: </span><strong data-cart-window="total amount">0</strong><span> руб.</span></div>
		</div>
		<div class="cartProducts">		
			@foreach ($products as $product)	
				<div class="table" data-cart-window="id" data-id="{{ $product->id }}">
					<div>				
						<img data-cart-window="image" src="{{ asset('/images/products/mini/'.$product->image) }}">
					</div>
					<div data-cart-window="name">{{ $product->name }}</div>
					<div>
						<span><span>Цена за </span><span data-cart-window="unit">{{ $product->unit->reduction }}: </span></span>
						<span data-cart-window="price">{{ $product->price->price_history->price }}</span><span> руб.</span>
					</div>
					<div>
						<span>Количество: </span><span data-cart-window="quantity">{{ $product->quantity }}</span><span data-cart-window="unit"> {{ $product->unit->reduction }}</span>
					</div>
					<div>
						<span>Сумма: </span><strong data-cart-window="sum">{{ $product->discount_price or $product->price->price_history->price*$product->quantity }}</strong><span> руб.</span>
						<div data-cart-window="discount">{{ isset($product->discount) ? "Скидка: {$product->discount}%" : '' }}</div>
					</div>
				</div>		
			@endforeach
		</div>	
		
		<div class="cartServices">
			@foreach ($services as $service)	
				<div class="table" data-cart-window="id" data-id="{{ $service->id }}">
					<div style="display: table-cell;" data-cart-window="service name">{{ $service->name }}</div>
					<div>
						<span><span>Цена за </span><span data-cart-window="unit">{!! $service->service_unit->unit->reduction !!}:</span></span>
						<strong data-cart-window="service price">{{ $service->service_price->service_price_history->price }}</strong><span> руб.</span>
					</div>
					<div>
						<span><span>Количество: </span><span data-cart-window="quantity">{{ $service->quantity }} </span><span data-cart-window="unit">{!! $service->service_unit->unit->reduction !!}</span></span>		
					</div>
					<div><span>Сумма: </span><strong data-cart-window="sum">{{ $service->service_price->service_price_history->price*$service->quantity }}</strong><span> руб.</span></div>
				</div>	
			@endforeach	
			
			<template id="product">
				<div class="table" data-cart-window="id" data-id="">
					<div>				
						<img data-cart-window="image" src="">
					</div>
					<div data-cart-window="name"></div>
					<div>
						<span><span>Цена за </span><span data-cart-window="unit price"></span></span>
						<span data-cart-window="price"></span><span> руб.</span>
					</div>
					<div>
						<span>Количество: </span><span data-cart-window="quantity"></span><span data-cart-window="unit"></span>
					</div>
					<div>
						<span>Сумма: </span><strong data-cart-window="sum"></strong><span> руб.</span>
						<div data-cart-window="discount"></div>
					</div>
				</div>						
			</template>	

			<template id="service">
				<div class="table" data-cart-window="id" data-id="">
					<div style="display: table-cell;" data-cart-window="service name"></div>
					<div>
						<span><span>Цена за </span><span data-cart-window="unit price"></span></span>
						<strong data-cart-window="service price"></strong><span> руб.</span>
					</div>
					<div>
						<span><span>Количество: </span><span data-cart-window="quantity"></span><span data-cart-window="unit"></span></span>		
					</div>
					<div><span>Сумма: </span><strong data-cart-window="sum"></strong><span> руб.</span></div>
				</div>						
			</template>					
			
		</div>
		<div class="table" data-cart="delivery" style="display: none;">
			<div style="display: table-cell;">Доставка</div>
			<div style="text-align: left;">
				<p>
					<span data-delivery="price">{{ $delivery->service_price->service_price_history->price }}</span>
					руб. по СПб и на транспортные компании.<br>
					Перевоз транспортными компаниями за счёт покупателя.
				</p>
				<p>* Доставка в пригород, подъём рассчитываются отдельно.</p>
			</div>
		</div>		
		<div class="table footing">
			<div><span>Сумма за работы: </span><strong data-cart-window="service_sum">0</strong><span> руб.</span></div>
			<div><span>Общая сумма: </span><strong data-cart-window="total amount">0</strong><span> руб.</span></div>
		</div>	
		<label>
			<input type="text" name="name" placeholder="Имя">
			<div>Не обязательно</div>
		</label>
		<label>
			<input type="text" name="phone" placeholder="Телефон">
		</label>
		<label>
			<input type="text" name="email" placeholder="Электронная почта">
		</label>	
		<label>
			<input type="checkbox" name="delivery">
			<strong>Заказать доставку<br></strong>	
		</label>
		<label>
			<input type="hidden" name="adres" placeholder="Адрес доставки">
		</label>			
		<input type="checkbox" name="agreement">
		<span>Подтверждаю согласие на обработку персональных данных, с <a href="/privacy-policy" target="_blank" style="color: black;">политикой обработки персональных данных</a> ознакомлен.</span>	
		@include('includes/recaptchaNotice')		
		<div class="buttons">		
			<p></p>		
			<p data-delivery="message" style="display: none"></p>			
			<p class="notice"></p>	
			<div class="button" data-button="sendData">
				<div class="innerContainer">Оформить заказ</div>
			</div>	
			<div class="button" data-button="printOut">
				<div class="innerContainer">Распечатать заказ</div>
			</div>				
		</div>	
	</form>
	<input type="hidden" name="recaptcha_response" id="recaptchaResponse">
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection