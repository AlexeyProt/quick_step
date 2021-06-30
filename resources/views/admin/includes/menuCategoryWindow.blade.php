@extends('includes/window')

@section('windowId', 'menuCategoryWindow')

@section('windowCaption', 'Редактирование меню')

@section('windowNameForm', 'menuCategoryWindow')

@section('windowContent')
	<label>Текст ссылки<input name="title"></label>
	<label>URL<input name="url"></label>
	<h4>Страницы</h4>
	<div id="tabsContainer">
		<ul class="tabs"><!--
			--><li data-status="active">Поиск</li><!--
			--><li data-status="">Все</li><!--
		--></ul>
		<div data-tab="Поиск" style="display: block;">							
			@section('searchInput')
				<input name="page[title]" placeholder="Введите заголовок или URL страницы">
			@endsection
			
			@include('includes/search')																																	
		</div>
		<div data-tab="Все">
			<ul class="pagesList">

			</ul>
			<div class="progressContainer"></div>
			<template id="pagination">
				<ul class="pagination">
					
				</ul>
			</template>
		</div>
	</div>	
@endsection