@extends('layouts.default')

@section('content')
<script src="{{ asset('js/modules/Tree.js') }}" defer></script>
<script src="{{ asset('js/modules/Snackbar.js') }}" defer></script>
<script src="{{ asset('js/modules/State.js') }}" defer></script>
<script src="{{ asset('js/modules/builders/ProductBuilder.js') }}" defer></script>
<script src="{{ asset('js/modules/Pagination.js') }}" defer></script>
<script src="{{ asset('js/modules/loaders/Filter.js') }}" defer></script>
<script src="{{ asset('js/views/categoriesView.js') }}" defer></script>
@include('includes.cartWindow')
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
<div class="mainPageContainer">
	<div class="content">
		@include('includes.imageShowMobile')
		<div class="line" style="border:none;">
			<div></div>
			@if ($category->name == 'Ламинат')
				<div>@include('includes.laminateCategories')</div>
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
			@elseif ($category->name == 'Винил')
				<div>@include('includes.vinilCategories')</div>
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
			@elseif ($category->name == 'Паркетная доска')
				<div>@include('includes.parquetCategories')</div>
				<div>
					<a href="{{ url('25-let-garantii') }}">
						<img src="/images/25-year-warranty.png" alt="25 лет гарантии" title="25 лет гарантии" style="border:none;">
					</a>				
				</div>					
			@endif
		</div>
		@yield('textContent')
	</div>
	<div class="back">
		<a  href="{{ url()->previous() }}">Вернуться назад</a>
	</div>
</div>
@endsection