	<h1>{{ $category->name }}</h1>
	<svg style="position: absolute;width: 0;height: 0;left: 0;top: 0;">
		<defs>
			<radialGradient gradientUnits="objectBoundingBox" cx="0.5" cy="0.5" id="iconsGradRad" r="0.4">
				<stop offset="0" stop-color="#fff"></stop>
				<stop stop-color="#fff" offset="0.1"></stop>
				<stop stop-color="#fff" stop-opacity="0.5" offset="0.9"></stop>
				<stop offset="1" stop-color="#000" stop-opacity="0.9"></stop>
			</radialGradient>		
			<linearGradient gradientUnits="objectBoundingBox" id="iconsGrad">
				<stop offset="0" stop-color="#000"></stop>
				<stop offset="0.1" stop-color="#000" stop-opacity="0.1"></stop>
				<stop stop-color="#fff" offset="0.5" stop-opacity="0"></stop><stop offset="0.9" stop-color="#000" stop-opacity="0.1"></stop>
				<stop offset="1" stop-color="#000" stop-opacity="1"></stop>
			</linearGradient>		
			
			<mask maskContentUnits="objectBoundingBox" id="iconsMask">
				<g data-name="Слой 4" fill="white" stroke="#363535" stroke-width="0.02">
					<polygon points="7.1,0.1 2.5,0.1 0.1,4.1 2.5,8.1 7.1,8.1 9.4,4.1 " style="fill: white;stroke: none;" transform="scale(0.1) translate(0 1)"></polygon>
				</g>
			</mask>
			
			<filter id="blur5"><feGaussianBlur in="SourceGraphic" stdDeviation="5"/></filter>
			<filter id="blur4"><feGaussianBlur in="SourceGraphic" stdDeviation="4"/></filter>
			<filter id="blur3"><feGaussianBlur in="SourceGraphic" stdDeviation="3"/></filter>
			<filter id="blur2"><feGaussianBlur in="SourceGraphic" stdDeviation="2"/></filter>
			<filter id="blur1"><feGaussianBlur in="SourceGraphic" stdDeviation="1"/></filter>			
		</defs>				
	</svg>
	<div class="productsList">
		@foreach ( $childCategories as $childCategory )
			<div class="category">
				<a href="{{ url(isset( $childCategory->categories_view ) ? $childCategory->categories_view->page->uri : $childCategory->products_view->page->uri) }}" class="icon">
					<div class="imageContainer">
						
						<svg viewBox="0 5 95 95" width="220" height="220">
							<g fill="url(#iconsGrad)" mask="url(#iconsMask)">
								<rect width="100" height="100" x="0" y="0" style="fill: #999;"></rect>
								<defs>
									<image id="{{ $childCategory->name }}" xlink:href="{{ asset('images/categories/mini/'.$childCategory->category_image->name) }}" x="0" y="0" width="100" height="100"/>
								</defs>							
								<use xlink:href="#{{ $childCategory->name }}" filter="url(#blur5)"/>    
								<use xlink:href="#{{ $childCategory->name }}" filter="url(#blur4)"/>    
								<use xlink:href="#{{ $childCategory->name }}" filter="url(#blur3)"/>    
								<use xlink:href="#{{ $childCategory->name }}" filter="url(#blur2)"/>    
								<use xlink:href="#{{ $childCategory->name }}" filter="url(#blur1)"/>    
								<use xlink:href="#{{ $childCategory->name }}"/>																	
								<polygon data-name="anim" fill-opacity="0" points="7.1,0.1 2.5,0.1 0.1,4.1 2.5,8.1 7.1,8.1 9.4,4.1 " style="fill: #000;stroke: white;opacity: 0.5;" transform="scale(10) translate(0 1)"></polygon>
								@if ($childCategory->moisture_resistance)
									<image xlink:href="{{ asset('images/moisture-resistance.png') }}" width="15" height="15" y="70" x="41"/>
								@endif									
							</g>
						</svg>
					</div>
					<h4>{{ $childCategory->name }}</h4>
					<span style="font-weight:normal;">
						<span>Толщина {{ $childCategory->thickness }} мм</span><br>
						<span>Класс {{ $childCategory->class }}</span><br>
						@if ($childCategory->plank)
							<span>{{ $childCategory->plank }} планка</span>
						@endif
					</span><br>
					<span>
						<span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> 
						@if ($childCategory->discount_price_per_square_meter)
							<span style="text-decoration:line-through; font-size:12px;">{{ $childCategory->price_per_square_meter }}</span> <span style="color:#ec008c;"> {{ $childCategory->discount_price_per_square_meter }} руб.</span>
						@else		
							{{ $childCategory->price_per_square_meter }} руб.
						@endif
					</span>					
				</a>				
			</div>
		@endforeach
	</div>