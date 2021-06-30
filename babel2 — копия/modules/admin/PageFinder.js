"use strict";
class PageFinder extends Search {
	constructor(args) {
		super(args);
		
		this.searchDataURL = '/admin/pages/title-or-uri/search-data';
	}
	
	/**
	* Заполняет элемент li результатами поиска
	*
	* @param node li
	* @param object searchResult
	*
	* @return node li
	*/
	fillInLi(li, searchResult) {
		li.dataset.pageId = searchResult.id;
		li.innerHTML = `<div>${searchResult.title}</div>
						<div style="font-size: 15px;">/${searchResult.uri}</div>`;
						
		return li;
	}	
	
	searchQueryResultHandler(queryResultElem) {
		queryResultElem.dispatchEvent(new CustomEvent('queryResultSelected', {bubbles: true}));
		
		this.deselectContainer();
	}	
}