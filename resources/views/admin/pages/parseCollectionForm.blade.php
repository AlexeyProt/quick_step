@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/parseCollectionFormView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.imageWindow')
<div class="content">
	<h1>{{ $page->title }}</h1>
	<form name="parseForm">	
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
			<label for="product_stock[quantity]">В наличии</label>
			<input name="product_stock[quantity]" value="9999">
		</div>	
		
		<div>
			<label for="pageUrl">Url страницы</label>
			<input name="pageUrl" value="">
		</div>					
		<div>
			<label for="imagePositions">Индексы изображений</label>
			<input name="imagePositions" value="">
		</div>	
		
		<div>
			<label for="price_history[price]">Цена</label>
			<input name="price_history[price]" value="{{ $categoryPrice }}">
		</div>			
		
		<table border="1"><caption>Характеристики</caption>
			<tbody>
				@foreach ($characteristics as $characteristic)
					<tr>
						<input name="product_characteristics[{{ $characteristic->id }}][characteristic_id]" value="{{ $characteristic->id }}" type="hidden">
						<td>{{ $characteristic->name }}</td>
						<td><input name="product_characteristics[{{ $characteristic->id}}][value]" value="{{ $defaultCharactValues[$characteristic->name] or '' }}"></td>
					</tr>
				@endforeach
			</tbody>
		</table>		

		<h3>Плинтус</h3>
	
		<div>
			<label for="plinth[product_stock][quantity]">В наличии</label>
			<input name="plinth[product_stock][quantity]" value="9999">
		</div>	
		
		<div>
			<label for="plinth[price_history][price]">Цена</label>
			<input name="plinth[price_history][price]" value="450">
		</div>			
	
		<table border="1"><caption>Характеристики</caption>
			<tbody>
				@foreach ($plinthCharacteristics as $characteristic)
					<tr>
						<input name="plinth[product_characteristics][{{ $characteristic->id }}][characteristic_id]" value="{{ $characteristic->id }}" type="hidden">
						<td>{{ $characteristic->name }}</td>
						<td><input name="plinth[product_characteristics][{{ $characteristic->id}}][value]" value="{{ $plinthDefaultCharactValues[$characteristic->name] }}"></td>
					</tr>
				@endforeach
			</tbody>
		</table>		
		
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