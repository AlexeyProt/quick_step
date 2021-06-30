/* Класс формы редактирования товара группы */
function GroupProductEditor() {
	ProductEditor.apply(this, arguments);	
	this.model = {
		// Названия полей форм, соответствующие названиям моделей
		main: 'product', images: 'product_images',
		// url для ajax запросов
		url: {
			uploadImages: '/admin/product/upload-images',
			updatePublication: '/admin/product/update-group-product',
			create: '/admin/product/create-for-group',
			edit: '/admin/product/edit-for-group/',
			publish: '/admin/product/store-group-product',
			cancel: '/admin/product/cancel',
			destroy: '/admin/product/destroy-group-product',
			home: '/admin/product/group-products'
		}
	}; 
}
// Наследует класс ProductEditor
GroupProductEditor.prototype = Object.create(ProductEditor.prototype);
GroupProductEditor.prototype.constructor = GroupProductEditor;