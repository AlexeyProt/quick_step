/* Создает и отправляет форму методом пост */
class PostForm {
	constructor(url, data) {
		this.url = url;
		this.data = data;
	}

	_createToken() {
		let input = document.createElement('input');
		
		input.name = '_token';
		input.type = 'hidden';
		input.value = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
		
		this._form.append(input);		
	}

	_createForm() {
		this._form = document.createElement('form');
		document.body.append(this._form);
		
		this._createToken();
		
		this._form.method = 'post';
		this._form.action = this.url;
		for (let name in this.data) {
			let input = document.createElement('input');
			
			input.type = 'hidden';
			input.name = name;
			input.value = this.data[name];
			this._form.append(input);
		}		
	}

	redirect() {
		this._createForm();
		
		this._form.submit();
		
		this._form.remove();
	}
	
	redirectBlank() {
		this._createForm();
		this._form.target = '_blank';
		
		this._form.submit();		
		
		this._form.remove();
	}
}