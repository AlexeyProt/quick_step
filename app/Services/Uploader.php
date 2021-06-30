<?php

namespace App\Services;

use App\Services\ImageCreator;

/* Загрузчик файлов */
class Uploader 
{	
	public $allowedExts = array();  // Допустимые расширения файлов
	
	public $name = null; // Имя файла
	
	public $uploadfile = null; // Путь к файлу

	public $names = []; // Имена файлов
	
	public $uploadfiles = []; // Пути к файлам	
	
	public $imageCreator;
	
	public function __construct(ImageCreator $imageCreator) {
		$this->imageCreator = $imageCreator;
	}
	// Загружает файл
	// string $uploaddir директория файла
	// string $formFields название поля формы с прикрепленным файлом
	public function upload ( $uploaddir, $formField='userfile' ) {
		foreach ( $this->allowedExts as $item ) {
			if ( preg_match( "/$item\$/i", $_FILES[$formField]['name'] ) ) {
				$this->name = basename($_FILES[$formField]['name']);
				$this->uploadfile = $uploaddir . iconv("utf-8", "cp1251", $this->name);
				if ( move_uploaded_file( $_FILES[$formField]['tmp_name'], $this->uploadfile ) ) {
					/* echo json_encode( array( 'location' => "/$uploaddir$this->name", 'name' => $this->name ) ); */
					return;
				}
				header("HTTP/1.1 500 Server Error");
				return;
			}		
		}
		header("HTTP/1.1 400 Invalid extension");
	}		
	// Загружает несколько файлов
	// string $uploaddir директория изображений
	// string $formFields название массива полей формы с прикрепленными файлами
	public function uploadMultiple ( $uploaddir, $formFields='userfiles' ) {
		foreach ( $_FILES[$formFields]['name'] as $key => $name ) {
			foreach ( $this->allowedExts as $item ) {
				if ( preg_match( "/$item\$/i", $name ) ) {
					$name = basename($name);
					$uploadfile = $uploaddir . iconv("utf-8", "cp1251", $name);
					if ( move_uploaded_file( $_FILES[$formFields]['tmp_name'][$key], $uploadfile ) ) {
						$this->uploadfiles[] = $uploadfile;
						$this->names[] = $name;
					}
				}
			}
		}
		/* echo json_encode( array( 'location' => $this->uploadfiles, 'name' => $this->names ) ); */
	}
	// Загружает изображение
	// string $uploaddir директория изображений
	// string $formFields название поля формы с прикрепленным файлом
	public function uploadImage( $uploaddir, $formField='userfile' ) {
		$this->allowedExts = array(".jpeg", ".jpg", ".png", ".gif", ".webp"); // Допустимые форматы
		$this->upload($uploaddir, $formField);
	}	
	// Загружает несколько изображений
	// string $uploaddir директория изображений
	// string $formField название массива полей формы с прикрепленными файлами
	public function uploadImages( $uploaddir, $formFields='userfiles' ) {
		$this->allowedExts = array(".jpeg", ".jpg", ".png", ".gif", ".webp"); // Допустимые форматы
		$this->uploadMultiple($uploaddir, $formFields);
	}
		
    /**
     * Создает миниатюры изображений
	 * Не отображается кириллица в названиях изображений миниатюр!
	 *
     * @param  string $uploadfile путь к файлу
     * @param  string $filename название файла
	 * @param string $filetype тип файла
	 * @param array $minisdir директории миниатюр 
     */	
	public function createMini( $uploadfile, $filename, $filetype, $minisdir ) {
		$this->imageCreator->setFile($uploadfile, $filename, $filetype);
		$this->imageCreator->createMini($minisdir['mini']);
		$this->imageCreator->createMedium($minisdir['medium']);
	}
	
    /**
     * Загружает изображение и заменяет его изображением меньшего размера	
	 *
     * @param  string $uploaddir путь к файлу
     * @param  string $formField название поля формы с прикрепленным файлом	изображения
	 * @return string название изображения
     */	
	public function uploadMiniImage($uploaddir, $formField='userfile') {
		$this->uploadImage($uploaddir, $formField);
		
		$this->imageCreator->setFile($this->uploadfile, $this->name, $_FILES[$formField]['type'], $uploaddir);
		$this->imageCreator->createMini($uploaddir);
		
		return $this->name;
	}
	
	public function uploadMiniMediumImage($uploaddir, $formField='userfile', $minisdir=null) {
		$minisdir = ( empty($minisdir) ) ? array( 'medium' => $uploaddir.'medium/', 'mini' => $uploaddir.'mini/' ) : $minisdir;
		
		$this->uploadImage($uploaddir, $formField);
		
		$this->createMini($this->uploadfile, $this->name, $_FILES[$formField]['type'], $minisdir);
		
		return $this->name;
	}
	
	// Загружает несколько изображений и сосздает их миниатюры
	// string $uploaddir путь к файлу
	// string $formField название массива полей формы с прикрепленными файлами	
	// array $minisdir директории миниатюр	
	public function uploadMiniMultiple( $uploaddir, $formField='userfiles', $minisdir=null ) {
		$minisdir = ( empty($minisdir) ) ? array( 'medium' => $uploaddir.'medium/', 'mini' => $uploaddir.'mini/' ) : $minisdir;
		$this->uploadImages( $uploaddir, $formField );
		$product_images = [];
		foreach ( $_FILES[$formField]['type'] as $key => $type ) {
			$this->createMini($this->uploadfiles[$key], $this->names[$key], $type, $minisdir);
			$product_images[] = new \App\Product_image(['name' => $this->names[$key]]);
		}
		return $product_images;
	}
}
