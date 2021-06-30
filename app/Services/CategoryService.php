<?php

namespace App\Services;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use App\Services\TreeService;
use App\Services\PriceService;

class CategoryService
{
	public $category;
	
	public $priceService;
	
	public $categories;
	
    public function __construct(Category $category, PriceService $priceService) {
		$this->category = $category;
		$this->priceService = $priceService;	
	}
	
	/**
	 * Возвращает массив id категорий и их потомков
	 *
	 * @param array $categories массив древовидных коллекций категориий
	 * @param array $category_ids id родительских категорий
	 * @return array
	 */
	protected function getChildCategoryIdsFromTreeCategories($categories, $category_ids) {
		foreach ($categories as $category) {
			$category_ids[] = $category->id;
			if (isset($category->children)) {
				$category_ids = $this->getChildCategoryIdsFromTreeCategories($category->children, $category_ids);
			}
		}
		return $category_ids;		
	}
	/* 
	 * Возвращает id категории и её потомков
	 *
	 * @param int $parent_id id родительской категории
	 * @return array
	*/
	public function getChildCategoryIds($parent_id) {
		$treeService = new TreeService();
		
		$categories = $this->category->withoutGlobalScope('published')->select('id', 'parent_id')->get();
		$categories = $treeService->build($categories, $parent_id);
		
		return $this->getChildCategoryIdsFromTreeCategories($categories, [$parent_id]);		
	}
    /**
	 * Устанваливает категориям свойства moisture_resistance
	 * Если у категории есть характеристика влагостойкость, то устанавливает moisture_resistance
     *
	 * @param \Illuminate\Database\Eloquent\Collection $categories
     * @return \Illuminate\Database\Eloquent\Collection
     */		
	public function attributes(Collection $categories) {
		$this->categories = \App\Category::select('id', 'parent_id')->get()->keyBy('id');
		
		foreach($categories as $category) {
			$category = $this->lamCollectionAttr($category);		
		}		
		return $categories;
	}

    /**
	 * Устанваливает категории свойства moisture_resistance, thickness, class, plank
     *
     * @param  \App\Category  $category
     * @return \App\Category 
     */		
	protected function lamCollectionAttr(Category $category) {
		foreach ($category->category_characteristics as $category_characteristic) {
			switch($category_characteristic->characteristic->name) {
				case 'Влагостойкость':
					$category->moisture_resistance = $category_characteristic->value;
					break;
				case 'Толщина':
					$category->thickness = $category_characteristic->value;
					break;
				case 'Класс':
					$category->class = $category_characteristic->value;
					break;	
				case 'Площадь упаковки':
					$category->packing_area = $category_characteristic->value;
					$category->price_per_square_meter = $category->category_price->price / $category->packing_area;
					$category->price_per_square_meter = round($category->price_per_square_meter, 2);
					
					if ($this->priceService->isDiscountCategory($this->categories, $category)) {
						$category->discount_price_per_square_meter = round($category->price_per_square_meter * 0.9, 2, PHP_ROUND_HALF_UP);
					}						
					break;
				case 'Планка':
					$category->plank = $category_characteristic->value;
					break;							
			}							
		}
		return $category;		
	}
	
    /**
	 * Устанваливает категории свойство moisture_resistance
	 * Если у категории есть характеристика влагостойкость, то устанавливает moisture_resistance
     *
     * @param  \App\Category  $category
     * @return \App\Category 
     */		
	public function moistureResistanceAttribute(Category $category) {
		foreach ($category->category_characteristics as $category_characteristic) {
			if ($category_characteristic->characteristic->name != 'Влагостойкость') continue;
			
			$category->moisture_resistance = $category_characteristic->value;
		}
		return $category;
	}		

	/**
	* Возвращает родительскую категорию если она есть в списке $parentCategories
	*
	* @param \Illuminate\Database\Eloquent\Collection $categories
	* @param \App\Category $category дочерниия категориия
	* @param \Illuminate\Database\Eloquent\Collection $parentCategories спиок родительских категориий
	* @return \App\Category|null
	*/
	public function getParent(Collection $categories, Category $category, Collection $parentCategories) {
		for ($target = $category; $target->parent_id; $target = $categories[$target->parent_id]) {			
			foreach ($parentCategories as $parentCategory) {
				if ($target->parent_id == $parentCategory->id) return $parentCategory;
			}
		}
		
		return null;		
	}
	
