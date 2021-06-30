"use strict";

let content = document.querySelector('.content');

new ImageShow( content );
new Icons( document.documentElement );
new Tabs(document.documentElement);

let tabsLoader = new TabsLoader(document.querySelector('#tabsContainer'));

tabsLoader.start();

let	priceCalculator = new PriceCalculator(content);
	
priceCalculator.start();