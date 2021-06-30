"use strict";
/* Класс загрузки товара */
function Product(elem) {
	this._elem = elem;	
	this._priceNodes = this._elem.querySelectorAll('[data-product-price-id_product]');
		
	this.start();
}


/* Внутренние методы */

// Возвращает JSON с товарами для которых нужно запросить цену
Product.prototype._getJsonPrices = function () {
	var prices = [];
	for ( var i = 0; i < this._priceNodes.length; i++ ) {
		prices[i] = this._priceNodes[i].dataset.productPriceId_product;
	}
	return JSON.stringify(prices);
};

/* Внешние методы */

// Callback для отображения цен, полученных из запроса
Product.prototype.showPricesCB = function (data) {
	var products = JSON.parse(data);
	for ( var i = 0; i < this._priceNodes.length; i++ ) {
		this._priceNodes[i].innerHTML = products[i].price;
	}
	contentExpect.remove(); // Удаляет callback из очереди
} 
// Выполняет ajax запрос для получения товаров с ценами 
Product.prototype._ajax = function () {
	var formData = new FormData();
	formData.set('products', this._getJsonPrices());
	$.ajax({
		url: "/product-price-id_product",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		success: this.showPricesCB.bind(this),
		error: function(jqxhr, status, errorMsg) {
			console.log(errorMsg);
		}
	});		
};
// Запускает загрузку цен товаров
Product.prototype.start = function () {
	contentExpect.add(); // Добавляет
	if ( this._priceNodes.length == 0 ) {
		contentExpect.remove();
		return;
	}
	this._ajax();
};