<!DOCTYPE html>
<html>
	<head>	
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-154162914-1"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());

		  gtag('config', 'UA-154162914-1');
		</script>	
		<script src="https://www.google.com/recaptcha/api.js"></script>
		<link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}" />
		<link rel="stylesheet" type="text/css" href="{{ asset('css/mobile.css') }}" />		
		<meta charset="utf-8">	
		<meta name="robots" content="noindex">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">		
		<meta name="csrf-token" content="{{ csrf_token() }}">
		@if ($page->description)
			<meta name="description" content="{{ $page->description }}">
		@endif
		<title>{{ $page->title }}</title>
		<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />	
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script>
		document.createElement('template');
		</script> 		
		<script src="https://www.google.com/recaptcha/api.js?render=6LcKbdsZAAAAAOAj2d8DdAtWEm2JffGoz_N1Vosd"></script>
		<script src="{{ asset('js/main.js') }}" defer></script>
		<script src="{{ asset('js/modules/CartCategoriesWindow.js') }}" defer></script>		
		<script src="{{ asset('js/modules/CartCategories.js') }}" defer></script>
		<script src="{{ asset('js/modules/FieldMask.js') }}" defer></script>
		<script src="{{ asset('js/modules/Feedback.js') }}" defer></script>	
		<script src="{{ asset('js/modules/OpenFeedback.js') }}" defer></script>			
		<script src="{{ asset('js/views/templateView.js') }}" defer></script>		
	</head>
	<body>		
		<div class="wrapper">			
			<div class="mainContainer">
				<div class="main">						
					<div class="contentContainer">
						<div class="content">					
							<form class="cart order">
									<div class="table footing">
										<div><span>Общая сумма: </span><strong data-cart-window="total amount">{{ $total_amount }}</strong><span> руб.</span></div>
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
									</div>
									<div class="table footing">
										<div><span>Сумма за работы: </span><strong data-cart-window="service_sum">{{ $service_sum }}</strong><span> руб.</span></div>
										<div><span>Общая сумма: </span><strong data-cart-window="total amount">{{ $total_amount }}</strong><span> руб.</span></div>
									</div>										
								</form>														
						</div>
					</div>
				</div>
			</div>		
		</div>	
	</body>
</html>