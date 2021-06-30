"use strict";
/* Редактор */
class Editor extends BaseForm {
	constructor(args) {
		super(args);
		
		this.url = ""; 
		
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
		
/* 		this._elem.elements['service[id]'].value = serviceData.id
		
		history.replaceState( '', '', document.location.origin+'/admin/service/edit/'+serviceData.id );	 */
		
		this._snackbar.show('Изменения сохранены');
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
			this._snackbar.show('Произошла ошибка. Попробуйте еще раз');
			
			throw new Error(e);
		} finally {
			this.progressAnimation.stop();
		}		
	}

	// Добавляет объект окна подтверждения this.windowSave
	_addWindowSave() {
		this.windowSave = this.window.createWindow();	
		this.windowSave.addNotice('Сохранить изменения?<br>');
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