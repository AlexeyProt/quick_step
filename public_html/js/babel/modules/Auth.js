/* Класс формы автроризации */
function Auth(elem) {
	BaseForm.apply(this, arguments);	
	this._elem = elem;
	
	this.confirm();
}
// Наследуюет класс BaseForm
Auth.prototype = Object.create(BaseForm.prototype);
Auth.prototype.constructor = Auth;

/* Внутренние методы */

// Устанавливает обязательные поля
Auth.prototype._setRequiredFields = function () {
	this.addRequiredField( this._elem.querySelector('[name="user"]'), 'Пожалуйста, введите логин!<br>' );
	this.addRequiredField( this._elem.querySelector('[name="password"]'), 'Пожалуйста, введите пароль!<br>' );

};
// Устанавливает поля для проверки на правильность их заполнения
Auth.prototype._setCheckedCorFields = function (data) {
	this.addRequiredField( this._elem.querySelector('[name="user"]'), 'Неверный логин!<br>', data === 'Неверный логин' );	
	this.addRequiredField( this._elem.querySelector('[name="password"]'), 'Неверный пароль!<br>', data === 'Неверный пароль' );		
};

/* Внешние методы */

Auth.prototype._ajax = function (formData) {
	var self = this;
	$.ajax({
		url: "/login",
		type: "POST",
		data: formData,
		processData: false,
		contentType: false,
		beforeSend: function() {
			self.addStatus('Идет отправка данных...');
		},
		success: function(data) {
			self._checkCorrect(data);
			document.location.href = '/admin';
		},
		error: function(jqxhr, status, errorMsg) {
			self._notice.innerHTML = "";
			self.addNotice('Извините, произошла ошибка. Попробуйте отправить данные позже.');
		}
	});		
};