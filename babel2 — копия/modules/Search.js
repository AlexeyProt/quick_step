"use strict";
let ProgressAnimation = require('../modules/ProgressAnimation');

class Search {
	constructor(container) {
		this.container = container;
		this.input = container.querySelector('input');
		this.searchListElem = container.querySelector('#searchList').content.children[0];
		
		this.searchDataURL;
		
		this.progressAnimation = new ProgressAnimation(container.querySelector('.progressContainer'));
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
		li.innerHTML = searchResult.name;
		return li;
	}
	
	buildListData(searchData) {
		if (!searchData.length) {
			this.searchListElem.remove();
			return;
		}
		
		this.container.append(this.searchListElem);
		
		let ul = this.searchListElem.querySelector('ul');
		let li = document.createElement('li');
		
		ul.innerHTML = '';
		
		for (let i = 0; i < searchData.length; i++) {
			li = li.cloneNode(false);
			li = this.fillInLi(li, searchData[i]);
			
			ul.append(li);
		}
		
	}
	
	async showSearchData() {
		if (this._timerId) clearTimeout(this._timerId);
		
		let searchData = await new Promise((resolve, reject) => {
			this._timerId = setTimeout(() => resolve(this.loadSearchData()), 1000);
		});
		
		this.buildListData(searchData);
	}
	
	async loadSearchData() {
		this._timerId = null;
		
		if (!this.input.value) return [];
		
		this.progressAnimation.start();
		
		try {
			let response = await fetch(this.searchDataURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
				},
				body: JSON.stringify( {searchQuery: this.input.value} )
			});
			
			let results = await response.json();			
			
			return results;			
		} catch(e) {
			console.log(e);
		} finally {
			this.progressAnimation.stop();
		}
	}
	
	handleClickDeselectContainer(event) {
		for(let target = event.target; target != document.body; target = target.parentNode) {
			if (!target || target == this.container) return;
		}
		this.deselectContainer();
	}
	
	handleKeydownDeselectContainer(event) {
		if (event.key == 'Tab') this.deselectContainer();
	}	
	
	deselectContainer() {
		delete this.container.dataset.searchSelected;
		
		this.searchListElem.remove();
	}
	
	searchQueryResultHandler(queryResultElem) {
		this.input.value = queryResultElem.innerHTML;
		this.deselectContainer();
	}
	
	handleSearchQueryResult(event) {	
		for (let target = event.target; target != this.container; target = target.parentNode) {
			if (target.tagName != 'LI') continue;
			
			this.searchQueryResultHandler(target);
			return;
		}		
	}
	
	start() {				
		this.input.addEventListener('focus', () => this.container.dataset.searchSelected = true);
		document.body.addEventListener('click', () => this.handleClickDeselectContainer(event));		
		document.addEventListener('keydown', () => this.handleKeydownDeselectContainer(event));	
		this.input.addEventListener('input', () => this.showSearchData());	

		this.searchListElem.addEventListener('click', () => this.handleSearchQueryResult(event));
	}
}

module.exports = Search;