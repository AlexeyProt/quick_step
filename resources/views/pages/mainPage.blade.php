@extends('layouts.default')

@section('content')
<script src="{{ asset('js/views/mainPage.js') }}" defer></script>
@include('includes.cartWindow')

@include('includes.slider')
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
<div class="line" style="border-bottom: solid;background: linear-gradient(to bottom, #fff 0%,#edf5ff 100%);padding-bottom: 22px;">	
	<div>
		<p>Quick Step каждый день расширяет границы понимания того, что значит быть производителем напольного покрытия.</p>
		<p>Помимо требований к красоте и долговечности, мы также стремимся соответствовать принципам устойчивого развития и всеми возможными способами стараемся свести к минимуму воздействие на экологию.</p>
		<p>Так же, как и вы, мы убеждены что красота &ndash; это мир, в котором мы уважаем друг друга и бережно относимся к природным ресурсам.</p>
	</div>
</div>	
<div class="mainPageContainer">
	<div class="content" style="max-width: inherit;width: 100%;padding: 0;">
	@include('includes.imageShowMobile')
		<div class="line">
			<div></div>
			<div>
				<h2 style="text-align: center; font-size:32px;">Ламинат</h2>
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
							<g fill="white" stroke="#363535" stroke-width="0.02">
								<polygon points="7.1,0.1 2.5,0.1 0.1,4.1 2.5,8.1 7.1,8.1 9.4,4.1 " style="fill: white;stroke: none;" transform="scale(0.1) translate(0 1)"></polygon>
							</g>
						</mask>
						
						<mask maskContentUnits="objectBoundingBox" id="circleMask">
							<g fill="white" stroke="#363535" stroke-width="0.02">
								<circle style="fill: white;stroke: none;" transform="scale(1) translate(0.5 0.5)" r="0.45"></circle>
							</g>
						</mask>	

						<mask maskContentUnits="objectBoundingBox" id="rectMask">
							<g fill="white" stroke="#363535" stroke-width="0.02">
								<rect style="fill: white;stroke: none;" width="0.9" height="0.9" transform="scale(1) translate(0.05 0.05)"></rect>
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
					@foreach ( $laminates as $laminate )
						<div class="category">
							<a href="{{ url(isset( $laminate->categories_view ) ? $laminate->categories_view->page->uri : $laminate->products_view->page->uri) }}" class="icon">
								<div class="imageContainer">
									
									<svg viewBox="0 5 95 95" width="220" height="220">
										<g fill="url(#iconsGrad)" mask="url(#iconsMask)">
											<rect width="100" height="100" x="0" y="0" style="fill: #999;"></rect>
											<defs>
												<image id="{{ $laminate->name }}" xlink:href="{{ asset('images/categories/mini/'.$laminate->category_image->name) }}" x="0" y="0" width="100" height="100"/>
											</defs>							
											<use xlink:href="#{{ $laminate->name }}" filter="url(#blur5)"/>    
											<use xlink:href="#{{ $laminate->name }}" filter="url(#blur4)"/>    
											<use xlink:href="#{{ $laminate->name }}" filter="url(#blur3)"/>    
											<use xlink:href="#{{ $laminate->name }}" filter="url(#blur2)"/>    
											<use xlink:href="#{{ $laminate->name }}" filter="url(#blur1)"/>    
											<use xlink:href="#{{ $laminate->name }}"/>								
											<polygon data-name="anim" fill-opacity="0" points="7.1,0.1 2.5,0.1 0.1,4.1 2.5,8.1 7.1,8.1 9.4,4.1 " style="fill: #000;stroke: white;opacity: 0.5;" transform="scale(10) translate(0 1)"></polygon>
											@if ($laminate->moisture_resistance)
												<image xlink:href="{{ asset('images/moisture-resistance.png') }}" width="15" height="15" y="70" x="41"/>
											@endif								
										</g>
									</svg>
								</div>
								<h4>{{ $laminate->name }}</h4>
								<span style="font-weight:normal;">
									<span>Толщина {{ $laminate->thickness }} мм</span><br>
									<span>Класс {{ $laminate->class }}</span><br>
									@if ($laminate->plank)
										<span>{{ $laminate->plank }} планка</span>
									@endif
								</span><br>
								@if ($laminate->discount_price_per_square_meter)
									<span>
										<span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> 
										<span style="text-decoration:line-through; font-size:12px;">{{ $laminate->price_per_square_meter }}</span> <span style="color:#ec008c;"> {{ $laminate->discount_price_per_square_meter }} руб.</span>
									</span>
								@else
									<span><span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> 
										{{ $laminate->price_per_square_meter }} руб.							
									</span>
								@endif
							</a>				
						</div>
					@endforeach
				</div>
			</div>
			<div>
				<a href="{{ url('ustoychivost-k-pyatnam-i-tsarapinam') }}">
					<img src="/images/scratchguard.png" alt="Устойчивость к пятнам и царапинам" title="Устойчивость к пятнам и царапинам" style="border:none;">
				</a>
				<br>
				<a href="{{ url('25-let-garantii') }}">
					<img src="/images/25-year-warranty.png" alt="25 лет гарантии" title="25 лет гарантии" style="border:none;">
				</a>
				<br>
				<img data-name="show" src="/images/products/mini/obraztsy-laminata.png" alt="Образцы представлены в салоне на Бабушкина 2" title="Образцы представлены в салоне на Бабушкина 2" style="border:none; width: 90px;">					
			</div>	
		</div>
		
		<div class="line">
			<div></div>
			<div>
				<h2 style="text-align: center; font-size:32px;">Винил</h2>
				<div class="productsList">
					@foreach ( $vinils as $vinil )
						<div class="category">
							<a href="{{ url(isset( $vinil->categories_view ) ? $vinil->categories_view->page->uri : $vinil->products_view->page->uri) }}" class="icon">
								<div class="imageContainer">
									
									<svg viewBox="0 5 95 95" width="220" height="220">
										<g fill="url(#iconsGrad)" mask="url(#circleMask)">
											<rect width="100" height="100" x="0" y="0" style="fill: #999;"></rect>
											<defs>
												<image id="{{ $vinil->name }}" xlink:href="{{ asset('images/categories/mini/'.$vinil->category_image->name) }}" x="0" y="0" width="100" height="100"/>
											</defs>							
											<use xlink:href="#{{ $vinil->name }}" filter="url(#blur5)"/>    
											<use xlink:href="#{{ $vinil->name }}" filter="url(#blur4)"/>    
											<use xlink:href="#{{ $vinil->name }}" filter="url(#blur3)"/>    
											<use xlink:href="#{{ $vinil->name }}" filter="url(#blur2)"/>    
											<use xlink:href="#{{ $vinil->name }}" filter="url(#blur1)"/>    
											<use xlink:href="#{{ $vinil->name }}"/>								
											<circle data-name="anim" fill-opacity="0" style="fill: #000;stroke: white;opacity: 0.5;" r="4.5" transform="scale(10) translate(5 5)"></circle>
											@if ($vinil->moisture_resistance)
												<image xlink:href="{{ asset('images/moisture-resistance.png') }}" width="15" height="15" y="73" x="42"/>
											@endif								
										</g>
									</svg>
								</div>
								<h4>{{ $vinil->name }}</h4>
								<span style="font-weight:normal;">
									<span>Толщина {{ $vinil->thickness }} мм</span><br>
									<span>Класс {{ $vinil->class }}</span><br>
									@if ($vinil->plank)
										<span>{{ $vinil->plank }} планка</span>
									@endif
								</span><br>
								@if ($vinil->discount_price_per_square_meter)
									<span>
										<span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> 
										<span style="text-decoration:line-through; font-size:12px;">{{ $vinil->price_per_square_meter }}</span> <span style="color:#ec008c;"> {{ $vinil->discount_price_per_square_meter }} руб.</span>
									</span>
								@else
									<span><span style="font-weight:normal;">Цена за 1м<sup>2</sup></span> {{ $vinil->price_per_square_meter }} руб.</span>
								@endif
							</a>				
						</div>
					@endforeach
				</div>
			</div>
			<div>
				<a href="{{ url('ustoychivost-k-pyatnam-i-tsarapinam') }}">
					<img src="/images/scratchguard.png" alt="Устойчивость к пятнам и царапинам" title="Устойчивость к пятнам и царапинам" style="border:none;">
				</a>
				<br>
				<a href="{{ url('25-let-garantii') }}">
					<img src="/images/25-year-warranty.png" alt="25 лет гарантии" title="25 лет гарантии" style="border:none;">
				</a>	
				<br>
				<img data-name="show" src="/images/products/mini/obraztsy-vinila.png" alt="Образцы представлены в салоне на Бабушкина 2" title="Образцы представлены в салоне на Бабушкина 2" style="border:none; width: 90px;">				
			</div>	
		</div>

		<div class="line">
			<div></div>
			<div>
				<h2 style="text-align: center; font-size:32px;">Паркетная доска</h2>
				<div class="productsList">
					@foreach ( $parquets as $parquet )
						<div class="category">
							<a href="{{ url(isset( $parquet->categories_view ) ? $parquet->categories_view->page->uri : $parquet->products_view->page->uri) }}" class="icon">
								<div class="imageContainer">
									
									<svg viewBox="0 5 95 95" width="220" height="220">
										<g fill="url(#iconsGrad)" mask="url(#rectMask)">
											<rect width="100" height="100" x="0" y="0" style="fill: #999;"></rect>
											<defs>
												<image id="{{ $parquet->name }}" xlink:href="{{ asset('images/categories/mini/'.$parquet->category_image->name) }}" x="0" y="0" width="100" height="100"/>
											</defs>							
											<use xlink:href="#{{ $parquet->name }}" filter="url(#blur5)"/>    
											<use xlink:href="#{{ $parquet->name }}" filter="url(#blur4)"/>    
											<use xlink:href="#{{ $parquet->name }}" filter="url(#blur3)"/>    
											<use xlink:href="#{{ $parquet->name }}" filter="url(#blur2)"/>    
											<use xlink:href="#{{ $parquet->name }}" filter="url(#blur1)"/>    
											<use xlink:href="#{{ $parquet->name }}"/>								
											<rect data-name="anim" fill-opacity="0" style="fill: #000;stroke: white;opacity: 0.5;" width="9" height="9" transform="scale(10) translate(0.5 0.5)"></rect>
											@if ($parquet->moisture_resistance)
												<image xlink:href="{{ asset('images/moisture-resistance.png') }}" width="15" height="15" y="70" x="41"/>
											@endif								
										</g>
									</svg>
								</div>
								<h4>{{ $parquet->name }}</h4>
								<span style="font-weight:normal;">
									<span>Толщина {{ $parquet->thickness }} мм</span><br>
									@if ($parquet->plank)
										<span>{{ $parquet->plank }} планка</span>
									@endif
								</span><br>
								@if ($parquet->discount_price_per_square_meter)
									<span>
										<span style="font-weight:normal;">Цена за 1м<sup>2</sup> от </span> 
										<span style="text-decoration:line-through; font-size:12px;">{{ $parquet->price_per_square_meter }}</span> <span style="color:#ec008c;"> {{ $parquet->discount_price_per_square_meter }} руб.</span>
									</span>
								@else
									<span><span style="font-weight:normal;">Цена за 1м<sup>2</sup> от </span> {{ $parquet->price_per_square_meter }} руб.</span>
								@endif
							</a>				
						</div>
					@endforeach
					
				</div>
			</div>	
			<div>
				<a href="{{ url('25-let-garantii') }}">
					<img src="/images/25-year-warranty.png" alt="25 лет гарантии" title="25 лет гарантии" style="border:none;">
				</a>				
			</div>				
			<div class="back" style="width: inherit;grid-column-start: 3;grid-row-start: 2; padding:0">
				<a  href="{{ url()->previous() }}">Вернуться назад</a>
			</div>		
		</div>
	</div>
</div>

<div class="line">	
	<div>{!! $page->content !!}</div>
	@include('includes.imageShowMobile')
</div>

@endsection