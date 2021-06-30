/* Расширения класса ImageShow для работы с изображениями */
function ImageController () {
	ImageShow.apply(this, arguments);
	this._productId = document.getElementById('productId').value;
	this._mainImage = this._name;
	this._newElem;
	this.newElements = [];
	this._minorElem = document.getElementById('images').querySelector('img[data-name="'+this._name+'"]');
	
	this.setNewElem();
	this.upploadButton();
	this.deleteButton();
	this.setMainImageButton();
}
// Наследуюет класс ImageShow
ImageController.prototype = Object.create(ImageShow.prototype);
ImageController.prototype.constructor = ImageController;
// Устанавливает класс кнопки для изменения изображения на основное
ImageController.prototype._setClassButton = function () {
	var classButton = document.getElementById('setMainImage');
	if (this._name === this._mainImage) {
		classButton.className = "";
		classButton.innerHTML = "Основное изображение";
	}
	else {
		classButton.className = "button";
		classButton.innerHTML = "Установить изображение, как основное";
	}
};
// Изменяет изображение
ImageController.prototype._changeImage = function (minorElem) {
	ImageShow.prototype._changeImage.apply(this, arguments);
	this._minorElem = minorElem; // Изменяет миниатюру на новую
	this._setClassButton();
};
// Создает новый элемент с изображением
ImageController.prototype.setNewElem = function () {
	this._newElem = document.createElement('img');
	this._newElem.className = "minorImage";
	this._newElem.style = "width: 100px;";
};
// Добавляет новые элементы в массив
ImageController.prototype._addNewElements = function (nameImages) {
	for (var i = 0; i < nameImages.length; i++) {
		this.newElements[i] = this._newElem.cloneNode(true);
		this.newElements[i].dataset.name = nameImages[i];
		this.newElements[i].src = "mini/"+nameImages[i];
	}
};
// Добавляет новые изображения на страницу
ImageController.prototype._addImages = function (nameImages) {
	var images = document.getElementById('images'),
		imageContainer = document.getElementById('imageContainer');

	images.parentNode.removeChild(images);
	this._addNewElements(nameImages);
	this.addNodes(images.children);
	this.addNodes(this.newElements);
	this.sortNodes();
	for (var i = 0; i < this.elementsArray.length; i++) {
		images.insertBefore(this.elementsArray[i].elem, image.children[i]);
	}
	imageContainer.insertBefore(images, imageContainer.lastElementChild);
};
// Удаляет изображение
ImageController.prototype._deleteImage = function (mainImage) {
	var mainImageElem = document.getElementById('images').querySelector('img[data-name="'+mainImage+'"]');

	this._minorElem.parentNode.removeChild(this._minorElem); // Удаляется миниатюра
	this._mainImage = mainImage; // Устанавливает основное изображение
	this._changeImage(mainImageElem); // Изменяется изображение на основное
};
// Устанавливает изображение, как основное
ImageController.prototype._setMainImage = function () {
	var classButton = document.getElementById('setMainImage');
	this._mainImage = this._name;
	classButton.className = "";
	classButton.innerHTML = "Основное изображение";	
};
// Кнопка для установки изображения, как основное
ImageController.prototype.setMainImageButton = function () {
	var self = this;
	document.getElementById('setMainImage').onclick = function () {
		var image = {productId: self._productId, nameImage: self._name};			
		image = JSON.stringify(image);
		$.ajax({
			url: "admin.php?action=setAsMainImage",
			type: "POST",
			data: "image="+image,
			success: function () {
				self._setMainImage();
			},
			error: function(jqxhr, status, errorMsg) {
				alert("Не удалось сделать изображение основным");
			}			
		});
	}	
};
// Кнопка для удаления изображения
ImageController.prototype.deleteButton = function () {
	var self = this;
	document.getElementById('deleteImage').onclick = function () {
		if (confirm("Удалить изображение?")) {
			var image = {productId: self._productId, nameImage: self._name};			
			image = JSON.stringify(image);
			$.ajax({
				url: "admin.php?action=deleteImage",
				type: "POST",
				data: "image="+image,
				dataType: "json",
				success: function(data) {
					self._deleteImage(data);
				},
				error: function(jqxhr, status, errorMsg) {
					alert("Не удалось удалить изображение");
				}
			});
		}
	};
};
// Кнопка для загрузки изображений
ImageController.prototype.upploadButton = function () {
	var self = this;
	document.getElementById('userfile').onchange = function () {
		var formData = new FormData(this.form);
		$.ajax({
			url: "admin.php?action=addImage",
			type: "POST",
			data: formData,
			dataType: "json",
			processData: false,
			contentType: false,
			success: function(data) {
				self._addImages(data);
			},
			error: function(jqxhr, status, errorMsg) {
				alert("Файл не можеть быть загружен!");
			}
		});		
	};
};
// Подключает примесь sortNodesMixin для сортировки узлов
for(var key in sortNodesMixin) ImageController.prototype[key] = sortNodesMixin[key];