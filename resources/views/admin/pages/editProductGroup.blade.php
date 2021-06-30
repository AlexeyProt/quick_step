@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/editProductGroupView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.imageWindow')
<div class="content">
	<h1>{{ $page->title }}</h1>
	<form name="productGroupEditor">
		<input name="product_group[id]" value="{{ $product_group->id or '' }}" type="hidden">
		<select name="product_group[category_id]" size="1" style="width: 300px;">
			<option disabled>Выберите категорию</option>
			@foreach ($categories as $category)
				<option value="{{ $category->id }}">{{ $category->name }}</option>
			@endforeach
		</select>		

		<div class="imageContainer" style="min-width: 500px; cursor:pointer;">
			<h1 data-name="product_group[name]" contenteditable="true">{{ $product_group->name or ' ' }}</h1>
					<img data-name="product_group_images[][name]" data-image-name="{{ $product_group->image or '' }}" src="{{ isset($product_group->image) ? asset('/images/products/medium/'.$product_group->image) : asset('/images/image.svg') }}">
			<div class="miniCont">
			@for($i = 1, $size = (isset($product_group->product_group_images)) ? count($product_group->product_group_images) : 0; $size > 1, $i < $size; ++$i)
				<img data-name="product_group_images[][name]" data-image-name="{{ $product_group->product_group_images[$i]->name }}" src="{{ asset('/images/products/mini/'.$product_group->product_group_images[$i]->name) }}">
			@endfor
			</div>
		</div>
		<div data-name="page[content]" class="textContainer">
			{!! $product_group->product_group_view->page->content or '' !!}
		</div>
		<h2>Данные страницы</h2>
		<div>
			<label for="page[title]">Заголовок (title)</label>
			<textarea name="page[title]" rows="1">{{ $product_group->product_group_view->page->title or '' }}</textarea>
		</div>
		<div>
			<label for="page[description]">Описание страницы (description)</label>
			<textarea name="page[description]" rows="2">{{ $product_group->product_group_view->page->description or '' }}</textarea>
		</div>
		<div>
			<label for="page[uri]">URI</label>
			<input name="page[uri]" value="{{ $product_group->product_group_view->page->uri or '' }}" data-primarykey="1" data-primarykey-value="{{ $product_group->product_group_view->page->id or '' }}">
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