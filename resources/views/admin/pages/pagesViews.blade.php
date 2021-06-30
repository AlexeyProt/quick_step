@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/pagesViewsView.js') }}" defer></script>
<div class="content">
	<h1>Страницы</h1>
	<table style="max-width: 754px; text-align: left;">
		<thead>
			<tr>
				<th  data-sortable-column="title" data-sortable-order="asc">
					<div>
						<span>Заголовок</span>
						<span class="indicatorContainer"></span>
					</div>
				</th>
				<th  data-sortable-column="uri" data-sortable-order="asc">
					<div>
						<span>Путь</span>
						<span class="indicatorContainer"></span>
					</div>
				</th>	
				<th  data-sortable-column="published" data-sortable-order="asc">
					<div>
						<span>Опубликована</span>
						<span class="indicatorContainer"></span>
					</div>
				</th>	
				<th  data-sortable-column="created_at" data-sortable-order="asc">
					<div>
						<span>Дата создания</span>
						<span class="indicatorContainer"></span>
					</div>
				</th>	
			</tr>		
		</thead>
		<tbody>
		@foreach ($pages as $page)	
			<tr onclick="location.href='{{ route('admin::pageEdit', ['id' => $page->id]) }}'">
				<td>{{ $page->title }}</td>
				<td>{{ $page->uri }}</td>
				<td>{{ ($page->published) ? 'Да' : 'Нет' }}</td>
				<td>{{ $page->created_at }}</td>
			</tr>
		@endforeach			
		
	
		
		</tbody>
		
		
		
	</table>
	
		<div class="progressContainer"></div>
		<template id="pagination">
			<ul class="pagination">
				
			</ul>
		</template>		
	
	<template id="sortingIndicator">
		@php include('images/sortingIndicator.svg') @endphp
	</template>
	
	<template id="page">
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>	
	</template>
	
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection