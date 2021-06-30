@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/pagesView.js') }}" defer></script>
<div class="content">
	<h1>Заказы</h1>
	<table style="max-width: 754px; text-align: left;">
		<thead>
			<tr>
				<th>Номер заказа</th>
				<th>Статус</th>	
				<th>Время оформления</th>		
			</tr>		
		</thead>
		<tbody>
		@foreach ($orders as $order)	
			<tr onclick="location.href='{{ route('admin::order', ['id' => $order->id]) }}'">
				<td>№ {{ $order->id }}</td>
				<td>{{ $order->sale_status->status->name }}</td>
				<td>{{ $order->added_on }}</td>
			</tr>
		@endforeach			
		</tbody>
	</table>
	{{ $orders->links() }}
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection