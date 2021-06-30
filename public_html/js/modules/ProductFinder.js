"use strict";
class ProductFinder extends Search {
	constructor(args) {
		super(args);
		this.searchResultURL;
	}
	
	searchQueryResultHandler(queryResultElem) {
		this.redirectToSearchResult(queryResultElem.innerHTML);
		
		this.deselectContainer();
	}	
	
	redirectToSearchResult(queryResult) {
		document.location.href = encodeURI(document.location.origin + this.searchResultURL + '/' + queryResult);
	} 
	
	handleSubmit(event) {
		event.preventDefault();
		this.redirectToSearchResult(this.input.value);
	}
	
	start() {
		super.start();
		
		this.container.querySelector('.openButton')
		.addEventListener('click', () => this.redirectToSearchResult(this.input.value));
		
		this.container.querySelector('form')
		.addEventListener('submit', () => this.handleSubmit(event));
	}
}