"use strict";
/* Редактор услуги */
class ParseForm extends BaseForm {
	constructor(args) {
		super(args);
		
		this.url = "/admin/load-images"; 
		
		this.window = new WindowForm( document.getElementById('confirmContainer') );
		this.progressAnimation = new ProgressAnimation(this._elem.querySelector('.progressContainer'));
		this._snackbar = new Snackbar();		
	}

	_setRequiredFields() {
		
	}

	async _saveHandler() {	
		this.checkFields(); // Проверяет обязательные поля
		this.windowSave.closeHandler();
		
		let serviceData = await this._save(); // Отправляет запрос
		
		this._elem.elements['service[id]'].value = serviceData.id
		
		history.replaceState( '', '', document.location.origin+'/admin/service/edit/'+serviceData.id );	
		
		this._snackbar.show('Услуга сохранена');
	};

	async _save() {
		this.progressAnimation.start();
		
		let formData = new FormData(this._elem);
		try {
			let response = await fetch(this.url, {
				method: 'POST',
				headers: {			
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
				},
				body: formData
			});
			
			let results = await response.json();			

			return results;			
		} catch(e) {
			this.windowSave.closeHandler();
			
			this._snackbar.show('Произошла ошибка. Попробуйте еще раз');
			
			throw new Error(e);
		} finally {
			this.progressAnimation.stop();
		}		
	}

	// Добавляет объект окна подтверждения this.windowDestroy
	_addWindowDestroy() {
		this.windowDestroy = this.window.createWindow();
		this.windowDestroy.addNotice('Удалить услугу?<br>');
		this.windowDestroy.addButton('[data-button="confirm"]', this._destroyHandler.bind(this));
		this.windowDestroy.addButton('[data-button="cancel"]', this.windowDestroy.closeHandler.bind(this.windowDestroy));
	};
	// Добавляет объект окна подтверждения this.windowCancel
	_addWindowCancel() {
		this.windowCancel = this.window.createWindow();
		this.windowCancel.addNotice('Отменить все изменения услуги?<br>');
		this.windowCancel.addButton('[data-button="confirm"]', this._cancelHandler.bind(this));
		this.windowCancel.addButton('[data-button="cancel"]', this.windowCancel.closeHandler.bind(this.windowCancel));
	};

	// Добавляет объект окна подтверждения this.windowSave
	_addWindowSave() {
		this.windowSave = this.window.createWindow();	
		this.windowSave.addNotice('Сохранить услугу?<br>');
		this.windowSave.addButton('[data-button="confirm"]', () => this._saveHandler());
		this.windowSave.addButton('[data-button="cancel"]', this.windowSave.closeHandler.bind(this.windowSave));
	};

	// Добавляет кнопки формы
	_buttons() {
		this.windowSave.open('[data-button="sendData"]');
	};

	start() {
		this._addWindowSave();
		this._buttons();	
	}
}