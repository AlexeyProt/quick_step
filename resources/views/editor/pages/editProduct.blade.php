@extends('editor.layouts.default')

@section('content')
<script src="{{ asset('js/views/editor/editProductView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.imageWindow')
<div class="content">
	<h1>{{ $page->title }}</h1>
	<form name="productEditor">
		<input name="product[id]" value="{{ $product->id or '' }}" type="hidden">						
		<div>
			<label for="price_history[price]">Цена</label>
			<input name="price_history[price]" value="{{ $product->price->price_history->price or 0 }}">
		</div>		
		<div class="imageContainer" style="min-width: 500px;">
			<img data-name="product_images[][name]" data-image-name="{{ $product->image or '' }}" src="{{ isset($product->image) ? asset('/images/products/medium/'.$product->image) : asset('/images/image.svg') }}">
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