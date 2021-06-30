"use strict"; // Подключение скрипта анимации





(function() {
	var support = ("content" in document.createElement("template"));

	// Set the content property if missing
	if (!support) {
		var
			/**
			 * Prefer an array to a NodeList
			 * Otherwise, updating the content property of a node
			 * will update the NodeList and we'll loose the nested <template>
			 */
			templates = Array.prototype.slice.call(document.getElementsByTagName("template")),
			template, content, fragment, node, i = 0, j;

		// For each <template> element get its content and wrap it in a document fragment
		while ((template = templates[i++])) {
			content  = template.children;
			fragment = document.createDocumentFragment();

			for (j = 0; node = content[j]; j++) {
				fragment.appendChild(node);
			}

			template.content = fragment;
		}
	}

	// Prepare a clone function to allow nested <template> elements
	function clone() {
		var
			templates = this.querySelectorAll("template"),
			fragments = [],
			template,
			i = 0;

		// If the support is OK simply clone and return
		if (support) {
			template  = this.cloneNode(true);
			templates = template.content.querySelectorAll("template");

			// Set the clone method for each nested <template> element
			for (; templates[i]; i++) {
				templates[i].clone = clone;
			}

			return template;
		}

		// Loop through nested <template> to retrieve the content property
		for (; templates[i]; i++) {
			fragments.push(templates[i].content);
		}

		// Now, clone the document fragment
		template = this.cloneNode(true);

		// Makes sure the clone have a "content" and "clone" properties
		template.content = this.content;
		template.clone   = clone;

		/**
		 * Retrieve the nested <template> once again
		 * Since we just cloned the document fragment,
		 * the content's property of the nested <template> might be undefined
		 * We have to re-set it using the fragment array we previously got
		 */
		templates = template.querySelectorAll("template");

		// Loop to set the content property of each nested template
		for (i = 0; templates[i]; i++) {
			templates[i].content = fragments[i];
			templates[i].clone   = clone; // Makes sure to set the clone method as well
		}

		return template;
	}

	var
		templates = document.querySelectorAll("template"),
		template, i = 0;

	// Pollute the DOM with a "clone" method on each <template> element
	while ((template = templates[i++])) {
		template.clone = clone;
	}
}());






(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  window.CustomEvent = CustomEvent;
})();

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
  }); // Подключение скрипта меню и создания экземпляра класса

  var menuScript = new TemplateScript('/js/modules/Menu.js');
  menuScript.addScript('/js/events/OptimizedResize.js');
  menuScript.callFunc(function () {
    new OptimizedResize();
    var menu = new Menu();
  }); // Подключение скрипта горизонтального меню и создания экземпляра класса

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
  var productFinder = new ProductFinder(document.querySelector('.searchFormContainer'));
  productFinder.searchDataURL = '/products/search-data';
  productFinder.searchResultURL = '/search';
  productFinder.start();
});