"use strict";
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

new OptimizedResize();
new Menu();
new MenuHor();
new ToolBar();
new CartCategories();
new OpenFeedback(document.getElementById('feedbackContainer'));

let productFinder = new ProductFinder(document.querySelector('.searchFormContainer'));

productFinder.searchDataURL = '/products/search-data';
productFinder.searchResultURL = '/search';

productFinder.start();