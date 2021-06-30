@extends('layouts.default')

@section('content')
<script src="{{ asset('js/views/pageView.js') }}" defer></script>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
<div class="content">
@include('includes.imageShowMobile')
	<?php echo $page->content ?>
</div>
<div class="back">
	<a  href="{{ url()->previous() }}">Вернуться назад</a>
</div>
@endsection