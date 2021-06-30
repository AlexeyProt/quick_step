<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">		
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta name="description" content="{{ $page->description }}">
		<title>{{ $page->title }}</title>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script src="{{ asset('js/views/TemplateScript.js') }}" defer></script>
		<script src="{{ asset('js/views/admin/templateView.js') }}" defer></script>
		<link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}" />
		<link rel="stylesheet" type="text/css" href="{{ asset('css/admin.css') }}" />
		<link rel="stylesheet" type="text/css" href="{{ asset('css/mobile.css') }}" />
		<link rel="icon" type="image/png" href="{{ asset('images/favicon.png') }}" />
	</head>
	<body>	
		<div class="wrapper">
			@include('admin.includes.sidebar')
			<div class="mainContainer">
				<?php include('images/background.svg') ?>
				<div class="main">					
					<div class="contentContainer">
						@yield('content')
					</div>
				</div>
			</div>		
		</div>		
		
		<template id="progress">
			@php include('images/progress.svg') @endphp
		</template>		
		
		<template id="snackbar">
			<div class="snackbar"></div>
		</template>		
		
	</body>
</html>