class FieldMask {
	constructor() {

	}

	/**
	 * Устанавливает поле для телфона
	 *
	 * @param node field 
	 */
	phone(field) {
		let mask = '+7 (___) ___ ____';

		let start = field.selectionStart;
		let	end = field.selectionEnd;
			
		while ( /[) ]/g.test(field.value[end]) ) {
			end++;
			start = end;
		}

		let	val = field.value.replace(/(.*?)\s(.*?)/, '$2');
		val = val.replace(/[^0-9]/g, '');
		val = val.replace(/[\d]([\d]{10})/g, '$1');
		
		let i = 0;
		mask = mask.replace(/_/g, function (match, offset, input) {
			return val.charAt(i++) || "_";

		});
		field.value = mask;
		if ( field.value[end-1] === '_' || field.value[end-1] === undefined ) {
			end = field.value.indexOf('_');
		}
		if ( field.value[end-1] === ')' ) {
			end--
			if (field.value[end-1] === '_') end--;
		}
		if ( !/(.*?)\s\((.*?)/.test( field.value.slice(0, start-1) )) end = field.value.indexOf('_');	// Если курсор находится в часте строки '+7 (' то он устанавливается перед первым '_'
		
		start = end;
		field.setSelectionRange(start, end);		
	}
	
	_correctPrice(price) {
		return price.replace(/,/g, '.') // Замена , на .
		.replace(/[^\d\.]+/g, '') // Удаление всех символов кроме цифр и .
		.replace(/^([^\.]*\.)|\./g, '$1') // Оставляет только одну .
		.replace(/(\d\.\d{0,2})\d*/, '$1') // Оставляет последние два знака после .
		.replace(/^\.(.*)/, '$1');	// Удаляет . если она идет первым символом	
	}
	
	/**
	 * Устанавливает цену для contenteditable элемента
	 *
	 * @param node editableEl
	*/
	_priceContenteditableEl(editableEl) {
		let selection = document.getSelection();
		let range = new Range();
		let caretPosition = selection.anchorOffset;		
		
		editableEl.innerHTML = this._correctPrice(editableEl.innerHTML);

		if (caretPosition > editableEl.innerHTML.length) caretPosition = editableEl.innerHTML.length;
		if (!editableEl.firstChild) return;
		
		range.setStart(editableEl.firstChild, caretPosition)
		range.collapse(true)

		selection.removeAllRanges()
		selection.addRange(range)			
	}

	/**
	 * Устанавливает цену для input элемента
	 *
	 * @param node field
	*/	
	_priceInputEl(field) {
		let	start = field.selectionStart;	
		let	end = field.selectionEnd;	
		
		field.value = this._correctPrice(field.value);
		
		field.setSelectionRange(start, end);			
	}	
	/**
	 * Устанавливает поле для цены
	 *
	 * @param node field 
	 */	
	 price(field) {		
		(field.value) ? this._priceInputEl(field) : this._priceContenteditableEl(field);
	 }
}