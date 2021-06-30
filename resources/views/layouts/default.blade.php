<!DOCTYPE html>
<html>
	<head>	
		<script src="https://www.google.com/recaptcha/api.js"></script>
		<link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}" />
		<link rel="stylesheet" type="text/css" href="{{ asset('css/mobile.css') }}" />		
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
		<meta charset="utf-8">	
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">		
		<meta name="csrf-token" content="{{ csrf_token() }}">
		@if ($page->description)
			<meta name="description" content="{{ $page->description }}">
		@endif
		<title>{{ $page->title }}</title>
		<link rel="icon" type="image/png" href="{{ asset('favicon.png') }}" />	
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script>
		document.createElement('template');
		</script> 		
		<script src="https://www.google.com/recaptcha/api.js?render=6LdwdgcaAAAAAJSaaQWZwUcvdXPxKvBXZ0iRjSb3"></script>
		<script src="{{ asset('js/main.js') }}" defer></script>
		<script src="{{ asset('js/modules/MyAnimation.js') }}" defer></script>
		<script src="{{ asset('js/modules/Cart.js') }}" defer></script>
		<script src="{{ asset('js/modules/CartWindow.js') }}" defer></script>		
		<script src="{{ asset('js/modules/CartCategoriesWindow.js') }}" defer></script>			
		<script src="{{ asset('js/modules/CartCategories.js') }}" defer></script>
		<script src="{{ asset('js/modules/FieldMask.js') }}" defer></script>
		<script src="{{ asset('js/modules/Feedback.js') }}" defer></script>	
		<script src="{{ asset('js/modules/OpenFeedback.js') }}" defer></script>			
		<script src="{{ asset('js/views/templateView.js') }}" defer></script>		
	</head>
	<body>	
	
		<div class="wrapper">
			
			<div class="mainContainer">
				<?php include('images/background.svg') ?>
				<div class="main">					
					@include('includes.header')
					@include('includes.feedbackWindow')
					@include('includes.mobileMenu')
					@include('includes.headerMenu')
					<div style="margin:auto;" class="table">
						<div>@include('includes.horMenu')</div>
					</div>
					@include('includes.horMenu2')				
					<div class="contentContainer">
						@yield('content')
					</div>
					@include('includes.footer')
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