<?php

namespace App\Services;

use App\Services\PaginationService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Page;
use App\Product_group;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Services\CategoryService;
use App\Services\PriceService;
use App\Services\Filter;

class ProductService
{
	public $paginationService;
	
	public $categories;
	
	public function __construct(PaginationService $paginationService, CategoryService $categoryService, PriceService $priceService) {
		$this->paginationService = $paginationService;
		$this->categoryService = $categoryService;
		$this->priceService = $priceService;
	}
    /**
     * Возвращает диапазон цен группы товаров "От $minPrice до $maxPrice"
     *
     * @param  \App\Product_group  $product_group
     * @return string
     */		
	protected function groupPrice(Product_group $product_group) {
		$prices = $product_group->group_products->map(function ($item, $key) {
			return $item->product->price->price_history->price;
		});
		$minPrice = $prices->min();
		$maxPrice = $prices->max();
		return ($minPrice === $maxPrice) ? $minPrice : "От $minPrice до $maxPrice";
	}
	
    /**
     * Возвращает суммарное количество товаров в наличии группы товаров
     *
     * @param  \App\Product_group  $product_group
     * @return int
     */		
	protected function groupStock(Product_group $product_group) {
		$quantity = 0;
		foreach($product_group->group_products as $group_product) {
			$quantity += $group_product->product->product_stock->quantity;
		}

		return $quantity;
	}		

    /**
	 * Устанваливает группам товаров свойства group_price и group_stock
     *
	 * @param \Illuminate\Contracts\Pagination\LengthAwarePaginator $products
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */		
	protected function groupAttribute(LengthAwarePaginator $products) {
		foreach($products as $product) {
			if ($product->product_group_id) $product->group_price = $this->groupPrice($product->group_product->product_group);
			if ($product->product_group_id) $product->group_stock = $this->groupStock($product->group_product->product_group);
		}		
		return $products;
	}
	
    /**
	 * Устанваливает группам товаров свойства group_price и group_stock
	 * Если у товара есть характеристика плоащадь упаковки, то устанавливает свойства packing_area и price_per_square_meter 
     *
	 * @param \Illuminate\Contracts\Pagination\LengthAwarePaginator $products
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */		
	public function attributes(LengthAwarePaginator $products) {
		$this->categories = \App\Category::select('id', 'parent_id')->get()->keyBy('id');
		
		foreach($products as $product) {
			if ($product->product_group_id) $product->group_price = $this->groupPrice($product->group_product->product_group);
			if ($product->product_group_id) $product->group_stock = $this->groupStock($product->group_product->product_group);
			
			$product = $this->laminateAttribute($product);
			
			$product->category = $this->categoryService->moistureResistanceAttribute($product->category);
		}		
		return $products;
	}
	
	protected function laminatesAttribute(LengthAwarePaginator $products){
		foreach($products as $product) {
			$product = $this->laminateAttribute($product);		
		}		
		return $products;		
	}
	
    /**
	 * Устанваливает товару свойства packing_area и price_per_square_meter
     *
     * @param  \App\Product  $product
     * @return \App\Product 
     */		
	protected function laminateAttribute(\App\Product $product) {
		$product->product_characteristics_assoc = $product->product_characteristics->keyBy('characteristic.name');
		
		if ($product->product_characteristics_assoc->has('Площадь упаковки')) {
			$product->packing_area = $product->product_characteristics_assoc['Площадь упаковки']->value;
			$product->price_per_square_meter = $product->price->price_history->price / $product->packing_area;
			$product->price_per_square_meter = round($product->price_per_square_meter, 2);
			
			if ($this->categories && $this->priceService->isDiscountCategory($this->categories, $product->category)) {
				$product->discount_price_per_square_meter = round($product->price_per_square_meter * 0.9, 2, PHP_ROUND_HALF_UP);
			}		

			if ($product->promotional_product) {
				$shareDiscount = 1 - ($product->promotional_product->discount / 100);
				$product->discount_price_per_square_meter = round($product->price_per_square_meter * $shareDiscount, 2, PHP_ROUND_HALF_UP);
			}
		}
		
		return $product;
	}

    /**
	 * Устанваливает клею свойства packing_area (расход клея 0,4 кг/м кв)
     *
     * @param  \App\Product  $product
     * @return \App\Product 
     */	
	protected function glueAttribute(\App\Product $product) {
		foreach ($product->product_characteristics as $product_characteristic) {
			if ($product_characteristic->characteristic->name != 'Вес упаковки') continue;
			
			$product->packing_area = $product_characteristic->value / 0.4;
		}
		
		return $product;
	}
    /**
	 * Устанваливает товару свойства length и price_per_meter
     *
     * @param  \App\Product  $product
     * @return \App\Product 
     */		
	protected function plinthAttribute(\App\Product $product) {
		foreach ($product->product_characteristics as $product_characteristic) {
			if ($product_characteristic->characteristic->name != 'Длина') continue;
			
			$product->length = $product_characteristic->value / 1000;
			$product->price_per_meter = $product->price->price_history->price / $product->length;
			$product->price_per_meter = round($product->price_per_meter, 2);
		}
		return $product;
	}		
    /**
	 * @param \Illuminate\Database\Eloquent\Builder | \Illuminate\Database\Eloquent\Relations\HasMany $builder
     * @return Illuminate\Database\Eloquent\Builder
     */		
	public function getProductsBuilder($builder) {
		return $builder->where(function ($query) {
			$query->has('product_view.page')->
				orHas('group_product.product_group.product_group_view.page')->
				orHas('laminate_products_view.page');
		})->with([
			'product_view.page' => function ($query) {
				$query->select('id', 'uri');
			},
			'group_product.product_group.product_group_view.page' => function ($query) {
				$query->select('id', 'uri');
			},
			'laminate_products_view.page' => function ($query) {
				$query->select('id', 'uri');
			},			
			'promotional_product',
			'group_product.product_group.product_group_images', 'product_images',
			'price.price_history', 'group_product.product_group.group_products.product.price.price_history',	
			'product_stock', 'group_product.product_group.group_products.product.product_stock',
			'product_characteristics.characteristic', 'category.category_characteristics.characteristic'
		])->leftJoin('group_products', 'products.id', '=', 'group_products.product_id')
			->groupBy(DB::raw('COALESCE(group_products.product_group_id, products.id), group_products.product_group_id'))->orderBy('products.name');		
	} 
	
    /**
     * Возвращает все товары и группы товаров для страницы $page
	 * Устанваливает группам товаров свойства group_price и group_stock
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */	
	public function all(Page $page) {
		$products = $this->getProductsBuilder($page->products_view->category->products());
		$this->paginationService->addBuilder($products);
		
		$products = $this->paginationService->paginate(16);		
		$products = $this->attributes($products);

		return $products;
	}
	
	public function promotionalProducts() {
		$products = $this->getProductsBuilder(\App\Product::has('promotional_product'));
		$this->paginationService->addBuilder($products);
		
		$products = $this->paginationService->paginate(16);		
		$products = $this->attributes($products);

		return $products;		
	}
	
    /**
     * Возвращает группу товаров для страницы $page
     *
     * @param  \App\Page  $page
     * @return \App\Product_group
     */		
	public function getGroup(Page $page) {
		$product_group = $page->product_group_view()->first()->product_group->load([
			'product_group_images',
			'group_products.product.price.price_history',
			'group_products.product.product_stock',
			'group_products.product.product_images'
		]);
		return $product_group;
	}

    /**
	 * Ищет товары с названиямии содержащими часть строки $name
     * Возвращает товары и группы товаров
	 * Устанваливает группам товаров свойство group_price
     *
     * @param  string $name часть строки для поиска товаров
     * @param  int $pageNumber номер страницы пагинации	 
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */		
	public function search($name, $pageNumber) {	
		$products = $this->getProductsBuilder( \App\Product::where('name', 'like', "%$name%") );
	
		$this->paginationService->addBuilder($products);
		$products = $this->paginationService->paginate(15, ['*'], 'page', $pageNumber, url("search/$name"));		
		$products = $this->groupAttribute($products);
		
		return $products;
	}
	
    /**
	 * Ищет товары с названиямии содержащими часть строки $request->input('searchQuery')
     * Возвращает товары
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Database\Eloquent\Collection
     */			
	public function searchData(Request $request) {
		return \App\Product::where('name', 'like', "%{$request->input('searchQuery')}%")->limit(10)
		->get();
	}		

    /**
     * Возвращает пол для страницы $page
     *
     * @param  \App\Page  $page
     * @return \App\Product
     */		
	public function getLaminate(Page $page) {
		$product = $page->product_view()->with([
				'product.product_characteristics.characteristic.unit' => function ($query) {
					$query->select('id', 'reduction');
				},
				'product.price.price_history'
		])
			->first()->product;
		
		$product = $this->laminateAttribute($product);
	
		return $product;	
	}
	
    /**
     * Возвращает клей для страницы $page
     *
     * @param  \App\Page  $page
     * @return \App\Product
     */		
	public function getGlue(Page $page) {
		$product = $page->product_view()->with([
				'product.product_characteristics.characteristic.unit' => function ($query) {
					$query->select('id', 'reduction');
				},
				'product.price.price_history'
		])
			->first()->product;
		
		$product = $this->glueAttribute($product);
	
		return $product;	
	}	
	
