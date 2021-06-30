@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/pagesView.js') }}" defer></script>
<div class="content">
	<h1>Опубликованные страницы</h1>
	<table style="max-width: 754px; text-align: left;">
		<thead>
			<tr>
				<th>Заголовок</th>
				<th>Путь</th>		
				<th>Дата создания</th>	
			</tr>		
		</thead>
		<tbody>
		@foreach ($pages as $page)	
			<tr onclick="location.href='{{ route('admin::pageEdit', ['id' => $page->id]) }}'">
				<td>{{ $page->title }}</td>
				<td>{{ $page->uri }}</td>
				<td>{{ $page->created_at }}</td>
			</tr>
		@endforeach			
		</tbody>
	</table>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection