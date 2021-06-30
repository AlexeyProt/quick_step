<?php

namespace App\Services;

class ImageCreator
{
    /**
     * Идентификатор изображения
     *
     * @var resource
     */	
    protected $image;
	
    /**
     * Ширина оригинального изображения
     *
     * @var int
     */		
	protected $width_orig;

    /**
     * Высота оригинального изображения
     *
     * @var int
     */		
	protected $height_orig;

    /**
     * Отношение ширины к высоте изображения
     *
     * @var int
     */			
	protected $ratio;

    /**
     * Имя файла
     *
     * @var string
     */		
	protected $filename;		

	/**
	* Устанавливает файл изображения
	*
	* @param string $uploadfile путь к файлу
	* @param string $filename имя файла
	* @param string $filetype тип файла	
	*/	
	public function setFile($uploadfile, $filename, $filetype) {
		$this->filename = $filename;
		
		if ($this->image) imagedestroy($this->image);
		
		switch ( $filetype ) {
			case "image/jpeg":
				$this->image = imagecreatefromjpeg($uploadfile);
				break;
			case "image/png":
				$this->image = imagecreatefrompng($uploadfile);
				break;
			case "image/gif":
				$this->image = imagecreatefromgif($uploadfile);
				break;	
			case "image/webp":
				$this->image = imagecreatefromwebp($uploadfile);
				break;					
		}
		list($this->width_orig, $this->height_orig) = getimagesize($uploadfile);		
		
		$this->ratio = $this->width_orig/$this->height_orig;
	}
	
	/**
	* Создает изображение малого размера
	*
	* @param string $minidir директория малого изображения
	*/
	public function createMini($minidir) {
		$height_mini = 220;
		$width_mini = $height_mini*$this->ratio;
		$mini_image = imagecreatetruecolor($width_mini, $height_mini);
		imagecopyresampled($mini_image, $this->image, 0, 0, 0, 0, $width_mini, $height_mini, $this->width_orig, $this->height_orig);
		imageinterlace($mini_image, true);
		imagejpeg($mini_image, $minidir.$this->filename, 100);	
	}	

	/**
	* Создает изображение среднего размера
	*
	* @param string $mediumdir директория среднего изображения
	*/	
	public function createMedium($mediumdir) {		
		$width_medium = 500;
		$height_medium = $width_medium/$this->ratio;
		$medium_image = imagecreatetruecolor($width_medium, $height_medium);
		imagecopyresampled($medium_image, $this->image, 0, 0, 0, 0, $width_medium, $height_medium, $this->width_orig, $this->height_orig);
		imageinterlace($medium_image, true);
		imagejpeg($medium_image, $mediumdir.$this->filename, 100);	
	}		
	
	public function __destruct() {
		imagedestroy($this->image);	
	}
}
