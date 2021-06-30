"use strict";

let content = document.querySelector('.content');
new ImageShow( content );
new Icons( document.documentElement );

let	packsCalculator = new PacksCalculator(content);
	
packsCalculator.start();