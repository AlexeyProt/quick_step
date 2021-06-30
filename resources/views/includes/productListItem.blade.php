<div class="product">
@if ($product->product_view)
	<a data-page="uri" href="{{ (isset($product->product_view->page->uri)) ? url($product->product_view->page->uri) : '' }}" class="icon">				
@else
	<a data-page="uri" href="{{ (isset($product->laminate_products_view->page->uri)) ? url($product->laminate_products_view->page->uri) : '' }}" class="icon">
@endif	
		<div class="imageContainer">		
			<svg viewBox="0 0 100 100" width="220" height="220">
				<g fill="url(#productGrad)" mask="url(#productMask)">
					<rect x="0" y="0" width="100" height="100" fill="none"></rect>
						<image data-image="name" xlink:href="{{ (isset($product->product_images[0])) ? asset('images/products/mini/'.$product->product_images[0]->name) : '' }}" preserveAspectRatio="xMidYMid slice" x="5" y="5" width="90" height="90" transform="scale(1) translate(0, 0)"></image>							
					<rect data-name="anim" x="0" y="0" width="100" height="100" stroke="none" stroke-width="3px" fill-opacity="0"></rect>
					@if ($product->category && $product->category->moisture_resistance)
						<image xlink:href="{{ asset('images/moisture-resistance.png') }}" width="15" height="15" y="80" x="70"/>
					@endif									
				</g>
			</svg>
		</div>
		<h4 data-product="name">{{ $product->name or '' }}</h4>
		
		
		<span class="characteristics" style="font-weight:normal;">
			@if (isset($product->product_characteristics_assoc['Назначение']))
				<span><span class="bright">Назначение:</span><br> <span>{{ $product->product_characteristics_assoc['Назначение']->value }}</span></span><br>
			@endif
			@if (isset($product->product_characteristics_assoc['Вид материала']))
				<span><span class="bright">Вид материала:</span><br> <span>{{ $product->product_characteristics_assoc['Вид материала']->value }}</span></span><br>
			@endif			
		</span>
		
		@if ($product->discount_price_per_square_meter) 
			<p><span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> <span data-product="price_per_square_meter" style="text-decoration:line-through; font-size:12px;">{{ $product->price_per_square_meter }}</span> <span style="color:#ec008c;"> {{ $product->discount_price_per_square_meter }} руб.</span></p>
		@else
			@if ($product->product_view)
				<p><span style="font-weight:normal;">Цена за <span data-unit="reduction">{!! $product->product_view->unit->reduction !!}</span>:</span> <span data-price_history="price">{{ $product->price->price_history->price }}</span> руб.</p>
			@elseif ($product->laminate_products_view)
				<p><span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> {{ $product->price_per_square_meter or '' }} руб.</p>
			@else
				<p><span style="font-weight:normal;">Цена за <span data-unit="reduction"></span>:</span> <span data-price_history="price"></span> руб.</p>
			@endif
		@endif
	</a>

	<div class="openButton" data-cart-id="{{ $product->id }}" data-cart-category-name="Пол">
		<div class="innerContainer">
			<div>Купить</div>
		</div>
	</div>	
</div>