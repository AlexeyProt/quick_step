@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/categoriesView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.imageWindow')

@include('admin.includes.newCategoryWindow')
<div class="content">
	<form name="categoryEditor">
		<h1>Категории</h1>
		@include('admin.includes.categories')
		
		<template id="categoriesButtons">
			<div class="buttons" style="text-align:left;">
				<p class="notice"></p>
				<div class="button" data-button="saveOrder">
					<div class="innerContainer">Сохранить</div>
				</div>
				<div class="button" data-button="cancelOrder">
					<div class="innerContainer">Отменить</div>
				</div>						
			</div>
		</template>
	
		<input name="category[id]" value="{{ $category->id or '' }}" type="hidden">
		<div class="imageContainer" style="min-width: 500px; cursor:pointer;">
			<h1 data-name="category[name]" contenteditable="true">{{ $category->name or ' ' }}</h1>
			<img data-name="category_image[name]" data-image-name="{{ $category_image->name or '' }}" src="{{ isset($category_image->name) ? asset('/images/categories/mini/'.$category_image->name) : asset('/images/image.svg') }}">
		</div>
		<div data-name="page[content]" class="textContainer">
			{!! $category->category_view->page->content or '' !!}
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