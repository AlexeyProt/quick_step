let Slider = require('../modules/Slider');
let IconsCategory = require('../modules/IconsCategory');

let content = document.querySelector('.content');

new IconsCategory( content );

new Slider(document.getElementById('slider'));

let productFinder = new ProductFinder(document.querySelector('.searchFormContainer'));

productFinder.searchDataURL = '/products/search-data';
productFinder.searchResultURL = '/search';

productFinder.start();
