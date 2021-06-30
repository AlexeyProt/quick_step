<div class="header">
	<div class="phones" data-device="decktop">
		@php include('images/phoneIcon.svg') @endphp
	
		<div>
			@include('includes.phone', ['phoneNumber' => '+7 (960) 243-23-82'])
			@include('includes.phone', ['phoneNumber' => '+7 (812) 365-41-80'])
			
			<div class="openButton" data-open="feedback" style="height: 29px;">
				<div class="innerContainer">
					<div>Заказать звонок</div>			
				</div>
			</div>							
		</div>
	
	
	</div>
	<div data-device="decktop">
		<div class="adres">
			@include('includes.adres', ['adres' => 'Санкт-Петербург'])		
			@include('includes.adres', ['adres' => 'ул. Бабушкина д. 2'])
			@include('includes.adres', ['adres' => '1-й этаж, «Паркет-Ламинат»'])
		</div>		
	</div>			
	<div class="innerContainer" >
		<div data-device="decktop">
			<a href="{{ url('') }}">
				<img src="{{ asset('images/logo.png') }}" style="width:300px; border:none;">
			</a>
		</div>	
		<div data-device="mobile">		
			@include('includes.phoneMobile', ['phoneNumber' => '+7 (960) 243-23-82'])
			@include('includes.phoneMobile', ['phoneNumber' => '+7 (812) 365-41-80'])
			
			<a href="tel:+79602432382">
				<div class="openButton" style="height: 29px;">				
					<div class="innerContainer">
						<div>Позвонить</div>			
					</div>				
				</div>	
			</a>			
			
			<div class="openButton" data-open="feedback" style="height: 29px;">
				<div class="innerContainer">
					<div>Заказать звонок</div>			
				</div>
			</div>						
		</div>
		<div data-device="mobile" style="margin-top: 8px;">
			<div class="mobileAdres">
				@include('includes.adresMobile', ['phoneNumber' => 'Санкт-Петербург'])		
				@include('includes.adresMobile', ['phoneNumber' => 'ул. Бабушкина д. 2'])		
				@include('includes.adresMobile', ['phoneNumber' => '1-й этаж, «Паркет-Ламинат»'])	
			</div>
			<a style="display: none;" href="{{ url('aktsyya') }}"><img style="border:none; height: 47px;vertical-align: middle;" src="{{ asset('images/aktsyya.svg') }}"></a>
		</div>	

	</div>	
	<div style="display:none; text-align: center;font-size: 25px;font-weight: bold;"><a style="color: #ec008c;"href="{{ url('aktsyya') }}">Скидка на ламинат Quick-Step Eligna и Quick-Step Classic</a></div>
</div>
