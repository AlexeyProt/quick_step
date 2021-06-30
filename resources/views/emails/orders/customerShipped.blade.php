<div class="content">
	<a href="{{ url('') }}" style="margin: auto;display: block;width: 150px;">
		<img src="{{ asset('/images/logo.png') }}" width="150">
	</a>
	<h1>Благодарим Вас за заказ на сайте <a href="{{ url('') }}">{{ $_SERVER['SERVER_NAME'] }}</a> !</h1>
	<h2>Заказ № {{ $order->id }}</h2>
	<div style="border-bottom: solid black 1px;">
		<div style="border-bottom: solid black 1px;"><span>Время оформления: </span><span>{{ $order->added_on }}</span></div>
		<div style="border-bottom: solid black 1px;"><span>Общая сумма: </span><span>{{ $order->total_amount }}</span><span> руб.</span></div>															
	@foreach ($order->magazine_sales as $magazine_sale)	
		<div style="border-bottom: solid black 1px; padding: 15px 0px;">
			<div>				
				<img src="{{ asset('/images/products/mini/'.$magazine_sale->product->image) }}">
			</div>
			<div>{{ $magazine_sale->product->name }}</div>
			<div>
				<span>Цена за {!! $magazine_sale->product->unit->reduction !!}:</span>
				<span>{{ $magazine_sale->price_history->price }}</span><span> руб.</span>
			</div>
			<div>
				<span>Количество: </span><span>{{ $magazine_sale->quantity }}</span><span> {!! $magazine_sale->product->unit->reduction !!}</span>
			</div>
			<div><span>Сумма: </span><span>{{$magazine_sale->discount_price or $magazine_sale->price_history->price * $magazine_sale->quantity }}</span><span> руб.</span></div>
			<div>{{ isset($magazine_sale->discount) ? "Скидка: {$magazine_sale->discount}%" : '' }}</div>
		</div>	
	@endforeach
	
	@foreach ($order->service_magazine_sales as $service_magazine_sale)	
		<div style="border-bottom: solid black 1px; padding: 15px 0px;">
			<div>{{ $service_magazine_sale->service->name }}</div>
			<div>
				<span>Цена за {!! $service_magazine_sale->service->service_unit->unit->reduction !!}:</span>
				<span>{{ $service_magazine_sale->service_price_history->price }}</span><span> руб.</span>
			</div>
			<div>
				<span>Количество: </span><span>{{ $service_magazine_sale->quantity }}</span><span> {!! $service_magazine_sale->service->service_unit->unit->reduction !!}</span>
			</div>
			<div><span>Сумма: </span><span>{{ $service_magazine_sale->service_price_history->price * $service_magazine_sale->quantity }}</span><span> руб.</span></div>
		</div>	
	@endforeach	
	
	@if ( isset($order->delivery_price) )
		<div style="border-bottom: solid black 1px;">
			<div>Доставка</div>
			<div>
				<p><span>{{ $order->delivery_price }}</span>
					руб. по СПб и на транспортные компании.<br>
					Перевоз транспортными компаниями за счёт покупателя.
				</p>
				<p>* Доставка в пригород, подъём рассчитываются отдельно.</p>
			</div>
		</div>			
	@endif	
		<div style="border-bottom: solid black 1px;">
			<div><span>Сумма за работы: </span><span>{{ $order->services_sum }}</span><span> руб.</span></div>														
		</div>		
		<div style="border-bottom: solid black 1px;">
			<div><span>Общая сумма: </span><span>{{ $order->total_amount }}</span><span> руб.</span></div>														
		</div>
		<h3>Информация о покупателе</h3>
			<div class="customer">
				<div><span>Имя: </span><span>{{ $order->customer->name }}</span></div>
				<div><span>Телефон: </span><span>{{ empty($order->customer->phone) ? '' : $order->customer->phone }}</span></div>		
				@if ( isset($order->delivery_price) )
					<div><span>Адрес доставки: </span><span>{{ $order->customer->adres }}</span></div>
				@endif					
			</div>			
	</div>
	<div>Наш адрес: ул. Бабушкина д. 2, 1-й этаж, «Паркет-Ламинат».</div>
	<div>Телефоны: +7 (960) 243-23-82 | +7 (812) 365-41-80.</div>
</div>