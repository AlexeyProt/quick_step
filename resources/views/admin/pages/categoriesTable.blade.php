@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/pagesView.js') }}" defer></script>
<div class="content">
	<h1>Категории</h1>
	<table style="max-width: 754px; text-align: left;">
		<thead>
			<tr>
				<th>Название</th>
				<th></th>	
				<th></th>	
			</tr>		
		</thead>
		<tbody>
		@php
			function buildCategories($items) {
				foreach($items as $item) {
					if (isset($item->children)) {
					@endphp
						<tr>
							<td>{{ $item->name }}</td>
							<td style="cursor: pointer;text-decoration: underline;">Подкатегории</td>
							<td>
								@if (isset($item->category_image))
									<img src="{{ asset('/images/categories/mini/'.$item->category_image->name) }}">
								@endif
							</td>
							@php buildCategories($item->children) @endphp
						</tr>
					@php
					} else {
					@endphp
					@if ($item->parent_id)
						<tr style="display:none;">
					@else
						<tr>
					@endif
							<td>{{ $item->name }}</td>
							<td></td>
							<td>
								@if (isset($item->category_image))
									<img src="{{ asset('/images/categories/mini/'.$item->category_image->name) }}">
								@endif
							</td>
						</tr>	
		@php
					}
				}
			}
			buildCategories($categories)
		@endphp		
		</tbody>
	</table>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection