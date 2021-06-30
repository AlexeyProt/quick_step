@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/editGroupProductView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.imageWindow')
<div class="content">
	<h1>{{ $page->title }}</h1>
	<form name="groupProductEditor">
		<input name="product[id]" value="{{ $product->id or '' }}" type="hidden">
		<select name="group_product[product_group_id]" size="1" style="width: 300px;">
			<option disabled>Выберите группу товаров</option>
			@foreach ($product_groups as $product_group)
				<option value="{{ $product_group->id }}">{{ $product_group->name }}</option>
			@endforeach
		</select>			
		<select name="product[category_id]" size="1" style="width: 300px;">
			<option disabled>Выберите категорию</option>
			@foreach ($categories as $category)
				<option value="{{ $category->id }}">{{ $category->name }}</option>
			@endforeach
		</select>		
		<div class="table" style="margin: 10px 0px;">
			<div>В наличии: </div>
			<div class="quantityVidjet">
				<span>-</span>
				<span data-name="product_stock[quantity]" data-module="quantityVidjet" contenteditable="true">{{ $product->product_stock->quantity or 0 }}</span>
				<span>+</span>
			</div>				
		</div>

		<div class="imageContainer" style="display:block; margin:auto; max-width:500px; cursor:pointer;">
			<h1 data-name="product[name]" contenteditable="true">{{ $product->name or ' ' }}</h1>
					<img data-name="product_images[][name]" data-image-name="{{ $product->image or '' }}" src="{{ isset($product->image) ? asset('/images/products/medium/'.$product->image) : asset('/images/image.svg') }}">
			<p><span data-name="price_history[price]" data-module="quantityVidjet" contenteditable="true">{{ $product->price->price_history->price or 0 }}</span> руб.</p>
			<div class="miniCont">
			@for($i = 1, $size = (isset($product->product_images)) ? count($product->product_images) : 0; $size > 1, $i < $size; ++$i)
				<img data-name="product_images[][name]" data-image-name="{{ $product->product_images[$i]->name }}" src="{{ asset('/images/products/mini/'.$product->product_images[$i]->name) }}">
			@endfor
			</div>
		</div>

		<div class="buttons">
			<p class="notice"></p>
			<div class="button" data-button="sendData">
				<div class="innerContainer">Сохранить</div>
			</div>
			<div class="button" data-button="cancel">
				<div class="innerContainer">Отменить</div>
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