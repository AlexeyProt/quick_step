@extends('includes/window')

@section('windowId', 'menuItemWindow')

@section('windowCaption', 'Редактирование меню')

@section('windowNameForm', 'menuItemWindow')

@section('windowContent')
	<label>Текст ссылки<input name="name" placeholder="Введите текст ссылки"></label>
	<template id="menuItemPage">
		<input name="page[id]" type="hidden">
		<span>Ссылка на страницу</span>
		<h3 data-page="title"></h3>
		<a data-page="uri" target="_blank" style="color: blue"></a>	
	</template>
	<div class="progressContainer"></div>
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
				<template id="pageLI">
					<li data-page-id="">
						<div data-page="title"></div>
						<a target="_blank"></a>
						<div class="miniButton" data-button="page select">Выбрать</div>					
					</li>
				</template>
			</ul>
			<div class="progressContainer"></div>
			<template id="pagination">
				<ul class="pagination">
					
				</ul>
			</template>
		</div>
	</div>	
@endsection