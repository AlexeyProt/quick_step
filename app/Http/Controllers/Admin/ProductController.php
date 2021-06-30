<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Product;
use App\Category;
use App\Product_group;
use App\Page;
use App\Services\Uploader;
use App\Services\PaginationService;
use App\Services\Admin\ProductService;

class ProductController extends Controller
{
	public $product;
	
	public $paginationService;
	
	public function __construct(Product $product, PaginationService $paginationService) {
		$this->product = $product;
		$this->paginationService = $paginationService;
	}	
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		$page = new Page();
		$page->title = 'Товары';
		$page->description = $page->title;		
		
		$products = $this->product->with(['category' => function ($query) {
			$query->withoutGlobalScope('published');
		},
		'price.price_history', 'product_images', 'product_stock']);
		
		$this->paginationService->addBuilder($products);
		$products = $this->paginationService->paginate(15);
	
		return view('admin.pages.products', ['page' => $page, 'products' => $products]);
    }
	
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showGroupProducts()
    {
		$page = new Page();
		$page->title = 'Товары для групп';
		$page->description = $page->title;		
		
		$products = $this->product->has('group_product')->with(['category' => function ($query) {
			$query->withoutGlobalScope('published');
		},
		'price.price_history', 'product_images', 'product_stock']);
		
		$this->paginationService->addBuilder($products);
		$products = $this->paginationService->paginate(15);

		return view('admin.pages.groupProducts', ['page' => $page, 'products' => $products]);
    }	

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(ProductService $productService)
    {
		$page = new Page();
		$page->title = 'Редактирование товара';
		$page->description = $page->title;			
		$categories = new Category();
		$categories = $categories->withoutGlobalScope('published')->get();		
		
		$defaultCharactValues = [];
		$defaultCharactValues['Производитель'] = 'Unilin Flooring';
		$defaultCharactValues['Страна'] = 'Россия / Бельгия';
		$defaultCharactValues['Класс'] = 33;
		$defaultCharactValues['Длина'] = 1200;
		$defaultCharactValues['Ширина'] = 190;
		$defaultCharactValues['Толщина'] = 8;
		
		$defaultCharactValues['Тип соединения'] = 'Универсальный замок';
		$defaultCharactValues['Тиснение'] = 'Да';
		$defaultCharactValues['Фаска'] = 'Да';
		
		$defaultCharactValues['Площадь упаковки'] = 1.596;
		$defaultCharactValues['Планка'] = 'Стандартная';
		$defaultCharactValues['В упаковке, шт.'] = 7;
			
		$categoryPrice = \App\Category::where('name', 'Clix Floor Extra')->first()->category_price->price;	
			
		$units = \App\Unit::all();		
		$characteristics = \App\Characteristic::with('unit')
		->whereIn('name', array_keys($defaultCharactValues))->get();
	
		return view('admin.pages.editProduct', [
			'page' => $page,
			'categories' => $categories,
			'units' => $units,
			'characteristics' => $characteristics,
			'defaultCharactValues' => $defaultCharactValues,
			'defaultVendorCode' => $productService->getDefaultVendorCode(),
			'categoryPrice' => $categoryPrice
		]);
    }
	
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createPlinth(ProductService $productService)
    {
		$page = new Page();
		$page->title = 'Редактирование плинтуса';
		$page->description = $page->title;			
		$categories = new Category();
		$categories = $categories->withoutGlobalScope('published')->get();
		
		$units = \App\Unit::all();		
		$characteristics = \App\Characteristic::with('unit')
		->whereIn('name', [
			'Длина', 'Толщина', 'Высота',
			'Производитель', 'Страна'
		])->get();	
		
		$defaultCharactValues = [];
		$defaultCharactValues['Длина'] = 2400;
		$defaultCharactValues['Толщина'] = 12;
		$defaultCharactValues['Высота'] = 58;
		$defaultCharactValues['Производитель'] = 'Quick Step';
		$defaultCharactValues['Страна'] = 'Россия';
		
		return view('admin.pages.editPlinth', [
			'page' => $page,
			'categories' => $categories,
			'units' => $units,
			'characteristics' => $characteristics,
			'defaultCharactValues' => $defaultCharactValues,
			'defaultVendorCode' => $productService->getDefaultVendorCode()
		]);
    }	
	
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createSubstrate()
    {
		$page = new Page();
		$page->title = 'Редактирование подложки';
		$page->description = $page->title;			
		$categories = new Category();
		$categories = $categories->withoutGlobalScope('published')->get();
		
		$units = \App\Unit::all();		
		$characteristics = \App\Characteristic::with('unit')
		->whereIn('name', [
			'Длина', 'Толщина', 'Ширина',
			'Производитель', 'Страна', 'Площадь упаковки'
		])->get();	
		
		return view('admin.pages.editPlinth', [
			'page' => $page,
			'categories' => $categories,
			'units' => $units,
			'characteristics' => $characteristics
		]);
    }		
	
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function createForGroup()
    {
		$page = new Page();
		$page->title = 'Редактирование товара для группы';
		$page->description = $page->title;			
		$categories = new Category();	
		$categories = $categories->withoutGlobalScope('published')->get();
		$product_groups = Product_group::all();
		return view('admin.pages.editGroupProduct', ['page' => $page, 'categories' => $categories, 'product_groups' => $product_groups]);
    }	

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->product = $this->product->create($request->input('product'));
		$price_history = new \App\Price_history($request->input('price_history'));
		$price = new \App\Price;
		$product_image = new \App\Product_image($request->input('product_image'));
		$product_stock = new \App\Product_stock($request->input('product_stock'));
		$price_history->product_id = $this->product->id;
		$price_history->save();
		$price->price_history_id = $price_history->id;
		$this->product->price()->save($price);
		$this->product->product_images()->save($product_image);
		$this->product->product_stock()->save($product_stock);
		return $this->product->toJson();		
    }

    public function storePlinth(Request $request, ProductService $productService)
    {	
		$product = $productService->storePlinth($request->all());
		
		return $product->toJson();			
    }	

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
		$page = new Page();
		$page->title = 'Редактирование товара';
		$page->description = $page->title;			
        $product = $this->product->with([
			'product_view.page' => function($query) {
				$query->withoutGlobalScope('published');
			},
			'product_characteristics.characteristic.unit'
		])->findOrFail($id);
		$categories = new Category();
		$categories = $categories->withoutGlobalScope('published')->orderByRaw('id = ? desc', [$product->category_id])->get();	
		
		$units = new \App\Unit();
		$units = $units->orderByRaw('id = ? desc', [$product->unit_id])->get();
		
		return view('admin.pages.editProduct', [
			'page' => $page, 'product' => $product,
			'categories' => $categories,
			'units' => $units
		]);
    }
	
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editForGroup($id)
    {
		$page = new Page();
		$page->title = 'Редактирование товара для группы';
		$page->description = $page->title;			
        $product = $this->product->with(['product_view.page' => function($query) {
			$query->withoutGlobalScope('published');
		}])->findOrFail($id);
		$categories = new Category();
		$categories = $categories->withoutGlobalScope('published')->orderByRaw('id = ? desc', [$product->category_id])->get();	
		$product_groups = Product_group::orderByRaw('id = ? desc', [$product->group_product->product_group_id])->get();
		return view('admin.pages.editGroupProduct', ['page' => $page, 'product' => $product, 'categories' => $categories, 'product_groups' => $product_groups]);
    }	

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
		$this->product = $this->product->findOrFail($request->input('product.id'));	
		$this->product->update( $request->input('product') );
		$price_history = new \App\Price_history($request->input('price_history'));
		// Если цена была изменена
		if ($this->product->price->price_history->price != $price_history->price) {
			$this->product->price_history()->save($price_history);
			$this->product->price->price_history()->associate($price_history);
			$this->product->price->save();
		}
		$this->product->product_images()->first()->update($request->input('product_image'));	
		return $this->product->toJson();			
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request	 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
		$this->product = $this->product->findOrFail($request->input('product.id'));
        $this->product->product_view->page()->withoutGlobalScope('published')->delete();
		$this->product->delete();
    }
	
    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request	 
     * @return \Illuminate\Http\Response
     */
    public function destroyGroupProduct(Request $request)
    {
		$this->product = $this->product->findOrFail($request->input('product.id'));
        $this->product->group_product->delete();
		$this->product->delete();
    }	

    public function publish(Request $request, ProductService $productService)
    {	
		$product = $productService->store($request->all());
		
		return $product->toJson();			
    }	

    public function updatePublication(Request $request)
    {
		$this->product = $this->product->findOrFail($request->input('product.id'));	
		$this->product->update( $request->input('product') );
		$price_history = new \App\Price_history($request->input('price_history'));
		// Если цена была изменена
		if ($this->product->price->price_history->price != $price_history->price) {
			$this->product->price_history()->save($price_history);
			$this->product->price->price_history()->associate($price_history);
			$this->product->price->save();
		}
		
/* 		$product_images = $this->product->product_images()->get();
		foreach($product_images as $product_image) {
			if (file_exists('images/products/'.$product_image->name)) unlink('images/products/'.$product_image->name);
			if (file_exists('images/products/mini/'.$product_image->name)) unlink('images/products/mini/'.$product_image->name);
			if (file_exists('images/products/medium/'.$product_image->name)) unlink('images/products/medium/'.$product_image->name);
		} */
		$this->product->product_images()->delete();
		
		$product_images = [];
		foreach($request->input('product_images') as $key => $product_image) {
			$product_image = new \App\Product_image($product_image);
			$product_image->level = $key;
			$product_images[] = $product_image;
		}
		
		$this->product->product_characteristics()->delete();
		
		$product_characteristics = [];
		foreach ($request->input('product_characteristics') as $product_characteristic) {
			$product_characteristics[] = new \App\Product_characteristic($product_characteristic);	
		}
		
		$this->product->product_characteristics()->saveMany($product_characteristics);
		$this->product->product_images()->saveMany($product_images);
		/* $this->product->product_images()->first()->update($request->input('product_image'));	 */
		$this->product->product_stock->update($request->input('product_stock'));
		$this->product->product_view->page()->withoutGlobalScope('published')->update($request->input('page'));
		return $this->product->toJson();			
    }		
	
    public function storeGroupProduct(Request $request)
    {
        $this->product = $this->product->create($request->input('product'));
		$price_history = new \App\Price_history($request->input('price_history'));
		$price = new \App\Price;
		$product_stock = new \App\Product_stock($request->input('product_stock'));
		$group_product = new \App\Group_product($request->input('group_product'));
		$product_images = [];		
		foreach($request->input('product_images') as $key => $product_image) {
			$product_image = new \App\Product_image($product_image);
			$product_image->level = $key;
			$product_images[] = $product_image;
		}		
		
		$price_history->product_id = $this->product->id;
		$price_history->save();
		$price->price_history_id = $price_history->id;
		$this->product->price()->save($price);
		$this->product->product_images()->saveMany($product_images);
		$this->product->product_stock()->save($product_stock);
		$this->product->group_product()->save($group_product);

		return $this->product->toJson();			
    }	
	
    public function updateGroupProduct(Request $request)
    {
		$this->product = $this->product->findOrFail($request->input('product.id'));	
		$this->product->update( $request->input('product') );
		$price_history = new \App\Price_history($request->input('price_history'));
		// Если цена была изменена
		if ($this->product->price->price_history->price != $price_history->price) {
			$this->product->price_history()->save($price_history);
			$this->product->price->price_history()->associate($price_history);
			$this->product->price->save();
		}
		
		$this->product->product_images()->delete();
		
		$product_images = [];
		foreach($request->input('product_images') as $key => $product_image) {
			$product_image = new \App\Product_image($product_image);
			$product_image->level = $key;
			$product_images[] = $product_image;
		}
		$this->product->product_images()->saveMany($product_images);

		$this->product->product_stock->update($request->input('product_stock'));
		$this->product->group_product->update($request->input('group_product'));
		
		return $this->product->toJson();			
    }			
	
    /**
     * Загружает изображение товара и создает миниатюры
     */	
	public function uploadImage() {
		$uploader = new Uploader();
		$uploader->uploadMini('images/products/');		
	}
	
    /**
     * Загружает изображения товара и создает миниатюры
     */	
	public function uploadImages(Request $request, Uploader $uploader) {
		$uplodedImages = $uploader->uploadMiniMultiple('images/products/');		
		
		$images = ($request->input('product.id')) ? $this->product->find($request->input('product.id'))->product_images : collect();
		foreach($uplodedImages as $uploadImage) {
			$images->push($uploadImage);
		}
		return $images->toJson();
	}	
}
