"use strict";
// Подключение скрипта анимации
var animationScript = new TemplateScript('/js/modules/MyAnimation.js');
animationScript.addScript('/js/modules/ToolBar.js');
animationScript.addScript('/js/modules/Expectation.js');
animationScript.addScript('/js/modules/QuantityVidjet.js');
animationScript.addScript('/js/modules/Form.js');
animationScript.addScript('/js/modules/Window.js');
animationScript.addScript('/js/modules/CartWindow.js');
animationScript.addScript('/js/modules/Cart.js');
animationScript.addScript('/js/modules/CartCategories.js');
animationScript.addScript('/js/modules/Search.js');
animationScript.addScript('/js/modules/ProgressAnimation.js');
animationScript.addScript('/js/modules/ProductFinder.js');
animationScript.callFunc(function () {
	// Анимации логотипов мобильной и настольной версий
	var logoScript = new TemplateScript('/js/modules/Logo.js');
	logoScript.callFunc(function () {
		new Logo(document.querySelector('.logo'));
	});	
	// Подключение скрипта меню и создания экземпляра класса
	var menuScript = new TemplateScript('/js/modules/Menu.js');
	menuScript.addScript('/js/events/OptimizedResize.js');
	menuScript.callFunc(function () {
		new OptimizedResize();
		var menu = new Menu();
	});
	// Подключение скрипта горизонтального меню и создания экземпляра класса
	var menuScript = new TemplateScript('/js/modules/MenuHor.js');
	menuScript.callFunc(function () {
		var menuHor = new MenuHor();
	});		
/* 	// Подключение скрипта формы обратной связи
	var feedbackScript = new TemplateScript('/js/modules/Feedback.js');
	feedbackScript.callFunc(function () {
		var footerFeedback = new Feedback( document.querySelector('form[data-form="feedback"]') ), // Создание экземпляра класса
			openFeedbackScript = new TemplateScript('/js/modules/OpenFeedback.js'); // Подключение скрипта открывающейся формы обратной связи
		openFeedbackScript.callFunc(function () {
			var openFeedback = new OpenFeedback(document.getElementById('feedbackContainer')); // Создание экземпляра класса
		});			
	}); */
	new ToolBar();
	new CartCategories();	
	
	let productFinder = new ProductFinder(document.querySelector('.searchFormContainer'));
	
	productFinder.searchDataURL = '/products/search-data';
	productFinder.searchResultURL = '/search';
	
	productFinder.start();
});
