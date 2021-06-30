<?php

namespace App\Services;

class Transliterator
{
    protected $scheme = [
		'ЫЙ' => 'IY', 'ый' => 'iy',
		'ИЙ' => 'IY', 'ий' => 'iy',
		'ЪЕ' => 'YE', 'ъе' => 'ye',
		'ЪЁ' => 'YO', 'ъё' => 'yo',
		'А' => 'A',	'а' => 'a',
		'Б' => 'B', 'б' => 'b',
		'В' => 'V', 'в' => 'v',
		'Г' => 'G', 'г' => 'g',
		'Д' => 'D', 'д' => 'd',
		'Е' => 'E', 'е' => 'e',
		'Ё' => 'Yo', 'ё' => 'yo',
		'Ж' => 'Zh', 'ж' => 'zh',
		'З' => 'Z', 'з' => 'z',
		'И' => 'I', 'и' => 'i',
		'Й' => 'Y', 'й' => 'y',
		'К' => 'K', 'к' => 'k',
		'Л' => 'L', 'л' => 'l',
		'М' => 'M', 'м' => 'm',
		'Н' => 'N', 'н' => 'n',
		'О' => 'O', 'о' => 'o',
		'П' => 'P', 'п' => 'p',
		'Р' => 'R', 'р' => 'r',
		'С' => 'S', 'с' => 's',
		'Т' => 'T', 'т' => 't',
		'У' => 'U', 'у' => 'u',
		'Ф' => 'F', 'ф' => 'f',
		'Х' => 'Kh', 'х' => 'kh',
		'Ц' => 'Ts', 'ц' => 'ts',
		'Ч' => 'Ch', 'ч' => 'ch',
		'Ш' => 'Sh', 'ш' => 'sh',
		'Щ' => 'Sch', 'щ' => 'sch',
		'Ъ' => '', 'ъ' => '',
		'Ы' => 'Y', 'ы' => 'y',
		'Ь' => '', 'ь' => '',
		'Э' => 'E', 'э' => 'e',
		'Ю' => 'Yu', 'ю' => 'yu',
		'Я' => 'Ya', 'я' => 'ya',
		' ' => '-'		
	];
	
	public function url($url) {
		$url = preg_replace_callback_array(
			[
				'/традиційний натуральний матовий/ui' =>	function($matches) {
					return 'традиционный натуральный матовый';
				}				
			],
			$url
		);		
		
		$url = preg_replace_callback_array(
			[
				'#&.*;|[^ /\-\w]+#ui' =>	function($matches) {
					return '';
				},				
				'/ый|ий|ъе|ъё/ui' =>	function($matches) {
					return $this->scheme[$matches[0]];
				},				
				'/[ а-яё]/ui' =>	function($matches) {
					return $this->scheme[$matches[0]];
				}
			],
			$url
		);

		return strtolower($url);
	}
}
