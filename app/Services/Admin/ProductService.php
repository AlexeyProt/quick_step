<?php

namespace App\Services\Admin;

use Illuminate\Database\Eloquent\Collection;
use App\Page;
use App\Product;
use App\Category;

class ProductService
{
	public $product;
	
	public $category;
	
	public function __construct(Product $product, Category $category)
	{
		$this->product = $product;
		$this->category = $category;
	}
	
    public function storePlinth($data)
    {	
        $product = \App\Product::create($data['product']);
		$price_history = new \App\Price_history($data['price_history']);
		$price = new \App\Price;
		$product_stock = new \App\Product_stock($data['product_stock']);
		$page = new \App\Page($data['page']);
		$product_images = [];		
		foreach($data['product_images'] as $key => $product_image) {
			$product_image = new \App\Product_image($product_image);
			$product_image->level = $key;
			$product_images[] = $product_image;
		}	

		$product_characteristics = [];
		foreach ($data['product_characteristics'] as $product_characteristic) {
			$product_characteristics[] = new \App\Product_characteristic($product_characteristic);	
		}
		
		$price_history->product_id = $product->id;
		$price_history->save();
		$price->price_history_id = $price_history->id;
		$product->price()->save($price);
		$product->product_images()->saveMany($product_images);
		$product->product_stock()->save($product_stock);
		$product->product_characteristics()->saveMany($product_characteristics);

		$page->save();
		$product->plinth_view()->create(['page_id' => $page->id]);
		$page->page_route()->create(['route_id' => 8]);		
		
		return $product;			
    }		
	
    public function store($data)
    {	
        $product = \App\Product::create($data['product']);
		$price_history = new \App\Price_history($data['price_history']);
		$price = new \App\Price;
		$product_stock = new \App\Product_stock($data['product_stock']);
		$page = new \App\Page($data['page']);
		$product_images = [];		
		foreach($data['product_images'] as $key => $product_image) {
			$product_image = new \App\Product_image($product_image);
			$product_image->level = $key;
			$product_images[] = $product_image;
		}	

		$product_characteristics = [];
		foreach ($data['product_characteristics'] as $product_characteristic) {
			$product_characteristics[] = new \App\Product_characteristic($product_characteristic);	
		}
		
		$price_history->product_id = $product->id;
		$price_history->save();
		$price->price_history_id = $price_history->id;
		$product->price()->save($price);
		$product->product_images()->saveMany($product_images);
		$product->product_stock()->save($product_stock);
		$product->product_characteristics()->saveMany($product_characteristics);

		$page->save();
				
		$product = $this->createView($product, $page);
			
		return $product;			
    }
	
	protected function createView(Product $product, Page $page) {
		
		$categories = Category::all()->keyBy('id');
		
		for ($target = $product->category; ; $target = $categories[$target->parent_id]) {
			switch ($target->id) {
				case 39:
					$page->published = 1;
					$page->save();
				
					return $this->createLaminateProductsView($product, $page);							
				case 16:
					$product->plinth_view()->create(['page_id' => $page->id]);
					
					return $product;
				case 45:
					$product->product_view()->create(['page_id' => $page->id, 'unit_id' => $product->unit_id]);
					$page->page_route()->create(['route_id' => 10]);		

					return $product;						
			}
			
			if (!$target->parent_id) break;
		}
		
		$product->product_view()->create(['page_id' => $page->id, 'unit_id' => $product->unit_id]);
		$page->page_route()->create(['route_id' => 1]);		

		return $product;		
	}
	
	protected function createLaminateProductsView(Product $product, Page $page) {
		$page->page_route()->create(['route_id' => 9]);	
		
		$laminate_products_view = $product->laminate_products_view()->create(['page_id' => $page->id, 'category_id' => 39]);
		
		\App\Laminate_product_view::create(['page_id' => $page->id, 'category_id' => 17, 'product_id' => 12]);
		\App\Laminate_product_view::create(['page_id' => $page->id, 'category_id' => 17, 'product_id' => 13]);
		\App\Laminate_product_view::create(['page_id' => $page->id, 'category_id' => 17, 'product_id' => 14]);
		\App\Laminate_product_view::create(['page_id' => $page->id, 'category_id' => 17, 'product_id' => 23]);
		
		\App\Laminate_product_view::create(['page_id' => $page->id, 'category_id' => 18, 'product_id' => 15]);
		
		\App\Laminate_product_view::create(['page_id' => $page->id, 'category_id' => 16, 'product_id' => 481]);
		
		return $product;
	}	
	
	public function getDefaultVendorCode() {
		$max = \App\Product::max('vendor_code');
		$chars = iconv_strlen($max);
		$vendor_codeInt = (int) $max + 1;
		$nullsCount = $chars - iconv_strlen($vendor_codeInt);
		$nulls =  implode('', array_fill(0, $nullsCount, '0'));
		
		return $nulls . $vendor_codeInt;			
	}	
	
	public function changeUris() {
		$path = 'vinil/ambient-glue-plus/';
		$laminate_products_view = \App\Laminate_product_view::with('product.category', 'page')
		->whereHas('product.category', function($query) {
			$query->where('name', 'Ambient Glue Plus');
		})
		->get();
		
		foreach ($laminate_products_view as $laminate_product_view) {
			$laminate_product_view->page->uri = $path.$laminate_product_view->page->uri;
			$laminate_product_view->page->save();
		}
	}
	
	/**
	 * Обновляет цену товара, если она была изменена
	 * 
	 * @param \App\Product $product 
	 * @param \App\Price_history $price_history новая цена
	 * @return \App\Product
	*/
	public function updatePrice(Product $product, \App\Price_history $price_history)
	{
		// Если цена была изменена
		if ($product->price->price_history->price != $price_history->price) {
			$product->price_history()->save($price_history);
			$product->price->price_history()->associate($price_history);
			$product->price->save();
		}
		
		return $product;		
	}

	/**
	 * Изменяет цены категорий на минимальную цену товара из соответсвующей категории
	 * 
	 * @param array $category_ids 
	*/	
	protected function setMinCategoryPrices($category_ids)
	{
		$categories = $this->category->withoutGlobalScope('published')->select('id')
			->with([
				'category_price' => function($query) {
					$query->select('category_id', 'price');
				},
				'products' => function($query) {
					$query->select('id', 'category_id');
				},				
				'products.price.price_history' => function($query) {
					$query->select('id', 'product_id',  'price');
				}				
			])->find($category_ids);

		foreach ($categories as $category) {
			$this->setMinCategoryPrice($category);
		}		
	}

	/**
	 * Изменяет цену категории на минимальную цену товара из этой категории
	 * 
	 * @param \App\Category $category
	*/	
	protected function setMinCategoryPrice(Category $category)
	{
		$minProductPrice = $category->products->map(function ($item, $key) {
			return $item->price->price_history->price;
		})->min();
		
		if ($category->category_price) {
			$category->category_price->price = $minProductPrice;
			$category->category_price->save();				
		}		
	}
	
	/**
	 * Обновляет цены товаров
	 * Изменяет цены категорий на минимальную цену товара из соответсвующей категории
	 * 
	 * @param \Illuminate\Database\Eloquent\Collection $products 
	 * @param \App\Price_history $price_history новая цена товаров
	 * @return \Illuminate\Database\Eloquent\Collection
	*/	
	public function updatePricesAndCategoryPrices(Collection $products, \App\Price_history $price_history) 
	{
		$category_ids = [];
		foreach ($products as $product) {
			$product = $this->updatePrice($product, $price_history);
			
			$category_ids[$product->category_id] = $product->category_id;
		}
		
		$this->setMinCategoryPrices($category_ids);
		
		return $products->keyBy('id');		
	}
}
