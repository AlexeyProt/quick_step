@extends('admin.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/menuItemsView.js') }}" defer></script>
@include('includes.confirmWindow')

@include('admin.includes.menuItemWindow')
<div class="content">
	<h1>Меню</h1>
	@include('admin.includes.menuItems')
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection