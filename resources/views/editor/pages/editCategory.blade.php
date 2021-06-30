@extends('editor.layouts.default')

@section('content')
<script src="{{ asset('js/views/editor/editCategoryView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('editor.includes.changePricesWindow')

@include('admin.includes.imageWindow')
<div class="content">
	<h1>{{ $page->title }}</h1>
	
	@section('headerButtons')
		<div class="buttons">
			<div class="button" data-button="changePrices">
				<div class="innerContainer">Изменить цены</div>
			</div>						
		</div>
	@endsection	
	
	
	@section('searchInput')
	<form name="search">
		<input name="product[name]" placeholder="Введите название товара">
		<input name="category[id]" value="{{ $category->id or '' }}" type="hidden">	
	</form>	
	@endsection
	
	@include('includes/search')	
	

	<table style="max-width: 1200px; text-align: left;">
		<thead>
			<tr>
				<th>
					<label>
						<input type="checkbox" name="selectAll">
						<span style="color:#cccaff; cursor:pointer">Отметить все</span>	
					</label>
				</th>
				<th>Название</th>
				<th>Категория</th>
				<th></th>	
				<th>Цена</th>					
			</tr>		
		</thead>
		<tbody class="productsData">
		@foreach ($products as $product)	
			<tr data-product-id="{{ $product->id }}" onclick="/* location.href='{{ route('editor::editProduct', ['id' => $product->id]) }}' */">
				<td><input type="checkbox" name="select"></td>
				<td>{{ $product->name }}</td>
				<td>{{ $product->category->name }}</td>
				<td>
					@if (isset($product->image))
						<img src="{{ asset('/images/products/mini/'.$product->image) }}">
					@endif
				</td>
				<td>
					<div data-product="price" contenteditable="true">{{ $product->price->price_history->price }}</div>
					<div class="progressContainer"></div>
				</td>
			</tr>
		@endforeach		
			<template id="productTr">
				<tr data-product-id="">
					<td><input type="checkbox" name="select"></td>
					<td data-product="name"></td>
					<td data-product="category"></td>
					<td data-product="image"></td>
					<td>
						<div data-product="price" contenteditable="true"></div>
						<div class="progressContainer"></div>
					</td>
				</tr>	
			</template>
		</tbody>
	</table>	
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection