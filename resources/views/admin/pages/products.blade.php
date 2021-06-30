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
				<th></th>	
				<th>Цена</th>					
				<th>В наличии</th>	
				<th>Категория</th>	
			</tr>		
		</thead>
		<tbody>
		@foreach ($products as $product)	
			<tr onclick="location.href='{{ route('admin::productEdit', ['id' => $product->id]) }}'">
				<td>{{ $product->name }}</td>
				<td>
					@if (isset($product->image))
						<img src="{{ asset('/images/products/mini/'.$product->image) }}">
					@endif
				</td>
				<td>{{ $product->price->price_history->price }} руб.</td>
				<td>{{ isset($product->product_stock->quantity) ? $product->product_stock->quantity.' шт.' : '' }}</td>
				<td>{{ $product->category->name }}</td>
			</tr>
		@endforeach			
		</tbody>
	</table>
	{{ $products->links() }}
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection