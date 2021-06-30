<?php

namespace App\Services;

/* Загрузчик файлов */
class Uploader 
{	
	public $allowedExts = array();  // Допустимые расширения файлов
	
	public $name = null; // Имя файла
	
	public $uploadfile = null; // Путь к файлу
	// Загружает файл
	// string $uploaddir директория файла
	// string $formFields название поля формы с прикрепленным файлом
	public function upload ( $uploaddir, $formField='userfile' ) {
		foreach ( $this->allowedExts as $item ) {
			if ( preg_match( "/$item\$/i", $_FILES[$formField]['name'] ) ) {
				$this->name = basename($_FILES[$formField]['name']);
				$this->uploadfile = $uploaddir . iconv("utf-8", "cp1251", $this->name);
				if ( move_uploaded_file( $_FILES[$formField]['tmp_name'], $this->uploadfile ) ) {
					echo json_encode( array( 'location' => "/$uploaddir$this->name", 'name' => $this->name ) );
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
		$uploadedFiles = array();
		$names = array();
		foreach ( $_FILES[$formFields]['name'] as $key => $name ) {
			foreach ( $this->allowedExts as $item ) {
				if ( preg_match( "/$item\$/i", $name ) ) {
					$name = basename($name);
					$uploadfile = $uploaddir . iconv("utf-8", "cp1251", $name);
					if ( move_uploaded_file( $_FILES[$formFields]['tmp_name'][$key], $uploadfile ) ) {
						$uploadedFiles[] = "/$uploaddir"."$name";
						$names[] = $name;
					}
				}
			}
		}
		echo json_encode( array( 'location' => $uploadedFiles, 'name' => $names ) );
	}
	// Загружает изображение
	// string $uploaddir директория изображений
	// string $formFields название поля формы с прикрепленным файлом
	public function uploadImage( $uploaddir, $formField='userfile' ) {
		$this->allowedExts = array(".jpg", ".png", ".gif", ".webp"); // Допустимые форматы
		$this->upload($uploaddir, $formField);
	}	
	// Загружает изображения
	// string $uploaddir директория изображений
	// string $formField название массива полей формы с прикрепленными файлами
	public function uploadImages( $uploaddir, $formFields='userfiles' ) {
		$this->allowedExts = array(".jpg", ".png", ".gif", ".webp"); // Допустимые форматы
		$this->uploadMultiple($uploaddir, $formFields);
	}
	// Оптимизировать метод!
	// Не отображается кириллица в названиях изображений миниатюр!
	// Загружает изображение и создает миниатюры
	// string $uploaddir директория изображений
	// string $formFields название поля формы с прикрепленным файлом
	// array $minisdir директории миниатюр
	public function UploadMini( $uploaddir, $formField='userfile', $minisdir=null ) {
		$minisdir = ( empty($minisdir) ) ? array( 'medium' => $uploaddir.'medium/', 'mini' => $uploaddir.'mini/' ) : $minisdir;
		$this->uploadImage( $uploaddir, $formField );
		switch ( $_FILES['userfile']['type'] ) {
			case "image/jpeg":
				$image = imagecreatefromjpeg($this->uploadfile);
				break;
			case "image/png":
				$image = imagecreatefrompng($this->uploadfile);
				break;
			case "image/gif":
				$image = imagecreatefromgif($this->uploadfile);
				break;	
			case "image/webp":
				$image = imagecreatefromwebp($this->uploadfile);
				break;					
		}
		list($width_orig, $height_orig) = getimagesize($this->uploadfile);
		$ratio = $width_orig/$height_orig;
		
		// Создание миниатюры
		$height_mini = 220;
		$width_mini = $height_mini*$ratio;
		$mini_image = imagecreatetruecolor($width_mini, $height_mini);
		imagecopyresampled($mini_image, $image, 0, 0, 0, 0, $width_mini, $height_mini, $width_orig, $height_orig);
		imageinterlace($mini_image, true);
		imagejpeg($mini_image, $minisdir['mini'].$this->name, 100);
		
		// Создание среднего изображения
		$width_medium = 500;
		$height_medium = $width_medium/$ratio;
		$medium_image = imagecreatetruecolor($width_medium, $height_medium);
		imagecopyresampled($medium_image, $image, 0, 0, 0, 0, $width_medium, $height_medium, $width_orig, $height_orig);
		imageinterlace($mini_image, true);
		imagejpeg($medium_image, $minisdir['medium'].$this->name, 100);
		
		imagedestroy($image);		
	}
}
