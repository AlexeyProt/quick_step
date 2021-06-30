"use strict";
/* Класс транслитератор */
function Transliterator() {
	this.scheme = {
		А: 'A',	а: 'a',
		Б: 'B', б: 'b',
		В: 'V', в: 'v',
		Г: 'G', г: 'g',
		Д: 'D', д: 'd',
		Е: 'E', е: 'e',
		Ё: 'Yo', ё: 'yo',
		Ж: 'Zh', ж: 'zh',
		З: 'Z', з: 'z',
		И: 'I', и: 'i',
		Й: 'J', й: 'j',
		К: 'K', к: 'k',
		Л: 'L', л: 'l',
		М: 'M', м: 'm',
		Н: 'N', н: 'n',
		О: 'O', о: 'o',
		П: 'P', п: 'p',
		Р: 'R', р: 'r',
		С: 'S', с: 's',
		Т: 'T', т: 't',
		У: 'U', у: 'u',
		Ф: 'F', ф: 'f',
		Х: 'H', х: 'h',
		Ц: 'C', ц: 'c',
		Ч: 'Ch', ч: 'ch',
		Ш: 'Sh', ш: 'sh',
		Щ: 'Shh', щ: 'shh',
		Ъ: '\'', ъ: '\'',
		Ы: 'Y', ы: 'y',
		Ь: '._', ь: '._',
		Э: 'E-', э: 'e-',
		Ю: 'Yu', ю: 'yu',
		Я: 'Ya', я: 'ya',
		' ': '-'
	};
}

/* Внутренние методы */



/* Внешние методы */

Transliterator.prototype.transliterate = function (string) {
	var self = this;
	var result = string.replace(/[А-ЯЁ а-яё]/g, function (match) {
		return self.scheme[match];
	});
	return result.toLowerCase();
};