@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/parseFormView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.imageWindow')
<div class="content">
	<h1>Загрузка картинок</h1>
	<form name="parseForm">	
		<div>
			<label for="pageUrl">Url страницы</label>
			<input name="pageUrl" value="">
		</div>		
		<div>
			<label for="imageName">Название изображения</label>
			<input name="imageName" value="">
		</div>				
		<div>
			<label for="imageIndex">Индекс изображения</label>
			<input name="imageIndex" value="">
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