@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/editPageView.js') }}" defer></script>	
@include('includes.confirmWindow')
<div class="content">
	<h1>{{ $page->title }}</h1>
	<form name="pageEditor">
		<div>
			<label for="title">Заголовок (title)</label>
			<textarea name="title" rows="1"><?php echo $editablePage->title ?></textarea>
		</div>
		<div>
			<label for="description">Описание страницы (description)</label>
			<textarea name="description" rows="2"><?php echo $editablePage->description ?></textarea>
		</div>
		<div>
			<label for="uri">URI</label>
			<input name="uri" value="<?php echo $editablePage->uri ?>" data-primarykey="1" data-primarykey-value="{{ $editablePage->id }}">
		</div>
		<div>
			<label for="content">Содержимое страницы</label>
			<textarea name="content" rows="10"><?php echo $editablePage->content ?></textarea>
		</div>		
		<div class="buttons">
			<p class="notice"></p>
			<div class="button" data-button="sendData">
				<div class="innerContainer">Сохранить</div>
			</div>
			<div class="button" data-button="cancel">
				<div class="innerContainer">Отменить</div>
			</div>				
			<div class="button" data-button="publish">
				<div class="innerContainer">Опубликовать</div>
			</div>
		</div>
	</form>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection