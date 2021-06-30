var MyAnimation = require('../modules/MyAnimation');
let ToolBar = require('../modules/ToolBar');
let Expectation = require('../modules/Expectation');
let QuantityVidjet = require('../modules/QuantityVidjet');
let BaseForm = require('../modules/Form');
let WindowForm = require('../modules/Window');
let CartWindow = require('../modules/CartWindow');
let Cart = require('../modules/Cart');
let Search = require('../modules/Search');
let ProgressAnimation = require('../modules/ProgressAnimation');
let ProductFinder = require('../modules/ProductFinder');
let Logo = require('../modules/Logo');
let Menu = require('../modules/Menu');
let OptimizedResize = require('../events/OptimizedResize');
let MenuHor = require('../modules/MenuHor');

/* categoriesView */
let Product = require('../modules/Product');
let Slider = require('../modules/Slider');
let IconsCategory = require('../modules/IconsCategory');

new IconsCategory( document.querySelector('.content') );

new Slider(document.getElementById('slider'));

let productFinder = new ProductFinder(document.querySelector('.searchFormContainer'));

productFinder.searchDataURL = '/products/search-data';
productFinder.searchResultURL = '/search';

productFinder.start();