	protected function floorType(\App\Product $product) {
		$categories = \App\Category::select('id', 'name', 'parent_id')
			->whereIn('name', ['Ламинат', 'Винил', 'Паркетная доска'])
			->get()->keyBy('id');
		
		for ($target = $categories[$product->category->parent_id]; $target->parent_id; $target = $categories[$target->parent_id]) {
			$product->floor_type = $target->name;
			
			return $product;
		}
	}
	
/* 	protected function test(\App\Product $product) {
		$parentCategories = \App\Category::select('id', 'name', 'parent_id')
			->whereIn('name', ['Ламинат', 'Винил', 'Паркетная доска'])
			->get()->keyBy('id');
		
		$category = $this->categoryService->getParent($parentCategories, $product->category, $parentCategories);
		
		var_dump($category, 'TEST');
	} */
	
	public function getLaminateProducts(Page $page) {
		$laminate_products_view = $page->laminate_products_view()->with([
				'product.product_characteristics.characteristic.unit' => function ($query) {
					$query->select('id', 'reduction');
				},
				'product.category' => function($query) {
					$query->withoutGlobalScope('published')->select('id', 'parent_id');
				},
				'category' => function($query) {
					$query->withoutGlobalScope('published')->select('id', 'name');
				},
				'product.price.price_history',
				'product.product_view.unit' => function($query) {
					$query->select('id', 'reduction');
				},				
				'product.product_view.page' => function($query) {
					$query->select('id', 'uri');
				},
				'product.product_images' => function($query) {
					/* $query->where('level', 0); */
				}
		])->get()->groupBy('category.name');

		$products = collect();
		
		$this->categories = \App\Category::select('id', 'parent_id')->get()->keyBy('id');
		
		$products['Пол'] = $this->laminateAttribute($laminate_products_view['Пол'][0]->product);
		$products['Пол'] = $this->floorType($products['Пол']);
		/* $this->test($products['Пол']); */
		
		
		$products['Плинтус'] = $this->plinthAttribute($laminate_products_view['Плинтус'][0]->product);
		if ( isset($laminate_products_view['Герметик']) ) $products['Герметик'] = $this->laminateAttribute($laminate_products_view['Герметик'][0]->product);
		
		if ( isset($laminate_products_view['Подложка']) ) {
			$products['Подложка'] = collect();
			
			foreach ($laminate_products_view['Подложка'] as $laminate_product_view) {
				$products['Подложка'][] = $this->laminateAttribute( $laminate_product_view->product );
			}			
		}
			
		return $products;
	}	
	
	protected function childrenCategoryServices($category_services) {
		$grouped = $category_services->groupBy('category.parent_id');
		
		foreach($category_services as $category_service) {
			if ($grouped->has($category_service->category->id)) {
				$category_service->children = $grouped[$category_service->category->id];
				
				$grouped->forget($category_service->category->id);
			}
		}		
		
		return $category_services->where('category.parent_id', null);
	}
	
	public function getFloorServices($products) {
		$categoryNames = array_keys($products->toArray());
		
		$categoryNames[] = $products['Пол']->floor_type;
		
		$whereCategoryName = function($query) use ($categoryNames) {
			$query->whereIn('name', $categoryNames);
		};
		
		$category_services = \App\Category_service::whereHas('category', $whereCategoryName)->
			with([
				'category' => function($query) {
					$query->select('id', 'name', 'parent_id');
				},
				'service.service_price.service_price_history'
			])->get();			
			
		return $this->childrenCategoryServices($category_services)->groupBy('category.name');
	}

	/*
	 * Возвращает все отфильтрованные товары без пагинации
	 * 
	 * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Database\Eloquent\Collection
	 */
	public function filterAll(Request $request) {
		$filter = app()->make(Filter::class);
		
		$products = $filter->get( $request, $this->getProductsBuilder( app()->make('\App\Product') ) );
		
		$this->paginationService->addBuilder($products);
		
		$products = $products->get();			
		
		/* $products = $this->attributes($products); */
		
		foreach ($products as $product) {
			$product->product_characteristics_assoc = $product->product_characteristics->keyBy('characteristic.name');
		}
		
		return $products;
	}
	
	/*
	 * Возвращает отфильтрованные товары
	 * 
	 * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
	 */
	public function filter(Request $request) {
		$filter = app()->make(Filter::class);
		
		$products = $filter->get( $request, $this->getProductsBuilder( app()->make('\App\Product') ) );
		
		$this->paginationService->addBuilder($products);
		
		$products = $this->paginationService->paginate(16);			
		
		$products = $this->attributes($products);
		
	/* 	foreach ($products as $product) {
			$product->product_characteristics_assoc = $product->product_characteristics->keyBy('characteristic.name');
		} */
		
		return $products;
	}
}
