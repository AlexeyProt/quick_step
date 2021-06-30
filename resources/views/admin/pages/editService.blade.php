@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/editServiceView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.imageWindow')
<div class="content">
	<h1>{{ $page->title }}</h1>
	<form name="serviceEditor">
		<input name="service[id]" value="{{ $service->id or '' }}" type="hidden">		
		<div>
			<label for="service[name]">Название</label>
			<input name="service[name]" value="{{ $service->name or '' }}">
		</div>				
		<div>
			<label for="service_price_history[price]">Цена</label>
			<input name="service_price_history[price]" value="{{ $service->service_price->service_price_history->price or 0 }}">
		</div>		

		<div class="progressContainer"></div>
		
		<div class="buttons">
			<p class="notice"></p>
			<div class="button" data-button="sendData">
				<div class="innerContainer">Сохранить</div>
			</div>
			<div class="button" data-button="cancel">
				<div class="innerContainer">Отменить</div>
			</div>				
			<div class="button" data-button="updateFields">
				<div class="innerContainer">Обновить данные</div>
			</div>
			<div class="button" data-button="destroy">
				<div class="innerContainer">Удалить</div>
			</div>			
		</div>
	</form>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection