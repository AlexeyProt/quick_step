<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Transliterator;
use App\Services\ImageCreator;
use App\Services\Admin\ProductService;
use App\Page;

ini_set('max_execution_time', 600);

class ParseController extends Controller
{
	protected $currentUrl;
	
	protected $host;
	
	protected $path;
	
	protected $imagePositions;
	
	protected $category;
	
	protected $catalog;
	
	protected $characteristics;
	
	public function __construct(ProductService $productService, Transliterator $transliterator, Request $request) {
		$this->productService = $productService;
		$this->transliterator = $transliterator;
		$this->request = $request;
	}
	
	public function parseCollection() {
		$pageUrl = $this->request->input('pageUrl');
		( preg_match('/filter/', $pageUrl) ) ? $this->setFilterUrlSegments($pageUrl) : $this->setUrlSegments($pageUrl);
		$this->setImagePositions();
		$this->setCatalog();
		$this->setCharacteristics();
		
		$urls = $this->getPagesUrls();

		foreach ($urls as $url) {
			$html = file_get_contents($url);	
			try {
				$floor = $this->storeFloor($html);
			} catch (\ErrorException $e) {
				next($this->imagePositions);
				
				continue;
			}			
			try {
				$plinth = $this->storePlinth($html);
			} catch (\ErrorException $e) {				
				continue;
			}
			
			$laminate_products_view = \App\Laminate_product_view::where('page_id', $floor->laminate_products_view->page_id)->
				where('category_id', 16)->update(['product_id' => $plinth->id]);
		}
	}	
		
	protected function setImagePositions() {
		preg_match_all('/\d-(\d)/', $this->request->input('imagePositions'), $matches);
		
		$this->imagePositions = $matches[1];
	}
	
	protected function setCatalog() {
		$category = \App\Category::findOrFail($this->request->input('product.category_id'));
		
		$this->catalog = $category->name;
	}
	
	protected function setCharacteristics() {
		$this->characteristics = \App\Characteristic::whereIn('name', ['Длина', 'Толщина', 'Высота'])
			->get()->keyBy('name');
	}
	
	protected function storeFloor($html) {
		$code = $this->getCodeAndName($html)['code'];
		if ( \App\Product::where('name', 'like', "%$code%")->exists() ) throw new \ErrorException('Товар с данным кодом уже существует');
		
		$productName = $this->getProductName($html);
		$translitProductName = $this->transliterator->url($productName);
		$imagePosition = current($this->imagePositions);
		
		next($this->imagePositions);
		
		$data = $this->request->all();
		$data['product_images'] = $this->saveImages($html, $this->catalog, $translitProductName, $imagePosition);
		$data['product']['vendor_code'] = $this->productService->getDefaultVendorCode();
		$data['product']['name'] = $productName;
		$data['page']['title'] = "Купить $productName";
		$data['page']['uri'] = $this->createUri($translitProductName);
		
		return $this->productService->store($data);		
	}
	
	public function parseCollectionForm() {		
		$page = new Page();
		$page->title = 'Редактирование товара';
		$page->description = $page->title;			
		$categories = new \App\Category();
		$categories = $categories->withoutGlobalScope('published')->get();		
		
		$defaultCharactValues = [];
		$defaultCharactValues['Производитель'] = 'Quick Step';
		$defaultCharactValues['Страна'] = 'Бельгия';
		$defaultCharactValues['Длина'] = 1820;
		$defaultCharactValues['Ширина'] = 190;
		$defaultCharactValues['Толщина'] = 14;
		/* $defaultCharactValues['Класс'] = 32; */
		$defaultCharactValues['Количество фасок'] = 4;
		$defaultCharactValues['Количество полос'] = 1;
		$defaultCharactValues['Селекция'] = 'натур';
		$defaultCharactValues['Покрытие'] = 'масло';
		/* $defaultCharactValues['Тип помещения'] = 'ванная комната, гостиная, коридор, кухня, офис'; */
		/* $defaultCharactValues['Стилизация'] = 'под дерево'; */
		$defaultCharactValues['Тип соединения'] = 'замок или клей';
		$defaultCharactValues['Площадь упаковки'] = 2.075;
		$defaultCharactValues['В упаковке, шт.'] = 6;
		$defaultCharactValues['Вес упаковки'] = 20;		
		/* $defaultCharactValues['Влагостойкость'] = 'Да'; */
			
		$categoryPrice = \App\Category::where('name', 'Palazzo')->first()->category_price->price;	
			
		$units = \App\Unit::all();		
		$characteristics = \App\Characteristic::with('unit')
		->whereIn('name', array_keys($defaultCharactValues))->get();
		
		$plinthDefaultCharactValues = [];
		$plinthDefaultCharactValues['Длина'] = 2400;
		$plinthDefaultCharactValues['Толщина'] = 12;
		$plinthDefaultCharactValues['Высота'] = 58;
		$plinthDefaultCharactValues['Производитель'] = 'Quick Step';
		$plinthDefaultCharactValues['Страна'] = 'Россия';	

		$plinthCharacteristics = \App\Characteristic::with('unit')
		->whereIn('name', array_keys($plinthDefaultCharactValues))->get();		
	
		return view('admin.pages.parseCollectionForm', [
			'page' => $page,
			'categories' => $categories,
			'units' => $units,
			'characteristics' => $characteristics,
			'plinthCharacteristics' => $plinthCharacteristics,
			'defaultCharactValues' => $defaultCharactValues,
			'plinthDefaultCharactValues' => $plinthDefaultCharactValues,
			'categoryPrice' => $categoryPrice
		]);		
	}
	
	protected function setUrlSegments($url) {
		$this->currentUrl = $url;
		
		preg_match('#(https://(.*?))(/(.*))#', $this->currentUrl, $urlSegments);	
		$this->host = $urlSegments[1];
		$this->path = $urlSegments[3];		
	}
	
	protected function setFilterUrlSegments($url) {
		$this->currentUrl = $url;
		preg_match('#(https://.*?)(/.*?/).*?\?filter=floortypecode\.eq\.(.*?)/floortyperange.eq..*?_(.*?)&#', $url, $urlSegments);	
		$this->host = $urlSegments[1];
		
		switch($urlSegments[3]) {
			case 'lmp':
				$this->category = 'ламинат';
				break;
			case 'lvt':
				$this->category = 'винил';
				break;
			case 'ewf':
				$this->category = 'паркет';
				break;				
		}
		$category = urlencode($this->category);
		
		$this->path = "{$urlSegments[2]}{$category}/{$urlSegments[4]}";
		$this->path = str_replace('%20', '-', $this->path);
	}
	
	protected function createUri($productName) {
		$category = ($this->category == 'паркет') ? 'паркетная доска' : $this->category;
		
		return $this->transliterator->url("$category/{$this->catalog}/$productName");
	}
	
	protected function getCodeAndName($html) {
		preg_match('#<title>(.*?) \| (.*?)</title>#', $html, $match);

		return ['code' => $match[1], 'name' => $match[2]];
	}
	
	protected function getProductName($html) {
		$path = urldecode($this->path);
		preg_match('#(/.*?/.*?)/.*#', $path, $urlSegments);
		$categoryPath = $urlSegments[1];
		$collectionPath = $urlSegments[0];
		
		$name = $this->getCodeAndName($html);
		
		preg_match("#$categoryPath\">(.*?)<#", $html, $match);
		$category = $match[1];
		
/* 		preg_match("#$collectionPath\">(.*?)<#", $html, $match);
		$collection = $match[1]; */
		$collection = $this->catalog;
		
		return $this->getCorrectName("$category Quick Step $collection {$name['name']} {$name['code']}");
	}
	
	protected function storePlinth($parentHtml) {
		$url = $this->getPlinthUrl($parentHtml);
		$html = file_get_contents($url);
		$code = $this->getCodeAndName($html)['code'];
		$product = \App\Product::where('name', 'like', "%$code%")->first();
		
		if ($product) return $product;		
		
		$productName = $this->getPlinthName($html);
		
		$translitProductName = $this->transliterator->url($productName);
			
		$data = $this->request->input('plinth');
		$data['product_images'] = $this->saveImages($html, $this->catalog.'/plinthes', $translitProductName);
		$data['product_characteristics'] = $this->getPlinthCharact($html);
		$data['product']['vendor_code'] = $this->productService->getDefaultVendorCode();
		$data['product']['name'] = $productName;
		$data['product']['category_id'] = 16;
		$data['product']['unit_id'] = 5;
		$data['page']['title'] = "Купить $productName";
		$data['page']['uri'] = $translitProductName;
		
		return $this->productService->storePlinth($data);					
	}
	
	protected function getCorrectName($productName) {
		/* $productName = preg_replace('/традиційний натуральний матовий/ui', 'традиционный натуральный матовый', $productName); */
		
		return preg_replace(['/&.*;/', '/[^ |\-\w()]+/ui', '/ +/'], ['', '', ' '], $productName);
	}
	
	protected function getPlinthName($html) {
		$name = $this->getCodeAndName($html);
		
		if ($this->category == 'паркет') {
			return $this->getCorrectName("{$name['name']} Quick Step {$name['code']}");
		}
		
		preg_match('#data-webid="description">(.*?) \|#', $html, $matches);
		$description = $matches[1];
		
		return $this->getCorrectName("$description Quick Step {$name['name']} {$name['code']}");
	}
	
	protected function getPlinthCharact($html) {
		preg_match_all('#specificationattribute-value">(\d+) мм<#u', $html, $matches);
		
		return [
			$this->characteristics['Длина']->id => ['characteristic_id' => $this->characteristics['Длина']->id, 'value' => $matches[1][1]],
			$this->characteristics['Толщина']->id => ['characteristic_id' => $this->characteristics['Толщина']->id, 'value' => $matches[1][2]],
			$this->characteristics['Высота']->id => ['characteristic_id' => $this->characteristics['Высота']->id, 'value' => $matches[1][0]]
		];
	}
	
	protected function getPlinthUrl($html) {
		switch ($this->category) {
			case 'ламинат':
				if ( !preg_match('#(/ru-ru/аксессуары/qssk(.*?))"#', $html, $match) ) {
					throw new \ErrorException('Стандартный плинтус не найден');
				}				
				break;
			case 'винил':
				if ( !preg_match('#(/ru-ru/аксессуары/qsvs(.*?))"#', $html, $match) ) {
					throw new \ErrorException('Стандартный плинтус не найден');
				}				
				break;	
			case 'паркет':
				if ( !preg_match('#(/ru-ru/аксессуары/qswp(.*?))"#', $html, $match) ) {
					throw new \ErrorException('Плинтус для паркета не найден');
				}				
				break;					
		}

		return $this->encodeUrl($this->host.$match[1]);
	}
	
	public function getPagesUrls() {
		$path = urldecode($this->path);

		$html = file_get_contents($this->currentUrl);
		$re = "#($path/(.*?))\"#";
		
		preg_match_all($re, $html, $matches, PREG_SET_ORDER, 0);
		
		$urls = [];
		foreach ($matches as $match) {
			$urls[] = $this->encodeUrl($this->host.$match[1]);
		}
		$urls = array_unique($urls);

		return $urls;
	}
	
	public function showForm() {
		$page = new Page();
		$page->title = 'Загрузка изображений';
			
		
		return view('admin.pages.parseForm', ['page' => $page]);
	}
	
	protected function saveImages($html, $catalog, $imageName, $imagePosition=0) {
		$catalogPath = $_SERVER['DOCUMENT_ROOT'] . "/images/parse/$catalog/";
		$uploadedCatalogPath = $_SERVER['DOCUMENT_ROOT'] . "/images/products/";
		
		$imageCreator = new ImageCreator();
		
		$imageUrls = $this->getImageUrls($html, $imagePosition);
		$product_images = collect();
		
		foreach ($imageUrls as $key => $imageUrl) {
			$image = file_get_contents($imageUrl);
			$number = ($key) ? '-'.$key : ''; 
			$finfo = new \Finfo(FILEINFO_MIME_TYPE);
			$fileType = $finfo->buffer($image);
			$extention = explode('/', $fileType)[1];
			$name = "{$imageName}{$number}.$extention";
			$uploadedImagePath = $uploadedCatalogPath.$name;
			
			file_put_contents($catalogPath.$name, $image);	
			file_put_contents($uploadedImagePath, $image);	
			
			$imageCreator->setFile($uploadedImagePath, $name, $fileType);
			$imageCreator->createMini($uploadedCatalogPath.'mini/');
			$imageCreator->createMedium($uploadedCatalogPath.'medium/');
			
			$product_images[] = ['name' => $name];
		}	
		
		return $product_images;
	}
	
    public function loadImages(Request $request) {
		$url = $request->input('pageUrl');
		$imageName = $request->input('imageName');
		$imagePosition = $request->input('imageIndex');
		$catalog = $request->input('catalog');
		$html = file_get_contents($url);

		$path = $_SERVER['DOCUMENT_ROOT'] . "/images/parse/$catalog/$imageName";
		$imageUrls = $this->getImageUrls($html, $imagePosition);
		
		foreach ($imageUrls as $key => $imageUrl) {
			$number = ($key) ? '-'.$key : ''; 

			file_put_contents($path.$number.'.jpeg', file_get_contents($imageUrl));	
		}			
	}
	
	protected function getImageUrls($html, $imagePosition=0) {
		$re = '#href="(https://cdn2.quick-step.com/-/media/imported assets/flooring(.*?))">#su';
		
		preg_match_all($re, $html, $matches, PREG_SET_ORDER, 0);
			
		$arr1 = $matches;
		$arr2 = $matches;
		$arr1 = array_slice($arr1, $imagePosition);
		$arr2 = array_slice($arr2, 0, $imagePosition);
		$arr = array_merge($arr1, $arr2);
		
		$urls = [];
		
		foreach ($arr as $match) {
			$urls[] = $this->encodeUrl($match[1]);
		}
		
		return $urls;
	}
	
	protected function encodeUrl($url) {
		$url = urlencode($url);
		$url = str_replace("%2F", "/", $url);	
		$url = str_replace("%3A", ":", $url);
		$url = str_replace("%3D", "=", $url);
		$url = str_replace("%3F", "?", $url);	
		$url = str_replace("+", "%20", $url);	

		return $url;
	}
}
