@extends('layouts.products')

@section('textContent')
	@inject('str', 'App\Support\Str')
	<h1>{{ $str::plural('Найден '.$products->total().' товар|Найдено '.$products->total().' товара|Найдено '.$products->total().' товаров', $products->total()) }} по запросу "{{ $page->content }}"</h1>
@endsection