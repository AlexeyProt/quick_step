@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/productsView.js') }}" defer></script>
<div class="content">
	<h1>Товары</h1>
	@include('includes.searchForm')
	<table style="max-width: 754px; text-align: left;">
		<thead>
			<tr>
				<th>Название</th>
				<th>Цена</th>					
			</tr>		
		</thead>
		<tbody>
		@foreach ($services as $service)	
			<tr onclick="location.href='{{ route('admin::serviceEdit', ['id' => $service->id]) }}'">
				<td>{{ $service->name }}</td>
				<td>{{ $service->service_price->service_price_history->price }} руб.</td>
			</tr>
		@endforeach			
		</tbody>
	</table>
	{{ $services->links() }}
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection