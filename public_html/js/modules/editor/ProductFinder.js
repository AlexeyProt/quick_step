"use strict";
class ProductFinder extends Search {
	constructor(args) {
		super(args);
		
		this.productTrElem = document.getElementById('productTr').content.children[0];
		this.productsDataCont = document.querySelector('.productsData');
		
		this.searchDataURL = '/editor/category/search';
		this.isAllowEmptyInput = true;
		this.postData;
	}
	
	loadSearchData() {
		this.postData = {
			categoryId: document.querySelector('[name="category[id]"]').value,
			searchQuery: this.input.value
		};

		return super.loadSearchData();
	}
	
	buildListData(searchData) {
		this.productsDataCont.innerHTML = '';
		
		let img = document.createElement('img');
		
		for (let i = 0; i < searchData.length; i++) {
			let productTrElem = this.productTrElem.cloneNode(true);
			
			productTrElem.dataset.productId = searchData[i].id;	
			productTrElem.querySelector('[data-product="name"]').innerHTML = searchData[i].name;
			productTrElem.querySelector('[data-product="category"]').innerHTML = searchData[i].category.name;
			if (searchData[i].image) {
				img = img.cloneNode(false);
				img.src = location.origin + '/images/products/mini/' + searchData[i].image;
				
				productTrElem.querySelector('[data-product="image"]').append(img);
			}
			productTrElem.querySelector('[data-product="price"]').innerHTML = searchData[i].price.price_history.price;
			
			this.productsDataCont.append(productTrElem);
		}

	}
	
	start() {
		super.start();
		
		if (this.input.value) this.showSearchData();
		
		this.container.addEventListener('submit', () => event.preventDefault());		
	}
}