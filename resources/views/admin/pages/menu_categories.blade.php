@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/menu_categoriesView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.menuCategoryWindow')
<div class="content">
	<h1>Меню</h1>
	@include('admin.includes.menu_categories')
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection