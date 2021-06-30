@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/editPlinthView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.imageWindow')
<div class="content">
	<h1>{{ $page->title }}</h1>
	<form name="productEditor">
		<input name="product[id]" value="{{ $product->id or '' }}" type="hidden">
		<select name="product[category_id]" size="1" style="width: 300px;">
			<option disabled>Выберите категорию</option>
			@foreach ($categories as $category)
				<option value="{{ $category->id }}">{{ $category->name }}</option>
			@endforeach
		</select>	

		<select name="product[unit_id]" size="1" style="width: 300px;">
			<option disabled>Единица измерения</option>
			@foreach ($units as $unit)
				<option value="{{ $unit->id }}">{{ $unit->name }}</option>
			@endforeach
		</select>		
		
		<div>
			<label for="product[vendor_code]">Артикул</label>
			<input name="product[vendor_code]" value="{{ $product->vendor_code or $defaultVendorCode }}">
		</div>		
		
		<div class="table" style="margin: 10px 0px;">
			<div>В наличии: </div>
			<div class="quantityVidjet">
				<span>-</span>
				<span data-name="product_stock[quantity]" data-module="quantityVidjet" contenteditable="true">{{ $product->product_stock->quantity or 9999 }}</span>
				<span>+</span>
			</div>				
		</div>

		<div class="imageContainer" style="min-width: 500px; cursor:pointer;">
			<h1 data-name="product[name]" contenteditable="true">{{ $product->name or 'Ламинированный плинтус Quick Step' }}</h1>
					<img data-name="product_images[][name]" data-image-name="{{ $product->image or 'plintus.jpg' }}" src="{{ isset($product->image) ? asset('/images/products/medium/'.$product->image) : asset('/images/products/medium/plintus.jpg') }}">
			<p><span data-name="price_history[price]" data-module="quantityVidjet" contenteditable="true">{{ $product->price->price_history->price or 450 }}</span> руб.</p>
			<div class="miniCont">
			@for($i = 1, $size = (isset($product->product_images)) ? count($product->product_images) : 0; $size > 1, $i < $size; ++$i)
				<img data-name="product_images[][name]" data-image-name="{{ $product->product_images[$i]->name }}" src="{{ asset('/images/products/mini/'.$product->product_images[$i]->name) }}">
			@endfor
			</div>
		</div>
	
		<table border="1"><caption>Характеристики</caption>
			<tbody>
			@if ( isset($product->product_characteristics) ) 
				@foreach ($product->product_characteristics as $product_characteristic)
					<tr>
						<input name="product_characteristics[{{ $product_characteristic->characteristic_id }}][characteristic_id]" value="{{ $product_characteristic->characteristic_id }}" type="hidden">
						<td>{{ $product_characteristic->characteristic->name }}</td>
						<td><input name="product_characteristics[{{ $product_characteristic->characteristic_id }}][value]" value="{{ $product_characteristic->value }}">{!! isset($product_characteristic->characteristic->unit) ? $product_characteristic->characteristic->unit->reduction : '' !!}</td>
					</tr>
				@endforeach
			@else
				@foreach ($characteristics as $characteristic)
					<tr>
						<input name="product_characteristics[{{ $characteristic->id }}][characteristic_id]" value="{{ $characteristic->id }}" type="hidden">
						<td>{{ $characteristic->name }}</td>
						<td><input name="product_characteristics[{{ $characteristic->id}}][value]" value="{{ $defaultCharactValues[$characteristic->name] }}"></td>
					</tr>
				@endforeach
			@endif
			</tbody>
		</table>
	
		<div data-name="page[content]" class="textContainer">
			{!! $product->product_view->page->content or '' !!}
		</div>
		<h2>Данные страницы</h2>
		<div>
			<label for="page[title]">Заголовок (title)</label>
			<textarea name="page[title]" rows="1">{{ $product->product_view->page->title or '' }}</textarea>
		</div>
		<div>
			<label for="page[description]">Описание страницы (description)</label>
			<textarea name="page[description]" rows="2">{{ $product->product_view->page->description or '' }}</textarea>
		</div>
		<div>
			<label for="page[uri]">URI</label>
			<input name="page[uri]" value="{{ $product->product_view->page->uri or '' }}" data-primarykey="1" data-primarykey-value="{{ $product->product_view->page->id or '' }}">
		</div>

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