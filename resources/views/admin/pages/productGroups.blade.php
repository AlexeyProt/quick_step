@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/pagesView.js') }}" defer></script>
<div class="content">
	<h1>Товары</h1>
	<table style="max-width: 754px; text-align: left;">
		<thead>
			<tr>
				<th>Название</th>
				<th></th>	
				<th>Категория</th>	
			</tr>		
		</thead>
		<tbody>
		@foreach ($product_groups as $product_group)	
			<tr onclick="location.href='{{ route('admin::productGroupEdit', ['id' => $product_group->id]) }}'">
				<td>{{ $product_group->name }}</td>
				<td>
					@if (isset($product_group->image))
						<img src="{{ asset('/images/products/mini/'.$product_group->image) }}">
					@endif
				</td>
				<td>{{ $product_group->category->name }}</td>
			</tr>
		@endforeach			
		</tbody>
	</table>
	{{ $product_groups->links() }}
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection