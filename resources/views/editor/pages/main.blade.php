@extends('editor.layouts.default')

@section('content')
<script src="{{ asset('js/views/admin/pagesView.js') }}" defer></script>
<div class="content">

</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection