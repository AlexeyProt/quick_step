@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/pagesView.js') }}" defer></script>
<div class="content">
	<h1>Заказ № {{ $order->id }}</h1>
	<div class="cart">
		<div class="table">
			<div><span>Время оформления: </span><span>{{ $order->added_on }}</span></div>
			<div><span>Статус: </span><span>{{ $order->sale_status->status->name }}</span></div>
		</div>
		<div><span>Общая сумма: </span><span data-cart-window="total amount">{{ $order->total_amount }}</span><span> руб.</span></div>															
	@foreach ($order->magazine_sales as $magazine_sale)	
		<div class="table" data-cart-window="id" data-id="{{ $magazine_sale->product->id }}">
			<div>				
				<img data-cart-window="image" src="{{ asset('/images/products/mini/'.$magazine_sale->product->image) }}">
			</div>
			<div data-cart-window="name">{{ $magazine_sale->product->name }}</div>
			<div>
				<span>Цена за {!! $magazine_sale->product->unit->reduction !!}:</span>
				<span data-cart-window="price">{{ $magazine_sale->price_history->price }}</span><span> руб.</span>
			</div>
			<div>
				<span>Количество: </span><span data-cart-window="quantity">{{ $magazine_sale->quantity }}</span><span> {!! $magazine_sale->product->unit->reduction !!}</span>
			</div>
			<div><span>Сумма: </span><span data-cart-window="sum">{{ $magazine_sale->price_history->price * $magazine_sale->quantity }}</span><span> руб.</span></div>
		</div>	
	@endforeach
	
	@foreach ($order->service_magazine_sales as $service_magazine_sale)	
		<div class="table" data-cart-window="id" data-id="{{ $service_magazine_sale->service->id }}">
			<div data-cart-window="name">{{ $service_magazine_sale->service->name }}</div>
			<div>
				<span>Цена за {!! $service_magazine_sale->service->service_unit->unit->reduction !!}:</span>
				<span data-cart-window="price">{{ $service_magazine_sale->service_price_history->price }}</span><span> руб.</span>
			</div>
			<div>
				<span>Количество: </span><span data-cart-window="quantity">{{ $service_magazine_sale->quantity }}</span><span> {!! $service_magazine_sale->service->service_unit->unit->reduction !!}</span>
			</div>
			<div><span>Сумма: </span><span data-cart-window="sum">{{ $service_magazine_sale->service_price_history->price * $service_magazine_sale->quantity }}</span><span> руб.</span></div>
		</div>	
	@endforeach	
	
	@if ( isset($order->delivery_price) )
		<div class="table" data-cart="delivery">
			<div style="display: table-cell;">Доставка</div>
			<div><span data-delivery="price">{{ $order->delivery_price }}</span><span> руб.</span></div>
		</div>			
	@endif
	
		<div>
			<div><span>Сумма за работы: </span><span>{{ $order->services_sum }}</span><span> руб.</span></div>														
		</div>	
		<div>
			<div><span>Общая сумма: </span><span data-cart-window="total amount">{{ $order->total_amount }}</span><span> руб.</span></div>														
		</div>
			<div class="customer">
				<div><span>Имя: </span><span>{{ $order->customer->name }}</span></div>
				<div><span>Телефон: </span><span>{{ empty($order->customer->phone) ? '' : $order->customer->phone }}</span></div>
				<div><span>Адрес: </span><span>{{ $order->customer->adres }}</span></div>
				<div><span>Email: </span><span>{{ $order->customer->email }}</span></div>			
			</div>			
	</div>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection