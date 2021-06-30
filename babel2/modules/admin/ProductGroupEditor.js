"use strict";
/* Класс формы редактирования группы товаров */
function ProductGroupEditor() {
	ProductEditor.apply(this, arguments);	
	this.model = {
		// Названия полей форм, соответствующие названиям моделей
		main: 'product_group', images: 'product_group_images',
		// url для ajax запросов
		url: {
			uploadImages: '/admin/product-group/upload-images',
			updatePublication: '/admin/product-group/update-publication',
			create: '/admin/product-group/create',
			edit: '/admin/product-group/edit/',			
			publish: '/admin/product-group/publish',
			cancel: '/admin/product-group/cancel',
			destroy: '/admin/product-group/destroy',
			home: '/admin/product-groups'
		}
	}; 
}
// Наследует класс ProductEditor
ProductGroupEditor.prototype = Object.create(ProductEditor.prototype);
ProductGroupEditor.prototype.constructor = ProductGroupEditor;