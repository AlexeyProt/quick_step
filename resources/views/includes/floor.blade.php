<div class="floor">
	<div id="laminate">
		@if ($products['Пол']->discount_price_per_square_meter)
			<p class="price">
				Цена за м<sup>2</sup> 
				<span>
					<span style="text-decoration:line-through; font-size:23px;">{{ $products['Пол']->price_per_square_meter }}</span> <span style="color:#ec008c;"> {{ $products['Пол']->discount_price_per_square_meter }} руб.</span>
				</span>
			</p>
		@else
			<p class="price">Цена за м<sup>2</sup> <span>{{ $products['Пол']->price_per_square_meter }} руб.</span></p>
		@endif
		<div class="row">
			<div>Введите площадь:</div>
			<div>
				<input data-packs-calculator="area" value="{{ $products['Пол']->packing_area }}">
			</div>
		</div>
		
		<div class="row" data-packs-calculator="margin">
			<div>Запас:</div>
			<div>
				<div>		
					<label>
						<input data-cart-service-id="4" type="radio" name="margin" value="0" checked>
						<span>без запаса</span>
					</label>
				</div>
				<div>		
					<label>
						<input data-cart-service-id="2" type="radio" name="margin" value="5">
						<span>+5% Прямая укладка</span>
					</label>
				</div>	
				<div>		
					<label>
						<input data-cart-service-id="3" type="radio" name="margin" value="10">
						<span>+10% Диагональная укладка</span>
					</label>
				</div>	
			</div>
		</div>
		
		<div class="row">
			<div>В одной упаковке:</div>
			<div>
				<span data-packs-calculator="packing_area">{{ $products['Пол']->packing_area }}</span> м<sup>2</sup>
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
		
		@if ($products['Пол']->promotional_product)
			<div data-packs-calculator="discountContainer" class="row">
				<div><strong>Ваша скидка: <span data-packs-calculator="discount">{{$products['Пол']->promotional_product->discount or 0}}</span>%</strong></div>
				<div><span style="font-size:15px;">Сумма скидки: </span><span data-packs-calculator="discountAmount">0</span> руб.</div>
			</div>
		@endif
		
		<div class="row">			
			<div>Сумма за напольное покрытие:</div>
			<div>
				<span data-packs-calculator="price" data-packs-calculator-price="{{ $products['Пол']->price->price_history->price }}">{{ $products['Пол']->price->price_history->price }}</span> руб.
				<span style="font-size:15px;">(кратно упаковкам)</span>
			</div>
		</div>
	</div>
	
	@if ( isset($products['Подложка']) )
		<div class="relatedProduct cartProduct">
			<div class="row">
				<div><strong>Заказать подложку:</strong></div>
				<div>
					<select data-related-product-calculator="id" data-cart-related-product="id" size="1">
						<option value="">Без подложки</option>
						@foreach ($products['Подложка'] as $product)
							<option value="{{ $product->id }}">{{ $product->name }}</option>
						@endforeach
					</select>	

				</div>
			</div>		
			
			<div data-related-product-calculator="priceContainer">
				<div  class="row">
					<div>Цена за 1 м<sup>2</sup></div>
					<div>
						<span data-related-product-calculator="price_per_square_meter">0</span> руб.
					</div>
				</div>		
				
				<div class="substrate row">
					<div>Количество упаковок:</div>
					<div>
						<span data-related-product-calculator="quantity" data-cart-related-product="quantity">0</span>
					</div>
				</div>		
				
				<div id="substrate"  class="row">
					<div>Сумма за подложку:</div>
					<div>
						<span data-related-product-calculator="price">0</span> руб.
						@foreach ($products['Подложка'] as $product)
							<input type="hidden" data-related-product-calculator-price_per_square_meter-id="{{ $product->id }}" value="{{ $product->price_per_square_meter }}">
							<input type="hidden" data-related-product-calculator-price-id="{{ $product->id }}" value="{{ $product->price->price_history->price }}">
							<input type="hidden" data-related-product-calculator-packing_area-id="{{ $product->id }}" value="{{ $product->packing_area }}">
						@endforeach	
					</div>
				</div>		
			</div>
		</div>
	@endif
	
	@if ( isset($products['Герметик']) )
		<div class="relatedProduct cartProduct">
			<div class="row">
				<div><strong>Заказать герметик:</strong></div>
				<div>
					<select data-related-product-calculator="id" data-cart-related-product="id" size="1">
						<option value="">Без герметика</option>
						<option value="{{ $products['Герметик']->id }}">{{ $products['Герметик']->name }}</option>
					</select>	
				</div>
			</div>		
			
			<div data-related-product-calculator="priceContainer">
				<div  class="row">
					<div>Цена за 1 тюбик:</div>
					<div>
						<span data-related-product-calculator="price_per_pack">0</span> руб.
					</div>
				</div>			
		
				<div class="substrate row">
					<div>Количество тюбиков:</div>
					<div data-related-product-calculator="quantityVidjet" class="quantityVidjet">
						<span>-</span>
						<span data-related-product-calculator="quantity" data-cart-related-product="quantity" data-module="quantityVidjet" contenteditable="true">0</span>
						<span>+</span>
					</div>						
				</div>	
		
				<div id="sealant" class="row">
					<div>Сумма за герметик:</div>
					<div>
						<span data-related-product-calculator="price">0</span> руб.
						<input type="hidden" data-related-product-calculator-price_per_pack-id="{{ $products['Герметик']->id }}" value="{{ $products['Герметик']->price->price_history->price }}">
						<input type="hidden" data-related-product-calculator-price-id="{{ $products['Герметик']->id }}" value="{{ $products['Герметик']->price->price_history->price }}">
						<input type="hidden" data-related-product-calculator-packing_area-id="{{ $products['Герметик']->id }}" value="{{ $products['Герметик']->packing_area }}">				
					</div>
				</div>		
			</div>
		</div>	
	@endif
	
	<div class="cartProduct" id="plinth">
		<div class="row" style="text-align: center;display: block;">
			<input data-plinth-calculator="buy plinth" type="checkbox" id="buyPlinth" name="plinth">
			<div style="display: inline;"><label for="buyPlinth">Купить {{ $products['Плинтус']->name }}</label></div>
		</div>	
		
		<template id="plinthCharact">
			<div data-cart-related-product="id" data-cart-related-product-id="{{ $products['Плинтус']->id }}" class="plinthCharact">
				<div class="row">
					<div>Цена за пог. м:</div>
					<div>
						<span data-plinth-calculator="price_per_meter">{{ $products['Плинтус']->price_per_meter }}</span> руб.
					</div>
				</div>	
				
				<div class="row">
					<div>Введите периметр:</div>
					<div>
						<input data-plinth-calculator="perimeter" value="">
					</div>
				</div>		

				<div class="row">
					<div>Длина плинтуса:</div>
					<div>
						<span data-plinth-calculator="length">{{ $products['Плинтус']->length }}</span> м
					</div>
				</div>	

				<div class="row">
					<div>Количество штук:</div>
					<div data-plinth-calculator="quantityVidjet" class="quantityVidjet">
						<span>-</span>
						<span data-plinth-calculator="quantity" data-module="quantityVidjet" data-cart-related-product="quantity" contenteditable="true">0</span>
						<span>+</span>
					</div>		
				</div>
				
				<div class="row">
					<div>Сумма за плинтусы:</div>
					<div>
						<span data-plinth-calculator="price" data-plinth-calculator-price="{{ $products['Плинтус']->price->price_history->price }}">0</span> руб.
						<span style="font-size:15px;">(за количество штук)</span>
					</div>
				</div>	
			</div>
		</template>	
	</div>	
	
	<div id="mounting">
		<div class="row" style="text-align: center;display: block;">
			<input data-mounting="order_mounting" type="checkbox" id="orderMounting">
			<div style="display: inline;"><label for="orderMounting">Рассчитать работы</label></div>
		</div>	
		
		<div id="mountingServices">
			<div class="row" style="grid-template-columns: 2fr;text-align: center;">
				<span>Минимальная стоимость работ: 5000 руб.</span>
			</div>		
			
			<div id="mountingLaminate" class="cartService">
				<div class="row">
					<div><strong>Монтаж напольного покрытия:</strong></div>
					<div>
						<select data-packs-calculator="mounting" data-cart-service="id" size="1">
							<option value="">Без монтажа</option>
							@foreach ($category_services['Пол'] as $category_service)
								@if ($category_service->children)
									@foreach ($category_service->children as $child)
										<option value="{{ $child->service->id }}">{{ $child->service->name }}</option>
									@endforeach
								@endif							
								<option value="{{ $category_service->service->id }}">{{ $category_service->service->name }}</option>
							@endforeach
						</select>	
						<input data-packs-calculator="mounting area" data-cart-service="quantity" value="0" type="hidden">
					</div>		
				</div>		
			
				<div class="mountingPrice">
					<div class="row">
						<div>Цена за 1 м<sup>2</sup> работ</div>
						<div>
							<span data-packs-calculator="mounting_price_per_unit">0</span> руб.
						</div>
					</div>		
					
					<div class="row">
						<div>Сумма за монтаж:</div>
						<div>
							<span data-packs-calculator="mounting price">0</span> руб.
							@foreach ($category_services['Пол'] as $category_service)
								@if ($category_service->children)
									@foreach ($category_service->children as $child)
										<input type="hidden" data-packs-calculator-service-price-id="{{ $child->service->id }}" value="{{ $child->service->service_price->service_price_history->price }}">
									@endforeach
								@endif
								<input type="hidden" data-packs-calculator-service-price-id="{{ $category_service->service->id }}" value="{{ $category_service->service->service_price->service_price_history->price }}">
							@endforeach	
						</div>
					</div>	
				</div>
			</div>
			
			<div id="mountingPlinth" class="cartService">
				<div class="row">
					<div><strong>Монтаж плинтуса:</strong></div>
					<div>
						<select data-plinth-calculator="mounting" data-cart-service="id" size="1">
							<option value="">Без монтажа</option>
							@foreach ($category_services['Плинтус'] as $category_service)
								<option value="{{ $category_service->service->id }}">{{ $category_service->service->name }}</option>
							@endforeach
						</select>	
					</div>		
				</div>		
				<div class="mountingPlinthPrice">
					<div class="row">
						<div>Введите периметр:</div>
						<div>
							<input data-plinth-calculator="mounting perimeter" value="">
							<input data-plinth-calculator="mounting quantity" data-cart-service="quantity" type="hidden" value="0">
						</div>
					</div>			
				
					<div class="row">
						<div>Цена за 1 м работ</div>
						<div>
							<span data-plinth-calculator="mounting_price_per_unit">0</span> руб.
						</div>
					</div>					
					
					<div class="row">
						<div>Сумма за монтаж:</div>
						<div>
							<span data-plinth-calculator="mounting price">0</span> руб.
							@foreach ($category_services['Плинтус'] as $category_service)
								<input type="hidden" data-plinth-calculator-service-price-id="{{ $category_service->service->id }}" value="{{ $category_service->service->service_price->service_price_history->price }}">
							@endforeach	
						</div>
					</div>	
				</div>
			</div>	
			
			<div>
				<div class="row">
					<div>Сумма за работы:</div>
					<div>
						<span data-price-calculator="service_sum">0</span> руб.
					</div>
				</div>
			</div>				
			
		</div>
	</div>

	
	<div>
		<div class="row">
			<div>Общая сумма:</div>
			<div>
				<span data-price-calculator="total price">0</span> руб.
			</div>
		</div>
	</div>	
	
	<div>
		<div class="floorButton">
			@if ($products['Пол']->product_stock->quantity)		
				<div class="openButton" data-cart-id="{{ $products['Пол']->id }}" data-cart-category-name="Пол">
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