	/**
	* Сортирует товары по категориям
	*
	* @param \Illuminate\Database\Eloquent\Collection $products
	* @param array $parentCategoryNames названия категорий в порядке сортировки
	* @return \Illuminate\Database\Eloquent\Collection
	*/
	public function sort(Collection $products, $parentCategoryNames) {
		$categories = $this->category->withoutGlobalScope('published')->get()->keyBy('name');
		$parentCategoryNames = array_flip($parentCategoryNames);
		$parentCategoryies = $categories->filter(function($value, $key) use ($parentCategoryNames) {
			return isset($parentCategoryNames[$key]);
		});

		$products = $products->sortBy(function($product, $key) use ($parentCategoryNames, $categories, $parentCategoryies) {
			$category = $product->category;
			if (!isset($parentCategoryNames[$category->name])) $category = $this->getParent($categories, $product->category, $parentCategoryies);		

			return $parentCategoryNames[$category->name];
		});		
		$products->values();
		
		return $products;	
	}

    /**
     * Устанавливает коллекцию категорий по ключу
     */		
	protected function keyById() {
		$this->category = $this->category->withoutGlobalScope('published')
			->with(['categories_view.page' => function($query) {
					$query->select('id');
				},
				'products_view.page' => function($query) {
					$query->select('id');
				}, 			
				'categories_view.page.page_route', 'products_view.page.page_route'
			])
			->where(function ($query) {
				/* $query->has('categories_view.page.page_route')->orHas('products_view.page.page_route'); */
			})->get()
			->keyBy('id');
	}

    /**
     * Обновляет порядок и иерархию категорий.
     *
     * @param array  $categoriesData
	 * @return array Дочерние категории
     */		
	protected function updateSort($categoriesData) {
		$sort = 1;
		$childCategories = [];
		foreach ($categoriesData as $categoryData) {
			$this->category[$categoryData['id']]->parent_id = $categoryData['parent_id'];
			$this->category[$categoryData['id']]->sort = $sort++;
			$this->category[$categoryData['id']]->save();
			
			$childCategories[$this->category[$categoryData['id']]->parent_id] = $this->category[$categoryData['id']];			
		}
		return $childCategories;
	}
	
    /**
     * Обновляет модели \App\Page_route.
	 * У родительских категорий создаёт модель \App\Categories_view и удаляет модель \App\Products_view
	 * У категорий без детей создаёт модель \App\Products_view и удаляет модель \App\Categories_view	 
     *
     * @param  array  $childCategories
     */	
	protected function updatePageRoutesAndViews($childCategories) {
		$routes = \App\Route::whereIn('name', ['categories', 'products'])->get()->keyBy('name');
		$deletedCategoriesViews = [];
		$deletedProductsViews = [];
		
		foreach ($this->category as $category) {
			// Если есть дочерние категории
			if (isset($childCategories[$category->id])) {				
				if (isset($category->products_view->page->page_route)) {
					$category->products_view->page->page_route->route_id = $routes['categories']->id;
					$category->products_view->page->page_route->save();
					
					$category->categories_view()->create(['page_id' => $category->products_view->page->id]);
					
					$deletedProductsViews[] = $category->products_view->page_id;
				}
			}
			else {				
				if (isset($category->categories_view->page->page_route)) {
					$category->categories_view->page->page_route->route_id = $routes['products']->id;
					$category->categories_view->page->page_route->save();
					
					$category->products_view()->create(['page_id' => $category->categories_view->page->id]);
					
					$deletedCategoriesViews[] = $category->categories_view->page_id;
				}				
			}
		}
		\App\Categories_view::destroy($deletedCategoriesViews);
		\App\Products_view::destroy($deletedProductsViews);		
	}
	
    /**
     * Обновляет порядок и иерархию категорий.
	 * Обновляет маршруты и представления категорий
     *
     * @param  array  $categoriesData
     */	
	public function updateOrder($categoriesData) {
		$this->keyById();
		
		$childCategories = $this->updateSort($categoriesData);
		
		$this->updatePageRoutesAndViews($childCategories);
	}
	
	public function store(Request $request) {
		$category = Category::create($request->input('category'));
		$route = \App\Route::where('name', 'products')->first();
		
		$page = new \App\Page($request->input('page'));
		$page->save();
		$page->page_route()->create(['route_id' => $route->id]);
				
		$category->products_view()->create(['category_id' => $category->id, 'page_id' => $page->id]);
		$category->category_image()->create($request->input('category_image'));
		
		return $category;
	}
	
	public function update(Request $request) {
		$category = $this->category->with('products_view.page', 'categories_view.page')->findOrfail($request->input('category.id'));
		
		$category->update($request->input('category'));
		
		isset($category->products_view) ? $category->products_view->page()->update($request->input('page')) : $category->categories_view->page()->update($request->input('page'));
		
		$category->category_image()->update($request->input('category_image'));
		
		return $category;
	}
}
