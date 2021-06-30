"use strict";
class ProductBuilder {
	constructor(container) {
		this._container = container;

		this.productsListEl = container.querySelector('.productsList');
		this._productEl = container.querySelector('#productTemp').content.children[0];
	}
	
	/**
	 * Строит список товаров
	 * 
	 * @param array productsData
	 */
	build(productsData) {		
		let productsListEl = this.productsListEl;
		
		productsListEl.innerHTML = '';

		for (let i = 0; i < productsData.length; i++) {
			let productEl = this._productEl.cloneNode(true);
			
			if (productsData[i].product_view) {
				productEl.querySelector('[data-page="uri"]').href = location.origin + '/' + productsData[i].product_view.page.uri;
			} else {
				productEl.querySelector('[data-page="uri"]').href = location.origin + '/' + productsData[i].laminate_products_view.page.uri;
			}
			productEl.querySelector('[data-image="name"]').href.baseVal = location.origin + '/images/products/mini/' + productsData[i].product_images[0].name;
			productEl.querySelector('[data-product="name"]').innerHTML = productsData[i].name;
			productEl.querySelector('[data-unit="reduction"]').innerHTML = (productsData[i].product_view) ? productsData[i].product_view.unit.reduction : '1м<sup>2</sup>';
			productEl.querySelector('[data-price_history="price"]').innerHTML = (productsData[i].price_per_square_meter) ? productsData[i].price_per_square_meter : productsData[i].price.price_history.price;
			productEl.querySelector('[data-cart-id]').dataset.cartId = productsData[i].id;
			
			if (productsData[i].product_characteristics_assoc['Назначение']) {
				productEl.querySelector('.characteristics').innerHTML += `<span><span class="bright">Назначение:</span><br> <span>${productsData[i].product_characteristics_assoc['Назначение'].value}</span></span><br>`;
			}
			if (productsData[i].product_characteristics_assoc['Вид материала']) {
				productEl.querySelector('.characteristics').innerHTML += `<span><span class="bright">Вид материала:</span><br> <span>${productsData[i].product_characteristics_assoc['Вид материала'].value}</span></span><br>`;
			}			
			
			productsListEl.append(productEl);
		}
	}
}