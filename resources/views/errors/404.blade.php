<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">		
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta name="description" content="Страница не найдена">
		<title>Страница не найдена</title>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
		<script src="{{ asset('js/views/TemplateScript.js') }}" defer></script>
		<script src="{{ asset('js/views/templateView.js') }}" defer></script>
		<link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}" />
		<link rel="stylesheet" type="text/css" href="{{ asset('css/mobile.css') }}" />
		<link rel="icon" type="image/png" href="{{ asset('images/favicon.png') }}" />
	</head>
	<body>	
		<div class="wrapper">

			<div class="mainContainer">
				<?php include('images/background.svg') ?>
				<div class="main">					
					@include('includes.header')
					<?php /* include('templates/feedbackWindow.php'); */ ?>
					@include('includes.mobileMenu')
					@include('includes.headerMenu')
					@include('includes.horMenu')
					<div class="contentContainer">
						<script src="{{ asset('js/views/errorView.js') }}" defer></script>
						<div class="content">
							<h1>404</h1>
							<h3>Страница не найдена</h3>
						</div>
						<div class="back">
							<a  href="{{ url()->previous() }}">Вернуться назад</a>
						</div>						
					</div>
					@include('includes.footer')
				</div>
			</div>		
		</div>

		
	</body>
</html>